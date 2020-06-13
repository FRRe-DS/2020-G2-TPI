const express = require('express');
const router = express.Router();
const peticionController = require('../controllers/peticionControllers');
const loginController = require('../controllers/loginController')
const informesController = require('../controllers/informesController');
const centrosHospitalariosController = require('../controllers/centrosHospitalariosController');
const envioController = require('../controllers/envioController');
const apiController = require('../controllers/apiController');
const recursosController = require('../controllers/recursosController');
const medicosController = require('../controllers/medicosController')
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

router.get('/apiDoc',apiController.enviar)

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


router.post('/CentrosHospitalarios',
centrosHospitalariosController.registerCentro
)
router.get('/CentrosHospitalarios',
centrosHospitalariosController.getCentros
)

router.post('/Informes',
informesController.registrarInforme
)

router.get('/Informes',
informesController.getInforme
)

router.post('/Recursos',
recursosController.registrarRecursos
)

router.get('/Recursos',
recursosController.getRecursos
)

router.post('/Medicos',
medicosController.registrarMedicos
)

router.get('/Medicos',
medicosController.getMedicos
)

module.exports = router;
