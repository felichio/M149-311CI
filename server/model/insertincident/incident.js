const {types} = require("../../../database/config/config");


const incident = type => {
    switch (type) {
        case types.abandonedVehicle:
            return ({licensePlate, vehicleModel, vehicleColor, currentActivity, mostRecentAction, daysAsParked, ssa, typeOfService}) => ({
                name: "abandonedvehicleinsert",
                text: `INSERT INTO abandoned_vehicle(license_plate, vehicle_model, vehicle_color, current_activity, most_recent_action, days_as_parked, ssa, type_of_service)
                 values($1, $2, $3, $4, $5, $6, $7, $8)
                 returning incident_id
                 `,
                values: [licensePlate || null, vehicleModel || null, vehicleColor || null, currentActivity || null, mostRecentAction || null, daysAsParked || null, ssa || null, typeOfService]
            });
        case types.alleyLightsOut:
            return ({typeOfService}) => ({
                name: "alleylightsoutinsert",
                text: `INSERT INTO alley_lights_out(type_of_service)
                 values($1)
                 returning incident_id
                 `,
                values: [typeOfService]
            });
        case types.garbageCarts:
            return ({numberOfBlackCarts, currentActivity, mostRecentActivity, ssa, typeOfService}) => ({
                name: "garbagecartsinsert",
                text: `INSERT INTO garbage_carts(number_of_black_carts_delivered, current_activity, most_recent_activity, ssa, type_of_service)
                    values($1, $2, $3, $4, $5)
                    returning incident_id
                    `,
                values: [numberOfBlackCarts || null, currentActivity || null, mostRecentActivity || null, ssa || null, typeOfService]
            });
        case types.graffitiRemoval:
            return ({surfaceIsTheGraffitOn, whereIsTheGraffitiLocated, ssa, typeOfService}) => ({
                name: "graffitiremovalinsert",
                text: `INSERT INTO graffiti_removal(surface_is_the_graffiti_on, where_is_the_graffiti_located, ssa, type_of_service)
                 values($1, $2, $3, $4)
                 returning incident_id
                 `,
                values: [surfaceIsTheGraffitOn || null, whereIsTheGraffitiLocated || null, ssa || null, typeOfService]
            });
        case types.potHoles:
            return ({currentActivity, mostRecentActivity, numberOfPotHolesFilled, ssa, typeOfService}) => ({
                name: "potholesinsert",
                text: `INSERT INTO pot_holes(current_activity, most_recent_activity, number_of_potholes_filled_on_block, ssa, type_of_service)
                 values($1, $2, $3, $4, $5)
                 returning incident_id
                 `,
                values: [currentActivity || null, mostRecentActivity || null, numberOfPotHolesFilled || null, ssa || null, typeOfService]
            });
        case types.rodentBaiting:
            return ({currentActivity, mostRecentActivity, numberOfPremises, numberOfPremisesGarbage, numberOfPremisesRats, typeOfService}) => ({
                name: "rodentbaitinginsert",
                text: `INSERT INTO rodent_baiting(current_activity, most_recent_activity, number_of_premises_baited, number_of_premises_with_garbage, number_of_premises_with_rats, type_of_service)
                 values($1, $2, $3, $4, $5, $6)
                 returning incident_id
                 `,
                values: [currentActivity || null, mostRecentActivity || null, numberOfPremises || null, numberOfPremisesGarbage || null, numberOfPremisesRats || null, typeOfService]
            });
        case types.sanitationCode:
            return ({natureOfCodeViolation, typeOfService}) => ({
                name: "sanitationcodeinsert",
                text: `INSERT INTO sanitation_code(nature_of_code_violations, type_of_service)
                 values($1, $2)
                 returning incident_id
                 `,
                values: [natureOfCodeViolation || null, typeOfService]
            });
        case types.streetLightsAllOut:
            return ({typeOfService}) => ({
                name: "streetlightsalloutinsert",
                text: `INSERT INTO street_lights_all_out(type_of_service)
                 values($1)
                 returning incident_id
                 `,
                values: [typeOfService]
            });
        case types.streetLightsOneOut:
            return ({typeOfService}) => ({
                name: "streetlightsoneoutinsert",
                text: `INSERT INTO street_lights_one_out(type_of_service)
                 values($1)
                 returning incident_id
                 `,
                values: [typeOfService]
            });
        case types.treeDebris:
            return ({currentActivity, mostRecentActivity, whereIsTheDebrisLocated, typeOfService}) => ({
                name: "treedebrisinsert",
                text: `INSERT INTO tree_debris(current_activity, most_recent_activity, where_is_the_debris_located, type_of_service)
                 values($1, $2, $3, $4)
                 returning incident_id
                 `,
                values: [currentActivity || null, mostRecentActivity || null, whereIsTheDebrisLocated || null, typeOfService]
            });
        case types.treeTrims:
            return ({locationOfTrees, typeOfService}) => ({
                name: "treetrimsinsert",
                text: `INSERT INTO tree_trims(location_of_trees, type_of_service)
                 values($1, $2)
                 returning incident_id
                 `,
                values: [locationOfTrees || null, typeOfService]
            });
    }
};

module.exports = incident;