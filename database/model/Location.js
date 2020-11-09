const {types} = require("../config/config")



const location = (line, type) => {
    let street_address = "";
    let zip_code = "";
    let xcoord = "";
    let ycoord = "";
    let ward = "";
    let police_district = "";
    let community_area = "";
    let lat = "";
    let lon = "";
    let historical_wards = "";
    let zip_codes = "";
    let community_areas = "";
    let census_tracts = "";
    let wards = "";
    if (type === types.abandonedVehicle) {
        street_address = line[11] || null;
        zip_code = line[12] || null;
        xcoord = line[13] || null;
        ycoord = line[14] || null;
        ward = line[15] || null;
        police_district = line[16] || null;
        community_area = line[17] || null;
        lat = line[19] || null;
        lon = line[20] || null;
        historical_wards = null;
        zip_codes = null;
        community_areas = null;
        census_tracts = null;
        wards = null;
    } else if (type === types.alleyLightsOut) {

    } else if (type === types.garbageCarts) {

    } else if (type === types.graffitiRemoval) {

    } else if (type === types.potHoles) {

    } else if (type === types.rodentBaiting) {

    } else if (type === types.sanitationCode) {

    } else if (type === types.streetLightsOut) {

    } else if (type === types.streetLightsOneOut) {

    } else if (type === types.treeDebris) {

    } else if (type === types.treeTrims) {

    }

    query = {
        name: "locationinsert",
        text: `INSERT INTO locationinfo(street_address, zip_code, xcoord, ycoord, ward, police_district, community_area, latitude, longitude, historical_wards, zip_codes, community_areas, census_tracts, wards) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        on conflict (latitude, longitude) do update set zip_code = excluded.zip_code returning location_id
        `,
        values: [street_address, zip_code, xcoord, ycoord, ward, police_district, community_area, lat, lon, historical_wards, zip_codes, community_areas, census_tracts, wards]
    };



    return query;
}


module.exports = location;