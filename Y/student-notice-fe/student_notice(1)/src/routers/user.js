const User = require("../models/user");
const auth = require("../middleware/auth");
require("../Database/mongoose");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = new express.Router();
// const upload = require("../middleware/upload");
const req = require("express/lib/request");
const url = "http://localhost:8000";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("dirname",__dirname)
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
  console.log(req.body);
  try {
    const user = new User(req.body);

    await user.save();

    const token = await user.generateAuthToken();

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

// router.patch('/imageupload/:id',upload.single("Image"),async(req,res)=>{

// })

// router.patch("/imageupload/:id", upload.single("Image"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     // req.body.Image = req.file.path;
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.patch("/updateuser/:id", upload.single("Image"), async (req, res) => {
  console.log(req.body, req.file);
  const id = req.params.id;

  try {
    let filePath = req.file.path.split("/")
    const user = await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      // ...req.body,
      Image: filePath[filePath.length - 1],
    });

    if (user) {
      res.send(user);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
// try {
//   const updates = Object.keys(req.body);

//   const allowedUpdates = ["name", "email", "password", "contact", "address"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   console.log("1");

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//     console.log("2");
//   }
//   console.log("3");
//   const user = await User.findById(req.params.id);

//   updates.forEach((update) => {

//     // console.log(user)
//     user[update] = req.body[update];
//     console.log(user[update])
//   });
//   console.log(req.file.path);
//   user[Image] = req.file.path;
//   console.log("5");
//   console.log("IMAGE1 ");

//   console.log("IMAGE 3");
//   await user.save();

//   res.status(200).send(user);
//   console.log("IMAGE 4");
// } catch (e) {
//   res.status(400).send(e);
// }

// router.patch('/updateuser/:id', async (req, res) => {
//   console.log(req.body)

//   try {
//     const updates = Object.keys(req.body)

//     const allowedUpdates = ['name', 'email', 'password', 'contact','address']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//       updates.forEach((update) => req.user[update] = req.body[update])
//       console.log(updates);
//       console.log("IMAGE1 ");

//       if (!isValidOperation) {
//           return res.status(400).send({ error: 'Invalid updates!' })
//       }
//       console.log("IMAGE 3")
//       await req.user.save()
//       res.status(200).send(req.user)
//       console.log("IMAGE 4")
//   } catch (e) {
//       res.status(400).send(e)
//   }
// })

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
  console.log(req, "1");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) return res.status(204).send({ message: "In valid user" });
    const token = await user.generateAuthToken();
    console.log(req.body, "2");
    return res.status(200).send({ user, token });
    console.log(req.body, "3");
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

module.exports = router;
