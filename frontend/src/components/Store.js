import {createStore,compose,applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer } from '../reducers/orderReducers';
import { productDetailsReducer, productListReducer } from '../reducers/productReducers';
import { userRegisterReducer, userSigninReducer } from '../reducers/userReducer';

const initialState={
    cart:{
        // //setting the LocalStorage cart data as initial state, 
        // the first string argument "cartItems", is the same variable passed in the cartActions
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
    orderDetails:orderDetailsReducer
})
//adding redux to chrome dev tools
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    dataReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));
export default store;