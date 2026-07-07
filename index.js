function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}


function search(city) {
  let messageElement = document.querySelector("#message");
  messageElement.innerHTML = "Loading...";

  let apikey = "72e52d46dd4874415072of2t313ba90b";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;

  axios
    .get(apiurl)
    .then(function (response) {
      messageElement.innerHTML = "";
      refreshWeather(response);
    })
    .catch(function (error) {
      messageElement.innerHTML = "City not found. Please try another search.";
      clearWeatherUI();
    });
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function clearWeatherUI() {
  document.querySelector("#city").innerHTML = "";
  document.querySelector("#time").innerHTML = "";
  document.querySelector("#description").innerHTML = "";
  document.querySelector("#humidity").innerHTML = "";
  document.querySelector("#wind-speed").innerHTML = "";
  document.querySelector("#temperature").innerHTML = "";
  document.querySelector("#icon").innerHTML = "";
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  search(searchInput.value);
}

function getForecast(city) {
  let apiKey = "72e52d46dd4874415072of2t313ba90b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {

  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

search("Paris");
