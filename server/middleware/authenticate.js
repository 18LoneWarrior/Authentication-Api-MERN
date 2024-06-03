const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");

const secret = process.env.SECRET_PHASE

const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, secret);
        const rootUser = await userdb.findOne({_id:verifyToken._id});
        if(!rootUser) {throw new Error("User not found!")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}

module.exports = authenticate