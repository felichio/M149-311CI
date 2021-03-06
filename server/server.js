const express = require("express");
const path = require("path");
const config = require("./config/config");

const app = express();
const authRouter = require("./routers/authRouter");
const statsRouter = require("./routers/statsRouter");
const updateUserRouter = require("./routers/updateUserRouter");
const logInfoRouter = require("./routers/logInfoRouter");
const predeterminedRouter = require("./routers/predeterminedRouter");
const incidentRouter = require("./routers/incidentRouter");

const pg = require("pg");
const poolMid = require("./middleware/pool");

const authorization = require("./middleware/authorization");

const pool = new pg.Pool({
    ...config.db,
});


// use middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "..", "client", "public")));


app.use("/api", poolMid(pool));

app.use("/api", statsRouter);
app.use("/api", authRouter);
app.use("/api", updateUserRouter);
app.use("/api", logInfoRouter);
app.use("/api/predetermined", predeterminedRouter);
app.use("/api", incidentRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
});


app.listen(config.express.port, config.express.hostname, () => console.log(`Web Server listening on port: ${config.express.port}`));