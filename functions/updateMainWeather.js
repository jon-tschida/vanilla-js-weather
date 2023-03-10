export default function updateMainWeather(weatherData, html) {
  html.innerHTML = `
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
}
