const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async(id, cb) => {
    await Usuario.findById(id).then((usuario) => {
        cb(null, usuario);
    })
});

module.exports = passport;