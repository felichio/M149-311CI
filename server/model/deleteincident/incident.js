const {types} = require("../../../database/config/config");


const incident = (type, incidentId) => {
    switch (type) {
        case types.abandonedVehicle:
            return () => ({
                name: "abandonedvehicledelete",
                text: `DELETE FROM abandoned_vehicle where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.alleyLightsOut:
            return () => ({
                name: "alleylightsoutdelete",
                text: `DELETE FROM alley_lights_out where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.garbageCarts:
            return () => ({
                name: "garbagecartsdelete",
                text: `DELETE FROM garbage_carts where incident_id = $1
                    `,
                values: [incidentId]
            });
        case types.graffitiRemoval:
            return () => ({
                name: "graffitiremovaldelete",
                text: `DELETE FROM graffiti_removal where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.potHoles:
            return () => ({
                name: "potholesdelete",
                text: `DELETE FROM pot_holes where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.rodentBaiting:
            return () => ({
                name: "rodentbaitingdelete",
                text: `DELETE FROM rodent_baiting where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.sanitationCode:
            return () => ({
                name: "sanitationcodedelete",
                text: `DELETE FROM sanitation_code where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.streetLightsAllOut:
            return () => ({
                name: "streetlightsalloutdelete",
                text: `DELETE FROM street_lights_all_out where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.streetLightsOneOut:
            return () => ({
                name: "streetlightsoneoutdelete",
                text: `DELETE FROM street_lights_one_out where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.treeDebris:
            return () => ({
                name: "treedebrisdelete",
                text: `DELETE FROM tree_debris where incident_id = $1
                 `,
                values: [incidentId]
            });
        case types.treeTrims:
            return () => ({
                name: "treetrimsdelete",
                text: `DELETE FROM tree_trims where incident_id = $1
                 `,
                values: [incidentId]
            });
    }
};

module.exports = incident;