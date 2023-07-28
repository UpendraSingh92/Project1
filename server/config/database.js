const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected sucesfully"))
    .catch((err) => {
      console.log("error in connect DB ", err);
      process.exit(1);
    });
};
