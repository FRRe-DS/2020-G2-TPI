const Recursos = require('../models/Recursos');


//SOLO AL PRINCIPIO, TOCAS DE VUELTA ESTE METODO Y ROMPES TODO
//TENEMOS QUE USAR UN METODO PARA ACTUALIZAR EL UNICO ELEMENTO DE LA COLECCION



exports.registrarRecursos = async (req,res,next) =>{
    
    const recursos = new Recursos(req.body);
    console.log(req.body);
    try {
        await recursos.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"Los recursos se agregaron correctamente"});
    } catch (error) {
        console.log(error);
        next();
    }
}

//cuando obtengo las Recursos


exports.getRecursos = async(req,res,next) =>{
    try {
        recursos = await Recursos.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(recursos);
        
    } catch (error) {
        console.log(error);
        next();
    }
}
