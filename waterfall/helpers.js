var Promise = require("bluebird");
var helpers = function Helpers(){};

helpers.countToNumber = function (count, perStep, callback) {
    for(var i=0; i < perStep; i++){
        count++;
    }

    return callback(count);
}


helpers.countToNumberPromise = function(count, perStep) {
    return new Promise(function (resolve, reject) {
        for(var i=0; i < perStep; i++){
            count++;
        }   
        resolve(count);
    });
}

module.exports = helpers;