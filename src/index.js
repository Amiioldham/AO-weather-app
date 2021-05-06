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
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul>`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <li class="list-group-item">
        <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="" class="forecast-icon"></i>
        <span class="forecast-day">${day}</span>
        <span class="forecast-temperature">
        <span class="forecast-max-temp">12°</span>
        <span class="forecast-min-temp">4°</span> 
        </span>
      </li>
      <br />`;
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayWeather(response) {
  console.log(response);
  document.querySelector(
    "#city-name-display"
  ).innerHTML = `${response.data.name} <span class="country">${response.data.sys.country}</span>`;
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
