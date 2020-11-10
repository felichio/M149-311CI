const {types} = require("../config/config");



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
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
        lat = line[12] || null;
        lon = line[13] || null;
        historical_wards = line[16] || null;
        zip_codes = line[17] || null;
        community_areas = line[18] || null;
        census_tracts = line[19] || null;
        wards = line[20] || null;
    } else if (type === types.garbageCarts) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
        lat = line[16] || null;
        lon = line[17] || null;
        historical_wards = line[20] || null;
        zip_codes = line[21] || null;
        community_areas = line[22] || null;
        census_tracts = line[23] || null;
        wards = line[24] || null;
    } else if (type === types.graffitiRemoval) {
        street_address = line[7] || null;
        zip_code = line[8] || null;
        xcoord = line[9] || null;
        ycoord = line[10] || null;
        ward = line[11] || null;
        police_district = line[12] || null;
        community_area = line[13] || null;
        lat = line[15] || null;
        lon = line[16] || null;
        historical_wards = line[19] || null;
        zip_codes = line[20] || null;
        community_areas = line[21] || null;
        census_tracts = line[22] || null;
        wards = line[23] || null;
    } else if (type === types.potHoles) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
        lat = line[16] || null;
        lon = line[17] || null;
        historical_wards = line[20] || null;
        zip_codes = line[21] || null;
        community_areas = line[22] || null;
        census_tracts = line[23] || null;
        wards = line[24] || null;
    } else if (type === types.rodentBaiting) {
        street_address = line[10] || null;
        zip_code = line[11] || null;
        xcoord = line[12] || null;
        ycoord = line[13] || null;
        ward = line[14] || null;
        police_district = line[15] || null;
        community_area = line[16] || null;
        lat = line[17] || null;
        lon = line[18] || null;
        historical_wards = line[21] || null;
        zip_codes = line[22] || null;
        community_areas = line[23] || null;
        census_tracts = line[24] || null;
        wards = line[25] || null;
    } else if (type === types.sanitationCode) {
        street_address = line[6] || null;
        zip_code = line[7] || null;
        xcoord = line[8] || null;
        ycoord = line[9] || null;
        ward = line[10] || null;
        police_district = line[11] || null;
        community_area = line[12] || null;
        lat = line[13] || null;
        lon = line[14] || null;
        historical_wards = line[17] || null;
        zip_codes = line[18] || null;
        community_areas = line[19] || null;
        census_tracts = line[20] || null;
        wards = line[21] || null;
    } else if (type === types.streetLightsAllOut) {
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
        lat = line[12] || null;
        lon = line[13] || null;
        historical_wards = line[16] || null;
        zip_codes = line[17] || null;
        community_areas = line[18] || null;
        census_tracts = line[19] || null;
        wards = line[20] || null;
    } else if (type === types.streetLightsOneOut) {
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
        ward = line[9] || null;
        police_district = line[10] || null;
        community_area = line[11] || null;
        lat = line[12] || null;
        lon = line[13] || null;
        historical_wards = null;
        zip_codes = null;
        community_areas =  null;
        census_tracts = null;
        wards = null;
    } else if (type === types.treeDebris) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
        ward = line[12] || null;
        police_district = line[13] || null;
        community_area = line[14] || null;
        lat = line[15] || null;
        lon = line[16] || null;
        historical_wards = line[19] || null;
        zip_codes = line[20] || null;
        community_areas = line[21] || null;
        census_tracts = line[22] || null;
        wards = line[23] || null;
    } else if (type === types.treeTrims) {
        street_address = line[6] || null;
        zip_code = line[7] || null;
        xcoord = line[8] || null;
        ycoord = line[9] || null;
        ward = line[10] || null;
        police_district = line[11] || null;
        community_area = line[12] || null;
        lat = line[13] || null;
        lon = line[14] || null;
        historical_wards = line[17] || null;
        zip_codes = line[18] || null;
        community_areas = line[19] || null;
        census_tracts = line[20] || null;
        wards = line[21] || null;
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