import React from 'react'
import Rating from '../components/Rating';
import data from '../data'
import {Link} from 'react-router-dom'
function ProductScreen(props) {
    const product=data.products.find(product=>product._id===parseInt(props.match.params.id));
    if(!product){
        return <div>Product Not Found</div>
    }
    return (
        //Product component, displaying one specific product
        <div>
            <Link to="">Back to results</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}/>
                </div>
                {/* Displaying Product details */}
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating product={product}/>
                        </li>
                        <li>
                            Price:${product.price}
                        </li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>

                {/* Add to Cart box */}
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock>0? (<span className="success">In Stock</span>)
                                        :
                                        (<span className="danger">Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default ProductScreen
