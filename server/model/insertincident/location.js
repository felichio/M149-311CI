


const location = ({streetAddress, zipCode, xycoord, point1}) => {
    query = {
        name: "locationinsert",
        text: `INSERT INTO locationinfo(street_address, zip_code, xcoord, ycoord, latitude, longitude) 
        values($1, $2, $3, $4, $5, $6)
        on conflict (coalesce(latitude, 0), coalesce(longitude, 0)) do update set zip_code = excluded.zip_code returning location_id
        `,
        values: [streetAddress || null, zipCode || null, xycoord.xcoord || null, xycoord.ycoord || null, point1.lat || null, point1.lon || null]
    };

    return query;
};



module.exports = location;