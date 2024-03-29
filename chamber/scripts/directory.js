const getData = async () => {
  const response = await fetch("./data/data.json");
  const data = await response.json();
  return data;
};

document.querySelector(`#grid`).addEventListener(`click`, async () => {
  console.log(`grid`);
  const directory = await getData();
  displayBusiness(directory.directory);
  document
    .querySelector(`.contacts`)
    .setAttribute(`class`, `contacts gridDirectory`);
  document.querySelector(`#grid`).style.display = "none";
  document.querySelector(`#list`).style.display = "block";
});
document.querySelector(`#list`).addEventListener(`click`, async () => {
  console.log(`list`);
  const directory = await getData();
  displayBusiness(directory.directory);
  document
    .querySelector(`.contacts`)
    .setAttribute(`class`, `contacts listDirectory`);
  document.querySelector(`#list`).style.display = "none";
  document.querySelector(`#grid`).style.display = "block";
});

window.addEventListener(`load`, async () => {
  const directory = await getData();
  displayBusiness(directory.directory);
  document
    .querySelector(`.contacts`)
    .setAttribute(`class`, `contacts gridDirectory`);
  document.querySelector(`#grid`).style.display = "none";
});

const displayBusiness = (list) => {
  const contactsElement = document.querySelector(`.contacts`);
  contactsElement.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement(`div`);
    card.setAttribute(`class`, `card ${item.membershipLevel}`);

    card.innerHTML = `
    <div class="cardImg">
      <img src="${item.image}" alt="Portrait of ${item.name}">
    </div>
    <div class="cardInfo">
      <h2>${item.name}</h2>
      <p>${item.address}</p>
      <p>${item.phone}</p>
      <a href="${item.url}">Link</a>
    </div>
    `;
    contactsElement.appendChild(card);
  });
};

// Nav
const toggleMenu = () => {
  document.querySelector(`#navbar`).classList.toggle("menu-active");
  document.querySelector(`#menu-open-2`).classList.toggle("menu-active");
  document.querySelector(`#menu-close`).classList.toggle("menu-active");
  document.querySelector(`#menu-open`).classList.toggle("menu-active");
};

// document.querySelector(`#hamburger-menu`).addEventListener(`click`, toggleMenu);
document.querySelector(`#hamburger-menu`).onclick = toggleMenu;
document.querySelector(`#menu-open-2`).onclick = toggleMenu;
