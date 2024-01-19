var activeCheckbox = null;

function handleSubscriptionPlan(checkbox) {
  var activePlanElement = document.getElementById("active-plan");
  var daysLeftElement = document.getElementById("days-left");

  activePlanElement.style.color = "";
  daysLeftElement.style.color = "";

  if (checkbox.checked) {
    if (activeCheckbox) {
      activeCheckbox.checked = false;
    }

    activeCheckbox = checkbox;

    var planDuration = checkbox.parentElement.parentElement.getAttribute("data-duration");
    activePlanElement.textContent = "Plan " + planDuration + " dni";
    daysLeftElement.textContent = planDuration;
    activePlanElement.style.color = "green";
    daysLeftElement.style.color = "green";
  } else {
    // Plan został odznaczony
    activeCheckbox = null;
    activePlanElement.textContent = "Brak";
    daysLeftElement.textContent = "0";
  }
}

function submitForm() {
  var descriptionInput = document.getElementById("description");
  var appointmentInput = document.getElementById("appointment");

  if (descriptionInput.value.trim() === "" || appointmentInput.value.trim() === "") {
    alert("Proszę wypełnić wszystkie pola przed wysłaniem zgłoszenia.");
    return;
  }

  document.getElementById('notify').style.display = 'block';

  descriptionInput.value = "";
  appointmentInput.value = "";

  if (activeCheckbox) {
    activeCheckbox.checked = false;
    activeCheckbox = null;
  }

  var activePlanElement = document.getElementById("active-plan");
  var daysLeftElement = document.getElementById("days-left");
  activePlanElement.textContent = "Brak";
  daysLeftElement.textContent = "0";

  setTimeout(function () {
    document.getElementById('notify').style.display = 'none';
  }, 3000);
}