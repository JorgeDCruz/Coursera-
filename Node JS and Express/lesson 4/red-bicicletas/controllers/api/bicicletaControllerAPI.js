const Bicicleta = require('..//../models/bicicleta');

exports.Bicicleta_list = (req, res) => {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicletas_create = (req, res) => {
    const bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicletas_delete = (req, res) => {
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}

exports.bicicletas_update = (req, res) => {
    let corresponding_bici = Bicicleta.findById(req.body.id);
    corresponding_bici.id = req.body.id;
    corresponding_bici.color = req.body.color;
    corresponding_bici.modelo = req.body.modelo;
    corresponding_bici.ubicacion = [req.body.lat, req.body.lng];

    res.status(200).json({
        bicicleta: corresponding_bici
    });

}
