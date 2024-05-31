const mongoose = require('mongoose');

// Define the schema for quantity
const quantitySchema = new mongoose.Schema({
    packageType: {
        type: String,
        enum: ['16 bottles of 1L', '32 bottles of 50cl'],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the schema for articles
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: [quantitySchema],
        required: false 
    },
    photo: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Article', articleSchema);
