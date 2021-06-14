const express=require('express');
const userRouter=require('./Routers/userRouter')
const productsRouter=require('./Routers/productRoute')
const orderRouter = require('./Routers/orderRouter');
const dotenv=require('dotenv');
const {
  PAYPAL_CLIENT_ID
} =require('../utils');

require('./mongoConnection');

// to be able to read variables in .env file
dotenv.config(); 

const app=express();
const port=process.env.PORT || 5000 ;

//directing all json data from request to request body in express
app.use(express.json())
//directing all requests from front end to req in express
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRouter)
app.use('/api/products',productsRouter)
app.use('/api/orders',orderRouter)


app.get('/api/config/paypal',(req,res)=>{
    res.send(PAYPAL_CLIENT_ID)
})
app.listen(port,()=>{
    console.log(`server is up and running at port ${port}`)

})


