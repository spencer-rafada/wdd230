const today = new Date();

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

const displayBanner = `<p class="alert">🤝🏼 Get a Quote today 🤝🏼</p>`;
if (today.getDay() === 1 || today.getDay() === 2) {
  document
    .querySelector(`header`)
    .insertAdjacentHTML(`beforebegin`, displayBanner);
}
