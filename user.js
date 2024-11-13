const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide'],
    },
    age: {
        type: Number,
        required: [true, 'L\'âge est requis'],
    },
});

// Créer le modèle basé sur le schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
