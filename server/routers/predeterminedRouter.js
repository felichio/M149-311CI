const express = require("express");
const authorization = require("../middleware/authorization");
const createUser = require("../model/user");
const router = express.Router();
const {getTotalRequestsPerType1} = require("../queries/predeterminedQueries");

// @Private GET 
router.get("/1", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getTotalRequestsPerType1({
        creation_date: req.query.creationDate, 
        completion_date: req.query.completionDate
        }, user);
    console.log(req.query);
    pool.connect().then(client => {
        return client.query(query()).then(result => {
            res.json(result);
            return client;
        }).catch(() => {
            console.log("releasing client");
            client.release();
        });
    }).then(client => {
        return client.query(log()).then(() => client.release()).catch(() => client.release());
    }).catch(e => {
        res.json({error: "invalid arguments"});
    });

});



module.exports = router;