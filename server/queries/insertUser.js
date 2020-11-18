

const insertUser = (user) => ({
    text: "insert into users(username, email, password) values ($1, $2, $3)",
    values: [user.username, user.email, user.password]
});



module.exports = insertUser;