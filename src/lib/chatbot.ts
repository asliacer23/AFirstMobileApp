// Hard-coded offline chatbot responses
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const responses: Record<string, string> = {
  // HTML Questions
  'html': 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It structures content using elements and tags.',
  'html tag': 'HTML tags are keywords surrounded by angle brackets like <p>, <div>, <h1>. Most tags come in pairs: opening <tag> and closing </tag>.',
  'html structure': 'A basic HTML structure includes: <!DOCTYPE html>, <html>, <head> (metadata), and <body> (visible content).',
  'heading': 'HTML has 6 heading levels: <h1> (most important) to <h6> (least important). Use them to create document hierarchy.',
  'paragraph': 'The <p> tag defines a paragraph. Browsers automatically add space before and after paragraphs.',
  'link': 'Use <a href="url">text</a> to create hyperlinks. The href attribute specifies the destination.',
  'image': 'The <img> tag displays images: <img src="url" alt="description">. The alt attribute is important for accessibility.',
  'list': 'HTML has two list types: <ul> for unordered (bulleted) lists and <ol> for ordered (numbered) lists. Items use <li>.',
  'form': 'Forms collect user input using <form> element. Include <input>, <textarea>, <select>, and <button> elements.',
  'table': 'Tables organize data in rows (<tr>) and cells (<td> for data, <th> for headers) within a <table> element.',
  
  // CSS Questions
  'css': 'CSS (Cascading Style Sheets) styles HTML elements. It controls colors, fonts, layouts, spacing, and more.',
  'selector': 'CSS selectors target elements: element (p), class (.classname), ID (#idname), or attribute ([type="text"]).',
  'color': 'Set colors using color property for text or background-color for backgrounds. Use hex (#ff0000), rgb(255,0,0), or named colors.',
  'font': 'Control fonts with font-family, font-size, font-weight, and font-style properties.',
  'margin': 'margin creates space outside an element. Use margin: 10px; or specify sides: margin-top, margin-right, etc.',
  'padding': 'padding creates space inside an element, between content and border. Syntax is similar to margin.',
  'border': 'Borders go around elements: border: 2px solid black; Sets width, style, and color.',
  'box model': 'The CSS box model consists of content, padding, border, and margin (from inside out).',
  'flexbox': 'Flexbox creates flexible layouts using display: flex; Control with justify-content, align-items, and flex-direction.',
  'grid': 'CSS Grid creates two-dimensional layouts: display: grid; Define columns with grid-template-columns.',
  'responsive': 'Use media queries to create responsive designs: @media (max-width: 768px) { /* mobile styles */ }',
  
  // JavaScript Questions
  'javascript': 'JavaScript adds interactivity to web pages. It can manipulate HTML, handle events, validate forms, and more.',
  'variable': 'Declare variables with let (changeable) or const (constant). Example: let name = "John"; const age = 25;',
  'function': 'Functions are reusable code blocks: function name(param) { return result; } or const name = (param) => result;',
  'array': 'Arrays store multiple values: const arr = [1, 2, 3]; Access items with arr[0]. Use .push() to add items.',
  'object': 'Objects store key-value pairs: const obj = { name: "John", age: 25 }; Access with obj.name or obj["name"].',
  'loop': 'Loops repeat code: for (let i = 0; i < 5; i++) { } or array.forEach(item => { })',
  'condition': 'Conditionals execute code based on conditions: if (condition) { } else if (condition) { } else { }',
  'dom': 'The DOM (Document Object Model) represents HTML structure. Use document.querySelector() to select elements.',
  'event': 'Events respond to user actions: element.addEventListener("click", function() { /* code */ });',
  'string': 'Strings are text: const text = "hello"; Concatenate with + or template literals: `Hello ${name}`',
  'number': 'Numbers can be integers or decimals. Use +, -, *, /, % for arithmetic operations.',
  
  // Error Help
  'error': 'Common errors: syntax errors (typos), reference errors (undefined variables), type errors (wrong data type). Check the console for details.',
  'syntax error': 'Syntax errors occur from typos or incorrect code structure. Check for missing brackets, semicolons, or quotes.',
  'undefined': '"Undefined" means a variable has no value. Make sure to declare and assign values to variables before using them.',
  'null': 'null represents intentional absence of value. Check if a value exists before using it: if (value !== null) { }',
  
  // General
  'help': 'I can help with HTML, CSS, and JavaScript questions! Ask me about tags, properties, functions, or coding concepts.',
  'learn': 'Start with HTML basics, then move to CSS for styling, and finally JavaScript for interactivity. Practice regularly!',
  'practice': 'The best way to learn is by doing! Try the lessons and quizzes, then build your own projects.',
  'certificate': 'Complete all lessons and pass quizzes to earn your certificate. Track your progress in the dashboard!'
};

export const getChatbotResponse = (userInput: string): string => {
  const input = userInput.toLowerCase().trim();
  
  // Check for exact or partial matches
  for (const [key, response] of Object.entries(responses)) {
    if (input.includes(key)) {
      return response;
    }
  }
  
  // Fallback responses
  const fallbacks = [
    "That's a great question! Try checking the relevant lesson in the Modules section for detailed information.",
    "I'm not sure about that specific question, but have you tried looking at the related lessons? They have detailed examples and explanations.",
    "Good question! The lessons in the Modules section cover this topic with code examples you can practice with.",
    "I can help with HTML, CSS, and JavaScript questions. Could you rephrase your question or ask about a specific concept?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
