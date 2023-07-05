const Bicicleta = require('../../models/bicicleta');

exports.Bicicleta_list = async(req, res) => {
    await Bicicleta.allBicis().then((response) => {
        res.status(200).json({
            bicis: response
        })
    })
}

exports.bicicletas_create = async (req, res) => {
    const bici = new Bicicleta({code: req.body.code, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]})
    await Bicicleta.add(bici).then((response) => {
        res.status(200).json({
            bici: response,
        })
    })
}

exports.bicicletas_delete = async(req, res) => {
    await Bicicleta.removeByCode(req.body.code).then((response) => {
        res.status(204).send();
    })
}

exports.bicicletas_update = async(req, res) => {
    await Bicicleta.findOneAndUpdate(
        {code: req.body.code},
        {color: req.body.color, modelo: req.body.modelo, lat: req.body.lat, lng: req.body.lng},
        {new: true}
    ).then((response) => {
        res.status(200).json({
            bicicleta: response
        });
    });
}
