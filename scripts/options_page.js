var activeCheckbox = null;

function handleSubscriptionPlan(checkbox) {
  var activePlanElement = document.getElementById('active-plan');
  var daysLeftElement = document.getElementById('days-left');

  activePlanElement.style.color = '';
  daysLeftElement.style.color = '';

  var cardNumber = document.getElementById('cardNumber').value;
  var expiryDate = document.getElementById('expiryDate').value;
  var cvv = document.getElementById('cvv').value;

  if (cardNumber.trim() === '' || expiryDate.trim() === '' || cvv.trim() === '') {
    alert('Proszę wprowadzić wszystkie dane karty przed zmianą planu subskrypcji.');
    checkbox.checked = false; 
    return;
  }

  if (checkbox.checked) {
    if (activeCheckbox) {
      activeCheckbox.checked = false;
    }

    activeCheckbox = checkbox;

    var planDuration = checkbox.parentElement.parentElement.getAttribute('data-duration');
    activePlanElement.textContent = 'Plan ' + planDuration + ' dni';
    daysLeftElement.textContent = planDuration;
    activePlanElement.style.color = 'green';
    daysLeftElement.style.color = 'green';
  } else {
    activeCheckbox = null;
    activePlanElement.textContent = 'Brak';
    daysLeftElement.textContent = '0';
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



function openPaymentModal() {
  document.getElementById('paymentModal').style.display = 'block';
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function savePaymentDetails() {
  var cardNumber = document.getElementById('cardNumber').value;
  var expiryDate = document.getElementById('expiryDate').value;
  var cvv = document.getElementById('cvv').value;

  document.getElementById('notify').style.display = 'block';
  closePaymentModal();
}

function toggleAdditionalForm() {
  var additionalFormContainer = document.getElementById('additionalFormContainer');
  additionalFormContainer.style.display = additionalFormContainer.style.display === 'none' ? 'block' : 'none';
}

function submitAdditionalForm(event) {
  event.preventDefault();

  var homeName = document.getElementById('homeName').value;
  var homeAddress = document.getElementById('homeAddress').value;
  var phoneNumber = document.getElementById('phoneNumber').value;

  document.getElementById('notify').style.display = 'block';
  document.getElementById('homeName').value = '';
  document.getElementById('homeAddress').value = '';
  document.getElementById('phoneNumber').value = '';

  displayAdditionalFormData(homeName, homeAddress, phoneNumber);
  toggleAdditionalForm();
}

function displayAdditionalFormData(homeName, homeAddress, phoneNumber) {
  var displayElement = document.getElementById('displayAdditionalFormData');
  var displayHTML = `
    <p>Nazwa Domu: ${homeName}</p>
    <p>Adres Domu: ${homeAddress}</p>
    <p>Numer Telefonu: ${phoneNumber}</p>
  `;
  document.getElementById('displayAdditionalFormData').style.display ='block';
  displayElement.innerHTML = displayHTML;
}