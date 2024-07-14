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
  