const {Router} = require('express');
const adminRouter = Router();
const {Admin} = require('../models/admin.js');


adminRouter.post("/signup", async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    

});

adminRouter.post("/login", async (req, res) => {

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