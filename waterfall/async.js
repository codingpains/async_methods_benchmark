var async = require('async');
var totalTime = 0;
var runs      = 0;
var fs        = require('fs');
var path      = require('path');

function start(done) {
    var startTime = new Date();
    async.waterfall([
        function step1(next) {
            startTime = new Date();
            fs.readFile(path.join(__dirname, './../image.jpg'), next);
        },
        function step2(data, next) {
            tmpfile = path.join(__dirname, "./../temporalimage.jpg");
            var wstream = fs.createWriteStream(tmpfile);

            wstream.write(data);
            wstream.end(function (err, data) {
                next(null, tmpfile);
            });
        },
        function step3(tmpfile, next) {
                fs.unlink(tmpfile, next)
        }
    ], function (error, res) {
        var time = (new Date() - startTime)
        totalTime = totalTime + time;
        console.log("Executed in " + time + " ms");
        runs++;
        if (runs < 1000) {
           return  start(done);
        }
        done();
    })
}

start(function done(){
    console.log("All runs completed in " + (totalTime/runs) + ' ms');
    console.log("Total time: " + totalTime + ' ms');
    process.exit();
});