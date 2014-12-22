var Options = require('options')
var id = 0;

module.exports = function(time, opts) {
  var option = new Options({
    err: null,
    http: false
  }).merge(opts);

  var limit = time || 2000;
  var error = option.value.err;
  var http = option.value.http;

  // wrap callback
  return function(callback) {

    var job = {
      id: id++,
      flag: false,
      cb: callback
    };

    var handler = function() {
      this.flag = true;
      if (error) {
        this.cb(error);
      }
    };

    job.timer = setTimeout(handler.bind(job), limit);

    // hijacked callback
    return function() {
      if (!this.flag) {
        clearTimeout(this.timer);
        this.cb.apply(null, arguments);
      } else if (http) {
        // todo move out
        arguments[0].emit('end');
      }
    }.bind(job);
  };
};