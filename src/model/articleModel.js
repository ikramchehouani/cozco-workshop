const mongoose = require('mongoose');

// Define the schema for quantity
const quantitySchema = new mongoose.Schema({
    packageType: {
        type: String,
        enum: ['16 bouteilles 1L', '32 bouteilles 50cl'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityType: {
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
        required: false
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Article', articleSchema);
