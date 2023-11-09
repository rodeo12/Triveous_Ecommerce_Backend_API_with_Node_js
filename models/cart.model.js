// importing all module-------->
const mongoose = require("mongoose");


// schema for cart------>
const cartSchema = mongoose.Schema({
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
});


// model for cart------->
const CartModel = mongoose.model("Cart", cartSchema);


// export module----->
module.exports = {
    CartModel
};