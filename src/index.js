let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();

let p = document.querySelector("#mon");
p.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="days">${formatDay(forecastday.dt)}</div>
            <img src ="http://openweathermap.org/img/wn/${
              forecastday.weather[0].icon
            }@2x.png", alt ="", width = "20px"/>
            <div class="temp"><span class="max-temp">${Math.round(
              forecastday.temp.max
            )}° </span><span class="min-temp"> ${Math.round(
          forecastday.temp.min
        )}°</span></div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "87cb4652f9f8d3af518a78fc15f8c121";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(coordinates);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  celciusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  let wind = document.querySelector("#wind");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windValue}km/hr`;
  let precipitation = document.querySelector("#pre");
  let precipitationValue = response.data.main.humidity;
  precipitation.innerHTML = `Precipitation: ${precipitationValue}%`;
  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  let iconData = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "7ca9492d22043e2b38d50b896c32c05c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity();
}

function searchLocation(position) {
  let apiKey = "7ca9492d22043e2b38d50b896c32c05c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celcuis.classList.remove("active");
  fahrenheit.classList.add("active");
  let farTemp = (celciusTemp * 9) / 5 + 32;
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = Math.round(farTemp);
}

function showCelciusTemp(event) {
  event.preventDefault();
  celcuis.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

searchCity("new york");

let celciusTemp = null;

let button = document.querySelector("button");
button.addEventListener("click", showCurrentlocation);

let form = document.querySelector("#searchCity");
form.addEventListener("submit", search);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celcuis = document.querySelector("#celciusTemperature");
celcuis.addEventListener("click", showCelciusTemp);
