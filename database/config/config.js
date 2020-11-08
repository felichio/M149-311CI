const process = require("process");
const credentials = require("./credentials.json");

module.exports = (
    {
        db: {
            user: process.env.PGUSER || credentials.user,
            host: process.env.PGHOST || credentials.host,
            password: process.env.PGPASSWORD || credentials.password,
            database: process.env.PGDATABASE || credentials.database,
            port: process.env.PGPORT || credentials.port || 5432,
        },
        types: {
            abandonedVehicle: "Abandoned Vehicle Complaint",
            
            
        }
    }
);