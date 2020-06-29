const Peticion = require('../models/Peticion');
const CentroHospitalario = require('../models/CentrosHospitalarios');


//cuando creo una nueva peticionaa

exports.nuevaPeticion = async (req,res,next) =>{

    // validacion del centro hospitalario 
    // PODRIA IR EN VALIDACIONES
    // console.log(req.body.Peticion.idCentro)

    // IMPORTANTE: asumimos que NO HAY IDs repetidos!!!!
    const centro = await CentroHospitalario.find({'idCentro': req.body.Peticion.idCentro})
    if(centro.length == 1){
        // console.log('ID VALIDO!')
    
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
        }else{
            // console.log('ID NOOO VALIDO!')
            res.json({mensaje:"idCentro NO válido"});
        }
}

// cuando obtengo las peticiones 
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
        const peticion = await Peticion.findById(req.body.idPeticion);
        console.log(peticion);
        peticion.Peticion.rechazada=true;
        console.log("PETICION ACTUALIZADA");
        console.log(peticion);

        //actualizo la peticion
        Peticion.findByIdAndUpdate(req.body.idPeticion, {"Peticion": peticion.Peticion}, {useFindAndModify: false} ,(err, result) => {
            if(err){
                res.send(err)
            } else{
                res.json({mensaje:"Peticion rechazada"});
            }
        })




    }catch(error){
        console.log(error);
        next();
    }
}