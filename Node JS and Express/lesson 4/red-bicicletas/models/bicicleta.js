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

//Las consulats básicas de Mongoose ya no aceptan callbacks, la alternativa es utilizar el "then"
bicicletaSchema.statics.allBicis = function(){
    return this.find({})
}

bicicletaSchema.statics.add = function(aBici){
    return this.create(aBici);
}

bicicletaSchema.statics.findByCode = function(aCode){
    return this.findOne({code: aCode});
}

bicicletaSchema.statics.removeByCode = function(aCode){
    return this.deleteOne({code: aCode});
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);