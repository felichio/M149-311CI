

const request = ({creationDate, status, completionDate, service, typeOfService}, incident_id, location_id, municipality_id, historical_municipality_id) => ({
    
        query: () => ({
            name: "requestinsert",
            text: "INSERT INTO request(creation_date, status, completion_date, service_request_number, type_of_service, incident_id, location_id, municipality_id, historical_municipality_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning request_id",
            values: [creationDate || null, status, completionDate || null, service || null, typeOfService, incident_id, location_id, municipality_id, historical_municipality_id]
        }),
    
        log: (user, id) => ({
            text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
            values: [user.id, `${user.username} inserted an incident of type ${typeOfService} with request_id: ${id}`]
        })
    
});


module.exports = request;