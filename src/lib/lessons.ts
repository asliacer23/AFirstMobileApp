export interface Lesson {
  id: string;
  title: string;
  category: 'html' | 'css' | 'javascript';
  description: string;
  content: string;
  codeExample: string;
  practiceNotes: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const lessons: Lesson[] = [
  // HTML Lessons
  {
    id: 'html-1',
    title: 'Introduction to HTML',
    category: 'html',
    difficulty: 'beginner',
    description: 'Learn the basics of HTML structure and elements',
    content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup. HTML elements are the building blocks of HTML pages.`,
    codeExample: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome to HTML</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
    practiceNotes: 'Try creating your own HTML document with different headings and paragraphs.'
  },
  {
    id: 'html-2',
    title: 'HTML Headings and Paragraphs',
    category: 'html',
    difficulty: 'beginner',
    description: 'Understanding heading hierarchy and text formatting',
    content: `HTML headings are defined with <h1> to <h6> tags. <h1> defines the most important heading, while <h6> defines the least important. Paragraphs are defined with the <p> tag.`,
    codeExample: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<p>This is a paragraph of text that explains something important.</p>
<p>Another paragraph continues the explanation.</p>`,
    practiceNotes: 'Create a blog post structure using different heading levels and multiple paragraphs.'
  },
  {
    id: 'html-3',
    title: 'HTML Links and Images',
    category: 'html',
    difficulty: 'beginner',
    description: 'Adding hyperlinks and images to your web pages',
    content: `Links are created using the <a> tag with an href attribute. Images are added using the <img> tag with src and alt attributes.`,
    codeExample: `<a href="https://example.com">Visit Example</a>
<a href="page2.html">Go to Page 2</a>

<img src="photo.jpg" alt="Description of photo" width="300">`,
    practiceNotes: 'Create a page with navigation links and at least 3 images with proper alt text.'
  },
  {
    id: 'html-4',
    title: 'HTML Lists',
    category: 'html',
    difficulty: 'beginner',
    description: 'Creating ordered and unordered lists',
    content: `HTML supports ordered lists (<ol>) and unordered lists (<ul>). List items are defined with <li> tags.`,
    codeExample: `<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>

<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>`,
    practiceNotes: 'Create a shopping list (unordered) and a recipe with steps (ordered).'
  },
  {
    id: 'html-5',
    title: 'HTML Forms',
    category: 'html',
    difficulty: 'intermediate',
    description: 'Building interactive forms for user input',
    content: `Forms are used to collect user input. The <form> element contains various input elements like text fields, checkboxes, radio buttons, and submit buttons.`,
    codeExample: `<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <input type="submit" value="Submit">
</form>`,
    practiceNotes: 'Create a contact form with name, email, message fields, and a submit button.'
  },
  {
    id: 'html-6',
    title: 'HTML Tables',
    category: 'html',
    difficulty: 'intermediate',
    description: 'Organizing data in tables',
    content: `Tables are defined with the <table> tag. Use <tr> for rows, <th> for header cells, and <td> for data cells.`,
    codeExample: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
    <td>Manila</td>
  </tr>
</table>`,
    practiceNotes: 'Create a table showing student grades with columns for name, subject, and score.'
  },

  // CSS Lessons
  {
    id: 'css-1',
    title: 'Introduction to CSS',
    category: 'css',
    difficulty: 'beginner',
    description: 'Styling web pages with CSS',
    content: `CSS (Cascading Style Sheets) is used to style HTML elements. It controls colors, fonts, spacing, layouts, and more. CSS can be inline, internal, or external.`,
    codeExample: `/* External CSS file */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}`,
    practiceNotes: 'Create an external CSS file and link it to your HTML document.'
  },
  {
    id: 'css-2',
    title: 'CSS Selectors',
    category: 'css',
    difficulty: 'beginner',
    description: 'Targeting HTML elements with selectors',
    content: `CSS selectors are patterns used to select elements. Common selectors include element selectors, class selectors (.classname), and ID selectors (#idname).`,
    codeExample: `/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }`,
    practiceNotes: 'Style different elements using various selector types in a single page.'
  },
  {
    id: 'css-3',
    title: 'CSS Box Model',
    category: 'css',
    difficulty: 'intermediate',
    description: 'Understanding margin, border, padding, and content',
    content: `The CSS box model consists of margins, borders, padding, and the content area. Every element is a box with these properties.`,
    codeExample: `.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}`,
    practiceNotes: 'Create boxes with different margin, padding, and border combinations.'
  },
  {
    id: 'css-4',
    title: 'CSS Flexbox',
    category: 'css',
    difficulty: 'intermediate',
    description: 'Creating flexible layouts with Flexbox',
    content: `Flexbox is a layout model that allows elements to align and distribute space within a container. It's perfect for creating responsive layouts.`,
    codeExample: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
  margin: 10px;
}`,
    practiceNotes: 'Build a navigation bar and a card layout using Flexbox.'
  },
  {
    id: 'css-5',
    title: 'CSS Grid',
    category: 'css',
    difficulty: 'advanced',
    description: 'Advanced layouts with CSS Grid',
    content: `CSS Grid is a powerful layout system for creating two-dimensional layouts. It allows you to create complex responsive designs easily.`,
    codeExample: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-item {
  background: #ddd;
  padding: 20px;
}`,
    practiceNotes: 'Create a photo gallery using CSS Grid with responsive columns.'
  },
  {
    id: 'css-6',
    title: 'CSS Animations',
    category: 'css',
    difficulty: 'advanced',
    description: 'Adding motion to your web pages',
    content: `CSS animations allow you to animate element properties over time using keyframes. You can create smooth transitions and complex animations.`,
    codeExample: `@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated {
  animation: slideIn 0.5s ease-out;
}`,
    practiceNotes: 'Create a button with hover animations and a loading spinner.'
  },

  // JavaScript Lessons
  {
    id: 'js-1',
    title: 'Introduction to JavaScript',
    category: 'javascript',
    difficulty: 'beginner',
    description: 'Getting started with JavaScript programming',
    content: `JavaScript is a programming language that adds interactivity to web pages. It can update HTML content, change styles, validate forms, and much more.`,
    codeExample: `// Display a message
console.log("Hello, JavaScript!");

// Change HTML content
document.getElementById("demo").innerHTML = "Text changed!";

// Simple calculation
let sum = 5 + 3;
console.log(sum); // 8`,
    practiceNotes: 'Write a script that displays your name in the console and changes text on a button click.'
  },
  {
    id: 'js-2',
    title: 'JavaScript Variables',
    category: 'javascript',
    difficulty: 'beginner',
    description: 'Storing and manipulating data with variables',
    content: `Variables are containers for storing data. Use let for variables that change, const for constants, and avoid var.`,
    codeExample: `let name = "Juan";
const age = 21;
let isStudent = true;

// Update variable
name = "Maria";

console.log(name); // Maria
console.log(age);  // 21`,
    practiceNotes: 'Create variables for a user profile (name, age, city) and display them.'
  },
  {
    id: 'js-3',
    title: 'JavaScript Functions',
    category: 'javascript',
    difficulty: 'beginner',
    description: 'Creating reusable blocks of code',
    content: `Functions are reusable blocks of code. They can take parameters and return values. Functions help organize and reuse code.`,
    codeExample: `function greet(name) {
  return "Hello, " + name + "!";
}

const result = greet("Carlos");
console.log(result); // Hello, Carlos!

// Arrow function
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8`,
    practiceNotes: 'Create a calculator function that adds, subtracts, multiplies, and divides.'
  },
  {
    id: 'js-4',
    title: 'JavaScript Arrays',
    category: 'javascript',
    difficulty: 'intermediate',
    description: 'Working with lists of data',
    content: `Arrays are used to store multiple values in a single variable. You can access, modify, and iterate through array elements.`,
    codeExample: `const fruits = ["apple", "banana", "orange"];

// Access elements
console.log(fruits[0]); // apple

// Add element
fruits.push("mango");

// Loop through array
fruits.forEach(fruit => {
  console.log(fruit);
});`,
    practiceNotes: 'Create an array of your favorite movies and display them on the page.'
  },
  {
    id: 'js-5',
    title: 'JavaScript Objects',
    category: 'javascript',
    difficulty: 'intermediate',
    description: 'Organizing data with objects',
    content: `Objects store collections of key-value pairs. They're perfect for representing real-world entities with properties and methods.`,
    codeExample: `const student = {
  name: "Ana",
  age: 20,
  course: "IT",
  greet: function() {
    return "Hi, I'm " + this.name;
  }
};

console.log(student.name); // Ana
console.log(student.greet()); // Hi, I'm Ana`,
    practiceNotes: 'Create a book object with title, author, year, and a method to display info.'
  },
  {
    id: 'js-6',
    title: 'JavaScript DOM Manipulation',
    category: 'javascript',
    difficulty: 'advanced',
    description: 'Dynamically updating web pages',
    content: `The DOM (Document Object Model) represents the HTML structure. JavaScript can select, create, modify, and delete HTML elements dynamically.`,
    codeExample: `// Select element
const button = document.querySelector("#myButton");

// Add event listener
button.addEventListener("click", function() {
  // Create new element
  const p = document.createElement("p");
  p.textContent = "New paragraph!";
  document.body.appendChild(p);
});`,
    practiceNotes: 'Build a todo list where users can add and remove items dynamically.'
  }
];

export const getLessonsByCategory = (category: 'html' | 'css' | 'javascript') => {
  return lessons.filter(lesson => lesson.category === category);
};

export const getLessonById = (id: string) => {
  return lessons.find(lesson => lesson.id === id);
};
