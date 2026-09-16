const Payment = require("../../model/payment");

const paymentController = {
  async createPayment (req, res)  {
    try {
      const {
        orderId,
        paymentMethod,
        amount,
      } = req.body;

      const payment = await Payment.create({
        orderId,
        paymentMethod,
        amount,
        status: "pending",
      });

      res.status(201).json({
        status: true,
        message: "Payment created successfully",
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  
  async getAllPayments (req, res) {
    try {
      const payments = await Payment.find()
        .populate("orderId")
        .sort({ createdAt: -1 });

      res.status(200).json({
        status: true,
        data: payments,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  
  async getPaymentById (req, res)  {
    try {
      const { id } = req.params;

      const payment = await Payment.findById(id)
        .populate("orderId");

      if (!payment) {
        return res.status(404).json({
          status: false,
          message: "Payment not found",
        });
      }

      res.status(200).json({
        status: true,
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  
  async getPaymentByOrderId (req, res)  {
    try {
      const { orderId } = req.params;

      const payment = await Payment.findOne({
        orderId,
      }).populate("orderId");

      if (!payment) {
        return res.status(404).json({
          status: false,
          message: "Payment not found for this order",
        });
      }

      res.status(200).json({
        status: true,
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  
   async updatePaymentStatus (req, res)  {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updateData = {
        status,
      };

      
      if (status === "paid") {
        updateData.paidAt = new Date();
      }

      const payment = await Payment.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!payment) {
        return res.status(404).json({
          status: false,
          message: "Payment not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "Payment status updated successfully",
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
  deletePayment: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findByIdAndDelete(id);

      if (!payment) {
        return res.status(404).json({
          status: false,
          message: "Payment not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "Payment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};

module.exports = paymentController;