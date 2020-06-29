const secrets = require('../secrets.js')
var https = require('follow-redirects').https;
var fs = require('fs');




exports.enviar = async(req,res,next)=>{
    try{
        var fecha = new Date().getTime();
        var fechaMod= `${fecha.getUTCFullYear()}0${fecha.getUTCMonth()+1}${fecha.getUTCDate()}T${fecha.getUTCHours()+3}${fecha.getUTCMinutes()}${fecha.getUTCSeconds()}Z`; 
         
        console.log(fechaMod);
        console.log(typeof fechaMod);
        var options = {
            'method': 'GET',
            'hostname': 'apigateway.sa-east-1.amazonaws.com',
            'path': '/restapis/6iubewzdng/stages/dev/exports/oas30',
            'headers': {
              'Host': 'apigateway.sa-east-1.amazonaws.com',
              'Accept': 'application/json',
              'X-Amz-Date': fechaMod,
              'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAIQ7YOGHPNELS6O6Q/20200615/sa-east-1/apigateway/aws4_request, SignedHeaders=host;x-amz-date, Signature='+secrets.aws_credentials
            },
            'maxRedirects': 20
          };
        var misticJson;

        var req2 = https.request(options, function (ress) {
            var chunks = [];

            ress.on("data", function (chunk) {
                chunks.push(chunk);
            });

            ress.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                misticJson = body.toString();
                console.log(body.toString());
            });

            ress.on("error", function (error) {
                console.error(error);
            });
        });

        req2.end();
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(misticJson);
    }
    catch(error) {
        console.log(error);
        next();
    }
}
