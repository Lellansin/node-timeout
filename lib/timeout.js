function timeout(callback) {
  var status = {
    flag: false
  };

  var timeoutHandler = function() {
    this.flag = true;
    console.log('time out!!');
  }.bind(status);

  status.timer = setTimeout(timeoutHandler, 2000);

  return function() {
    if (!this.flag) {
      clearTimeout(this.timer);
      callback.apply(null, arguments);
    } else {
      return;
    }
  }.bind(status);
};

module.exports = timeout;