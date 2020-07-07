const fetch = require('node-fetch')

const Informes = require('../models/InformeHospitalAMinisterio')
const Stat = require('../models/Stat')


exports.obtenerDatos= async(req,res,next) =>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const datos = await fetch('http://54.237.73.187:3000/reporte');
        const respuestaJSON = await datos.json();
        
        informesEnFormatoC=[]
        respuestaJSON.forEach(element => {
            temp={}
            for(var item in element.ReporteHospitalario)
            {
                
                if(item !== '_id')
                {
                    temp[item] = element.ReporteHospitalario[item]
                }
            }
            informesEnFormatoC.push(temp)    
        });

        var copiaUltimaEstadistica = await Stat.find({}).sort({createdAt:-1}).limit(1)

        informesEnFormatoC.forEach(async (informe) => {

            try {
              var nuevoInforme = new Informes(informe)
              
              // tratamiento de estadisticas

              var nuevaEstadistica = new Stat();
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
              copiaUltimaEstadistica = [new Stat(nuevaEstadistica)];

              await nuevoInforme.save();
              await nuevaEstadistica.save();

            } catch (error) {
              console.log(error)
              next();
            }           
        })  
        res.json({mensaje:"Los informes fueron guardados"});
    } catch(error) {
        console.log(error)
        next();
    }
    
}

