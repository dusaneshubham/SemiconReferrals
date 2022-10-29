const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, logoutCandidate } = require('../controllers/candidateController')

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.get("/logout", logoutCandidate);

module.exports = router;