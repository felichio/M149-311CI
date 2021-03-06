

const treeDebris = (line) => {
    const current_activity = line[6] || null;
    const most_recent_activity = line[7] || null;
    const where_is_the_debris_located = line[5] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "treedebrisinsert",
        text: `INSERT INTO tree_debris(current_activity, most_recent_activity, where_is_the_debris_located, type_of_service)
         values($1, $2, $3, $4)
         returning incident_id
         `,
        values: [current_activity, most_recent_activity, where_is_the_debris_located, type_of_service]
    };


    return query;

};

module.exports = treeDebris;