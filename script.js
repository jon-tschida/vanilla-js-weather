const searchInput = document.querySelector(`input`);
const results = document.querySelector(`.results`);
const cityName = document.querySelector(`.city-name`);
const mainCard = document.querySelector(`.main-card`);
const mainWeather = document.querySelector(`.main-weather`);
const hourlyWeather = document.querySelector(`.hourly-container`);

// API Call for cities data

const citiesEndPoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(citiesEndPoint)
  .then((response) => {
    if (response.status === 200) return response.json();
    else
      alert(`Data failed to be retrieved with this error: ${response.status}`);
  })
  .then((data) => cities.push(...data));

// End API call for cities data

// Api call for weather
// const weatherEndPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=35.9940&lon=-78.8986&units=imperial&cnt=10&appid=2a8ab662e8539e2cb45726e6080084e6`;

function getWeatherData(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&cnt=10&appid=2a8ab662e8539e2cb45726e6080084e6`
  )
    .then((response) => {
      if (response.status === 200) return response.json();
      else alert(`Weather data failed: ${response.status}`);
    })
    .then((data) => {
      updateMainWeather(data);
      updateHourlyWeather(data);
    });
}
// End api call for weather

// Update HTML with weather data

const updateMainWeather = (weatherData) => {
  mainWeather.innerHTML = `
  <p class="weather-description">${
    weatherData.current.weather[0].description
  }</p>
  <img
    class="weather-icon"
    src="http://openweathermap.org/img/wn/${
      weatherData.current.weather[0].icon
    }@4x.png"
  />
  <div class="main-temp-container">
    <p class="main-temp">${Math.round(weatherData.current.temp)}&deg;</p>

    <div class="extra-weather">
    <div class="extra-weather-content">
      <div><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 9.00012H9.31C10.8 9.00012 12 7.79012 12 6.31012C12 4.82012 10.79 3.62012 9.31 3.62012C7.82 3.62012 6.62 4.83012 6.62 6.31012V6.69012" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>
      <div>${Math.round(weatherData.current.wind_speed)}mph</div>
    </div>
    <div class="extra-weather-content">
      <div><svg width="20px" height="20px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.92px;}</style></defs><path class="cls-1" d="M.5,3.4c1.92,0,1.92.95,3.83.95S6.25,3.4,8.16,3.4s1.92.95,3.83.95,1.92-.95,3.83-.95,1.92.95,3.84.95,1.92-.95,3.84-.95"/><path class="cls-1" d="M.5,9.15c1.92,0,1.92.95,3.83.95s1.92-.95,3.83-.95,1.92.95,3.83.95,1.92-.95,3.83-.95,1.92.95,3.84.95,1.92-.95,3.84-.95"/><path class="cls-1" d="M.5,14.9c1.92,0,1.92.95,3.83.95s1.92-.95,3.83-.95,1.92.95,3.83.95,1.92-.95,3.83-.95,1.92.95,3.84.95,1.92-.95,3.84-.95"/><path class="cls-1" d="M.5,20.65c1.92,0,1.92,1,3.83,1s1.92-1,3.83-1,1.92,1,3.83,1,1.92-1,3.83-1,1.92,1,3.84,1,1.92-1,3.84-1"/></svg></div>
      <div>${weatherData.current.humidity}%</div>
    </div>
    <div class="extra-weather-content">
      <div><svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.672 23.646c-0.2-2.958-2.349-5.361-5.165-5.946l-0.042-0.007c0.136-0.346 0.215-0.746 0.215-1.165 0-0.943-0.401-1.793-1.041-2.388l-0.002-0.002c-0.804-0.83-1.929-1.345-3.174-1.345-0.895 0-1.729 0.266-2.425 0.724l0.017-0.010c-1.247-1.515-3.122-2.474-5.221-2.474-0.16 0-0.318 0.006-0.475 0.016l0.021-0.001c-3.278 0.026-6.153 1.728-7.814 4.291l-0.022 0.037c-0.422 0.73-0.671 1.606-0.671 2.541 0 0.675 0.13 1.319 0.366 1.909l-0.012-0.035c-2.333 0.764-3.988 2.921-3.988 5.464 0 0.125 0.004 0.25 0.012 0.373l-0.001-0.017c-0.001 0.040-0.002 0.086-0.002 0.133 0 1.261 0.403 2.428 1.088 3.378l-0.012-0.017c0.764 1.004 1.959 1.646 3.305 1.646 0.043 0 0.086-0.001 0.129-0.002l-0.006 0 20.28-0.008c1.685-0.192 3.103-1.182 3.883-2.578l0.013-0.026c0.524-0.974 0.832-2.132 0.832-3.361 0-0.399-0.032-0.791-0.095-1.173l0.006 0.042zM28.621 27.404c-0.543 0.995-1.521 1.694-2.672 1.844l-0.018 0.002h-20.179c-0.034 0.002-0.074 0.002-0.115 0.002-0.863 0-1.629-0.411-2.114-1.049l-0.005-0.007c-0.483-0.684-0.772-1.535-0.772-2.453 0-0.047 0.001-0.093 0.002-0.14l-0 0.007c-0.015-0.13-0.023-0.28-0.023-0.432 0-2.089 1.586-3.807 3.62-4.016l0.017-0.001c0.414-0.001 0.75-0.336 0.75-0.751 0-0.143-0.040-0.277-0.11-0.391l0.002 0.003c-0.4-0.583-0.639-1.303-0.639-2.080 0-0.679 0.183-1.316 0.502-1.863l-0.009 0.018c1.432-2.134 3.827-3.526 6.549-3.55l0.004-0c0.050-0.001 0.101-0.001 0.152-0.001 0.071-0.003 0.153-0.005 0.236-0.005 1.866 0 3.507 0.967 4.448 2.427l0.013 0.021c0.133 0.218 0.37 0.361 0.64 0.361 0.206 0 0.392-0.083 0.528-0.218l-0 0c0.525-0.515 1.245-0.832 2.039-0.832 0.825 0 1.57 0.343 2.1 0.894l0.001 0.001c0.38 0.325 0.62 0.806 0.62 1.342 0 0.558-0.26 1.056-0.665 1.379l-0.004 0.003c-0.137 0.136-0.222 0.324-0.222 0.532 0 0.121 0.029 0.235 0.080 0.336l-0.002-0.004c0.122 0.249 0.374 0.418 0.665 0.418 0.038 0 0.076-0.003 0.112-0.009l-0.004 0c0.079-0.005 0.172-0.007 0.266-0.007 2.598 0 4.712 2.076 4.771 4.66l0 0.006c0.047 0.276 0.074 0.595 0.074 0.92 0 0.962-0.237 1.868-0.656 2.664l0.015-0.031zM2.78 16.75c0.414-0 0.75-0.336 0.75-0.75 0-0.174-0.059-0.334-0.158-0.461l0.001 0.002c-0.394-0.616-0.628-1.367-0.628-2.173 0-0.674 0.164-1.309 0.453-1.869l-0.011 0.023c0.418-0.953 1.347-1.609 2.431-1.624l0.002-0c0.414-0 0.75-0.336 0.75-0.75 0-0.144-0.040-0.278-0.11-0.392l0.002 0.003c-0.32-0.465-0.511-1.040-0.511-1.66 0-0.541 0.145-1.047 0.399-1.483l-0.008 0.014c1.166-1.733 3.113-2.862 5.326-2.879h0.003c0.085-0.006 0.184-0.009 0.284-0.009 1.513 0 2.844 0.778 3.615 1.957l0.010 0.016c0.134 0.218 0.371 0.361 0.642 0.361 0.206 0 0.392-0.083 0.528-0.217l-0 0c0.413-0.405 0.978-0.654 1.602-0.654 0.649 0 1.235 0.27 1.652 0.704l0.001 0.001c0.289 0.248 0.47 0.613 0.47 1.021 0 0.427-0.199 0.807-0.509 1.053l-0.003 0.002c-0.137 0.136-0.222 0.325-0.222 0.533 0 0.414 0.336 0.75 0.75 0.75 0.036 0 0.071-0.002 0.105-0.007l-0.004 0c0.145-0.024 0.312-0.038 0.482-0.038 0.712 0 1.367 0.242 1.889 0.648l-0.007-0.005c0.93 0.795 1.553 1.927 1.678 3.205l0.002 0.020c0.043 0.372 0.356 0.659 0.736 0.659 0.035 0 0.070-0.002 0.104-0.007l-0.004 0c0.373-0.048 0.658-0.363 0.658-0.745 0-0.032-0.002-0.064-0.006-0.095l0 0.004c-0.172-1.71-1.007-3.198-2.242-4.221l-0.010-0.008c-0.565-0.443-1.252-0.756-2.003-0.884l-0.027-0.004c0.084-0.256 0.132-0.551 0.132-0.857 0-0.82-0.348-1.56-0.904-2.078l-0.002-0.002c-0.698-0.702-1.665-1.137-2.733-1.137-0.723 0-1.399 0.199-1.977 0.545l0.018-0.010c-1.058-1.235-2.619-2.013-4.362-2.013-0.133 0-0.264 0.004-0.395 0.013l0.018-0.001c-2.766 0.023-5.192 1.461-6.591 3.625l-0.019 0.031c-0.361 0.623-0.573 1.371-0.573 2.168 0 0.526 0.093 1.031 0.263 1.499l-0.010-0.030c-1.196 0.359-2.151 1.199-2.655 2.289l-0.011 0.026c-0.374 0.729-0.593 1.591-0.593 2.504 0 1.153 0.35 2.225 0.95 3.115l-0.013-0.020c0.139 0.178 0.353 0.291 0.594 0.291 0 0 0 0 0 0h-0z"></path>
      </svg></div>
      <div>${weatherData.current.clouds}%</div>
    </div>
  </div>
  </div>`;
};

const updateHourlyWeather = (weatherData) => {
  weatherData.hourly.forEach((hour, i) => {
    if (i < 5 && i > 0) {
      hourlyWeather.innerHTML += `<div class="hour">
      <p>${Math.round(hour.temp)}&deg;</p>
      <img
        class="hourly-icon"
        src="http://openweathermap.org/img/wn/${hour.weather[0].icon}.png"
      />
      <p>${hour.weather[0].main}</p>
    </div>`;
    }
  });
};

// End update HTML with weather data

// Functions for filtering and displaying the cities search\

const cap = (word) => word.replace(word[0], word[0].toUpperCase());

const findMatch = (wordToMatch, cities) => {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, `gi`);
    return place.city.match(regex) || place.state.match(regex);
  });
};

function displayMatches() {
  const matchArray = findMatch(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, `gi`);

      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
        <li data-lat=${place.latitude} data-long=${place.longitude}>
          <span class="place-name">${cityName}, ${stateName}</span>
        </li>
      `;
    })
    .join(``);
  this.value ? (results.innerHTML = html) : (results.innerHTML = '');
  let individualReslts = Array.from(document.querySelectorAll('li'));

  individualReslts.forEach((listItem) =>
    listItem.addEventListener(`click`, function () {
      let { lat, long } = this.dataset;

      // Change values and styles
      searchInput.value = '';
      searchInput.style.width = '10%';
      searchInput.setAttribute(`placeholder`, `?`);
      results.innerHTML = '';
      cityName.innerHTML = `<span class="material-symbols-outlined">pin_drop</span> 
      <p class="city-name-header">
        ${cap(this.textContent.trim())}
      </p>`;
      // End Change values and styles

      // Grab weather info and update HTML
      getWeatherData(Number(lat), Number(long));
    })
  );
}

// End filter and display functions

// Event Listeners

searchInput.addEventListener(`keyup`, displayMatches);
searchInput.addEventListener(`click`, () => {
  searchInput.style.width = '60%';
  searchInput.setAttribute(`placeholder`, `Search for a city`);
});

// If user clicks out of the search box, than the input field, the input field shrinks.
mainCard.addEventListener(`click`, function (e) {
  if (searchInput.style.width === '60%' && e.target !== searchInput) {
    searchInput.style.width = `10%`;
    searchInput.setAttribute(`placeholder`, `?`);
  }
});
