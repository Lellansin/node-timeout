var async = require('async');
var mysql = require('mysql');
var Timeout = require('../');

var connection = mysql.createConnection({
    host: '192.168.1.28',
    port: 3306,
    database: '3drun',
    user: 'root',
    password: ''
});

async.waterfall(
    [

        function(cb) {
            console.log('hello 1');

            var limit = Timeout(10, {
                err: new Error('timeout!!')
            });

            var sql = 'SELECT * from account';
            var args = [];

            console.time('query');
            connection.query(sql, args, limit(cb));
        },
        function(rows, fields, cb) {
            console.timeEnd('query');

            console.log('hello 2');
            cb();
        }
    ],
    function(err) {
        if (err) {
            console.log('err:', err);
        }
        console.log('over');
        connection.end();
    }
);