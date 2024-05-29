const Article = require('../model/articleModel');

// Controller function to get an article by ID
exports.getArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller function to get all articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// # Additional CRUD operations for backoffice #

// Create a new article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newArticle = new Article({ title, content, author });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const deletedArticle = await Article.findByIdAndDelete(articleId);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
