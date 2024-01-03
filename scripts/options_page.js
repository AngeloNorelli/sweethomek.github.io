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
    document.getElementById('notify').style.display = 'block';
    setTimeout(function() {
        document.getElementById('notify').style.display = 'none';
    }, 3000); 
}

document.addEventListener('click', function() {
  window.parent.postMessage('clicked', '*');
});