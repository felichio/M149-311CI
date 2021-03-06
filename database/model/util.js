const readline = require("readline");
const fs = require("fs");
const process = require("process");
const {types} = require("../config/config");


const location = require("./location");
const incident = require("./incident");
const request = require("./request");
const municipality = require("./municipality");
const historicalMunicipality = require("./historicalMunicipality");


const isConsistent = (line, type) => {
    if (type === types.abandonedVehicle) {
        if (line.length !== 28) return false;
        return true;
    } else if (type === types.alleyLightsOut) {
        if (line.length !== 21) return false;
        return true;
    } else if (type === types.garbageCarts) {
        if (line.length !== 25) return false;
        return true;
    } else if (type === types.graffitiRemoval) {
        if (line.length !== 24) return false;
        return true;
    } else if (type === types.potHoles) {
        if (line.length !== 25) return false;
        return true;
    } else if (type === types.rodentBaiting) {
        if (line.length !== 26) return false;
        return true;
    } else if (type === types.sanitationCode) {
        if (line.length !== 22) return false;
        return true;
    } else if (type === types.streetLightsAllOut) {
        if (line.length !== 21) return false;
        return true;
    } else if (type === types.streetLightsOneOut) {
        if (line.length !== 16) return false;
        return true;
    } else if (type === types.treeDebris) {
        if (line.length !== 24) return false;
        return true;
    } else if (type === types.treeTrims) {
        if (line.length !== 22) return false;
        return true;
    }
};


const reader = (filename) => {
    return readline.createInterface({
        input: fs.createReadStream(filename),
        ouput: process.stdout,
        console: false
    });
};
let counter = 0;
const read = (reader, type, pool) => {
    reader.on("line", (line) => {
        const delimetedLine = line.split(",");
        delimetedLine[4] = type; // change type to single value
        
        // console.log(locationQuery);
        if (isConsistent(delimetedLine, type)) {
            
            
            
            

            // Promise.all([
            //     pool.query(municipalityQuery).catch(e => {}),
            //     pool.query(historicalMunicipalityQuery).catch(e => {}),
            //     pool.query(locationQuery).catch(e => {}),
            //     pool.query(incidentQuery).catch(e => {})
            // ]).then(rows => {
            //     const municipality_id = rows[0]["rows"][0].municipality_id;
            //     const historical_municipality_id = rows[1]["rows"][0].historical_municipality_id;
            //     const location_id = rows[2]["rows"][0].location_id;
            //     const incident_id = rows[3]["rows"][0].incident_id;
            //     const requestQuery = request(delimetedLine, incident_id, location_id, municipality_id, historical_municipality_id);

            //     pool.query(requestQuery).then(d => console.log(counter++)).catch(e => {})
            // });
            const municipalityQuery = municipality(delimetedLine, type);
            pool.query(municipalityQuery).then(d => {
                const municipality_id = d["rows"][0].municipality_id;
                const historicalMunicipalityQuery = historicalMunicipality(delimetedLine, type);
                pool.query(historicalMunicipalityQuery).then(d => {
                    const historical_municipality_id = d["rows"][0].historical_municipality_id;
                    const locationQuery = location(delimetedLine, type);
                    pool.query(locationQuery).then(d => {
                        const location_id = d["rows"][0].location_id;
                        const incidentQuery = incident(delimetedLine, type);
                        // console.log(incidentQuery); 
                        pool.query(incidentQuery).then(d => {
                            const incident_id = d["rows"][0].incident_id;
                            const requestQuery = request(delimetedLine, incident_id, location_id, municipality_id, historical_municipality_id);
                            pool.query(requestQuery).then(d => {
                                console.log(counter++);
                            }).catch(e => {/** supress requests if location or incidents supressed or errors occured here  */ console.log(e);})
                        }).catch(e => {/** supress incidents errors or location insertions supressed */ });
                    }).catch(e => {/** supress location errors due to invalid values */ console.log(e);});
                }).catch(e => {console.log(e)})
            }).catch(e => {/** */})
            
        }
    });
};


module.exports = {
    isConsistent,
    reader,
    read,

};