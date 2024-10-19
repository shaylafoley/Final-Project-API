import { createElement } from './utils';

function Page2() {
  const title = createElement('h2', { textContent: 'Page 2' });

  const page1Link = createElement('a', {
    href: '/#/page1',
    textContent: 'Link to Page 1',
  });

  return createElement('div', {}, [title, page1Link]);
}

export default Page2;