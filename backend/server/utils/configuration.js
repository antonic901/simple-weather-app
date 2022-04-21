'use strict'

let path = "./";
let name = "configuration.json";

const file = require('./file');

function readConfigurationFile() {
    return JSON.parse(file.read(path,name));
  }

function writeConfigurationFile(data) {
    return file.write(path, name, data);
}

function createConfigurationFile(host, port) {
    let configuration = {
        users: []
    };
    let data = JSON.stringify(configuration);
    return data;
}

module.exports = {
    readConfigurationFile,
    writeConfigurationFile,
    createConfigurationFile
};