const fetch = require('node-fetch')
// const Aburrido = require('../models/Aburrido')
const Informes = require('../models/InformeHospitalAMinisterio')
const Stat = require('../models/Stat')

exports.obtenerDatos= async(req,res,next) =>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const datos = await fetch('http://localhost:5000/informes');
        const respuestaJSON = await datos.json();
        console.log(respuestaJSON)

        var informesUsados = await Informes.find({},{createdAt:true})
        //borrar este for de abajo
        
        for( i in informesUsados)
        {
            informesUsados[i] = informesUsados[i].createdAt
        }
        
        
        
        informesEnFormatoC=[]
        respuestaJSON.Informes.forEach(element => {
            temp={}
            //descomentar estas lineas cuando llegue el endpoint de mr bravin
            //y aniadir .ReporteHospitalario entre element y [item] linea 45
            //tambien recordar eliminar .Informes del respuesta de JSON
            //chequeamos si el elemento esta entre los no usados
            console.log("INFORMES USADOS")
            console.log(informesUsados)
            if(!(informesUsados.includes(element.createdAt)))
            {
                console.log("El elemento no esta en el arreglo")
                console.log(element.createdAt)
                for(var item in element)
                {
                    
                    if(item !== '_id')
                    {
                        temp[item] = element[item]
                    }
                }
                informesEnFormatoC.push(temp)
            }

            
        });
        console.log(informesEnFormatoC)
        
        var copiaUltimaEstadistica = await Stat.find({}).sort({createdAt:-1}).limit(1)

        informesEnFormatoC.forEach(async (informe) => {

            try {
              var nuevoInforme = new Informes(informe)
              
              // tratamiento de estadisticas

              var nuevaEstadistica = new Stat();
              nuevaEstadistica.dataCiudades = copiaUltimaEstadistica[0].dataCiudades
              nuevaEstadistica.totales = copiaUltimaEstadistica[0].totales
              //console.log("ULTIMA ESTADISTICA ANTES de crear"+copiaUltimaEstadistica);
              for(i in copiaUltimaEstadistica[0].dataCiudades)
              {
                  // console.log(copiaUltimaEstadistica[0].dataCiudades[i].nombreCiudad)
                  if(copiaUltimaEstadistica[0].dataCiudades[i].nombreCiudad == nuevoInforme.nombreCiudad)
                  { 
                      //console.log('POBLACION TOTAL ANTES DE RESTAR')
                      //console.log(nuevaEstadistica.totales.poblacionTotal)
                      nuevaEstadistica.dataCiudades[i].cantidades.enfermos += nuevoInforme.resumenCasos.cantidadEnfermos
                      nuevaEstadistica.dataCiudades[i].cantidades.recuperados += nuevoInforme.resumenCasos.cantidadCurados
                      nuevaEstadistica.dataCiudades[i].cantidades.muertos += nuevoInforme.resumenCasos.cantidadMuertos
                      nuevaEstadistica.dataCiudades[i].poblacion -= nuevoInforme.resumenCasos.cantidadMuertos
                      nuevaEstadistica.totales.enfermos += nuevoInforme.resumenCasos.cantidadEnfermos
                      nuevaEstadistica.totales.recuperados += nuevoInforme.resumenCasos.cantidadCurados
                      nuevaEstadistica.totales.muertos += nuevoInforme.resumenCasos.cantidadMuertos
                      nuevaEstadistica.totales.poblacionTotal -= nuevoInforme.resumenCasos.cantidadMuertos

                      //console.log('POBLACION TOTAL DESPUES DE RESTAR ' + nuevoInforme.resumenCasos.cantidadMuertos +  ' MUERTES' )
                      //console.log(nuevaEstadistica.totales.poblacionTotal)
                  }
              }

              nuevoInforme.impactadoEnEstadisticas = true;
              // console.log('NUEVO INFORME: ')
              // console.log(nuevoInforme)
              
              copiaUltimaEstadistica = [new Stat(nuevaEstadistica)];
              //console.log("ULTIMA ESTADISTICA Despues de crear"+copiaUltimaEstadistica);
              await nuevoInforme.save();
              // console.log('NUEVA ESTADISTICA: ')
              // console.log(nuevaEstadistica)
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

