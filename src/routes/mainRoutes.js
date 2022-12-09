const express = require('express');
const router = express.Router();
const {
    home,
    galeria,
    preguntas
} = require('../controllers/mainControllers');

router.get('/',home);
router.get('/galeria',galeria);
router.get('/preguntas',preguntas);

module.exports = router;