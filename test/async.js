var async = require('async');
var timeout = require('../');

timeout.config({
    limit: 500,
    err: new Error('callback timeout!')
});

async.waterfall(
    [

        function(cb) {
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
    }
);

// do something
var query = function(time, cb) {
    setTimeout(cb, time)
};