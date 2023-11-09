// importing all module-------->
const mongoose = require("mongoose");

require("dotenv").config();


//Schema for user -------->
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        enum: ["user", "seller"],
        default: "user",
      },
})

// model for user------>
const UserModel = mongoose.model("user",userSchema);


//export module---->
module.exports={
    UserModel
}