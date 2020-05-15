const CentrosHospitalario = require('../models/CentrosHospitalarios');

exports.registerCentro = async(req,res,next) =>{
    const nuevoCentro = new CentrosHospitalario(req.body);
    try {
        console.log(req.body);
        await nuevoCentro.save();
        res.json({mensaje:req.body});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getCentros = async(req,res,next) =>{
    try {
        const CentrosHospitalarios = await CentrosHospitalario.find({});
        res.json({CentrosHospitalarios});
    } catch (error) {
        console.log(error);
        next();
    }
}