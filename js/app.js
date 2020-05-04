const apiKey = '1ebec06705131d28fbf066fc805f88a8';

const inputForm = document.querySelector('#input-form');
const inputSearch = document.querySelector('#input-search');
const btnSearch = document.querySelector('#btn-search');

const handler = inputForm.addEventListener('submit', btnHandler);

function btnHandler(event) {
  event.preventDefault();
  const inputValue = inputSearch.value;

  const requestWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`)
    .then(response => response.json())
    .catch(e => console.error(e))

  // requestWeather
  //   .then(data => data)
  //   .catch(e => console.error(e));
}
