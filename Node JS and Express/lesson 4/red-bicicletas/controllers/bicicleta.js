const Bicicleta = require('../models/bicicleta');

//Renderizamos la vista con el listado de bicicletas actuales
exports.bicicleta_list = (req, res) => {
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis})
}

//Hay 2 instancias de la vista, cuando se renderiza y cuando se añade la bicicleta
exports.bicicleta_create_get = (req, res) => {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = (req, res) => {
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas')
}

exports.bicicleta_delete_post = (req, res) => {
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = (req, res) => {
    let corresponding_bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici: corresponding_bici});
}

exports.bicicleta_update_post = (req, res) => {
    let corresponding_bici = Bicicleta.findById(req.params.id);
    corresponding_bici.id = req.body.id;
    corresponding_bici.color = req.body.color;
    corresponding_bici.modelo = req.body.modelo;
    corresponding_bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas')
}