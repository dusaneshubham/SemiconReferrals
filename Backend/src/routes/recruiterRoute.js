const express = require('express');
const router = express.Router();
const { registerRecruiter, loginRecruiter, updatePassword } = require('../controllers/recruiterController');

// registration
router.post("/register/", registerRecruiter);
router.post("/login/", loginRecruiter);
router.post("/update-password", updatePassword);

module.exports = router;