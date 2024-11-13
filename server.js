const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Initialiser Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Route GET : récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route POST : ajouter un nouvel utilisateur
app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route PUT : éditer un utilisateur par ID
app.put('/api/users/:id', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route DELETE : supprimer un utilisateur par ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
