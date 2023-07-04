const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

//Reemplaza el new Bicicleta()
bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color : color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};



bicicletaSchema.methods.toString = function(){
    return 'code: ' + this.code + '\ncolor: ' + this.color;
};


bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb)
}

bicicletaSchema.statics.add = function(aBici, done){
    return this.create(aBici);
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);