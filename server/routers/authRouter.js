const express = require("express");
const router = express.Router();



// @ PUBLIC POST /login
router.post("/login", (req, res) => {
    console.log(req.body)
});



module.exports = router;