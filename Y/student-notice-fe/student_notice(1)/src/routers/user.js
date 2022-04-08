const User = require("../models/user");
const auth = require("../middleware/auth");
require("../Database/mongoose");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const router = new express.Router();
// const upload = require("../middleware/upload");
const req = require("express/lib/request");
const url = "http://localhost:8000";
const sendEmail = require("../utills/sendEmail");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file formate"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
  limits: 100000000,
});

router.post("/reg", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();

    sendEmail(
      req.body.email,
      "To notify you for the signing up",
      `<div>Thank you <b>${req.body.name}</b> for contacting the smith school.</div> <div>You can contact us when ever you want.</div><div>contact N0 : 9988776655</div><div>Email : smithschooluk@gmail.com</div>`
    );

    res.status(201).send({ user, token });
    //res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/updateuser/:id", upload.single("Image"), async (req, res) => {
  const id = req.params.id;
console.log("body-----------------",req.body)
console.log("file-----------------",req.file)

  try {
    let filePath = req.file.path.split("/");
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        // password: req.body.password,
        contact: req.body.contact,
        address: req.body.address,
        Image: filePath[filePath.length - 1],
      },
      { new: true }
    );
    if (user) {
      res.send(user);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/changepassword/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.changePassword(
      id,
      req.body.password,
      req.body.newPassword
    );
    if (!user) return res.status(204).send({ message: "In valid user" });
    console.log("Here------",user.password)
    console.log("req pass",req.body.newPassword)
    const password = await bcrypt.hash(req.body.newPassword, 8);
    console.log("behind-------------",password);
    const user2 = await User.findByIdAndUpdate(id, { password }, { new: true });
    console.log("user2--------------", user2);
    return res.status(200).send(user2);
  } catch (e) {
    return res.status(400).send({ error: "Authentication Fail" });
  }
});

router.get("/getbyid/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user._id);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) return res.status(204).send({ message: "In valid user" });
    const token = await user.generateAuthToken();
    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(400).send({ error: "Authentication Fail" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
