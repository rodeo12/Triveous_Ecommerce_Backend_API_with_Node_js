// importing all module-------->
const express = require("express");
const { body, param } = require("express-validator");
const { addToCart, getCart, quantityDecrement, quantityIncrement, removeProductFromCart } = require("../controllers/cart.controllers");



// create a cart route instance------->
const cartRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: API endpoints related to cart
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - user
 *         - items
 *       properties:
 *         user:
 *           type: string
 *           description: The user who owns the cart (reference to UserModel).
 *         items:
 *           type: array
 *           description: The list of items in the cart, including product reference and quantity.
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product in the cart (reference to ProductModel).
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the cart (default is 1).
 *
 * 
 */
// post a cart----->
/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add product to the cart
 *     description: Add a product to the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: body
 *         name: product
 *         description: The product ID to add to the cart.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             product:
 *               type: string
 *               description: The product ID.
 *             quantity:
 *               type: integer
 *               description: The quantity of the product to add (optional, defaults to 1).
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Product added to the cart successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Product added to the cart successfully.
 *       '400':
 *         description: Bad request. Validation errors in the request body.
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   msg: "Product ID is required",
 *                   param: "product",
 *                   location: "body"
 *                 },
 *                 {
 *                   msg: "Invalid product ID",
 *                   param: "product",
 *                   location: "body"
 *                 }
 *               ]
 *       '401':
 *         description: Unauthorized. Please provide a valid API key.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Please provide a valid API key.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */


cartRouter.post("/add",[
    body("product")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid product ID"),
],addToCart);


// retrive cart------->
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     description: Retrieve the user's cart with added products.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's cart.
 *         content:
 *           application/json:
 *             example:
 *               cart:  # Optional: You can provide an example of the cart data structure here.
 *                 user: ...
 *                 items: ...
 *       '404':
 *         description: Cart is empty.
 *         content:
 *           application/json:
 *             example:
 *               message: Cart is Empty
 *       '401':
 *         description: Unauthorized. Please provide a valid API key.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Please provide a valid API key.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

cartRouter.get("/",getCart)

// decrement cart quantity---->

/**
 * @swagger
 * /cart/decrement/{id}:
 *   patch:
 *     summary: Decrement product quantity in the cart
 *     description: Decrement the quantity of a product in the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to decrement its quantity.
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Quantity decremented successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Quantity decremented successfully.
 *       '400':
 *         description: Bad request. Validation errors in the request.
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   msg: "Product ID is required",
 *                   param: "id",
 *                   location: "params"
 *                 },
 *                 {
 *                   msg: "Invalid product ID",
 *                   param: "id",
 *                   location: "params"
 *                 }
 *               ]
 *       '404':
 *         description: Cart is empty or the product is not in the cart.
 *         content:
 *           application/json:
 *             example:
 *               message: Cart is empty or the product is not in the cart.
 *       '401':
 *         description: Unauthorized. Please provide a valid API key.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Please provide a valid API key.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

cartRouter.patch("/decrement/:id",[
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid product ID"),
],quantityDecrement)

// increment cart quantity------>
/**
 * @swagger
 * /cart/increment/{id}:
 *   patch:
 *     summary: Increment product quantity in the cart
 *     description: Increment the quantity of a product in the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to increment its quantity.
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Quantity incremented successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Quantity incremented successfully.
 *       '400':
 *         description: Bad request. Validation errors in the request.
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   msg: "Product ID is required",
 *                   param: "id",
 *                   location: "params"
 *                 },
 *                 {
 *                   msg: "Invalid product ID",
 *                   param: "id",
 *                   location: "params"
 *                 }
 *               ]
 *       '404':
 *         description: Cart is empty or the product is not in the cart.
 *         content:
 *           application/json:
 *             example:
 *               message: Cart is empty or the product is not in the cart.
 *       '401':
 *         description: Unauthorized. Please provide a valid API key.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Please provide a valid API key.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

cartRouter.patch("/increment/:id",[
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid product ID"),
],quantityIncrement)


// delete cart----->
/**
 * @swagger
 * /cart/delete/{id}:
 *   delete:
 *     summary: Remove product from the cart
 *     description: Remove a product from the user's cart by its unique ID.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to remove from the cart.
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Product removed from the cart successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Product removed from the cart successfully.
 *       '400':
 *         description: Bad request. Validation errors in the request.
 *         content:
 *           application/json:
 *             example:
 *               errors: [
 *                 {
 *                   msg: "Product ID is required.",
 *                   param: "id",
 *                   location: "params"
 *                 },
 *                 {
 *                   msg: "Invalid product ID",
 *                   param: "id",
 *                   location: "params"
 *                 }
 *               ]
 *       '404':
 *         description: Cart is empty or the product is not in the cart.
 *         content:
 *           application/json:
 *             example:
 *               message: Cart is empty or the product is not in the cart.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

cartRouter.delete("/delete/:id",[
      param("id")
        .notEmpty()
        .withMessage("Product ID is required.")
        .isMongoId()
        .withMessage("Invalid product ID"),
    ],
    removeProductFromCart
);

// module export------>
module.exports={
    cartRouter
}