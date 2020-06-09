const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');

//crear un nuevo Envio

exports.nuevoEnvio = async(req,res,next) =>{
    const envio = new Envio(req.body);

    try{
        // verificar petición existe
        if(req.body.Envio.hasOwnProperty("idPeticion")){
            console.log('EN LA PETICIÓN EXISTE EN EL ENVIO')
            // buscar peticion en base de datos

            // si la encontramos, update 
        } else {
            console.log('EN LA PETICIÓN NO EXISTE EN EL ENVIO')
            // guardar envio
        }
        

        // guardar envio
        await envio.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"El envio se agrego correctamente"});
    }
    catch(error)
    {
        console.log(error);
        res.json(error);
        next();
    }
}

//obtener todos los envios

exports.obtenerEnvios = async(req,res,next)=>{
    try{
        const envios = await Envio.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(envios);
    }catch(error)
    {
        console.log(error);
        next();
    }
}