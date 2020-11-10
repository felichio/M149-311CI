

const streetLightsAllOut = (line, location_id) => {
    const type_of_service = line[4];
    

    const query = {
        name: "streetlightsalloutinsert",
        text: `INSERT INTO street_lights_all_out(type_of_service, location_id)
         values($1, $2)
         returning incident_id
         `,
        values: [type_of_service, location_id]
    };


    return query;

};

module.exports = streetLightsAllOut;