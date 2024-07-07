import express from 'express'
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

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
router.get('/studentdashboard', async (req, res) => {
    try {
        // Assuming you have a way to identify the logged-in student
        // e.g., using req.user.id if you're using some form of authentication middleware
        const studentId = req.user.id; 
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json({
            username: student.username,
            roll: student.roll,
            batch: student.batch
        });
    } catch (err) {
        return res.json({ message: "Error fetching student data" });
    }
});

export { router as studentRouter };
