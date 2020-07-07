const Stat = require('../models/Stat');
const Informes = require('../models/InformeHospitalAMinisterio');
const TempStat = require('../models/TempStat')

exports.registrarNuevaEstadistica = async(req,res,next)=>
{

    try{
        const ultimoInforme = await Informes.find({impactadoEnEstadisticas:false}).sort({createdAt:-1}).limit(1)

        //El ultimo informe se muestra correctamente
        const copiaUltimaEstadistica = await Stat.find({}).sort({createdAt:-1}).limit(1)

        const nuevaEstadistica = new Stat();
        nuevaEstadistica.dataCiudades = copiaUltimaEstadistica[0].dataCiudades
        nuevaEstadistica.totales = copiaUltimaEstadistica[0].totales

        for(i in copiaUltimaEstadistica[0].dataCiudades)
        {
            if(copiaUltimaEstadistica[0].dataCiudades[i].nombreCiudad == ultimoInforme[0].nombreCiudad)
            {
                
                nuevaEstadistica.dataCiudades[i].cantidades.enfermos += ultimoInforme[0].resumenCasos.cantidadEnfermos
                nuevaEstadistica.dataCiudades[i].cantidades.recuperados += ultimoInforme[0].resumenCasos.cantidadCurados
                nuevaEstadistica.dataCiudades[i].cantidades.muertos += ultimoInforme[0].resumenCasos.cantidadMuertos
                nuevaEstadistica.totales.enfermos += ultimoInforme[0].resumenCasos.cantidadEnfermos
                nuevaEstadistica.totales.recuperados += ultimoInforme[0].resumenCasos.cantidadCurados
                nuevaEstadistica.totales.muertos += ultimoInforme[0].resumenCasos.cantidadMuertos
            }
        }
        

        ultimoInforme[0].impactadoEnEstadisticas = true
        await ultimoInforme[0].save()
        await nuevaEstadistica.save();
        res.json({"mensaje":"Success"})
    }
    catch(error){
        console.log(error);
        next();
    }
}

exports.agregarEstadistica = async(req,res,next)=>
{
    try{
        const estadistica = new Stat(req.body)
  
        try {
            await estadistica.save();
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({mensaje:"La estadistica se agregó correctamente"});
        } catch (error) {
            console.log(error);
            next();
        }
    }
    catch(error)
    {
        console.log(error);
        next();
    }
}

exports.obtenerTodasEstadisticas = async(req,res,next)=>{
    try{
        const stats = await Stat.find({})
        res.statusCode = 200;
        res.setHeader('content-type','applicatoin/json');
        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(stats);
    }catch(error)
    {
        console.log(error)
        next()
    }
}