

const request = (line) => {
    const splitted = line.split(",");

    const creationDate = splitted[0];
    const status = splitted[1];
    const completionDate = splitted[2];
    const serviceRequestNumber = splitted[3];
    const type = splitted[4];

    return ({
        creationDate,
        status,
        completionDate: completionDate || null,
        serviceRequestNumber,
        type,
    });
};


module.exports = request;