const definicion = require('../latestswagger2.json')

exports.enviar = async(req,res,next)=>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(definicion);
    }
    catch(error) {
        console.log(error);
        next();
    }
}
