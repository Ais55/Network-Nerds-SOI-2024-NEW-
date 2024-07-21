import express from 'express'
import { Student } from '../models/Student.js';
import { Book_issue } from "../models/Book_issue.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();
import { verifyAdmin, verifyUser } from './auth.js';
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
router.get('/students/', verifyUser, async (req, res) => {
    try {
        const studentId = req.userId
        const student = await Student.findById(new mongoose.Types.ObjectId(studentId));
        // console.log(student)
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json({
            username: student.username,
            roll: student.roll,
            batch: student.batch,
            email: student.email
        });
    } catch (err) {
        console.log(err)
        return res.json({ message: "Error fetching student data" });
    }
});

router.get('/get-students',verifyAdmin, async (req, res) => {
    try {
        const students = await Student.find({}, '-password');
        console.log(students)
        res.status(200).json(students);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

router.get('/get-student/:id', verifyAdmin, async (req, res) => {
    try {
        const studentId = req.params.id
        const student = await Student.findById(new mongoose.Types.ObjectId(studentId));
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json({
            username: student.username,
            roll: student.roll,
            batch: student.batch,
            email: student.email
        });
    } catch (err) {
        console.log(err)
        return res.json({ message: "Error fetching student data" });
    }
})

router.put('/update-student/:id',verifyAdmin, async (req, res) => {
    const { roll, email, username, batch } = req.body;
    const { id } = req.params;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { roll, email, username, batch },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ updated: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/student/:id',verifyAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        await Book_issue.deleteMany({stud_ref: new mongoose.Types.ObjectId(id)})
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export { router as studentRouter };
