const bcrypt = require("bcrypt");

const password = "random";

bcrypt.hash(password, 12).then(hash => console.log(hash));