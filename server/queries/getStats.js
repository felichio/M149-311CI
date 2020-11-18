const getStats = () => ({
    totalRequests: {
        text: "select count(*) from request r",
    },
    closedRequests: {
        text: "select count(*) from request r where r.status = $1 or r.status = $2",
        values: ["Completed", "Completed - Dup"]
    },
    openRequests: {
        text: "select count(*) from request r where r.status = $1 or r.status = $2",
        values: ["Open", "Open - Dup"]
    }
});



module.exports = getStats;