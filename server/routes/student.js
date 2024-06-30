import express from 'express'
import {Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, password, roll, batch, email} = req.body;
        const student = await Student.findOne({username})
        if(student) {
           return res.json({message: "student is registered"}) 
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newstudent = new Student({
            username: username,
            password: hashPassword,
            roll: roll,
            batch: batch,
            email:email
        })
        await newstudent.save()
        return res.json({registered: true})
    } catch(err) {
        return res.json({message: "Error in registering student"})
    }
})

export {router as studentRouter}