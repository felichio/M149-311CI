const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authorization = (req, res, next) => {
    
    if (req.headers.authorization) {
        const [_, _token] = req.headers.authorization.split(" ");
        jwt.verify(_token, config.security["jwt-key"], (err, decoded) => {
            if (err) res.json({error: "Something went wrong"});
            else {
                req._tokendata = decoded;
                next();
            }
        });
    } else {
        res.json({error: "Something went wrong"});
    }
};



module.exports = authorization;