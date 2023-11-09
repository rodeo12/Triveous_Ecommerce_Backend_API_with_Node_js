// importing all module-------->
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const { validationResult } = require("express-validator");





// user registration ------>
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const isUserAlreadyExists = await UserModel.findOne({ email });

        if (isUserAlreadyExists) return res.status(400).send({ msg: "User Already Exists" });

        const hashPswword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const newUser = await new UserModel({ ...req.body, password: hashPswword });
        await newUser.save();

        res.status(201).send({ msg: "User Registration Successful" })
    } catch (error) {
        console.log('/user/register: ', err.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

// user login -------->
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await UserModel.findOne({ email });;

        if (!userExists) return res.status(400).send({ msg: "User not exixts! Plaese register first" });

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

        if (!isPasswordCorrect) return res.status(400).send({ msg: "Incorrect Password!" });;

        const token = jwt.sign(
            { userId: userExists._id, role: userExists.role },
            process.env.JWT_LOGIN_SECRET,
            {
                expiresIn: "3h",
            }
        );

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        console.log('/user/login: ', err.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


// user logout------->
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
        const blacklisted = new BlacklistModel({ "token": token });
        await blacklisted.save();
        console.log('logout successful')
        res.status(200).send({ msg: 'Logout Successful' });
    } catch (error) {
        console.log('/user/logout: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

// export module------->
module.exports = {
    register,
    login,
    logout
}