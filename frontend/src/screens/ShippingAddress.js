import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import CheckOut from '../components/CheckOut'

function ShippingAddress(props) {
    const userSignin=useSelector(state=>state.userSignin)
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;
    const {userInfo}=userSignin;
    console.log(userInfo)
    if(!userInfo){
        props.history.push('/signin');
    }
    const [fullname,setFullname]= useState(shippingAddress.fullname)
    const [address,setAddress]= useState(shippingAddress.address)
    const [city,setCity]= useState(shippingAddress.city)
    const [postalCode,setPostalCode]= useState(shippingAddress.postalCode)
    const [country,setCountry]= useState(shippingAddress.country)
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullname,address,city,postalCode,country}));
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckOut step1 step2></CheckOut>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" name="fullname" id="fullname" value={fullname}
                    onChange={(e)=>setFullname(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="Address">Address</label>
                    <input type="Address" name="Address" id="Address" value={address}
                    onChange={(e)=>setAddress(e.target.value)} required/>
                </div>

                <div>
                    <label htmlFor="City">City</label>
                    <input type="City" name="City" id="City" value={city}
                    onChange={(e)=>setCity(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="Postalcode">Postal code</label>
                    <input type="Postalcode" name="Postalcode" id="Postalcode" value={postalCode}
                    onChange={(e)=>setPostalCode(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <input type="Country" name="Country" id="Country" value={country}
                    onChange={(e)=>setCountry(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="">
                        <button className="primary block" type="submit">Continue</button>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddress
