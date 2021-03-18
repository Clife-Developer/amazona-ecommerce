const mongoose =require('mongoose');

const useSchema=new mongoose.Schema({
     
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


},{
    timestamps:true,
})

const User=mongoose.model('User',useSchema);

module.exports=User;