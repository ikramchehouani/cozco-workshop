const Commande = require('../model/commandeModel');
const Article = require('../model/articleModel');
const mongoose = require('mongoose');

// Créer une nouvelle commande
exports.createCommande = async (req, res) => {
    const { firstName, lastName, phoneNumber, address, comment, items } = req.body;

    try {
        let totalPrice = 0;
        const commandeItems = await Promise.all(items.map(async item => {
            const article = await Article.findById(item.articleId);
            const selectedPackage = article.quantity.find(q => q.packageType === item.packageType);
            if (!selectedPackage) {
                throw new Error(`Package type ${item.packageType} not found for article ${article.title}`);
            }

            const itemTotalPrice = selectedPackage.price * item.quantity;
            totalPrice += itemTotalPrice;

            selectedPackage.quantityType -= item.quantity;
            await article.save();

            return {
                articleId: item.articleId,
                packageType: item.packageType,
                quantity: item.quantity,
                totalPrice: itemTotalPrice
            };
        }));

        const newCommande = new Commande({
            firstName,
            lastName,
            phoneNumber,
            address,
            comment,
            items: commandeItems
        });

        await newCommande.save();
        res.status(201).json({ message: 'Commande created successfully', commandeId: newCommande._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Récupérer toutes les commandes
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid commande ID' });
    }

    try {
        const commande = await Commande.findById(req.params.id);
        if (!commande) return res.status(404).json({ message: 'Commande not found' });
        res.json(commande);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
