const express = require("express");
const authorization = require("../middleware/authorization");
const updateUser = require("../queries/updateUser");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const getUserByEmail = require("../queries/getUserByEmail");
const getUserByUsername = require("../queries/getUserByUsername");
const createUser = require("../model/user");

// @ Private POST /api/updateuser
router.post("/updateuser", authorization, (req, res, next) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    console.log(_tokendata);

    const {username, email, password, passwordconfirm} = req.body;

    console.log(username, email, password, passwordconfirm);

    if (password.length < 5) {
        res.json({
            error: "password must be at least 5 characters long",
        });
        return ;
    } else if (password !== passwordconfirm) {
        res.json({
            error: "passwords do not match",
        });
        return ;
    }

    if (!validator.isEmail(email)) {
        res.json({
            error: "Email is not valid",
        });
        return ;
    }
    if (username.length < 3) {
        res.json({
            error: "Username must be at least 3 character long",
        });
        return ;
    }


    pool.connect().then(client => {
        return client.query(getUserByEmail(email)).then(emailResult => {
            return client.query(getUserByUsername(username)).then(userResult => {
                return {emailResult, userResult, client};
            });
        });
    }).then(({emailResult, userResult, client}) => {
        console.log("here");
        if (emailResult.rowCount > 0 && (emailResult.rows[0]["user_id"] !== _tokendata.id)) {
            res.json({
                error: "Email already in use"
            });
            return ;
        };
        if (userResult.rowCount > 0 && (userResult.rows[0]["user_id"] !== _tokendata.id)) {
            res.json({
                error: "Username already in use"
            });
            return ;
        }

        
        
        return bcrypt.hash(password, 12).then(hash => {
            const user = createUser(_tokendata.id, username, email, hash);
            const {query, log} = updateUser(user);
            return client.query(query()).then(result => {
                if (result.rowCount > 0) {
                    res.status(200).json({
                        success: "User updated successfully"
                    });
                    
                    client.query(log()).then(() => client.release()).catch(() => client.release());
                }
            });
        });


    }).catch(e => console.log(e));

    

});




module.exports = router;
