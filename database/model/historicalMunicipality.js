const {types} = require("../config/config");



const historicalMunicipality = (line, type) => {
    
    let historical_wards = "";
    let zip_codes = "";
    let community_areas = "";
    let census_tracts = "";
    let wards = "";
    if (type === types.abandonedVehicle) {
        historical_wards = null;
        zip_codes = null;
        community_areas = null;
        census_tracts = null;
        wards = null;
    } else if (type === types.alleyLightsOut) {
        historical_wards = line[16] || null;
        zip_codes = line[17] || null;
        community_areas = line[18] || null;
        census_tracts = line[19] || null;
        wards = line[20] || null;
    } else if (type === types.garbageCarts) {
        historical_wards = line[20] || null;
        zip_codes = line[21] || null;
        community_areas = line[22] || null;
        census_tracts = line[23] || null;
        wards = line[24] || null;
    } else if (type === types.graffitiRemoval) {
        historical_wards = line[19] || null;
        zip_codes = line[20] || null;
        community_areas = line[21] || null;
        census_tracts = line[22] || null;
        wards = line[23] || null;
    } else if (type === types.potHoles) {
        historical_wards = line[20] || null;
        zip_codes = line[21] || null;
        community_areas = line[22] || null;
        census_tracts = line[23] || null;
        wards = line[24] || null;
    } else if (type === types.rodentBaiting) {
        historical_wards = line[21] || null;
        zip_codes = line[22] || null;
        community_areas = line[23] || null;
        census_tracts = line[24] || null;
        wards = line[25] || null;
    } else if (type === types.sanitationCode) {
        historical_wards = line[17] || null;
        zip_codes = line[18] || null;
        community_areas = line[19] || null;
        census_tracts = line[20] || null;
        wards = line[21] || null;
    } else if (type === types.streetLightsAllOut) {
        historical_wards = line[16] || null;
        zip_codes = line[17] || null;
        community_areas = line[18] || null;
        census_tracts = line[19] || null;
        wards = line[20] || null;
    } else if (type === types.streetLightsOneOut) {
        historical_wards = null;
        zip_codes = null;
        community_areas =  null;
        census_tracts = null;
        wards = null;
    } else if (type === types.treeDebris) {
        historical_wards = line[19] || null;
        zip_codes = line[20] || null;
        community_areas = line[21] || null;
        census_tracts = line[22] || null;
        wards = line[23] || null;
    } else if (type === types.treeTrims) {
        historical_wards = line[17] || null;
        zip_codes = line[18] || null;
        community_areas = line[19] || null;
        census_tracts = line[20] || null;
        wards = line[21] || null;
    }

    query = {
        name: "historicalmunicipalityinfoinsert",
        text: `INSERT INTO historical_municipalityinfo(historical_wards, zip_codes, community_areas, census_tracts, wards) 
        values($1, $2, $3, $4, $5)
        on conflict (coalesce(historical_wards, ''), coalesce(zip_codes, ''), coalesce(community_areas, ''), coalesce(census_tracts, ''), coalesce(wards, '')) do update set zip_codes = excluded.zip_codes returning historical_municipality_id
        `,
        values: [historical_wards, zip_codes, community_areas, census_tracts, wards]
    };



    return query;
}


module.exports = historicalMunicipality;