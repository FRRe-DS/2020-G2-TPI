const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');

//crear un nuevo Envio

exports.nuevoEnvio = async(req,res,next) =>{
    const envio = new Envio(req.body);

    const envioActual = req.body.Envio

    try{
        // envio tiene id peticion? 
        if(envioActual.hasOwnProperty("idPeticion")){
            console.log('EN LA PETICIÓN EXISTE EN EL ENVIO')
            
            // buscar peticion en base de datos
            const peticionActual = Peticion.findById(envioActual.idPeticion)

            // si la encontramos, update 
            if(peticionActual){
                // actualizar la peticion 

                // cambio de estado de peticion? 

            } else{
                // error, no existe la peticion en la base de datos
                res.json({mensaje: 'No existe la petición'})
            }
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