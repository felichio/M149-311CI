const express = require("express");
const authorization = require("../middleware/authorization");
const getLog = require("../queries/getLog");
const router = express.Router();



// @ Private GET /log
router.get("/log", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user_id = _tokendata.id;

    pool.connect().then(client => {
        return client.query(getLog(user_id))
            .then(result => {
                client.release();
                res.json(result);
            }).catch(e => client.release())
    });
    
});




module.exports = router;