'use strict'

var file = require('./file');

// Takes milliseconds as input, return Promise object that will be resolved in given time
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function isLimitExceeded () {
    console.log ('Checking status of base APIs...')
    var limit = JSON.parse(file.read('./', 'limits.json'));
    var minutes = (Date.now() - limit.openweather.all.minute.start) / (1000 * 60);
    console.log('Elapsed minutes: ' + minutes);
    var days = (Date.now() - limit.openweather.all.month.start) / (1000 * 3600 * 24);
    console.log('Elapsed days: ' + days);

    if (minutes > 1) {
        console.log("Usao")
        limit.openweather.all.minute.start = Date.now();
        limit.openweather.all.minute.counter = 0;
    } else if (limit.openweather.all.minute.counter === limit.openweather.all.minute.limit) {
        console.log('Limit exceeded: 60 calls per minute. Please wait.');
        return {available: false, message: 'Limit exceeded: 60 calls per minute. Please wait.'};
    }

    if (days > 30) {
        limit.openweather.all.month.start = Date.now();
        limit.openweather.all.month.counter = 0;
    } else if (limit.openweather.all.month.counter === limit.openweather.all.month.limit) {
        console.log('Limit exceeded: 1.000.000 calls per month. Please wait.')
        return {available: false, message: 'Limit exceeded: 1.000.000 calls per month. Please wait.'};
    }
    file.write('./', 'limits.json', JSON.stringify(limit));
    console.log('You can make call to base APIs!')
    return {available: true, message: 'You can make call to base APIs!'}
}

function isLimitExceededOneCall () {
    var limit = JSON.parse(file.read('./', 'limits.json'));
    var days = (Date.now() - limit.openweather.onecall.day.start) / (1000 * 3600 * 24);
    console.log('Elapsed days: ' + days);
    if (days > 1) {
        limit.openweather.onecall.day.start = Date.now();
        limit.openweather.onecall.day.counter = 0;
    } else if (limit.openweather.onecall.day.counter === limit.openweather.onecall.day.limit) {
        console.log('Limit exceeded: 1000 calls per day. Please wait.')
        return {available: false, message: 'Limit exceeded: 1000 calls per day. Please wait.'};
    }

    days = (Date.now() - limit.openweather.onecall.month.start) / (1000 * 3600 * 24);
    console.log('Elapsed days: ' + days);
    if (days > 30) {
        limit.openweather.onecall.month.start = Date.now();
        limit.openweather.onecall.month.counter = 0;
    } else if (limit.openweather.onecall.month.counter === limit.openweather.onecall.month.limit) {
        console.log('Limit exceeded: 30.000 calls per month. Please wait.')
        return {available: false, message: 'Limit exceeded: 30.000 calls per month. Please wait.'};
    }
    file.write('./', 'limits.json', JSON.stringify(limit));
    console.log ('You can make call to OneCall API!');
    return {available: true, message: 'You can make call to OneCall API!'}
}

function increaseCounter() {
    var limit = JSON.parse(file.read('./', 'limits.json'));
    limit.openweather.all.minute.counter++;
    limit.openweather.all.month.counter++;
    file.write('./', 'limits.json', JSON.stringify(limit));
}

function increaseCounterOneCall() {
    var limit = JSON.parse(file.read('./', 'limits.json'));
    limit.openweather.onecall.day.counter++;
    limit.openweather.onecall.month.counter++;
    file.write('./', 'limits.json', JSON.stringify(limit));
}

module.exports = {
    sleep,
    isLimitExceeded,
    isLimitExceededOneCall,
    increaseCounter,
    increaseCounterOneCall
}