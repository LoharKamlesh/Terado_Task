const express = require("express");
//const multer = require('multer'); //middleware to upload photos in form
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//const upload = multer({ dest: 'public/img/users' });

const router = express.Router();
//router.get("/users", authController.protect, userController.getAllUsers);
//router.use(authController.isLoggedIn);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//router.use(authController.protect);

router.route("/").post(userController.createUser);

module.exports = router;
