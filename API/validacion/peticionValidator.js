const CentroHospitalario = require('../models/CentrosHospitalarios');

async function existeCentroHospitalario(id)
    {
        const centro = await CentroHospitalario.find({'idCentro': id})
        if(centro.length == 1){
            return true
        } else{
            return false
        }
    }

module.exports.existeCentroHospitalario = existeCentroHospitalario;