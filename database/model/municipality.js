const {types} = require("../config/config");



const municipality = (line, type) => {
    let ward = "";
    let police_district = "";
    let community_area = "";
    if (type === types.abandonedVehicle) {
        ward = line[15] || null;
        police_district = line[16] || null;
        community_area = line[17] || null;
    } else if (type === types.alleyLightsOut) {
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
    } else if (type === types.garbageCarts) {
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
    } else if (type === types.graffitiRemoval) {
        ward = line[11] || null;
        police_district = line[12] || null;
        community_area = line[13] || null;
    } else if (type === types.potHoles) {
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
    } else if (type === types.rodentBaiting) {
        ward = line[14] || null;
        police_district = line[15] || null;
        community_area = line[16] || null;
    } else if (type === types.sanitationCode) {
        ward = line[10] || null;
        police_district = line[11] || null;
        community_area = line[12] || null;
    } else if (type === types.streetLightsAllOut) {
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
    } else if (type === types.streetLightsOneOut) {
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
    } else if (type === types.treeDebris) {
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
    } else if (type === types.treeTrims) {
        ward = line[10] || null;
        police_district = line[11] || null;
        community_area = line[12] || null;
    }

    query = {
        name: "municipalityinsert",
        text: `INSERT INTO municipalityinfo(ward, police_district, community_area) 
        values($1, $2, $3)
        on conflict (ward, police_district, community_area) do update set ward = excluded.ward returning municipality_id
        `,
        values: [ward, police_district, community_area]
    };



    return query;
}


module.exports = municipality;