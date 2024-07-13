document.getElementById('fetch-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
        document.getElementById('city-input').value = ''; // Clear input field
    }
});

function getWeather(city) {
    const apiKey = '5839972b293a2bb4a4def3084d9f3d38'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weather = data.weather[0].main.toLowerCase();
                document.getElementById('weather-info').textContent = `Current weather in ${city}: ${data.weather[0].description}, ${data.main.temp}°F`;
                getJoke(weather);
                saveToLocalStorage(city, weather);
            } else {
                document.getElementById('weather-info').textContent = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function getJoke(weather) {
    let jokeCategory;
    if (weather.includes('rain')) {
        jokeCategory = 'Miscellaneous';
    } else if (weather.includes('clear')) {
        jokeCategory = 'Programming';
    } else {
        jokeCategory = 'Miscellaneous';
    }

    fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}`)
        .then(response => response.json())
        .then(data => {
            let joke;
            if (data.joke) {
                joke = data.joke; // For single jokes
            } else {
                joke = `${data.setup} - ${data.delivery}`; // For setup/delivery format
            }
            document.getElementById('joke-info').textContent = joke;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('joke-info').textContent = 'Could not fetch a joke.';
        });
}

function saveToLocalStorage(city, weather) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push({ city, weather });
    localStorage.setItem('searches', JSON.stringify(searches));
}
