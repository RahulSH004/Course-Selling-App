const {Router} = require('express');
const {Admin} = require('../models/admin.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const {JWT_ADMIN_PASSWORD} = require("../config_db/config.js");
const { adminMidlleware } = require('../middleware/admin.js');
const {courseModel} = require("../models/course.js");
const course = require('../models/course.js');


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

adminRouter.post("/courses", adminMidlleware ,async (req, res) => {
    const adminId = req.userId;
    const {title, description, imageurl,price} = req.body;
    await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageurl: imageurl,
        creatorId: adminId
    })
    res.json({
        message:"course created",
        courseId: course._id
    })

});

adminRouter.put("/courses", adminMidlleware, async (req, res) => {
    const adminId = req.userId;
    const {title, description, imageurl,price} = req.body;
    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
            title: title,
            description: description,
            imageurl: imageurl,
            price: price    
        }
    )  
    res.json({
        message: "course updated"
    })
});

adminRouter.get("/allcourses", adminMidlleware ,async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    });
    res.json({
        courses: courses
    })
});

module.exports = {
    adminRouter: adminRouter
}