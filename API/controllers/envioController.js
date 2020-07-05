const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');
const Medico = require('../models/Medicos');
const Validacion = require('../validacion/envioValidator');
const {actualizarRecursos} = require('../controllers/recursosController');

const Recursos = require('../models/Recursos');

exports.nuevoEnvio = async(req,res,next) =>{
    
    
    //Esto debe ir primero para evitar conflictos CORS
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let recursosValidos=true
    let nuevos_medicos = new Medico();
    try{
        console.log(req.body)
        const envio = new Envio(req.body);
        const envioActual = req.body.Envio
        recursos=await Recursos.find({});
        for (const item in envioActual){
            //pregunta si la cantidad que quiero enviar de cada recurso es menor a lo que tengo disponible
            switch (item) {
                case "camillas":
                    if(recursos[0].Recursos.camillasDisponible<envioActual[item]){
                        recursosValidos=false;
                    }
                    break;
                case "jabonLitros":
                    if(recursos[0].Recursos.jabonLitrosDisponible<envioActual[item]){
                        recursosValidos=false;
                    }
                    break;
                case "barbijos":
                    if(recursos[0].Recursos.barbijosDisponible<envioActual[item]){
                        recursosValidos=false;
                    }
                    break;
                case "jeringas":
                    if(recursos[0].Recursos.jeringasDisponible<envioActual[item]){
                        recursosValidos=false;
                    }
                    break;
                case "cofias":
                    if(recursos[0].Recursos.cofiasDisponible<envioActual[item]){
                        recursosValidos=false;
                    }
                    break;
                case "medicos":
                    const medicos = await Medico.find({});
                    console.log("Medicos actuales en reserva")
                    console.log(medicos)
                    const listaMedicosMongo = medicos[0].Medicos
                    const listaMedicosEnvio = envioActual.medicos 
                   
                    nuevos_medicos.Medicos = medicos[0].Medicos
        
                    medicos[0].Medicos.forEach((element,index) =>{
                        for (let itemenvio in listaMedicosEnvio){
                            if (element.especialidad == listaMedicosEnvio[itemenvio].especialidad){
                                //puedo hacer el envio,me da el cuero
                                if (element.cantidad >= listaMedicosEnvio[itemenvio].cantidad){
                                    nuevos_medicos.Medicos[index].cantidad -= listaMedicosEnvio[itemenvio].cantidad
                                }
                                else{
                                    res.json({"message":"Medicos insuficientes"})
                                    recursosValidos=false;
                                    /*aca no deberia terminar la cosa? un return o algo asi?*/
                                }
                            }
                        }
                    });
                    await Medico.deleteOne({});
                    await nuevos_medicos.save();
                    
                default:
                    break;
            }
        }
        // recursos Validos empieza como true, si alguno de los campos que envio no cumple, se pone el flag a false
        
        if(recursosValidos){

             // envio tiene id peticion? 
             actualizarRecursos(envioActual);

             if(envioActual.hasOwnProperty("idPeticion")){   
                
                const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                // buscar peticion en base de datos
                Peticion.findById(envioActual.idPeticion, (error, peti) => {

                    if(peti){
                        //veo si la peticion no esta rechazada
                        if(peti.Peticion.hasOwnProperty('rechazada') == false){

                            // actualizar valores
                            for(var key in peti.Peticion){
                                if(peti.Peticion.hasOwnProperty(key)){

                                    if(recursos.includes(key) && envioActual[key] != undefined){
                                        peti.Peticion[key] -= envioActual[key]
                                        //evitar que los recursos sean negativos en la peticion
                                        if(peti.Peticion[key] <= 0)
                                        {
                                            peti.Peticion[key]=0;
                                        }
                                    }    
                                }
                            }
                            //actualizacion de medicos
                            for(var i in envioActual.medicos)
                            { 
                                for(var j in peti.Peticion.medicos)
                                {
                                    if (envioActual.medicos[i].especialidad===peti.Peticion.medicos[j].especialidad)
                                    {
                                        peti.Peticion.medicos[j].cantidad-=envioActual.medicos[i].cantidad;
                                        if(peti.Peticion.medicos[j].cantidad <= 0)
                                        {
                                            peti.Peticion.medicos[j].cantidad=0;
                                        }
                                    }
                                }
                            }
                            peti.Peticion.respondidaCompletamente = Validacion.isPeticionEmpty(peti.Peticion);
                            // actualizar en base de datos
                        Peticion.findByIdAndUpdate(envioActual.idPeticion, {"Peticion": peti.Peticion}, {useFindAndModify: false} ,(err, result) => {
                            if(err){
                                res.send(err)
                            } else{
                                res.json({mensaje:"Envio de prueba realizado"});
                            }
                        })
                        }else{
                            res.json({mensaje:"La peticion ya fue rechazada"})
                        }                  
        
                    } else{
                        // error, no existe la peticion en la base de datos
                        res.json({mensaje: error})
                    }
                })   
            } else {
                // guardar envio
                await envio.save();
                res.statusCode = 200;
                res.json({mensaje:"El envio se agrego correctamente"});
            }
        } else {
            res.json({mensaje:"No te dan los recursos papi"});
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