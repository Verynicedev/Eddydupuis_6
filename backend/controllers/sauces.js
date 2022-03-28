const Sauce = require('../models/Sauce');
const fs = require('fs');

// Ajout d'un objet dans la base de donnée //
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

// Modification d'un objet dans la base de donnée //
exports.modifySauce = (req, res, next) =>  {
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(()  =>  res.status(200).json({ message: 'Sauce modifié !'}))
        .catch(error  =>  res.status(400).json({ error }));
};

// Suppression d'un objet dans la base de donnée //
exports.deleteSauce = (req, res, next) => {
    // Sécurité qui empêche un utilisateur de supprimer les objets d'un autre utilisateur //
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Sauce non trouvé !')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                });
            }
        }
    );
    // Supprime l'image de la BDD quand l'objet est supprimé grace au package 'Multer' //
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id})
                    .then(()  =>  res.status(200).json({ message: 'Sauce supprimé !'}))
                    .catch(error  =>  res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error}));
};

// Récupération d'un objet spécifique par son ID, sur la page de l'objet en question  //
exports.getOneSauce = (req, res, next) =>  {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce =>  res.status(200).json(sauce))
        .catch(error  =>  res.status(404).json({ error }));
};

// Récupère les objets existants de la base de donnée (Tableau models/Sauce.js) //
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Définit le statut "like" sur une sauce
exports.likeSauce = (req, res, next) => {
    // Si l'utilisateur "like" pour la première fois la sauce ciblée, actualise le statut du "like" et intègre son userId dans usersLiked
    if(req.body.like === 1){
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId }
            }
        )
        .then(() => { res.status(201).json({ message: "Statut actualisé" }); })
        .catch(error => { res.status(400).json ({ error }); });
    }
    
    // Si l'utilisateur "dislike" pour la première fois la sauce ciblée, actualise le statut du "dislike" intègre son userId dans usersDisliked
    if(req.body.like === -1){
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId }
            }
        )
        .then(() => { res.status(201).json({ message: "Statut actualisé" }); })
        .catch(error => { res.status(400).json ({ error }); });
    }
    
    // Suppression des "like" / "dislike" si l'utilisateur rappuie sur le même bouton
    if(req.body.like === 0){
        Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            // Suppression du "like" si déjà existant ainsi que la suppression de l'userId de l'utilisateur dans userLiked
            if(sauce.usersLiked.find(user => user === req.body.userId)){
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                .then(() => { res.status(201).json({ message: "Statut actualisé" })})
                .catch(error => { res.status(400).json({ error }); });
            }
            // Suppression du "dislike" si déjà existant ainsi que la suppression de l'userId de l'utilisateur dans userDisliked
            if(sauce.usersDisliked.find(user => user === req.body.userId)){
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                .then(() => { res.status(201).json({ message: "Statut actualisé" })})
                .catch(error => { res.status(400).json({ error }); });
            }
        })
        .catch(error => { res.status(400).json ({ error }); });
    }
};