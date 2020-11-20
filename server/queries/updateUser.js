

const updateUser = user => ({
    query: () =>  ({
        text: "update users set (username, email, password) = ($2, $3, $4) where user_id = $1",
        values: [user.id, user.username, user.email, user.password]
    }),
    log: () => ({
        text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
        values: [user.id, `${user.username} updated his user info`]
    })
});



module.exports = updateUser;