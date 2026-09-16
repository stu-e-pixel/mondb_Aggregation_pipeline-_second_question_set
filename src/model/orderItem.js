const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'product'
  },
  quantity:{
    type:Number,
    required:[true,"quantity is required"],
  },
  price:{
    type:Number,
    required:[true,"price is required"]
  }
},{
  timestamps:true
});

const OrderItemModel = mongoose.model('orderitem',OrderItemSchema);
module.exports=OrderItemModel
