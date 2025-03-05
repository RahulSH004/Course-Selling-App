const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageurl: String,
    creatorid: ObjectId
})

const purchaseSchema = new Schema({
    courseid: ObjectId,
    userid: ObjectId,
    purchasedate: Date
})

const CourseModel = model("Course", courseSchema);
const PurchaseModel = model("Purchase", purchaseSchema);
module.exports = {
    Course: CourseModel,
    Purchase: PurchaseModel
}