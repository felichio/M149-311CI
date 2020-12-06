

const request = (request_id, typeOfService) => ({
    
        query: () => ({
            name: "requestdelete",
            text: `DELETE FROM request where request_id = $1`,
            values: [request_id]
        }),
    
        log: (user) => ({
            text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
            values: [user.id, `${user.username} delete an incident of type ${typeOfService} with request_id: ${request_id}`]
        })
    
});


module.exports = request;