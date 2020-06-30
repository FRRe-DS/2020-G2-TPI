const Peticion = require('../models/Peticion');
const Medico = require('../models/Medicos');

//cuando creo una nueva peticion

exports.nuevaPeticion = async (req,res,next) =>{
    
    // campo agregado para saber cuando esta completamente respondida
    req.body.Peticion.respondidaCompletamente = false;
    req.body.Peticion.rechazada = false;
    let medicosvalidos = true;
    const peticion = new Peticion(req.body);
    let medicosPeticion = peticion.Peticion.medicos;
    const listaEspecialidades = ['medico-general','dentista','ginecologo','obstetrico','optometrista','cardiologo','psiquiatra','pediatra','fisioterapeuta','otorrinolaringologo','anestesiologo','radiologo','epidemiologo','dermatologo','ortopedista','psicologo','audiologo','toxicologo','patologo','patologo-forense','cirujano-general','cirujano-plastico','cirujano-cardiaco','cirujano-ortopedico','neurocirujano','cirujano-pediatrico','cirujano-trauma','cirujano-maxilofacial','electrocardiografo-tecnico','tecnico-laboratorio','tecnico-dental','tecnico-histologico','oftalmica-tecnico','tecnico-biomedico','tecnico-mri','tecnico-quirurgico','tecnico-radiologo','quiropractico','enfermero','neonatologo','endocrinologo','genetista','oncologo','kinesiologo']
    medicosPeticion.forEach((medicoPeticion,indexpeticion) => {
        
        if(listaEspecialidades.includes(medicoPeticion.especialidad) == false){
            medicosvalidos = false;
        }
       
    });
    if (medicosvalidos){
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
        res.json({mensaje:"Especialidad de medico invalida"});
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