const Recursos = require('../models/Recursos');


//SOLO AL PRINCIPIO, TOCAS DE VUELTA ESTE METODO Y ROMPES TODO
//TENEMOS QUE USAR UN METODO PARA ACTUALIZAR EL UNICO ELEMENTO DE LA COLECCION



exports.registrarRecursos = async (req,res,next) =>{
    
    const recursos = new Recursos(req.body);
    
    try {
        await recursos.save();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({mensaje:"Los recursos se agregaron correctamente"});
    } catch (error) {
        console.log(error);
        next();
    }
}

//cuando obtengo las Recursos


exports.getRecursos = async(req,res,next) =>{
    try {
        recursos = await Recursos.find({});
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(recursos);
        
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarRecursos = async (envioActual,req,res,next)=>{
    try{
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
    console.log(nuevosRecursos);
    console.log(recursos[0].Recursos);
    await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false} ,(err, result) => {
        console.log('entreeeeeeeeeee');
        if(err){
            res.send(err)
        } else{
            // res.json({mensaje:"Recursos actualizados"});
        }
    }); 
    // res.json({mensaje:"Los recursos se actualizaron correctamente"});
    

    
    
    }
    catch (error){
        console.log(error);
        next();
    }
    
}
