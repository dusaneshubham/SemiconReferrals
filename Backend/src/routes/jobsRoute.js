const express = require('express');
const router = express.Router();
const { getJobDetails } = require('../controllers/jobController.js');
const verifyToken = require("../middleware/verifyToken");

router.post("/getJobDetails", verifyToken, getJobDetails);

module.exports = router;