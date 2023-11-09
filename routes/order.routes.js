// importing all module-------->
const express = require("express");
const { placeOrder, orderHistory, getOrderById, updateStatus } = require("../controllers/order.controllers");
const { authorizeMiddleware } = require("../middleware/authorize.middleware");


// create a order route intance---->
const orderRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: API endpoints related to orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - grandTotal
 *         - status
 *         - orderedAt
 *       properties:
 *         user:
 *           type: string
 *           description: The user who placed the order (reference to UserModel).
 *         items:
 *           type: array
 *           description: The list of items in the order, including product reference and quantity.
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product in the order (reference to ProductModel).
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the order (default is 1).
 *         grandTotal:
 *           type: number
 *           description: The total cost of the order.
 *         status:
 *           type: string
 *           description: The status of the order (must be one of "placed," "dispatch," or "delivered," default is "placed").
 *         orderedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was placed (default is the current date and time).
 *
 */
// post a order---->
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Place an order
 *     description: Create a new order for the authenticated user.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: body
 *         name: order
 *         description: The order details to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: The user's ID.
 *     responses:
 *       '201':
 *         description: Order placed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Order placed successfully.
 *       '400':
 *         description: Invalid request or missing user ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid request or missing user ID.
 *       '401':
 *         description: Unauthorized. Please provide a valid API key.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Please provide a valid API key.
 *       '404':
 *         description: Cart is empty.
 *         content:
 *           application/json:
 *             example:
 *               message: Cart is empty.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */


orderRouter.post("/",placeOrder);

// get order history----->
/**
 * @swagger
 * /order/history:
 *   get:
 *     summary: Get order history
 *     description: Retrieve the order history for the authenticated user.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Successfully retrieved order history.
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved order history.
 *               data:  # Optional: You can provide an example of the data structure here.
 *                 - orderDetails: ...
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

orderRouter.get("/history",orderHistory);

// get order by its ID----->
/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve an order by its unique ID for the authenticated user.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the order to retrieve.
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully retrieved order by ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved order by ID.
 *               data:  # Optional: You can provide an example of the data structure here.
 *                 orderDetails: ...
 *       '403':
 *         description: Unauthorized. The order does not belong to the authenticated user.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. The order does not belong to you.
 *       '404':
 *         description: Order not found. No order with that particular ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Order not found. No order with that particular ID.
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

orderRouter.get("/:id",getOrderById)

// update status of product----->
/**
 * @swagger
 * /order/updateStatus/{id}:
 *   patch:
 *     summary: Update order status by ID
 *     description: Update the status of an order by its unique ID for authorized sellers.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the order to update.
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: API key token for authentication.
 *         required: true
 *       - in: body
 *         name: payload
 *         description: The order status update payload.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               description: The new status for the order.
 *     responses:
 *       '200':
 *         description: Order status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Order status updated successfully.
 *       '401':
 *         description: Unauthorized. Only sellers can update order status.
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized. Only sellers can update order status.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

orderRouter.patch("/updateStatus/:id",authorizeMiddleware("seller"),updateStatus)


// export module------>
module.exports={
    orderRouter
}