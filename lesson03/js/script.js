const renderDates = () => {
  // render current year
  var date = new Date();
  const currentYear = document.getElementById("currentyear");
  currentYear.innerHTML = date.getFullYear();
};

window.addEventListener("load", () => {
  renderDates();
});
