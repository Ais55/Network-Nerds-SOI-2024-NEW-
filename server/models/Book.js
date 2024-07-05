import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    book_id: {type: String},
    title: {type: String},
    description: {type:String},
    author: {type:String},
    genre: {type:String},
    department: {type:String},
    count: {type:Number},
    issued_books: {type: Number,default: 0},
    vendor: {type:String},
    vendor_id: {type:String},
    publisher: {type:String},
    publisher_id: {type:String},
    image_url: {type:String}
})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book}