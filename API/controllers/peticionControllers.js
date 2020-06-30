const Peticion = require('../models/Peticion');


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
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const peticion = await Peticion.findById(req.query.idPeticion);
        console.log(peticion);
        peticion.Peticion.rechazada=true;
        console.log("PETICION ACTUALIZADA");
        console.log(peticion);

        //actualizo la peticion
        Peticion.findByIdAndUpdate(req.query.idPeticion, {"Peticion": peticion.Peticion}, {useFindAndModify: false} ,(err, result) => {
            if(err){
                res.json({mensaje: "Peticion inexistente"})
            } else{
                res.json({mensaje:"Peticion rechazada"});
            }
        })




    }catch(error){
        console.log(error);
        next();
    }
}

exports.encontrarPeticionId= async(req,res,next) =>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req.query.idPeticion)
        const peticion = await Peticion.findById(req.query.idPeticion);
        console.log(typeof peticion)
        console.log(peticion)
        if(peticion == null)
        {
            res.json({"mensaje":"Peticion inexistente"})
        }
        else
        {
            res.json(peticion)
        }
    }catch(error)
    {
        console.log(error)
        next();
    }
}