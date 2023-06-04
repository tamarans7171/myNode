const mongoose = require("mongoose");
const Joi = require("joi");

const cakeSchema = new mongoose.Schema({
  name: String,
  cals: String,
  price: Number,
  user_id: String
})


exports.CakeModel = mongoose.model("cakes", cakeSchema);


exports.validateCake = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    cals: Joi.string().min(5).max(30).required(),
    price: Joi.number().min(0.1).max(9999).required(),
    user_id: Joi.string().min(5).max(999).required()
  })

  return joiSchema.validate(_reqBody);
}


