

const garbageCarts = (line) => {
    const number_of_black_carts_delivered = line[5] || null;
    const current_activity = line[6] || null;
    const most_recent_activity = line[7] || null;
    const ssa = line[15] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "garbagecartsinsert",
        text: `INSERT INTO garbage_carts(number_of_black_carts_delivered, current_activity, most_recent_activity, ssa, type_of_service)
         values($1, $2, $3, $4, $5)
         returning incident_id
         `,
        values: [number_of_black_carts_delivered, current_activity, most_recent_activity, ssa, type_of_service]
    };


    return query;

};

module.exports = garbageCarts;