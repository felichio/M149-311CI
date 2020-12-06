

const municipality = ({ward, policeDistrict, communityArea}) => {
    const query = {
        name: "municipalityinsert",
        text: `INSERT INTO municipalityinfo(ward, police_district, community_area) 
        values($1, $2, $3)
        on conflict (coalesce(ward, ''), coalesce(police_district, ''), coalesce(community_area, '')) do update set ward = excluded.ward returning municipality_id
        `,
        values: [ward || null, policeDistrict || null, communityArea || null]
    };

    return query;
};



module.exports = municipality;