'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    axios = require('axios');
    
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
            res.send(r.data);
        })
        .catch(e => {
            res.statusCode(e.response.status);
            res.send(e.response.data);
        })
});

api.get('/weather', function (req, res) {
    var params = {
        lat: req.query.lat,
        lon: req.query.lon,
        appid: '375986c161d754e8e0b204fbd4d79440',
        exclude: 'minutely,alerts',
        units: 'metric'
    }

    axios.get("https://api.openweathermap.org/data/2.5/onecall", {params: params})
        .then(r => {
            res.send(r.data);
        })
        .catch(e => {
            res.sendStatus(e.response.status);
        })
})

api.get('/weather/current', function (req, res) {
    var params = {
        lat: req.query.lat,
        lon: req.query.lon,
        appid: '375986c161d754e8e0b204fbd4d79440',
        units: 'metric'
    }

    axios.get("https://api.openweathermap.org/data/2.5/weather", {params: params})
        .then(r => {
            res.send(r.data);
        })
        .catch(e => {
            res.sendStatus(e.response.status).send(e.response.data);
        })
})

module.exports = api;