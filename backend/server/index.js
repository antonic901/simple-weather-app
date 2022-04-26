'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restcountries = require('./providers/restcountries'),
    openweather = require('./providers/openweather'),
    service = require('./service');
    
let api = express();

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
    restcountries.search(req.query.query).then(r => {res.statusCode = r.status,res.send(r.body)})
});

api.get('/search/location', function (req, res) {
    openweather.search(req.query.query + "," + req.query.country).then(r => {res.statusCode = r.status, res.send(r.body)})
});

api.post('/location/add', function (req, res) {
    res.send(service.addLocation(req.body, req.query.id));
});

api.delete('/location/remove', function (req, res) {
    res.send(service.removeLocation(req.query.id, req.query.locationid));
});

api.get('/location/all', function (req, res) {
    res.send(service.allLocation(req.query.id));
});

api.get('/location/weather', function (req, res) {
    openweather.oneCall(req.query.lat, req.query.lon).then(r => {res.statusCode = r.status, res.send(r.body)})
});

api.get('/location/weather/all', function (req, res) {
    service.getWeathersForUser(req.query.id).then(response => {res.send(response)});
});

api.get('/location/average-temperature', async function (req, res) {
    res.send(service.getAverageTemp(req.body.locations, req.body.weathers, req.body.interval, req.query.id));
});

api.post('/location/average-temperature/sort', async function (req, res) {
    let response = await service.getAverageTemp(req.body.locations, req.body.weathers, req.body.interval, req.query.id);
    res.send(service.sortByAverageTemp(response, req.query.id));
});

api.get('/settings', function (req, res) {
    res.send(service.getSettings(req.query.id));
});

api.put('/settings', function (req, res) {
    res.send(service.updateSettings(req.body.settings, req.query.id));
});

module.exports = api;