const express = require('express');
const router = express.Router();
const { registerRecruiter, loginRecruiter } = require('../controllers/recruiterController');

// registration
router.post("/register/", registerRecruiter);
router.post("/login/", loginRecruiter);

module.exports = router;