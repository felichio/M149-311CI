const {types} = require("../config/config");



const location = (line, type) => {
    let street_address = "";
    let zip_code = "";
    let xcoord = "";
    let ycoord = "";
    let lat = "";
    let lon = "";
    
    if (type === types.abandonedVehicle) {
        street_address = line[11] || null;
        zip_code = line[12] || null;
        xcoord = line[13] || null;
        ycoord = line[14] || null;
        lat = line[19] || null;
        lon = line[20] || null;
        
    } else if (type === types.alleyLightsOut) {
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
        lat = line[12] || null;
        lon = line[13] || null;
        
    } else if (type === types.garbageCarts) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
       
        lat = line[16] || null;
        lon = line[17] || null;
        
    } else if (type === types.graffitiRemoval) {
        street_address = line[7] || null;
        zip_code = line[8] || null;
        xcoord = line[9] || null;
        ycoord = line[10] || null;
       
        lat = line[15] || null;
        lon = line[16] || null;
        
    } else if (type === types.potHoles) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
       
        lat = line[16] || null;
        lon = line[17] || null;
        
    } else if (type === types.rodentBaiting) {
        street_address = line[10] || null;
        zip_code = line[11] || null;
        xcoord = line[12] || null;
        ycoord = line[13] || null;
       
        lat = line[17] || null;
        lon = line[18] || null;
        
    } else if (type === types.sanitationCode) {
        street_address = line[6] || null;
        zip_code = line[7] || null;
        xcoord = line[8] || null;
        ycoord = line[9] || null;
        
        lat = line[13] || null;
        lon = line[14] || null;
        
    } else if (type === types.streetLightsAllOut) {
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
      
        lat = line[12] || null;
        lon = line[13] || null;
        
    } else if (type === types.streetLightsOneOut) {
        street_address = line[5] || null;
        zip_code = line[6] || null;
        xcoord = line[7] || null;
        ycoord = line[8] || null;
        
        lat = line[12] || null;
        lon = line[13] || null;
        
    } else if (type === types.treeDebris) {
        street_address = line[8] || null;
        zip_code = line[9] || null;
        xcoord = line[10] || null;
        ycoord = line[11] || null;
        
        lat = line[15] || null;
        lon = line[16] || null;
        
    } else if (type === types.treeTrims) {
        street_address = line[6] || null;
        zip_code = line[7] || null;
        xcoord = line[8] || null;
        ycoord = line[9] || null;
       
        lat = line[13] || null;
        lon = line[14] || null;
        
    }

    query = {
        name: "locationinsert",
        text: `INSERT INTO locationinfo(street_address, zip_code, xcoord, ycoord, latitude, longitude) 
        values($1, $2, $3, $4, $5, $6)
        on conflict (coalesce(latitude, 0), coalesce(longitude, 0)) do update set zip_code = excluded.zip_code returning location_id
        `,
        values: [street_address, zip_code, xcoord, ycoord, lat, lon]
    };



    return query;
}


module.exports = location;