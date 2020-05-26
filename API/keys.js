const {MONGO_PASSWORD} = require('./secrets.js');

module.exports = {
    MONGOURI: "mongodb+srv://prueba:"+MONGO_PASSWORD+"@cluster1dacs-ddbbz.mongodb.net/test?retryWrites=true&w=majority"
}