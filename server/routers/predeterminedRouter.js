const express = require("express");
const authorization = require("../middleware/authorization");
const createUser = require("../model/user");
const router = express.Router();
const fixCoor = require("../util/fixCoord");

const {
    getTotalRequestsPerType1, 
    getTotalRequestsPerDate2,
    getMostCommonServicePerZip3,
    getAvgCompletionTimePerType4,
    getMostCommonTypeInBox5,
    getTop5ssa6,
    getLicensePlateMoreThanOnce7,
    getSecondCommonColor8,
    getPremisesBaited9,
    getPremisesGarbage10,
    getPremisesRats11,
    getPolicesDistrictsWithPotRodent12

} = require("../queries/predeterminedQueries");

// @Private GET /api/predetermined/1
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

// @Private GET /api/predetermined/2
router.get("/2", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getTotalRequestsPerDate2({
        type_of_service: req.query.typeOfService,
        creation_date_start: req.query.creationDateStart, 
        creation_date_end: req.query.creationDateEnd
        }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/3
router.get("/3", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getMostCommonServicePerZip3({creation_date: req.query.creationDate, }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/4
router.get("/4", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getAvgCompletionTimePerType4({
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

// @Private GET /api/predetermined/5
router.get("/5", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);
    const {topLeft, bottomRight} = fixCoor(JSON.parse(req.query.point1), JSON.parse(req.query.point2));
    console.log(topLeft, bottomRight);
    const {query, log} = getMostCommonTypeInBox5({
        creation_date: req.query.creationDate, 
        top_left_point: topLeft,
        bottom_right_point: bottomRight
        }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/6
router.get("/6", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getTop5ssa6({
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

// @Private GET /api/predetermined/7
router.get("/7", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getLicensePlateMoreThanOnce7(user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/8
router.get("/8", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getSecondCommonColor8(user);
    console.log(req.query);
    console.log(query());
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


// @Private GET /api/predetermined/9
router.get("/9", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getPremisesBaited9({upper_bound: req.query.upperBound, }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/10
router.get("/10", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getPremisesGarbage10({upper_bound: req.query.upperBound, }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/11
router.get("/11", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getPremisesRats11({upper_bound: req.query.upperBound, }, user);
    console.log(req.query);
    console.log(query());
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

// @Private GET /api/predetermined/12
router.get("/12", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const {query, log} = getPolicesDistrictsWithPotRodent12({creation_date: req.query.creationDate, }, user);
    console.log(req.query);
    console.log(query());
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