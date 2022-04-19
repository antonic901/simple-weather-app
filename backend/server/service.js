'use strict'

var confUtil = require('./utils/configuration'),
    _ = require('lodash');

var configuration = confUtil.readConfigurationFile();

var userId = 1;

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

module.exports = {
    addLocation,
    removeLocation,
    allLocation
}