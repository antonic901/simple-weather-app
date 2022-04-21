
// Takes milliseconds as input, return Promise object that will be resolved in given time
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {
    sleep
}