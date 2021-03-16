const express=require('express');
const data=require('./data')
const app=express();

const port=process.env.PORT || 4000 ;

app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/api/products/:id',(req,res)=>{
    
    const product=data.products.find(prod=>(prod._id===parseInt(req.params.id)));
    if(product){
        res.send(product)  
    }else{res.status(404).send("product not found")}

})

app.post('/api/products/add',(req,res)=>{
    const user=req.body;
    data.products.push(user);

    data.save(user);
})

app.get('/',(req,res)=>{
    res.send("server is ready")
})

app.listen(port,()=>{
    console.log(`server is up and running at port ${port}`)

})
