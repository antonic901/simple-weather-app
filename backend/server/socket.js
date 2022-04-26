'use strict';

module.exports = function (server) {
    let io = require('socket.io')(server, {cors: {origins: ['http://localhost:8080']}});
    // let io = require('socket.io')(server);
    let service = require('./service')

    const notify = service.notify;

    io.sockets.on('connection', function (socket) {

        console.log('User with ID: ' + socket.id + ' connected.');

        socket.on('disconnect', () => {
            console.log('User with ID: ' + socket.id + ' disconnected.');
        });

    });

    notify.on('settings-updated', (settings) => {
        console.log("Settings updated.");
        io.emit('settings-updated', settings)
    });

    notify.on('location-added', (location) => {
        console.log("Location with ID: " + location.id + " is added.");
        io.emit('location-added', location)
    });

    notify.on('location-removed', (id) => {
        console.log("Location with ID: " + id + " is removed.");
        io.emit('location-removed', id)
    });

    notify.on('refresh-data', (sortingEnabled) => {
        console.log("Refresh data...");
        io.emit('refresh-data', sortingEnabled)
    });

};