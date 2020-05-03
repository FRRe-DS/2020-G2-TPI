const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    console.log("Hola,probando");
    res.json({message:"mensaje escrito en consola"});
});
module.exports = router;

router.post('/pruebas',(req,res)=>{
    console.log(req.body);
})