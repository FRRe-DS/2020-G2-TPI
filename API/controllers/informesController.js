const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');

exports.registrarInforme = async (req,res,next) => {
    const nuevoInforme = new InformeHospitalMinisterio(req.body)
    try {
        console.log(req.body);
        await nuevoInforme.save(); 
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"El informe se guardo en la base"});
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

