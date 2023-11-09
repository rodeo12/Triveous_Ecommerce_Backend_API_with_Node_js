// importing all module-------->
const express = require("express");
const { authorizeMiddleware } = require("../middleware/authorize.middleware");
const { getSellerProducts, addProducts, updateProducts, deleteProduct, getSellerProductById } = require("../controllers/seller.products.controllers");



// create sellerProduct route instancce -------->
const sellerProductRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Seller Products
 *     description: API endpoints related to seller products
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - price
 *         - description
 *         - image
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product.
 *         category:
 *           type: string
 *           description: The category of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         description:
 *           type: string
 *           description: A description of the product.
 *         image:
 *           type: string
 *           description: The URL of the product's image.
 *         availability:
 *           type: boolean
 *           description: Indicates whether the product is available or not (default is true).
 *         userId:
 *           type: string
 *           description: The ID of the user who owns this product.
 *
 */
// get all product posted by seller---->
/**
 * @swagger
 * /seller/products/:
 *   get:
 *     summary: Get all products for a seller
 *     tags:
 *       - Seller Products
 *     description: Retrieve all products associated with a seller's account. Requires seller authentication.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for seller authentication.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized. Seller authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

sellerProductRouter.get("/",authorizeMiddleware("seller"),getSellerProducts);

// get product by ID---->

/**
 * @swagger
 * /seller/products/{id}:
 *   get:
 *     summary: Get a specific product for a seller
 *     tags:
 *       - Seller Products
 *     description: Retrieve a specific product associated with a seller's account by its ID. Requires seller authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for seller authentication.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized. Seller authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the product with the specified ID was not found.
 *       '403':
 *         description: Forbidden. Seller does not have access to other seller's products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access to other seller's products.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

sellerProductRouter.get("/:id",authorizeMiddleware("seller"),getSellerProductById);

// add new Product----->
/**
 * @swagger
 * /seller/products:
 *   post:
 *     summary: Add a new product for a seller
 *     tags:
 *       - Seller Products
 *     description: Add a new product with details for a seller. Requires seller authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               availability:
 *                 type: boolean
 *             example:
 *               title: New Product
 *               category: Electronics
 *               price: 99.99
 *               description: Description of the new product
 *               image: product_image.jpg
 *               availability: true
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '201':
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating the product was added successfully.
 *       '400':
 *         description: Bad request. Missing required fields or invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the missing required fields.
 *       '401':
 *         description: Unauthorized. Seller authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

sellerProductRouter.post("/addProduct",authorizeMiddleware("seller"),addProducts);

// update existing product------>
/**
 * @swagger
 * /seller/products/updateProduct/{id}:
 *   patch:
 *     summary: Update a seller's product by ID
 *     tags:
 *       - Seller Products
 *     description: Update a seller's product by its unique ID. Requires seller authentication.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for seller authentication.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the product.
 *               category:
 *                 type: string
 *                 description: New category for the product.
 *               price:
 *                 type: number
 *                 description: New price for the product.
 *               description:
 *                 type: string
 *                 description: New description for the product.
 *               image:
 *                 type: string
 *                 description: New image URL for the product.
 *               availability:
 *                 type: boolean
 *                 description: New availability status for the product.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating the product was updated successfully.
 *       '401':
 *         description: Unauthorized. Seller authentication failed or access to other seller's product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

sellerProductRouter.patch("/updateProduct/:id",authorizeMiddleware("seller"),updateProducts);

// delete a perticular product---->
/**
 * @swagger
 * /seller/products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a seller's product by ID
 *     tags:
 *       - Seller Products
 *     description: Delete a seller's product by its unique ID. Requires seller authentication.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for seller authentication.
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product to delete.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating the product was deleted successfully.
 *       '401':
 *         description: Unauthorized. Seller authentication failed or access to other seller's product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '501':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

sellerProductRouter.delete("/deleteProduct/:id",authorizeMiddleware("seller"),deleteProduct)


// export module------->
module.exports={
    sellerProductRouter
}