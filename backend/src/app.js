const express = require('express');
const app = express();
const morgan = require('morgan');
const compression = require('compression');
//init middleware
app.use(morgan("dev"));
app.use(compression());

//init db

//init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message:"Welcome "
    })
})
//handle error

module.exports = app;