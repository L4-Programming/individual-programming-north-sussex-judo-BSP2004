document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("athlete-name").value;
  const trainingPlan = document.querySelector(
    "input[name='training-plan']:checked"
  ).value;
  const currentWeight = parseFloat(
    document.getElementById("current-weight").value
  );

  const competitions = parseInt(
    document.querySelector("input[name='competitions-entered']").value || 0
  );

  const privateHours = parseFloat(
    document.querySelector("input[name='private-coaching-hours']").value || 0
  );

  const weeklySessions = parseInt(
    document.querySelector("#weekly-sessions").value || 0
  );

  const outputDiv = document.getElementById("output");

  // --- Competition rule ---
  if (competitions > 1) {
    outputDiv.textContent = "⚠️ You can only enter 1 competition per month.";
    return;
  }

  // --- Private hours rule ---
  if (privateHours < 0 || privateHours > 20) {
    outputDiv.textContent = "Private coaching hours must be between 0 and 20.";
    return;
  }

  // --- Beginner – no competitions ---
  if (trainingPlan === "beginner" && competitions > 0) {
    outputDiv.textContent = "Beginner athletes cannot enter competitions.";
    return;
  }

  // --- Weekly training session limits ---
  const maxSessions = {
    beginner: 2,
    intermediate: 3,
    elite: 5,
  };

  if (weeklySessions > maxSessions[trainingPlan]) {
    outputDiv.textContent = `${
      trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1)
    } athletes can train a maximum of ${
      maxSessions[trainingPlan]
    } times per week.`;
    return;
  }

  // --- Cost calculation ---

  const rates = {
    beginner: 25 * 4,
    intermediate: 30 * 4,
    elite: 35 * 4,
    competitionFee: 22,
    privateCoachingRate: 25,
  };

  const trainingCost = rates[trainingPlan];
  const competitionCost = competitions * rates.competitionFee;
  const privateCoachingCost = privateHours * rates.privateCoachingRate;

  const totalCost = trainingCost + competitionCost + privateCoachingCost;

  let trainingName =
    trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1);

  let message = `
    Athlete Name: ${name}<br><br>
    Training Plan: ${trainingName} — £${trainingCost.toFixed(2)}<br>
    Weekly Sessions: ${weeklySessions}<br>
    Competitions Entered: ${competitions} — £${competitionCost.toFixed(2)}<br>
    Private Coaching Hours: ${privateHours} — £${privateCoachingCost.toFixed(
    2
  )}<br><br>
    <strong>Total Monthly Cost: £${totalCost.toFixed(2)}</strong>
  `;

  outputDiv.innerHTML = message;
});
