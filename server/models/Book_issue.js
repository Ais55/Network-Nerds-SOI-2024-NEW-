import mongoose from "mongoose";

const calculateReturnDate = () => {
    const currentDate = new Date();
    const returnDate = new Date(currentDate);
    returnDate.setDate(currentDate.getDate() + 15); // Add 15 days to the current date
    return returnDate;
  };
const book_issueSchema = new mongoose.Schema({
    stud_ref: {type: mongoose.Types.ObjectId, ref: 'Student', required: true},
    book_ref: {type: mongoose.Types.ObjectId, ref: 'Book', required: true},
    issued: {type: Boolean, default: false},
    issued_book_ref: {type: mongoose.Types.ObjectId, ref: 'Book_instance'},
    issued_date: {type: Date, default: Date.now}, // Sets default date to the current date and time
    return_date: {type: Date, default: calculateReturnDate}, // Sets default return date to 15 days after the current date
    returned: {type: Boolean, default: false},
    // approved: {type: Boolean, default: false}
  });

  const book_issueModel = mongoose.model('Book_issue', book_issueSchema)
export {book_issueModel as Book_issue}