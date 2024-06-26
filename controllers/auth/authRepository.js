const AdminAuth = require("./../../models/adminAuthModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signupUser = async (data) => {
  const newUser = await AdminAuth.create({
    name: data.name,
    email: data.email,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
  });

  const token = signToken(newUser._id);

  const result = { token, newUser };
  return result;
};


exports.loginUser = async (data) => {
  const { email, password } = data;
  const Adminauth = await AdminAuth.findOne({ email });

  if (!Adminauth) {
    const statusCode = 401;
    const success = false;
    const result = { message: "Invalid email" };
    return { result, success, statusCode };
  }

    // Check admin status
    if (Adminauth.status === "blocked") {
      const statusCode = 401;
      const success = false;
      const result = { message: "Your Evently Admin account is temporarily blocked" };
      return { result, success, statusCode };
    }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, Adminauth.password);

  if (!isPasswordValid) {
    const statusCode = 401;
    const success = false;
    const result = { message: "Invalid password" };
    return { result, success, statusCode };
  }

  // Password is valid, generate token
  const token = signToken(Adminauth._id);
  result = { message: "AdminAuth verified successfully", token, Adminauth };
  success = true;
  statusCode = 200;

  return { result, success, statusCode };
};

exports.protectUserRepo = async (decoded) => {
  const freshUser = await AdminAuth.findById(decoded.id);
  if (!freshUser) {
    return "The AdminAuth Belonging to this token does no longer exist.";
  }
  return;
};