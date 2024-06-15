const express = require('express');
const routes = require('./routes/HomePageRoutes');

const app = express();

app.use("/", routes);

app.listen(8000, () => {
    console.log("server is listening in port 8000");
});