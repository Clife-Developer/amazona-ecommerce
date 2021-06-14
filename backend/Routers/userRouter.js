const express=require('express');
const router=express.Router();
const User=require("../Models/userModel")
const expressAsyncHandler=require('express-async-handler');
const bcrypt=require("bcryptjs")
const { generateToken,isAuth } =require("../../utils")
const {orderEmail, SendWelcomingEmail }=require("../SendEmail")

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

router.get('/allusers',isAuth,async(req,res)=>{
    try {
      if(req.user.isAdmin){
          const user=await User.find({})
          res.status(200).send(user)
      } 
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
        // SendWelcomingEmail(user.email,user.name)
    } catch (error) {
        res.status(401).send(error.message? {error:error.message}:error)
    }

})

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

router.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

router.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(404).send({ message: 'User Not Found' });
  }
}
));

module.exports=router;

