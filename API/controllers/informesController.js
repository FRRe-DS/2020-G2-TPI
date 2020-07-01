const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');
const ciudades = require('../models/Ciudad');

exports.registrarInforme = async (req,res,next) => {


    // control de cantidades de tests realizados
    if(req.body.pruebasRealizadas.realizadas == (req.body.pruebasRealizadas.sinResultado + req.body.pruebasRealizadas.positivas +req.body.pruebasRealizadas.negativas)){

        const nuevoInforme = new InformeHospitalMinisterio(req.body);
        const ciudad = (await ciudades.find().limit(1))[0].Ciudades;
        var ciudadValida = false;
        
        // control de ciudad valida
        ciudad.forEach(element => {
            if(element.idCiudad==nuevoInforme.idCiudad){
                ciudadValida = true;
            }
        });

        try {
            if(ciudadValida){   
                await nuevoInforme.save(); 
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({mensaje:"El informe se guardo en la base"});
            } else{
                res.json({mensaje:"La ciudad NO es valida"});
            }     
        } catch (error) {
            console.log(error);
            next();
        }
    } else{
        res.json({mensaje:"Errores en las cantidades de tests realizados del informe"});
    }
} 

exports.getInforme = async(req,res,next) =>{
    try {
        const Informes = await InformeHospitalMinisterio.find({}); 
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({Informes})
    } catch (error) {
        console.log(error);
        next();
    }
}

