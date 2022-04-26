'use strict'

let confUtil = require('./utils/configuration'),
    _ = require('lodash'),
    openweather = require('./providers/openweather'),
    EventEmitter = require("events"),
    tools = require('./utils/tools'),
    file = require('./utils/file');

const notify = new EventEmitter();

let configuration = confUtil.readConfigurationFile();

let userId = 1;

async function sleep() {
    let user = findUser(userId);
    while (true) {
        await tools.sleep(user.settings.general.updateInterval * 60 * 1000);
        // await tools.sleep(10 * 1000);
        notify.emit('refresh-data', user.settings.general.sidebar.sorting.enabled);
    }
} 

sleep()

function findUser (id) {
    return _.find(configuration.users, function (user) { return user.id == id })
}

async function getWeathersForUser(id) {
    // let user = findUser(id);

    // const locations = user.settings.locations;
    // const locPayload = [];

    // for (let i = 0; i < locations.length; i++) {
    //     let response = await openweather.oneCall(locations[i].lat, locations[i].lon);
    //     if (response.success) {
    //         locPayload.push(response.body);
    //     } else {
    //         console.log("API OpenWeather returned error. Status: " + response.body);
    //     }
    // }

    // return locPayload;
    return JSON.parse(file.read('./', 'data.json'));
}

function getAverageTemp (locations, weathers, interval, id) {
    let user = findUser(id);

    locations = user.settings.locations;
    interval = user.settings.general.sidebar.sorting.interval;

    const start = interval[0];
    const end = interval[1];

    let averageTemps= []
    let index = 0;

    switch (user.settings.general.sidebar.sorting.intervalUnits) {
        case 'Minutes':
            throw new Error('Not supported by OpenWeather.com');

        case 'Hours':
            weathers.forEach(weather => {
                const avTemp = _.sumBy(_.slice(weather.hourly, start - 1, end), function (hourly) { return hourly.temp}) / (end - start + 1);
                averageTemps.push({average: avTemp, weather: weather, location: locations[index]})
                index++;
            })
            break

        case 'Days':
            weathers.forEach(weather => {
                const avTemp = _.sumBy(_.slice(weather.daily, start - 1, end), function (daily) { return daily.temp.day}) / (end - start + 1);
                averageTemps.push({average: avTemp, weather: weather, location: locations[index]})
                index++;
            })
            break;
    }

    return averageTemps;
}

function sortByAverageTemp (averageTemps, id) {
    let user = findUser(id);
    let sorted = _.orderBy(averageTemps, ['average'], user.settings.general.sidebar.sorting.sortingOrder === "Ascending" ? 'asc' : 'desc');
    return sorted;
}

function addLocation(location, id) {
    let user = findUser(id);

    location.lat = location.lat.toFixed(4);
    location.lon = location.lon.toFixed(4);
    location.id = Date.now();

    let exists = _.find(user.settings.locations, function(loc) { return loc.lat == location.lat && loc.lon == location.lon});

    if (!exists) {
        user.settings.locations.push(location);
        notify.emit('location-added', location);
    }

    confUtil.writeConfigurationFile(JSON.stringify(configuration));
    return location;
}

function removeLocation(id, locationId) {
    let user = findUser(id);

    user.settings.locations = _.remove(user.settings.locations, function(loc) {return loc.id != locationId});

    confUtil.writeConfigurationFile(JSON.stringify(configuration));
    notify.emit('location-removed', locationId);
    return user.settings.locations;

}

function allLocation (id) {
    let user = findUser(id);
    return user.settings.locations; 
}

function getSettings(id) {
    let user = findUser(id);
    return user.settings;
}

function updateSettings(settings, id) {
    let user = findUser(id);
    user.settings.general = settings.general;
    confUtil.writeConfigurationFile(JSON.stringify(configuration));
    notify.emit('settings-updated', user.settings);
    return user.settings;
}

module.exports = {
    addLocation,
    removeLocation,
    allLocation,
    getSettings,
    updateSettings,
    getAverageTemp,
    sortByAverageTemp,
    getWeathersForUser,
    notify
}