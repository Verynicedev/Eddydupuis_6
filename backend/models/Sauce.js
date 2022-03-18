const mongoose = require('mongoose');

// Schéma d'un objet type de notre base de donnée
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredient: { type: String, required: true },
  heat: { type: Number, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);