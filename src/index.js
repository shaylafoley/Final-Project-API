import { createElement } from "./utils";


const helloNode = createElement('h1', {textContent: "Hello World! "})
document.getElementById('root').appendChild(helloNode);

