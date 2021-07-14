const jwt = require('jsonwebtoken');
const jwtKey = "#sw{#QpjAARQS$2!";

exports.accountverificationAuth = (req, res, next) => {
    var tokenLink = req.url.split("?=");
    req.token = tokenLink[1];
    jwt.verify(req.token, jwtKey, (error, authData) => {
        if (error) {
            return res.json({ result: error });
        }
        else {
            res.data = authData.data;
            next();
        }
    });

}

