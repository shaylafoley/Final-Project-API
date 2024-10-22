export function createElement(type, props = {}, children = []) {
    const element = document.createElement(type);
  
    // props: {textContent: "Hello world!", id: "header1", "data-productId": 123, ...}
    Object.entries(props).forEach(([key, value]) => {
      if(~key.indexOf('-')) {
        element.setAttribute(key, value); // data attributes
      } else {
        element[key] = value;
      }
    });
  
    children.forEach((child) => {
      element.appendChild(child);
    });
  
    return element;
  }

  // utils.js
export async function fetchMedia(apiKey, selectedDate) {
    // NASA API URL
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
    // Add selected date if provided
    if (selectedDate) {
        apiUrl += `&date=${selectedDate}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return data; // Return the data so the calling function can handle it
    } catch (error) {
        console.error('Error fetching media:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}
export async function searchMedia(searchTerm) {
    const apiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.collection.items; // Return the search results (media items)
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
}