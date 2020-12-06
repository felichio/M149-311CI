

const request = ({creationDate, status, completionDate, service, typeOfService}, request_id, incident_id, location_id, municipality_id, historical_municipality_id) => ({
    
        query: () => ({
            name: "requestupdate",
            text: `UPDATE request SET creation_date = $1, status = $2, completion_date = $3, service_request_number = $4, type_of_service = $5, incident_id = $6, location_id = $7, municipality_id = $8, historical_municipality_id = $9 
                where request_id = $10`,
            values: [creationDate || null, status, completionDate || null, service || null, typeOfService, incident_id, location_id, municipality_id, historical_municipality_id, request_id]
        }),
    
        log: (user, id) => ({
            text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
            values: [user.id, `${user.username} updated an incident of type ${typeOfService} with request_id: ${id}`]
        })
    
});


module.exports = request;