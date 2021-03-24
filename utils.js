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

const MongoDBConnection="mongodb+srv://clife:mhlongo@cluster0.kgvph.mongodb.net/CrudBD";
const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'ThisKeySecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
  
module.exports={
    generateToken,
    MongoDBConnection,
    isAuth
}

