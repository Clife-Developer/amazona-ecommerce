import React from 'react'
import Product from '../components/Product'
import data from '../data'
function HomeScreen() {
    return (
     // HomeScreen Component
         <div className="row center">
                {data.products.map(product=>{
                  return(
                    <Product product={product} key={product._id}/>
                  )
                })}
            </div>
    )
}

export default HomeScreen
