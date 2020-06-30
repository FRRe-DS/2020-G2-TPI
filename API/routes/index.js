const express = require('express');
const router = express.Router();
const peticionController = require('../controllers/peticionControllers');
const loginController = require('../controllers/loginController')
const informesController = require('../controllers/informesController');
const centrosHospitalariosController = require('../controllers/centrosHospitalariosController');
const envioController = require('../controllers/envioController');
const apiController = require('../controllers/apiController');
const recursosController = require('../controllers/recursosController');
const medicosController = require('../controllers/medicosController');
const statController = require('../controllers/statController')

const ciudadController = require('../controllers/ciudadController');

router.get('/',(req,res)=>{
    console.log("Hola,probando");
    res.json({message:"mensaje escrito en consola"});
});


//Envios 
router.get('/envios',
    envioController.obtenerEnvios
    );

router.post('/envios', 
    envioController.nuevoEnvio)

//Api Documentation
// router.get('/apiDoc',apiController.enviar)

router.post('/pruebas',(req,res)=>{
    console.log(req.body);
    
    res.send(req.body);
})

router.post('/peticiones',
    peticionController.nuevaPeticion
)

router.get('/peticiones',
    peticionController.obtenerPeticiones
)

router.post('/login',
loginController.logUser
)

router.post('/register',
loginController.registerUser
)


router.post('/centrosHospitalarios',
centrosHospitalariosController.registerCentro
)

router.get('/centrosHospitalarios',
centrosHospitalariosController.getCentros
)

router.post('/informes',
informesController.registrarInforme
)

router.get('/informes',
informesController.getInforme
)

router.post('/recursos',
recursosController.registrarRecursos
)

router.post('/generarRecursos',
recursosController.generarRecursosRandom
)

router.get('/recursos',
recursosController.getRecursos
)

router.post('/medicos',
medicosController.registrarMedicos
)

router.get('/medicos',
medicosController.getMedicos
)

router.post('/generarMedicos',
medicosController.generarMedicosRandom
)

router.get('/rechazarPeticion',
peticionController.rechazarPeticion
)

router.get('/encontrarPeticion',peticionController.encontrarPeticionId)

router.get('/actualizarEstadisticas',statController.registrarNuevaEstadistica)

router.get('/stat',statController.obtenerTodasEstadisticas)

router.post('/stat',statController.agregarEstadistica)

router.post('/ciudad',ciudadController.nuevaCiudad)

router.get('/ciudad',ciudadController.getCiudad)

module.exports = router;
