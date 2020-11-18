

const pool = (resource) => {
    return (req, res, next) => {
        req.dbResource = resource;
        next();
    }
};



module.exports = pool;