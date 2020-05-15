const Peticion = require('../models/Peticion');


//cuando creo una nueva peticion


exports.nuevaPeticion = async (req,res,next) =>{
    const peticion = new Peticion(req.body);

    try {
        await peticion.save();
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
        res.json(peticiones);
    } catch (error) {
        console.log(error);
        next();
    }
}