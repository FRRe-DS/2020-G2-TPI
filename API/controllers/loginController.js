const User = require('../models/User');


exports.logUser = async(req,res,next) =>{
    const log = new User(req.body);

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
            res.json({mensaje:"Login exitoso"});
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