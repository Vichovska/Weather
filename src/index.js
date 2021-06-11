//////////////////////////////Current Weather & Geolocation
function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  let city = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  currentTemp.innerHTML = `${temperature}°C`;
  city.innerHTML = `${response.data.name}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  let apiKey = "6ba2c825fb47daedbe3a55b4a9cb3ca8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  navigator.geolocation.getCurrentPosition(showPosition);
}
//////////////////////////////////////Show weather for location
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let weatherDesc = document.querySelector("#description");
  temperatureElement.innerHTML = `${temperature}°C`;
  weatherDesc.innerHTML = response.data.weather[0].description;
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("h1");
  let searchCity = document.querySelector("#form");
  let apiKey = "6ba2c825fb47daedbe3a55b4a9cb3ca8";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  currentCity.innerHTML = searchCity.value;
  axios.get(apiUrl).then(showWeather);
}

//////////////////////////////////////////// return to current city
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let toCurrent = document.querySelector("#currentCity");
toCurrent.addEventListener("click", getPosition);

/////////////////////////////////////////////date
let now = new Date();

let days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();

let todayDate = document.querySelector("#currentTime");
todayDate.innerHTML = `${day} ${date} ${month} | ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#city-search");
  let cityElement = document.querySelector("#form");
  changeCity.innerHTML = cityElement.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function changeCelsius() {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = 25;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit() {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = 77;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);
