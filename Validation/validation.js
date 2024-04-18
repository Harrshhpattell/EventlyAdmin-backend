const Joi = require("joi");

const userSignupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Password Confirmation")
      .messages({ "any.only": "Passwords do not match" }),
  });
  const { error, value } = schema.validate(data);
  if (error) {
    return { message: "Invalid Details..", error };
  }
};

const userLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error, value } = schema.validate(data);
  if (error) {
    return { message: "Invalid login details", error };
  }
};

module.exports = {
  userSignupValidation,
  userLoginValidation,
};