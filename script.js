const apiKey = "8cd8be874265588dc7fdbc2db401ce1e"; // Your API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");

searchBtn.onclick = async () => {
    let city = cityInput.value.trim();
    if (city === "") return;

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            // friendly error message explaining smaller towns might not be in the database
            alert("City not found! If you searched for a small town or village, the weather database might not have it. Try searching for a nearby larger city or include the country code (e.g., 'City, LK').");
            return;
        }

        let data = await response.json();
        
        // Update the HTML with fetched data
        cityNameEl.textContent = data.name;
        tempEl.textContent = `Temp: ${Math.round(data.main.temp)}°C`;
        conditionEl.textContent = `Condition: ${data.weather[0].description}`;
        humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please check your internet connection.");
    }
};

// Optional: Allow pressing "Enter" on the keyboard to search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});