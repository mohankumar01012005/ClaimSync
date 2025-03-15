const express = require('express');
const User = require('../models/User');
const router = express.Router();

// ✅ Hardcoded Insurer Credentials (Only One Insurer)
const DUMMY_INSURER = {
    name: 'Insurer Admin',
    email: 'insurer@gmail.com',
    password: '123456',
    role: 'insurer'
};

// ✅ Patient Signup (Only Patients Can Register)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new patient
    const newUser = new User({ name, email, password, role: 'patient' }); // Enforce 'patient' role
    await newUser.save();
    res.status(201).json({ message: 'Patient registered successfully',userData:newUser });
});

// ✅ Login (For Both Patients & Insurer)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // ✅ Check if the user is the hardcoded Insurer
    if (email === DUMMY_INSURER.email && password === DUMMY_INSURER.password) {
        return res.json({ login : true, message: 'Insurer Login Successful', role: DUMMY_INSURER.role });
    }

    // ✅ Check if the email exists in the database
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // ✅ Role-based Success Message
    if (user) {
        return res.json({ login:true, message: 'Patient Login Successful', role: user.role ,userData:user });
    } else {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }
});

module.exports = router;
