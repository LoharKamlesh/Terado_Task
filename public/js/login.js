/*eslint-disable*/
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    //console.log(email, password);

    const result = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/users/login",
      data: {
        email: email,
        password: password,
        // time: new Date().toISOString(),
      },
    });
    if (result.data.status === "success") {
      showAlert("success", "logged in successfully");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert("error", err.response.data.message);
  }
};

export const logout = async (req, res) => {
  try {
    const result = await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/v1/users/logout",
      // data: {
      //   time: new Date().toISOString(),
      // },
    });
    //console.log(result);
    if (result.data.status === "success") {
      //location.reload(true);
      window.setTimeout(() => {
        location.assign("/loggedOut");
      }, 1500);
      // if (windows.location.href === "http://127.0.0.1:8000/loggedOut") {
      //   document.querySelector(".logout__data").textContent =
      //     new Date().toISOString();
      // }
    }
  } catch (err) {
    showAlert("error", "Error Logging out! Try Again");
  }
};
