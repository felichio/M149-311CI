const express = require("express");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const validator = require("validator");
const createUser = require("../model/user");
const getUserByUsername = require("../queries/getUserByUsername");
const getUserByEmail = require("../queries/getUserByEmail");
const insertUser = require("../queries/insertUser");
const loginlog = require("../queries/loginlog");
const router = express.Router();

let times = 0;
// @PUBLIC POST /login
router.post("/login", (req, res) => {
    
    const pool = req.dbResource;

    const {username, password} = req.body;
    console.log(username, password);
    pool.connect().then(client => {
        console.log("here");
        return client.query(getUserByUsername(username))
                .then(result => {
                    return [result, client];
                }).catch(e => console.log(e))
    }).then(([result, client]) => {
        if (result.rowCount > 0) {
            const user = createUser(result.rows[0].user_id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
            return [user, client, true];
        }
        return [null, client, false];
    }).then(([user, client, doesUserExist]) => {
        if (user) {
            console.log(user.password);
            console.log(user);
            return bcrypt.compare(password, user.password).then(result => [result, user, client, doesUserExist]);
        } else return [false, null, client, doesUserExist];
    }).then(([result, user, client, doesUserExist]) => {
        console.log(result, user, doesUserExist);
        if (result) {
            jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
            }, config.security["jwt-key"], {
                expiresIn: 60 * 60,
            }, (err, token) => {
                if (err) console.log(err);
                else {
                    res.status(200).json({token});
                    client.query(loginlog(true, user)).catch(() => client.release());
                    client.release();
                }
            });
        } else {
            console.log(`runned ${times++}`);
            res.json({
                error: "Invalid Credentials",
            });
            if (doesUserExist) {
                client.query(loginlog(false, user)).catch(() => client.release());
            }
            client.release();
        }
    }).catch(e => console.log(e));


    // check use table inside database
    
    // create and send token
    

    
    


});


// @PUBLIC POST /register
router.post("/register", (req, res, next) => {
    const pool = req.dbResource;

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
            })
        })
    }).then(({emailResult, userResult, client}) => {
        if (emailResult.rowCount > 0) {
            res.json({
                error: "Email already in use"
            });
            return ;
        };
        if (userResult.rowCount > 0) {
            res.json({
                error: "Username already in use"
            });
            return ;
        }

        
        
        return bcrypt.hash(password, 12).then(hash => {
            const user = createUser("", username, email, hash);
            // console.log(user);
            const {query, log} = insertUser(user);
            return client.query(query()).then(result => {
                
                if (result.rowCount > 0) {
                    res.status(200).json({
                        success: "User registered successfully"
                    });
                    // console.log(result);
                    const user_id = result.rows[0].user_id;
                    client.query(log(user_id)).then(() => client.release()).catch(() => client.release());
                }
                
            }).catch(() => client.release());
        });


    }).catch(e => res.json({error: "try again later"}));
    

});


module.exports = router;