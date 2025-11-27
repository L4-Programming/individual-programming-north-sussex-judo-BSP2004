/* Refer to the README.md for instructions on what you need to do in this project */

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#athlete-name").value;
  if (name === "") {
    alert("Please enter the athlete's name.");
  }
});
