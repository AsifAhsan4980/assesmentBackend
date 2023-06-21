import User from '../models/Auth.js'
import ErrorResponse from "../utils/errorResponse.js"
// const sendEmail = require("../utils/sendEmail");
import crypto from "crypto"
import _ from 'lodash'
import moment from "moment"

let jwtToken = null;

// @desc    Register user
const register = async (req, res) => {
    const {email} = req.body;
    console.log(req.body)

    let user = {};
    user = await User.findOne({email: email})
    console.log(user)
    if (user) return res.status(400).send({message: 'User already register!'})

    try {
        user = new User(_.pick(req.body, ['email', 'password']));
        await user.save();
        sendToken(user, 200, res);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        });
    }
};

// @desc    Login user
const login = async (req, res, next) => {

    console.log(req.body)

    const {email, password} = req.body;
    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        // Check that user exists by email
        const user = await User.findOne({email}).select("+password");

        if (!user) {
            res.status(401).send({message: 'User not found'})
            return next(new ErrorResponse("User not found", 401));
        }

        // Check that password match
        const isMatch = await user.matchPasswords(password);

        if (user.disabled === true) {
            res.status(401).send({message: 'Invalid credentials'})
            return next(new ErrorResponse("User does not exist!", 401));
        }
        if (!isMatch) {
            res.status(401).send({message: 'Invalid credentials'})
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        sendToken(user, 200, res);

    } catch (err) {
        next(err);
    }
};


const sendToken = (user, statusCode, res) => {
    const exp = moment().add(process.env.JWT_EXPIRE, 'days').unix()
    const token = user.getSignedJwtToken(exp);
    const {password, ...info} = user._doc;

    const expiryDate = new Date(Number(new Date()) + 31536000000);
    console.log(info)
    res.cookie('jwt', token, {
        expires: expiryDate,
        // secure:true,
        httpOnly: true,
    }).status(statusCode).json({success: true, ...info, token});
};




export default {
    register,
    login,
}