const express=require('express');
const ejs=require('ejs');
const userRouter=require('./Routers/userRouter')
const productsRouter=require('./Routers/productRoute')
const orderRouter = require('./Routers/orderRouter');

require('dotenv').config()
require('./mongoConnection');

// to be able to read variables in .env file


const app=express();
const port=process.env.PORT || 5000 ;

//images
app.use('/uploads',express.static('uploads'))


//directing all json data from request to request body in express
app.use(express.json())
//directing all requests from front end to req in express
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRouter)
app.use('/api/products',productsRouter)
app.use('/api/orders',orderRouter)


app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.listen(port,()=>{
    console.log(`server is up and running at port ${port}`)

})


