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
            streetLightsAllOut: "Street Lights - All/Out",
            streetLightsOneOut: "Street Light Out",
            treeDebris: "Tree Debris",
            treeTrims: "Tree Trim"
        },
        tables: {
            "Abandoned Vehicle Complaint": "abandoned_vehicle",
            "Alley Light Out" : "alley_lights_out",
            "Garbage Cart Black Maintenance/Replacement": "garbage_carts",
            "Graffiti Removal": "graffiti_removal",
            "Pothole in Street": "pot_holes",
            "Rodent Baiting/Rat Complaint": "rodent_baiting",
            "Sanitation Code Violation": "sanitation_code",
            "Street Lights - All/Out": "street_lights_all_out",
            "Street Light Out": "street_lights_one_out",
            "Tree Debris": "tree_debris",
            "Tree Trim": "tree_trims"
        }
    }
);