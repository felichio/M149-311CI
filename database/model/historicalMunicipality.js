const {types} = require("../config/config");



const historicalMunicipality = (line, type) => {
    
    let historical_wards = "";
    let zip_codes = "";
    let community_areas = "";
    let census_tracts = "";
    let wards = "";
    if (type === types.abandonedVehicle) {
        historical_wards = historical_wards;
        zip_codes = zip_codes;
        community_areas = community_areas;
        census_tracts = census_tracts;
        wards = wards;
    } else if (type === types.alleyLightsOut) {
        historical_wards = line[16] || historical_wards;
        zip_codes = line[17] || zip_codes;
        community_areas = line[18] || community_areas;
        census_tracts = line[19] || census_tracts;
        wards = line[20] || wards;
    } else if (type === types.garbageCarts) {
        historical_wards = line[20] || historical_wards;
        zip_codes = line[21] || zip_codes;
        community_areas = line[22] || community_areas;
        census_tracts = line[23] || census_tracts;
        wards = line[24] || wards;
    } else if (type === types.graffitiRemoval) {
        historical_wards = line[19] || historical_wards;
        zip_codes = line[20] || zip_codes;
        community_areas = line[21] || community_areas;
        census_tracts = line[22] || census_tracts;
        wards = line[23] || wards;
    } else if (type === types.potHoles) {
        historical_wards = line[20] || historical_wards;
        zip_codes = line[21] || zip_codes;
        community_areas = line[22] || community_areas;
        census_tracts = line[23] || census_tracts;
        wards = line[24] || wards;
    } else if (type === types.rodentBaiting) {
        historical_wards = line[21] || historical_wards;
        zip_codes = line[22] || zip_codes;
        community_areas = line[23] || community_areas;
        census_tracts = line[24] || census_tracts;
        wards = line[25] || wards;
    } else if (type === types.sanitationCode) {
        historical_wards = line[17] || historical_wards;
        zip_codes = line[18] || zip_codes;
        community_areas = line[19] || community_areas;
        census_tracts = line[20] || census_tracts;
        wards = line[21] || wards;
    } else if (type === types.streetLightsAllOut) {
        historical_wards = line[16] || historical_wards;
        zip_codes = line[17] || zip_codes;
        community_areas = line[18] || community_areas;
        census_tracts = line[19] || census_tracts;
        wards = line[20] || wards;
    } else if (type === types.streetLightsOneOut) {
        historical_wards = historical_wards;
        zip_codes = zip_codes;
        community_areas =  community_areas;
        census_tracts = census_tracts;
        wards = wards;
    } else if (type === types.treeDebris) {
        historical_wards = line[19] || historical_wards;
        zip_codes = line[20] || zip_codes;
        community_areas = line[21] || community_areas;
        census_tracts = line[22] || census_tracts;
        wards = line[23] || wards;
    } else if (type === types.treeTrims) {
        historical_wards = line[17] || historical_wards;
        zip_codes = line[18] || zip_codes;
        community_areas = line[19] || community_areas;
        census_tracts = line[20] || census_tracts;
        wards = line[21] || wards;
    }

    query = {
        name: "historicalmunicipalityinfoinsert",
        text: `INSERT INTO historical_municipalityinfo(historical_wards, zip_codes, community_areas, census_tracts, wards) 
        values($1, $2, $3, $4, $5)
        on conflict (historical_wards, zip_codes, community_areas, census_tracts, wards) do update set zip_codes = excluded.zip_codes returning historical_municipality_id
        `,
        values: [historical_wards, zip_codes, community_areas, census_tracts, wards]
    };



    return query;
}


module.exports = historicalMunicipality;