import {PRODUCT_DETAILS_FAIL,
     PRODUCT_DETAILS_REQUEST, 
     PRODUCT_DETAILS_SUCCESS, 
     PRODUCT_LIST_FAIL,
     PRODUCT_LIST_REQUEST,
     PRODUCT_LIST_SUCCESS,
    PRODUCT_ADDED_FAIL,
PRODUCT_ADDED_REQUEST,
PRODUCT_ADDED_SUCCESS} from '../constants/productConstants'

    //HomeScreen Reducer
export const productListReducer=(state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{loading:true}
        case PRODUCT_LIST_SUCCESS:
            return{loading:false,products:action.payload}
        case PRODUCT_LIST_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state;
    }
}

//ProductDetails Reducer
export const productDetailsReducer=(state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return{loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state;
    }
}

//adding products
export const AddingProductReducer=(state={addedProducts:[]},action)=>{
    switch(action.type){
        case PRODUCT_ADDED_REQUEST:
            return{loading:true}
        case PRODUCT_ADDED_SUCCESS:
            return{loading:false,addedProducts:action.payload}
        case PRODUCT_ADDED_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state;
    }
}

