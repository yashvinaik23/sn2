const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  Image: {
    type: Object,
    // required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  contact: {
    type: Number,
    // required: true,
    length: 10,
    trim: true,
  },
  position: { type: String, required: true },
  address: { type: String, trim: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// userSchema.virtual("tasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "owner",
// });

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;

//   return userObject;
// };

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log("aaaaaaaaa--->",password,user.password)
  if (!user) {
    return false;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return false;
  }

  return user;
};

userSchema.statics.changePassword = async (id, password, newPass) => {
  try {
    const user = await User.findById(id);
    //console.log("in cp", user);

    if (!user) {
      return false;
    }
    console.log("test-----",password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    if (isMatch) {
      return user;
    }
  } catch (e) {
    return false;
  }
};

userSchema.statics.findByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
