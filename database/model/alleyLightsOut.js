

const alleyLightsOut = (line) => {
    const type_of_service = line[4];
    

    const query = {
        name: "alleylightsoutinsert",
        text: `INSERT INTO alley_lights_out(type_of_service)
         values($1)
         returning incident_id
         `,
        values: [type_of_service]
    };


    return query;

};

module.exports = alleyLightsOut;