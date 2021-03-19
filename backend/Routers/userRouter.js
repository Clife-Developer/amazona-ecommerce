const express=require('express');
const router=express.Router();
const User=require("../Models/userModel")
const bcrypt=require("bcryptjs")
const generateToken =require("../../utils")

router.post('/signin',async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            if(bcrypt.compare(req.body.password, user.password)){
                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                })
                return;
            }
        }res.status(401).send({message:"invalid email or password"})
    } catch (error) {
        res.status(404).send(error.message? {error:error.message}:error)
    }
})


router.post('/register',async(req,res)=>{
    try {
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,8)
        })
         await user.save();
         res.status(200).send(
            {
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)
        })
    } catch (error) {
        res.status(404).send(error.message? {error:error.message}:error)
    }

})

module.exports=router;