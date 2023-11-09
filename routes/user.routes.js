// importing all module-------->
const express = require("express");
const { body } = require("express-validator");
const { register, login, logout } = require("../controllers/user.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");

// creating a user router instance----->
const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user (must be unique).
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           description: The role of the user (must be either "user" or "seller", default is "user").
 *
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users.
 */
// register route----->

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints related to users
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     description: Register a new user with a unique username and a valid email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account. Must be at least 8 characters long.
 *           example:
 *             username: john_doe
 *             email: johndoe@example.com
 *             password: mysecurepassword
 *     responses:
 *       '201':
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating registration success.
 *       '400':
 *         description: Bad request. Validation error or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message for each validation error.
 *       '500':
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


userRouter.post("/register", [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be atleast 3 characters"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
], register);



// login route------>


 /**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     description: Log in an existing user by providing a valid email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account. Must be at least 8 characters long.
 *           example:
 *             email: johndoe@example.com
 *             password: mysecurepassword
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating login success.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *       '400':
 *         description: Bad request. Validation error or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message for each validation error.
 *       '401':
 *         description: Unauthorized. Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message indicating incorrect password.
 *       '500':
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

userRouter.post("/login",[
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
], login);




// logout route--->
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     tags:
 *       - Users
 *     description: Log out the currently authenticated user by blacklisting their authentication token.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating logout success.
 *       '401':
 *         description: Unauthorized. Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       '500':
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



userRouter.post("/logout",authMiddleware, logout);




// module export---->
module.exports = {
    userRouter
}