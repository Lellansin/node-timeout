var async = require('async');
var timeout = require('../');

timeout.config({ limit: 500 });

async.waterfall(
    [

        function(cb) {
            console.time('cost');
            console.log('hello');
            query(3000, timeout(cb));
        },
        function(cb) {
            console.log('hello');
            query(1000, timeout(cb));
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

var query = function(time, cb) {
    // do something
    setTimeout(cb, time)
};