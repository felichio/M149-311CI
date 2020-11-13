const pg = require("pg");
const util = require("./model/util");



const {db, types} = require("./config/config");

const pool = new pg.Pool({
    ...db,
});





// util.read(util.reader("./data/311-service-requests-abandoned-vehicles.csv"), types.abandonedVehicle, pool); // ok
// util.read(util.reader("./data/311-service-requests-alley-lights-out.csv"), types.alleyLightsOut, pool);  // ok
// util.read(util.reader("./data/311-service-requests-garbage-carts.csv"), types.garbageCarts, pool);
// util.read(util.reader("./data/311-service-requests-graffiti-removal.csv"), types.graffitiRemoval, pool);
// util.read(util.reader("./data/311-service-requests-pot-holes-reported.csv"), types.potHoles, pool);
// util.read(util.reader("./data/311-service-requests-rodent-baiting.csv"), types.rodentBaiting, pool);
// util.read(util.reader("./data/311-service-requests-sanitation-code-complaints.csv"), types.sanitationCode, pool);
// util.read(util.reader("./data/311-service-requests-street-lights-all-out.csv"), types.streetLightsAllOut, pool);
// util.read(util.reader("./data/311-service-requests-street-lights-one-out.csv"), types.streetLightsOneOut, pool);
// util.read(util.reader("./data/311-service-requests-tree-debris.csv"), types.treeDebris, pool);
// util.read(util.reader("./data/311-service-requests-tree-trims.csv"), types.treeTrims, pool);









