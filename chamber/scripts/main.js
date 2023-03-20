const today = new Date();
localStorage.setItem(`lastVisit`, today);

const dateoptions = (options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

document.querySelector(`#date-today`).innerHTML = today.toLocaleDateString(
  "en-UK",
  dateoptions
);

const toggleMenu = () => {
  document.querySelector(`#navbar`).classList.toggle("menu-active");
  document.querySelector(`#menu-open-2`).classList.toggle("menu-active");
  document.querySelector(`#menu-close`).classList.toggle("menu-active");
  document.querySelector(`#menu-open`).classList.toggle("menu-active");
};

// document.querySelector(`#hamburger-menu`).addEventListener(`click`, toggleMenu);
document.querySelector(`#hamburger-menu`).onclick = toggleMenu;
document.querySelector(`#menu-open-2`).onclick = toggleMenu;

var lastUpdated = document.lastModified;
const lastModified = document.getElementById("lastmodified");
lastModified.innerHTML = lastUpdated;

const currentYear = document.getElementById("year-now");
currentYear.innerHTML = today.getFullYear();

// Display banner
const displayBanner = `<p class="alert">🤝🏼 Get a Quote today 🤝🏼</p>`;
if (today.getDay() === 1 || today.getDay() === 2) {
  document
    .querySelector(`header`)
    .insertAdjacentHTML(`beforebegin`, displayBanner);
}

// Display amount of days from last visit
const lastVisit = new Date(localStorage.getItem(`lastVisit`));
const daysLastVisit_time = today - lastVisit.getTime();
const daysLastVisit = daysLastVisit_time / (1000 * 3600 * 24);
const displayLastVisit =
  daysLastVisit > 0
    ? `<p class="alert">Welcome back!</p>`
    : `<p class="alert">It's been ${daysLastVisit.toFixed(
        0
      )} days since your last visit! Welcome back!</p>`;
document
  .querySelector(`header`)
  .insertAdjacentHTML(`beforebegin`, displayLastVisit);

// Show weather
const showWeather = (temp, windspeed) => {
  const temperatureElement = document.querySelector(`#temperature`);
  const windSpeedElement = document.querySelector(`#wind-speed`);
  const windChillElement = document.querySelector(`#wind-chill`);

  let chill = "n/a";
  if (windspeed > 3 && temp <= 50) {
    chill = Math.round(
      35.74 +
        0.6215 * temp -
        35.75 * Math.pow(windspeed, 0.16) +
        0.4275 * temp * Math.pow(windspeed, 0.16)
    );
  }

  temperatureElement.innerHTML = `<strong>${temp} &deg;F</strong>`;
  windSpeedElement.innerHTML = windspeed;
  windChillElement.innerHTML = chill;
};

document.querySelector(`#join`).addEventListener(`click`, () => {
  location.href = "join.html";
});

document.querySelector(`#join2`).addEventListener(`click`, () => {
  location.href = "join.html";
});

// Weather Script
const weatherIcon = document.querySelector(`#weather-icon`);
const weather = document.querySelector(`#weather`);
const url = `https://api.openweathermap.org/data/2.5/weather?q=Tarlac&appid=a665d48ca80d44656de93287ab204a25&units=imperial
`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      showWeather(data.main.temp, data.wind.speed);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

const displayResults = (weatherData) => {
  weather.innerHTML = `<strong>${weatherData.weather[0].description}</strong>`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weatherIcon.alt = weatherData.weather[0].description;
  // captionDesc.textContent = weatherData.weather[0].description;
};

apiFetch();

// Spotlight
const getData = async () => {
  const response = await fetch("./data/data.json");
  const data = await response.json();
  return data;
};

const displaySpotlight = (list) => {
  const spotlightElement = document.querySelector(`.spotlight`);
  spotlightElement.innerHTML = "<h2>Spotlight</h2>";
  list.forEach((item) => {
    const card = document.createElement(`div`);
    card.setAttribute(`class`, `content service`);
    card.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image}" alt="Portrait of ${item.name}"/>
      <p>${item.info}</p>
    `;
    spotlightElement.appendChild(card);
  });
};

window.addEventListener(`load`, async () => {
  const spotlight = await getData();
  console.log(spotlight);
  const filteredList = spotlight.directory.filter(
    (item) => item.membershipLevel === "Gold"
  );
  console.log(filteredList);
  displaySpotlight(filteredList);
});
