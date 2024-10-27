import { createElement } from './utils';
import { searchMedia } from './utils';

function Page2() {
  const title = createElement('h2', { textContent: 'NASA Image Search', className: 'title' });
  
  const searchInput = createElement('input', { type: 'text', placeholder: 'Search NASA images...', className: 'search-input' });
  
  const searchButton = createElement('button', { textContent: 'Search', className: 'search-button' });
  
  const resultsContainer = createElement('div', { id: 'results-container' });
  
  // Function to save search results to local storage
  const saveResultsToLocalStorage = (results) => {
    localStorage.setItem('nasaSearchResults', JSON.stringify(results));
  };

  // Function to load results from local storage
  const loadResultsFromLocalStorage = () => {
    const savedResults = JSON.parse(localStorage.getItem('nasaSearchResults') || '[]');
    return savedResults;
  };

  // Function to display search results
  const displayResults = (results) => {
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
      resultsContainer.textContent = 'No results found!';
      return;
    }
    results.forEach(result => {
      if (result.links && result.links[0].rel === 'preview' && result.links[0].href) {
        const cardContainer = createElement('div', { className: 'flip-card' });
        const cardInner = createElement('div', { className: 'flip-card-inner' });
    
        // Front of the card with the image
        const cardFront = createElement('div', { className: 'flip-card-front' });
        const imageElement = createElement('img', { src: result.links[0].href, alt: result.data[0].title, width: '600' });
        cardFront.appendChild(imageElement);
    
        // Back of the card with additional JSON data
        const cardBack = createElement('div', { className: 'flip-card-back' });
        const titleElement = createElement('h3', { textContent: result.data[0].title });
        const descriptionElement = createElement('p', { textContent: result.data[0].description || 'No description available' });
        const dateElement = createElement('p', { textContent: `Date: ${result.data[0].date_created}` });
        const photographerElement = createElement('p', { textContent: `Photographer: ${result.data[0].photographer || 'N/A'}` });
        const locationElement = createElement('p', { textContent: `Location: ${result.data[0].location || 'N/A'}` });
        const keywordsElement = createElement('p', { textContent: `Keywords: ${result.data[0].keywords.join(', ')}` });
        
        // Append JSON data elements to the back of the card
        cardBack.appendChild(titleElement);
        cardBack.appendChild(descriptionElement);
        cardBack.appendChild(dateElement);
        cardBack.appendChild(photographerElement);
        cardBack.appendChild(locationElement);
        cardBack.appendChild(keywordsElement);
    
        // Assemble the card
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardContainer.appendChild(cardInner);
        resultsContainer.appendChild(cardContainer);
      }
    });
  };  
  //   results.forEach(result => {
  //     if (result.links && result.links[0].rel === 'preview' && result.links[0].href) {
  //       const imageElement = createElement('img', {
  //         src: result.links[0].href,
  //         alt: result.data[0].title,
  //         className: 'nasa-image',
  //       });

  //       const titleElement = createElement('p', { textContent: result.data[0].title });
  //       resultsContainer.appendChild(imageElement);
  //       resultsContainer.appendChild(titleElement);
  //     }
  //   });
  // };

  // Load and display saved results on page load
  const savedResults = loadResultsFromLocalStorage();
  if (savedResults.length > 0) {
    displayResults(savedResults);
  }
  searchInput.addEventListener('focus', () => {
    searchInput.style.width = '200px';
    searchInput.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.style.width = '200px';
    searchInput.style.boxShadow = 'none';
  });
  // Add event listener to the search button
  searchButton.addEventListener('click', async () => {
    searchButton.style.backgroundColor = 'lightblue';
    const searchTerm = searchInput.value;
    if (!searchTerm) {
      alert('Please enter a search term!');
      return;
    }

    try {
      const searchResults = await searchMedia(searchTerm);
      saveResultsToLocalStorage(searchResults); // Save results to local storage
      displayResults(searchResults); // Display results
    } catch (error) {
      console.error('Error during search:', error);
      resultsContainer.textContent = 'An error occurred while searching. Please try again.';
    }
  });

  return createElement('div', {}, [title, searchInput, searchButton, resultsContainer]);
}

export default Page2;
