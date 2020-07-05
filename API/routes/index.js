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
const validacionController = require('../controllers/validacionController')
router.get('/',(req,res)=>{
    console.log("Hola,probando");
    res.json({message:"mensaje escrito en consola"});
});


//Envios
// DOC STATUS: Complete 
router.get('/envios',
    envioController.obtenerEnvios
    );

// DOC STATUS: Complete
router.post('/envios', 
    envioController.nuevoEnvio)

//Api Documentation
// router.get('/apiDoc',apiController.enviar)

router.post('/pruebas',(req,res)=>{
    //console.log(req.body);
    
    res.send(req.body);
})
// DOC STATUS: Complete
router.post('/peticiones',
    peticionController.nuevaPeticion
)
// DOC STATUS: Complete
router.get('/peticiones',
    peticionController.obtenerPeticiones
)
// DOC STATUS: Complete
router.post('/login',
loginController.logUser
)
// DOC STATUS: Complete

// DOC STATUS: Complete
router.post('/register',
loginController.registerUser
)

// DOC STATUS: Complete
router.post('/centrosHospitalarios',
centrosHospitalariosController.registerCentro
)
// DOC STATUS: Complete
router.get('/centrosHospitalarios',
centrosHospitalariosController.getCentros
)
// DOC STATUS: Complete
router.get('/centroHospitalarioId',
centrosHospitalariosController.getCentroId
)
// DOC STATUS: Complete
router.post('/informes',
informesController.registrarInforme
)
// DOC STATUS: Complete
router.get('/informes',
informesController.getInforme
)
// DOC STATUS: Complete
router.post('/recursos',
recursosController.registrarRecursos
)
// DOC STATUS: Complete
router.post('/generarRecursos',
recursosController.generarRecursosRandom
)
// DOC STATUS: Complete
router.get('/recursos',
recursosController.getRecursos
)
// DOC STATUS: Complete
router.post('/medicos',
medicosController.registrarMedicos
)
// DOC STATUS: Complete
router.get('/medicos',
medicosController.getMedicos
)
// DOC STATUS: Complete
router.post('/generarMedicos',
medicosController.generarMedicosRandom
)
// DOC STATUS: Complete
router.get('/rechazarPeticion',
peticionController.rechazarPeticion
)
// DOC STATUS: Complete
router.get('/encontrarPeticion',
peticionController.encontrarPeticionId
)
// DOC STATUS: Complete
router.get('/actualizarEstadisticas',
statController.registrarNuevaEstadistica
)
// DOC STATUS: Complete
router.get('/stat',
statController.obtenerTodasEstadisticas
)
// DOC STATUS: Complete
router.post('/stat',
statController.agregarEstadistica
)
// DOC STATUS: Complete
router.get('/encontrarPeticion',
peticionController.encontrarPeticionId
)
// DOC STATUS: Complete
router.get('/encontrarPeticionesFecha',
peticionController.encontrarPeticionFecha
)
// DOC STATUS: Complete
router.get('/actualizarEstadisticas',statController.registrarNuevaEstadistica)
// DOC STATUS: Complete
router.get('/stat',statController.obtenerTodasEstadisticas)
// DOC STATUS: Complete
router.post('/stat',statController.agregarEstadistica)
// DOC STATUS: Complete
router.post('/ciudad',ciudadController.nuevaCiudad)
// DOC STATUS: Complete
router.get('/ciudad',ciudadController.getCiudad)


module.exports = router;
