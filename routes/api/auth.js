const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

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

module.exports = router;