const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PaymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Cash", "NetBanking"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const PaymentModel = mongoose.model('payment',PaymentSchema)
module.exports = PaymentModel