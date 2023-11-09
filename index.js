// importing all module-------->
const express = require("express");
const { connection } = require("./config/db");
const app = express();
app.use(express.json());
require("dotenv").config();



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