import Navbar from "./Navbar.js";

const nav = new Navbar();

document.querySelector(`#build-a-drink`).addEventListener(`click`, () => {
  location.href = "fresh.html";
});

const drinkSubmitted = !localStorage.getItem(`drinksSubmitted`)
  ? 0
  : localStorage.getItem(`drinksSubmitted`);

document.querySelector(`#drinks-made`).innerHTML = drinkSubmitted;

const getData = async () => {
  const response = await fetch("./data/carlsbad.json");
  const data = await response.json();
  try {
    const weather_uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.location.lat}&lon=${data.location.long}&appid=a665d48ca80d44656de93287ab204a25&units=imperial&exclude=hourly`;
    const weatherResponse = await fetch(weather_uri);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    const filteredList = weatherData.list.filter((value, index) => {
      return index % 8 === 0 && index < 24;
    });
    renderWeatherInformation(filteredList);
  } catch (error) {
    console.log(error);
  }
  document.querySelector(`.coastalInformation__info`).innerHTML =
    renderCoastalInformation(data);
};

getData();

const renderCoastalInformation = (data) => {
  return `
  <h3>${data.name}, ${data.state}</h3>
  <h4>Population: ${data.population}</h4>
  <p>${data.name} is a city near ${data.county}, ${data.state}. It's known for Tamarack Surf Beach, backed by the Carlsbad Sea Wall, and secluded South Carlsbad State Beach.
  Their current mayor is ${data.mayor}
  </p>
  `;
};

const renderWeatherInformation = (list) => {
  const listElement = document.querySelector(`.weatherListContainer`);

  const temp = list.map((item) => weatherInformationTemplate(item));

  listElement.innerHTML = temp.join("");
};

// temperature, condition description, humidity, 3 day temp forecast
const weatherInformationTemplate = (item) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  const date = new Date(item.dt_txt);
  const dateoptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `
  <div class="weather">
    <div class="weatherImg">
      <p>${date.toLocaleTimeString("en-US", dateoptions)}</p>
      <img src="${weatherIcon}" alt="${item.weather[0].main}">
    </div>
    <div class="weatherInfo">
      <p>Temperature: ${item.main.temp} &deg;C</p>
      <p>Humidity: ${item.main.humidity}%</p>
      <p id="weatherDesc">Description: ${item.weather[0].description}</p>
    </div>
  </div>
  `;
};

let imagesToLoad = document.querySelectorAll(`img[data-src]`);

const loadImages = (img) => {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = () => {
    img.removeAttribute("data-src");
  };
};

const callback = (items, observer) => {
  items.forEach((item) => {
    if (item.isIntersecting) {
      loadImages(item.target);
      observer.unobserve(item.target);
    }
  });
};

const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(callback, options);

imagesToLoad.forEach((img) => {
  observer.observe(img);
});
