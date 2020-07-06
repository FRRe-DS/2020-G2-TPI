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

        const arregloRecursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"]
        
        arregloRecursos.forEach(recurso => {
            if(!envioActual.hasOwnProperty(recurso)){
                envioActual[recurso] = 0 
            }
        });

        const recursos = await Recursos.find({});
        const nuevosRecursos ={
        Recursos :{
        //aca esta el bug. Se estan restando valores que no existen y js es malisimo con esas cosas
        camillasDisponible : recursos[0].Recursos.camillasDisponible - envioActual.camillas,
        jabonLitrosDisponible : recursos[0].Recursos.jabonLitrosDisponible - envioActual.jabonLitros,
        alcoholLitrosDisponible :recursos[0].Recursos.alcoholLitrosDisponible - envioActual.alcoholLitros,
        barbijosDisponible : recursos[0].Recursos.barbijosDisponible - envioActual.barbijos,
        jeringasDisponible: recursos[0].Recursos.jeringasDisponible - envioActual.jeringas,
        cofiasDisponible : recursos[0].Recursos.cofiasDisponible - envioActual.cofias
        }
    }

    console.log(nuevosRecursos);

    console.log(res)
    
    try {
        await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false})
        res.json({mensaje:"Recursos actualizados"});
    } catch (error) {
        console.log(error)
        res.json({mensaje: error});
    }
    
    // await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false} ,(req, res, next) => {
    //     if(err){
    //         res.send(err)
    //     } else{
    //         res.json({mensaje:"Recursos actualizados"});
    //     }
    // }); 
    // res.json({mensaje:"Los recursos se actualizaron correctamente"});
    
    }
    catch (error){
        console.log(error);
        next();
    }
    
}

exports.generarRecursosRandom = async (req,res,next) =>{
    
    const recursos = await Recursos.find({});
    //var random = Math.round(Math.random() * (maximo - minimo) + minimo);
    
    const nuevosRecursos ={
        Recursos :{
            //camillas 10 - 50
            camillasDisponible : recursos[0].Recursos.camillasDisponible + Math.round(Math.random() * (40) + 10),
            //jabon 10.000 - 30.000
            jabonLitrosDisponible : recursos[0].Recursos.jabonLitrosDisponible + Math.round(Math.random() * (20000) + 10000),
            //alcohol 20.000 - 50.000
            alcoholLitrosDisponible :recursos[0].Recursos.alcoholLitrosDisponible + Math.round(Math.random() * (30000) + 20000),
            //barbijos 1.000 - 5.000
            barbijosDisponible : recursos[0].Recursos.barbijosDisponible + Math.round(Math.random() * (4000) + 1000),
            //jeringas 5.000 - 15.000
            jeringasDisponible: recursos[0].Recursos.jeringasDisponible + Math.round(Math.random() * (10000) + 5000),
            //cofias 1.000 - 5.000
            cofiasDisponible : recursos[0].Recursos.cofiasDisponible + Math.round(Math.random() * (4000) + 1000)
        }
    }

    try {
        await Recursos.findOneAndUpdate({_id:'5ee3ee6e05f189bfb8d4a4a3'},nuevosRecursos, {useFindAndModify: false} ,(err, result) => {
            
            if(err){
                res.send(err)
            } else{
                res.json({mensaje:"Recursos generados"});
            }
        }); 
    } catch (error) {
        console.log(error);
        next();
    }
}