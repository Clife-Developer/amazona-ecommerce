import React, {useEffect,useState } from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
    const dispatch=useDispatch();
    const [searchVal,SetsearchVal]=useState(null);
    const productList=useSelector(state=>state.productList)
    var {loading,error,products}=productList;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
     if(searchVal){
            products=products.filter(prod=>prod.name.toLowerCase()===searchVal.toLowerCase())
        }
    return (
     // HomeScreen Component
          <div>
               <div className="row center">
                   <input className="searchBar" type="text" name="search" placeholder="Search by name" onChange={e=>SetsearchVal(e.target.value)}></input>
                   {/* <button className="searchButton" type="submit" >Search</button> */}
               </div>
               {loading? (<LoadingBox></LoadingBox>) : error? (<MessageBox variant="danger">{error}</MessageBox>):(
                   <div className="row center">
                        {products.map(product=>{
                         return(
                            <Product product={product} key={product._id}/>
                           )
                       })}
                   </div>
                 )}
            </div>
    )
}

export default HomeScreen
