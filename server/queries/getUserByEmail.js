

const getUserByEmail = (email) => ({
    text: "select * from users where email = $1",
    values: [email]
});



module.exports = getUserByEmail;