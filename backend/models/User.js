const mongoose = require('mongoose');

// Package pour la validation d'un mail unique //
const uniqueValidator = require('mongoose-unique-validator');

// Schéma d'un utilisateur type //
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);