const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const {config} = require("../config/secret")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
})


exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_userId) => {
  let token = jwt.sign({_id:_userId}, config.tokenSecret, {expiresIn:"60mins"})
  return token
}

exports.validateUser = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(5).max(10).required(),
    password: Joi.string().min(5).max(30).required()
  })

  return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required()
  })

  return joiSchema.validate(_reqBody);
}

