const mongoose = require('mongoose');
const Informes = require('../models/InformeHospitalAMinisterio');
var request = require('request');

var options = {
  'method': 'GET',
  'url': 'http://localhost:5000/informes',
  'headers': {
  }
};
request(options, function (error, response) {

  if (error) throw new Error(error);

  // response ES UN STRING, por eso hacemos esto
  // console.log(JSON.parse(response.body)); 

  const respuesta = JSON.parse(response.body);

  for( item in respuesta.Informes){
    console.log(respuesta.Informes[item])

    var options = {
      method: 'POST',
      url: 'http://localhost:5000/informes',
      headers: {
        'Content-Type': 'application/json'
      },
      body: respuesta.Informes[item]
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

  }


});