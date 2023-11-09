// importing all module-------->
const mongoose = require("mongoose");

// schema for products----->
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    }
})

// model for products----->
const ProductModel = mongoose.model("product",productSchema);

// export module------->
module.exports={
    ProductModel
}