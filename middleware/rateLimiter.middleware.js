// importing all module-------->
const rateLimit = require("express-rate-limit");

// Create a rate limiter instance------>
const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50, 
  message: "Too many requests from this IP, please try again after some time.",
});


// export modules ----->
module.exports = {
  rateLimiter
};