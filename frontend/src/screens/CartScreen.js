import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {addToCart} from '../actions/cartAction'
function CartScreen(props) {
     const dispatch = useDispatch();
    const productId=props.match.params.id;
    const qty=props.location.search ? Number(props.location.search.split("=")[1]):1;

    useEffect(()=>{
       if(productId){
           dispatch(addToCart(productId,qty))
       }
    },[dispatch,productId,qty])
    return (
        <div>
            {console.log(props.location.search)}
            <h1>Cart Screen</h1>
            <p>ADD TO CART: PRODUCTID :{productId} Qty: {qty}</p>
        </div>
    )
}

export default CartScreen
