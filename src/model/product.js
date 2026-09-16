const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    productname:{
        type:String,
        required:[true,"productname is required"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"Category is required"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    }

},{
    timestamps:true
})

const ProductModel = mongoose.model('product',ProductSchema);
module.exports=ProductModel