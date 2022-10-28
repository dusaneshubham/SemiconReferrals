const express = require('express');
const router = express.Router();
const { registerCandidate } = require('../controllers/candidateController')

router.post("/register", registerCandidate);

module.exports = router;