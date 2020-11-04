const express = require("express");
const path = require("path");




const app = express();

// use middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "public", "html", "index.html"));
});


app.listen(8080, () => console.log("all good!"));