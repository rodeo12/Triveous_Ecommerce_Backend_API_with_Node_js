
const authorizeMiddleware = (permittedRoles) => {
    return (req, res, next) => {
        let role = req.body.role;
        if (!permittedRoles.includes(role)) {
            return res.status(401).send({ message: "Unauthorized! Only Sellers Can Add And Update Products/orderStatus" });
        }
        next();
    };
};



// export module---->
module.exports={
    authorizeMiddleware
}