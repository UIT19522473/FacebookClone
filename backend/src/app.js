const express = require('express');
const app = express();
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config()


//init middleware
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//init db
require('./dbs/init.mongodb');

//init routes
app.use('/',require('./routes/index'))
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message:"Welcome "
    })
})
//handle error

module.exports = app;