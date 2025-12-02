export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'html' | 'css' | 'javascript';
  questions: Question[];
  passingScore: number;
}

export const quizzes: Quiz[] = [
  {
    id: 'html-quiz',
    title: 'HTML Fundamentals Quiz',
    category: 'html',
    passingScore: 70,
    questions: [
      {
        id: 'html-q1',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0,
        explanation: 'HTML stands for HyperText Markup Language, the standard language for creating web pages.'
      },
      {
        id: 'html-q2',
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<heading>', '<h6>', '<h1>', '<head>'],
        correctAnswer: 2,
        explanation: '<h1> is used for the largest and most important heading, while <h6> is the smallest.'
      },
      {
        id: 'html-q3',
        question: 'What is the correct HTML for creating a hyperlink?',
        options: [
          '<a url="http://example.com">Example</a>',
          '<a href="http://example.com">Example</a>',
          '<link>http://example.com</link>',
          '<hyperlink>http://example.com</hyperlink>'
        ],
        correctAnswer: 1,
        explanation: 'The <a> tag with href attribute is used to create hyperlinks in HTML.'
      },
      {
        id: 'html-q4',
        question: 'Which tag is used to define an unordered list?',
        options: ['<ol>', '<list>', '<ul>', '<li>'],
        correctAnswer: 2,
        explanation: '<ul> creates an unordered (bulleted) list, while <ol> creates ordered (numbered) lists.'
      },
      {
        id: 'html-q5',
        question: 'What attribute specifies alternative text for an image?',
        options: ['title', 'alt', 'src', 'text'],
        correctAnswer: 1,
        explanation: 'The alt attribute provides alternative text for images, important for accessibility.'
      }
    ]
  },
  {
    id: 'css-quiz',
    title: 'CSS Styling Quiz',
    category: 'css',
    passingScore: 70,
    questions: [
      {
        id: 'css-q1',
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 1,
        explanation: 'CSS stands for Cascading Style Sheets, used to style HTML documents.'
      },
      {
        id: 'css-q2',
        question: 'Which CSS property is used to change text color?',
        options: ['text-color', 'font-color', 'color', 'text-style'],
        correctAnswer: 2,
        explanation: 'The color property sets the color of text in CSS.'
      },
      {
        id: 'css-q3',
        question: 'How do you select an element with class "menu"?',
        options: ['#menu', '.menu', 'menu', '*menu'],
        correctAnswer: 1,
        explanation: 'A period (.) before the name selects elements by class in CSS.'
      },
      {
        id: 'css-q4',
        question: 'Which property is used to change background color?',
        options: ['bgcolor', 'background-color', 'color-background', 'bg-color'],
        correctAnswer: 1,
        explanation: 'background-color sets the background color of an element.'
      },
      {
        id: 'css-q5',
        question: 'What is the correct CSS syntax for making all <p> bold?',
        options: [
          'p {text-size: bold;}',
          'p {font-weight: bold;}',
          '<p style="text-size: bold;">',
          'p {font-style: bold;}'
        ],
        correctAnswer: 1,
        explanation: 'font-weight: bold; makes text bold in CSS.'
      }
    ]
  },
  {
    id: 'js-quiz',
    title: 'JavaScript Basics Quiz',
    category: 'javascript',
    passingScore: 70,
    questions: [
      {
        id: 'js-q1',
        question: 'Inside which HTML element do we put JavaScript?',
        options: ['<javascript>', '<js>', '<script>', '<scripting>'],
        correctAnswer: 2,
        explanation: 'JavaScript code is placed inside <script> tags in HTML.'
      },
      {
        id: 'js-q2',
        question: 'How do you declare a JavaScript variable?',
        options: ['variable name;', 'v name;', 'let name;', 'var: name;'],
        correctAnswer: 2,
        explanation: 'Use let (or const) to declare variables in modern JavaScript.'
      },
      {
        id: 'js-q3',
        question: 'Which operator is used to assign a value to a variable?',
        options: ['*', '=', '-', 'x'],
        correctAnswer: 1,
        explanation: 'The = operator assigns values to variables in JavaScript.'
      },
      {
        id: 'js-q4',
        question: 'How do you call a function named "myFunction"?',
        options: [
          'call myFunction()',
          'myFunction()',
          'call function myFunction',
          'execute myFunction()'
        ],
        correctAnswer: 1,
        explanation: 'Functions are called using their name followed by parentheses.'
      },
      {
        id: 'js-q5',
        question: 'How do you write a comment in JavaScript?',
        options: [
          '<!-- This is a comment -->',
          '// This is a comment',
          '/* This is a comment',
          '** This is a comment'
        ],
        correctAnswer: 1,
        explanation: '// creates a single-line comment in JavaScript.'
      }
    ]
  }
];

export const getQuizById = (id: string) => {
  return quizzes.find(quiz => quiz.id === id);
};
