

const log = (attempt, user) => ({
    text: "insert into log(user_id, logtext, datetime) values($1, $2, now())",
    values: [user.id, `${attempt ? `Successful` : `Unsuccessful`} login attempt by ${user.username}`]
});


module.exports = log;