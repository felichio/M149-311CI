const express = require("express");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

const router = express.Router();


// @ PUBLIC POST /login
router.post("/login", (req, res) => {
    

    // check use table inside database
    const {username, password} = req.body;
    

    bcrypt.hash(password, 12).then(hash => {
        return bcrypt.compare(password, hash);
    }).then(result => {
        
        if (result) {
            return jwt.sign({
                username,
                email: "some-email"
            }, config.security["jwt-key"], {
                expiresIn: 60 * 60,
            }, (err, token) => {
                if (err) console.log(err);
                return res.status(200).json({token});
            })
        } else {
            res.json({
                error: "Invalid Credentials",
            });
        }
    }).catch(e => {
        res.json({
            error: "Something went wrong",
        });
    })
    
    // create and send token
    
    


});



module.exports = router;