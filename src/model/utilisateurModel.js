const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['site', 'backoffice'],
        default: 'site'
    },
    mustChangePassword: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);
