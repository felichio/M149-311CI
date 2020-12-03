const pg = require("pg");
const Cursor = require("pg-cursor");
const config = require("../config/config");



const pool = new pg.Pool({
    ...config.db,
    max: 100,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 5000,
    
});

setInterval(() => {
    pool.connect().then(client => {
        let cursor = client.query(new Cursor(`with loc as (select * from locationinfo) select * from request r, loc l`));
        // client.release();
    
        cursor.read(100, (err, rows) => {
            if (err) console.log(err);
            console.log(rows);
            console.log("------------------------");
            cursor.read(100, (err, rows) => {
                console.log(rows);
                console.log("------------------------");
    
                cursor.close();
            })
        });
    });
}, 100);


// for (let i = 0; i < 100; i++) {
//     pool.connect().then(c => {
//         console.log(`Connection ${i}`);
//         c.query("select now()");
        
//     }).catch(e => console.log(e))
// };

