const Estadistica = require('../models/Estadisticas');

exports.registrarEstadisticas = async (req,res,next) =>{
    
    const estadistica = new Estadistica(req.body);

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

exports.getEstadisticas = async(req,res,next) =>{
    try {
        const estadisticas = await Estadistica.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(estadisticas);
    } catch (error) {
        console.log(error);
        next();
    }
}
