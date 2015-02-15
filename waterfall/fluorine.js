require('neon');
require('neon/stdlib');
require('fluorine');

var fs        = require('fs');
var path      = require('path');
var totalTime = 0;
var runs      = 0;
// Each step will count from n to 1,000,000,000

function start(done) {
    var flow = new Flow({name: 'waterfall'});    

    flow.step('1')(function (step) {
        startTime = new Date();
        fs.readFile(path.join(__dirname, './../image.jpg'), function (err, data) {
            step.success(data);
        });
    });

    flow.step('2').dependsOn('1')(function (step) {
        var data = step.data['1'];
        tmpfile = path.join(__dirname, "./../temporalimage.jpg");
        var wstream = fs.createWriteStream(tmpfile);

        wstream.write(data);
        wstream.end(function (err, data) {
            step.success(tmpfile);
        });
    });

    flow.step('3').dependsOn('2')(function (step) {
        fs.unlink(step.data['2'], step.success);
    });

    flow.step('finish').dependsOn('3')(function (step) {
        step.success();
        
        var time = (new Date() - startTime);
        totalTime = totalTime + time;
        console.log("Executed in " + time + " ms");

        if (runs++ < 1000) {
            return start();
        }
        console.log("All runs completed in " + (totalTime/runs) + ' ms average');
        console.log("Total time: " + totalTime + ' ms');
        process.exit();
    });
}

start();