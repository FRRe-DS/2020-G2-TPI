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

exports.generarMedicosRandom = async(req,res,next) =>{
    
    // query
    const medicos = await Medicos.find({});

    console.log(medicos[0].Medicos); 

    let nuevosMedicos = new Medicos();

    medicos[0].Medicos.forEach(medico => {
        // console.log(medico)
        // generamos entre 0 y 5 medicos
        // var random = Math.round(Math.random() * (maximo - minimo) + minimo);
        var cantidadMedicosNuevos = Math.round(Math.random() * 5);
        medico.cantidad =  medico.cantidad + cantidadMedicosNuevos
    });

    nuevosMedicos.Medicos = medicos[0].Medicos

    // console.log(nuevosMedicos.Medicos); 

    try {
        await Medicos.deleteOne({});
        await nuevosMedicos.save();
        res.json({mensaje:"Medicos generados"});

    } catch (error) {
        console.log(error);
        next();
    }

}
