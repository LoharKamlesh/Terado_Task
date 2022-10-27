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
};

exports.getnewOverview = async (req, res, next) => {
  try {
    //1) Get tour data from collection

    res.status(200).render("dashboard", {
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

exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Sign up to create your new account",
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};
