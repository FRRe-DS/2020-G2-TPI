const User = require('../models/User');


exports.logUser = async(req,res,next) =>{
    const log = new User(req.body);
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let sess;
    try {
        
        console.log(req.body.user);
        console.log(req.body.phash);
        const usuarios = await User.find({
             user: log.user, phash: log.phash 
        });
        console.log(usuarios);
        if(!usuarios.length){
            //the user doesnt exist
            res.json({mensaje:"El usuario no existe"});
        }else{
            
            sess = req.session

            sess.user = req.body.user
            

            res.json({mensaje:"Login exitoso"});
            return sess;

        }
        
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.registerUser = async(req,res,next) =>{
    const newUser = new User(req.body);
    try {
        const posiblesDuplicados= await User.find({

            user: req.body.user,phash:req.body.phash}
            
            );
            if(!posiblesDuplicados.length)
            {

                //el usuario no esta previamente registrado
                try{
                    await newUser.save();
                    res.json({mensaje:"Registro exitoso"});
                }
                catch(error)
                {
                    console.log(error);
                    next();
                }
            }
            else
            {
                res.json({mensaje:"El usuario ya existe"});
            }
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.logout = async(req,res,next)=>{
   
    let sess = req.session;
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(sess.user)
        {
            req.session.destroy((err) =>{
                if(err){
                    return console.log(err)
                }
                res.json({mensaje:true})
            });
        
        
        }
        else{
            res.json({mensaje: "No hay sesion creada para este usuario"})
        }
    
}catch(error){
    console.log(error)
}
}



exports.validarSesion = async(req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        let sess = req.session;
        if(sess.hasOwnProperty('user')){
            res.json({resultado:true})
        }
        else{
            res.json({resultado:false})
        }
    } catch (error) {
        console.log(error)
        next();
    }

}