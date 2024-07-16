// Event listener for the "Get Weather and Joke" button click
document.getElementById("fetch-weather").addEventListener("click", function () {
    const city = document.getElementById("city-input").value; // Get the city input value
    if (city) {
      // Check if city is provided
      getWeather(city); // Call function to get weather data
      document.getElementById("city-input").value = ""; // Clear input field
    }
  });
  
  // Function to fetch weather data from the OpenWeatherMap API
  function getWeather(city) {
    const apiKey = "5839972b293a2bb4a4def3084d9f3d38"; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; // API URL
  
    fetch(url) // Fetch the weather data
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.cod === 200) {
          // Check if the response is successful
          const weatherConditions = data.weather.map(item => item.main.toLowerCase()); // Get weather conditions
          console.log(weatherConditions); // Log the array of weather conditions
  
          // Inside your getWeather function, after getting the weather condition
          const videoUrl = getVideo(weatherConditions); // Get the corresponding video
          document.querySelector(".video-background video source").src = videoUrl; // Update the video source
          document.querySelector(".video-background video").load(); // Load the new video
  
          document.getElementById(
            "weather-info"
          ).textContent = `Current weather in ${city}: ${data.weather[0].description}, ${data.main.temp}°F`; // Display weather info
          getJoke(weatherConditions); // Call function to get a joke based on weather
          saveToLocalStorage(city, weatherConditions); // Save search to local storage
        } else {
          document.getElementById(
            "weather-info"
          ).textContent = `Error: ${data.message}`; // Display error message
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error); // Log fetch error
      });
  }
  
  // Function to fetch a joke based on the weather condition
  function getJoke(weather) {
    let jokeCategory; // Variable to hold joke category
    if (weather.includes("rain")) {
      jokeCategory = "Miscellaneous"; // Set category for rain
    } else if (weather.includes("clear")) {
      jokeCategory = "Programming"; // Set category for clear weather
    } else {
      jokeCategory = "Miscellaneous"; // Default category
    }
  
    // Fetch a joke from the Joke API
    fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}`)
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        let joke; // Variable to hold the joke
        if (data.joke) {
          joke = data.joke; // For single jokes
        } else {
          joke = `${data.setup} - ${data.delivery}`; // For setup/delivery format
        }
        document.getElementById("joke-info").textContent = joke; // Display the joke
      })
      .catch((error) => {
        console.error("Error fetching joke:", error); // Log fetch error
        document.getElementById("joke-info").textContent =
          "Could not fetch a joke."; // Display error message
      });
  }
  
  // Function to get the corresponding video based on the weather conditions
  function getVideo(weather) {
    if (weather.includes("rain")) {
      return "./assets/videos/rain.mp4"; // Path to rainy video
    } else if (weather.includes("clouds")) {
      return "./assets/videos/clouds.mp4"; // Path to cloudy video
    } else if (weather.includes("clear")) {
        return "./assets/videos/clear_sky.mp4"; // Path to clear sky video
    } else if (weather.includes("snow")) {
      return "./assets/videos/snow.mp4"; // Path to snowy video
    } else if (weather.includes("thunderstorm")) {
      return "./assets/videos/thunderstorm.mp4"; // Path to thunderstorm video
    } else if (weather.includes("mist") || weather.includes("fog")) {
      return "./assets/videos/mist.mp4"; // Path to mist/fog video
    } else if (weather.includes("smoke") || weather.includes("haze")) {
      return "./assets/videos/smoke.mp4"; // Path to smoke/haze video
    } else if (weather.includes("dust") || weather.includes("sand")) {
      return "./assets/videos/dust.mp4"; // Path to dust/sand video
    } else if (weather.includes("ash")) {
      return "./assets/videos/ash.mp4"; // Path to ash video
    } else if (weather.includes("squall")) {
      return "./assets/videos/squall.mp4"; // Path to squall video
    } else if (weather.includes("tornado")) {
      return "./assets/videos/tornado.mp4"; // Path to tornado video
    } else {
      return "./assets/videos/world.mp4"; // Default video if no conditions match
    }
  }
  
  // Function to save city and weather information to local storage
  function saveToLocalStorage(city, weather) {
    const searches = JSON.parse(localStorage.getItem("searches")) || []; // Get existing searches or initialize
    searches.push({ city, weather }); // Add new search
    localStorage.setItem("searches", JSON.stringify(searches)); // Save updated searches to local storage
  }
  //  Back to Top button

const mybutton = document.getElementById('back-to-top');

if (mybutton) {
    // Add event listener and other operations here
} else {
    console.error('Element with id "back-to-top" not found.');
}
// JavaScript for Mood Meter


// Selecting all mood buttons
const moodButtons = document.querySelectorAll('.mood-btn');

// Adding click event listeners to each mood button
moodButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedMood = this.getAttribute('data-mood');
        displayMood(selectedMood); // Call function to display mood (you can implement this function)
        saveMoodToLocalStorage(selectedMood); // Call function to save mood to localStorage
    });
});

// Function to display the selected mood (example function, adjust as needed)
function displayMood(mood) {
    console.log(`Selected mood: ${mood}`);
    // You can update UI, trigger actions, etc., based on the selected mood
}

// Function to save mood to localStorage (example function, adjust as needed)
function saveMoodToLocalStorage(mood) {
    localStorage.setItem('currentMood', mood);
    console.log(`Mood saved to localStorage: ${mood}`);
}


// JavaScript for Chatbot

// Function to add a message to the chatbot interface
function addMessage(message, sender) {
  const chatbotMessages = document.getElementById("chatbotMessages");

  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);

  // Set the message text
  messageElement.textContent = message;

  // Append the message to the chatbotMessages container
  chatbotMessages.appendChild(messageElement);

  // Scroll to the bottom of the messages container
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to handle user input and chatbot responses
function handleUserInput() {
  const userInput = document.getElementById("userInput");
  const userMessage = userInput.value.trim();

  if (userMessage === "") {
      return; // If input is empty, do nothing
  }

  // Add user message to chatbot interface
  addMessage(userMessage, "sent");

  // Simulate chatbot response (in this example, a simple echo)
  setTimeout(() => {
      addMessage(`You said: "${userMessage}"`, "received");
  }, 500);

  // Clear the input field
  userInput.value = "";
}

// Event listener for when the user clicks the send button or presses Enter
document.getElementById("sendMessage").addEventListener("click", handleUserInput);

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
      handleUserInput();
  }
});

// Initial greeting message from the chatbot
setTimeout(() => {
  addMessage("Hello! How can I assist you today?", "received");
}, 500);

