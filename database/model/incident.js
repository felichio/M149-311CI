const {types} = require("../config/config");
const abandonedVehicle = require("./abandonedVehicle");
const alleyLightsOut = require("./alleyLightsOut");
const garbageCarts = require("./garbageCarts");
const graffitiRemoval = require("./graffitiRemoval");
const potHoles = require("./potHoles");
const rodentBaiting = require("./rodentBaiting");
const sanitationCode = require("./sanitationCode");
const streetLightsAllOut = require("./streetLightsAllOut");
const streetLightsOneOut = require("./streetLightsOneOut");
const treeDebris = require("./treeDebris");
const treeTrims = require("./treeTrims");


const incident = (type, line, location_id) => {
    if (type === types.abandonedVehicle) {
        return abandonedVehicle(line, location_id);
    } else if (type === types.alleyLightsOut) {
        return alleyLightsOut(line, location_id);
    } else if (type === types.garbageCarts) {
        return garbageCarts(line, location_id);
    } else if (type === types.graffitiRemoval) {
        return graffitiRemoval(line, location_id);
    } else if (type === types.potHoles) {
        return potHoles(line, location_id);
    } else if (type === types.rodentBaiting) {
        return rodentBaiting(line, location_id);
    } else if (type === types.sanitationCode) {
        return sanitationCode(line, location_id);
    } else if (type === types.streetLightsAllOut) {
        return streetLightsAllOut(line, location_id);
    } else if (type === types.streetLightsOneOut) {
        return streetLightsOneOut(line, location_id);
    } else if (type === types.treeDebris) {
        return treeDebris(line, location_id);
    } else if (type === types.treeTrims) {
        return treeTrims(line, location_id);
    }
};


module.exports = incident;


