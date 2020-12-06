const express = require("express");
const authorization = require("../middleware/authorization");
const hmunicipality = require("../model/insertincident/hmunicipality");
const municipality = require("../model/insertincident/municipality");
const location = require("../model/insertincident/location");
const request = require("../model/insertincident/request");
const incident = require("../model/insertincident/incident");
const requestU = require("../model/updateincident/request");
const incidentU = require("../model/updateincident/incident");
const requestD = require("../model/deleteincident/request");
const incidentD = require("../model/deleteincident/incident");
const getRequest = require("../model/updateincident/getRequest");
const getTypeOfRequest = require("../model/updateincident/getTypeOfRequest");
const createUser = require("../model/user");

const router = express.Router();


// @ Private POST /incident
router.post("/incident", authorization, (req, res) => {
    console.log(req.body);
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);
    
    pool.connect().then(client => Promise.all([
        client.query(municipality(req.body)),
        client.query(hmunicipality(req.body)),
        client.query(location(req.body)),
        client.query(incident(req.body.typeOfService)(req.body)),
        Promise.resolve(client)
    ])).then((rows) => {
        const municipality_id = rows[0]["rows"][0].municipality_id;
        const historical_municipality_id = rows[1]["rows"][0].historical_municipality_id;
        const location_id = rows[2]["rows"][0].location_id;
        const incident_id = rows[3]["rows"][0].incident_id;
        const client = rows[4];
        console.log(incident_id, location_id, municipality_id, historical_municipality_id);
        return client.query(request(req.body, incident_id, location_id, municipality_id, historical_municipality_id).query()).then(result => [result, client])
    }).then(([result, client]) => {
        const id = result.rows[0].request_id;
        
        if(result.rowCount > 0) {
            client.query(request(req.body).log(user, id)).then(() => client.release()).catch(e => {
                client.release();
                res.json({error: "Something bad happened"});
            })
        } else {
            client.release();
        }
        res.json({success: `${id}`});
        
    }).catch(e => {
        console.log(e);
        res.json({error: "Something bad happened"});
    });
});

// @ Private POST /incident/:req_id
router.post("/incident/:request_id", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);
    const requestId = req.params.request_id;
    const incidentId = req.body.stableIncident;
    console.log("UpdateRouter----");
    console.log(requestId + " -- " + incidentId);
    

    pool.connect().then(client => Promise.all([
        client.query(municipality(req.body)),
        client.query(hmunicipality(req.body)),
        client.query(location(req.body)),
        Promise.resolve(client)
    ])).then((rows) => {
        const municipality_id = rows[0]["rows"][0].municipality_id;
        const historical_municipality_id = rows[1]["rows"][0].historical_municipality_id;
        const location_id = rows[2]["rows"][0].location_id;
        const client = rows[3];
        console.log(location_id, municipality_id, historical_municipality_id);
        return client.query(incidentU(req.body.typeOfService, incidentId)(req.body)).then(result => [client, result, municipality_id, historical_municipality_id, location_id]).catch(e => {
            client.release();
            console.log(e);
            res.json({error: "Something bad happened"});
        });
    }).then(([client, result, municipality_id, historical_municipality_id, location_id]) => {
        console.log(requestU(req.body, requestId, incidentId, location_id, municipality_id, historical_municipality_id).query());
        return client.query(requestU(req.body, requestId, incidentId, location_id, municipality_id, historical_municipality_id).query()).then(result => [client, result]).catch(e => {
            client.release();
            console.log(e);
            res.json({error: "Something bad happened"});
        });
    }).then(([client, result]) => {
        console.log(result);
        if(result.rowCount > 0) {
            client.query(requestU(req.body).log(user, requestId)).then(() => client.release()).catch(e => {
                client.release();
                res.json({error: "Something bad happened"});
            })
        } else {
            client.release();
        }
        res.json({success: `${requestId}`});
    }).catch(e => {
        res.json({error: "Something bad happened"});
    });

    
});

// @ Private DELETE /incident/:request_id
router.delete("/incident/:request_id",  authorization, (req, res) => {

    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);

    const requestId = req.params.request_id;
    const typeOfService = req.body.typeOfService;
    const incidentId = req.body.stableIncident;

    // incidentD(typeOfService, incidentId)()
    console.log(requestD(requestId, typeOfService).query());
    
    pool.connect().then(client => {
        return client.query(incidentD(typeOfService, incidentId)()).then(result => [client, result]).catch(e => client.release());
    }).then(([client, result]) => {
        return client.query(requestD(requestId, typeOfService).query()).then(result => [client, result]).catch(e => client.release());
    }).then(([client, result]) => {
        if(result.rowCount > 0) {
            client.query(requestD(requestId, typeOfService).log(user)).then(() => client.release()).catch(e => {
                client.release();
                res.json({error: "Something bad happened"});
            });
            res.json({success: `${requestId}`});
        } else {
            client.release();
            res.json({error: "Request not found"});
        }
    }).catch(e => {
        res.json({error: "Something bad happened"});
    });

});


// @ Private GET /incident/:req_id
router.get("/incident/:request_id", authorization, (req, res) => {
    const _tokendata = req._tokendata;
    const pool = req.dbResource;
    // const user = createUser(_tokendata.id, _tokendata.username, _tokendata.email);
    const requestId = req.params.request_id;

    pool.connect().then(client => {
        return client.query(getTypeOfRequest(requestId)).then(result => [client, result]).catch(e => client.release());
    }).then(([client, result]) => {
        if (result.rowCount > 0) {
            const typeOfService = result.rows[0].type_of_service;
            // console.log(getRequest({requestId, typeOfService}));
            // client.release();
            console.log(typeOfService);
            
            client.query(getRequest({requestId, typeOfService})).then(result => {
                if (result.rowCount > 0) {
                    client.release();
                    res.json(result.rows[0]);
                } else {
                    client.release();
                    res.json({error: "Request not found!"});
                }
            }).catch(e => console.log(e));
        } else {
            client.release();
            res.json({error: "Request not found!"});
        }
    })
});




module.exports = router;