const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema(
{
  cartItems: [
    {
      name: String,
      image: String,
      price: Number,
      countInStock: Number,
      // product: mongoose.Schema.Types.ObjectId,
      qty: Number
    }
  ],
  paymentMethod: String,
  shippingAddress: {
    fullname: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  orderItems: [
    {
      name: String,
      image: String,
      price: Number,
      countInStock: Number,
      // product: mongoose.Schema.Types.ObjectId,
      qty: Number
    }
  ],
   owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        //ref:'User'//mongoose allows us to reference to another module
    },
   isPaid:{type:Boolean,default:false}
},
  {
    timestamps: true, 
  }
);
const Order = mongoose.model('Order', orderSchema);
module.exports=Order;
