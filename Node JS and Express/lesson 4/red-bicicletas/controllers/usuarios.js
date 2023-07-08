const Usuario = require('../models/usuario');

module.exports = {
    list: async(req, res, next) => {
        await Usuario.find({}).then((found_users) => {
            res.render('usuarios/index', {usuarios: found_users});
        });
    },
    update_get: async(req, res, next) => {
        await Usuario.findById(req.params.id).then((found_user) => {
            res.render('usuarios/update', {errors: {}, usuario: found_user});
        });
    },
    update: async(req, res, next) => {
        const updated_values = {nombre: req.body.nombre};
        await Usuario.findByIdAndUpdate(req.params.id, updated_values).then((usuario) => {
            res.redirect('/usuarios');
            return;
        }).catch((error) => {
            console.log(error);
            res.render('usuarios/update', {errors: error.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        });
    },
    create_get: (req, res, next) => {
        res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
    },
    create: async(req, res, next) => {  
        if(req.body.password != req.body.confirm_password){
            res.render('usuarios/create', {errors: {confirm_password: {message: 'Las passwords no coinciden'}}, nombre: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        }
        await Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password}).then((new_user) => {
            new_user.enviar_email_bienvenida();
            res.redirect('/usuarios');
        }).catch((error) => {
            console.log("ERROR: ", error);
            res.render('usuarios/create', {errors: error.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        });
    },
    delete: async(req, res, next) => {
        await Usuario.findByIdAndDelete(req.body.id).then(() => {
            res.redirect('/usuarios');
        }).catch((error) => {
            next(error);
        })
    }
}