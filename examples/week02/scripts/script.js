const today = new Date();

const dateoptions = (options = {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// document.querySelector("#today").textContent = today.toLocaleDateString(
//   "en-US",
//   dateoptions
// );

document.querySelector("#today").textContent = today.toLocaleTimeString(
  "en-US",
  dateoptions
);

// OLD WAY
// month is zero-based
// const mydatestring = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
// document.querySelector(`#today`).textContent = mydatestring;

// textContent vs innerHTML
document.querySelector(`#temp`).innerHTML = `32&deg`;
// document.querySelector(`#temp`).textContent = `32&deg`;

// Input Elements
document.querySelector(`#myinput`).placeholder = "Enter input";
// document.querySelector(`#myinput`).value = "Hello World";

// Callback
const makeRed = (item) => {
  item.style.color = "red";
};

document.querySelectorAll(`.somecontent`).forEach(makeRed);
