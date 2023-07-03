const express = require('express');
const router = express.Router();
const bicicletaController = require('../../controllers/api/bicicletaControllerAPI');    

router.get('/', bicicletaController.Bicicleta_list);
router.post('/create', bicicletaController.bicicletas_create);
router.delete('/delete', bicicletaController.bicicletas_delete);
router.post('/update', bicicletaController.bicicletas_update);

module.exports = router;
