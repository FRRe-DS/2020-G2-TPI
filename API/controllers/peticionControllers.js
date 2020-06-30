const Peticion = require('../models/Peticion');
const mongoose = require('mongoose');


//cuando creo una nueva peticion

exports.nuevaPeticion = async (req,res,next) =>{
    
    // campo agregado para saber cuando esta completamente respondida
    req.body.Peticion.respondidaCompletamente = false;
    req.body.Peticion.rechazada = false;

    const peticion = new Peticion(req.body);

    try {
        await peticion.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"La petición se agregó correctamente"});
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

exports.rechazarPeticion = async(req,res,next) =>{
    try{
        
        if(mongoose.Types.ObjectId.isValid(req.query.idPeticion)){

            const peticion = await Peticion.findById(req.query.idPeticion);

            if(!peticion.Peticion.rechazada){
                // console.log(peticion);
                peticion.Peticion.rechazada=true;
                // console.log("PETICION ACTUALIZADA");
                // console.log(peticion);
        
                //actualizo la peticion
                Peticion.findByIdAndUpdate(req.query.idPeticion, {"Peticion": peticion.Peticion}, {useFindAndModify: false} ,(err, result) => {
                    if(err){
                        res.send(err)
                    } else{
                        res.json({mensaje:"Peticion rechazada"});
                    }
                })
            } else{
                res.json({mensaje:"La peticion ya ha sido rechazada anteriormente"});
            }
        } else{
            res.json({mensaje:"La petición no exite"});
        }
        
    }catch(error){
        console.log(error);
        next();
    }
}