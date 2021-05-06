function formatDayTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector(".forecast");
  forecastElement.innerHTML = `
    <ul>
      <li class="list-group-item">
        <img src="" alt="" id="day-one-icon"></i><span id="forecast-day-one">Mon</span>
      </li>
      <br />
      <li class="list-group-item">
        <img src="" alt="" id="day-two-icon"></i><span id="forecast-day-two">Tues</span>
      </li>
      <br />
      <li class="list-group-item">
        <img src="" alt="" id="day-three-icon"></i><span id="forecast-day-three">Wed</span>
      </li>
        <br />
      <li class="list-group-item">
        <img src="" alt="" id="day-four-icon"></i><span id="forecast-day-four">Thurs</span>
      </li>
      <br />
      <li class="list-group-item">
        <img src="" alt="" id="day-five-icon"></i><span id="forecast-day-five">Fri</span>
      </li>
      </ul>`;
}

function displayWeather(response) {
  document.querySelector("#city-name-display").innerHTML = response.data.name;
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celciusTemperature
  );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  displayForecast();
}
function search(city) {
  let apiKey = "e5c406f120fe6a4c7b85f5bd91fb964e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  search(city);
}
function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e5c406f120fe6a4c7b85f5bd91fb964e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
function convertToFarhenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let farhenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farhenheitTemperature);
}
function convertToCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let liveDayTime = document.querySelector("#live-day-time");
let currentTime = new Date();
liveDayTime.innerHTML = formatDayTime(currentTime);

let submitCity = document.querySelector("#search-city-form");
submitCity.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location-search");
currentLocation.addEventListener("click", displayCurrentWeather);

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFarhenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

search("London");
