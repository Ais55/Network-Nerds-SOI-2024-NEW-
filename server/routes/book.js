import express from 'express'
import { Book } from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

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
            image_url} = req.body;
        
        const newbook = new Book({
            bookid: book_id, 
            title: title, 
            description: description, 
            author: author, 
            deaprtment: department, 
            count: count, 
            vendor: vendor, 
            vendor_id: vendor_id, 
            publisher: publisher, 
            publisher_id: publisher_id,
            image_url: image_url
        })
        await newbook.save()
        return res.json({added: true})
    } catch(err) {
        return res.json({message: "Error in adding Book"})
    }
})

export {router as bookRouter}