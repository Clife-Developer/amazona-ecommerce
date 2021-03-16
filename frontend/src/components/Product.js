import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'
function Product({product}) {
    return (
        // Product Component for displaying Products
              <div className="card" key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <img className="medium" src={product.image} alt={product.name}/>
                    </Link>
                    <div className="card-body">
                        <Link to={`/product/${product._id}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <Rating product={product}/>
                        <div className="price">
                            ${product.price}
                        </div>
                    </div>
                </div>  
      )
}

export default Product
