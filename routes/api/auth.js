const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator'); 

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res)=> {
    // Using auth as our middleware makes our route protected
    try {
        // -password avoids us from returning the password 
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }  catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); // auth makes route protected

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() }); // Sends 400
    }
    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email: email });

        if (!user) { // If user already exists
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
        }

        // Make sure password matches
        const isMatch = await bcrypt.compare(password, user.password); // plain vs encrypted

        if (!isMatch) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
        }

        const payload = { // Create our payload
            user: {
                id: user.id // Don't need to do _id
            }
        }

        jwt.sign( // Create our JWT for the user
            payload, 
            config.get("jwtSecret"), // It needs to have some secret
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // 200 response
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }});

module.exports = router;