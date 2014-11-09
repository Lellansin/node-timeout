var http = require('http');
var Timeout = require('../');

var limit = Timeout(1000, {
    http: true,
    err: {
        statusCode: 408 // timeout status
    }
});

url = 'http://lellansin.com/test/timeout.php';

var deal = function(res) {
    if (res.statusCode == 200) {
        res.on('data', function(chunk) {
            var content = chunk.toString();
            console.log(content.toString());
        });
    } else {
        console.error('http status', res.statusCode);
    }
};

http.get(url, limit(deal)).on('error', function(e) {
    console.error(e.message);
});