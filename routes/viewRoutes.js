const express = require("express");

const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

//router.use(authController.isLoggedIn);

// router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/", viewsController.getLoginForm);
router.get(
  "/overview",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get(
  "/dashboard",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getnewOverview
);
router.get(
  "/campaign",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getCampaign
);

router.get(
  "/content",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getContent
);

router.get(
  "/devices",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getDevices
);

router.get(
  "/statistics",
  authController.protect,
  authController.isLoggedIn,
  viewsController.getStatistics
);
router.get("/loggedOut", viewsController.getnewOverviewLogout);

router.get("/login", viewsController.getLoginForm);
router.get("/signup", viewsController.getSignupForm);

module.exports = router;
