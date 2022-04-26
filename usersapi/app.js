var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var studentsRouter = require('./routes/students');
var questionsRouter = require('./routes/questions');

var app = express();

var corsOptions = {
    origin: process.env.ORIGIN_ADDRESS,
    optionsSuccessStatus: 200
}
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
app.use('/users', studentsRouter);
app.use('/questions', questionsRouter);


module.exports = app;
