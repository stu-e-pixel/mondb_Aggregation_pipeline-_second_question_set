const express = require('express');
const router = express.Router();
const AuthController= require('../../controller/Apis/AuthController')


router.post("/createuser",AuthController.createUser);
router.get("/getAllUser",AuthController.getAllUser)
router.get("/getUserStats",AuthController.getUserState)

module.exports=router