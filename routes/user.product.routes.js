// importing all module-------->
const express = require("express");
const { getProducts, getCategories, getProductById } = require("../controllers/user.products.controlles");

// create user product route instance-----> 
const userProductRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: User Products
 *     description: API endpoints related to user products
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
// get all products route------>
/**
 * @swagger
 * /user/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - User Products
 *     description: Retrieve a list of products, optionally filtered by category and sorted by price.
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order for the products (asc or desc).
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category.
 *     responses:
 *       '200':
 *         description: Successful response with a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'  # Reference to your Product schema
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

userProductRouter.get("/",getProducts);

// get all categories routee----->
/**
 * @swagger
 * /user/products/categories:
 *   get:
 *     summary: Get a list of product categories
 *     tags:
 *       - User Products
 *     description: Retrieve a list of unique product categories.
 *     responses:
 *       '200':
 *         description: Successful response with a list of unique product categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of unique product categories.
 *       '404':
 *         description: No categories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating that no categories were found.
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

userProductRouter.get("/categories",getCategories);

// get product by id route------->

/**
 * @swagger
 * /user/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - User Products
 *     description: Retrieve a product by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product.
 *     responses:
 *       '200':
 *         description: Successful response with the product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'  # Reference to your Product schema
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating that the product was not found.
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

userProductRouter.get("/:id",getProductById);


// export module------->
module.exports={
    userProductRouter
}