// importing all module-------->
const mongoose = require('mongoose');


// schema for blaacklisting token-------->
const blacklistSchema = mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
})

// model for blacklisted token----->
const BlacklistModel = mongoose.model('blacklistedToken', blacklistSchema);


// module export----->
module.exports = {
    BlacklistModel
}