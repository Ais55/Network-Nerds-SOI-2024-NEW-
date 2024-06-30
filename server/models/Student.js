import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    roll: {type: String},
    email: {type:String},
    batch: {type:String},
    username: {type:String, required: true, unique: true},
    password: {type: String, required: true}
})

const studentModel = mongoose.model('Student', studentSchema)
export {studentModel as Student}