const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/Apis/ProductController')

router.post("/createproduct",ProductController.createProduct)
router.get("/getAllproduct",ProductController.getAllProduct)
router.get("/productStats",ProductController.ProductStats)


module.exports=router