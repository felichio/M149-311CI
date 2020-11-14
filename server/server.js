const express = require("express");
const path = require("path");
const config = require("./config/config");

const app = express();
const authRouter = require("./routers/authRouter");

// use middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "..", "client", "public")));


app.use("/api", authRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "public", "html", "index.html"));
});


app.listen(config.express.port, config.express.hostname, () => console.log(`Web Server listening on port: ${config.express.port}`));