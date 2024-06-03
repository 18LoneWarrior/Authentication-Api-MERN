const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");


// Create user registration Api
router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body;
    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "Fill all the credentials" })
    }
    try {
        const preuser = await userdb.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "This Email Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });
            // Hashing the password before saving
            const storeData = await finalUser.save();
            res.status(201).json({ status: 201, storeData })
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});

// Create User Login Api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Missing Credentials" })
    }
    try {
        const userValid = await userdb.findOne({ email:email });
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(422).json({ error: "Invalid Credentials"})
            }else{
                // Generating JWT token for user login
                const token = await userValid.generateAuthToken();
                console.log(token);
                // cookie generate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {userValid, token}
                res.status(201).json({status:201,result})
            }
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("Catch Block");
    }
});

// User Validation before login.
router.get("/validate", authenticate ,async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({_id: req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
})

// User Logout Api
router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((current)=>{
            return current.token !== req.token
        });
        res.clearCookie("usercookie",{path:"/"});
        req.rootUser.save();
        res.status(201).json({status:201})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


module.exports = router