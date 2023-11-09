// importing all module-------->


const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config();



// auth middleware----->

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;

    const isTokenBlacklisted = await BlacklistModel.findOne({token});

    if(isTokenBlacklisted) return res.status(401).send({msg:"Session Exprired! Please login Again"});
    
    if(token){

        const decoded = jwt.verify(token,process.env.JWT_LOGIN_SECRET)
        if(decoded){
            req.body.userId = decoded.userId;
            req.body.role = decoded.role;

            console.log(decoded.userId)
            next();
        }else{
            res.status(400).send({msg:"Please Login Fisrt!"})
        }
    }else{
        res.status(400).send({msg:"Please Login Fisrt!"})
    }
    } catch (error) {
        console.log('/authMiddleware: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
    
}



// export module----->
module.exports={
    authMiddleware
}