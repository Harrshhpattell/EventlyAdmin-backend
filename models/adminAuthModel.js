const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us Your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
  },
  masterAdmin: {
    type: String,
    enum: ['active', 'notactive'],
    default: 'notactive',
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});


adminAuthSchema.pre("save", async function (next) {
  // only run this function if pass was actually modified
  if (!this.isModified("password")) return next();

  // hash the pass with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordconfirm field
  this.passwordConfirm = undefined;
  next();
});

const AdminAuth = mongoose.model("AdminAuth", adminAuthSchema);

module.exports = AdminAuth;