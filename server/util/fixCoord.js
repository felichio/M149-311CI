

const fixCoor = (point1, point2) => {
    point1.lat = parseFloat(point1.lat);
    point1.lon = parseFloat(point1.lon);
    point2.lat = parseFloat(point2.lat);
    point2.lon = parseFloat(point2.lon);

    if (point1.lat >= point2.lat) {
        if (point2.lon < point1.lon) {
            let temp = point1.lon;
            point1.lon = point2.lon;
            point2.lon = temp;
            
        } 
        return ({
            topLeft: point1,
            bottomRight: point2
        });
    } else {
        if (point2.lon > point1.lon) {
            let temp = point2.lon;
            point2.lon = point1.lon;
            point1.lon = temp;
        }
        return ({
            topLeft: point2,
            bottomRight: point1
        });
    }
};




module.exports = fixCoor;