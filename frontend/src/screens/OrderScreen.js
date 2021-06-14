import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CheckoutSteps from '../components/CheckOut';
import {detailsOrder} from '../actions/orderActions';
import {isPaidAction} from '../actions/orderActions'
export default function OrderScreen(props) {
  const orderId=props.match.params.id;
  const [sdkReady, setSdkReady]=useState(false)
  const orderDetails=useSelector(state=>state.orderDetails);
  const {orderInfo,loading,error}=orderDetails;
  const dispatch = useDispatch();
 const amount=props.location.search? props.location.search.split('=')[1]:'/';
  const price=200;

  useEffect(() => {
      const addPayPalScript=async()=>{
          const {data}= await Axios.get('/api/config/paypal');
          const script= document.createElement('script');
          script.type="text/javascript";
          script.src=`https://www/paypal.com/sdk/js?client-id=${data}`;
          script.async=true;
          script.onload=()=>{
              setSdkReady(true);
          }
          document.body.appendChild(script);
      }
     if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
  }, [dispatch,orderInfo,orderId,sdkReady]);
  const successPaymentHandler=()=>{
      dispatch(isPaidAction(orderId))
  }

  const OrderStatus=(id)=>{
    props.history.push(`/pay/${id}`)
  }
  return  (
    <div>
        <h1>Order</h1>
      <div className="row">
          <div className="col-1">
              <h1>Payments</h1>
                <div className="card card-body">
                   <li>
                        <PayPalButton
                            amount={amount}
                            onSuccess={successPaymentHandler}>
                        </PayPalButton>
                    </li>
                    <li>
                       <button className="cart" type="button" onClick={(e)=>OrderStatus(orderId)}>Check Order Status</button>
                    </li>
                </div>
            </div>
      </div>
    </div>
  );
}