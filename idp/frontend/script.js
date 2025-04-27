// const submitBtn = document.getElementById('submitBtn'); 
// const questionInput = document.getElementById('question');
// const answerInput = document.getElementById('answer');

// const scoreSpan = document.getElementById('score');
// const feedbackSpan = document.getElementById('feedback');
// const resultDiv = document.getElementById('result');

// // Event listener for submit button
// submitBtn.addEventListener('click', async () => {
//   const question = questionInput.value.trim();
//   const userAnswer = answerInput.value.trim();
// })

//   // Validate input fields
//   if (!question || !userAnswer) {
//     alert('⚠️ Please fill both the question and answer fields!');
//     return;
//   }

//   // Disable the button and show evaluation status
//   submitBtn.disabled = true; 
//   submitBtn.textContent = 'Evaluating...'; 

//   try {
//     // Send the POST request to backend
//     const response = await fetch('http://localhost:3000/evaluate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ question, userAnswer }) // Send question and answer
//     });

//     // Check if the response is ok (status 200-299)
//     if (!response.ok) {
//       let errorMessage = 'Something went wrong!';
//       try {
//         const errorData = await response.json();
//         errorMessage = errorData.error || errorMessage;
//       } catch (e) {
//         console.error('Error parsing error response:', e);
//       }
//       alert(`🚫 Error: ${errorMessage}`);
//       return;
//     }

//     // Parse the JSON data from the backend
//     const data = await response.json();

//     // Check if score and feedback are available in the response
//     if (typeof data.score !== 'undefined' && typeof data.feedback !== 'undefined') {
//       // ✅ Display result on the page
//       scoreSpan.textContent = data.score;
//       feedbackSpan.textContent = data.feedback;
//       resultDiv.classList.remove('hidden');
//     } else {
//       alert('⚠️ Server did not return score and feedback. Check backend.');
//       console.warn('Unexpected server response:', data);
//     }

//   } catch (error) {
//     console.error('Fetch Error:', error);
//     alert('⚠️ Could not connect to the server. Please check your backend.');
//   } finally {
//     // Re-enable the button and reset the text
//     submitBtn.disabled = false; 
//     submitBtn.textContent = 'Submit Answer'; 
//   }

// 
// const numQuestionsInput = document.getElementById('numQuestions');
// const generateQuestionsBtn = document.getElementById('generateQuestionsBtn');
// const questionsContainer = document.getElementById('questionsContainer');
// const submitBtn = document.getElementById('submitBtn');

// function showUserGreeting(name) {
//   const loginBtn = document.getElementById("loginBtn");
//   const userGreeting = document.getElementById("userGreeting");
//   const userNameSpan = document.getElementById("userName");

//   if (loginBtn) loginBtn.style.display = "none"; // Hide login button
//   if (userGreeting) {
//     userNameSpan.textContent = name; // Update with the user's name
//     userGreeting.classList.remove("hidden"); // Show the greeting
//   }
// }

// // On page load, check if userName exists
// window.onload = function () {
//   const savedUserName = localStorage.getItem("userName");
//   // const savedUserName = localStorage.getItem("userName");
//   console.log("Retrieved userName from localStorage:", savedUserName);

//   if (savedUserName) {
//     showUserGreeting(savedUserName);
//   } else {
//     console.warn("No userName found in localStorage.");
//   }
// };
// function logout() {
//   // Remove the user's name from local storage
//   localStorage.removeItem('userName');

//   // Optionally, reset the display or redirect the user
//   alert('You have been logged out.');

//   // Redirect to login page or refresh to show login options
//   window.location.reload();
// }



// // Event listener for generating questions
// generateQuestionsBtn.addEventListener('click', () => {
//   const numQuestions = parseInt(numQuestionsInput.value, 10);

//   // Validate number of questions
//   if (isNaN(numQuestions) || numQuestions <= 0) {
//     alert('⚠️ Please enter a valid number of questions!');
//     return;
//   }
//   document.addEventListener("DOMContentLoaded", () => {
//     const savedDocsLink = document.getElementById("savedDocsLink");
//     const userGreeting = document.getElementById("userGreeting");
//     const userName = document.getElementById("userName");
//     const navbarButtons = document.getElementById("navbar-buttons");

//     // Example user session object to simulate login state
//     let userSession = null; // Replace with actual session logic or authentication system

//     // Check login status
//     function checkLoginStatus() {
//       if (userSession) {
//         userGreeting.classList.remove("hidden");
//         navbarButtons.querySelector("#loginBtn").classList.add("hidden");
//         userName.textContent = userSession.username; // Update with logged-in user's name
//       } else {
//         userGreeting.classList.add("hidden");
//         navbarButtons.querySelector("#loginBtn").classList.remove("hidden");
//       }
//     }

//     // Redirect to login if not logged in
//     savedDocsLink.addEventListener("click", (event) => {
//       if (!userSession) {
//         event.preventDefault();
//         alert("You must be logged in to view saved documents!");
//         window.location.href = "login.html"; // Redirect to login page
//       } else {
//         window.location.href = "saved-documents.html"; // Redirect to the saved documents page
//       }
//     });

//     // Simulate login (for demonstration purposes)
//     window.login = function () {
//       userSession = { username: "JohnDoe" }; // Example user data
//       checkLoginStatus();
//     };

//     // Simulate logout
//     window.logout = function () {
//       userSession = null;
//       checkLoginStatus();
//       alert("You have logged out successfully.");
//       window.location.href = "index.html"; // Redirect to home page
//     };

//     checkLoginStatus();
//   });


//   // Clear previous question inputs if any
//   questionsContainer.innerHTML = '';

//   // Generate question and answer input fields
//   for (let i = 1; i <= numQuestions; i++) {
//     const questionLabel = document.createElement('label');
//     questionLabel.textContent = `Question ${i}:`;

//     const questionInput = document.createElement('textarea');
//     questionInput.placeholder = `Type your question ${i} here...`;
//     questionInput.id = `question${i}`;
//     questionInput.required = true;

//     const answerLabel = document.createElement('label');
//     answerLabel.textContent = `Answer to Question ${i}:`;

//     const answerInput = document.createElement('textarea');
//     answerInput.placeholder = `Type your answer ${i} here...`;
//     answerInput.id = `answer${i}`;
//     answerInput.required = true;

//     // Add an evaluation button for each question
//     const evaluateBtn = document.createElement('button');
//     evaluateBtn.textContent = `Evaluate Answer ${i}`;
//     evaluateBtn.classList.add('evaluateBtn');
//     evaluateBtn.id = `evaluateBtn${i}`;

//     // Create result container for this question
//     const resultDiv = document.createElement('div');
//     resultDiv.id = `result${i}`;
//     resultDiv.classList.add('evaluation-result');
//     resultDiv.classList.add('hidden');

//     // Append the question, answer, button and result to the container
//     questionsContainer.appendChild(questionLabel);
//     questionsContainer.appendChild(questionInput);
//     questionsContainer.appendChild(answerLabel);
//     questionsContainer.appendChild(answerInput);
//     questionsContainer.appendChild(evaluateBtn);
//     questionsContainer.appendChild(resultDiv);

//     // Event listener for evaluating this specific question-answer pair
//     evaluateBtn.addEventListener('click', () => {
//       evaluateAnswer(i);
//     });
//   }

//   // Show the submit button
//   submitBtn.classList.remove('hidden');
// });
// window.handleSavedDocsClick = function (event) {
//   if (!userSession) {
//     event.preventDefault();
//     alert("You must be logged in to view saved documents!");
//     window.location.href = "login.html"; // Redirect to login page
//   } else {
//     window.location.href = "saved-documents.html"; // Redirect to the saved documents page
//   }
// };

// // Function to evaluate a specific question-answer pair
// async function evaluateAnswer(questionNum) {
//   const question = document.getElementById(`question${questionNum}`).value.trim();
//   const answer = document.getElementById(`answer${questionNum}`).value.trim();

//   if (!question || !answer) {
//     alert(`⚠️ Please fill both the question and answer for Question ${questionNum}!`);
//     return;
//   }

//   // Disable the evaluation button
//   const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
//   evaluateBtn.disabled = true;
//   evaluateBtn.textContent = `Evaluating...`;

//   try {
//     // Send the POST request to the backend for evaluation
//     const response = await fetch('http://localhost:3000/evaluate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question, userAnswer: answer })
//     });

//     // Check if the response is OK
//     if (!response.ok) {
//       throw new Error('Error while evaluating.');
//     }

//     const data = await response.json();

//     // Display the score and feedback for this specific question
//     const resultDiv = document.getElementById(`result${questionNum}`);
//     resultDiv.classList.remove('hidden');
//     resultDiv.innerHTML = `
//           <p><strong>Score:</strong> ${data.score}/10</p>
//           <p><strong>Feedback:</strong> ${data.feedback}</p>
//         `;

//   } catch (error) {
//     console.error('Evaluation Error:', error);
//     alert('⚠️ Could not evaluate the answer. Please check your backend.');
//   } finally {
//     // Re-enable the evaluation button and reset text
//     const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
//     evaluateBtn.disabled = false;
//     evaluateBtn.textContent = `Evaluate Answer ${questionNum}`;
//   }
// }

// // Event listener for submit button
// submitBtn.addEventListener('click', () => {
//   const questions = [];
//   const answers = [];

//   // Collect all questions and answers
//   for (let i = 1; i <= numQuestionsInput.value; i++) {
//     const question = document.getElementById(`question${i}`).value.trim();
//     const answer = document.getElementById(`answer${i}`).value.trim();

//     if (question && answer) {
//       questions.push(question);
//       answers.push(answer);
//     } else {
//       alert(`⚠️ Please fill in both the question and answer for Question ${i}!`);
//       return;
//     }
//   }

//   // Now you can use the collected questions and answers
//   console.log('Questions:', questions);
//   console.log('Answers:', answers);
// });
// function saveDocument(questionNum, question, answer, score, feedback) {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];

//   const doc = {
//     question: question,
//     answer: answer,
//     score: score,
//     feedback: feedback
//   };

//   savedDocs.push(doc);
//   localStorage.setItem('savedDocs', JSON.stringify(savedDocs));

//   // Update the saved documents list
//   loadSavedDocuments();
// }

// // Load saved documents from localStorage
// function loadSavedDocuments() {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];

//   savedDocsContainer.innerHTML = '';

//   savedDocs.forEach((doc, index) => {
//     const docLink = document.createElement('a');
//     docLink.href = '#';
//     docLink.textContent = `Document ${index + 1}: Score ${doc.score}`;
//     docLink.addEventListener('click', () => {
//       showSavedDocument(doc);
//     });

//     savedDocsContainer.appendChild(docLink);
//   });
// }

// // Show a saved document when clicked
// function showSavedDocument(doc) {
//   alert(`
//     Question: ${doc.question}
//     Answer: ${doc.answer}
//     Score: ${doc.score}/10
//     Feedback: ${doc.feedback}
//   `);
// }

// // Show saved documents when the "Saved Documents" link is clicked
// savedDocsLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   savedDocsContainer.classList.toggle('hidden');
//   loadSavedDocuments();
// });
// // Getting the Saved Pages link and Saved Documents container
// const savedDocsLink = document.getElementById('savedDocsLink');
// const savedDocsContainer = document.getElementById('savedDocsContainer');

// // Event listener for Saved Pages link
// savedDocsLink.addEventListener('click', (e) => {
//   e.preventDefault(); // Prevent the default link behavior

//   // Toggle visibility of the saved documents container
//   savedDocsContainer.classList.toggle('hidden');

//   // Load and display saved documents
//   loadSavedDocuments();
// });

// // Function to load saved documents from localStorage
// function loadSavedDocuments() {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];
//   savedDocsContainer.innerHTML = ''; // Clear the saved documents container

//   if (savedDocs.length === 0) {
//     savedDocsContainer.innerHTML = '<p>No saved documents found.</p>';
//   } else {
//     savedDocs.forEach((doc, index) => {
//       const docLink = document.createElement('a');
//       docLink.href = '#';
//       docLink.textContent = `Document ${index + 1}: Score ${doc.score}`;

//       // Event listener to show the document when clicked
//       docLink.addEventListener('click', () => {
//         showSavedDocument(doc);
//       });

//       savedDocsContainer.appendChild(docLink);
//     });
//   }
// }

// // Function to show a saved document's details when clicked
// function showSavedDocument(doc) {
//   alert(`
//     Question: ${doc.question}
//     Answer: ${doc.answer}
//     Score: ${doc.score}/10
//     Feedback: ${doc.feedback}
//   `);
// }
// // LOGIN FORM

// // Check if user is logged in
// function checkLoginStatus() {
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');

//   const navbarButtons = document.getElementById('navbar-buttons');
//   if (token && userName) {
//     // User is logged in: Show name instead of login button
//     navbarButtons.innerHTML = `<span class="navbar-user">👤 ${userName}</span>`;
//   } else {
//     // User not logged in: keep showing login button
//     navbarButtons.innerHTML = `<button class="navbar-btn" id="loginBtn" onclick="window.location.href='login.html'">Login</button>`;
//   }
// }

// // When "Saved Documents" clicked
// document.getElementById('savedDocsLink').addEventListener('click', function (e) {
//   e.preventDefault();

//   const token = localStorage.getItem('token');
//   if (!token) {
//     // Not logged in -> go to login page
//     window.location.href = 'login.html';
//   } else {
//     // Logged in -> Show saved documents or continue
//     console.log('✅ User is logged in, loading saved documents...');
//     // Here you can call a function to load the saved documents
//     loadSavedDocuments();
//   }
// });

// // Dummy function for now
// function loadSavedDocuments() {
//   alert("Showing your saved documents! 🚀");
// }

// // Run on page load
// checkLoginStatus();
// document.getElementById("savedDocsLink").addEventListener("click", (e) => {
//   e.preventDefault(); // stop normal link behavior

//   const token = localStorage.getItem("token"); // check for token

//   if (!token) {
//     // If token is missing (not logged in)
//     window.location.href = "login.html"; // 🔥 redirect to login page
//   } else {
//     // If token is present (logged in)
//     document.getElementById("savedDocsContainer").classList.remove("hidden");
//     loadSavedDocuments();
//   }
// });

// function loadSavedDocuments() {
//   console.log("Loading saved documents...");
// }


// // Function to show the user's name in the navbar
// DOM Elements
// const numQuestionsInput = document.getElementById('numQuestions');
// const generateQuestionsBtn = document.getElementById('generateQuestionsBtn');
// const questionsContainer = document.getElementById('questionsContainer');
// const submitBtn = document.getElementById('submitBtn');
// const savedDocsLink = document.getElementById('savedDocsLink');
// const savedDocsContainer = document.getElementById('savedDocsContainer');

// // User Session Check
// let userSession = null; // You can replace this with actual user session logic

// // Show Greeting to Logged-in User
// function showUserGreeting(name) {
//   const loginBtn = document.getElementById("loginBtn");
//   const userGreeting = document.getElementById("userGreeting");
//   const userNameSpan = document.getElementById("userName");

//   if (loginBtn) loginBtn.style.display = "none"; // Hide login button
//   if (userGreeting) {
//     userNameSpan.textContent = name; // Update with the user's name
//     userGreeting.classList.remove("hidden"); // Show the greeting
//   }
// }

// // On Page Load - Check User's Name
// window.onload = function () {
//   const savedUserName = localStorage.getItem("userName");
//   console.log("Retrieved userName from localStorage:", savedUserName);

//   if (savedUserName) {
//     showUserGreeting(savedUserName);
//   } else {
//     console.warn("No userName found in localStorage.");
//   }
// };

// // Logout Function
// function logout() {
//   localStorage.removeItem('userName');
//   alert('You have been logged out.');
//   window.location.reload();
// }

// // Event listener for generating questions
// generateQuestionsBtn.addEventListener('click', () => {
//   const numQuestions = parseInt(numQuestionsInput.value, 10);

//   if (isNaN(numQuestions) || numQuestions <= 0) {
//     alert('⚠️ Please enter a valid number of questions!');
//     return;
//   }

//   // Clear previous question inputs
//   questionsContainer.innerHTML = '';

//   // Generate question and answer input fields
//   for (let i = 1; i <= numQuestions; i++) {
//     const questionLabel = document.createElement('label');
//     questionLabel.textContent = `Question ${i}:`;

//     const questionInput = document.createElement('textarea');
//     questionInput.placeholder = `Type your question ${i} here...`;
//     questionInput.id = `question${i}`;
//     questionInput.required = true;

//     const answerLabel = document.createElement('label');
//     answerLabel.textContent = `Answer to Question ${i}:`;

//     const answerInput = document.createElement('textarea');
//     answerInput.placeholder = `Type your answer ${i} here...`;
//     answerInput.id = `answer${i}`;
//     answerInput.required = true;

//     const evaluateBtn = document.createElement('button');
//     evaluateBtn.textContent = `Evaluate Answer ${i}`;
//     evaluateBtn.classList.add('evaluateBtn');
//     evaluateBtn.id = `evaluateBtn${i}`;

//     const resultDiv = document.createElement('div');
//     resultDiv.id = `result${i}`;
//     resultDiv.classList.add('evaluation-result');
//     resultDiv.classList.add('hidden');

//     // Append question, answer, button and result to the container
//     questionsContainer.appendChild(questionLabel);
//     questionsContainer.appendChild(questionInput);
//     questionsContainer.appendChild(answerLabel);
//     questionsContainer.appendChild(answerInput);
//     questionsContainer.appendChild(evaluateBtn);
//     questionsContainer.appendChild(resultDiv);

//     // Event listener for evaluating this specific question-answer pair
//     evaluateBtn.addEventListener('click', () => {
//       evaluateAnswer(i);
//     });
//   }

//   // Show the submit button
//   submitBtn.classList.remove('hidden');
// });

// // Function to evaluate a specific question-answer pair
// async function evaluateAnswer(questionNum) {
//   const question = document.getElementById(`question${questionNum}`).value.trim();
//   const answer = document.getElementById(`answer${questionNum}`).value.trim();

//   if (!question || !answer) {
//     alert(`⚠️ Please fill both the question and answer for Question ${questionNum}!`);
//     return;
//   }

//   // Disable the evaluation button
//   const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
//   evaluateBtn.disabled = true;
//   evaluateBtn.textContent = `Evaluating...`;

//   try {
//     const response = await fetch('http://localhost:3000/evaluate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question, userAnswer: answer })
//     });

//     if (!response.ok) {
//       throw new Error('Error while evaluating.');
//     }

//     const data = await response.json();

//     const resultDiv = document.getElementById(`result${questionNum}`);
//     resultDiv.classList.remove('hidden');
//     resultDiv.innerHTML = `
//       <p><strong>Score:</strong> ${data.score}/10</p>
//       <p><strong>Feedback:</strong> ${data.feedback}</p>
//     `;

//   } catch (error) {
//     console.error('Evaluation Error:', error);
//     alert('⚠️ Could not evaluate the answer. Please check your backend.');
//   } finally {
//     const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
//     evaluateBtn.disabled = false;
//     evaluateBtn.textContent = `Evaluate Answer ${questionNum}`;
//   }
// }

// // Save Document to LocalStorage
// function saveDocument(questionNum, question, answer, score, feedback) {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];

//   const doc = {
//     question: question,
//     answer: answer,
//     score: score,
//     feedback: feedback
//   };

//   savedDocs.push(doc);
//   localStorage.setItem('savedDocs', JSON.stringify(savedDocs));
//   loadSavedDocuments();
// }

// // Load Saved Documents
// function loadSavedDocuments() {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];
//   savedDocsContainer.innerHTML = '';

//   if (savedDocs.length === 0) {
//     savedDocsContainer.innerHTML = '<p>No saved documents found.</p>';
//   } else {
//     savedDocs.forEach((doc, index) => {
//       const docLink = document.createElement('a');
//       docLink.href = '#';
//       docLink.textContent = `Document ${index + 1}: Score ${doc.score}`;

//       docLink.addEventListener('click', () => {
//         showSavedDocument(doc);
//       });

//       savedDocsContainer.appendChild(docLink);
//     });
//   }
// }

// // Show Saved Document Details
// function showSavedDocument(doc) {
//   alert(`
//     Question: ${doc.question}
//     Answer: ${doc.answer}
//     Score: ${doc.score}/10
//     Feedback: ${doc.feedback}
//   `);
// }

// // Event listener for Saved Documents link
// savedDocsLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   savedDocsContainer.classList.toggle('hidden');
//   loadSavedDocuments();
// });

// // Check Login Status
// function checkLoginStatus() {
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');
//   const navbarButtons = document.getElementById('navbar-buttons');

//   if (token && userName) {
//     navbarButtons.innerHTML = `<span class="navbar-user">👤 ${userName}</span>`;
//   } else {
//     navbarButtons.innerHTML = `<button class="navbar-btn" id="loginBtn" onclick="window.location.href='login.html'">Login</button>`;
//   }
// }
// // Check if the user is logged in
// function checkLoginStatus() {
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');
//   const navbarButtons = document.getElementById('navbar-buttons');
//   const savedDocsLink = document.getElementById('savedDocsLink');
//   const userGreeting = document.getElementById('userGreeting');
//   const loginBtn = document.getElementById('loginBtn');

//   if (token && userName) {
//     // User is logged in, show the user's name and hide the login button
//     navbarButtons.innerHTML = `<span class="navbar-user">👤 ${userName}</span><button onclick="logout()" class="logout-btn">Logout</button>`;
//     savedDocsLink.style.pointerEvents = 'auto'; // Enable the link
//   } else {
//     // User is not logged in, show login button
//     navbarButtons.innerHTML = `<button class="navbar-btn" id="loginBtn" onclick="window.location.href='login.html'">Login</button>`;
//     savedDocsLink.style.pointerEvents = 'none'; // Disable the link
//   }
// }

// // Handle Saved Documents click
// function handleSavedDocsClick(event) {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // If not logged in, prevent the default behavior and redirect to login
//     event.preventDefault();
//     window.location.href = 'login.html';
//   }
// }

// // Logout function
// function logout() {
//   // Clear local storage
//   localStorage.removeItem('token');
//   localStorage.removeItem('userName');

//   // Redirect to login page after logout
//   window.location.href = 'login.html';
// }

// // Run the login check on page load
// window.onload = function () {
//   checkLoginStatus();
// };


// // Call the function to check login status on page load
// checkLoginStatus();






// const numQuestionsInput = document.getElementById('numQuestions');
// const generateQuestionsBtn = document.getElementById('generateQuestionsBtn');
// const questionsContainer = document.getElementById('questionsContainer');
// const submitBtn = document.getElementById('submitBtn');
// const savedDocsLink = document.getElementById('savedDocsLink');
// const savedDocsContainer = document.getElementById('savedDocsContainer');

// let userSession = null;

// // Show Greeting
// function showUserGreeting(name) {
//   const loginBtn = document.getElementById("loginBtn");
//   const userGreeting = document.getElementById("userGreeting");
//   const userNameSpan = document.getElementById("userName");

//   if (loginBtn) loginBtn.style.display = "none";
//   if (userGreeting) {
//     userNameSpan.textContent = name;
//     userGreeting.classList.remove("hidden");
//   }
// }

// function checkLoginStatus() {
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');
//   const navbarButtons = document.getElementById('navbar-buttons');
//   const savedDocsLink = document.getElementById('savedDocsLink');

//   if (token && userName) {
//     navbarButtons.innerHTML = `<span class="navbar-user">👤 ${userName}</span><button onclick="logout()" class="logout-btn">Logout</button>`;
//     savedDocsLink.style.pointerEvents = 'auto';
//   } else {
//     navbarButtons.innerHTML = `<button class="navbar-btn" id="loginBtn" onclick="window.location.href='login.html'">Login</button>`;
//     savedDocsLink.style.pointerEvents = 'none';
//   }
// }

// // Logout
// function logout() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userName');
//   window.location.href = 'login.html';
// }

// window.onload = function () {
//   checkLoginStatus();
// };

// // Generate questions
// generateQuestionsBtn.addEventListener('click', () => {
//   const numQuestions = parseInt(numQuestionsInput.value, 10);

//   if (isNaN(numQuestions) || numQuestions <= 0) {
//     alert('⚠️ Please enter a valid number of questions!');
//     return;
//   }

//   questionsContainer.innerHTML = '';

//   for (let i = 1; i <= numQuestions; i++) {
//     const questionLabel = document.createElement('label');
//     questionLabel.textContent = `Question ${i}:`;

//     const questionInput = document.createElement('textarea');
//     questionInput.placeholder = `Type your question ${i} here...`;
//     questionInput.id = `question${i}`;

//     const answerLabel = document.createElement('label');
//     answerLabel.textContent = `Answer to Question ${i}:`;

//     const answerInput = document.createElement('textarea');
//     answerInput.placeholder = `Type your answer ${i} here...`;
//     answerInput.id = `answer${i}`;

//     const evaluateBtn = document.createElement('button');
//     evaluateBtn.textContent = `Evaluate Answer ${i}`;
//     evaluateBtn.classList.add('evaluateBtn');
//     evaluateBtn.id = `evaluateBtn${i}`;

//     const resultDiv = document.createElement('div');
//     resultDiv.id = `result${i}`;
//     resultDiv.classList.add('evaluation-result', 'hidden');

//     questionsContainer.appendChild(questionLabel);
//     questionsContainer.appendChild(questionInput);
//     questionsContainer.appendChild(answerLabel);
//     questionsContainer.appendChild(answerInput);
//     questionsContainer.appendChild(evaluateBtn);
//     questionsContainer.appendChild(resultDiv);

//     evaluateBtn.addEventListener('click', () => {
//       evaluateAnswer(i);
//     });
//   }

//   submitBtn.classList.remove('hidden');
// });

// // Evaluate Answer
// async function evaluateAnswer(questionNum) {
//   const question = document.getElementById(`question${questionNum}`).value.trim();
//   const answer = document.getElementById(`answer${questionNum}`).value.trim();

//   if (!question || !answer) {
//     alert(`⚠️ Please fill both the question and answer for Question ${questionNum}!`);
//     return;
//   }

//   const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
//   evaluateBtn.disabled = true;
//   evaluateBtn.textContent = `Evaluating...`;

//   try {
//     const response = await fetch('http://localhost:3000/evaluate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question, userAnswer: answer })
//     });

//     if (!response.ok) {
//       throw new Error('Error while evaluating.');
//     }

//     const data = await response.json();

//     const resultDiv = document.getElementById(`result${questionNum}`);
//     resultDiv.classList.remove('hidden');
//     resultDiv.innerHTML = `
//         <p><strong>Score:</strong> ${data.score}/10</p>
//         <p><strong>Feedback:</strong> ${data.feedback}</p>
//         <a href="${data.pdfFile}" target="_blank" download="evaluation${questionNum}.pdf">📄 Download Evaluation PDF</a>
//       `;

//     // ✅ Save the document details
//     saveDocument(question, answer, data.score, data.feedback, data.pdfFile);

//   } catch (error) {
//     console.error('Evaluation Error:', error);
//     alert('⚠️ Could not evaluate the answer. Please check your backend.');
//   } finally {
//     evaluateBtn.disabled = false;
//     evaluateBtn.textContent = `Evaluate Answer ${questionNum}`;
//   }
// }

// // Save Document to localStorage
// function saveDocument(question, answer, score, feedback, pdfFile) {
//   const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];
//   const doc = { question, answer, score, feedback, pdfFile };
//   savedDocs.push(doc);
//   localStorage.setItem('savedDocs', JSON.stringify(savedDocs));
// }




const numQuestionsInput = document.getElementById('numQuestions');
const generateQuestionsBtn = document.getElementById('generateQuestionsBtn');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const savedDocsLink = document.getElementById('savedDocsLink');
const savedDocsContainer = document.getElementById('savedDocsContainer');

let userSession = null;

// Show Greeting
function showUserGreeting(name) {
  const loginBtn = document.getElementById("loginBtn");
  const userGreeting = document.getElementById("userGreeting");
  const userNameSpan = document.getElementById("userName");

  if (loginBtn) loginBtn.style.display = "none";
  if (userGreeting) {
    userNameSpan.textContent = name;
    userGreeting.classList.remove("hidden");
  }
}

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const navbarButtons = document.getElementById('navbar-buttons');
  const savedDocsLink = document.getElementById('savedDocsLink');

  if (token && userName) {
    navbarButtons.innerHTML = `<span class="navbar-user">👤 ${userName}</span><button onclick="logout()" class="logout-btn">Logout</button>`;
    savedDocsLink.style.pointerEvents = 'auto';
  } else {
    navbarButtons.innerHTML = `<button class="navbar-btn" id="loginBtn" onclick="window.location.href='login.html'">Login</button>`;
    savedDocsLink.style.pointerEvents = 'none';
  }
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.href = 'login.html';
}

window.onload = function () {
  checkLoginStatus();
};

// Generate questions dynamically
generateQuestionsBtn.addEventListener('click', () => {
  const numQuestions = parseInt(numQuestionsInput.value, 10);

  if (isNaN(numQuestions) || numQuestions <= 0) {
    alert('⚠️ Please enter a valid number of questions!');
    return;
  }

  questionsContainer.innerHTML = '';

  for (let i = 1; i <= numQuestions; i++) {
    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Question ${i}:`;

    const questionInput = document.createElement('textarea');
    questionInput.placeholder = `Type your question ${i} here...`;
    questionInput.id = `question${i}`;

    const answerLabel = document.createElement('label');
    answerLabel.textContent = `Answer to Question ${i}:`;

    const answerInput = document.createElement('textarea');
    answerInput.placeholder = `Type your answer ${i} here...`;
    answerInput.id = `answer${i}`;

    const evaluateBtn = document.createElement('button');
    evaluateBtn.textContent = `Evaluate Answer ${i}`;
    evaluateBtn.classList.add('evaluateBtn');
    evaluateBtn.id = `evaluateBtn${i}`;

    const resultDiv = document.createElement('div');
    resultDiv.id = `result${i}`;
    resultDiv.classList.add('evaluation-result', 'hidden');

    questionsContainer.appendChild(questionLabel);
    questionsContainer.appendChild(questionInput);
    questionsContainer.appendChild(answerLabel);
    questionsContainer.appendChild(answerInput);
    questionsContainer.appendChild(evaluateBtn);
    questionsContainer.appendChild(resultDiv);

    evaluateBtn.addEventListener('click', () => {
      evaluateAnswer(i);
    });
  }

  submitBtn.classList.remove('hidden');
});

// Submit all questions and answers as a single evaluation
submitBtn.addEventListener('click', () => {
  const evaluations = [];  // Array to store all the evaluations

  // Collect all the questions and answers
  for (let i = 1; i <= numQuestionsInput.value; i++) {
    const question = document.getElementById(`question${i}`).value.trim();
    const answer = document.getElementById(`answer${i}`).value.trim();

    if (!question || !answer) {
      alert(`⚠️ Please fill both the question and answer for Question ${i}!`);
      return;
    }

    evaluations.push({ question, answer });
  }

  // Send all questions and answers as a single batch to the backend
  fetch('http://localhost:3000/save-evaluation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evaluations })  // Send an array of evaluations
  })
    .then(response => response.json())
    .then(data => {
      if (data.pdfFile) {
        // Show the link to download the single PDF containing all evaluations
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
          <p>Your evaluations have been saved successfully!</p>
          <a href="${data.pdfFile}" target="_blank" download="evaluation.pdf">📄 Download Evaluation PDF</a>
        `;
        savedDocsContainer.appendChild(resultDiv);
      } else {
        alert('Error saving evaluations.');
      }
    })
    .catch(error => {
      console.error('Error saving evaluations:', error);
      alert('Error saving evaluations.');
    });
});

// Evaluate Answer
async function evaluateAnswer(questionNum) {
  const question = document.getElementById(`question${questionNum}`).value.trim();
  const answer = document.getElementById(`answer${questionNum}`).value.trim();

  if (!question || !answer) {
    alert(`⚠️ Please fill both the question and answer for Question ${questionNum}!`);
    return;
  }

  const evaluateBtn = document.getElementById(`evaluateBtn${questionNum}`);
  evaluateBtn.disabled = true;
  evaluateBtn.textContent = `Evaluating...`;

  try {
    const response = await fetch('http://localhost:3000/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, userAnswer: answer })
    });

    if (!response.ok) {
      throw new Error('Error while evaluating.');
    }

    const data = await response.json();

    const resultDiv = document.getElementById(`result${questionNum}`);
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <p><strong>Score:</strong> ${data.score}/10</p>
      <p><strong>Feedback:</strong> ${data.feedback}</p>
      <a href="${data.pdfFile}" target="_blank" download="evaluation${questionNum}.pdf">📄 Download Evaluation PDF</a>
    `;

    // ✅ Save the document details
    saveDocument(question, answer, data.score, data.feedback, data.pdfFile);

  } catch (error) {
    console.error('Evaluation Error:', error);
    alert('⚠️ Could not evaluate the answer. Please check your backend.');
  } finally {
    evaluateBtn.disabled = false;
    evaluateBtn.textContent = `Evaluate Answer ${questionNum}`;
  }
}

// Save Document to localStorage
function saveDocument(question, answer, score, feedback, pdfFile) {
  const savedDocs = JSON.parse(localStorage.getItem('savedDocs')) || [];
  const doc = { question, answer, score, feedback, pdfFile };
  savedDocs.push(doc);
  localStorage.setItem('savedDocs', JSON.stringify(savedDocs));
}
