const pg = require("pg");
const util = require("./model/util");



const {db, types} = require("./config/config");
const request = require("./model/Request");
const location = require("./model/Location");
const { isConsistent } = require("./model/util");

const pool = new pg.Pool({
    ...db,
});





util.read(util.reader("./data/311-service-requests-abandoned-vehicles.csv"), types.abandonedVehicle, pool);


// let counter = 0;
// readInterface.on("line", (line) => {
//     // readInterface.close();
    
//     // console.log(line);
//     const delimetedLine = line.split(",");
//     // if (isConsistent(delimetedLine, types.abandonedVehicle)) {
//         const data = location(delimetedLine, types.abandonedVehicle);
//         const data2 = request(delimetedLine);

//         const query = {
//             name: "locationinsert",
//             text: "INSERT INTO locationinfo(street_address, zip_code, location_point, ward, police_district, community_area, latitude, longitude) values($1, $2, point($3, $4), $5, $6, $7, $8, $9)",
//             values: [data["street_address"], data["zip_code"], data["location_point"].x, data["location_point"].y, data["ward"], data["police_district"], data["community_area"], data["lat"], data["lon"]]
//         };

//         const query2 = {
//             name: "requestinsert",
//             text: "INSERT INTO request(creation_date, status, completion_date, service_request_number, type_of_service) values($1, $2, $3, $4, $5)",
//             values: [data2["creationDate"], data2["status"], data2["completionDate"], data2["serviceRequestNumber"], data2["type"]]
//         }

//         pool.query(query).then(d => {
            
//             console.log("done " + counter++);
//             return pool.query(query2);
//             // console.log(data);
//         }).catch(e => {
//             return pool.query(query2);
            
//         }).catch(e => {

//         })
    
// });

