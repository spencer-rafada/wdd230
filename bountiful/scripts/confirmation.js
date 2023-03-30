import Navbar from "./Navbar.js";

const nav = new Navbar();

const url = new URL(window.location);
const params = url.searchParams;

params.forEach((item) => console.log(item));

const getData = async (flavor) => {
  try {
    const response = await fetch("./data/fruityvice.json");
    const data = await response.json();
    return data.fruits.filter((item) => item.name.toLowerCase() === flavor);
  } catch (error) {
    console.log(error);
  }
};

const renderDrinkDetails = (drink) => {
  let sumCarbs = 0;
  let sumProtein = 0;
  let sumFat = 0;
  let sumSugar = 0;
  let sumCal = 0;
  drink.forEach((item) => {
    sumCarbs += item.nutritions.carbohydrates;
    sumProtein += item.nutritions.protein;
    sumFat += item.nutritions.fat;
    sumSugar += item.nutritions.sugar;
    sumCal += item.nutritions.calories;
  });
  return `
  <p>Carbohydrates: <span>${sumCarbs}</span></p>
  <p>Protein: <span>${sumProtein.toFixed(2)}</span></p>
  <p>Fat: <span>${sumFat.toFixed(2)}</span></p>
  <p>Sugar: <span>${sumSugar.toFixed(2)}</span></p>
  <p>Calories: <span>${sumCal.toFixed(2)}</span></p>
  `;
};

const renderOrderDetails = (params) => {
  const isoString = params.get(`dateOrdered`);
  const date = new Date(isoString);
  const dateoptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `
  <p>Order For: <span>${params.get(`firstName`)}</span></p>
  <p>Email: <span id="email">${params.get(`email`)}</span></p>
  <p>Phone: <span>${params.get(`phone`)}</span></p>
  <p>Drink: <span>${params.get(`flavor1`)}-${params.get(
    `flavor2`
  )}-${params.get(`flavor3`)}</span></p>
  <p>Special Instructions: <span>${params.get(`instructions`)}</span></p>
  <p>Order Date: <span>${date.toLocaleTimeString(
    "en-us",
    dateoptions
  )}</span></p>`;
};

const drinkData1 = await getData(params.get(`flavor1`));
const drinkData2 = await getData(params.get(`flavor2`));
const drinkData3 = await getData(params.get(`flavor3`));

const drinkData = [...drinkData1, ...drinkData2, ...drinkData3];

document.querySelector(`.confirmation__orderDetails`).innerHTML =
  renderOrderDetails(params);
document.querySelector(`.confirmation__drinkDetails`).innerHTML =
  renderDrinkDetails(drinkData);

// Lazy Loading
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
