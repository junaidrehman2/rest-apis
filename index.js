const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// app.use(cors);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3100;
app.use("/api/post", postRoutes);
app.get("/", (req, res) => {
  res.send("welcome..d.");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
