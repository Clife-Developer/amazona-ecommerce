import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import CheckOut from '../components/CheckOut';

function PaymentMethod(props) {
    const cart=useSelector(state => state.cart)
    const { shippingAddress}=cart;
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const [paymentMethod,setPaymentMethod]=useState('payPal');
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
         e.preventDefault();
         dispatch(savePaymentMethod(paymentMethod))
         props.history.push('/placeorder')
    };
    return (
        <div>
            <CheckOut step1 step2 step3 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                   <div>
                    <input type="radio" id="paypal" 
                    name="paymentMethod" checked 
                    value="PayPal" required onChange={(e)=>setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal">PayPal</label>
                   </div>
                </div>
                <div>
                   <div>
                    <input type="radio" id="stripe" 
                    name="paymentMethod" checked 
                    value="Stripe" required onChange={(e)=>setPaymentMethod(e.target.value)}/>
                    <label htmlFor="stripe">Stripe</label>
                   </div>
                </div>
                <div>
                    <button type="submit" className="primary">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethod
