var error;
var limit = 2000;
var id = 0;

module.exports = function(time, opts) {
  // config timeout

  // todo use option module
  if (!!time) {
    limit = time;
  }
  if (!!opts && !!opts.err) {
    error = opts.err;
  }

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
    }.bind(job);

    job.timer = setTimeout(handler, limit);

    // hijacked callback
    return function() {
      if (!this.flag) {
        clearTimeout(this.timer);
        this.cb.apply(null, arguments);
      }
    }.bind(job);
  };
};