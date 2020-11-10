

const sanitationCode = (line, location_id) => {
    const type_of_service = line[4];
    const nature_of_code_violations = line[5] || null;
    

    const query = {
        name: "sanitationcodeinsert",
        text: `INSERT INTO sanitation_code(nature_of_code_violations, type_of_service, location_id)
         values($1, $2, $3)
         returning incident_id
         `,
        values: [nature_of_code_violations, type_of_service, location_id]
    };


    return query;

};

module.exports = sanitationCode;