import Navbar from "./Navbar.js";

const nav = new Navbar();

const date = new Date().toISOString();
document.querySelector(`#dateOrdered`).value = date;

document.querySelector(`#freshForm`).addEventListener(`submit`, () => {
  let submittedDrinks = !localStorage.getItem(`drinksSubmitted`)
    ? 0
    : localStorage.getItem(`drinksSubmitted`);

  submittedDrinks += 1;

  localStorage.setItem(`drinksSubmitted`, submittedDrinks);
});

const getData = async () => {
  const response = await fetch("./data/fruit.json");
  const data = await response.json();
  console.log(data);

  const fruitImg = document.querySelector(`#fruitFormImg`);

  document.querySelector(`select`).addEventListener(`change`, (e) => {
    if (e.target.value === "strawberry") {
      fruitImg.src = data.strawberry.image;
    } else if (e.target.value === "mango") {
      fruitImg.src = data.mango.image;
    } else if (e.target.value === "watermelon") {
      fruitImg.src = data.watermelon.image;
    }
  });
};

getData();
