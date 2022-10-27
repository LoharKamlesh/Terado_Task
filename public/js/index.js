/*eslint-disable*/

import "@babel/polyfill";
import { login, logout } from "./login";
import { signup } from "./signup";

const signupForm = document.querySelector(".form--signup");
const logInForm = document.querySelector(".form--login");
const logOutTime = document.querySelector(".logout__data");
const logInTime = document.querySelector(".login__data");

const logOutBtn = document.querySelector(".nav__el--logout");

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
  logOutBtn.addEventListener("click", logout);
}

if (logOutTime) {
  logOutTime.textContent = `Logged Out Time: 
    ${new Date().toLocaleTimeString()}`;
}

if (logInTime) {
  logInTime.textContent = `Logged In Time: 
    ${new Date().toLocaleTimeString()}`;
}

document.querySelector("#files").addEventListener("change", (e) => {
  const files = e.target.files;
  const output = document.querySelector("#result");
  for (let i = 0; i < files.length; i++) {
    if (!files) {
      alert("Please upload correct file");
    }
    const fileReader = new FileReader();
    // console.log(fileReader);
    fileReader.addEventListener("load", function (e) {
      const picFile = e.target;
      const div = document.createElement("div");
      div.innerHTML = `<img class='thumbnail' src='${picFile.result}' title='${picFile.name}' /> `;
      output.appendChild(div);
    });
    fileReader.readAsDataURL(files[i]);
  }
});
