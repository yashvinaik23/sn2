const express = require("express");
const userRouter = require("./routers/user");
const resultRouter = require("./routers/results");
const holidayRouter = require("./routers/holiday");
const contactRouter = require("./routers/contact");
const path=require("path")
var cors = require("cors");

require("./Database/mongoose");


const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(resultRouter);
app.use(holidayRouter);
app.use(contactRouter);
app.use("/public", express.static(path.join(__dirname, "/routers/public")));
console.log("path",path.join(__dirname, "/routers/public"))

app.listen(port, () => {
  console.log("Server is up on port " + port);
});


const results = require("./models/results");
const User = require("./models/user");

const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "30 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
