

const rodentBaiting = (line) => {
    const current_activity = line[8] || null;
    const most_recent_activity = line[9] || null;
    const number_of_premises_baited = line[5] || null;
    const number_of_premises_with_garbage = line[6] || null;
    const number_of_premises_with_rats = line[7] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "rodentbaitinginsert",
        text: `INSERT INTO rodent_baiting(current_activity, most_recent_activity, number_of_premises_baited, number_of_premises_with_garbage, number_of_premises_with_rats, type_of_service)
         values($1, $2, $3, $4, $5, $6)
         returning incident_id
         `,
        values: [current_activity, most_recent_activity, number_of_premises_baited, number_of_premises_with_garbage, number_of_premises_with_rats, type_of_service]
    };


    return query;

};

module.exports = rodentBaiting;