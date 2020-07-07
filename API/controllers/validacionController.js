

exports.validarSesion = async(req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        let sess = req.session;
        if(sess){
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