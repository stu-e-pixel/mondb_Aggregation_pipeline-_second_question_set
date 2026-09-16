const express = require('express');
const router = express.Router();
const OrderItemController = require('../../controller/Apis/OrderItemController')

router.post("/createorderitem",OrderItemController.createOrderItem)
router.get("/getorderItemById/:orderId",OrderItemController.getItemsByOrderId);
router.get("/getItemByOrderId/:id",OrderItemController.getOrderItemById);
router.put("/updateOrderItem/:id",OrderItemController.updateOrderItem);
router.get("/getAllOrderItem",OrderItemController.getAllOrderItem)
router.get("/getOrderItemStats",OrderItemController.orderItemStats)




module.exports=router