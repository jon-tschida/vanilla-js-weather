const loader = document.querySelector(`.lds-ring`);
const searchInput = document.querySelector(`input`);
const results = document.querySelector(`.results`);
const cityName = document.querySelector(`.city-name`);
const mainCard = document.querySelector(`.main-card`);
const mainWeather = document.querySelector(`.main-weather`);
const hourlyWeather = document.querySelector(`.hourly-container`);

// formatting the time //
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// ========================
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

// ========================
// Api call for weather

function getWeatherData(lat, long) {
  mainWeather.innerHTML = ``;
  hourlyWeather.innerHTML = ``;
  loader.classList.remove(`hide`);
  console.log(`loading..`);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&cnt=10&appid=2a8ab662e8539e2cb45726e6080084e6`
  )
    .then((response) => {
      if (response.status === 200) {
        console.log(`loaded!`);
        return response.json();
      } else alert(`Weather data failed: ${response.status}`);
    })
    .then((data) => {
      setTimeout(() => {
        loader.classList.add(`hide`);
        updateMainWeather(data);
        updateHourlyWeather(data);
      }, 1000);
    });
}
// End api call for weather

// ========================
// Update HTML with weather data and hourly weather data

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
      <div><span class="material-symbols-outlined">air</span></div>
      <div>${Math.round(weatherData.current.wind_speed)}mph</div>
    </div>
    <div class="extra-weather-content">
      <div><span class="material-symbols-outlined">humidity_percentage</span></div>
      <div>${weatherData.current.humidity}%</div>
    </div>
    <div class="extra-weather-content">
      <div><span class="material-symbols-outlined">cloud</span></div>
      <div>${weatherData.current.clouds}%</div>
    </div>
  </div>
  </div>`;
};

const updateHourlyWeather = (weatherData) => {
  weatherData.hourly.forEach((hour, i) => {
    if (i < 5 && i > 0) {
      hourlyWeather.innerHTML += `<div class="hour">
      <p>${formatAMPM(new Date(hour.dt * 1000))}</p>
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

// ========================
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

      const cityName = place.city.replace(regex, `<span>${this.value}</span>`);
      const stateName = place.state.replace(
        regex,
        `<span>${this.value}</span>`
      );

      return `
        <li data-lat=${place.latitude} data-long=${place.longitude}>
          <span class="place-name">${cityName}, ${stateName}</span>
        </li>
      `;
    })
    .join(``);
  this.value ? (results.innerHTML = html) : (results.innerHTML = '');

  // using querySelectorAll to grab our results

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
        <u>${cap(this.textContent.trim())}</u>
      </p>`;

      hourlyWeather.innerHTML = ``;

      mainCard.style.background =
        'linear-gradient(12deg, rgba(249, 249, 249, 1) 10%, rgba(9, 9, 121, 1) 35%,rgba(0, 212, 255, 1) 100%);';
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

// If user clicks out of the search box, the input field down shrinks.
mainCard.addEventListener(`click`, function (e) {
  if (searchInput.style.width === '60%' && e.target !== searchInput) {
    searchInput.style.width = `10%`;
    searchInput.setAttribute(`placeholder`, `?`);
  }
});
