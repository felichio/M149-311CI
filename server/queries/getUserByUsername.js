

const getUserByUsername = (username) => ({
    text: "select * from users where username = $1",
    values: [username]
});



module.exports = getUserByUsername;