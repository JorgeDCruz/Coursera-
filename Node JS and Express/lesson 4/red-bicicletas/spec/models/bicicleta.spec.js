const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
require('dotenv').config();

describe('Testing Bicicletas with Mongo: ', () => {
    beforeEach((done) => {
        const mongoDB = process.env.MONGO_CONNECTION_STRING;
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Connected to database');
        });
        done();
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}).then(() => {
            done();
        });
    })

    describe('Bicicleta.createInstance', ()=>{
        it('La lista esta vacia', (done) => {
            // Bicicleta.allBicis((err, bicis)=>{
            //     console.log(bicis);
            // })
            Bicicleta.allBicis().then((response) => {
                expect(response.length).toBe(0);
                done();
            });
        }); 
    });

    describe('Bicicleta.add', ()=>{
        it('Se agrega la bici', (done) => {
            const bici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(bici).then((res) => {
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe(bici.code)
                    done();
                })
            });            
        }); 
    });

});

// beforeEach(() => {
//     Bicicleta.allBicis = [];
// })

// describe('Bicicleta.allBicis', () => {
//     it('starts empty', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     })
// });

// describe('Bicicleta.add', () => {
//     it('add one', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         const a_bici = new Bicicleta(1, 'rojo', 'urbana', [20.736963, -103.435984]);
//         Bicicleta.add(a_bici);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(a_bici);
//     })
// });


// describe('Bicicleta.findById', () => {
//     it('finds corresponding bici with ID 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         const a_bici = new Bicicleta(1, 'verde', 'urbana');
//         const b_bici = new Bicicleta(2, 'rojo', 'montaña');
//         Bicicleta.add(a_bici);
//         Bicicleta.add(b_bici);

//         const target = Bicicleta.findById(1);
//         expect(target.id).toBe(1);
//         expect(target.color).toBe(a_bici.color);
//         expect(target.modelo).toBe(a_bici.modelo);
//     })
// });

// describe('Bicicleta.removeById', () => {
//     it('removes bici with id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         const a_bici = new Bicicleta(1, 'verde', 'urbana');
//         const b_bici = new Bicicleta(2, 'rojo', 'montaña');
//         Bicicleta.add(a_bici);
//         Bicicleta.add(b_bici);

//         expect(Bicicleta.allBicis.length).toBe(2);
        
//         Bicicleta.removeById(1);

//         expect(Bicicleta.allBicis.length).toBe(1);

//     })
// });
