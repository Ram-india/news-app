const express = require('express');
const {registerUser, loginUser} = require('../controllers/authController');

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);   

// Exporting the router
module.exports = router;