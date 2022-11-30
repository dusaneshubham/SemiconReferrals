const express = require('express');
const router = express.Router();
const { getJobDetails, getPendingJobs } = require('../controllers/jobController.js');
const verifyToken = require("../middleware/verifyToken");

router.post("/getJobDetails", verifyToken, getJobDetails);
router.get("/getPendingJobs", getPendingJobs);

module.exports = router;