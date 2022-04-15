'use-strict'

var process = require('process'),
    network = require('./utils/network');

process.title = 'simple-weather-api';

var host = process.env.HOST || network.getHostAddress();
var port = process.env.PORT || 9006;

var http = require('http'),
    api = require('./');

var server = http.createServer(api);

server.listen(port, host).on('error', function (e) {
    if (e.code !== 'EADDRINUSE' && e.code !== 'EACCES') {
        throw e;
    }
    console.log('Port ' + port + ' is busy. Trying the next available port...');
    server.listen(++port);
}).on('listening', function () {
    console.log('API is successfully started. Listening on http://' + host + ':' + port);
});

module.exports = { host, port};