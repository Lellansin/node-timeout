var async = require('async');
var timeout = require('../');

timeout.config({
    limit: 500,
    err: new Error('callback timeout!')
});

async.waterfall(
    [

        function(cb) {
            console.log('hello 1');
            dosomething(3000, timeout(cb));
        },
        function(cb) {
            console.log('hello 2');
            dosomething(1000, timeout(cb));
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