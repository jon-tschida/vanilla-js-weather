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

export default function updateHourlyWeather(weatherData, html) {
  weatherData.hourly.forEach((hour, i) => {
    if (i < 5 && i > 0) {
      html.innerHTML += `<div class="hour">
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
}
