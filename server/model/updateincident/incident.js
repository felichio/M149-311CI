const {types} = require("../../../database/config/config");


const incident = (type, incidentId) => {
    switch (type) {
        case types.abandonedVehicle:
            return ({licensePlate, vehicleModel, vehicleColor, currentActivity, mostRecentAction, daysAsParked, ssa, typeOfService}) => ({
                name: "abandonedvehicleupdate",
                text: `UPDATE abandoned_vehicle SET license_plate = $1, vehicle_model = $2, vehicle_color = $3, current_activity = $4, most_recent_action = $5, days_as_parked = $6, ssa = $7, type_of_service = $8
                 where incident_id = $9
                 `,
                values: [licensePlate || null, vehicleModel || null, vehicleColor || null, currentActivity || null, mostRecentAction || null, daysAsParked || null, ssa || null, typeOfService, incidentId]
            });
        case types.alleyLightsOut:
            return ({typeOfService}) => ({
                name: "alleylightsoutupdate",
                text: `UPDATE alley_lights_out SET type_of_service = $1 where incident_id = $2
                 `,
                values: [typeOfService, incidentId]
            });
        case types.garbageCarts:
            return ({numberOfBlackCarts, currentActivity, mostRecentActivity, ssa, typeOfService}) => ({
                name: "garbagecartsupdate",
                text: `UPDATE garbage_carts SET number_of_black_carts_delivered = $1, current_activity = $2, most_recent_activity = $3, ssa = $4, type_of_service = $5
                    where incident_id = $6
                    `,
                values: [numberOfBlackCarts || null, currentActivity || null, mostRecentActivity || null, ssa || null, typeOfService, incidentId]
            });
        case types.graffitiRemoval:
            return ({surfaceIsTheGraffitOn, whereIsTheGraffitiLocated, ssa, typeOfService}) => ({
                name: "graffitiremovalupdate",
                text: `UPDATE graffiti_removal SET surface_is_the_graffiti_on = $1, where_is_the_graffiti_located = $2, ssa = $3, type_of_service = $4
                where incident_id = $5
                 `,
                values: [surfaceIsTheGraffitOn || null, whereIsTheGraffitiLocated || null, ssa || null, typeOfService, incidentId]
            });
        case types.potHoles:
            return ({currentActivity, mostRecentActivity, numberOfPotHolesFilled, ssa, typeOfService}) => ({
                name: "potholesupdate",
                text: `UPDATE pot_holes SET current_activity = $1, most_recent_activity = $2, number_of_potholes_filled_on_block = $3, ssa = $4, type_of_service = $5
                where incident_id = $6
                 `,
                values: [currentActivity || null, mostRecentActivity || null, numberOfPotHolesFilled || null, ssa || null, typeOfService, incidentId]
            });
        case types.rodentBaiting:
            return ({currentActivity, mostRecentActivity, numberOfPremises, numberOfPremisesGarbage, numberOfPremisesRats, typeOfService}) => ({
                name: "rodentbaitingupdate",
                text: `UPDATE rodent_baiting SET current_activity = $1, most_recent_activity = $2, number_of_premises_baited = $3, number_of_premises_with_garbage = $4, number_of_premises_with_rats = $5, type_of_service = $6
                 where incident_id = $7
                 `,
                values: [currentActivity || null, mostRecentActivity || null, numberOfPremises || null, numberOfPremisesGarbage || null, numberOfPremisesRats || null, typeOfService, incidentId]
            });
        case types.sanitationCode:
            return ({natureOfCodeViolation, typeOfService}) => ({
                name: "sanitationcodeupdate",
                text: `UPDATE sanitation_code SET nature_of_code_violations = $1, type_of_service = $2
                    where incident_id = $3
                 `,
                values: [natureOfCodeViolation || null, typeOfService, incidentId]
            });
        case types.streetLightsAllOut:
            return ({typeOfService}) => ({
                name: "streetlightsalloutupdate",
                text: `UPDATE street_lights_all_out SET type_of_service = $1
                where incident_id = $2
                 `,
                values: [typeOfService, incidentId]
            });
        case types.streetLightsOneOut:
            return ({typeOfService}) => ({
                name: "streetlightsoneoutupdate",
                text: `UPDATE street_lights_one_out SET type_of_service = $1
                where incident_id = $2
                 `,
                values: [typeOfService, incidentId]
            });
        case types.treeDebris:
            return ({currentActivity, mostRecentActivity, whereIsTheDebrisLocated, typeOfService}) => ({
                name: "treedebrisupdate",
                text: `UPDATE tree_debris SET current_activity = $1, most_recent_activity = $2, where_is_the_debris_located = $3, type_of_service = $4
                where incident_id = $5
                 `,
                values: [currentActivity || null, mostRecentActivity || null, whereIsTheDebrisLocated || null, typeOfService, incidentId]
            });
        case types.treeTrims:
            return ({locationOfTrees, typeOfService}) => ({
                name: "treetrimsupdate",
                text: `UPDATE tree_trims SET location_of_trees = $1, type_of_service = $2
                where incident_id = $3
                 `,
                values: [locationOfTrees || null, typeOfService, incidentId]
            });
    }
};

module.exports = incident;