import { createElement } from './utils';  // Assuming createElement is also in utils.js
import { fetchMedia } from './utils';     // Import the fetchMedia function from utils.js

function Page1() {
  const title = createElement('h2', { textContent: 'Picture of the Day' });
  
  // Create the date picker
  const dateSelect = createElement('input', { type: 'date', className: 'date-select' });

  // Create the button
  const getMediaButton = createElement('button', { textContent: 'Get Media', className: 'get-media-button' });

  // Create or select the media container with a box-like style
  const mediaContainer = createElement('div', { id: 'media-container', className: 'media-box' });

  // Add event listener to fetch media when the button is clicked
  getMediaButton.addEventListener('click', async () => {
    // Get the selected date value
    const selectedDate = dateSelect.value;
    
    // Fetch media from the API using the imported fetchMedia function
    try {
      const apiKey = 'UsqeenUfTz7vcTwHoWA4vCqt9muTaxCatytSH414'; // Your NASA API key
      const data = await fetchMedia(apiKey, selectedDate); // Use the imported fetchMedia function
      
      // Clear the previous media content
      mediaContainer.innerHTML = '';

      // Create an element for the explanation
      const explanationElement = createElement('p', { textContent: data.explanation });

      // Check if the media is an image or video
      if (data.media_type === 'image') {
        const mediaElement = createElement('img', { src: data.url, alt: data.title, className: 'media-image' });
        mediaContainer.appendChild(mediaElement);
      } else if (data.media_type === 'video') {
        const mediaElement = createElement('iframe', { src: data.url, title: data.title, width: '600', height: '400' });
        mediaContainer.appendChild(mediaElement);
      }

      // Append the explanation to the media container
      mediaContainer.appendChild(explanationElement);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  });

  const page3Link = createElement('a', {
    href: '/#/page3',
    textContent: 'Link to Page 3',
  });

  return createElement('div', {}, [title, dateSelect, getMediaButton, mediaContainer, page3Link]);
}

export default Page1;


