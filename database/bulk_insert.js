const pg = require("pg");
const process = require("process");
const util = require("./model/util");


const {db, types} = require("./config/config");

const pool = new pg.Pool({
    ...db,
});


switch (process.argv[2]) {
    case "1":
        util.read(util.reader("./data/311-service-requests-abandoned-vehicles.csv"), types.abandonedVehicle, pool);
        break;
    case "2":
        util.read(util.reader("./data/311-service-requests-alley-lights-out.csv"), types.alleyLightsOut, pool);
        break;
    case "3":
        util.read(util.reader("./data/311-service-requests-garbage-carts.csv"), types.garbageCarts, pool);
        break;
    case "4":
        util.read(util.reader("./data/311-service-requests-graffiti-removal.csv"), types.graffitiRemoval, pool);
        break;
    case "5":
        util.read(util.reader("./data/311-service-requests-pot-holes-reported.csv"), types.potHoles, pool);
        break;
    case "6":
        util.read(util.reader("./data/311-service-requests-rodent-baiting.csv"), types.rodentBaiting, pool);
        break;
    case "7":
        util.read(util.reader("./data/311-service-requests-sanitation-code-complaints.csv"), types.sanitationCode, pool);
        break;
    case "8":
        util.read(util.reader("./data/311-service-requests-street-lights-all-out.csv"), types.streetLightsAllOut, pool);
        break;
    case "9":
        util.read(util.reader("./data/311-service-requests-street-lights-one-out.csv"), types.streetLightsOneOut, pool);
        break;
    case "10":
        util.read(util.reader("./data/311-service-requests-tree-debris.csv"), types.treeDebris, pool);
        break;
    case "11":
        util.read(util.reader("./data/311-service-requests-tree-trims.csv"), types.treeTrims, pool);
        break;
    default:
        process.exit(1);
}


// util.read(util.reader("./data/311-service-requests-abandoned-vehicles.csv"), types.abandonedVehicle, pool); // ok
// util.read(util.reader("./data/311-service-requests-alley-lights-out.csv"), types.alleyLightsOut, pool);  // ok
// util.read(util.reader("./data/311-service-requests-garbage-carts.csv"), types.garbageCarts, pool);
// util.read(util.reader("./data/311-service-requests-graffiti-removal.csv"), types.graffitiRemoval, pool); // ok
// util.read(util.reader("./data/311-service-requests-pot-holes-reported.csv"), types.potHoles, pool);
// util.read(util.reader("./data/311-service-requests-rodent-baiting.csv"), types.rodentBaiting, pool); //ok
// util.read(util.reader("./data/311-service-requests-sanitation-code-complaints.csv"), types.sanitationCode, pool);
// util.read(util.reader("./data/311-service-requests-street-lights-all-out.csv"), types.streetLightsAllOut, pool);
// util.read(util.reader("./data/311-service-requests-street-lights-one-out.csv"), types.streetLightsOneOut, pool);
// util.read(util.reader("./data/311-service-requests-tree-debris.csv"), types.treeDebris, pool);
// util.read(util.reader("./data/311-service-requests-tree-trims.csv"), types.treeTrims, pool);









