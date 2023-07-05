const Bicicleta = require('../../models/bicicleta');
const server = require('../../bin/www');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();


describe('Bicicleta API', () => {

    beforeEach((done) => {
        const mongoDB = process.env.MONGO_CONNECTION_STRING;
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('Connected to database');
        });
        done();
    })

    afterEach(function(done){
        Bicicleta.deleteMany({}).then(() => {
            done();
        });
    })

    describe('GET bicicletas /', () => {
        it('STATUS 200', async () => {
        
            //Request está obsoleto, alternativa utilizar axios
            await axios.get('http://localhost:3000/api/bicicletas').then((response) => {
                expect(response.status).toBe(200);
                expect(response.data.bicis.length).toBe(0);
            }); 
        });
    });

    describe('POST bicicletas /create', () => {
        it('STATUS 200', async () => {
            const a_bici = {"id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54};

            //Request está obsoleto, alternativa utilizar axios
            //El "then" reemplaza al done, ya que se ejecuta al momento de terminarse la petición
            await axios.post('http://localhost:3000/api/bicicletas/create', a_bici).then((response) => {
                expect(response.status).toBe(200);
                expect(response.data.bici.modelo).toBe(a_bici.modelo);
                expect(response.data.bici.ubicacion[0]).toBe(a_bici.lat);
                expect(response.data.bici.ubicacion[1]).toBe(a_bici.lng);
            });
        });
    });

    describe('DELETE bicicletas /delete', () => {
        it('STATUS 204', async () => {
            const target_code = {"code": 10}
            const a_bici = {"id": 10, "code": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54};

            await axios.post('http://localhost:3000/api/bicicletas/create', a_bici).then((response) => {
                //console.log(response.data)
                expect(response.status).toBe(200);
            });
            
            //Para los métodos delete debemos pasarle los datos a través de {data: your_json}, no funciona como el post y el get
            await axios.delete('http://localhost:3000/api/bicicletas/delete', {data: target_code}).then((response) => {
                expect(response.status).toBe(204)
            });

            await axios.get('http://localhost:3000/api/bicicletas').then((response) => {
                expect(response.data.bicis.length).toBe(0);
            }); 

        });
    });

    // describe('UPDATE bicicletas /update', () => {
    //     it('STATUS 200', async () => {
    //         expect(Bicicleta.allBicis.length).toBe(0);

    //         const a_bici = {'id': 1, 'color': 'verde', 'modelo': 'urbana', 'lat': 20.736963, 'lng': -103.435984};
    //         const modified_bici = {'id': 1, 'color': 'azul', 'modelo': 'montaña', 'lat': 20.736963, 'lng': -103.435984};
    //         const comparable_modified_bici = new Bicicleta(1, "azul", "montaña", [20.736963, -103.435984])

    //         await axios.post('http://localhost:3000/api/bicicletas/create', a_bici).then((response) => {
    //             expect(response.status).toBe(200);
    //             expect(Bicicleta.allBicis.length).toBe(1);
    //         });
            
    //         //Rqeuest está obsoleto, alternativa utilizar axios
    //         //El "then" reemplaza al done, ya que se ejecuta al momento de terminarse la petición
    //         await axios.post('http://localhost:3000/api/bicicletas/update', modified_bici).then((response) => {
    //             expect(response.status).toBe(200);
    //             expect(Bicicleta.allBicis[0]).toEqual(comparable_modified_bici);
    //         });
    //     });
    // });

});

