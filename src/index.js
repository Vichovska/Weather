function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  let months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  return `${day} ${month}, ${hours}: ${minutes}`;
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
  currentTemp.innerHTML = `${temperature}°C`;
  city.innerHTML = `${response.data.name}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute("i", `http://openweathermap.org/img/wn/01d@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
} 

function search(city){
  let apiKey = "6ba2c825fb47daedbe3a55b4a9cb3ca8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);

}
function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function displayFahrenteit(event){
  event.preventDefault();
  let fahrenheitTemp = (16 * 9) /5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = fahrenheitTemp;
}
  let form = document.querySelector("#form");
  form.addEventListener("submit", handleSubmit);

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", displayFahrenteit);