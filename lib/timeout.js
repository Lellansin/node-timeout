var err = new Error('callback timeout');
var limit = 2000;

function timeout(callback) {
  var status = {
    flag: false,
    cb: callback
  };

  var handler = function() {
    this.flag = true;
    this.cb(err);
    console.log('time out!!');
  }.bind(status);

  status.timer = setTimeout(handler, limit);

  return function() {
    if (!this.flag) {
      clearTimeout(this.timer);
      this.cb.apply(null, arguments);
    }
  }.bind(status);
}

timeout.config = function(opts) {
  if (!!opts.limit) {
    limit = opts.limit;
  }
  if (!!opts.err) {
    err = opts.err;
  }
};

module.exports = timeout;