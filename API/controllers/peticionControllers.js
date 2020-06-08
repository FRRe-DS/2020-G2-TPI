const Peticion = require('../models/Peticion');


//cuando creo una nueva peticion


exports.nuevaPeticion = async (req,res,next) =>{
    const peticion = new Peticion(req.body);

    try {
        await peticion.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"La peticion se argego correctamente"});
    } catch (error) {
        console.log(error);
        next();
    }
}

//cuando obtengo las peticiones 


exports.obtenerPeticiones = async(req,res,next) =>{
    try {
        const peticiones = await Peticion.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(peticiones);
    } catch (error) {
        console.log(error);
        next();
    }
}