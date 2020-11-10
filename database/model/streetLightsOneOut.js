

const streetLightsOneOut = (line) => {
    const type_of_service = line[4];
    

    const query = {
        name: "streetlightsoneoutinsert",
        text: `INSERT INTO street_lights_one_out(type_of_service)
         values($1)
         returning incident_id
         `,
        values: [type_of_service]
    };


    return query;

};

module.exports = streetLightsOneOut;