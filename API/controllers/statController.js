const Stat = require('../models/Stat');
const Informes = require('../models/InformeHospitalAMinisterio');
const TempStat = require('../models/TempStat')

exports.registrarNuevaEstadistica = async(req,res,next)=>
{
    //Primero, obtenemos los informes
    try{
        const informes = await Informes.find({impactadoEnEstadisticas:false});
        console.log("Cantidad de informes: "+informes.length)
        var i
        const tempStat = new TempStat({})
        console.log(typeof informes)
        console.log(typeof tempStat)
        for(i = 0; i < informes.length;i++)
        {
            tempStat.dataCiudades.push({})
            tempStat.dataCiudades[i].idCiudad=informes[i].idCiudad
        }
        console.log(tempStat)

    }
    catch(error){
        console.log(error);
        next();
    }
    
    
}