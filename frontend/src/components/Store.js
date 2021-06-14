import {createStore,compose,applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducers';
import { orderCreateReducer, orderListReducer, orderDetailsReducer, orderMineListReducer,isPaidReducer } from '../reducers/orderReducers';
import { productDetailsReducer, productListReducer,AddingProductReducer } from '../reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer,userListReducer } from '../reducers/userReducer';

const initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[],
        paymentMethod:"PayPal",
        shippingAddress:localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem("shippingAddress")):{}
    },
    userSignin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
    }
};
const dataReducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderMineList:orderMineListReducer,
    orderList:orderListReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userListDetails:userListReducer,
    isPaidDetails:isPaidReducer,
    addedProduct:AddingProductReducer
})
//adding redux to chrome dev tools
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    dataReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));
    
export default store;

