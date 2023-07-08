const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

const Token = require('./token');
const mailer = require('../mailer/mailer');

const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingrese un email valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria'],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

//Añadimos la validación para que los emails sean únicos
usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validatePassword = function(given_password){
    return bcrypt.compareSync(given_password, this.password);
};

usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb){
    const reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta});
    return reserva.save();
    
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    console.log(token);
    token.save().then(() => {
        const mailOptions = {
            from: 'no-reply@red-bicicletas.com',
            to: email_destination,
            subject: 'Verificacion de Cuenta',
            text: 'Hola, \n\n' + 'Porfavor, para verificar su cuenta haga click en el link: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, (err) => {
            if(err){
                return console.log(err.message);
            }
            console.log('Verification email has been sent to ' + email_destination + '.');
        });

    }).catch((error) => {
        return console.log(error.message);
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema);