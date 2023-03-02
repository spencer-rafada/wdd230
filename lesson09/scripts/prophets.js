const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const numeric = (item) => {
  if (item === 1) return "st";
  if (item === 2) return "nd";
  if (item === 3) return "rd";
  return "th";
};

const getAge = (birthDate, deathDate) => {
  const birth = new Date(birthDate);
  const death = new Date(deathDate);
  const age = new Date(death - birth).getFullYear() - 1970;
  return age;
};

const displayProphets = (list) => {
  const cards = document.querySelector(`.cards`);
  list.forEach((item) => {
    const card = document.createElement(`section`);
    card.setAttribute(`class`, `card`);
    card.innerHTML = `
    <div class="card__header">
      <h2>${item.name} ${item.lastname}</h2>
    </div>
    <div class="card__info">
      <p>Age: ${getAge(item.birthdate, item.death)}</p>
      <p>Length: ${item.length}</p>
      <p>Birth date: ${item.birthdate}</p>
      <p>Birth place: ${item.birthplace}</p>
      <p>Death date: ${item.death}</p>
      <p>Children: ${item.numofchildren}</p>
    </div>
    <div class="card__image">
      <p>${item.order}</p>
      <img src="${item.imageurl}" alt="Portrait of ${item.name} ${
      item.lastname
    } - ${item.order}${numeric(item.order)} Latter-Day President">
    </div>
    `;
    cards.appendChild(card);
  });
};

const getProphetsData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets);
  displayProphets(data.prophets);
};

getProphetsData();
