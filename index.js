const express = require("express");
const mongoose = require("mongoose");
require("./src/config/db");
const jsonwebtoken = require("jsonwebtoken");
const { userRouter } = require("./src/routes/user");
const {adminRouter} = require("./src/routes/admin");
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);





// user routes


app.listen(3000);