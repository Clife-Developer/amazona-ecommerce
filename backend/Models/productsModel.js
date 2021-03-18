const mongoose =require("mongoose");

const useSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        numReviews:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        countInStock:{
            type:Number,
            required:true
        },

},{
    timestamps:true
})

const Products=mongoose.model('Product',useSchema);
module.exports=Products