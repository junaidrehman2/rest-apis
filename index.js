const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passportJWT = require("./middleware/passportJWT")();
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const followRoutes = require("./routes/following");

const app = express();

// app.use(cors);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

const port = process.env.PORT || 3100;
app.use("/api/post", passportJWT.authenticate(), postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follow", passportJWT.authenticate(), followRoutes);
app.get("/", (req, res) => {
  res.send("welcome..d.");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
