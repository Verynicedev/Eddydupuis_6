// Package de cryptage de MDP //
const bcrypt = require('bcrypt');
// Package qui permet la création d'un token aléatoire //
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');

const User = require('../models/User');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(10)                                   // Minimum length 10
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.has().symbols();                               // Must have symbols


// Enregistrement d'un nouvel utilisateur //
exports.signup = (req, res, next) =>  {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(401).json({
          message:
            "Le mot de passe doit avoir 10 caractères minimum et contenir 1 chiffre, 1 minuscule, 1 majuscule, un symbole et aucun espace !",
        });
      }    
    // Crypte le MDP //
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Créer un nouvel user avec l'adresse mail et le MDP crypté de la requête //
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Enregistre l'utilsateur dans la BDD //
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion d'un utilisateur existant //
exports.login = (req, res, next) => {
    // Récupère l'utilisateur de la BDD qui correspond a l'adresse mail entrée
    User.findOne({ email: req.body.email })
    .then(user => {
        // Si pas de user, renvoi une erreur //
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        // Compare le MDP entré avec le celui de la BDD //
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // Si la comparaison n'est pas bonne, renvoi une erreur //
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                // Si les ID's sont bons, renvoi son user ID et un Token //
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};