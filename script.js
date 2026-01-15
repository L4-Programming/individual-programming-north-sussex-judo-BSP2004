// Get the form element
const form = document.getElementById("form");

// Function to determine weight category
function getWeightCategory(weight) {
  if (weight <= 66) return "Flyweight";
  if (weight <= 73) return "Lightweight";
  if (weight <= 81) return "Light-Middleweight";
  if (weight <= 90) return "Middleweight";
  if (weight <= 100) return "Light-Heavyweight";
  return "Heavyweight"; // Over 100 kg
}

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent page reload

  // 1. Collect input values
  const name = document.getElementById("athlete-name").value.trim();
  const trainingPlan = document.querySelector(
    "input[name='training-plan']:checked"
  ).value;
  const currentWeight = parseFloat(
    document.getElementById("current-weight").value
  );
  const competitions = parseInt(
    document.getElementById("competitions-entered").value || 0
  );
  const privateHours = parseFloat(
    document.getElementById("private-coaching-hours").value || 0
  );

  const outputDiv = document.getElementById("output");

  // 2. Validate inputs
  if (name === "") {
    alert("Please enter the athlete's name.");
    return;
  }

  if (privateHours < 0 || privateHours > 5) {
    alert("Private coaching hours must be between 0 and 5 per week.");
    return;
  }

  if (trainingPlan === "beginner" && competitions > 0) {
    alert("Beginner athletes cannot enter competitions.");
    return;
  }

  // 3. Define costs
  const weeklyTrainingCost = { beginner: 25, intermediate: 30, elite: 35 }; // per week
  const weeklySessions = { beginner: 2, intermediate: 3, elite: 5 };
  const competitionFee = 22;
  const privateCoachingRate = 9.5;

  // 4. Calculate costs
  const trainingCost = weeklyTrainingCost[trainingPlan] * 4; // 4 weeks per month
  const competitionCost =
    trainingPlan !== "beginner" ? competitions * competitionFee : 0;
  const privateCoachingCost = privateHours * privateCoachingRate * 4; // 4 weeks
  const totalCost = trainingCost + competitionCost + privateCoachingCost;

  // 5. Determine weight category
  const category = getWeightCategory(currentWeight);

  // 7. Display output
  outputDiv.innerHTML = `
    <p><strong>Athlete Name:</strong> ${name}</p>
    <p><strong>Training Plan:</strong> ${
      trainingPlan.charAt(0).toUpperCase() + trainingPlan.slice(1)
    } — £${trainingCost.toFixed(2)}</p>
    <p><strong>Weekly Sessions:</strong> ${weeklySessions[trainingPlan]}</p>
    <p><strong>Competitions Entered:</strong> ${competitions} — £${competitionCost.toFixed(
    2
  )}</p>
    <p><strong>Private Coaching Hours:</strong> ${privateHours} — £${privateCoachingCost.toFixed(
    2
  )}</p>
    <p><strong>Total Monthly Cost:</strong> £${totalCost.toFixed(2)}</p>
    <p><strong>Weight Category:</strong> ${category}</p>
  `;

  // 8. Optional: reset form
  form.reset();
});
