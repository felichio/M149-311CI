const {tables} = require("../../../database/config/config");

const getRequest = ({requestId, typeOfService}) => {
    query = {
        text: `select * from request r, ${tables[typeOfService]} t, locationinfo l, municipalityinfo m, historical_municipalityinfo h 
            where r.type_of_service = t.type_of_service and r.incident_id = t.incident_id and r.location_id = l.location_id and 
            r.municipality_id = m.municipality_id and r.historical_municipality_id = h.historical_municipality_id 
            and r.request_id = $1;
        `,
        values: [requestId]
    };

    return query;
};



module.exports = getRequest;