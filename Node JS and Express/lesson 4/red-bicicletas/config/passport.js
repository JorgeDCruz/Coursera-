const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    async(email, password, done)=>{
        await Usuario.findOne({email: email}).then((found_user) => {
            if(!found_user){
                return done(null, false, {message: 'Usuario incorrecto'});
            }else{
                if(!Usuario.validatePassword(found_user.password, password)){
                    return done(null, false, {message: 'Password incorrecto'});
                }
                return done(null, found_user);
            }
        }).catch((error) => {
            return done(error);
        });
    }
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