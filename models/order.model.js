// importing all module-------->
const mongoose = require("mongoose");


// schema for order ----->
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  grandTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["placed", "dispatch","deliverd"],
    default: "placed",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});


// model for orders------->
const OrderModel = mongoose.model("Order", orderSchema);

// module export------>
module.exports = {
    OrderModel
};