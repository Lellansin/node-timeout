var http = require('http');
var Timeout = require('../');

var limit = Timeout(1000, {
    http: true,
    err: {
        statusCode: 408 // timeout status
    }
});

// This is a test page which will spend 5 sec to load
url = 'http://lellansin.com/test/timeout.php';

var deal = function(res) {
    if (res.statusCode == 200) {
        // normal status
        res.on('data', function(chunk) {
            var content = chunk.toString();
            console.log(content.toString());
        });
    } else {
        // exception status
        console.log('http status', res.statusCode);
    }
    console.log('over');
};

http.get(url, limit(deal));