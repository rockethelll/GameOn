// DOM Elements
const modalbg = document.querySelector(".bground");
const btnSignup = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const btnClose = document.querySelector(".close");
const form = document.querySelector("form");

// Hide navbar on mobile and display burger menu dropdown
function editNav() {
  const myTopnav = document.getElementById("myTopnav");
  if (myTopnav.className === "topnav") {
    myTopnav.className += " responsive";
  } else {
    myTopnav.className = "topnav";
  }
}

// display modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
btnSignup.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
function closeModal() {
  modalbg.style.display = "none";
}

// close modal form
btnClose.addEventListener("click", closeModal);

// check validity of fields
function validateFields(inputId, minLength, errorMessage) {
  const input = document.getElementById(inputId);
  const isValid = input.value.length >= minLength;

  const parentFormData = input.closest(".formData");
  parentFormData.dataset.error = isValid ? "" : errorMessage;
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";
}

function validateEmail() {
  const email = document.getElementById("email");

  const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const parentFormData = email.closest(".formData");
  const isValid = emailRegex.test(email.value) && email.value !== "";

  parentFormData.dataset.error = isValid ? "" : "Veuillez entrer une adresse email valide";
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";
}

// send form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateFields("first", 2, "Le prénom doit contenir au moins 2 caractères");
  validateFields("last", 2, "Le nom doit contenir au moins 2 caractères")
  validateEmail()
  validateFields("birthdate", 1, "Veuillez entrer une date de naissance")
  validateFields("quantity", 1, "Veuillez entrer un nombre valide")
});



