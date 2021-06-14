import React, {useEffect } from 'react'
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts} from '../actions/productActions'
import {Link} from 'react-router-dom'

    
function ProductsList(props) {
    const dispatch=useDispatch();
    const productList=useSelector(state=>state.productList)
    const {loading,error,products}=productList;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    
    const removeProduct=async(id)=>{
         const {data}=await Axios.delete(`/api/products/${id}`);
    }

    const UpdateHandle=(id)=>{
        props.history.push(`/updateProduct/${id}`)
    }

    const HandleAddProduct=(e)=>{
        e.preventDefault();
        props.history.push("/addproducts")
    }
    return (
        <>
        <div className="row center">
            <h1 className="headings">LIST OF PRODUCTS</h1>
        </div>
         <div className="row top">
            <div className="col-2">
                { loading? (<LoadingBox></LoadingBox>):error?(<MessageBox></MessageBox>): (
                    <ul>
                        {products.map(item=>
                        {
                            return(<li key={item._id}>
                                <div className="row">
                                     <div>
                                         <img src={item.image} alt={item.name} className="small"/>
                                     </div>
                                     <div className="min-30">
                                         <Link to={`/product/${item._id}`}>{item.name}</Link>
                                     </div>
                                     <div>${item.price}</div>
                                     <div>
                                         <form action="">
                                            <button className="cart" type="submit" onClick={(e)=>removeProduct(item._id)}>Delete</button>
                                         </form>
                                     </div>
                                     <div>
                                         <form action="">
                                             <button className="cart" type="submit" onClick={e=>UpdateHandle(item._id)}>Update</button>
                                         </form>
                                     </div>
                                </div>
                            </li>)
                         })
                       }
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <button type="button" className="primary block" onClick={HandleAddProduct}>Add new product</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}


export default ProductsList
