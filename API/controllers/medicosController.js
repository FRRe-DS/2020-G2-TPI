const Medicos = require('../models/Medicos');

exports.registrarMedicos = async (req,res,next) =>{
    

    const medicos = new Medicos(req.body);

    try {
        await medicos.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"Los medicos se agregaron correctamente"});
    } catch (error) {
        console.log(error);
        next();
    }
}

//cuando obtengo los medicos


exports.getMedicos = async(req,res,next) =>{
    try {
        const medicos = await Medicos.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(medicos);
    } catch (error) {
        console.log(error);
        next();
    }
}
