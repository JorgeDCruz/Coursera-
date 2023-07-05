const Usuario = require('../../models/usuario');

exports.usuarios_list = async(req, res) => {
    await Usuario.find({}).then((usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

exports.usuarios_create = async(req, res) => {
    const user = new Usuario({nombre: req.body.nombre});

    await user.save().then(() => {
        res.status(200).json({
            user
        })
    });
};

exports.usuarios_reservar = async(req, res) => {
    await Usuario.findById(req.body.id).then((resulting_user) => {
        console.log("User: ", resulting_user);
        
        resulting_user.reservar(req.body.bici_id, req.body.desde, req.body.hasta).then(() => {
            console.log("Reservado")
            res.status(200).send();
        })
    })
};