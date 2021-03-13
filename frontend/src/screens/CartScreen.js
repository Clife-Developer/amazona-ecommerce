import React from 'react'

function CartScreen(props) {
    const productId=props.match.params.id;
    const qty=props.location.serach? Number(props.location.serach.split("=")[1]):1
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>ADD TO CART: PRODUCTID :{productId} Qty:{qty}</p>
        </div>
    )
}

export default CartScreen
