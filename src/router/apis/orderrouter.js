const express = require('express');
const router = express.Router();
const OrderController = require('../../controller/Apis/OrderController')

router.post("/createorder",OrderController.createorder);
router.get("/getAllOrder",OrderController.getAllOrder);
router.get("/getOrderById/:id",OrderController.getAllOrder);
router.put("/updateorder/:id",OrderController.updateOrder);
router.get("/getOrderStats",OrderController.getOrderStats)



module.exports=router