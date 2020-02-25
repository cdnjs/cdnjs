const functionToObjectURL = require('./functionToObjectURL');

module.exports = function isModern() {
  if (typeof Worker != 'undefined' && (window.URL || window.webkitURL)) {
    try {
      var worker = new Worker(functionToObjectURL(function () {}));
      worker.terminate();
      return true;
    } catch (error) {}
  }

  return false;
};