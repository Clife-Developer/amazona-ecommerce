const mongoose=require('mongoose');
const {MongoDBConnection}=require('../utils')
const url=process.env.MONGODB_URL || MongoDBConnection;

mongoose.connect(url,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:true,
},(error)=>{
    if(error){
        throw new Error(error.message? {error:error.message} : error)
    }console.log("connected to mongoDb DataBase")
})

