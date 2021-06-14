import axios from 'axios'
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_ADDED_FAIL,
    PRODUCT_ADDED_REQUEST,
    PRODUCT_ADDED_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants'

//HomeScreen action
export const listProducts=()=>async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST
    })
    try {
        const {data}=await axios.get('/api/products')
        dispatch({
            type:PRODUCT_LIST_SUCCESS, payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL, payload:error.message
        })
    }
}

//ProductDetails Action
export const detailsProduct=(productId)=>async(dispatch)=>{
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId})
    try {
        const {data}=await axios.get(`/api/products/${productId}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS, payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL, payload:error.response && error.response.data.message?
             error.response.data.message : error.message
        })
    }
}

//ProductDetails Action
export const addingProductsAction=(products)=>async(dispatch,getState)=>{
    dispatch({type:PRODUCT_ADDED_REQUEST})
    try {
        const {data}=await axios.post(`/api/products/`,products);
        dispatch({
            type:PRODUCT_ADDED_SUCCESS, payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_ADDED_FAIL, payload:error.response && error.response.data.message?
             error.response.data.message : error.message
        })
    }
}

export const UpdateProductsAction=(id,product)=>async(dispatch,getState)=>{
  try {
      const {data}=await axios.put(`/api/products/${id}`,product)
      dispatch({
          type:PRODUCT_UPDATE_SUCCESS,
          payload:data
      })
  } catch (error) {
      
  }
}