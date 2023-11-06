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

function addActiveClassLink() {
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
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

// function editNav() {
//   const myTopnav = document.getElementById("myTopnav");
//   if (myTopnav.className === "topnav") {
//     myTopnav.className += " responsive";
//   } else {
//     myTopnav.className = "topnav";
//   }
// }

// display modal form
function launchModal() {
  modalbg.style.display = "block";
  form.reset();
}

// launch modal event
btnSignup.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event and reset form
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
  window.location.reload();
}

// close modal form
btnClose.addEventListener("click", closeModal);

// check validity of fields
function validateFields(inputId, errorMessage) {
  const input = document.getElementById(inputId);
  const regex = /^[a-zA-Z-éèïëëî]{2,}$/;
  const isValid = regex.test(input.value);

  // Closest() return the first parent element
  const parentFormData = input.closest(".formData");

  parentFormData.dataset.error = isValid ? "" : errorMessage;
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";

  // if one field is not valid, formValid = false
  formValid = isValid ? formValid : false;
}

function validateEmail() {
  const email = document.getElementById("email");
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const isValid = emailRegex.test(email.value) && email.value !== "";

  const parentFormData = email.closest(".formData");

  parentFormData.dataset.error = isValid ? "" : "Veuillez entrer une adresse email valide";
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";

  formValid = isValid ? formValid : false;
}

function dateOfTheDay() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validateBirthdate() {
  const birthdate = document.getElementById("birthdate");
  // limit birthdate to 1924-01-01
  const birthdateRegex = /^(19[2-9][4-9]|20[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  const isValid = birthdateRegex.test(birthdate.value) && birthdate.value !== "" && birthdate.value < dateOfTheDay()
  const parentFormData = birthdate.closest(".formData");

  parentFormData.dataset.error = isValid ? "" : "Veuillez entrer une date de naissance";
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";

  formValid = isValid ? formValid : false;
}

function validateQuantity() {
  const quantity = document.getElementById("quantity");
  const isValid = quantity.value > 0 && quantity.value !== "";

  const parentFormData = quantity.closest(".formData");

  parentFormData.dataset.error = isValid ? "" : "Veuillez entrer un nombre valide";
  parentFormData.dataset.errorVisible = isValid ? "false" : "true";

  formValid = isValid ? formValid : false;
}

function validateLocation() {
  const location = document.querySelector(".location");
  const locationArray = form.elements.location;

  // some() return true if at least one radio is checked
  const locationChecked = [...locationArray].some(radio => radio.checked);

  location.dataset.error = locationChecked ? "" : "Veuillez choisir une ville";
  location.dataset.errorVisible = locationChecked ? "false" : "true";

  formValid = locationChecked ? formValid : false;
}

function validatConditions() {
  const conditionsDiv = document.querySelector(".conditions");
  const conditions = document.getElementById("checkbox1");
  const conditionsChecked = conditions.checked;

  conditionsDiv.dataset.error = conditionsChecked ? "" : "Veuillez accepter les conditions d'utilisation";
  conditionsDiv.dataset.errorVisible = conditionsChecked ? "false" : "true";

  formValid = conditionsChecked ? formValid : false;
}

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
  btn.addEventListener("click", closeModal)
  btn.textContent = "Fermer";
  modalBody.appendChild(btn);
}

// send form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValid = true;

  validateFields("first", "Le prénom doit contenir au moins 2 caractères");
  validateFields("last", "Le nom doit contenir au moins 2 caractères")
  validateEmail()
  validateBirthdate()
  validateQuantity()
  validateLocation();
  validatConditions()

  // if all fields are valid, display congrats message
  formValid ? congrats() : null;
});