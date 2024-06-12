require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", require("./src/routes/authRoute"));
app.use("/api/users", require("./src/routes/userRoute"));
app.use("/api/questions", require("./src/routes/questionRoute"));
app.use("/api/ratings", require("./src/routes/ratingRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
