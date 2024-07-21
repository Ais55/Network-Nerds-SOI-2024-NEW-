import express from "express";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/Student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        let role = "guest";
        let tryAdmin = await Admin.findOne({ username });
        if (tryAdmin) role = "admin";
        else {
            let tryStudent = await Student.findOne({ username });
            if (tryStudent) role = "student";
        }
        if (role === "admin") {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.json({ message: "admin not registered" });
            }
            const validPassword = await bcrypt.compare(
                password,
                admin.password
            );
            if (!validPassword) {
                return res.json({ message: "wrong password" });
            }
            const token = jwt.sign(admin.id, process.env.Admin_Key);
            res.cookie("token", token);
            return res.json({ login: true, role: "admin" });
        } else if (role === "student") {
            const student = await Student.findOne({ username });
            if (!student) {
                return res.json({ message: "student not registered" });
            }
            const validPassword = await bcrypt.compare(
                password,
                student.password
            );
            if (!validPassword) {
                return res.json({ message: "wrong password " });
            }
            const token = jwt.sign(student.id, process.env.Student_key);
            res.cookie("token", token);
            return res.json({ login: true, role: "student" });
        } else {
        }
    } catch (er) {
        res.json(er);
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin" });
    } else {
        jwt.verify(token, process.env.Admin_Key, async (err, decoded) => {
            const admin = await Admin.findById(new mongoose.Types.ObjectId(decoded))
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.username = admin.username;
                req.role = "admin";
                req.userId = decoded
                next();
            }
        });
    }
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" });
    } else {
        jwt.verify(token, process.env.Admin_Key, async (err, decoded) => {
            if (err) {
                jwt.verify(
                    token,
                    process.env.Student_Key,
                    async (err, decoded) => {
                        if (err) {
                            return res.json({ message: "Invalid token" });
                        } else {
                            const student = await Student.findById(
                                new mongoose.Types.ObjectId(decoded)
                            );
                            if (!student) {
                                return res.json({ message: "Invalid User" });
                            }
                            // console.log(decoded)
                            req.username = student.username;
                            req.role = "student";
                            req.userId = decoded;
                            next();
                        }
                    }
                );
            } else {
                const admin = await Admin.findById(
                    new mongoose.Types.ObjectId(decoded)
                );
                if (!admin) {
                    return res.json({ message: "Invalid User" });
                }
                req.username = decoded.username;
                req.role = "admin";
                req.userId = decoded;
                next();
            }
        });
    }
};

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin, verifyUser };
