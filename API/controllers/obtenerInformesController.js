const fetch = require('node-fetch')
const Informes = require('../models/InformeHospitalAMinisterio')
const Stat = require('../models/Stat')
const FechaInformes = require('../models/FechaInformes')

exports.obtenerDatos= async(req,res,next) =>{
    try{
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // obtener los datos de bravin
        const datos = await fetch('http://54.237.73.187:3000/reporte');
        const respuestaJSON = await datos.json();

        // console.log(respuestaJSON)

        // fecha bastante vieja para comparar empezar a comparar
        var ultimaFechaExterior = new Date('1990-01-01 00:00:00')

        // la ultima fecha que leimos informes (1 sola en la bd)
        var ultimaFechaLeida = await FechaInformes.findOne({},{fecha:true})
        
        // para sacar el _id, nos quedamos con la fecha sola 
        ultimaFechaLeida = new Date(ultimaFechaLeida.fecha)

        // console.log("Ultima Fecha Leida")
        // console.log(ultimaFechaLeida)
    
        informesEnFormatoC = []

        // pasamos a nuestro formato de informes (sin el campo mayor)
        respuestaJSON.forEach(element => {
            // temp tiene todos los informes que llegan de bravin pero en nuestro formato (ininformesEnFormatoC)
            temp = {}

            //chequeamos si el elemento esta entre los no usados
            // fecha que tiene cada informe
            var tempFecha = new Date(element.ReporteHospitalario.createdAt)
            
            // console.log('LA FECHA DEL INFORME: ') 
            // console.log(tempFecha)

            if(tempFecha > ultimaFechaLeida)
            {
                console.log(tempFecha > ultimaFechaLeida)
                console.log('NO LEIMOS ESTE INFORME')
                console.log('FECHA DEL INFORME: '+ tempFecha)
                console.log('ULTIMA FECHA LEIDA: '+ ultimaFechaLeida)

                // no leimos este informe
                
                // como no tenemos el campo "ReporteHospitalario" hacemos lo siguiente
                for(var item in element.ReporteHospitalario)
                {
                    // agregamos todos los campos al futuro informe con nuestro formato
                    temp[item] = element.ReporteHospitalario[item]
                }

                if(tempFecha > ultimaFechaExterior)
                {
                    
                    // se actualiza la ultima fecha con la mas reciente de los informes
                    ultimaFechaExterior = tempFecha
                } 

                informesEnFormatoC.push(temp)

            }

            
        });
                
        // trae la ultima estadistica
        var copiaUltimaEstadistica = await Stat.find({}).sort({createdAt:-1}).limit(1)


        informesEnFormatoC.forEach(async (informe) => {
            
            // actualizar las estadisticas
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
        });

        // console.log('TODAS las estadisticas se actualizaron')
        
        res.json({mensaje:"Los informes fueron guardados"});
        
        // actualizacion nueva fecha exterior
        var nuevaFechaExterior = new FechaInformes()
        nuevaFechaExterior.fecha = ultimaFechaExterior
        await FechaInformes.deleteOne({})
        console.log('borramos la nueva fecha ext')
        await nuevaFechaExterior.save()
        console.log('guardamos la nueva fecha ext y es: ' + nuevaFechaExterior.fecha)

    } catch(error) {
        console.log(error)
        next();
    }
}

