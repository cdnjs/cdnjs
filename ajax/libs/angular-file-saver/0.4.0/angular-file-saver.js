(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
*
* A AngularJS module that implements the HTML5 W3C saveAs() in browsers that
* do not natively support it
*
* (c) 2015 Philipp Alferov
* License: MIT
*
*/

angular.module('ngFileSaver', [])
  .factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', require('./angular-file-saver.service')])
  .factory('FileSaverUtils', [require('./utils/utils.service.js')])
  .factory('Blob', ['$window', 'FileSaverUtils', require('./dependencies/blob.service.js')])
  .factory('SaveAs', ['$window', 'FileSaverUtils', require('./dependencies/file-saver.service.js')]);

},{"./angular-file-saver.service":2,"./dependencies/blob.service.js":3,"./dependencies/file-saver.service.js":4,"./utils/utils.service.js":5}],2:[function(require,module,exports){
'use strict';

module.exports = function FileSaver(Blob, SaveAs, FileSaverUtils) {

  function isBlobInstance(obj) {
    return obj instanceof Blob;
  }

  function save(blob, filename) {
    try {
      SaveAs(blob, filename);
    } catch(err) {
      FileSaverUtils.handleErrors(err.message);
    }
  }

  return {

    /**
    * saveAs - Immediately starts saving a file, returns undefined.
    *
    * @param  {object} config Set of options such as data, filename
    * and Blob constructor options. Options - optional parameter if data
    * is represented by blob instance
    * @return {undefined}
    */

    saveAs: function(config) {
      config = config || {};
      var data = config.data;
      var filename = config.filename;
      var options = config.options;

      if (!FileSaverUtils.isArray(data) && !isBlobInstance(data)) {
        FileSaverUtils.handleErrors('Data argument should be represented as an array or Blob instance');
      }

      if (!FileSaverUtils.isString(filename)) {
        FileSaverUtils.handleErrors('Filename argument should be a string');
      }

      if (isBlobInstance(data)) {
        return save(data, filename);
      }

      var blob = new Blob(data, options);
      return save(blob, filename);
    }
  };
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function Blob($window, FileSaverUtils) {
  var blob = $window.Blob;

  if (FileSaverUtils.isUndefined(blob)) {
    FileSaverUtils.handleErrors('Blob is not supported. Please include blob polyfilll');
  }

  return blob;
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function SaveAs($window, FileSaverUtils) {
  var saveAs = $window.saveAs;

  if (FileSaverUtils.isUndefined(saveAs)) {
    FileSaverUtils.handleErrors('saveAs is not supported. Please include saveAs polyfill');
  }

  return saveAs;
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function FileSaverUtils() {
  return {
    handleErrors: function(msg) {
      throw new Error(msg);
    },
    isArray: function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isObject: function(obj) {
      return obj !== null && typeof obj === 'object';
    },
    isString: function(obj) {
      return typeof obj === 'string' || obj instanceof String;
    },
    isUndefined: function isUndefined(obj) {
      return typeof obj === 'undefined';
    }
  };
};

},{}]},{},[1]);
