const mongoose = require('mongoose');

const User = new mongoose.Schema({
        user:{
            type:String,
            required:true
        },
        phash:{
            type:String,
            required:true
        }
    
});

module.exports = mongoose.model('User',User);