/* Refer to the README.md for instructions on what you need to do in this project */

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#athlete-name").value;
  if (name === "") {
    alert("Please enter the athlete's name.");
  }
  const trainingPlan = document.querySelector(
    "input[name='training-plan']:checked"
  ).value;
  const sessions = Number(document.getElementById("sessions").value);
  const outputDiv = document.getElementById("output");

  // Session limit validation
  if (trainingPlan === "beginner" && sessions > 2) {
    outputDiv.innerHTML =
      "⚠️ Beginner athletes can only train a maximum of 2 sessions per week.";
    return;
  }

  if (trainingPlan === "intermediate" && sessions > 3) {
    outputDiv.innerHTML =
      "⚠️ Intermediate athletes can only train a maximum of 3 sessions per week.";
    return;
  }

  if (trainingPlan === "elite" && sessions > 5) {
    outputDiv.innerHTML =
      "⚠️ Elite athletes can only train a maximum of 5 sessions per week.";
    return;
  }

  // Continue with the rest of your calculator...
});
