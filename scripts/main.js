const renderDates = () => {
  // Render last modified
  var lastUpdated = document.lastModified;
  const lastModified = document.getElementById("lastmodified");
  lastModified.innerHTML = lastUpdated;

  // render current year
  var date = new Date();
  const currentYear = document.getElementById("currentyear");
  currentYear.innerHTML = date.getFullYear();
};

window.addEventListener("load", () => {
  renderDates();
});
