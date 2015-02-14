var totalTime = 0;
var runs      = 0;
var startTime = null;
var path      = require('path');
var Promise   = require('bluebird');
var fs        = Promise.promisifyAll(require("fs"));

function start() {
    // Step 1
    startTime = new Date();
    return fs.readFileAsync(path.join(__dirname, './../image.jpg'))
        .then(function (data) {
            var tmpfile = path.join(__dirname, "./../temporalimage.jpg");
            return fs.writeFileAsync(tmpfile, data).
                then(function () {
                    fs.unlink(tmpfile);
                });
        }).then(function () {
            var time = (new Date() - startTime);
            totalTime = totalTime + time;
            console.log("Executed in " + time + " ms");
            if (runs++ < 1000) {
                return start()
            }
        });
}

start().then(function (res) {
    console.log("All runs completed in " + (totalTime/runs) + ' average ms');
    console.log("Total time: " + totalTime + ' ms');
    process.exit();
});