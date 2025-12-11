/* Refer to the README.md for instructions on what you need to do in this project */

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#athlete-name").value;
  if (name === "") {
    alert("Please enter the athlete's name.");
  }

  // --- Private Coaching Hours ---
  if (privateHours < 0 || privateHours > 20) {
    return {
      valid: false,
      message: "Private coaching hours must be between 0 and 20.",
    };
  }

  // --- Weekly Training Session Limits ---
  const maxSessions = {
    beginner: 2,
    intermediate: 3,
    elite: 5,
  };

  if (competitions > maxSessions[trainingPlan]) {
    return {
      valid: false,
      message: `${
        trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1)
      } athletes can train a maximum of ${
        maxSessions[trainingPlan]
      } times per week.`,
    };
  }
});
