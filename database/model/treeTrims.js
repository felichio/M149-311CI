

const treeTrims = (line) => {
    
    const location_of_trees = line[5] || null;
    const type_of_service = line[4];
    

    const query = {
        name: "treetrimsinsert",
        text: `INSERT INTO tree_trims(location_of_trees, type_of_service)
         values($1, $2)
         returning incident_id
         `,
        values: [location_of_trees, type_of_service]
    };


    return query;

};

module.exports = treeTrims;