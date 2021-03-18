const express=require("express");
const router=express.Router();
const Product=require('../Models/productsModel')
const data=require('../data')



//Get Routers
router.get('/',(req,res)=>{
    try {
        res.status(200).send(data.products)
    } catch (error) {
        res.status(404).send(error.message? {error:error.message}:error)
    }
})

router.get('/:id',(req,res)=>{
    try {
        const product=data.products.find(prod=>(prod._id===parseInt(req.params.id)));
        if(!product){
          throw new Error("product not found")
       }res.send(product)  
    } catch (error) {
        res.status(404).send("product not found")
    }
})
module.exports=router