const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Routes for site users (read-only)
router.get('/articles', checkRole(['site', 'backoffice']), articleController.getAllArticles);
router.get('/article/:id', checkRole(['site', 'backoffice']), articleController.getArticle);

// Routes for backoffice users (CRUD)
router.post('/article', verifyToken, checkRole(['backoffice']), articleController.createArticle);
router.put('/article/:id', verifyToken, checkRole(['backoffice']), articleController.updateArticle);
router.delete('/article/:id', verifyToken, checkRole(['backoffice']), articleController.deleteArticle);

module.exports = router;
