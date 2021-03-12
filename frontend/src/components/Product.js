import React from 'react'
import Rating from './Rating'
function Product({product}) {
    return (
        // Product Component for displaying Products
              <div className="card" key={product._id}>
                    <a href={`/product/${product._id}`}>
                        <img className="medium" src={product.image} alt={product.name}/>
                    </a>
                    <div className="card-body">
                        <a href={`/product/${product._id}`}>
                            <h2>{product.name}</h2>
                        </a>
                        <Rating product={product}/>
                        <div className="price">
                            ${product.price}
                        </div>
                    </div>
                </div>  
      )
}

export default Product
