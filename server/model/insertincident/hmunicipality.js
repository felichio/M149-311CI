


const hmunicipality = ({historicalWards, zipCodes, communityAreas, censusTracts, wards}) => {
    query = {
        name: "historicalmunicipalityinfoinsert",
        text: `INSERT INTO historical_municipalityinfo(historical_wards, zip_codes, community_areas, census_tracts, wards) 
        values($1, $2, $3, $4, $5)
        on conflict (coalesce(historical_wards, ''), coalesce(zip_codes, ''), coalesce(community_areas, ''), coalesce(census_tracts, ''), coalesce(wards, '')) do update set zip_codes = excluded.zip_codes returning historical_municipality_id
        `,
        values: [historicalWards || null, zipCodes || null, communityAreas || null, censusTracts || null, wards || null]
    };

    return query;
};


module.exports = hmunicipality;