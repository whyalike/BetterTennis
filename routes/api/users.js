const express = require('express');
const router = express.Router();
// Checks username is an email, password meets requirements, checks for errors
const { check, validationResult } = require('express-validator'); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // Get User model 

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); // Sends 400
    }
    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email: email });

        if (user) { // If user already exists
            return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
        }
        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',   // Image size
            r: 'pg',    // No naked people
            d: 'mm'     // Gives default image
        })

        user = new User({ // Instantiates a new user document
            name,
            email,
            avatar,
            password // Not encrypted yet
        });

        // Encrpt password using bcrypt
        const salt = await bcrypt.genSalt(10); // Does the hashing with 10 rounds
        // Anything that returns a promise needs to use await
        user.password = await bcrypt.hash(password, salt); // Creates hash and assigns to var

        await user.save(); // Save user to db

        // Return jsonwebtoken
        res.send('User registered')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
});

module.exports = router;