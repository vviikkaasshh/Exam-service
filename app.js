const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const logger = require('./config/logger');
const fileUpload = require('express-fileupload');

var routes = require('./server/routes/routes.js')

const app = express();

// enable files upload
// should be comment out once upload funactionality work
app.use(fileUpload({
    createParentPath: true
}));


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',routes);



app.use((err, req, res, next) => {
    logger.saveError(err.stack);
    return res.status(err.status || err.statusCode || 500).send(err.message);
});

module.exports = app;
