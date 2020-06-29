const Ciudad = require('../models/Ciudad');

exports.nuevaCiudad = async(req,res,next) =>{
    const ciudad = new Ciudad(req.body);

    try {
        await ciudad.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"Las ciudades se agregaron correctamente"});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getCiudad = async(req,res,next) =>{
    try {
        const ciudad = await Ciudad.find({}).sort({nombreCiudad:1});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(ciudad);
    } catch (error) {
        console.log(error);
        next();
    }
}