const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

//user Registration

const registerUser = async (req, res) =>{
    try{
        const{name, email, password, role} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await User.create({
            name,
            email,
            password,
            role
        });
        res.status(201).json({ message: 'User registered successfully' });
    }catch(error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

// User Login

const loginUser = async(req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id,
              email: user.email,
              role: user.role,
              name: user.name
         },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN
             }
        );
        res.status(200).json({ token});
    }catch(error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

// Exporting the functions
module.exports = {
    registerUser,
    loginUser
};