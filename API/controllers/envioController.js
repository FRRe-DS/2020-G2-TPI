const Envio = require('../models/Envios');

//crear un nuevo Envio

exports.nuevoEnvio = async(req,res,next) =>{
    const envio = new Envio(req.body);

    try{
        await envio.save();
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
        res.json(envios);
    }catch(error)
    {
        console.log(error);
        next();
    }
}