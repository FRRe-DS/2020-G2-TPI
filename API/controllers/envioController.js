const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');
const Medico = require('../models/Medicos');
const Validacion = require('../validacion/envioValidator');
// const {actualizarRecursos} = require('../controllers/recursosController');
const Recursos = require('../models/Recursos');

exports.nuevoEnvio = async(req,res,next) =>{
    
    
    //Esto debe ir primero para evitar conflictos CORS
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;

    // var mensajeRes = '';

    let recursosValidos=true
    let nuevos_medicos = new Medico();

    try{
        // console.log(req.body)
        const envio = new Envio(req.body);
        const envioActual = req.body.Envio
        recursos = await Recursos.find({});
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
                case "alcoholLitros":
                    if(recursos[0].Recursos.alcoholLitrosDisponible<envioActual[item]){
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
                    // console.log("Medicos actuales en reserva")
                    // console.log(medicos)

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
        
        var mensajeRes = '';

        if(recursosValidos){
            console.log('Si hay suficientes recursos')
            mensajeRes = mensajeRes + "Si hay suficientes recursos;"
             // ACTUALIZAR RECURSOS
            try{

                const arregloRecursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                // cambiar NaN por 0
                arregloRecursos.forEach(recurso => {
                    if(!envioActual.hasOwnProperty(recurso)){
                        envioActual[recurso] = 0 
                    }
                });
        
                const recursos = await Recursos.find({});

                // nuevo objeto de recursos 
                const nuevosRecursos ={
                    Recursos :{
                        camillasDisponible : recursos[0].Recursos.camillasDisponible - envioActual.camillas,
                        jabonLitrosDisponible : recursos[0].Recursos.jabonLitrosDisponible - envioActual.jabonLitros,
                        alcoholLitrosDisponible :recursos[0].Recursos.alcoholLitrosDisponible - envioActual.alcoholLitros,
                        barbijosDisponible : recursos[0].Recursos.barbijosDisponible - envioActual.barbijos,
                        jeringasDisponible: recursos[0].Recursos.jeringasDisponible - envioActual.jeringas,
                        cofiasDisponible : recursos[0].Recursos.cofiasDisponible - envioActual.cofias
                        }
                    }

                    // actualizacion de los recursos en la base de datos
                    await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false} ,(err, result) => {
                        if(err){
                            console.log('hubo un error al intentar actualizar los recursos en la bd')
                            res.send(err)
                        } else{
                            console.log('recursos actualizados')
                            mensajeRes = mensajeRes + "Recursos actualizados;"; 
                            // res.json({mensaje:"Recursos actualizados"});
                        }
                    }); 
                } catch (error){
                    console.log('hubo un error al intentar actualizar los recursos (no solo en la bd)')
                    console.log(error);
                    next();
                }

             // la bd de recursos esta actualizada... 

            if(envioActual.hasOwnProperty("idPeticion")){   
                // es un envio asociado a una peticion

                const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                // buscar peticion en base de datos
                Peticion.findById(envioActual.idPeticion, (error, peti) => {

                    if(peti){
                        // veo si la peticion no esta rechazada
                        if(peti.Peticion.rechazada == false){
                            mensajeRes = mensajeRes + "la peticion no fue rechazada;"
                            // la peticion no fue rechazada

                            // actualizar valores de la peticion 
                            for(var key in peti.Peticion){
                                if(peti.Peticion.hasOwnProperty(key)){
                                    if(recursos.includes(key) && envioActual[key] != undefined){
                                        // a la peticion le restamos lo que le enviamos
                                        peti.Peticion[key] -= envioActual[key]

                                        // evitar que los recursos sean negativos en la peticion
                                        if(peti.Peticion[key] <= 0) { peti.Peticion[key] = 0; }
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

                            // si todos los campos de la peticion son 0, se respondió completamente
                            peti.Peticion.respondidaCompletamente = Validacion.isPeticionEmpty(peti.Peticion);

                            // actualizar peticion en base de datos
                            Peticion.findByIdAndUpdate(envioActual.idPeticion, {"Peticion": peti.Peticion}, {useFindAndModify: false} ,(err, result) => {
                                if(err){
                                    console.log('hubo un error, no se pudo actualizar la peticion en la bd')
                                    res.send(err)
                                } else{
                                    // res.json({mensaje:"Envio de prueba realizado"});
                                    console.log('Peticion actualizada en la base de datos')
                                    mensajeRes = mensajeRes + "Peticion actualizada en la base de datos;"
                                }
                            })

                        } else{
                            // la peticion fue rechaza, no es posible hacer un envio
                            console.log('la peticion ya fue rechazada')
                            mensajeRes = mensajeRes + " La peticion ya fue rechazada;"
                            // res.json({mensaje:"La peticion ya fue rechazada"})
                        }                  
        
                    } else{
                        // error, no existe la peticion en la base de datos
                        // res.send(" La peticion no existe en la base de datos;")
                        console.log('la peticion no existe en la base de datos');
                        mensajeRes = mensajeRes + " La peticion no existe en la base de datos;"
                        console.log(mensajeRes)
                    }
                })   
            } else {
                // guardar envio sin peticion
                await envio.save();
                // res.json({mensaje:"El envio se agrego correctamente"});
                console.log('el envio (sin peticion) se agrego correctamente')
                mensajeRes = mensajeRes + "El envio (sin peticion) se agrego correctamente;"
            }
            
        } else {
            // res.json({mensaje:"No te dan los recursos papi"});
            console.log('No hay suficientes recursos')
            mensajeRes = mensajeRes + "No hay suficientes recursos;"
            
        }      
        res.json({mensaje: mensajeRes}); 
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

exports.obtenerEnvioId = async(req,res,next)=>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req.query.idEnvio)
        const envio = await Envio.findById(req.query.idEnvio);
        console.log(typeof envio)
        console.log(envio)
        if(envio == null)
        {
            res.json({"mensaje":"Envio inexistente"})
        }
        else
        {
            res.json(envio)
        }
    }catch(error)
    {
        console.log(error);
        next();
    }
}

