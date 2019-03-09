const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const allData = require('../routes/router');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Data = require('../models/data');

const app = express();
const port = 5500;


// I will now connect to my database
mySequelize = new Sequelize('Fast', 'root', '[password]', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test database connection here

mySequelize.authenticate().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Failed to connect to database \n ' + err);
});





app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());

// handling  GET requests  that are sent to the fast endpoint
app.get('/fast', (req, res, next) => {
    const allData = Data.findAll({}).then(function (data) {
        const stringed = JSON.stringify(data);
        console.log('sending this response ', JSON.parse(stringed));
        res.send(JSON.parse(stringed));
    }).catch((err) => {
        console.log(err);
    });

});

//Handling post requests that are sent to the server

app.post('/fast', (req, res) => {

    console.log(req.body);

    const myData = Data.create({
        oxyVal: req.body.oxyVal,
        mqState: req.body.mqState,
        now: req.body.createdAt,
        id: req.body.id
    }).then((result) => {
        console.log(result);
        res.send('Record successfully saved');

    }).catch((err) => {
        console.log(err);
        res.send("Error sending data")
    });
    console.log(myData);
    //res.send('Record successfully saved');
    //console.log(myData);
});

// Handling GET requests for dangerous data that are read by the sensors

app.get('/fast/dangerous/', (req, res) => {
    Data.findAll({
        where: {
            [Op.or]: {
                mqState: 1,
                oxyVal: {
                    [Op.lt]: 18
                },
            }
        }
    }).then(function (data) {
        const mydata = JSON.stringify(data);
        console.log('sending this response ', JSON.parse(mydata));
        res.send(JSON.parse(mydata))
    }).catch((err) => {
        console.log(err);
    });
});

// Handling GET requests for dangerous data for a stated date

app.get('/fast/dangerous/:now', (req, res) => {
    Data.findAll({
        where: {
            now: req.query.now,
        }
    }).then(function (data) {
        const mydata = JSON.stringify(data);
        console.log('sending this response ', JSON.parse(mydata));
        res.send(JSON.parse(mydata))
    }).catch((err) => {
        console.log(err);
    });
});


app.post('/fast/dangerous', (req, res) => {

    console.log(req.body);

    const myData = Data.create({
        oxyVal: req.body.oxyVal,
        mqState: req.body.mqState,
        now: req.body.createdAt,
        id: req.body.id
    }).then((result) => {
        console.log(result);
        res.send('Record successfully saved');

    }).catch((err) => {
        console.log(err);
        res.send("Error sending data")
    });
    console.log(myData);
    //res.send('Record successfully saved');
    //console.log(myData);
});


app.param('now', (req, res, next, oxyVal) => {
    console.log("Got param");
    next();
});

// app.get('/me/:oxyVal', (req, res) => {
//     console.log(req.query);
//     res.send('done')
// });

app.listen(port)
console.log("Server satrted on " + port + " .....");