import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addingProductsAction} from '../actions/productActions';

function AddingProducts(props) {

    const productList=useSelector(state=>state.productList)
    const {products}=productList;
    const dispatch=useDispatch();

    const [name,setName]=useState('');
    const [category,setCategory]=useState('');
    const [image,setImage]=useState('');
    const [price,setPrice]=useState(0);
    const [brand,setBrand]=useState('');
    const [rating,setRating]=useState(0);
    const [numReviews,setNumReviews]=useState(0);
    const [description,setDescription]=useState('');
    const [countInStock,setCountInStock]=useState(0);

    const SubmitHandler=(e)=>{
        dispatch(addingProductsAction({
            name,category,image,price,
            brand,rating,numReviews,
            description,countInStock}));
            props.history.push('/productslist')
       }

    return (
        <div>
            <form className="form" onSubmit={SubmitHandler}>
                <div>
                    <h1 className="headings">ADD PRODUCT</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name}
                    placeholder="Enter Name" required onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" value={category}
                    placeholder="Enter Category" required onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" value={image}
                    placeholder="Enter image link" required onChange={(e)=>setImage(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" value={price}
                    placeholder="Enter Price" required onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="brand">Brand Name</label>
                    <input type="text" name="brand" id="brand" value={brand}
                    placeholder="Enter Brand" required onChange={(e)=>setBrand(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" id="rating" value={rating}
                    placeholder="Enter Ratings" required onChange={(e)=>setRating(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="numReviews">Number of Reviews</label>
                    <input type="number" name="numReviews" id="numReviews" value={numReviews}
                    placeholder="Enter Reviews" required onChange={(e)=>setNumReviews(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={description}
                    placeholder="Enter Description" required onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="countInStock">Count in Stocks</label>
                    <input type="number" name="countInStock" id="countInStock" value={countInStock} 
                    placeholder="Enter CountInStock" required onChange={(e)=>setCountInStock(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Save product</button>
                </div>
            </form>
        </div>
    )
}

export default AddingProducts
