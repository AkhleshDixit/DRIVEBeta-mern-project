const mongoose = require('mongoose');

const userFilesSchema = new mongoose.Schema({
    userId:String,
    userFilePath:String,
    fileName:{
        type:String,
        unique:true
    }
});

module.exports = mongoose.model('userfiles',userFilesSchema);