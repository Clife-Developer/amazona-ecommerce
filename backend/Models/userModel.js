const mongoose =require('mongoose');
const Order=require('./orderModel')

const useSchema=new mongoose.Schema(
    {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        email:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    isAdmin:{
        type:Boolean, default:false, required:true
    }
},
{
    timestamps:true,
})
useSchema.virtual('Orders',{
    ref:"Order",
    localField:'_id',
    foreignField:'owner'
})

const User=mongoose.model('User',useSchema);
module.exports=User;


