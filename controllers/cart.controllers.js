// importing all module-------->
const { ProductModel } = require("../models/product.model")
const { CartModel } = require("../models/cart.model");

const { validationResult } = require("express-validator");



// add to cart------>
const addToCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        let { product, quantity, userId } = req.body;

        if (!quantity) quantity = 1;

        let cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            cart = new CartModel({
                user: userId,
                items: [
                    {
                        product: product,
                        quantity: quantity,
                    },
                ],
            });
        } else {
            let existingItem = cart.items.find((item) => item.product.toString() === product);

            if (existingItem) {
                // If the product exists, update the quantity
                existingItem.quantity += quantity;
            } else {
                // If the product is not in the cart, add it
                cart.items.push({
                    product: product,
                    quantity: quantity,
                });
            }
        }

        await cart.save();

        res.status(200).send({ msg: "Product Added to Cart" })
    } catch (error) {
        console.log('/cart/add/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// retrive cart------>
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await CartModel.findOne({ user: userId }).populate(
            'items.product'
        );

        if (!cart) {
            return res.status(404).send({ message: 'Cart is Empty' });
        }

        res.status(200).send({ cart });
    } catch (error) {
        console.log('/cart/: ', error.message);
        res.status(501).send({ msg: 'Internal Server error', error: error.message });
    }
};


// decrese quanity of cart product------->
const quantityDecrement = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const { userId } = req.body;
        const { id } = req.params;

        const cartExists = await CartModel.findOne({ user: userId });

        if (!cartExists) {
            return res.status(404).send({ message: "Cart is empty" });
        }
        const cartItemIndex = cartExists.items.findIndex(
            (item) => item.product.toString() === id
        );

        if (cartExists.items[cartItemIndex].quantity > 0) {
            cartExists.items[cartItemIndex].quantity -= 1;
            if (cartExists.items[cartItemIndex].quantity === 0) {
                cartExists.items.splice(cartItemIndex, 1);
            }
        }

        await cartExists.save();

        res.status(200).send({ message: "Quantity decremented successfully" });
    } catch (error) {
        console.log('/cart/decrement/:id: ', error.message);
        res.status(501).send({ msg: 'Internal Server error', error: error.message });
    }

}


// increase quanity of cart product------->
const quantityIncrement = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const { userId } = req.body;
        const { id } = req.params;

        const cartExists = await CartModel.findOne({ user: userId });

        if (!cartExists) {
            return res.status(404).send({ message: "Cart is empty" });
        }
        const cartItemIndex = cartExists.items.findIndex(
            (item) => item.product.toString() === id
        );

        if (cartItemIndex !== -1) {
            cartExists.items[cartItemIndex].quantity += 1;
        } else {
            cartExists.items.push({
                product: id,
                quantity: 1,
            });
        }

        await cartExists.save();

        res.status(200).send({ message: "Quantity Incremented successfully" });
    } catch (error) {
        console.log('/cart/increment/:id: ', error.message);
        res.status(501).send({ msg: 'Internal Server error', error: error.message });
    }

}


// remove product from cart ------->
const removeProductFromCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const { userId } = req.body;
        const { id } = req.params;

        const cartExists = await CartModel.findOne({ user: userId });

        if (!cartExists) {
            return res.status(404).send({ message: "Cart is empty" });
        }

        const cartItemIndex = cartExists.items.findIndex(
            (item) => item.product.toString() === id
        );

        if (cartItemIndex === -1) {
            return res.status(404).send({ message: "Product not found!" });
        }

        cartExists.items.splice(cartItemIndex, 1);

        await cartExists.save();

        res.status(200).send({ message: "Product removed from the cart successfully" });
    } catch (error) {
        console.log('/cart/remove/:id: ', error.message);
        res.status(501).send({ msg: 'Internal Server error', error: error.message });
    }
}

// export modules------>
module.exports = {
    addToCart, getCart, quantityDecrement, quantityIncrement, removeProductFromCart
}