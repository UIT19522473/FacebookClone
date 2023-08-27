const express = require('express');
const app = express();
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors')

require('dotenv').config()


//init middleware
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
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

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
} )

app.use((err, req, res, next) => {
    const status = err.status || 500;

    return res.status(status).json({
        status: 'error',
        code: status,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app;