const mongoose = require('mongoose');

const Recursos = new mongoose.Schema({
   camillasDisponibles:{
       type:Int32Array,
       required:true
   },
   camillasOcupadas:{
       type:Int32Array,
       required:true
   },
   jabonLitros:{
       type:Int32Array,
       required:true;
   },
   alcoholLitros:{
       type:Int32Array,
       required:true
   },
   barbijos:{
       type:Int32Array,
       required:true
   }


});
