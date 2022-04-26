'use strict'

let axios = require('axios');

let API = 'https://restcountries.com';

/*
    >> more info on: https://restcountries.com/#api-endpoints-v2-name
*/
async function search (query) {
    let response = await makeRequest(API + '/v3.1/name/' + query);
    return response;
}

async function makeRequest(url) {
    try {
        let response = await axios.get(url);
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
    search
}