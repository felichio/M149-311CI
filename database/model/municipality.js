const {types} = require("../config/config");



const municipality = (line, type) => {
    let ward = "";
    let police_district = "";
    let community_area = "";
    if (type === types.abandonedVehicle) {
        ward = line[15] || ward;
        police_district = line[16] || police_district;
        community_area = line[17] || community_area;
    } else if (type === types.alleyLightsOut) {
        ward = line[9] || ward;
        police_district = line[10] || police_district;
        community_area = line[11] || community_area;
    } else if (type === types.garbageCarts) {
        ward = line[12] || ward;
        police_district = line[13] || police_district;
        community_area = line[14] || community_area;
    } else if (type === types.graffitiRemoval) {
        ward = line[11] || ward;
        police_district = line[12] || police_district;
        community_area = line[13] || community_area;
    } else if (type === types.potHoles) {
        ward = line[12] || ward;
        police_district = line[13] || police_district;
        community_area = line[14] || community_area;
    } else if (type === types.rodentBaiting) {
        ward = line[14] || ward;
        police_district = line[15] || police_district;
        community_area = line[16] || community_area;
    } else if (type === types.sanitationCode) {
        ward = line[10] || ward;
        police_district = line[11] || police_district;
        community_area = line[12] || community_area;
    } else if (type === types.streetLightsAllOut) {
       
        ward = line[9] || ward;
        police_district = line[10] || police_district;
        community_area = line[11] || community_area;
        
    } else if (type === types.streetLightsOneOut) {
        ward = line[9] || ward;
        police_district = line[10] || police_district;
        community_area = line[11] || community_area;
    } else if (type === types.treeDebris) {
        ward = line[12] || ward;
        police_district = line[13] || police_district;
        community_area = line[14] || community_area;
    } else if (type === types.treeTrims) {
        ward = line[10] || ward;
        police_district = line[11] || police_district;
        community_area = line[12] || community_area;
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