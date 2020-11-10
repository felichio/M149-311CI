

const streetLightsAllOut = (line) => {
    const type_of_service = line[4];
    

    const query = {
        name: "streetlightsalloutinsert",
        text: `INSERT INTO street_lights_all_out(type_of_service)
         values($1)
         returning incident_id
         `,
        values: [type_of_service]
    };


    return query;

};

module.exports = streetLightsAllOut;