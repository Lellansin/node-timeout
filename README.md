# node-timeout

## async module
```javascript
var async = require('async');
var Timeout = require('node-timeout');

var limit = Timeout(500, {
    err: new Error('callback timeout!')
});

async.waterfall(
    [

        function(cb) {
            console.log('hello 1');
            dosomething(3000, limit(cb));
        },
        function(cb) {
            console.log('hello 2');
            dosomething(1000, limit(cb));
        }
    ],
    function(err) {
        if (err) {
            console.log('err:', err);
        }
        console.log('over');
    }
);

var dosomething = function(time, cb) {
    setTimeout(cb, time);
};
```

output

    hello 1
    err: [Error: callback timeout!]
    over

## http module

```javascript
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
```

output

    http status 408
    over