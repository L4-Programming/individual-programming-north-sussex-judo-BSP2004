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

  let outputDiv = document.getElementById("output");

  // Validation

  if (privateHours < 0 || privateHours > 20) {
    outputDiv.textContent = "Private coaching hours must be between 0 and 20.";
    return;
  }

  if (trainingPlan === "beginner" && competitions > 0) {
    outputDiv.textContent = "Beginner athletes cannot enter competitions.";
    return;
  }

  // Rates + Costs

  const rates = {
    beginner: 25,
    intermediate: 40,
    elite: 60,
    competitionFee: 12,
    privateCoachingRate: 25,
  };

  const trainingCost = rates[trainingPlan];
  const competitionCost = competitions * rates.competitionFee;
  const privateCoachingCost = privateHours * rates.privateCoachingRate;

  const totalCost = trainingCost + competitionCost + privateCoachingCost;

  // Build output text

  let trainingName =
    trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1);

  let message = `
    Athlete Name: ${name}<br><br>
    Training Plan: ${trainingName} — £${trainingCost.toFixed(2)}<br>
    Competitions Entered: ${competitions} — £${competitionCost.toFixed(2)}<br>
    Private Coaching Hours: ${privateHours} — £${privateCoachingCost.toFixed(
    2
  )}<br><br>
    <strong>Total Monthly Cost: £${totalCost.toFixed(2)}</strong>
  `;

  outputDiv.innerHTML = message;
});
