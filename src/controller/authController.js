const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Importez le module crypto

const User = require('../model/utilisateurModel');

// Générer une clé secrète aléatoire
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Vérifier si le mot de passe est correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Générer le token JWT
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
