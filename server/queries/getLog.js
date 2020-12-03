

const getLog = (id) => ({
    text: "select logtext, to_char(datetime, 'DD/MM/YYYY HH24:MI:SS') as datetime from log l where l.user_id = $1 order by datetime desc",
    values: [id],
    
});



module.exports = getLog;