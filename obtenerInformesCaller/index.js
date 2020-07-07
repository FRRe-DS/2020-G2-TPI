var request = require('request');
exports.handler = async (event) => {
    // TODO implement
    
var options = {
  'method': 'POST',
  'url': 'https://6iubewzdng.execute-api.sa-east-1.amazonaws.com/dev//obtenerDatos',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

