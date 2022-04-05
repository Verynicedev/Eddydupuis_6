// Middleware d'authentification afin de sécuriser les routes
const jwt = require('jsonwebtoken'); // Package qui sert a vérifier les tokens

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];          // Permet de récupérer un tableau avec les éléments "Bearer" & "Token"
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // Permet de vérifier le token et la clé secrète
      const userId = decodedToken.userId;                             // Si userId & token correspondent se connecte sinon retourne une erreur
      req.auth = { userId };                                          
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User ID non valable';
      } else {
          next();
      }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};