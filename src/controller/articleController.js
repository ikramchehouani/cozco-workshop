const Article = require('../model/articleModel');
const mongoose = require('mongoose');

// Get all articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single article by ID
exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new article
exports.createArticle = async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an article

exports.updateArticle = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        if (req.body.title) article.title = req.body.title;
        if (req.body.content) article.content = req.body.content;
        if (req.body.author) article.author = req.body.author;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        res.json({ message: 'Article deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
