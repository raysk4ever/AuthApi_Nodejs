const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/user")
  .then(() => console.log("connected to mongodb.."))
  .catch(err => console.error("could not connect to mongodb"));

const users = require("./routes/users");
const auth = require("./routes/auth");
const movie = require("./routes/movie");

app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/movie", movie);

app.listen(3000, () => {
  console.log(`listing port number 3000...`);
});
