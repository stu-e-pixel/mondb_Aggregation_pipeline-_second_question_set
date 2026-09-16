const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true
    },
    city:{
        type:String,
        required:[true,"city is required"],
        trim:true
    }

},{
    timestamps:true
})

const UserModel = mongoose.model('user',UserSchema);
module.exports=UserModel