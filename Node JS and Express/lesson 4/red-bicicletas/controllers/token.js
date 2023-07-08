const Usuario = require('../models/usuario');
const Token = require('../models/token');
const usuarios = require('./usuarios');

module.exports = {
    confirmationGet: async(req, res, next) => {
        console.log("REQ: ", req.params.token)
        await Token.findOne({ token: req.params.token }).then((found_token) => {

            if(!found_token){
                return res.status(400).send({
                    type: 'not-verified',
                    msg: 'No se encontro un usuario con este token, es posible que el token este expirado'
                });
            };
            Usuario.findById(found_token._userId).then((found_user) => {
                if(!found_user){
                    return res.status(400).send({
                        msg: 'No se encontro un usuario con este token'
                    });
                };
                if(found_user.verificado){
                    return res.redirect('/usuarios');
                }

                found_user.verificado = true;
                found_user.save().then(() => {
                    res.redirect('/');
                }).catch((error) => {
                    return res.status(500).send({
                        msg: error.message
                    });
                });
            }).catch((error) => {

            })
        });
    }
}