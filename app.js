require('dotenv').config();

const express = require('express')
const config = require('./config/config')
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/', require("./router/index"))

app.listen(config.APP_PORT, () => {
    console.log(`Running on port ${config.APP_PORT}`);

});
