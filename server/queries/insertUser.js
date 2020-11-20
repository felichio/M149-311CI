

const insertUser = (user) => ({
    query: () => ({
        text: "insert into users(username, email, password) values($1, $2, $3) returning user_id",
        values: [user.username, user.email, user.password]
    }),
    log: (id) => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [id, `${user.username} registered in the app`]
    })
});



module.exports = insertUser;