const searchInput = document.querySelector(`input`);
const results = document.querySelector(`.results`);
const cityName = document.querySelector(`.city-name`);
const mainCard = document.querySelector(`.main-card`);

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
const weatherEndPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=35.9940&lon=-78.8986&units=imperial&cnt=10&appid=2a8ab662e8539e2cb45726e6080084e6`;

function getWeatherData(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&cnt=10&appid=2a8ab662e8539e2cb45726e6080084e6`
  )
    .then((response) => {
      if (response.status === 200) return response.json();
      else alert(`Weather data failed: ${response.status}`);
    })
    .then((data) => console.log(data));
}
// End api call for weather

// Update HTML with weather data

const updateHTML = (weatherData) => {};

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
      // Change values and styles
      searchInput.value = '';
      searchInput.style.width = '10%';
      searchInput.setAttribute(`placeholder`, `?`);
      results.innerHTML = '';
      cityName.innerHTML = `<p class="city-name-header">
        ${cap(this.textContent.trim())}
        <span class="material-symbols-outlined">pin_drop</span>
      </p>`;
      // End Change values and styles
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