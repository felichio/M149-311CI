const dbconfig = require("../../database/config/config");
const process = require("process");


module.exports = {
    ...dbconfig,
    express: {
        port: process.env.PORT || 8000,
        hostname: "0.0.0.0",
    }
};