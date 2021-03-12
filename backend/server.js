const express=require('express')
const data=require('./data')
const app=express();

const port=process.env.PORT || 4000 ;

app.get('/api/products',(req,res)=>{
    res.send(data)
})
app.get('/',(req,res)=>{
    res.send("server is ready")
})

app.listen(port,()=>{
    console.log(`server is up and running at port ${port}`)

})
