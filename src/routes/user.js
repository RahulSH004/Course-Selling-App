const {Router} = require('express');
const {user} = require('../models/user.js');
const {Purchase} = require('../models/course.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = Router();
const {JWT_USER_PASSWORD} = require("../config_db/config.js");

userRouter.post("/signup", async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    try{
        await user.create({
            email: email,
            password: hashpassword,
            firstname: firstname,
            lastname: lastname
        })
    }catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
    res.json({
        message: "User created successfully",
    })

});

userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{

        const userFound = await user.findOne({
            email: email
        })
        if(!userFound){
            return res.json({
                message: "Invalid email or password"
            })
        }
        const passwordmatch = await bcrypt.compare(password, userFound.password);
        if(passwordmatch){
            const token = jwt.sign({
                id: userFound._id,
            },JWT_USER_PASSWORD);
            res.json({
                message: "Logged in successfully",
                token: token
            })
        }else{
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

});



userRouter.get("/purchases", async (req, res) => {
    const userId = req.userId;
    const purchases = await Purchase.find({
        userId,
    })
    let puschasecourseid = [];
    for(let i = 0; i < purchases.length; i++){
        puschasecourseid.push(purchases[i].courseId);
    }
    const courses = await Course.find({
        _id: {
            $in: puschasecourseid
        }
    })
    res.json({
        purchases: purchases,
        courses: courses
    })
});

module.exports = {
    userRouter: userRouter
}