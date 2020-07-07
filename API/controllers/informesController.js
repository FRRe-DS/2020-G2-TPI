const InformeHospitalMinisterio = require('../models/InformeHospitalAMinisterio');
const ciudades = require('../models/Ciudad');
const centrosHospitalarios = require('../models/CentrosHospitalarios');
const { nuevoEnvio } = require('./envioController');
const Stat = require('../models/Stat');

exports.registrarInforme = async (req,res,next) => {

    // control de cantidades de tests realizados
    if(req.body.pruebasRealizadas.realizadas == (req.body.pruebasRealizadas.sinResultado + req.body.pruebasRealizadas.positivas +req.body.pruebasRealizadas.negativas)){

        const nuevoInforme = new InformeHospitalMinisterio(req.body);
        const ciudad = (await ciudades.find().limit(1))[0].Ciudades;
        const hospitales = (await centrosHospitalarios.find());
    
        var ciudadValida = false;
        var hospitalValido = false;
        
        // control de ciudad valida
      
        ciudad.forEach(element => {
            //controla que idCiudad sea correcto
            if(element.idCiudad==nuevoInforme.idCiudad){
                //controla que el nombre de la ciudad sea correcto
                if(element.nombreCiudad==nuevoInforme.nombreCiudad){
                    ciudadValida = true;
                    hospitales.forEach(element2 =>{
                        //controla que idHospital sea correcto
                        if(element2.idCentro==nuevoInforme.cuitHospital){
                            //controla que el nombre del hospital exista sea correcto
                            if(element2.nombre==nuevoInforme.nombreHospital){
                                if(nuevoInforme.idCiudad==element2.idCiudad){
                                    hospitalValido = true;
                                }
                            }
                        }
                    });
                }
            }
            
        });
        
        try {
            if(ciudadValida){
                if(hospitalValido){
                    
                    
                    const copiaUltimaEstadistica = await Stat.find({}).sort({createdAt:-1}).limit(1)
                    const nuevaEstadistica = new Stat();
                    nuevaEstadistica.dataCiudades = copiaUltimaEstadistica[0].dataCiudades
                    nuevaEstadistica.totales = copiaUltimaEstadistica[0].totales

                    for(i in copiaUltimaEstadistica[0].dataCiudades)
                    {
                        
                        if(copiaUltimaEstadistica[0].dataCiudades[i].nombreCiudad == nuevoInforme.nombreCiudad)
                        {
                            
                            nuevaEstadistica.dataCiudades[i].cantidades.enfermos += nuevoInforme.resumenCasos.cantidadEnfermos
                            nuevaEstadistica.dataCiudades[i].cantidades.recuperados += nuevoInforme.resumenCasos.cantidadCurados
                            nuevaEstadistica.dataCiudades[i].cantidades.muertos += nuevoInforme.resumenCasos.cantidadMuertos
                            nuevaEstadistica.dataCiudades[i].poblacion -= nuevoInforme.resumenCasos.cantidadMuertos
                            nuevaEstadistica.totales.enfermos += nuevoInforme.resumenCasos.cantidadEnfermos
                            nuevaEstadistica.totales.recuperados += nuevoInforme.resumenCasos.cantidadCurados
                            nuevaEstadistica.totales.muertos += nuevoInforme.resumenCasos.cantidadMuertos
                            nuevaEstadistica.totales.poblacionTotal -= nuevoInforme.resumenCasos.cantidadMuertos
                        }
                    }
                    nuevoInforme.impactadoEnEstadisticas = true;
                    await nuevoInforme.save();
                    await nuevaEstadistica.save();

                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({mensaje:"El informe se guardo en la base y se actualizaron las estadisticas"});
                }else {
                    res.json({mensaje:"El hospital NO es valido"});
                } 
                
            } else{
                res.json({mensaje:"La ciudad NO es valida"});
            }     
        } catch (error) {
            console.log(error);
            next();
        }
    } else{
        res.json({mensaje:"Errores en las cantidades de tests realizados del informe"});
    }
} 

exports.getInforme = async(req,res,next) =>{
    try {
        const Informes = await InformeHospitalMinisterio.find({}); 
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json({Informes})
    } catch (error) {
        console.log(error);
        next();
    }
}