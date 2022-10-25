/*eslint-disable*/

import "@babel/polyfill";
//import 'core-js/stable';
//import 'regenerator-runtime/runtime';
//import { displayMap } from './leaflet';
import { login, logout } from "./login";
import { signup } from "./signup";

//import { campaign } from "./campaign";
//import { review } from './review';
//import { updateSettings } from './updateSettings';
//import { bookTour } from './stripe';
//import { showAlert } from "./alerts";

//const mapBox = document.getElementById('map');
const signupForm = document.querySelector(".form--signup");
//const reviewBtn = document.querySelector('.form--review');
const logInForm = document.querySelector(".form--login");
const logOutTime = document.querySelector(".logout__data");
const logInTime = document.querySelector(".login__data");

const logOutBtn = document.querySelector(".nav__el--logout");

// const userDataForm = document.querySelector(".form-user-data");
// const userPasswordForm = document.querySelector(".form-user-password");
//const bookBtn = document.getElementById('Book-tour');

//const reviewBtn = document.getElementById('Review-tour');

// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    console.log("submitted");

    signup(name, email, password, passwordConfirm);
    //signup();
  });
}

if (logInForm) {
  logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutBtn) {
  // logOutBtn.textContent = new Date().toISOString;
  logOutBtn.addEventListener("click", logout);
}

if (logOutTime) {
  logOutTime.textContent = `Logged Out Time: 
    ${new Date().toLocaleTimeString()}`;
  // logOutBtn.addEventListener("click", logout);
}

if (logInTime) {
  // logInTime.textContent = `Logged In Time:
  //   ${new Date().toLocaleTimeString()}`;
  logInTime.textContent = `Logged In Time: 
    ${new Date().toLocaleTimeString()}`;
}

// if (campaignBtn) {
//   campaignBtn.addEventListener("click", campaign);
// }

// if (userDataForm) {
//   userDataForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", document.getElementById("name").value);
//     form.append("email", document.getElementById("email").value);
//     form.append("photo", document.getElementById("photo").files[0]);

//     //console.log(form);

//     // const name = document.getElementById('name').value;
//     // const email = document.getElementById('email').value;
//     updateSettings(form, "data");
//   });
// }

// if (userPasswordForm) {
//   userPasswordForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     //document.getElementById('.btn--save-password').textContent = 'Updating...';
//     const passwordCurrent = document.getElementById("password-current").value;
//     const password = document.getElementById("password").value;
//     const passwordConfirm = document.getElementById("password-confirm").value;

//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       "password"
//     );
//     // document.getElementById('.btn--save-password').textContent =
//     //   'SAVE PASSWORD';
//     document.getElementById("password-current").value = "";
//     document.getElementById("password").value = "";
//     document.getElementById("password-confirm").value = "";
//   });
// }

// if (bookBtn) {
//   bookBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     e.target.textContent = "Processing...";
//     const tourId = e.target.dataset.tourId;
//     bookTour(tourId);
//   });
// }
// if (reviewBtn) {
//   reviewBtn.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const tourId = window.location.pathname.split("/")[2];
//     const rating = document.getElementById("rating").value;
//     const newReview = document.getElementById("review").value;
//     //await review(tourId, rating, newReview);
//     review(tourId, rating, newReview);
//   });
// }

// const alertMessage = document.querySelector("body").dataset.alert;
// if (alertMessage) {
//   showAlert("success", alertMessage, 20);
// }
// const dashBoardBtn = document.getElementById("DashBoard");
// dashBoardBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   window.setTimeout(() => {
//     location.assign("/newoverview");
//   }, 0);
// });
