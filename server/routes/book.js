import express from 'express';
import { Book } from '../models/Book.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

// Add a new book
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const {
            book_id, 
            title, 
            description, 
            author, 
            department, 
            count, 
            vendor, 
            vendor_id, 
            publisher, 
            publisher_id,
            image_url,
            genre
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
            image_url
        });
        
        await newBook.save();
        return res.json({ added: true });
    } catch (err) {
        return res.json({ message: "Error in adding Book" });
    }
});

// Get all books or search by query
router.get('/books', async (req, res) => {
    const { search } = req.query;
    try {
        let books;
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
            books = await Book.find({
                $or: [
                    { title: searchRegex },
                    { department: searchRegex },
                    { author: searchRegex },
                    { book_id: searchRegex }
                ]
            });
        } else {
            books = await Book.find();
        }
        return res.json(books);
    } catch (err) {
        return res.json(err);
    }
});

// Update a book by id
router.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        return res.json({ updated: true, book: updatedBook });
    } catch (err) {
        return res.json(err);
    }
});

// Get a book by id
router.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        return res.json(book);
    } catch (err) {
        return res.json(err);
    }
});

// Delete a book by id
router.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            return res.json({ deleted: true, book: deletedBook });
        } else {
            return res.json({ message: "Book not found" });
        }
    } catch (err) {
        return res.json({ message: "Error in deleting Book" });
    }
});

export { router as bookRouter };
