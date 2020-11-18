

const updateUser = user => ({
    text: "update users set (username, email, password) = ($2, $3, $4) where user_id = $1",
    values: [user.id, user.username, user.email, user.password]
});



module.exports = updateUser;