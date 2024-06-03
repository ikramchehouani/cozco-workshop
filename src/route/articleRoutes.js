const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Routes pour les utilisateurs du site (lecture seule)
router.get('/articles', articleController.getAllArticles);
router.get('/article/:id', articleController.getArticle);

// Routes pour les utilisateurs du backoffice (CRUD)
router.post('/article', verifyToken, checkRole(['backoffice']), articleController.createArticle);
router.put('/article/:id', verifyToken, checkRole(['backoffice']), articleController.updateArticle);
router.delete('/article/:id', verifyToken, checkRole(['backoffice']), articleController.deleteArticle);

module.exports = router;
