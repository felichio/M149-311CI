

const request = (line, incident_id, location_id, municipality_id, historical_municipality_id) => {
    

    const creation_date = line[0];
    const status = line[1];
    const completion_date = line[2] || null;
    const service_request_number = line[3];
    const type_of_service = line[4];

    const query = {
        name: "requestinsert",
        text: "INSERT INTO request(creation_date, status, completion_date, service_request_number, type_of_service, incident_id, location_id, municipality_id, historical_municipality_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [creation_date, status, completion_date, service_request_number, type_of_service, incident_id, location_id, municipality_id, historical_municipality_id]
    };

    
    return query;
};


module.exports = request;