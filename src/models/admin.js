const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstname: String,
    lastname: String,
})

const AdminModel = model("Admin", adminSchema);
module.exports = {
    Admin: AdminModel
}