let apiKey = ""; // API Key will be fetched from backend

// Fetch API Key from backend
fetch("http://localhost:3000/api/key")
    .then(response => response.json())
    .then(data => {
        apiKey = data.apiKey;
    })
    .catch(error => {
        console.error("Error fetching API Key: ", error);
    });


// Function to get weather for a city
function getWeather() {
    if (!apiKey) {
        document.getElementById("weatherOutput").innerText = "API key not loaded yet.";
        return;
    }

    let city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        document.getElementById("weatherOutput").innerText = "Please enter a city name.";
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found!");
            return response.json();
        })
        .then(data => {
            document.getElementById("weatherOutput").innerHTML = `
                <h3>Weather in ${city} </h3>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            document.getElementById("weatherOutput").innerText = error.message;
        });
}

// Function to get weather for user's location
function getLocationWeather() {
    if (!apiKey) {
        document.getElementById("weatherOutput").innerText = "API key not loaded yet.";
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error("Unable to fetch weather!");
                    return response.json();
                })
                .then(data => {
                    document.getElementById("weatherOutput").innerHTML = `
                        <h3>Weather at Your Location </h3>
                        <p>🌡️ Temperature: ${data.main.temp}°C</p>
                        <p>💧 Humidity: ${data.main.humidity}%</p>
                        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                        <p>☁️ Condition: ${data.weather[0].description}</p>
                    `;
                })
                .catch(error => {
                    document.getElementById("weatherOutput").innerText = error.message;
                });
        });
    } else {
        document.getElementById("weatherOutput").innerText = "Geolocation is not supported by your browser.";
    }
}

// Toggle dark mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change button text based on dark mode state
    const button = document.getElementById("darkModeToggle");
    if (document.body.classList.contains("dark-mode")) {
        button.innerHTML = '<img src="brightness.png" width="15px" alt=""> Light Mode';
    } else {
        button.innerHTML = '<img src="sleep-mode.png" width="15px" alt=""> Dark Mode';
    }
});
