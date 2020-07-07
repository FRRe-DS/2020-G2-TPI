const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');
const Medico = require('../models/Medicos');
const Validacion = require('../validacion/envioValidator');
// const {actualizarRecursos} = require('../controllers/recursosController');
const Recursos = require('../models/Recursos');

exports.nuevoEnvio = async(req,res,next) =>{
    
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;

    var mensajeRes = '';

    let recursosValidos=true
    let nuevos_medicos = new Medico();
    try{

        const envio = new Envio(req.body);
        const envioActual = req.body.Envio
        recursos=await Recursos.find({});
        for (const item in envioActual){
         
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

                    const listaMedicosMongo = medicos[0].Medicos
                    const listaMedicosEnvio = envioActual.medicos 
                    
                    nuevos_medicos.Medicos = medicos[0].Medicos
        
                    medicos[0].Medicos.forEach((element,index) =>{
                        for (let itemenvio in listaMedicosEnvio){
                            if (element.especialidad == listaMedicosEnvio[itemenvio].especialidad){
                          
                                if (element.cantidad >= listaMedicosEnvio[itemenvio].cantidad){
                                    nuevos_medicos.Medicos[index].cantidad -= listaMedicosEnvio[itemenvio].cantidad
                                }
                                else{
                                    recursosValidos=false;

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
 
        if(recursosValidos){

            try{
                const arregloRecursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                arregloRecursos.forEach(recurso => {
                    if(!envioActual.hasOwnProperty(recurso)){
                        envioActual[recurso] = 0 
                    }
                });
        
                const recursos = await Recursos.find({});
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
        

                await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false} ,(err, result) => {
                    if(err){
                        res.send(err)
                    } else{
                        mensajeRes = mensajeRes + "Recursos actualizados;"; 
                       
                    }
                }); 
                }
                catch (error){
                    console.log(error);
                    next();
                }

             // ----------------------------------------------

            if(envioActual.hasOwnProperty("idPeticion")){   
                
                const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                // buscar peticion en base de datos
                Peticion.findById(envioActual.idPeticion, (error, peti) => {

                    if(peti){
                        //veo si la peticion no esta rechazada
                        if(peti.Peticion.rechazada == false){

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
                
                        Peticion.findByIdAndUpdate(envioActual.idPeticion, {"Peticion": peti.Peticion}, {useFindAndModify: false} ,(err, result) => {
                            if(err){
                                res.send(err)
                            } else{
                            
                                mensajeRes = mensajeRes + "Envio de prueba realizado;"
                            }
                        })
                        }else{
                            mensajeRes = mensajeRes + " La peticion ya fue rechazada;"
                 
                        }                  
        
                    } else{

                        res.send(err)
                    }
                })   
            } else {
  
                await envio.save();
            
                mensajeRes = mensajeRes + "El envio se agrego correctamente;"
            }
            
        } else {
            mensajeRes = mensajeRes + "Recursos insuficientes;"            
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
        const envio = await Envio.findById(req.query.idEnvio);
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

