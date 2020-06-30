const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');
const ciudades = require('../models/Ciudad');

exports.registrarInforme = async (req,res,next) => {
    const nuevoInforme = new InformeHospitalMinisterio(req.body);
    const ciudad = (await ciudades.find().limit(1))[0].Ciudades;
    var bool = false;
    
    ciudad.forEach(element => {
        if(element.idCiudad==nuevoInforme.idCiudad){
            bool = true;
        }
    });

    try {
        //console.log(req.body);
        if(bool){
            await nuevoInforme.save(); 
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({mensaje:"El informe se guardo en la base"});
        }      
    } catch (error) {
        console.log(error);
        next();
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

