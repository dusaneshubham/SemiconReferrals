const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const adminRoute = require('./routes/adminRoute');
const candidateRoute = require('./routes/candidateRoute');
const companyRoute = require('./routes/companyRoute');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Defining Routes
app.use("/admin", adminRoute);
app.use("/candidate", candidateRoute);
app.use("/company", companyRoute);

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => {
        console.log(err);
        // console.log("Database connection error")
    });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));