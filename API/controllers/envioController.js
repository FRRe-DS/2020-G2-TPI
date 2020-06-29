const Envio = require('../models/Envios');
const Peticion = require('../models/Peticion');
const Validacion = require('../validacion/envioValidator');
const {actualizarRecursos} = require('../controllers/recursosController');

const Recursos = require('../models/Recursos');
//crear un nuevo Envio

exports.nuevoEnvio = async(req,res,next) =>{
    const envio = new Envio(req.body);
    
    const envioActual = req.body.Envio
    //Esto debe ir primero para evitar conflictos CORS
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let recursosValidos=true
    try{
        console.log(envioActual.idCentro);
        recursos=await Recursos.find({});
        console.log(recursos[0].Recursos);
        for (const item in envioActual){
            //console.log("Item "+item);
            //console.log("Recurso "+recursos[0].Recursos[item]);
            //console.log("Envio "+envioActual[item]);
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
                default:
                    break;
            }
        }
        // recursos Validos empieza como true, si alguno de los campos que envio no cumple, se pone el flag a false
        
        
        
        
        
        // FALTA CONTROLAR LOS MEDICOS ACA ARRIBA 



        if(recursosValidos){
             // envio tiene id peticion? 

             console.log('estoy antes del metodo');
             actualizarRecursos(envioActual);

             if(envioActual.hasOwnProperty("idPeticion")){
                //console.log('LA PETICIÓN EXISTE EN EL ENVIO')
                
                
                // FALTA TRATAR MEDICOS!!!!!!
                const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
                
                // buscar peticion en base de datos
                Peticion.findById(envioActual.idPeticion, (error, peti) => {

                    if(peti){
                        
                        //console.log('EXISTE LA PETICION!')
                        //console.log('LA PETICIÓN ANTES DE REALIZAR EL ENVIO:')
                        //console.log(peti.Peticion)

                        // ACTUALIZAR LA PETICION
                        // actualizar valores
                        for(var key in peti.Peticion){
                            if(peti.Peticion.hasOwnProperty(key)){

                                if(recursos.includes(key) && envioActual[key] != undefined){
                                    //console.log('Se han enviado: '+ envioActual[key] + 'del recurso:' + key)
                                    peti.Peticion[key] -= envioActual[key]
                                    //evitar que los recursos sean negativos en la peticion
                                    if(peti.Peticion[key] <= 0)
                                    {
                                        peti.Peticion[key]=0;
                                    }
                                        
                                    //console.log('Falta enviar: ' + peti.Peticion[key] + 'del recurso ' + key)
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
                                    console.log(envioActual.medicos[i].especialidad);
                                    console.log(peti.Peticion.medicos[j].especialidad);
                                    peti.Peticion.medicos[j].cantidad-=envioActual.medicos[i].cantidad;
                                    if(peti.Peticion.medicos[j].cantidad <= 0)
                                    {
                                        peti.Peticion.medicos[j].cantidad=0;
                                    }
                                }
                            }
                        }
                        //peti.Peticion.respondidaCompletamente = peticionCompletada;
                        //console.log('LA PETICIÓN DESPUES DE REALIZAR EL ENVIO:')
                        //console.log(peti.Peticion)
                        peti.Peticion.respondidaCompletamente = Validacion.isPeticionEmpty(peti.Peticion);
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