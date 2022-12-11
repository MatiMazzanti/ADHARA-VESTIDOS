const express = require('express');
const router = express.Router();
const {
    login,
    crearcuenta,
    olvidepass,
    reserva,
    register
} = require('../controllers/authControllers');

router.get('/login',login);
router.get('/crearcuenta',crearcuenta);
router.get('/olvidepass',olvidepass);
router.post('/reserva',reserva);
router.post('/alta',register);


module.exports = router;