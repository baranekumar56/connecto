const express = require('express');
const homePageRoutes = require('./routes/HomePageRoutes.js');

const app = express();

app.use("/home", homePageRoutes);

app.listen(8000, () => {
    console.log("server is listening in port 8000");
});