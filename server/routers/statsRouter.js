const express = require("express");
const router = express.Router();
const getStats = require("../queries/getStats");



// @PUBLIC GET /stats

router.get("/stats", (req, res) => {
    const pool = req.dbResource;
    console.log("i just ran");
    pool.connect().then(client => {
        return Promise.all([
            client.query(getStats()["totalRequests"]),
            client.query(getStats()["closedRequests"]),
            client.query(getStats()["openRequests"]),
        ]).then(result => {
            client.release();
            return result;
        }).then(result => {
            const total = result[0]["rows"][0].count;
            const closed = result[1]["rows"][0].count;
            const opened = result[2]["rows"][0].count;

            res.status(200).json({
                total,
                closed,
                opened,
            })
            
        })
    })
});


module.exports = router;