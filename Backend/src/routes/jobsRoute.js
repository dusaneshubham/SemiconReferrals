const express = require('express');
const router = express.Router();
const { getJobDetails, getPendingJobs } = require('../controllers/jobController.js');

router.post("/getJobDetails", getJobDetails);
router.get("/getPendingJobs", getPendingJobs);

module.exports = router;