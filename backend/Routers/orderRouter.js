const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const Order=require('../Models/orderModel');
const {
  isAuth
} =require('../../utils.js');
const {orderEmail}=require("../SendEmail")
const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders= await Order.find();
    if(orders){
      res.status(200).send(orders)
    }
    else{
      {message:"order not found"}
    }
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ owner: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
    const order = new Order({
      ...req.body, owner:req.user._id
    });
    orderEmail(req.user.email)
      await order.save();
      res.status(201).send({ message: 'New Order Created', order: order });
    }

  })
);


orderRouter.put(
  '/pay/:id',
  isAuth,async (req, res) => {
    try {
      const PaidOrder=await Order.findByIdAndUpdate(req.params.id,{isPaid:req.body.isPaid});
      await PaidOrder.save();
      res.status(200).send({_id:PaidOrder._id}); 
    } catch (error) {
      res.status(404).send({message:"order not found"}); 
    }
  }
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send({_id:order._id,isPaid:order.isPaid});
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// orderRouter.delete(
//   '/:id',
//   isAuth,
// isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       const deleteOrder = await order.remove();
//       res.send({ message: 'Order Deleted', order: deleteOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

// orderRouter.put(
//   '/:id/deliver',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = Date.now();

//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Delivered', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );


module.exports=orderRouter;