const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
// const rateLimit = require("express-rate-limit");
const passportJWT = require("./middleware/passportJWT")();
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const followRoutes = require("./routes/following");
const config = require("./config");

const app = express();

app.use(cors());

// app.enable("trust proxy");
// const limiter = rateLimit({
//   windowMs: 10 * 1000, // 10 seconds
//   max: 5 // limit each IP to 5 requests per windowMs
// });
//  apply to all requests
// app.use(limiter);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
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
