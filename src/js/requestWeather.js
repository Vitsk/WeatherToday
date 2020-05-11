export default function requestWeather(value) {
  const apiKey = '1ebec06705131d28fbf066fc805f88a8';
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .catch(e => console.error(e))
}