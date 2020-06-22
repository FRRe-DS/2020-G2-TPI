const Stat = require('../models/Stat');
const Informes = require('../models/InformeHospitalAMinisterio');

exports.registrarNuevaEstadistica = async(req,res,next)=>
{
    //Primero, obtenemos los informes
    try{
        const informes = await Informes.find({});
        console.log(informes);
    }
    catch(error){
        console.log(error);
        next();
    }
    
    
}