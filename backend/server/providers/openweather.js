'use strict'

var axios = require('axios');

let API = 'https://api.openweathermap.org/data/2.5';

let appid = '375986c161d754e8e0b204fbd4d79440';

async function oneCall (lat, lon) {
    var params = {
        lat: lat,
        lon: lon,
        appid: appid,
        units: 'metric'
    }

    try {
        var response = await axios.get(API + "/onecall", {params: params});
        return {
            success: true,
            status: response.status,
            body: response.data
        }
    } catch (err) {
        return {
            succcess: false,
            status: err.response.status,
            body: err.response.data
        }
    }
}

module.exports = {
    oneCall
}