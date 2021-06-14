const express=require("express");
const router=express.Router();
const Product=require('../Models/productsModel')
const data=require('../data');
const { products } = require("../data");



//All products router
// router.get('/',(req,res)=>{
//     try {
//         res.status(200).send(data.products)
//     } catch (error) {
//         res.status(404).send(error.message? {error:error.message}:error)
//     }
// })


//Product by Id
// router.get('/:id',(req,res)=>{
//     try {
//         const product=data.products.find(prod=>(prod._id===parseInt(req.params.id)));
//         if(!product){
//           throw new Error("product not found")
//        }res.send(product)  
//     } catch (error) {
//         res.status(404).send("product not found")
//     }
// })


//New
router.post('/',async(req,res)=>{
    try {
        const products= new Product(req.body);
        await products.save();
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send(error.message? {error:error.message}:error)
    }
})

router.get('/',async(req,res)=>{
    try {
        const products= await Product.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send(error.message? {error:error.message}:error)
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        res.status(200).send(product) 
    } catch (error) {
        res.status(404).send("product not found")
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        const product=await Product.findByIdAndRemove(req.params.id);
        if(!product){
          throw new Error("product not found")
       }res.status(200).send(product)  
    } catch (error) {
        res.status(404).send("product not found")
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body);
        if(!product){
          throw new Error("product not found")
       }
       await products.save();
       res.status(200).send(product)  
       
    } catch (error) {
        res.status(404).send("product not found")
    }
})



module.exports=router