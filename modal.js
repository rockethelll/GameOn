// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector('.modal-body');
const btnSignup = document.querySelectorAll(".btn-signup");
const btnClose = document.querySelector(".close");
const form = document.querySelector("form");
const navbar = document.querySelector(".main-navbar");
const links = navbar.querySelectorAll(".main-navbar a:not(.icon)");
const menuBurger = document.querySelector(".icon");
const navLinks = document.querySelector(".nav-links");
let formValid = true;

// Add class active to all links on navbar
function addActiveClassLink() {
  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach(function (link) {
        link.classList.remove("active");
      });
      link.classList.add("active");
    });
  });
}

addActiveClassLink();

// Hide navbar on mobile and display burger menu dropdown
menuBurger.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-menu");
  navLinks.classList.toggle("hide-menu");
  menuBurger.classList.toggle("mobile-menu");
});

// display modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Launch modal event
btnSignup.forEach((btn) => btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  launchModal();
}));

// Close modal 
function closeModal() {
  modalbg.style.display = "none";
}

// Close modal and reload form when submit
function closeModalOnSubmit() {
  modalbg.style.display = "none";
  window.location.reload();
}

// Close modal form
btnClose.addEventListener("click", closeModal);

// Function to update formValid in order to display congrats message
function updateFormValid(isValid) {
  formValid = isValid ? formValid : false;
}

function displayErrorMessage(isValid,element, errorMessage) {
  element.dataset.error = isValid ? "" : errorMessage;
  element.dataset.errorVisible = isValid ? "false" : "true";
}

// Check validity of fields (used for name and lastname)
function validateFields(inputId, errorMessage) {
  const input = document.getElementById(inputId);
  const regex = /^[a-zA-Z-éèïëëî ]{2,}$/;
  const isValid = regex.test(input.value);

  // Closest() return the first parent element
  const parentFormData = input.closest(".formData");

  displayErrorMessage(isValid, parentFormData, errorMessage)

  // If one field is not valid, formValid = false
  updateFormValid(isValid);
}

function validateFirstname() {
  validateFields("first", "Le prénom doit contenir au moins 2 caractères")
}

function validateLastname() {
  validateFields("last", "Le nom doit contenir au moins 2 caractères")
}

// Check if email is valid, if not display an error message
function validateEmail() {
  const email = document.getElementById("email");
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const isValid = emailRegex.test(email.value) && email.value !== "";

  const parentFormData = email.closest(".formData");

  displayErrorMessage(isValid, parentFormData, "Veuillez entrer une adresse email valide")

  updateFormValid(isValid);
}

// Get the date of the day, return on format YYYY-MM-DD
function dateOfTheDay() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if birthdate is valid, if not display an error message
function validateBirthdate() {
  const birthdate = document.getElementById("birthdate");
  
  // limit birthdate to 1924-01-01
  const birthdateRegex = /^(19[2-9][4-9]|20[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  
  // Check if date is YYYY-02-30, 30 february not exist
  const invalidBirthdateRegex = /^(19[2-9][4-9]|20[0-9]{2})-(02)-(30)$/;
  const isEmpty = ""
  const isValidFormat = birthdateRegex.test(birthdate.value) && !invalidBirthdateRegex.test(birthdate.value);
  const isNotPastDate = birthdate.value < dateOfTheDay();
  
  const isValid = !isEmpty && isValidFormat && isNotPastDate;
  
  const parentFormData = birthdate.closest(".formData");

  displayErrorMessage(isValid, parentFormData, "Veuillez entrer une date de naissance")
  
  updateFormValid(isValid);
}

// Check if number of turnaments field is not empty, if empty display an error message
function validateTurnamentsQuantity() {
  const quantity = document.getElementById("quantity");
  const isValid = quantity.value >= 0 && quantity.value !== "";

  const parentFormData = quantity.closest(".formData");

  displayErrorMessage(isValid, parentFormData, "Veuillez entrer un nombre valide")

  updateFormValid(isValid);
}

// Check if location is checked, if not display an error message
function validateLocation() {
  const location = document.querySelector(".location");
  const locationArray = form.elements.location;

  // some() return true if at least one radio is checked
  const isValid = [...locationArray].some(radio => radio.checked);
  
  displayErrorMessage(isValid, location, "Veuillez choisir une ville")

  updateFormValid(isValid);
}

// Check if Generals Conditions is checked, if not display an error message
function validateConditions() {
  const conditionsDiv = document.querySelector(".conditions");
  const conditions = document.getElementById("checkbox1");
  const isValid = conditions.checked;

  displayErrorMessage(isValid, conditionsDiv, "Veuillez accepter les conditions d'utilisation")

  updateFormValid(isValid);
}

// Display a congrats message (display when form is submit)
function congrats() {
  modalBody.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("modal-content");
  const divText = document.createElement("div");
  modalBody.appendChild(div);
  divText.textContent = "Merci pour votre inscription";
  divText.classList.add("modal-text");
  div.appendChild(divText);
  const btn = document.createElement("button");
  btn.classList.add("btn-submit");
  btn.addEventListener("click", closeModalOnSubmit);
  btn.textContent = "Fermer";
  modalBody.appendChild(btn);
}

// send form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValid = true;

  validateFirstname();
  validateLastname();
  validateEmail();
  validateBirthdate();
  validateTurnamentsQuantity();
  validateLocation();
  validateConditions();

  // if all fields are valid, display congrats message
  formValid ? congrats() : null;
});