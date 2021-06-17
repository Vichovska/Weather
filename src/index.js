function formatDate(timestamp) {
  let date = new Date(timestamp);
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
    "December",
  ];
  let month = months[date.getMonth()];
  let dates = date.getDate();
  let year = date.getFullYear();
  return `${day} ${month} ${dates}, ${year} / ${hours}: ${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML= forecastHTML + `
  <div class="weather-forecast" id="forecast">
     <div class="row days">
       <div class="col-2">${day}</div>
     <div class="row icons">
       <div class="col-2">
        <img src="https://image.flaticon.com/icons/png/512/1779/1779903.png" width="20%" alt="clear"/>
       </div>
     </div>
     <div class="row temperatures">
       <div class="col-2">
        <span id="highTemp">22°C </span>
        <span id="lowTemp">9°C</span>
       </div>
     </div>
    </div>
  </div>
    `;
   )}; 
   
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp");
  let city = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#hum");
  let speedElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#currentTime");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;
  currentTemp.innerHTML = `${temperature}°C`;
  city.innerHTML = `${response.data.name}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "6ba2c825fb47daedbe3a55b4a9cb3ca8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function displayFahrenteit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

displayForecast();  

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", displayFahrenteit);

let celsius = document.querySelector("#celsiusLink");
celsius.addEventListener("click", displayCelsius);

search("Toluca");
