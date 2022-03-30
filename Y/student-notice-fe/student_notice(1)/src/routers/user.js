const User = require("../models/user");
const auth = require("../middleware/auth");
require("../Database/mongoose");
const express = require("express");
const router = new express.Router();

router.post("/reg", async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'contact','address']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }
})

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
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) return res.status(204).send({ message: "Wrong" });
    const token = await user.generateAuthToken();
    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(400).send({ error: "Authentication Fail" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
