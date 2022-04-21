'use strict'

var confUtil = require('./utils/configuration'),
    _ = require('lodash'),
    openweather = require('./providers/openweather'),
    axios = require('axios');

var configuration = confUtil.readConfigurationFile();

var userId = 1;

/*
>>
    1. Takes:
        locations: Object
            {
                lat: Number
                lon: Number
            }
        interval: Array
            [start, end]
    2. Returns:
        Array: Objects
            {
                average: Number,
                weather: Object (returned by OneCall API endpoint of OpenWeather)
            }
<<
*/
async function getAverageTemp (locations, interval) {
    var user = findUser(userId);

    locations = user.settings.locations;
    interval = user.settings.general.sidebar.sorting.interval;

    const start = interval[0];
    const end = interval[1];

    const locPayload = [];

    // fetching data from OpenWeather API by Longitude and Latitude
    for (var i = 0; i < locations.length; i++) {
        var response = await openweather.oneCall(locations[i].lat, locations[i].lon);
        if (response.success) {
            locPayload.push(response.body)
        } else {
            console.log("API OpenWeather returned error.");
            return [];
        }
    }

    var averageTemps= []
    var index = 0;

    /*
    >> 
        1. First reduce array to the input interval (_.slice())
        2. Sum temperature (_.sumBy())
        3. Divide by end - start + 1 (ex. end: 7 - start: 1 + 1 => 7)
    */
    switch (user.settings.general.sidebar.sorting.intervalUnits) {
        case 'Minutes':
            weathers = locPayload.forEach(weather => {
                console.log(weather)
                return weather.minutely;
            })
            break

        case 'Hours':
            locPayload.forEach(location => {
                const avTemp = _.sumBy(_.slice(location.hourly, start - 1, end), function (hourly) { return hourly.temp}) / (end - start + 1);
                console.log(avTemp)
                averageTemps.push({average: avTemp, weather: location, location: locations[index]})
                index++;
            })
            break

        case 'Days':
            locPayload.forEach(location => {
                const avTemp = _.sumBy(_.slice(location.daily, start - 1, end), function (daily) { return daily.temp.day}) / (end - start + 1);
                averageTemps.push({average: avTemp, weather: location, location: locations[index]})
                index++;
            })
            break;
    }

    return averageTemps;
}

/*
>>
    1. Takes object in format:
            {
                average: Number,
                weather: Object (returned from oneCall API endpoint of OpenWeather)
                location: Object (from configuration.json)
            }
    2. Returns array of sorted weathers
<<
*/
function sortByAverageTemp (averageTemps) {
    var user = findUser(userId);
    var sorted = _.orderBy(averageTemps, ['average'], user.settings.general.sidebar.sorting.sortingOrder === "Ascending" ? 'asc' : 'desc');
    return sorted;
}

function addLocation(location) {
    var user = findUser(userId);

    location.id = Date.now();

    var exists = _.find(user.settings.locations, function(loc) { return loc.lat == location.lat && loc.lon == location.lon});

    if (!exists) {
        user.settings.locations.push(location);
    }

    confUtil.writeConfigurationFile(JSON.stringify(configuration));

    return user.settings.locations;
}

function removeLocation(id) {
    var user = findUser(userId);

    user.settings.locations = _.remove(user.settings.locations, function(loc) {return loc.id != id});

    confUtil.writeConfigurationFile(JSON.stringify(configuration));

    return user.settings.locations;

}

function allLocation () {
    var user = findUser(userId);

    return user.settings.locations; 
}

function findUser (id) {
    return _.find(configuration.users, function (user) { return user.id == id })
}

function getSettings(id) {
    var user = findUser(userId);
    return user.settings;
}

function updateSettings(settings) {
    var user = findUser(userId);
    user.settings = settings;
    confUtil.writeConfigurationFile(JSON.stringify(configuration));
    return user.settings;
}

module.exports = {
    addLocation,
    removeLocation,
    allLocation,
    getSettings,
    updateSettings,
    getAverageTemp,
    sortByAverageTemp
}