import Navbar from "./Navbar.js";

const nav = new Navbar();

const url = new URL(window.location);
const params = url.searchParams;

params.forEach((item) => console.log(item));

const getData = async (flavor) => {
  // TODO: ask TA about this
  try {
    const response = await fetch("./data/fruityvice.json");
    const data = await response.json();
    return data.fruits.filter((item) => item.name.toLowerCase() === flavor);
  } catch (error) {
    console.log(error);
  }
};

const renderDrinkDetails = (drink) => {
  return `
  <p>Carbohydrates: <span>${drink.nutritions.carbohydrates}</span></p>
  <p>Protein: <span>${drink.nutritions.protein}</span></p>
  <p>Fat: <span>${drink.nutritions.fat}</span></p>
  <p>Sugar: <span>${drink.nutritions.sugar}</span></p>
  <p>Calories: <span>${drink.nutritions.calories}</span></p>
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
  <p>Flavor: <span>${params.get(`flavor`)}</span></p>
  <p>Special Instructions: <span>${params.get(`instructions`)}</span></p>
  <p>Order Date: <span>${date.toLocaleTimeString(
    "en-us",
    dateoptions
  )}</span></p>`;
};

const renderImage = (flavor, element) => {
  if (flavor === "strawberry") {
    element.src = "./images/strawberry_shake.png";
  } else if (flavor === "mango") {
    element.src = "./images/mango_shake.png";
  } else if (flavor === "watermelon") {
    element.src = "./images/watermelon_shake.png";
  }
};

const drinkData = await getData(params.get(`flavor`));
const drinkImg = document.querySelector(`#confirmationDrinkImage`);

renderImage(params.get(`flavor`), drinkImg);
document.querySelector(`.confirmation__orderDetails`).innerHTML =
  renderOrderDetails(params);
document.querySelector(`.confirmation__drinkDetails`).innerHTML =
  renderDrinkDetails(drinkData[0]);
