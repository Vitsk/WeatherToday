import '@/css/style.css';

const apiKey = '1ebec06705131d28fbf066fc805f88a8';

const inputForm          = document.querySelector('#input-form');
const inputSearch        = document.querySelector('#input-search');
const btnSearch          = document.querySelector('#btn-search');
const weather            = document.querySelector('.weather');
const weatherHeader      = document.querySelector('.weather-header');
const weatherIcons       = document.querySelector('.weather-icon');
const weatherInfo        = document.querySelector('.weather-info');

inputForm.addEventListener('submit', btnHandler);

function btnHandler(event) {
  event.preventDefault();
  const inputValue = inputSearch.value;

  requestWeather(inputValue)
    .then(renderContent)
    .catch(() => {
      weather.classList.add('weather-active');
      weatherHeader.textContent = 'We didn\'t find your city'
      weatherInfo.textContent = '';
    })
}

function requestWeather(value) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .catch(e => console.error(e))
}

function renderContent(content) {
  const cityName = content.name;
  const weatherTemp = `${Math.round(content.main.temp)}°C`;
  const weatherIcon = content.weather[0].icon;
  const weatherCloud = content.weather[0].main;

  weather.classList.add('weather-active');
  weatherHeader.textContent = cityName;
  weatherIcons.innerHTML = `<img width="80px" height="80px" src="img/${weatherIcon}.png" alt="icon">`;
  weatherInfo.textContent = `${weatherTemp}, ${weatherCloud}`;
  console.log(content);
}