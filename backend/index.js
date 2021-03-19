const express=require('express');
const UserRouter=require('./Routers/userRouter')
const userRoute=require('./Routers/userRouter')
const productsRoute=require('./Routers/productRoute')
const dotenv=require('dotenv')
require('./mongoConnection');

//making the reading of key in .env file possible
dotenv.config(); 

const app=express();
const port=process.env.PORT || 5000 ;

//directing all json data from request to request body in express
app.use(express.json())
//directing all requests from front end to req in express
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoute)
app.use('/api/products',productsRoute)

app.listen(port,()=>{
    console.log(`server is up and running at port ${port}`)

})