const fetch = require('node-fetch')
const Aburrido = require('../models/Aburrido')

exports.obtenerDatos= async(req,res,next) =>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        let respuesta = []
        for(let i = 0; i <= 2; i++){
            const datos = await fetch(`https://www.boredapi.com/api/activity?type=recreational`);
            const respuestaJSON = await datos.json();

            const bodyAburrido = {
                activity: respuestaJSON.activity,
                type: respuestaJSON.type,
                participants: respuestaJSON.participants
            }
            respuesta.push(bodyAburrido)
        }
        
        for(i = 0; i <= 2; i++){
            const nuevaActividad = new Aburrido(respuesta[i])
            await nuevaActividad.save()
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            // res.json({mensaje:"La nueva actividad fue cargada correctamente!"});
        }

        res.json({mensaje:"La nueva actividad fue cargada correctamente!"});


    } catch(error) {
        console.log(error)
        next();
    }
}