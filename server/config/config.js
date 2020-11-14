const dbconfig = require("../../database/config/config");
const process = require("process");
const security = require("./security.json");

module.exports = {
    ...dbconfig,
    express: {
        port: process.env.PORT || 8000,
        hostname: "0.0.0.0",
    },
    security,
};