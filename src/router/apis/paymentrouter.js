const express = require("express");
const router = express.Router();

const paymentController = require("../../controller/Apis/PaymentController");

router.post("/createpayment", paymentController.createPayment);

router.get("/getAllPayment", paymentController.getAllPayments);

router.get("/getpayment/order/:orderId", paymentController.getPaymentByOrderId);

router.get("/getPaymentById/:id", paymentController.getPaymentById);

router.patch("/updatePayment/:id/status", paymentController.updatePaymentStatus);

router.delete("/deletePayment/:id", paymentController.deletePayment);

module.exports = router;