const apiKey = "147c1cedd30ea3ae4eb8f756979c9a48";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value.trim();
    if (cityValue) {
        getWeatherData(cityValue);
    } else {
        weatherDataEl.querySelector(".description").textContent = "Please enter a city name.";
    }
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}℃`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`)
            .join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error happened. Please try again later.";
        weatherDataEl.querySelector(".details").innerHTML = "";
        console.error(error);
    }
};
