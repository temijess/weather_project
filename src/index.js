let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMinutes();

let p = document.querySelector("#mon");
p.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "7ca9492d22043e2b38d50b896c32c05c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windValue}km/hr`;
  let precipitation = document.querySelector("#pre");
  let precipitationValue = response.data.main.humidity;
  precipitation.innerHTML = `Precipitation: ${precipitationValue}%`;
  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].main;
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

let button = document.querySelector("button");
button.addEventListener("click", showCurrentlocation);

let form = document.querySelector("#searchCity");
form.addEventListener("submit", search);
