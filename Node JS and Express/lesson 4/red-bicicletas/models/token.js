const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    _userId: {
        //Hacemos referencia al schema de usuario para poder utilizarlo junto al token
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    token: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }
});

module.exports = mongoose.model('Token', tokenSchema);