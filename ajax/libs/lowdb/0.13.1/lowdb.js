(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.low = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var isPromise = require('is-promise');

module.exports = function (source) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$format = _ref.format;
  var format = _ref$format === undefined ? null : _ref$format;
  var _ref$storage = _ref.storage;
  var storage = _ref$storage === undefined ? null : _ref$storage;
  var _ref$writeOnChange = _ref.writeOnChange;
  var writeOnChange = _ref$writeOnChange === undefined ? true : _ref$writeOnChange;
  var lodash = arguments[2];

  // Create a fresh copy of lodash
  var _ = lodash.runInContext();

  var db = _.chain({});

  if (source) {
    if (format) {
      if (format.serialize) {
        db.serialize = format.serialize;
      }
      if (format.deserialize) {
        db.deserialize = format.deserialize;
      }
    }

    if (storage) {
      if (storage.read) {
        db.read = function () {
          var s = arguments.length <= 0 || arguments[0] === undefined ? source : arguments[0];

          var res = storage.read(s, db.deserialize);
          var init = function init(obj) {
            db.__wrapped__ = obj;
            db._checksum = JSON.stringify(db.__wrapped__);
          };

          if (isPromise(res)) {
            return res.then(function (obj) {
              init(obj);
              return db;
            });
          }

          init(res);
          return db;
        };
      }

      if (storage.write) {
        db.write = function () {
          var dest = arguments.length <= 0 || arguments[0] === undefined ? source : arguments[0];
          return storage.write(dest, db.__wrapped__, db.serialize);
        };
      }
    }
  }

  // Persist database state
  function persist() {
    if (db.source && db.write && writeOnChange) {
      var str = JSON.stringify(db.__wrapped__);

      if (str !== db._checksum) {
        db._checksum = str;
        db.write(db.source);
      }
    }
  }

  // Modify value function to call save before returning result
  _.prototype.value = _.wrap(_.prototype.value, function (value) {
    var v = value.apply(this);
    persist();
    return v;
  });

  // Get or set database state
  db.getState = function () {
    return db.__wrapped__;
  };
  db.setState = function (state) {
    db.__wrapped__ = state;
    persist();
  };

  db._ = _;
  db.source = source;

  // Read
  if (db.read) {
    return db.read();
  } else {
    return db;
  }
};
},{"is-promise":4}],2:[function(require,module,exports){
'use strict';

/* global localStorage */

module.exports = {
  read: function read(source) {
    var deserialize = arguments.length <= 1 || arguments[1] === undefined ? JSON.parse : arguments[1];

    var data = localStorage.getItem(source);
    if (data) {
      return deserialize(data);
    } else {
      localStorage.setItem(source, '{}');
      return {};
    }
  },
  write: function write(dest, obj) {
    var serialize = arguments.length <= 2 || arguments[2] === undefined ? JSON.stringify : arguments[2];
    return localStorage.setItem(dest, serialize(obj));
  }
};
},{}],3:[function(require,module,exports){
'use strict';

var index = require('./_index');
var storage = require('./browser');

module.exports = function low(source) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? { storage: storage } : arguments[1];

  return index(source, opts, window._);
};
},{"./_index":1,"./browser":2}],4:[function(require,module,exports){
module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}]},{},[3])(3)
});