const mongoose=require('mongoose');

const url=process.env.MONGODB_URL || "mongodb+srv://clife:mhlongo@cluster0.kgvph.mongodb.net/CrudBD";

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

