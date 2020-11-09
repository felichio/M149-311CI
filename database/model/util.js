const readline = require("readline");
const fs = require("fs");
const process = require("process");
const {types} = require("../config/config");
const location = require("./Location");
const abandonedVehicle = require("./AbandonedVehicle");
const request = require("./Request");
const isConsistent = (line, type) => {
    if (type === types.abandonedVehicle) {
        // let zip_code = line[12];
        // if (typeof zip_code === "string" && (zip_code.length === 0 || zip_code.length === 5)) return true;
        // return false;
        if (line.length !== 28) return false;
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
        
        const locationQuery = location(delimetedLine, types.abandonedVehicle);
        if (isConsistent(delimetedLine, types.abandonedVehicle)) {
            pool.query(locationQuery).then(d => {
                const location_id = d["rows"][0].location_id;
                const abandonedVehicleQuery = abandonedVehicle(delimetedLine, location_id);
                pool.query(abandonedVehicleQuery).then(d => {
                    const incident_id = d["rows"][0].incident_id;
                    const requestQuery = request(delimetedLine, incident_id);
                    pool.query(requestQuery).then(d => {
                        console.log(counter++);
                    }).catch(e => {/** supress requests if location or incidents supressed or errors occured here  */})
                }).catch(e => {/** supress incidents errors or location insertions supressed */});
            }).catch(e => {/** supress location errors due to invalid values */});
        }
    });
};


module.exports = {
    isConsistent,
    reader,
    read,

};