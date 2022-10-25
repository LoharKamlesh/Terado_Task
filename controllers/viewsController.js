//const Tour = require("../models/tourModel");
//const User = require("../models/userModel");
//const AppError = require("../utils/appError");
//const Booking = require("../models/bookingModel");
// const campaignBtn = document.getElementById("Campaign");
exports.getOverview = async (req, res, next) => {
  try {
    //1) Get tour data from collection
    res.status(200).render("overview", {
      title: "Overview",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

  //2) Build template

  //3) render that template using tour data from 1)
};

exports.getnewOverview = async (req, res, next) => {
  try {
    //1) Get tour data from collection
    // const today = new Date();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // //console.log(time);
    // res.locals.time = time;
    res.status(200).render("newoverview", {
      title: "Overview",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

  //2) Build template

  //3) render that template using tour data from 1)
};

exports.getnewOverviewLogout = async (req, res, next) => {
  try {
    //1) Get tour data from collection
    res.status(200).render("newOverviewLogout", {
      title: "Overview",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCampaign = async (req, res, next) => {
  try {
    res.status(200).render("campaign", {
      title: "Campaign",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getContent = async (req, res, next) => {
  try {
    res.status(200).render("content", {
      title: "Content",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getStatistics = async (req, res, next) => {
  try {
    res.status(200).render("statistics", {
      title: "Statistics",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDevices = async (req, res, next) => {
  try {
    res.status(200).render("devices", {
      title: "Devices",
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.alerts = (req, res, next) => {
//   const alert = req.query.alert;
//   if (alert === "booking") {
//     res.locals.alert =
//       "Your booking was successfull! Please check your email for confirmation. If your booking doesn't show up here immediately please come back here later.";
//   }

//   next();
// };
// exports.getMyTours = async (req, res, next) => {
//   //1)Find all bookings
//   const bookings = await Booking.find({
//     user: req.user.id,
//   });

//   //2) find tours with returned ID's from above
//   const tourIDs = bookings.map((el) => el.tour);
//   const tours = await Tour.find({ _id: { $in: tourIDs } });

//   res.status(200).render("overview", {
//     title: "My Tours",
//     tours,
//   });
// };
exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Sign up to create your new account",
  });
};

// exports.getReviewForm = (req, res) => {
//   res.status(200).render("review", {
//     title: "Please Enter Rating and Review",
//   });
// };
// exports.getReviewForm = (req, res) => {
//   res.status(200).render('review', {
//     title: 'Please Enter Rating and Review',
//   });
// };

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

// // exports.getAccount = (req, res) => {
// //   res.status(200).render("account", {
// //     title: "Your Account",
// //   });
// // };

// exports.updateUserData = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         name: req.body.name,
//         email: req.body.email,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).render("account", {
//       title: "Your Account",
//       user: updatedUser,
//     });
//   } catch (err) {
//     //console.log(err);
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
