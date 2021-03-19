const jwt=require('jsonwebtoken')

  const generateToken=(user)=>{
    return jwt.sign(
        {   _id:user._id, 
            name:user.name, 
            email:user.email,
            isAdmin:user.isAdmin
        },process.env.JWT_SECRETKEY || 'ThisKeySecret',
        {expiresIn:"30d"})
}

const MongoDBConnection="mongodb+srv://clife:mhlongo@cluster0.kgvph.mongodb.net/CrudBD"
module.exports={
    generateToken,
    MongoDBConnection

}