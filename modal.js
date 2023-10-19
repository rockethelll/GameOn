// DOM Elements
const modalbg = document.querySelector(".bground");
const btnSignup = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const btnClose = document.querySelector(".close");

// Hide navbar on mobile and display burger menu dropdown
function editNav() {
  const myTopnav = document.getElementById("myTopnav");
  if (myTopnav.className === "topnav") {
    myTopnav.className += " responsive";
  } else {
    myTopnav.className = "topnav";
  }
}

// close modal event
function closeModal() {
  modalbg.style.display = "none";
}


// launch modal event
btnSignup.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
btnClose.addEventListener("click", closeModal);


