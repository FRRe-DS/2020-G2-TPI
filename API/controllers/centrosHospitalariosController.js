const CentrosHospitalario = require('../models/CentrosHospitalarios');

exports.registerCentro = async(req,res,next) =>{
    const nuevoCentro = new CentrosHospitalario(req.body);
    try {
        await nuevoCentro.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:req.body});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getCentros = async(req,res,next) =>{
    try {
        const CentrosHospitalarios = await CentrosHospitalario.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({CentrosHospitalarios});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getCentroId = async(req,res,next) =>{
    try {
        const CentroHospitalario = await CentrosHospitalario.find({'idCentro': req.query.idCentro});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({CentroHospitalario});
    } catch (error) {
        console.log(error);
        next();
    }
}