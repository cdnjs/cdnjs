/**
* @author Jason Dobry <jason.dobry@gmail.com>
* @file js-data-firebase.js
* @version 1.0.0-beta.1 - Homepage <http://www.js-data.iojs-data-firebase/>
* @copyright (c) 2014 Jason Dobry 
* @license MIT <https://github.com/js-data/js-data-firebase/blob/master/LICENSE>
*
* @overview Firebase adapter for js-data.
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DSFirebaseAdapter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasOwn = require('./hasOwn');

    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }


        if (_hasDontEnumBug) {
            var ctor = obj.constructor,
                isProto = !!ctor && obj === ctor.prototype;

            while (key = _dontEnums[i++]) {
                // For constructor, if it is a prototype object the constructor
                // is always non-enumerable unless defined otherwise (and
                // enumerated above).  For non-prototype objects, it will have
                // to be defined on this object, since it cannot be defined on
                // any prototype objects.
                //
                // For other [[DontEnum]] properties, check if the value is
                // different than Object prototype value.
                if (
                    (key !== 'constructor' ||
                        (!isProto && hasOwn(obj, key))) &&
                    obj[key] !== Object.prototype[key]
                ) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{"./hasOwn":3}],2:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./forIn":1,"./hasOwn":3}],3:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],4:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
     * Get object values
     */
    function values(obj) {
        var vals = [];
        forOwn(obj, function(val, key){
            vals.push(val);
        });
        return vals;
    }

    module.exports = values;



},{"./forOwn":2}],5:[function(require,module,exports){
var JSData, Firebase;

try {
  JSData = require('js-data');
  Firebase = require('firebase');
} catch (e) {
}

if (!JSData) {
  try {
    JSData = window.JSData;
    Firebase = window.Firebase;
  } catch (e) {
  }
}

if (!JSData) {
  throw new Error('js-data must be loaded!');
} else if (!Firebase) {
  throw new Error('firebase must be loaded!');
}

var emptyStore = new JSData.DS();
var DSUtils = JSData.DSUtils;
var deepMixIn = DSUtils.deepMixIn;
var makePath = DSUtils.makePath;
var filter = emptyStore.defaults.defaultFilter;
var values = require('mout/object/values');
var P = DSUtils.Promise;

function Defaults() {

}

Defaults.prototype.basePath = '';

function DSFirebaseAdapter(options) {
  options = options || {};
  this.defaults = new Defaults();
  deepMixIn(this.defaults, options);
  this.ref = new Firebase(options.basePath || this.defaults.basePath);
}

var dsFirebaseAdapterPrototype = DSFirebaseAdapter.prototype;

dsFirebaseAdapterPrototype.getRef = function (resourceConfig, options) {
  options = options || {};
  return this.ref.child(options.endpoint || resourceConfig.endpoint);
};

dsFirebaseAdapterPrototype.find = function (resourceConfig, id, options) {
  var _this = this;
  return new P(function (resolve, reject) {
    return _this.getRef(resourceConfig, options).child(id).once('value', function (dataSnapshot) {
      resolve(dataSnapshot.val());
    }, reject, _this);
  });
};

dsFirebaseAdapterPrototype.findAll = function (resourceConfig, params, options) {
  var _this = this;
  return new P(function (resolve, reject) {
    return _this.getRef(resourceConfig, options).once('value', function (dataSnapshot) {
      resolve(filter.call(emptyStore, values(dataSnapshot.val()), resourceConfig.name, params, options));
    }, reject, _this);
  });
};

dsFirebaseAdapterPrototype.create = function (resourceConfig, attrs, options) {
  var _this = this;
  var id = attrs[resourceConfig.idAttribute];
  if (DSUtils.isString(id) || DSUtils.isNumber(id)) {
    return _this.update(resourceConfig, id, attrs, options);
  } else {
    return new P(function (resolve, reject) {
      var resourceRef = _this.getRef(resourceConfig, options);
      var itemRef = resourceRef.push(attrs, function (err) {
        if (err) {
          return reject(err);
        } else {
          var id = itemRef.toString().replace(resourceRef.toString(), '');
          itemRef.child(resourceConfig.idAttribute).set(id, function (err) {
            if (err) {
              reject(err);
            } else {
              itemRef.once('value', function (dataSnapshot) {
                try {
                  resolve(dataSnapshot.val());
                } catch (err) {
                  reject(err);
                }
              }, reject, _this);
            }
          });
        }
      });
    });
  }
};

dsFirebaseAdapterPrototype.update = function (resourceConfig, id, attrs, options) {
  var _this = this;
  return new P(function (resolve, reject) {
    var itemRef = _this.getRef(resourceConfig, options).child(id);
    itemRef.once('value', function (dataSnapshot) {
      try {
        var item = dataSnapshot.val() || {};
        var fields, removed, i;
        if (resourceConfig.relations) {
          fields = resourceConfig.relationFields;
          removed = [];
          for (i = 0; fields.length; i++) {
            removed.push(attrs[fields[i]]);
            delete attrs[fields[i]];
          }
        }
        deepMixIn(item, attrs);
        if (resourceConfig.relations) {
          fields = resourceConfig.relationFields;
          for (i = 0; fields.length; i++) {
            attrs[fields[i]] = removed.shift();
          }
        }
        itemRef.set(item, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(item);
          }
        });
      } catch (err) {
        reject(err);
      }
    }, reject, _this);
  });
};

dsFirebaseAdapterPrototype.updateAll = function (resourceConfig, attrs, params, options) {
  var _this = this;
  return _this.findAll(resourceConfig, params, options).then(function (items) {
    var tasks = [];
    DSUtils.forEach(items, function (item) {
      tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], attrs, options));
    });
    return P.all(tasks);
  });
};

dsFirebaseAdapterPrototype.destroy = function (resourceConfig, id, options) {
  var _this = this;
  return new P(function (resolve, reject) {
    _this.getRef(resourceConfig, options).child(id).remove(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

dsFirebaseAdapterPrototype.destroyAll = function (resourceConfig, params, options) {
  var _this = this;
  return _this.findAll(resourceConfig, params, options).then(function (items) {
    var tasks = [];
    DSUtils.forEach(items, function (item) {
      tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
    });
    return P.all(tasks);
  });
};

module.exports = DSFirebaseAdapter;

},{"firebase":"firebase","js-data":"js-data","mout/object/values":4}]},{},[5])(5)
});