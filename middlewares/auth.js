import jwt from'jsonwebtoken';
import User from '../models/Auth.js';
import ErrorResponse from '../utils/errorResponse.js';
import Token from "../models/Token.js";


const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")

    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        const blacklist = await Token.find({token : token})
        console.log(blacklist)
        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }
        if(blacklist.length!==0) {
            return next(new ErrorResponse("Not Authorised", 401));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new ErrorResponse("User Not Found", 401));
    }
};

export default protect