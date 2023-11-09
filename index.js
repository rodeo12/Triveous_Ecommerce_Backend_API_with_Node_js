// importing all module-------->
const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const cors = require("cors");
const { userProductRouter } = require("./routes/user.product.routes");
const { sellerProductRouter } = require("./routes/seller.product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { orderRouter } = require("./routes/order.routes");
const { authMiddleware } = require("./middleware/auth.middleware");
const { rateLimiter } = require("./middleware/rateLimiter.middleware");
const { swaggerSpec } = require("./swagger");
const swaggerUI = require("swagger-ui-express");


// creating an express app instance-------->
const app = express();

// middlewares------>
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Home route-------->
app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcome To Ecommerce Api Backend"})
})



// other routes----->
app.use(rateLimiter);
app.use("/user",userRouter);
app.use("/user/products",userProductRouter);
app.use(authMiddleware);
app.use("/seller/products",sellerProductRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);



// app listing and connection to db------->
app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db!");
    } catch (error) {
        console.log("Unable to connect db!");
        console.log(error.message);
    }
    console.log(`Server is Running on PORT ${process.env.PORT}!`)
})