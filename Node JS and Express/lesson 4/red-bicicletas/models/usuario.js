const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const Reserva = require('./reserva');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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

usuarioSchema.pre('save', (next) => {
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validatePassword = (given_password) => {
    return bcrypt.compareSync(given_password, this.password);
};

usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb){
    const reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta});
    return reserva.save();
    
}

module.exports = mongoose.model('Usuario', usuarioSchema);