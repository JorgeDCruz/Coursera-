const Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

//Un prototipo permite añadir nuevos valores o atributos al constructor de un objeto
//Podemos verlo como añadirle funciones a un constructor
Bicicleta.prototype.toString = function(){
    return "id: " + this.id + "\ncolor" + this.color;
}


Bicicleta.allBicis = [];

Bicicleta.add = function(given_bicicleta){
    Bicicleta.allBicis.push(given_bicicleta);
}

Bicicleta.findById = function(given_id){
    const corresponding_bici = Bicicleta.allBicis.find(x => x.id == given_id);
    if(corresponding_bici){
        return corresponding_bici;
    }  
    else{
        throw new Error(`ID: ${given_id} not found in collection`);
    }
}

Bicicleta.removeById = function(given_id){
    for(let i = 0; i < Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == given_id){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

const a = new Bicicleta(1, 'rojo', 'urbana', [20.736963, -103.435984]);
const b = new Bicicleta(2, 'blanca', 'urbana', [20.734976, -103.435855]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;