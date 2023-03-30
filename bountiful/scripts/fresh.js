import Navbar from "./Navbar.js";

const nav = new Navbar();

const date = new Date().toISOString();
document.querySelector(`#dateOrdered`).value = date;

document.querySelector(`#freshForm`).addEventListener(`submit`, () => {
  let submittedDrinks = !localStorage.getItem(`drinksSubmitted`)
    ? 0
    : Number(localStorage.getItem(`drinksSubmitted`));

  console.log(typeof submittedDrinks);
  localStorage.setItem(`drinksSubmitted`, submittedDrinks + 1);
});

const getData = async () => {
  const response = await fetch("./data/fruityvice.json");
  const data = await response.json();
  console.log(data);

  const render = data.fruits.map((item) => {
    return `
      <option value="${item.name.toLowerCase()}">${item.name}</option>
    `;
  });

  document.querySelector(`#flavor1`).innerHTML = render.join("");
  document.querySelector(`#flavor2`).innerHTML = render.join("");
  document.querySelector(`#flavor3`).innerHTML = render.join("");

  // const fruitImg = document.querySelector(`#fruitFormImg`);

  // // document.querySelector(`select`).addEventListener(`change`, (e) => {
  // //   if (e.target.value === "strawberry") {
  // //     fruitImg.src = data.strawberry.image;
  // //   } else if (e.target.value === "mango") {
  // //     fruitImg.src = data.mango.image;
  // //   } else if (e.target.value === "watermelon") {
  // //     fruitImg.src = data.watermelon.image;
  // //   }
  // // });
};

getData();
