var error;
var limit = 2000;
var id = 0;

function timeout(callback, lim) {
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
    // console.log('job', this.id, 'time out!!');
  }.bind(job);

  job.timer = setTimeout(handler, lim || limit);
  // console.log('set:', job.id, 'limit', limit);

  return function() {
    if (!this.flag) {
      clearTimeout(this.timer);
      this.cb.apply(null, arguments);
    }
  }.bind(job);
}

timeout.config = function(opts) {
  if (!!opts.limit) {
    limit = opts.limit;
  }
  if (!!opts.err) {
    error = opts.err;
  }
};

module.exports = timeout;