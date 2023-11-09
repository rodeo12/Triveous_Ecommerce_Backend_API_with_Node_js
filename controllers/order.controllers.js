// importing all module-------->
const { CartModel } = require("../models/cart.model");
const { OrderModel } = require("../models/order.model");




// place order------->
const placeOrder = async(req,res)=>{
    try {
        const {userId} = req.body;
  
        const cart = await CartModel.findOne({ user: userId }).populate("items.product");
    
        if (!cart || !cart.items.length) {
          return res.status(404).send({
            message: "Cart is empty",
          });
        }
    
        let totalAmount = 0;
        for (const item of cart.items) {
          totalAmount += item.product.price * item.quantity;
        }
    
        const order = new OrderModel({
          user: userId,
          items: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          grandTotal: totalAmount,
        });
    
        await order.save();
    
        await CartModel.findOneAndRemove({ user: userId });
    
        res.status(201).send({ message: "Order placed successfully" });
      } catch (error) {
        console.log('/order/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
      }
}

// get order history----->
const orderHistory = async(req,res)=>{
     try {
        const {userId} = req.body;

        const orders = await OrderModel.find({ user: userId }).populate("items.product");

        res.status(200).send(orders);
     } catch (error) {
        console.log('/order/history: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
     }
}


// get perticular order by ID------>
const getOrderById = async(req,res)=>{
     try {
        const {userId} = req.body;
        const {id} = req.params;
        const order = await OrderModel.findById(id).populate("items.product");

        if(!order) return res.status(404).send({ message: "No order with that perticular ID" });

        if (order.user.toString() !== userId) return res.status(403).send({ message: "Unauthorize" });

        res.status(200).send(order);
     } catch (error) {
        console.log('/order/:id: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
     }
}


// update status of order------->
const updateStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const payload = req.body;

        await OrderModel.findByIdAndUpdate({_id:id},payload);

        res.status(200).send({msg:"Order Status Updated Successfully"})
    } catch (error) {
        console.log('/order/updateStatus/:id: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// export modules----->
module.exports={
    placeOrder,orderHistory,getOrderById,updateStatus
}