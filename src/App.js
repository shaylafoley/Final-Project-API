import { createElement } from './utils';
import { initRouter } from './router';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'Final Project - NASA App',
    className: 'heading',
  });

  // nav items
  const page1 = createElement('a', {
    href: '/#/page1',
    textContent: 'Picture of the Day',
    className: 'link-text',
  });
  const page2 = createElement('a', {
    href: '/#/page2',
    textContent: 'Search NASA Pictures',
    className: 'link-text'
  });
  const page3 = createElement('a', {
    href: '/#/page3',
    textContent: 'NASA Fun Facts',
    className: 'link-text'
  });

  const nav = createElement('nav', {}, [page1, page2, page3]);

  return createElement('header', {}, [appTitle, nav]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
    className: 'footer',
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  // Create an image element for the NASA logo or any other image
  const image = createElement('img', {
    src: new URL('../images/hubbleSpace.webp', import.meta.url),
    alt: 'NASA Picture',
    className: 'nasa-image1', // Add some CSS class for styling
    style: 'width: 400px; margin: 20px auto; display: block;', // Inline styles for basic positioning
  });

  const main = createElement('main', {}, []);
  
  const rocket = createElement('img', {
    src: new URL('../images/rocket.jpeg', import.meta.url), // Adjust path to your rocket image
    alt: 'Rocket Ship',
    className: 'rocket', 
  });


  document.body.appendChild(rocket); 
  initRouter(main);
  
  return createElement('div', {}, [Header(main), image, main, Footer()]);
}

export default App;
