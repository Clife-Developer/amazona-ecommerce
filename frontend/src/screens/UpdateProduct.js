import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {UpdateProductsAction,detailsProduct} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function UpdateProduct(props) {
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product}=productDetails;
    const dispatch=useDispatch();

    const [name,setName]=useState(product? product.name:'');
    const [category,setCategory]=useState(product? product.category:'');
    const [image,setImage]=useState(product? product.image:'');
    const [price,setPrice]=useState(product? product.price:0);
    const [brand,setBrand]=useState(product? product.brand:'');
    const [rating,setRating]=useState(product? product.rating:0);
    const [numReviews,setNumReviews]=useState(product? product.numReviews:0);
    const [description,setDescription]=useState(product? product.description:'');
    const [countInStock,setCountInStock]=useState(product? product.countInStock:0);

    const SubmitHandler=(e)=>{
        dispatch(UpdateProductsAction(props.match.params.id,{
            name,category,image,price,
            brand,rating,numReviews,
            description,countInStock}));
            props.history.push('/productslist')
       }

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
    }, [props.match.params.id,dispatch])

    return (
         loading? (<LoadingBox></LoadingBox>): error? (<MessageBox></MessageBox>):(
             <div>
            <form className="form" onSubmit={SubmitHandler}>
                <div>
                    <h1 className="headings">UPDATE PRODUCT</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name}
                     required onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" value={category}
                     required onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="image">Image Link</label>
                    <input type="text" name="image" id="image" value={image}
                     required onChange={(e)=>setImage(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" value={price}
                     required onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="brand">Brand Name</label>
                    <input type="text" name="brand" id="brand" value={brand}
                     required onChange={(e)=>setBrand(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" id="rating" value={rating}
                     required onChange={(e)=>setRating(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="numReviews">Number of Reviews</label>
                    <input type="number" name="numReviews" id="numReviews" value={numReviews}
                    required onChange={(e)=>setNumReviews(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" value={description}
                    required onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="countInStock">Count in Stocks</label>
                    <input type="number" name="countInStock" id="countInStock" value={countInStock} 
                    required onChange={(e)=>setCountInStock(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Update</button>
                </div>
            </form>
        </div>
         )
    )
}

export default UpdateProduct
