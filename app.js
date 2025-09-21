const express = require("express");
const cors = require("cors");

const contactRoutes = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

//handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Contact Book application" });
});

module.exports = app;
