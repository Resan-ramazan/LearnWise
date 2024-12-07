import { db } from "./firebaseConfig.js";
import { setDoc, doc } from "firebase/firestore";

const quizData = {
  "html_quiz": {
    "name": "HTML Fundamental Knowledge Quiz",
    "image": "https://firebasestorage.googleapis.com/v0/b/learnwise-1099b.appspot.com/o/quiz-images%2Fhtml.jpg?alt=media",
    "estimatedTime": "10",
    "questions": [
        {
          "question": "What is the outermost tag that defines the basic structure of a web page in HTML?",
          "options": ["<body>", "<html>", "<head>", "<document>"],
          "correctAnswer": "<html>"
        },
        {
          "question": "Which of the following is NOT a heading tag in HTML?",
          "options": ["<h1>", "<h2>", "<header>", "<h6>"],
          "correctAnswer": "<header>"
        },
        {
          "question": "Which HTML tag is used to define a link?",
          "options": ["<link>", "<url>", "<a>", "<href>"],
          "correctAnswer": "<a>"
        },
        {
          "question": "Which HTML tag is used to add an image?",
          "options": ["<picture>", "<img>", "<image>", "<src>"],
          "correctAnswer": "<img>"
        },
        {
          "question": "Which tag is used to create an unordered list in HTML?",
          "options": ["<ol>", "<ul>", "<list>", "<li>"],
          "correctAnswer": "<ul>"
        },
        {
          "question": "Which input type is used to create a text input field in a form?",
          "options": ["<input type='text'>", "<textbox>", "<input type='textarea'>", "<text>"],
          "correctAnswer": "<input type='text'>"
        },
        {
          "question": "Which tag introduced in HTML5 is used for video playback?",
          "options": ["<media>", "<videoplay>", "<video>", "<stream>"],
          "correctAnswer": "<video>"
        },
        {
          "question": "Which semantic tag is used to group sections on a page?",
          "options": ["<group>", "<section>", "<div>", "<part>"],
          "correctAnswer": "<section>"
        },
        {
          "question": "Which tag is used to display text in bold in HTML?",
          "options": ["<strong>", "<b>", "<bold>", "<thick>"],
          "correctAnswer": "<strong>"
        },
        {
          "question": "Which tag defines a table row in HTML?",
          "options": ["<column>", "<tr>", "<td>", "<table-row>"],
          "correctAnswer": "<tr>"
        }
      ]
  },
  "css_quiz": {
    "name": "CSS Fundamental Knowledge Quiz",
    "image": "https://firebasestorage.googleapis.com/v0/b/learnwise-1099b.appspot.com/o/quiz-images%2Fcss.jpg?alt=media",
    "estimatedTime": "10",
   "questions": [
        {
          "question": "What does the # symbol represent when selecting an element in CSS?",
          "options": ["Class selector", "Element selector", "ID selector", "Universal selector"],
          "correctAnswer": "ID selector"
        },
        {
          "question": "Which of the following is a margin property in CSS?",
          "options": ["border", "padding", "margin", "space"],
          "correctAnswer": "margin"
        },
        {
          "question": "Which property controls the arrangement of items in a flex container?",
          "options": ["flex-direction", "align-items", "justify-content", "flex-wrap"],
          "correctAnswer": "flex-direction"
        },
        {
          "question": "What value is used to make an element completely transparent in CSS?",
          "options": ["transparent", "opacity: 0", "display: none", "visibility: hidden"],
          "correctAnswer": "opacity: 0"
        },
        {
          "question": "Which is a valid CSS color definition?",
          "options": ["color: red", "background: #ff0000", "color = red", "background-color: rgb(255,0,0)"],
          "correctAnswer": "background-color: rgb(255,0,0)"
        },
        {
          "question": "When does the CSS pseudo-class :hover work?",
          "options": ["When the page loads", "When the mouse hovers over an element", "When clicked", "When selected"],
          "correctAnswer": "When the mouse hovers over an element"
        },
        {
          "question": "Which CSS property is used to define columns in a grid system?",
          "options": ["grid-template-rows", "grid-template-columns", "grid-column", "grid-gap"],
          "correctAnswer": "grid-template-columns"
        },
        {
          "question": "Which unit is NOT used for responsive design in CSS?",
          "options": ["px", "rem", "em", "absolute"],
          "correctAnswer": "absolute"
        },
        {
          "question": "Which CSS property is used to change the background color of an element?",
          "options": ["color", "background", "background-color", "paint"],
          "correctAnswer": "background-color"
        },
        {
          "question": "What CANNOT be done with the CSS transform property?",
          "options": ["Rotation", "Scaling", "Sliding", "Database connection"],
          "correctAnswer": "Database connection"
        }
      ]
  },
  "javascript_quiz": {
    "name": "JavaScript Fundamental Knowledge Quiz",
    "image": "https://firebasestorage.googleapis.com/v0/b/learnwise-1099b.appspot.com/o/quiz-images%2Fjavascript.jpg?alt=media",
    "estimatedTime": "10",
    "questions": [
        {
          "question": "What keywords are used to declare a variable in JavaScript?",
          "options": ["var, let, const", "variable, let, create", "def, var, const", "int, string, bool"],
          "correctAnswer": "var, let, const"
        },
        {
          "question": "Which is a correct way to define a function in JavaScript?",
          "options": ["function myFunction()", "def myFunction():", "myFunction = function()", "create myFunction()"],
          "correctAnswer": "function myFunction()"
        },
        {
          "question": "Which property is used to find the length of an array in JavaScript?",
          "options": ["length()", "size", "count", "length"],
          "correctAnswer": "length"
        },
        {
          "question": "Which is NOT a comparison operator in JavaScript?",
          "options": ["===", "==", ">=", "=>"],
          "correctAnswer": "=>"
        },
        {
          "question": "What keyword is used to declare a function before calling it in JavaScript?",
          "options": ["prepare", "define", "function", "declare"],
          "correctAnswer": "function"
        },
        {
          "question": "Which is a method of declaring a global variable in JavaScript?",
          "options": ["let x = 5", "const x = 5", "var x = 5", "global x = 5"],
          "correctAnswer": "var x = 5"
        },
        {
          "question": "Which method is used to add an element to an array in JavaScript?",
          "options": ["push()", "add()", "insert()", "append()"],
          "correctAnswer": "push()"
        },
        {
          "question": "Which is NOT a way of creating an object in JavaScript?",
          "options": ["{}", "new Object()", "Object.create()", "create Object()"],
          "correctAnswer": "create Object()"
        },
        {
          "question": "What keyword is used to define a condition block in JavaScript?",
          "options": ["when", "switch", "condition", "if"],
          "correctAnswer": "if"
        },
        {
          "question": "Which is NOT a type of loop in JavaScript?",
          "options": ["for", "while", "do-while", "repeat"],
          "correctAnswer": "repeat"
        }
      ]
  }
}

const uploadQuizzes = async () => {
  try {
    for (const [quizId, quiz] of Object.entries(quizData)) {
      await setDoc(doc(db, 'quizzes', quizId), quiz)
    }
    console.log('Quizler başarıyla yüklendi!')
  } catch (error) {
    console.error('Yükleme hatası:', error)
  }
}

uploadQuizzes()