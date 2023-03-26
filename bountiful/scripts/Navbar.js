export default class Navbar {
  constructor() {
    this.openBtn = document.querySelector(`#navHeader__hamburger-closed`);

    this.openBtn.addEventListener(`click`, () => {
      if (
        document.querySelector(`.navHeader__links`).style.display === "none"
      ) {
        document.querySelector(`.navHeader__links`).style.display = "flex";
      } else {
        document.querySelector(`.navHeader__links`).style.display = "none";
      }
    });
  }
}
