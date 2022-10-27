//crypto package to encrypt data
const crypto = require("crypto");
//import jsonwebtoken to authenticate user
const jwt = require("jsonwebtoken");
//requiring inbuilt utilities
const { promisify } = require("util");
//importing user model
const User = require("../models/userModel");
const AppError = require("../utils/appError");


const signToken = (id) =>
  //console.log(id);
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  //console.log(newUser._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  // if (process.env.NODE_ENV === 'production') {
  //   cookieOptions.secure = true;
  // }
  // if (req.secure || req.headers['x-forwarded-proto']==='https') {
  //   cookieOptions.secure = true;
  // }
  res.cookie("jwt", token, cookieOptions);

  //Remove password from output
  user.password = undefined;

  //Sending new user to client
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
//creating export for controller

exports.login = async (req, res, next) => {
  try {
   
    const { email, password } = req.body;
 
    //1)check if the email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    //2)check if the user exists && password is correct
    const user = await User.findOne({ email }).select("+password"); //field:variable
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    //console.log(user);

    //3) If everything is ok, send JSONwebtoken to client

    createSendToken(user, 201, req, res);

    // const token = signToken(user._id);
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   secure: true,
    //   httpOnly: true,
    // };
    // res.cookie('jwt', token, cookieOptions);

    // if (process.env.NODE_ENV === 'production') {
    //   cookieOptions.secure = true;
    // }
    // res.status(200).json({
    //   status: 'success',
    //   token,
    // });
  } catch (err) {
    //return next(new AppError(`${err}`, 400));
    res.status(400).json({
      status: "fail",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    //1)getting token and checkif it exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    //console.log(token);
    if (!token) {
      return next(
        new AppError("You are not logged in! Please login to get access.", 401)
      );
    }

    //2)verification token

    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);

    //3)check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exist", 401)
      );
    }

    //Grant access to protected route
    req.user = currentUser;
    //console.log(req.user);
    res.locals.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError(`${err}`, 400));
 
  }
};

//only for rendered pages and there will be no error
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //1) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      //2)check if user still exists
      const currentUser = await User.findById(decoded.id);
      console.log(currentUser);
      res.locals.user = currentUser;
      if (!currentUser) {
        return next();
      }

      // //3)check if user change password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next(new AppError());
      // }
      //There is a logged in user

      //console.log(res.locals.user);
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};


exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

exports.signup = async (req, res, next) => {
  try {
    //creating new user, and new document using model
    //const newUser = await User.create(req.body); //pass an object with the data form which the user should be created.

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
  

    createSendToken(newUser, 201, req, res);
  } catch (err) {
    //console.log('Hi I am here', err);
    res.status(400).json({
      status: "fail",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
