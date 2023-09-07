import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";



//@desc Create new order 
//@route POST/api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }
  
    try {
      const order = new Order({
        user: req.user._id,
        orderItems: orderItems.map((x) => ({ ...x, product: x._id, _id: undefined })),
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
  
      const createdOrder = await order.save();
      res.status(201).json(createdOrder)
    } catch (error) {
      console.error("Error in addOrderItems:", error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  });
  

//@desc get logged in user orders 
//@route GET/api/orders/myorders
//@access Private

const getMyOrders = asyncHandler( async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders)
 })

 //@desc Get order by Id
//@route GET/api/orders/:id
//@access Private

const getOrderById = asyncHandler( async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
 })

//@desc Update order to paid
//@route PUT/api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id  ,
        status: req.body.status ,
        update_time: req.body.update_time ,
        email_address: req.body.payer.email_address 
      };
  
      const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  });
  

 //@desc Update order to delivered
//@route PUT/api/orders/:id/deliver
//@access Private

const updateOrderToDelivered = asyncHandler( async(req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);

    }else{
        res.status(404);
        throw new Error('Order not found')    
    }
 })

 //@desc Get all orders
//@route GET/api/orders
//@access Private/admin

const getOrders = asyncHandler( async(req,res)=>{
    const orders = await Order.find({}).populate('user','id name')
    res.status(200).json(orders)
 })



 export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
 }