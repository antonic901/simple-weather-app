'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    axios = require('axios'),
    openweather = require('./providers/openweather'),
    service = require('./service');
    
var api = express();

api.use(bodyParser.json());
api.use(morgan('dev'));
api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
api.use(express.static('public'));

api.get('/search/country', function (req, res) {
    axios.get("https://restcountries.com/v3.1/name/" + req.query.query)
        .then(r => {
            res.send(r.data);
        })
        .catch(e => {
            res.statusCode = e.response.status;
            res.send(e.response.data);
        })
});

api.get('/search/location', function (req, res) {
    var query = req.query.query + "," + req.query.country;

    axios.get("http://api.openweathermap.org/geo/1.0/direct", {params: {q: query, limit: 10, appid: '375986c161d754e8e0b204fbd4d79440'}})
        .then(r => {
            if (r.data == []) {
                res.sendStatus(404);
            } else {
                res.send(r.data);
            }
        })
        .catch(e => {
            res.statusCode(e.response.status);
            res.send(e.response.data);
        })
});

api.post('/location/add', function (req, res) {
    res.send(service.addLocation(req.body));
});

api.delete('/location/remove', function (req, res) {
    res.send(service.removeLocation(req.query.id));
});

api.get('/location/all', function (req, res) {
    res.send(service.allLocation());
});

api.get('/location/average-temperature', async function (req, res) {
    var response = await service.getAverageTemp(req.body.locations, req.body.interval);
    res.send(response);
});

api.get('/location/average-temperature/sort', async function (req, res) {
    var response = await service.getAverageTemp(req.body.locations, req.body.interval);
    res.send(service.sortByAverageTemp(response));
});

api.get('/location/weather', function (req, res) {
    openweather.oneCall(req.query.lat, req.query.lon)
        .then(r => {
            res.statusCode = r.status;
            res.send(r.body);
        })
}) ;

api.get('/weather', async function (req, res) {
    openweather.oneCall(req.query.lat, req.query.lon)
        .then(r => {
            res.statusCode = r.status;
            res.send(r.body);
        })
});

api.get('/location/weather/all', function (req, res) {
    service.getWeathersForUser().then(response => {res.send(response)});
}) ;

api.get('/settings', function (req, res) {
    res.send(service.getSettings());
});

api.put('/settings', function (req, res) {
    res.send(service.updateSettings(req.body.settings));
});

api.get('/test', function (req, res) {
    service.test();
    res.send("ok");
})

module.exports = api;