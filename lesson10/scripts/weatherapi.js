const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = `https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&appid=a665d48ca80d44656de93287ab204a25&units=imperial
`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

const displayResults = (weatherData) => {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp}</strong>`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weatherIcon.alt = weatherData.weather[0].description;
  captionDesc.textContent = weatherData.weather[0].description;
};
