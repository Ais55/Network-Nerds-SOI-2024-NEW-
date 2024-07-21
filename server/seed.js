import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Admin } from './models/Admin.js';
import { Book_instance } from './models/Book_instance.js';
import './db.js';

async function AdminAccount() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash('aiswarya', 10);
            const newAdmin = new Admin({
                username: 'admin',
                password: hashPassword,
                email: "admin@gmail.com"
            });
            await newAdmin.save();
            console.log("Account created");
        } else {
            console.log("Account already existed");
        }
    } catch (err) {
        console.log("Error:", err);
    }
}

AdminAccount();
