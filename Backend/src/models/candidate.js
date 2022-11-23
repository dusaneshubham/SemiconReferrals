const mongoose = require("mongoose");
const { isEmail } = require('validator');

const candidateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 40
    },

    email: {
        type: String,
        required: true,
        minLength: 8,
        validate: [isEmail, "Invalid email"]
    },

    contactNumber: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, { timestamps: true })

// Hashing the password before saving into the database
// candidateSchema.pre("save", async function (next) {
//     if (!this.isModified("password"))
//         return next();

//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
// });

// candidateSchema.methods = {
//     authenticate: async function (password) {
//         return await bcrypt.compare(password, this.hash_password);
//     }
// };

module.exports = mongoose.model('Candidate', candidateSchema);