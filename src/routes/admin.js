const {Router} = require('express');
const {Admin} = require('../models/admin.js');
const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = "ABC1234";
const bcrypt = require('bcrypt');
const adminRouter = Router();


adminRouter.post("/signup", async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    try{

        await Admin.create({
            email: email,
            password: hashpassword,
            firstname: firstname,
            lastname: lastname
        });
    }catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
    res.json({
        message: "Admin created successfully",
    })
});

adminRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const adminFound = await Admin.findOne({
            email: email
        })
        if(!adminFound){
            return res.json({
                message: "Invalid email or password"
            })
        }
        const passwordmatch = await bcrypt.compare(password, adminFound.password);
        if(passwordmatch){
            const token = jwt.sign({
                id: adminFound._id,
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

adminRouter.post("/courses", async (req, res) => {

});

adminRouter.put("/courses/:courseid", async (req, res) => {

});

adminRouter.get("/courses", async (req, res) => {

});

module.exports = {
    adminRouter: adminRouter
}