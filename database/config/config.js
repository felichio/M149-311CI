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
            alleyLightsOut: "Alley Light Out",
            garbageCarts: "Garbage Cart Black Maintenance/Replacement",
            graffitiRemoval: "Graffiti Removal",
            potHoles: "Pothole in Street",
            rodentBaiting: "Rodent Baiting/Rat Complaint",
            sanitationCode: "Sanitation Code Violation",
            streetLightsOut: "Street Lights - All/Out",
            streetLightsOneOut: "Street Light Out",
            treeDebris: "Tree Debris",
            treeTrims: "Tree Trim"
        }
    }
);