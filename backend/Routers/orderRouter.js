const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const Order=require('../Models/orderModel.js');
const {
  isAuth
} =require('../../utils.js');

const orderRouter = express.Router();
// orderRouter.get(
//   '/',
//   isAuth,
//   isSellerOrAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const seller = req.query.seller || '';
//     const sellerFilter = seller ? { seller } : {};

//     const orders = await Order.find({ ...sellerFilter }).populate(
//       'user',
//       'name'
//     );
//     res.send(orders);
//   })
// );
// orderRouter.get(
//   '/mine',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   })
// );

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });
    }
  })
);
module.exports=orderRouter;