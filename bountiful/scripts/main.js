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
  console.log(data);
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
