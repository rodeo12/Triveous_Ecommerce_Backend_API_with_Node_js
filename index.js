// importing all module-------->
const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { authMiddleware } = require("./middleware/auth.middleware");
const { swaggerSpec } = require("./swagger");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(express.json());
require("dotenv").config();


app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Home route-------->
app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcome To Ecommerce Api Backend"})
})

app.use("/user",userRouter);

app.use(authMiddleware);


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