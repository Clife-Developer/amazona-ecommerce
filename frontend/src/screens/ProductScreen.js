import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const dispatch=useDispatch()
    const [qty,setQty]=useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product}=productDetails;
    // const productList=useSelector(state=>state.productList)
    // const {loading,error,products}=productList;
    const productId=props.match.params.id;
     
    // const product=products.find(prod=>prod._id===productId)
    useEffect(()=>{
        dispatch(detailsProduct(productId))
    },[productId,dispatch])

    const addToCartHandle=()=>{
        //redirecting user to cart page
        props.history.push(`/cart/${productId}? qty=${qty}`)
    }
    return (
        <div>
            {loading? (<LoadingBox></LoadingBox>) :
            error? (<MessageBox variant="danger">{error}</MessageBox>):
        
         //Product component, displaying one specific product
        (<div>
            <Link to="">Back to products</Link>
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
                            {
                                product.countInStock>0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select value={qty} onChange={e=>setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                    <button className="primary block" onClick={addToCartHandle}>Add to Cart</button>
                                 </li>
                                </>
                               )
                            }
                        </ul>
                    </div>
                </div>
            </div>       
        </div>
                 )}
        </div>
    )
}
export default ProductScreen
