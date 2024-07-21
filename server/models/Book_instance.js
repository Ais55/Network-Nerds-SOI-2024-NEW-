import mongoose from "mongoose";

// Function to calculate the default return date
const calculateReturnDate = () => {
    const currentDate = new Date();
    const returnDate = new Date(currentDate);
    returnDate.setDate(currentDate.getDate() + 15); // Add 15 days to the current date
    return returnDate;
  };
  

  const book_instanceSchema = new mongoose.Schema({
    b_id: {type: String},
    issued: {type: Boolean, default: false},
    book_ref: {type: mongoose.Types.ObjectId, ref: 'Book', required: true},
    reserved: {type: Boolean, default: false},
    
    // issued_date: {type: Date, default: Date.now}, // Sets default date to the current date and time
    // return_date: {type: Date, default: calculateReturnDate} // Sets default return date to 15 days after the current date
  });

const book_instanceModel = mongoose.model('Book_instance', book_instanceSchema)
export {book_instanceModel as Book_instance}