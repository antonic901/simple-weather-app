'use strict';

module.exports = function (server) {
    var io = require('socket.io')(server, {cors: {origins: ['http://localhost:8080']}});
    var service = require('./service')

    const notify = service.notify;

    io.sockets.on('connection', function (socket) {

        console.log('User with ID: ' + socket.id + ' connected.');

        socket.on('disconnect', () => {
            console.log('User with ID: ' + socket.id + ' disconnected.');
        });

    });

    notify.on('settings-updated', (sortingEnabled) => {
        console.log("Settings updated.");
        io.emit('settings-updated', sortingEnabled)
    });

    notify.on('refresh-data', (sortingEnabled) => {
        console.log("Refresh data...");
        io.emit('refresh-data', sortingEnabled)
    });

};