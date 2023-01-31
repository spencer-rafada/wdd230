const inputElement = document.querySelector(`#favchap`);
const buttonElement = document.querySelector(`main button`);
const listElement = document.querySelector(`#list`);

const addChapter = () => {
  // make sure the input is not blank before doing the following remaining tasks in this list
  if (inputElement.value === "") return;
  // create an li element
  const li = document.createElement(`li`);
  // create a delete button
  const deleteButton = document.createElement(`button`);
  // populate the li elements textContent or innerHTML with the input
  li.innerHTML = inputElement.value;
  // populate the button textContent with an ❌
  deleteButton.textContent = `❌`;
  // append the li element with the delete button
  li.appendChild(deleteButton);
  // append the list element with the li element just created and appended with text and the delete button
  listElement.appendChild(li);
  // add an event listener to the delete button that removes the li element when clicked
  deleteButton.addEventListener(`click`, () => {
    li.remove();
    // send the focus to the input element
    inputElement.focus();
  });
  // change the input value to nothing or the empty string to clean up the interface for the user
  inputElement.value = "";
};

buttonElement.addEventListener("click", addChapter);
inputElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addChapter();
  }
});
