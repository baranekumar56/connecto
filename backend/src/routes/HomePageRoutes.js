const express = require('express');
const path = require("path");
const routes = express.Router();

routes.get('/', (req, res) => {
    // res.sendFile("C:\\Users\\Student.MAT-63\\Desktop\\connecto\\backend\\src\\public\\homepage.html");
    const file = path.join(__dirname, "../public/homepage.html");
    res.sendFile(file);
});


module.exports = routes;