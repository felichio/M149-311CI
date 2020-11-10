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
        return abandonedVehicle(line);
    } else if (type === types.alleyLightsOut) {
        return alleyLightsOut(line);
    } else if (type === types.garbageCarts) {
        return garbageCarts(line);
    } else if (type === types.graffitiRemoval) {
        return graffitiRemoval(line);
    } else if (type === types.potHoles) {
        return potHoles(line);
    } else if (type === types.rodentBaiting) {
        return rodentBaiting(line);
    } else if (type === types.sanitationCode) {
        return sanitationCode(line);
    } else if (type === types.streetLightsAllOut) {
        return streetLightsAllOut(line);
    } else if (type === types.streetLightsOneOut) {
        return streetLightsOneOut(line);
    } else if (type === types.treeDebris) {
        return treeDebris(line);
    } else if (type === types.treeTrims) {
        return treeTrims(line);
    }
};


module.exports = incident;


