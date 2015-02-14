var totalTime = 0;
var runs      = 0;
var fs        = require('fs');
var path      = require('path');
var startTime;

function step1() {
    startTime = new Date();
    fs.readFile(path.join(__dirname, './../image.jpg'), step2);
};

function step2(error, data) {
    tmpfile = path.join(__dirname, "./../temporalimage.jpg");
    var wstream = fs.createWriteStream(tmpfile);

    wstream.write(data);
    wstream.end(function (err, data) {
        step3(null, tmpfile);
    });
}

function step3(err, tmpfile) {
    fs.unlink(tmpfile, finish);
}

function finish(err) {
    var time = (new Date() - startTime);
    totalTime = totalTime + time;
    console.log("Executed in " + time + " ms");

    if (runs++ < 1000) {
        return step1();
    }

    console.log("All runs completed in " + (totalTime/runs) + ' average ms');
    console.log("Total time: " + totalTime + ' ms');
    process.exit();
}

step1();