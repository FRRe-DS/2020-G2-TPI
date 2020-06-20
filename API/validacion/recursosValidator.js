const recursosController = require('../controllers/recursosController');

function comprobarRecursos(envioActual){
    const recursos = recursosController.getRecursos;
    var envioValido = true;

    for(var key in recursos.Recursos){
        if(recursos.Recursos[key]<envioActual[key]){
            envioValido = false;
        }
    }
    return envioValido;
}

module.exports.comprobarRecursos=comprobarRecursos;
