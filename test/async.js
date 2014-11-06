var async = require('async');
var timeout = require('../');

async.waterfall(
    [

        function(cb) {
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
    }
);
