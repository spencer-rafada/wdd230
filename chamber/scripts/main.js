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
const displayLastVisit = `<p class="alert">It's been ${daysLastVisit.toFixed(
  0
)} days since your last visit! Welcome back!</p>`;
if (daysLastVisit === 0) {
  document
    .querySelector(`header`)
    .insertAdjacentHTML(`beforebegin`, displayLastVisit);
}

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

  temperatureElement.innerHTML = temp;
  windSpeedElement.innerHTML = windspeed;
  windChillElement.innerHTML = chill;
};

showWeather(5, 5);
