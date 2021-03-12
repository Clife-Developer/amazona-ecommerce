import React, { useState,useEffect } from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import axios from 'axios'

function HomeScreen() {
    const [products,setProducts]=useState([]);
    const [error,setError]=useState('')
    const [Loading,setLoading]=useState(false)
    useEffect(() => {
        //fetching Data from Server
        const fetchData=async()=>{
        try {
            setLoading(true)
            const {data}=await axios.get('/api/products')  
            setLoading(false)
            setProducts(data.products)
        } catch (error) {
            setError(error.message)
            setLoading(false)
         }
       }
       fetchData();
    }, [])
    
    return (
     // HomeScreen Component
         <div>
               {Loading? (<LoadingBox></LoadingBox>) : error? (<MessageBox variant="danger">{error}</MessageBox>):(
                   <div className="row center">
                        {products.map(product=>{
                         return(
                            <Product product={product} key={product._id}/>
                           )
                       })}
                   </div>
                 )}
            </div>
    )
}

export default HomeScreen
