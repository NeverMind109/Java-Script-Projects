API_KEY = "*API key*";
API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const months = [
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

const weatherContainer = document.querySelector(".weather-container");
const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");

async function getWeatherByLocation(city) {
  const resp = await fetch(
    API_URL + city + "&units=metric" + "&appid=" + API_KEY
  );
  const dataResp = await resp.json();
  const {
    name,
    sys: { country },
    weather: [{ main: weather, description: descr, icon: icon }],
    main: { temp: temp },
    wind: { speed: windSpeed },
  } = dataResp;

  createWidget(name, country, weather, descr, temp, windSpeed, icon);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value;
  getWeatherByLocation(searchValue);
});

function createWidget(name, country, weather, descr, temp, windSpeed, icon) {
  weatherContainer.innerHTML = "";

  temp = Number(temp).toFixed(0);
  const today = newDate();

  const vidget = document.createElement("div");
  vidget.classList.add("weather");
  vidget.innerHTML = `
  <div class="weather-left">
      <span class="weather-today">${today}</span>
      <h2 class="weather-title">${name}, ${country}</h2>
      <div class="weather-temp">
        <span class="weather-temperature">${temp} °C</span>
        <img class="weather-icon" src="https://openweathermap.org/img/w/${icon}.png">
      </div>
    </div>
    <div class="weather-right">
      <span class="weather-wind">Wind speed: ${windSpeed} m/s</span>
      <span class="weather-descr"><span>${weather}:</span>${descr}</span>
    </div>
  `;
  weatherContainer.appendChild(vidget);
}

function newDate() {
  const dateEl = new Date();
  const monthNumber = dateEl.getMonth();
  const month = months[monthNumber];
  const date = dateEl.getDate();
  const hours = dateEl.getHours();
  const minutes = dateEl.getMinutes();

  return `${month} ${date}, ${hours}:${minutes}`;
}
newDate();
