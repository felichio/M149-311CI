const readline = require("readline");
const fs = require("fs");
const process = require("process");
const pg = require("pg");



const {db, types} = require("./config/config");
const request = require("./model/Request");
const location = require("./model/Location");

const pool = new pg.Pool({
    ...db,
});



const query = {
    name: "some",
    text: "SELECT * FROM requests where request_id = $1",
    values: [1]
};

// pool.query(query).then(d => {
//     console.log(d);
//     pool.end();
// });



const readInterface = readline.createInterface({
    input: fs.createReadStream("./data/311-service-requests-abandoned-vehicles.csv"),
    ouput: process.stdout,
    console: false
});

let firstline = true;
let counter = 0;
readInterface.on("line", (line) => {
    // readInterface.close();
    if (firstline) {
        console.log(line.split(","));
        firstline = false;
    } else {
        // console.log(line);
        const data = location(line.split(","), types.abandonedVehicle);
        // const query = {
        //     name: "requestinsert",
        //     text: "INSERT INTO request(creation_date, status, completion_date, service_request_number, type_of_service) values($1, $2, $3, $4, $5)",
        //     values: [data["creationDate"], data["status"], data["completionDate"], data["serviceRequestNumber"], data["type"]]
        // }
        // console.log(data);
        const query = {
            name: "locationinsert",
            text: "INSERT INTO locationinfo(street_address, zip_code, location_point, ward, police_district, community_area, geo_point) values($1, $2, point($3, $4), $5, $6, $7, point($8, $9))",
            values: [data["street_address"], data["zip_code"], data["location_point"].x, data["location_point"].y, data["ward"], data["police_district"], data["community_area"], data["geo_point"].lat, data["geo_point"].lon]
        };
        
        pool.query(query).then(d => {
            console.log("done " + counter++);
            // console.log(data);
        }).catch(e => {
            console.log(e);
        })
   
    }    
    
});

