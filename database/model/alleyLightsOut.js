

const alleyLightsOut = (line, location_id) => {
    const type_of_service = line[4];
    

    const query = {
        name: "alleylightsoutinsert",
        text: `INSERT INTO alley_lights_out(type_of_service, location_id)
         values($1, $2)
         returning incident_id
         `,
        values: [type_of_service, location_id]
    };


    return query;

};

module.exports = alleyLightsOut;