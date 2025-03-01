const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstname: String,
    lastname: String,
})

const UserModel = model("User", userSchema);

module.exports = {
    User: UserModel
}