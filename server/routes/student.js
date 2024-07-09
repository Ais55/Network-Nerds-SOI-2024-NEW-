import express from 'express'
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();
import { verifyAdmin } from './auth.js';
import mongoose from 'mongoose';

router.post('/register', verifyAdmin, async (req, res) => {
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

// Get student dashboard information
router.get('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        console.log(studentId)
        const decoded = await jwt.verify(studentId, process.env.Student_key)
        const student = await Student.findById(new mongoose.Types.ObjectId(decoded));
        console.log(student)
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json({
            username: student.username,
            roll: student.roll,
            batch: student.batch
        });
    } catch (err) {
        console.log(err)
        return res.json({ message: "Error fetching student data" });
    }
});


export { router as studentRouter };
