

const potHoles = (line) => {
    const current_activity = line[5] || null;
    const most_recent_activity = line[6] || null;
    const number_of_potholes_filled_on_block = line[7] || null;
    const ssa = line[15] || null;
    const type_of_service = "Pothole in Street"; // line[4] to single value
    

    const query = {
        name: "potholesinsert",
        text: `INSERT INTO pot_holes(current_activity, most_recent_activity, number_of_potholes_filled_on_block, ssa, type_of_service)
         values($1, $2, $3, $4, $5)
         returning incident_id
         `,
        values: [current_activity, most_recent_activity, number_of_potholes_filled_on_block, ssa, type_of_service]
    };


    return query;

};

module.exports = potHoles;