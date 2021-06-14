import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
import {isPaidAction} from '../actions/orderActions'

function Paid(props) {

    const dispatch=useDispatch();
    const orderId=props.match.params.id;
    const isPaidDetails = useSelector(state => state.isPaidDetails)
    const {loading, isPaidInfo,error}=isPaidDetails;
    
    useEffect(() => {
    dispatch(isPaidAction(orderId))
    },[dispatch,orderId])

    return (
        <div>
            {
                loading? (<LoadingBox></LoadingBox>): error? (<MessageBox></MessageBox>):(
                 <div>
                    <div className="row">
                        <div className="col-1">
                        <h1></h1>
                            <div className="card card-body">
                                <h1>Order Id: {isPaidInfo._id}</h1>
                                Order Status:{isPaidInfo.isPaid? (<h1 className="paid">Order paid</h1>):
                                (<h1 className="notpaid"> Order not paid</h1>)}
                            </div>
                        </div>
                    </div>
                 </div>
                )
            }
        </div>
    )

}
            
     

export default Paid
