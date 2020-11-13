const pg = require("pg");
const config = require("./config");


const client = new pg.Client({
    ...config.db
});


client.connect();


client.query("call clean_data()").then((d) => {
    client.end();
    console.log(`Database cleared`);
});