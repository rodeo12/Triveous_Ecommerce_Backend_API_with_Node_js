// importing all module-------->

const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.MONGO_URL);
//Db conncetion -------->
const connection = mongoose.connect(process.env.MONGO_URL);

//export modules---->
module.exports={
    connection
}