const express = require('express');
const router = express.Router();
const {
    login,
    crearcuenta,
    olvidepass,
    reserva
} = require('../controllers/authControllers');

router.get('/login',login);
router.get('/crearcuenta',crearcuenta);
router.get('/olvidepass',olvidepass);
router.post('/reserva',reserva);

module.exports = router;