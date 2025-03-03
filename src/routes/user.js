const {Router} = require('express');
const {user} = require('../models/user.js');
const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = "ABC123";
const bycrypt = require('bcrypt');
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const hashpassword = await bycrypt.hash(password, 10);
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
        const passwordmatch = await bycrypt.compare(password, userFound.password);
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

userRouter.get("/courses", async (req, res) => {

});

userRouter.post("/courses/:courseid", async (req, res) => {

});

userRouter.get("/purchased_courses", async (req, res) => {
    
});

module.exports = {
    userRouter: userRouter
}