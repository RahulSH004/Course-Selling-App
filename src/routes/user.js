const {Router} = require('express');

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {

});

userRouter.post("/login", async (req, res) => {

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