const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const express = require("express");

process.on("unhandledException", (err) => {
  console.log("UNHANDLER Exception💥  Shutting down...");
  process.exit(1);
});
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION💥  Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("🔄SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("✅Process terminated!");
  });
});
