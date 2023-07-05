const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
const Usuario = require('../../models/usuario');
const Reserva = require('../../models/reserva');
const bicicleta = require('../../models/bicicleta');
require('dotenv').config();

describe('Testing de usuarios', () => {
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
        Reserva.deleteMany({}).then(() => {
            Usuario.deleteMany({}).then(() => {
                Bicicleta.deleteMany({}).then(() => {
                    done();
                })
            })
        })
    })

    describe('Cuando un usuario reserva una bici', () => {
        it('debe existir la reserva', async () => {
            const usuario = new Usuario({nombre: 'Jorge'});
            await usuario.save();

            const bicicleta = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            await bicicleta.save();

            const hoy = new Date();
            const mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);

            await usuario.reservar(bicicleta.id, hoy, mañana);
            await Reserva.find({}).populate('bicicleta').populate('usuario').then((response) => {
                expect(response.length).toBe(1);
                expect(response[0].diasDeReserva()).toBe(2);
                expect(response[0].bicicleta.code).toBe(1);
                expect(response[0].usuario.nombre).toBe(usuario.nombre);
            })
        });
    });

})