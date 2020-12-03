

const getTotalRequestsPerType1 = ({creation_date, completion_date}, user) => ({
    query: () =>  ({
        text: "select * from get_total_requests_per_type_1($1, $2)",
        values: [creation_date, completion_date]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} run predetermined query no. 1`]
    })
});



module.exports = {
    getTotalRequestsPerType1,
    
};