const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },

    email: {
        type: String,
        required: true,
        min: 8
            // TODO : validation
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

adminSchema.methods = {
    authenticate: async function(password) {
        return await bcrypt.compare(password, this.hash_password);
    }
};

module.exports = mongoose.model('Admin', adminSchema);