const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reserva = require('./reserva');

const usuarioSchema = new Schema({
    nombre: String
});

usuarioSchema.methods.reservar = function(biciID, desde, hasta, cb){
    const reserva = new Reserva({usuario: this._id, bicicleta: biciID, desde: desde, hasta: hasta});
    return reserva.save();
    
}

module.exports = mongoose.model('Usuario', usuarioSchema);