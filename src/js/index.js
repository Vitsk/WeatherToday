import '@/css/style.css';
import renderRequests from './lastRequests';
import requestWeather from './requestWeather';

const inputForm = document.querySelector('#input-form');
const inputSearch = document.querySelector('#input-search');
const weather = document.querySelector('.weather');
const weatherHeader = document.querySelector('.weather-header');
const weatherIcons = document.querySelector('.weather-icon');
const weatherInfo = document.querySelector('.weather-info');

const allRequests = getLastRequest();
renderRequests(allRequests);
lastRequestHandler();

inputForm.addEventListener('submit', btnHandler);

function btnHandler(event) {
  event.preventDefault();
  const inputValue = inputSearch.value;

  requestWeather(inputValue)
    .then(renderContent)
    .catch(() => {
      weather.classList.add('weather-active');
      weatherHeader.textContent = 'We didn\'t find your city'
      weatherIcons.innerHTML = '';
      weatherInfo.textContent = '';
    })
}

function renderContent(content) {
  const cityName = content.name;
  const countryName = content.sys.country;
  const weatherTemp = `${Math.round(content.main.temp)}°C`;
  const weatherIcon = content.weather[0].icon;
  const weatherCloud = content.weather[0].main;

  if (weather.classList.contains('weather-active')) {
    weather.classList.toggle('weather-active', false)
  }

  setTimeout(() => {
    weather.classList.toggle('weather-active');
    weatherHeader.textContent = `${cityName}, ${countryName}`;
    weatherIcons.innerHTML = `<img src="img/${weatherIcon}.png" alt="icon">`;
    weatherInfo.textContent = `${weatherTemp}, ${weatherCloud}`;
  }, 200);

  setLastRequests(cityName);

  const allRequests = getLastRequest();
  renderRequests(allRequests);
  lastRequestHandler();
}

function setLastRequests(value) {
  const all = getLastRequest();
  if (all.includes(value) === true) {
    return;
  }
  if (all[4]) all.pop();
  all.unshift(value);
  localStorage.setItem("request", JSON.stringify(all));
}

function getLastRequest() {
  return JSON.parse(localStorage.getItem('request') || '[]');
}

// Handler on last request
function lastRequestHandler() {
  const requestsListener = document.querySelectorAll('.request-listener');
  requestsListener.forEach((item) => {
    item.addEventListener('click', () => {
      const value = item.textContent;

      requestWeather(value)
        .then(renderContent)
        .catch(() => {
          weather.classList.add('weather-active');
          weatherHeader.textContent = 'We didn\'t find your city'
          weatherIcons.innerHTML = '';
          weatherInfo.textContent = '';
        })
    });
  });
}