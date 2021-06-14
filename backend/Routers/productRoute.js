const express=require("express");
const router=express.Router();
const multer=require("multer");
const Product=require('../Models/productsModel')
const data=require('../data');
const { products } = require("../data");

const storage=multer.diskStorage({
    destination:'./uploads/',
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const upload=multer({
    storage:storage
})

//images
router.post('/',upload.single("image"),async(req,res)=>{
    try {
         console.log(req.file) 
         console.log(req.body) 
        const products= new Product({
            name:req.body.name,
            category:req.body.category,
            image:req.file.path,
            price:req.body.price,
            brand:req.body.brand,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            description:req.body.description,
            countInStock:req.body.countInStock
        });
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


//BEFORE
// router.post('/',async(req,res)=>{
//     try {
//         const products= new Product(req.body);
//         await products.save();
//         res.status(200).send(products)
//     } catch (error) {
//         res.status(404).send(error.message? {error:error.message}:error)
//     }
// })

// router.get('/',async(req,res)=>{
//     try {
//         const products= await Product.find()
//         res.status(200).send(products)
//     } catch (error) {
//         res.status(404).send(error.message? {error:error.message}:error)
//     }
// })

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