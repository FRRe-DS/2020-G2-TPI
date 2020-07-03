const Peticion = require('../models/Peticion');
const Validacion = require('../validacion/peticionValidator')
const Medico = require('../models/Medicos');
const mongoose = require('mongoose');

// exports.nuevaPeticion = (req,res,next) =>{

exports.nuevaPeticion = async (req,res,next) =>{  

    // validaciones de medicos
    let medicosvalidos = true;
    const peticion = new Peticion(req.body);
    let medicosPeticion = peticion.Peticion.medicos;
    const listaEspecialidades = ['medico-general','dentista','ginecologo','obstetrico','optometrista','cardiologo','psiquiatra','pediatra','fisioterapeuta','otorrinolaringologo','anestesiologo','radiologo','epidemiologo','dermatologo','ortopedista','psicologo','audiologo','toxicologo','patologo','patologo-forense','cirujano-general','cirujano-plastico','cirujano-cardiaco','cirujano-ortopedico','neurocirujano','cirujano-pediatrico','cirujano-trauma','cirujano-maxilofacial','electrocardiografo-tecnico','tecnico-laboratorio','tecnico-dental','tecnico-histologico','oftalmica-tecnico','tecnico-biomedico','tecnico-mri','tecnico-quirurgico','tecnico-radiologo','quiropractico','enfermero','neonatologo','endocrinologo','genetista','oncologo','kinesiologo']
    medicosPeticion.forEach((medicoPeticion, indexpeticion) => {
        
        if(listaEspecialidades.includes(medicoPeticion.especialidad) == false){
            medicosvalidos = false;
        }
    });

    // validaciones de hospitales
    Validacion.existeCentroHospitalario(req.body.Peticion.idCentro).then( async (existe) => {
        // validacion de medicos
        if (medicosvalidos){
            if(existe){
                try {
                    // agregados de campos 
                    req.body.Peticion.respondidaCompletamente = false;
                    req.body.Peticion.rechazada = false;
                    
                    // guardar en base de datos
                    await peticion.save();
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({mensaje:"La petición se agregó correctamente"});
                } catch (error) {
                    console.log(error);
                    next();
                }
            } else{
                res.json({mensaje:"idCentro NO válido"});
            }
        }else{
            res.json({mensaje:"Especialidad de medico invalida"});
        }
    })
}

// cuando obtengo las peticiones 
exports.obtenerPeticiones = async(req,res,next) =>{
    console.log(Math.round(Math.random() * (10 - 1) + 1));
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

exports.encontrarPeticionFecha= async(req,res,next) =>{
    try {
        const peticion = await Peticion.find({}).sort({createdAt:1});
        
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(peticion);
    } catch (error) {
        console.log(error);
        next();
    }
}