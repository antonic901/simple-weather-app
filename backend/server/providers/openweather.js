'use strict'

let axios = require('axios'),
    tools = require('../utils/tools');

let API = 'https://api.openweathermap.org';

let appid = '375986c161d754e8e0b204fbd4d79440',
    units = 'metric',
    lang = 'en';

function checkStatus(api) {
    let all = tools.isLimitExceeded();
    if (api === 'onecall') {
        let onecall = tools.isLimitExceededOneCall();
        if (all.available && onecall.available) {
            tools.increaseCounter();
            tools.increaseCounterOneCall();
        } else {
            return {status: 429, body: 'Limit is exceeded.'};
        }
    } else {
        if (all.available) {
            tools.increaseCounter();
        } else {
            return {status: 429, body: 'Limit is exceeded.'};
        }
    }
    return {status: 200, body: 'You can make call.'}
}

async function search (query) {
    let params = {
        q: query,
        limit: 10,
        appid: appid
    };
    let response = await makeRequest(API + '/geo/1.0/direct', params);
    return response;
}

/*
    >> more info on: https://openweathermap.org/current
*/
async function current (lat, lon) {
    let params = {
        lat: lat,
        lon: lon,
        appid: appid,
        units: units,
        lang: lang
    };
    let response = await makeRequest(API + '/data/2.5/weather', params);
    return response;
}

/*
    >> more info on: https://openweathermap.org/api/one-call-api
*/
async function oneCall (lat, lon) {
    let params = {
        lat: lat,
        lon: lon,
        appid: appid,
        units: units,
        lang: lang
    };
    let response = await makeRequest(API + '/data/2.5/onecall', params);
    return response;
}

async function makeRequest(url, params) {
    let status = checkStatus('onecall');
    if (status.status != 200) {
        return {
            success: false,
            status: status.status,
            body: status.body
        }
    }
    try {
        let response = await axios.get(url, {params: params});
        return {
            success: true,
            status: response.status,
            body: response.data
        }
    } catch (err) {
        return {
            success: false,
            status: err.response.status,
            body: err.response.data
        }
    }
}

module.exports = {
    search,
    current,
    oneCall
}