const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', multer, saucesCtrl.createSauce);    // Récupère les middleware auth, multer '/backend/middleware/auth', '/backend/middleware/multer-config' et controller createThing dans '/backend/controllers/stuff' //
router.put('/:id', multer, saucesCtrl.modifySauce);  // Récupère les middleware auth, multer '/backend/middleware/auth', '/backend/middleware/multer-config' et controller modifyThing dans '/backend/controllers/stuff' //
router.delete('/:id', saucesCtrl.deleteSauce);       // Récupère le middleware auth dans '/backend/controllers/auth' et le controller deleteThing  dans '/backend/controllers/stuff' //
router.get('/:id', saucesCtrl.getOneSauce);          // Récupère le middleware auth dans '/backend/controllers/auth' et le controller getOneThing  dans '/backend/controllers/stuff' //
router.get('/', saucesCtrl.getAllSauces);            // Récupère le middleware auth dans '/backend/controllers/auth' et le controller getAllThings dans '/backend/controllers/stuff' //

module.exports = router;