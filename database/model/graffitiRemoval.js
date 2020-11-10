

const graffitiRemoval = (line) => {
    const surface_is_the_graffiti_on = line[5] || null;
    const where_is_the_graffiti_located = line[6] || null;
    const ssa = line[14] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "graffitiremovalinsert",
        text: `INSERT INTO graffiti_removal(surface_is_the_graffiti_on, where_is_the_graffiti_located, ssa, type_of_service)
         values($1, $2, $3, $4)
         returning incident_id
         `,
        values: [surface_is_the_graffiti_on, where_is_the_graffiti_located, ssa, type_of_service]
    };


    return query;

};

module.exports = graffitiRemoval;