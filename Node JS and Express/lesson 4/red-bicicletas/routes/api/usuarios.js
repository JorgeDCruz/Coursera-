const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuarios_list);
router.post('/create', usuarioController.usuarios_create);
router.post('/reservar', usuarioController.usuarios_reservar);

module.exports = router;