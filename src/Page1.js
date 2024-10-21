import { createElement } from './utils';

function Page1() {
  const title = createElement('h2', { textContent: 'Picture of the Day' });
  
  // Create the date picker
  const dateSelect = createElement('input', { type: 'date' });

  // Create the button
  const getMediaButton = createElement('button', { textContent: 'Get Media' });

  // Add event listener to fetch media when the button is clicked
  getMediaButton.addEventListener('click', () => {
    // Get the selected date value
    const selectedDate = dateSelect.value;

    // Fetch media from your API and pass the selected date
    fetchMedia(selectedDate);
  });

  const page3Link = createElement('a', {
    href: '/#/page3',
    textContent: 'Link to Page 3',
  });

  // Return the page elements
  return createElement('div', {}, [title, dateSelect, getMediaButton, page3Link]);
}

// Function to fetch media from the NASA API
async function fetchMedia(selectedDate) {
    const apiKey = 'UsqeenUfTz7vcTwHoWA4vCqt9muTaxCatytSH414'; // Replace with your actual NASA API key

    // If a date is selected, append it as a query parameter; otherwise fetch today's media
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    if (selectedDate) {
        apiUrl += `&date=${selectedDate}`; // Adding the selected date to the API request
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Select or create the media container
      let mediaContainer = document.querySelector('#media-container');
      if (!mediaContainer) {
        mediaContainer = createElement('div', { id: 'media-container' });
        const pageDiv = document.querySelector('div'); // Assuming the main page container is a div
        pageDiv.appendChild(mediaContainer);
      }

      // Clear the previous media content
      mediaContainer.innerHTML = '';

      // Create an element for the explanation
      const explanationElement = createElement('p', { textContent: data.explanation });

      // Check if the media is an image or video
      if (data.media_type === 'image') {
        // Create an image element
        const mediaElement = createElement('img', { src: data.url, alt: data.title });
        
        // Append the image and explanation to the media container
        mediaContainer.appendChild(mediaElement);
        mediaContainer.appendChild(explanationElement);
      } else if (data.media_type === 'video') {
        // Create a video element (embedded video like YouTube)
        const mediaElement = createElement('iframe', { src: data.url, title: data.title, width: '600', height: '400' });

        // Append the video and explanation to the media container
        mediaContainer.appendChild(mediaElement);
        mediaContainer.appendChild(explanationElement);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
}

export default Page1;
