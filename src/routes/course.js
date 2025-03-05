const express = require("express");
const { Router } = express;
const courseRouter = Router();
const { Purchase } = require("../models/course.js");
const { Course } = require("../models/course.js");
const { userMidlleware } = require("../middleware/user.js");

courseRouter.post("/purchase", userMidlleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await Purchase.create({
        userId,
        courseId
    })
    res.json({
        message: "course purchased"
    })
});

courseRouter.get("/preview", async (req, res) => {
    const course = await Course.find({})

    res.json({
        course
    })
});

