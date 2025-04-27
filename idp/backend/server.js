// const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Evaluation Schema
const evaluationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: String,
  answer: String,
  score: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});
const Evaluation = mongoose.model('Evaluation', evaluationSchema);

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

// Middleware to Authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes

// Test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// List Models
app.get('/models', async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json(models);
  } catch (error) {
    console.error('❌ Failed to retrieve model list:', error);
    res.status(500).json({ error: 'Failed to retrieve model list' });
  }
});

// Evaluate Answer
app.post('/evaluate', async (req, res) => {
  const { question, userAnswer } = req.body;

  if (!question || !userAnswer) {
    return res.status(400).json({ error: 'Missing question or answer' });
  }

  try {
    const prompt = `
You are an expert evaluator. Evaluate the following student's answer on a scale of 1 to 10 and provide brief feedback.

Question: ${question}

Student's Answer: ${userAnswer}

Respond ONLY in raw JSON, no markdown formatting, no backticks. Like:
{
  "score": number (1 to 10),
  "feedback": "brief feedback"
}
`;
    const result = await model.generateContent(prompt);
    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const cleanedText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('❌ Failed to parse Gemini response:', parseError);
      return res.status(500).json({ error: 'Invalid JSON from Gemini AI' });
    }

    res.json({
      score: jsonResponse.score,
      feedback: jsonResponse.feedback
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

// Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });

  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(500).send({ error: "Signup failed" });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).send({ error: "Login failed" });
  }
});

// Save Evaluation
// app.post('/save-evaluation', authenticateToken, async (req, res) => {
//   const { question, answer, score, feedback } = req.body;

//   if (!question || !answer || score === undefined || !feedback) {
//     return res.status(400).json({ error: 'Missing fields' });
//   }

//   try {
//     const newEvaluation = new Evaluation({
//       userId: req.user.id,
//       question,
//       answer,
//       score,
//       feedback
//     });

//     await newEvaluation.save();

//     res.status(201).json({ message: 'Evaluation saved successfully' });
//   } catch (error) {
//     console.error('❌ Save Evaluation Error:', error);
//     res.status(500).json({ error: 'Failed to save evaluation' });
//   }
// });

// // Start Server

app.post('/save-evaluation', authenticateToken, async (req, res) => {
  const { evaluations } = req.body;  // Get the array of evaluations

  if (!evaluations || !Array.isArray(evaluations) || evaluations.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid evaluations' });
  }

  try {
    // Use a loop to save each evaluation
    for (const evaluation of evaluations) {
      const { question, answer, score, feedback } = evaluation;

      if (!question || !answer || score === undefined || !feedback) {
        return res.status(400).json({ error: 'Missing fields in evaluation' });
      }

      const newEvaluation = new Evaluation({
        userId: req.user.id,  // Assuming you're attaching the user's ID
        question,
        answer,
        score,
        feedback
      });

      await newEvaluation.save();
    }

    res.status(201).json({ message: 'Evaluations saved successfully' });
  } catch (error) {
    console.error('❌ Save Evaluation Error:', error);
    res.status(500).json({ error: 'Failed to save evaluations' });
  }
});
