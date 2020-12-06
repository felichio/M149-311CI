const {tables} = require("../../../database/config/config");

const getTypeOfRequest = (requestId) => {
    query = {
        name: "gettypeofrequest",
        text: `select r.type_of_service from request r where r.request_id = $1`,
        values: [requestId]
    };

    return query;
};



module.exports = getTypeOfRequest;