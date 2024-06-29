import express from 'express'
import {Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, password, roll, grade} = req.body;
    } catch(err) {
        return res.json({message: "Error in registering student"})
    }
})