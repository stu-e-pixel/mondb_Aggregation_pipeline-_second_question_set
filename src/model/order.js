const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    totalAmount:{
        type:Number,
        required:[true,"Total Amount is required"],
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        trim:true
    }
},{
    timestamps:true
});

const OrderModel = mongoose.model('order',OrderSchema)
module.exports=OrderModel