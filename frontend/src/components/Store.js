import {createStore,compose,applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from '../reducers/productReducers';

const initialState={};

const dataReducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer
})
//adding redux to chrome dev tools
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    dataReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk)));
export default store;