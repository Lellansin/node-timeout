var async = require('async');
var timeout = require('../');

timeout.config({ limit: 500 });

async.waterfall(
    [

        function(cb) {
            console.time('cost');
            console.log('hello');
            setTimeout(timeout(cb), 3000);
        },
        function(cb) {
            console.log('hello');
            setTimeout(timeout(cb), 1000);
        }
    ],
    function(err) {
        if (err) {
            console.log('err:', err);
        }
        console.log('over');
        console.timeEnd('cost');
    }
);
