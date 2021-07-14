const fs = require('fs');

exports.downloadUserFile = (req,res)=>{
    const path = req.params.userFilePath;
    fs.readFile(`backend/assets/userfiles/${path}`,(err,content)=>{
        if(err){
            console.log('err :',err);
        }
        else{
            res.writeHead(200,{"content-type":'application/pdf'})
            res.end(content);
        }
    });
}