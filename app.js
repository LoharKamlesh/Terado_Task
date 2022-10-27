const path = require("path");
const express = require("express");
// const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// const hpp = require("hpp");
const cookieParser = require("cookie-parser");
// const compression = require("compression");
// const cors = require("cors");
const helmet = require("helmet");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
// const bodyParser = require("body-parser");

const viewRouter = require("./routes/viewRoutes");

const app = express();

//app.enable("trust proxy");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//SET SECURITY HTTP HEADERS
//app.use(helmet());

const scriptSrcUrls = [
  // "https://unpkg.com/",
  "https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.js",
];
const styleSrcUrls = ["https://fonts.googleapis.com/"];
const connectSrcUrls = ["https://unpkg.com"];
const fontSrcUrls = ["fonts.googleapis.com", "fonts.gstatic.com"];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:", "https:"],
      fontSrc: ["'self'", ...fontSrcUrls],
  
    },
  })
);

//dveleopment logging
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" })); //middle-ware
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", viewRouter);


app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
