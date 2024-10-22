import { createElement } from './utils';
import { searchMedia } from './utils';
function Page2() {
    const title = createElement('h2', { textContent: 'NASA Image Search' });
    
    // Create a search input for users to type their search term
    const searchInput = createElement('input', { type: 'text', placeholder: 'Search NASA images...' });
    
    // Create a button to trigger the search
    const searchButton = createElement('button', { textContent: 'Search' });
  
    // Create a container to display the search results
    const resultsContainer = createElement('div', { id: 'results-container' });
  
    // Add event listener to the search button
    searchButton.addEventListener('click', async () => {
      const searchTerm = searchInput.value; // Get the value entered in the search input
  
      if (!searchTerm) {
        alert('Please enter a search term!');
        return;
      }
  
      try {
        // Fetch search results from the NASA Image and Video Library API
        const searchResults = await searchMedia(searchTerm);
  
        // Clear any previous search results
        resultsContainer.innerHTML = '';
  
        if (searchResults.length === 0) {
          resultsContainer.textContent = 'No results found!';
          return;
        }
  
        // Loop through search results and display them on the page
        searchResults.forEach(result => {
          // Check if the result has a media type of 'image'
          if (result.links && result.links[0].rel === 'preview' && result.links[0].href) {
            const imageElement = createElement('img', { src: result.links[0].href, alt: result.data[0].title, width: '200' });
            
            // Create a title for each image
            const titleElement = createElement('p', { textContent: result.data[0].title });
  
            // Append the image and title to the results container
            resultsContainer.appendChild(imageElement);
            resultsContainer.appendChild(titleElement);
          }
        });
      } catch (error) {
        console.error('Error during search:', error);
        resultsContainer.textContent = 'An error occurred while searching. Please try again.';
      }
    });
  
    return createElement('div', {}, [title, searchInput, searchButton, resultsContainer]);
  }
  
  export default Page2;