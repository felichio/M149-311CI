

const abandonedVehicle = (line, location_id) => {
    const license_plate = line[5] || null;
    const vehicle_model = line[6] || null;
    const vehicle_color = line[7] || null;
    const current_activity = line[8] || null;
    const most_recent_action = line[9] || null;
    const days_as_parked = line[10] || null;
    const ssa = line[18] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "abandonedvehicleinsert",
        text: `INSERT INTO abandoned_vehicle(license_plate, vehicle_model, vehicle_color, current_activity, most_recent_action, days_as_parked, ssa, type_of_service, location_id)
         values($1, $2, $3, $4, $5, $6, $7, $8, $9)
         returning incident_id
         `,
        values: [license_plate, vehicle_model, vehicle_color, current_activity, most_recent_action, days_as_parked, ssa, type_of_service, location_id]
    };


    return query;

};

module.exports = abandonedVehicle;