const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const schedule = require('node-schedule');
const JobPost = require('./models/jobPost');

const adminRoute = require('./routes/adminRoute');
const candidateRoute = require('./routes/candidateRoute');
const recruiterRoute = require('./routes/recruiterRoute');
const jobsRoute = require('./routes/jobsRoute');
const sendEmail = require('./middleware/sendEmail');
const verifyEmail = require('./middleware/verifyEmail');
const sendForgetPassMail = require('./middleware/sendForgetPassMail');
const verifyToken = require('./middleware/verifyToken');
const { getTokenData } = require('./controllers/commonController');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// updating status in jobpost after deadline surpasses
const job = schedule.scheduleJob('01 00 00 * * *', async() => {
    await JobPost.updateMany({
        applicationDeadline: {
            $lt: (new Date(new Date().setHours(00, 00, 00, 00))).toISOString()
        },
        status: "Approved"
    }, { isActive: false }, { new: true });
});

// resumes path
app.use("/resumes", express.static(path.join(__dirname, '/resumes/')));

// Defining Routes
app.use("/verify-token", verifyToken, getTokenData);
app.use("/verify-mail", verifyEmail);
app.use("/send-mail", sendEmail);
app.use("/send-forget-pass-mail", sendForgetPassMail);
app.use("/admin", adminRoute);
app.use("/candidate", candidateRoute);
app.use("/recruiter", recruiterRoute);
app.use("/jobs", jobsRoute);

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));