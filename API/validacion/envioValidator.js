function isPeticionEmpty(datosPeticion)
    {
        var status = true;
        const recursos = ["camillas","alcoholLitros","jabonLitros","barbijos","jeringas","cofias"];
        console.log("I got here");

        for(var key in recursos){
            console.log(datosPeticion[recursos[key]]);
            if(datosPeticion.hasOwnProperty(recursos[key]))
            {
                    if(datosPeticion[recursos[key]]!==0)
                    {
                        
                        status = false;
                    }
            }
        }
        //simplificar este codigo luego
        for(var i in datosPeticion.medicos)
        {
            if(datosPeticion.medicos[i].cantidad !== 0)
            {
                status= false;
            }
        }
        return status;
    }

module.exports.isPeticionEmpty = isPeticionEmpty;