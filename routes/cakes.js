const express = require("express");
const {CakeModel, validateCake} = require("../models/cakeModel");
const bcrypt = require("bcrypt")
const {authToken} = require("../auth/authToken")
const router = express.Router();

router.get("/" , async(req,res)=> {

  let perPage = Math.min(req.query.perPage,10) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "price";
  try{
    let data = await CakeModel
    .find({})
    .limit(perPage)
    .skip((page - 1)*perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

router.post("/", authToken, async(req,res) => {

  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let cake = new CakeModel(req.body);
    cake.user_id = req.tokenData._id
    await cake.save();
    res.status(201).json(cake);
  }
  catch(err){
    if(err.code == 11000) {
      return res.status(400).json({err:"Email already in system 😐", code:11000})
    }
    console.log(err)
    res.status(500).json({err:"err", err})
  }
})


router.delete("/:idDel", authToken,async(req,res) => {
  try{
    let idDel = req.params.idDel
    let data = await CakeModel.deleteOne({_id:idDel, user_id:req.tokenData._id});
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

router.put("/:idEdit", authToken ,async(req,res) => {
  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idEdit = req.params.idEdit
    let data = await CakeModel.updateOne({_id:idEdit,user_id:req.tokenData._id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})


module.exports = router;