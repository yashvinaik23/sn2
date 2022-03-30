const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://yashvi23:23122000@cluster0.nh3xe.mongodb.net/student-notice-api",
  {
    useNewUrlParser: true,
    //useCreateIndex: true,
  }
);
