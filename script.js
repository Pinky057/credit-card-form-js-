document
  .getElementById("cardholder-name")
  .addEventListener("input", function () {
    document.getElementById("cardholder-name-display").textContent = this.value;
  });

const cardNumberInputs = document.querySelectorAll(".card-number");
cardNumberInputs.forEach((input) => {
  input.addEventListener("input", updateCardNumberDisplay);
});

function updateCardNumberDisplay() {
  let cardNumber = "";
  cardNumberInputs.forEach((input) => {
    cardNumber += input.value.padEnd(4, "#") + " ";
  });
  document.getElementById("card-number-display").textContent =
    cardNumber.trim();
}

document.getElementById("expiry-month").addEventListener("change", function () {
  updateExpiryDateDisplay();
});

document.getElementById("expiry-year").addEventListener("change", function () {
  updateExpiryDateDisplay();
});

function updateExpiryDateDisplay() {
  const month = document.getElementById("expiry-month").value.padStart(2, "0");
  const year = document.getElementById("expiry-year").value;
  document.getElementById(
    "expiry-date-display"
  ).textContent = `${month}/${year}`;
}

document
  .getElementById("credit-card-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cardholderName = document.getElementById("cardholder-name").value;
    const cardNumber = Array.from(cardNumberInputs)
      .map((input) => input.value)
      .join(" ");
    const expiryMonth = document.getElementById("expiry-month").value;
    const expiryYear = document.getElementById("expiry-year").value;
    const cvv = document.getElementById("cvv").value;

    if (
      validateForm(cardholderName, cardNumber, expiryMonth, expiryYear, cvv)
    ) {
      alert("Payment successful!");
      alert("Done");
    }
  });

function validateForm(
  cardholderName,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvv
) {
  const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
  const cvvRegex = /^\d{3}$/;

  if (!cardholderName) {
    alert("Cardholder name is required");
    return false;
  }

  if (!cardNumberRegex.test(cardNumber)) {
    alert("Invalid card number");
    return false;
  }

  if (!expiryMonth || !expiryYear) {
    alert("Invalid expiry date");
    return false;
  }

  if (!cvvRegex.test(cvv)) {
    alert("Invalid CVV");
    return false;
  }

  return true;
}

// Dynamically populate the months and years
window.onload = function () {
  const expiryMonth = document.getElementById("expiry-month");
  const expiryYear = document.getElementById("expiry-year");

  // Populate months
  for (let i = 1; i <= 12; i++) {
    let month = i.toString().padStart(2, "0");
    let option = document.createElement("option");
    option.value = month;
    option.text = month;
    expiryMonth.appendChild(option);
  }

  // Populate years
  const currentYear = new Date().getFullYear();
  for (let i = 0; i <= 10; i++) {
    let year = (currentYear + i).toString().slice(2);
    let option = document.createElement("option");
    option.value = year;
    option.text = year;
    expiryYear.appendChild(option);
  }
};
