const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

                                                                                             // middleware multer '/backend/middleware/multer-config' // 
                                                                                             // middleware auth   '/backend/middleware/auth'          //
router.post('/', auth, multer, saucesCtrl.createSauce);    // Créer une sauce                // controller createThing  '/backend/controllers/sauces' //
router.put('/:id', auth, multer, saucesCtrl.modifySauce);  // Modifier une sauce             // controller modifyThing  '/backend/controllers/sauces' //
router.delete('/:id', auth, saucesCtrl.deleteSauce);       // Supprimer une sauce            // controller deleteThing  '/backend/controllers/sauces' //
router.get('/:id', auth, saucesCtrl.getOneSauce);          // Récupèrer une sauce ciblée     // controller getOneThing  '/backend/controllers/sauces' //
router.get('/', auth, saucesCtrl.getAllSauces);            // Récupèrer toutes les sauces    // controller getAllThings '/backend/controllers/sauces' //
router.post('/:id/like', auth, saucesCtrl.likeSauce);      // Actualiser le statut like      // controller likeSauce    '/backend/controllers/sauces' //

module.exports = router;