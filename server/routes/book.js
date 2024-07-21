import express from "express";
import { Book } from "../models/Book.js";
import { verifyAdmin } from "./auth.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Book_instance } from "../models/Book_instance.js";
import { Book_issue } from "../models/Book_issue.js";
import { Student } from "../models/Student.js";
import { verifyUser } from "./auth.js";
const router = express.Router();

// Add a new book
router.post("/add", verifyAdmin, async (req, res) => {
    try {
        const {
            book_id,
            title,
            description,
            author,
            genre,
            department,
            count,
            vendor,
            vendor_id,
            publisher,
            publisher_id,
            image_url,
        } = req.body;

        const newBook = new Book({
            book_id,
            title,
            description,
            author,
            genre,
            department,
            count,
            vendor,
            vendor_id,
            publisher,
            publisher_id,
            image_url,
        });
        const existingBooks = await Book.find({ book_id });
        if (existingBooks.length > 0) {
            return res.json({ message: "Duplicate Book ID exists" });
        }
        const book = await newBook.save();
        for (let i = 0; i < count; ++i) {
            const b_id = book_id + "_" + String(i).padStart(3, "0");
            await Book_instance.create({ b_id, book_ref: book._id });
        }
        return res.json({ added: true });
    } catch (err) {
        return res.json({ message: "Error in adding Book" });
    }
});

// Get all books or search by query
router.get("/books", verifyUser, async (req, res) => {
    const { search } = req.query;
    // console.log(req.role)
    try {
        let books;
        let issuedBooks = [];
        if (search) {
            const searchRegex = new RegExp(search, "i"); // Case-insensitive search
            books = await Book.find({
                $or: [
                    { title: searchRegex },
                    { department: searchRegex },
                    { author: searchRegex },
                    { book_id: searchRegex },
                ],
            });
        } else {
            books = await Book.find();
        }
        if (req.role === "student") {
            const issuedBookObjects = await Book_issue.find({
                stud_ref: new mongoose.Types.ObjectId(req.userId),
                returned: false,
            });
            for (const book of issuedBookObjects) {
                issuedBooks.push({
                    id: book.book_ref.toString(),
                    issued: book.issued,
                    date: book.issued_date,
                });
            }
        }
        for (let i = 0; i < books.length; ++i) {
            const bookId = books[i]._id;
            const demandedCopies = await Book_issue.find({
                book_ref: bookId,
                issued: false,
                returned: false,
            });
            books[i].issued_books = Math.min(
                books[i].count,
                books[i].issued_books + demandedCopies.length
            );
        }
        return res.json({ books, role: req.role, issuedBooks });
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
});

// Update a book by id
router.put("/book/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const oldBook = await Book.findById(id);
        const oldCount = oldBook.count;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        const newCount = updatedBook.count;
        if (newCount > oldCount) {
            for (let i = 0; i < newCount - oldCount; i++) {
                const b_id =
                    updatedBook.book_id +
                    "_" +
                    String(oldCount + i).padStart(3, "0");
                await Book_instance.create({ b_id, book_ref: updatedBook._id });
            }
        } else if (newCount < oldCount) {
            for (let i = newCount; i < oldCount; i++) {
                const b_id =
                    updatedBook.book_id + "_" + String(i).padStart(3, "0");
                await Book_instance.deleteMany({ b_id });
            }
        }
        return res.json({ updated: true, book: updatedBook });
    } catch (err) {
        return res.json(err);
    }
});

// Get a book by id
router.get("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        return res.json(book);
    } catch (err) {
        return res.json(err);
    }
});

// Delete a book by id
router.delete("/book/:id", verifyAdmin, async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        await Book_instance.deleteMany({
            book_ref: new mongoose.Types.ObjectId(id),
        });
        await Book_issue.deleteMany({
            book_ref: new mongoose.Types.ObjectId(id),
        });
        // console.log(deletedBook);
        if (deletedBook) {
            return res.json({ deleted: true, book: deletedBook });
        } else {
            return res.json({ message: "Book not found" });
        }
    } catch (err) {
        console.log(err);
        return res.json({ message: "Error in deleting Book" });
    }
});

router.post("/issuebook/:id", verifyUser, async (req, res) => {
    const { id } = req.params;
    try {
        const studentId = new mongoose.Types.ObjectId(req.userId);
        const bookId = new mongoose.Types.ObjectId(id);
        const book_instance = await Book_instance.findOne({
            book_ref: bookId,
            issued: false,
            reserved: false,
        });
        // console.log(book_instance);
        if (!book_instance) {
            return res.json({ message: "Not available" });
        }
        // console.log(id);
        await Book_issue.create({
            stud_ref: studentId,
            book_ref: bookId,
            issued_book_ref: book_instance._id,
            issued: false,
            issued_date: Date.now(),
            returned: false,
            approved: false,
        });
        book_instance.reserved = true;
        await book_instance.save();
        res.json({ message: "Issue request sent to admin" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in issuing book" });
    }
});

router.delete("/issuebook/:id", verifyUser, async (req, res) => {
    const { id } = req.params;
    try {
        const studentId = new mongoose.Types.ObjectId(req.userId);
        const bookId = new mongoose.Types.ObjectId(id);
        const issue = await Book_issue.findOne({
            stud_ref: studentId,
            book_ref: bookId,
        });
        if (issue.issued)
            return res.status(400).json({ message: "Already Issued" });
        const book_instance = await Book_instance.findById(
            issue.issued_book_ref
        );
        book_instance.reserved = false;
        await book_instance.save();
        await Book_issue.deleteMany({ stud_ref: studentId, book_ref: bookId });
        res.json({ message: "Deleted issue request" });
    } catch (err) {
        console.log(err);
    }
});

router.get("/book-issues", verifyUser, async (req, res) => {
    try {
        // console.log(req)
        const approved = req.query.approved ? true : false;
        // console.log(approved)
        if (req.role === "admin" || req.role === "student") {
            let bookIssues = [];
            if (req.role === "admin") {
                if (!approved)
                    bookIssues = await Book_issue.find({
                        issued: false,
                        returned: false,
                    });
                else
                    bookIssues = await Book_issue.find({
                        $or: [{ issued: true }, { returned: true }],
                    });
            } else {
                bookIssues = await Book_issue.find({
                    stud_ref: new mongoose.Types.ObjectId(req.userId),
                });
            }
            const bookIssueRequests = [];
            // console.log(bookIssues)

            for (const bookIssue of bookIssues) {
                const student = await Student.findById(bookIssue.stud_ref);
                const bookInstance = await Book_instance.findById(
                    bookIssue.issued_book_ref
                );
                const book = await Book.findById(bookInstance.book_ref);

                bookIssueRequests.push({
                    username: student.username,
                    roll: student.roll,
                    title: book.title,
                    instance: bookInstance.b_id,
                    image_url: book.image_url,
                    id: bookIssue.id,
                    issued_date: bookIssue.issued_date,
                    returned: bookIssue.returned,
                    issued: bookIssue.issued,
                    return_date: bookIssue.return_date,
                });
            }
            res.json(bookIssueRequests);
        } else {
            throw new Error("Unauthorized");
        }
    } catch (err) {
        console.log(err);
    }
});
// Approve book issue

router.delete("/issue/:issueId", verifyAdmin, async (req, res) => {
    try {
        const { issueId } = req.params;
        await Book_issue.findByIdAndDelete(issueId)
        res.json({ message: "deleted" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error in deletion" });
    }
});
router.put("/approve-issue/:issueId", verifyAdmin, async (req, res) => {
    try {
        const { issueId } = req.params;
        const updatedIssue = await Book_issue.findByIdAndUpdate(
            issueId,
            { issued: true, issued_date: Date.now() },
            { new: true }
        );
        const book = await Book.findById(updatedIssue.book_ref);
        book.issued_books++;
        await Book_instance.findByIdAndUpdate(updatedIssue.issued_book_ref, {
            issued: true,
        });
        await book.save();
        res.json({ issued: true });
    } catch (err) {
        res.status(500).json({ message: "Error in approving book issue" });
    }
});
router.put("/returnedissue/:issueId", verifyAdmin, async (req, res) => {
    try {
        const { issueId } = req.params;
        const updatedIssue = await Book_issue.findByIdAndUpdate(
            issueId,
            { issued: false, returned: true, return_date: Date.now() },
            { new: true }
        );
        const book = await Book.findById(updatedIssue.book_ref);
        book.issued_books--;
        await Book_instance.findByIdAndUpdate(updatedIssue.issued_book_ref, {
            issued: false,
            reserved: false,
        });
        await book.save();
        res.json({ issued: true });
    } catch (err) {
        res.status(500).json({ message: "Error in approving book issue" });
    }
});

const calculateReturnDate = () => {
    const currentDate = new Date();
    const returnDate = new Date(currentDate);
    returnDate.setDate(currentDate.getDate() + 15);
    return returnDate;
};

// router.post("/book/issuebook/:bookId", async (req, res) => {
//     try {
//         const { bookId } = req.params;
//         const userId = req.user.id; // Assuming the user ID is available in req.user

//         // Create a new Book_instance
//         const bookInstance = new Book_instance({
//             b_id: bookId,
//             book_ref: bookId,
//             issued: true,
//             issued_date: new Date(),
//             return_date: calculateReturnDate(),
//         });

//         await bookInstance.save();

//         // Create a new Book_issue record
//         const bookIssue = new Book_issue({
//             stud_ref: userId,
//             book_ref: bookId,
//             issued: true,
//             issued_book_ref: bookInstance._id,
//             issued_date: new Date(),
//             return_date: calculateReturnDate(),
//             returned: false,
//         });

//         await bookIssue.save();

//         res.status(200).json({ message: "Book issued successfully" });
//     } catch (error) {
//         console.error("Error issuing book:", error);
//         res.status(500).json({ message: error.message });
//     }
// });
// router.delete("/issuebook/:bookId", async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err);
//     }
// });
// Endpoint to fetch issued books details
// router.get("/issued-books", async (req, res) => {
//     try {
//         const issuedBooks = await Book_issue.find({ issued: true })
//             .populate("stud_ref", "username email")
//             .populate("book_ref", "title image_url")
//             .populate("issued_book_ref");

//         console.log("Fetched issued books:", issuedBooks); // Debugging log
//         res.status(200).json(issuedBooks);
//     } catch (error) {
//         console.error("Error fetching issued books:", error);
//         res.status(500).json({ message: error.message });
//     }
// });

export default router;
export { router as bookRouter };
