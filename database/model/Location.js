const {db, types} = require("../config/config")



const location = (line, type) => {
    let street_address = "";
    let zip_code = "";
    let location_point = {x: "", y: ""}
    let ward = "";
    let police_district = "";
    let community_area = "";
    let geo_point = {lat: "", lon: ""};
    if (type === types.abandonedVehicle) {
        street_address = line[11];
        zip_code = line[12];
        location_point.x = line[13];
        location_point.y = line[14];
        ward = line[15];
        police_district = line[16];
        community_area = line[17];
        geo_point.lat = line[19];
        geo_point.lon = line[20];
    }



    return ({
        street_address: street_address || null,
        zip_code: zip_code || null,
        location_point: location_point.x == "" && location_point.y == "" ? {x: null, y: null} : location_point,
        ward: ward || null,
        police_district: police_district || null,
        community_area: community_area || null,
        geo_point: geo_point.lat == "" && geo_point.lon == "" ? {lat: null, lon: null} : geo_point,
    });
}


module.exports = location;