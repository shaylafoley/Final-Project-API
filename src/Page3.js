import { createElement } from './utils';

async function fetchDailyFact() {
  const apiKey = 'UsqeenUfTz7vcTwHoWA4vCqt9muTaxCatytSH414'; // Replace with your NASA API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching daily fact:', error);
    return null;
  }
}

function Page3() {
  const title = createElement('h2', { textContent: 'NASA Daily Fact', className: 'title' });
  
  // Container for displaying the fact
  const factContainer = createElement('div', { id: 'fact-container' });
  
  // Button to fetch a new fact
  const getFactButton = createElement('button', { textContent: 'Show Today\'s Fact', className: 'fun-fact-button' });

  // Event listener to fetch and display the daily fact
  getFactButton.addEventListener('click', async () => {
    const data = await fetchDailyFact();
    if (data) {
      // Clear any previous content in the container
      factContainer.innerHTML = '';
      
      // Create elements for the image, title, and explanation
      const image = data.media_type === 'image' ? createElement('img', { src: data.url, alt: data.title, className: 'fact-image' }) : null;
      const factTitle = createElement('h3', { textContent: data.title });
      const factDescription = createElement('p', { textContent: data.explanation });
      
      // Append elements to the container
      if (image) factContainer.appendChild(image);
      factContainer.appendChild(factTitle);
      factContainer.appendChild(factDescription);
    } else {
      factContainer.textContent = 'An error occurred while fetching today’s fact. Please try again later.';
    }
  });

  // Return the elements for Page 3
  return createElement('div', {}, [title, getFactButton, factContainer]);
}

export default Page3;
