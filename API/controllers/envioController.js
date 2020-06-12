const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');

//crear un nuevo Envio
exports.nuevoEnvio = async(req,res,next) =>{
    const envio = new Envio(req.body);

    const envioActual = req.body.Envio
    //Esto debe ir primero para evitar conflictos CORS
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        // envio tiene id peticion? 
        if(envioActual.hasOwnProperty("idPeticion")){
            console.log('LA PETICIÓN EXISTE EN EL ENVIO')

            // FALTA TRATAR MEDICOS!!!!!!
            const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
            
            // buscar peticion en base de datos
            Peticion.findById(envioActual.idPeticion, (error, peti) => {

                if(peti){
                    console.log('EXISTE LA PETICION!')
                    console.log('LA PETICIÓN ANTES DE REALIZAR EL ENVIO:')
                    console.log(peti.Peticion)

                    // ACTUALIZAR LA PETICION
                    // actualizar valores
                    for(var key in peti.Peticion){
                        if(peti.Peticion.hasOwnProperty(key)){

                            if(recursos.includes(key) && envioActual[key] != undefined){
                                console.log('Se han enviado: '+ envioActual[key] + 'del recurso:' + key)
                                peti.Peticion[key] -= envioActual[key]
                                console.log('Falta enviar: ' + peti.Peticion[key] + 'del recurso ' + key)
                            }
                                 
                        }
                    }

                    console.log('LA PETICIÓN DESPUES DE REALIZAR EL ENVIO:')
                    console.log(peti.Peticion)

                    // actualizar en base de datos
                   Peticion.findByIdAndUpdate(envioActual.idPeticion, {"Peticion": peti.Peticion}, {useFindAndModify: false} ,(err, result) => {
                       if(err){
                           res.send(err)
                       } else{
                           res.json({mensaje:"Envio de prueba realizado"});
                       }
                   })
                    
                    // cambio de estado de peticion? 
                   // we pera
                    
    
                } else{
                    // error, no existe la peticion en la base de datos
                    res.json({mensaje: error})
                }
            })

            // si la encontramos, update 
            
        } else {
            console.log('LA PETICIÓN NO EXISTE EN EL ENVIO')
            // guardar envio
            // guardar envio
            await envio.save();
            res.statusCode = 200;
            
            res.json({mensaje:"El envio se agrego correctamente"});
        }
        

        
    }
    catch(error)
    {
        console.log(error);
        res.json(error);
        next();
    }
}

//obtener todos los envios

exports.obtenerEnvios = async(req,res,next)=>{
    try{
        const envios = await Envio.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(envios);
    }catch(error)
    {
        console.log(error);
        next();
    }
}