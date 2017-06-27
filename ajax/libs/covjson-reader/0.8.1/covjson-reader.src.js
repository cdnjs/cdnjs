(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CovJSON = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

//NO FILE EXTENSION, to work around JSPM bug in handling package.json's "browser" field
//see https://github.com/jspm/jspm-cli/issues/1062#issuecomment-170342414

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformParameter = transformParameter;
exports.transformDomain = transformDomain;

var _ndarray = require('ndarray');

var _ndarray2 = _interopRequireDefault(_ndarray);

var _util = require('./util.js');

var _referencing = require('./referencing.js');

var _http = require('./http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Wraps a CoverageJSON Coverage object as a Coverage API object.
 * 
 * @see https://github.com/Reading-eScience-Centre/coverage-jsapi
 * 
 */

var Coverage = function () {

  /**
   * @param {Object} covjson A CoverageJSON Coverage object.
   * @param {Object} [options] 
   * @param {boolean} [options.cacheRanges]
   *   If true, then any range that was loaded remotely is cached.
   *   (The domain is always cached.)
   * @param {Array} [options.referencing]
   *   Referencing info to use (e.g. from containing collection).                        
   */

  function Coverage(covjson, options) {
    _classCallCheck(this, Coverage);

    this._covjson = covjson;

    /**
     * JSON-LD document
     * 
     * @type {Object}
     */
    this.ld = {};

    this._exposeLd(covjson);

    /**
     * The options object that was passed in to the constructor. 
     * 
     * @type {Object} 
     */
    this.options = options ? (0, _util.shallowcopy)(options) : {};

    /** 
     * ID of the coverage.
     * 
     * @type {string|undefined} 
     */
    this.id = covjson.id;

    /** @type {Map} */
    this.parameters = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(covjson.parameters)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        transformParameter(covjson.parameters, key);
        this.parameters.set(key, covjson.parameters[key]);
      }

      /** @type {Array<string>} */
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.profiles = [];

    var profile = this._covjson.profile;
    if (profile) {
      if (profile.substr(0, 4) !== 'http') {
        profile = _util.PREFIX + profile;
      }
      this.profiles.push(profile);
    }

    /** @type {Array<string>} */
    this.domainProfiles = [];

    var domainProfile = undefined;
    if (typeof this._covjson.domain === 'string') {
      domainProfile = this._covjson.domainProfile;
    } else {
      domainProfile = this._covjson.domain.profile;
    }

    if (domainProfile) {
      if (domainProfile.substr(0, 4) !== 'http') {
        domainProfile = _util.PREFIX + domainProfile;
      }
      this.domainProfiles.push(domainProfile);
    }
  }

  _createClass(Coverage, [{
    key: '_exposeLd',
    value: function _exposeLd(covjson) {
      if (!covjson['@context']) {
        // no LD love here...
        return;
      }
      // make a deep copy since the object gets modified in-place later
      // but first, remove domain and range which may be embedded
      var copy = (0, _util.shallowcopy)(covjson);
      delete copy.domain;
      delete copy.ranges;
      this.ld = JSON.parse(JSON.stringify(copy));
    }

    /**
     * Returns a Promise succeeding with the domain data.
     * 
     * @return {Promise}
     */

  }, {
    key: 'loadDomain',
    value: function loadDomain() {
      var _this = this;

      var domainOrUrl = this._covjson.domain;
      if (this._domainPromise) return this._domainPromise;
      var promise = undefined;
      if ((typeof domainOrUrl === 'undefined' ? 'undefined' : _typeof(domainOrUrl)) === 'object') {
        var domain = domainOrUrl;
        transformDomain(domain, this.options.referencing);
        promise = Promise.resolve(domain);
      } else {
        var url = domainOrUrl;
        promise = (0, _http.load)(url).then(function (result) {
          var domain = result.data;
          transformDomain(domain, _this.options.referencing);
          _this._covjson.domain = domain;
          return domain;
        });
      }
      /* The promise gets cached so that the domain is not loaded twice remotely.
       * This might otherwise happen when loadDomain and loadRange is used
       * with Promise.all(). Remember that loadRange also invokes loadDomain.
       */
      this._domainPromise = promise;
      return promise;
    }

    /**
     * Returns a Promise succeeding with the requested range data.
     * 
     * Note that this method implicitly loads the domain as well. 
     * 
     * @example
     * cov.loadRange('salinity').then(function (sal) {
     *   // work with Range object
     * }).catch(function (e) {
     *   // there was an error when loading the range
     *   console.log(e.message)
     * }) 
     * @param {string} paramKey The key of the Parameter for which to load the range.
     * @return {Promise} A Promise object which loads the requested range data and succeeds with a Range object.
     */

  }, {
    key: 'loadRange',
    value: function loadRange(paramKey) {
      var _this2 = this;

      // Since the shape of the range array is derived from the domain, it has to be loaded as well.
      return this.loadDomain().then(function (domain) {
        var rangeOrUrl = _this2._covjson.ranges[paramKey];
        if ((typeof rangeOrUrl === 'undefined' ? 'undefined' : _typeof(rangeOrUrl)) === 'object') {
          var range = rangeOrUrl;
          transformRange(range, domain);
          return Promise.resolve(range);
        } else {
          var url = rangeOrUrl;
          return (0, _http.load)(url).then(function (result) {
            var range = result.data;
            transformRange(range, domain);
            if (_this2.options.cacheRanges) {
              _this2._covjson.ranges[paramKey] = range;
            }
            return range;
          });
        }
      });
    }

    /**
     * Returns the requested range data as a Promise.
     * 
     * Note that this method implicitly loads the domain as well. 
     * 
     * @example
     * cov.loadRanges(['salinity','temp']).then(function (ranges) {
     *   // work with Map object
     *   console.log(ranges.get('salinity').values)
     * }).catch(function (e) {
     *   // there was an error when loading the range data
     *   console.log(e)
     * }) 
     * @param {iterable<string>} [paramKeys] An iterable of parameter keys for which to load the range data. If not given, loads all range data.
     * @return {Promise} A Promise object which loads the requested range data and succeeds with a Map object.
     */

  }, {
    key: 'loadRanges',
    value: function loadRanges(paramKeys) {
      var _this3 = this;

      if (paramKeys === undefined) paramKeys = this.parameters.keys();
      paramKeys = Array.from(paramKeys);
      return Promise.all(paramKeys.map(function (k) {
        return _this3.loadRange(k);
      })).then(function (ranges) {
        var map = new Map();
        for (var i = 0; i < paramKeys.length; i++) {
          map.set(paramKeys[i], ranges[i]);
        }
        return map;
      });
    }

    /**
     * Returns a Promise object which provides a copy of this Coverage object
     * with the domain subsetted by the given indices specification.
     * 
     * Note that the coverage type and/or domain type of the resulting coverage
     * may be different than in the original coverage.
     * 
     * Note that the subsetted ranges are a view over the original ranges, meaning
     * that no copying is done but also no memory is released if the original
     * coverage is garbage collected.
     * 
     * @example
     * cov.subsetByIndex({t: 4, z: {start: 10, stop: 20} }).then(function(subsetCov) {
     *   // work with subsetted coverage
     * })
     * @param {Object} constraints An object which describes the subsetting constraints.
     *   Every property of it refers to an axis name as defined in Domain.names,
     *   and its value must either be an integer
     *   or an object with start, stop, and optionally step (defaults to 1) properties
     *   whose values are integers.
     *   Properties that have the values undefined or null are ignored. 
     *   All integers must be non-negative, step must not be zero.
     *   An integer constrains the axis to the given index,
     *   a start/stop/step object to a range of indices:
     *   If step=1, this includes all indices starting at start and ending at stop (exclusive);
     *   if step>1, all indices start, start + step, ..., start + (q + r - 1) step where 
     *   q and r are the quotient and remainder obtained by dividing stop - start by step.
     * @returns {Promise} A Promise object with the subsetted coverage object as result.
     */

  }, {
    key: 'subsetByIndex',
    value: function subsetByIndex(constraints) {
      return _subsetByIndex(this, constraints);
    }

    /**
     * Returns a Promise object which provides a copy of this Coverage object
     * with the domain subsetted by the given value specification.
     * 
     * Note that the coverage type and/or domain type of the resulting coverage
     * may be different than in the original coverage.
     * 
     * Note that the subsetted ranges are a view over the original ranges, meaning
     * that no copying is done but also no memory is released if the original
     * coverage is garbage collected.
     * 
     * @example
     * cov.subsetByValue({
     *   t: '2015-01-01T01:00:00',
     *   z: {start: -10, stop: -5} 
     * }).then(function(subsetCov) {
     *   // work with subsetted coverage
     * })
     * @example
     * cov.subsetByValue({z: {target: -10} }).then(function(subsetCov) {
     *   // work with subsetted coverage
     * }
     * @param {Object} constraints An object which describes the subsetting constraints.
     *  Every property of it refers to an axis name as defined in Domain.names,
     *  and its value must either be a number or string, or,
     *  if the axis has an ordering relation, an object with start and stop properties
     *  whose values are numbers or strings, or an object with a target property
     *  whose value is a number or string.
     *  Properties that have the values undefined or null are ignored.
     *  A number or string constrains the axis to exactly the given value,
     *  a start/stop object to the values intersecting the extent,
     *  and a target object to the value closest to the given value.
     * @returns {Promise} A Promise object with the subsetted coverage object as result.
     */

  }, {
    key: 'subsetByValue',
    value: function subsetByValue(constraints) {
      return _subsetByValue(this, constraints);
    }
  }]);

  return Coverage;
}();

exports.default = Coverage;

function _subsetByIndex(cov, constraints) {
  return cov.loadDomain().then(function (domain) {
    // check and normalize constraints to simplify code
    constraints = (0, _util.shallowcopy)(constraints);
    for (var axisName in constraints) {
      if (!domain.axes.has(axisName)) {
        // TODO clarify cov behaviour in the JS API spec
        delete constraints[axisName];
        continue;
      }
      if (constraints[axisName] === undefined || constraints[axisName] === null) {
        delete constraints[axisName];
        continue;
      }
      if (typeof constraints[axisName] === 'number') {
        var constraint = constraints[axisName];
        constraints[axisName] = { start: constraint, stop: constraint + 1 };
      }

      var _constraints$axisName = constraints[axisName];
      var _constraints$axisName2 = _constraints$axisName.start;
      var start = _constraints$axisName2 === undefined ? 0 : _constraints$axisName2;
      var _constraints$axisName3 = _constraints$axisName.stop;
      var stop = _constraints$axisName3 === undefined ? domain.axes.get(axisName).values.length : _constraints$axisName3;
      var _constraints$axisName4 = _constraints$axisName.step;
      var step = _constraints$axisName4 === undefined ? 1 : _constraints$axisName4;

      if (step <= 0) {
        throw new Error('Invalid constraint for ' + axisName + ': step=' + step + ' must be > 0');
      }
      if (start >= stop || start < 0) {
        throw new Error('Invalid constraint for ' + axisName + ': stop=' + stop + ' must be > start=' + start + ' and both >= 0');
      }
      constraints[axisName] = { start: start, stop: stop, step: step };
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = domain.axes.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var axisName = _step2.value;

        if (!(axisName in constraints)) {
          var len = domain.axes.get(axisName).values.length;
          constraints[axisName] = { start: 0, stop: len, step: 1 };
        }
      }

      // After normalization, all constraints are start,stop,step objects.
      // It holds that stop > start, step > 0, start >= 0, stop >= 1.
      // For each axis, a constraint exists.

      // subset the axis arrays of the domain (immediately + cached)
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var newdomain = {
      // TODO are the profiles still valid?
      profiles: domain.profiles,
      axes: new Map(domain.axes),
      referencing: domain.referencing,
      _rangeShape: domain._rangeShape.slice(), // copy as we will modify it
      _rangeAxisOrder: domain._rangeAxisOrder
    };

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop = function _loop() {
        var axisName = _step3.value;

        var axis = domain.axes.get(axisName);
        var coords = axis.values;
        var bounds = axis.bounds;
        var isTypedArray = ArrayBuffer.isView(coords);
        var constraint = constraints[axisName];
        var newcoords = undefined;
        var newbounds = undefined;

        var start = constraint.start;
        var stop = constraint.stop;
        var step = constraint.step;

        if (start === 0 && stop === coords.length && step === 1) {
          newcoords = coords;
          newbounds = bounds;
        } else if (step === 1 && isTypedArray) {
          newcoords = coords.subarray(start, stop);
          if (bounds) {
            newbounds = {
              get: function get(i) {
                return bounds.get(start + i);
              }
            };
          }
        } else {
          var q = Math.trunc((stop - start) / step);
          var r = (stop - start) % step;
          var len = q + r;
          newcoords = new coords.constructor(len); // array or typed array
          for (var i = start, j = 0; i < stop; i += step, j++) {
            newcoords[j] = coords[i];
          }
          if (bounds) {
            newbounds = {
              get: function get(i) {
                return bounds.get(start + i * step);
              }
            };
          }
        }

        var newaxis = {
          dataType: axis.dataType,
          components: axis.components,
          values: newcoords,
          bounds: newbounds
        };
        newdomain.axes.set(axisName, newaxis);
        newdomain._rangeShape[domain._rangeAxisOrder.indexOf(axisName)] = newcoords.length;
      };

      for (var _iterator3 = Object.keys(constraints)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop();
      }

      // subset the ndarrays of the ranges (on request)
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var rangeWrapper = function rangeWrapper(range) {
      var _ndarr$hi$lo, _ndarr$hi;

      var ndarr = range._ndarr;

      // fast ndarray view
      var axisNames = domain._rangeAxisOrder;
      var los = axisNames.map(function (name) {
        return constraints[name].start;
      });
      var his = axisNames.map(function (name) {
        return constraints[name].stop;
      });
      var steps = axisNames.map(function (name) {
        return constraints[name].step;
      });
      var newndarr = (_ndarr$hi$lo = (_ndarr$hi = ndarr.hi.apply(ndarr, _toConsumableArray(his))).lo.apply(_ndarr$hi, _toConsumableArray(los))).step.apply(_ndarr$hi$lo, _toConsumableArray(steps));

      var newrange = {
        dataType: range.dataType,
        get: createRangeGetFunction(newndarr, domain._rangeAxisOrder),
        _ndarr: newndarr
      };
      newrange.shape = new Map();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = domain.axes.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var axisName = _step4.value;

          var size = newdomain.axes.get(axisName).values.length;
          newrange.shape.set(axisName, size);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return newrange;
    };

    var loadRange = function loadRange(key) {
      return cov.loadRange(key).then(rangeWrapper);
    };

    var loadRanges = function loadRanges(keys) {
      return cov.loadRanges(keys).then(function (ranges) {
        return new Map([].concat(_toConsumableArray(ranges)).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var range = _ref2[1];
          return [key, rangeWrapper(range)];
        }));
      });
    };

    // assemble everything to a new coverage
    var newcov = {
      // TODO are the profiles still valid?
      profiles: cov.profiles,
      domainProfiles: cov.domainProfiles,
      parameters: cov.parameters,
      loadDomain: function loadDomain() {
        return Promise.resolve(newdomain);
      },
      loadRange: loadRange,
      loadRanges: loadRanges
    };
    newcov.subsetByIndex = _subsetByIndex.bind(null, newcov);
    newcov.subsetByValue = _subsetByValue.bind(null, newcov);
    return newcov;
  });
}

function _subsetByValue(cov, constraints) {
  return cov.loadDomain().then(function (domain) {
    // calculate indices and use subsetByIndex
    var indexConstraints = {};

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = Object.keys(constraints)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var axisName = _step5.value;

        var spec = constraints[axisName];
        if (spec === undefined || spec === null || !domain.axes.has(axisName)) {
          continue;
        }
        var axis = domain.axes.get(axisName);
        var vals = axis.values;

        // special-case handling
        var isISODate = (0, _referencing.isISODateAxis)(domain, axisName);
        var isLongitude = (0, _referencing.isLongitudeAxis)(domain, axisName);

        // wrap input longitudes into longitude range of domain axis
        var lonWrapper = isLongitude ? (0, _referencing.getLongitudeWrapper)(domain, axisName) : undefined;

        if (typeof spec === 'number' || typeof spec === 'string' || spec instanceof Date) {
          var match = spec;
          if (isISODate) {
            // convert times to numbers before searching
            match = (0, _util.asTime)(match);
            vals = vals.map(function (v) {
              return new Date(v).getTime();
            });
          } else if (isLongitude) {
            match = lonWrapper(match);
          }
          var i = undefined;
          // older browsers don't have TypedArray.prototype.indexOf
          if (vals.indexOf) {
            i = vals.indexOf(match);
          } else {
            i = Array.prototype.indexOf.call(vals, match);
          }
          if (i === -1) {
            throw new Error('Domain value not found: ' + spec);
          }
          indexConstraints[axisName] = i;
        } else if ('target' in spec) {
          // find index of value closest to target
          var target = spec.target;
          if (isISODate) {
            // convert times to numbers before searching
            target = (0, _util.asTime)(target);
            vals = vals.map(function (v) {
              return new Date(v).getTime();
            });
          } else if (isLongitude) {
            target = lonWrapper(target);
          } else if (typeof vals[0] !== 'number' || typeof target !== 'number') {
            throw new Error('Invalid axis or constraint value type');
          }
          var i = (0, _util.indexOfNearest)(vals, target);
          indexConstraints[axisName] = i;
        } else if ('start' in spec && 'stop' in spec) {
          // TODO what about bounds?

          var _start = spec.start;
          var _stop = spec.stop;

          if (isISODate) {
            var _ref3 = [(0, _util.asTime)(_start), (0, _util.asTime)(_stop)];
            // convert times to numbers before searching

            _start = _ref3[0];
            _stop = _ref3[1];

            vals = vals.map(function (v) {
              return new Date(v).getTime();
            });
          } else if (isLongitude) {
            var _ref4 = [lonWrapper(_start), lonWrapper(_stop)];
            _start = _ref4[0];
            _stop = _ref4[1];
          } else if (typeof vals[0] !== 'number' || typeof _start !== 'number') {
            throw new Error('Invalid axis or constraint value type');
          }

          var _indicesOfNearest = (0, _util.indicesOfNearest)(vals, _start);

          var _indicesOfNearest2 = _slicedToArray(_indicesOfNearest, 2);

          var lo1 = _indicesOfNearest2[0];
          var hi1 = _indicesOfNearest2[1];

          var _indicesOfNearest3 = (0, _util.indicesOfNearest)(vals, _stop);

          var _indicesOfNearest4 = _slicedToArray(_indicesOfNearest3, 2);

          var lo2 = _indicesOfNearest4[0];
          var hi2 = _indicesOfNearest4[1];

          // cov is a bit arbitrary and may include one or two indices too much
          // (but since we don't handle bounds it doesn't matter that much)

          var imin = Math.min(lo1, hi1, lo2, hi2);
          var imax = Math.max(lo1, hi1, lo2, hi2) + 1; // subsetByIndex is exclusive

          indexConstraints[axisName] = { start: imin, stop: imax };
        } else {
          throw new Error('Invalid subset constraints');
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return cov.subsetByIndex(indexConstraints);
  });
}

/**
 * Currently unused, but may need in future.
 * This determines the best array type for categorical data which
 * doesn't have missing values.
 */
/*
function arrayType (validMin, validMax) {
  let type
  if (validMin !== undefined) {
    if (validMin >= 0) {
      if (validMax < Math.pow(2,8)) {
        type = Uint8Array
      } else if (validMax < Math.pow(2,16)) {
        type = Uint16Array
      } else if (validMax < Math.pow(2,32)) {
        type = Uint32Array
      } else {
        type = Array
      }
    } else {
      let max = Math.max(Math.abs(validMin), validMax)
      if (max < Math.pow(2,8)) {
        type = Int8Array
      } else if (validMax < Math.pow(2,16)) {
        type = Int16Array
      } else if (validMax < Math.pow(2,32)) {
        type = Int32Array
      } else {
        type = Array
      }
    }
  } else {
    type = Array
  }
  return type
}
*/

/**
 * Transforms a CoverageJSON parameter to the Coverage API format, that is,
 * some elements are converted from objects to Maps. Transformation is made in-place.
 * 
 * @param {Object} param The original parameter.
 * @access private
 */
function transformParameter(params, key) {
  if ('__transformDone' in params[key]) return;
  var param = params[key];
  param.key = key;
  if (param.categoryEncoding) {
    var map = new Map();
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = Object.keys(param.categoryEncoding)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var category = _step6.value;

        var vals = param.categoryEncoding[category];
        if (!Array.isArray(vals)) {
          vals = [vals];
        }
        map.set(category, vals);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    param.categoryEncoding = map;
  }
  param.__transformDone = true;
}

/**
 * Transforms a CoverageJSON range to the Coverage API format, that is,
 * no special encoding etc. is left. Transformation is made in-place.
 * 
 * @param {Object} range The original range.
 * @param {Object} domain The CoverageJSON domain object. 
 * @return {Object} The transformed range.
 */
function transformRange(range, domain) {
  if ('__transformDone' in range) return;

  var values = range.values;
  var targetDataType = range.dataType; // 'integer', 'float', 'string'
  var isTyped = ArrayBuffer.isView(values);
  var missingIsEncoded = typeof range.validMin === 'number';
  var hasOffsetFactor = 'offset' in range;

  if ('offset' in range) {
    (0, _util.assert)('factor' in range);
  }
  var offset = range.offset;
  var factor = range.factor;

  if (missingIsEncoded) {
    (0, _util.assert)('validMin' in range);
    (0, _util.assert)('validMax' in range);
  }
  var validMin = range.validMin;
  var validMax = range.validMax;

  var vals = undefined;
  if (!missingIsEncoded && !hasOffsetFactor) {
    // No transformation necessary.
    vals = values;
  } else {
    // Transformation is necessary.
    // we use a regular array so that missing values can be represented as null
    vals = new Array(values.length);

    // TODO can we use typed arrays here without having to scan for missing values first?
    //  When typed arrays with missing value encoding was used we could keep that and provide
    //  a higher abstraction on the array similar to an ndarray interface. This means that [] syntax
    //  would be impossible and change to .get(index).

    if (hasOffsetFactor) {
      for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (missingIsEncoded && (val < validMin || val > validMax)) {
          // This is necessary as the default value is "undefined".
          vals[i] = null;
        } else if (!missingIsEncoded && val === null) {
          vals[i] = null;
        } else {
          vals[i] = val * factor + offset;
        }
      }

      if (validMin !== undefined) {
        range.validMin = validMin * factor + offset;
        range.validMax = validMax * factor + offset;
      }
    } else {
      // missingIsEncoded == true
      for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (val < validMin || val > validMax) {
          vals[i] = null;
        } else {
          vals[i] = val;
        }
      }
    }

    delete range.offset;
    delete range.factor;
    delete range.validMin;
    delete range.validMax;
  }

  if (range.actualMin === undefined) {
    var _minMax = (0, _util.minMax)(vals);

    var _minMax2 = _slicedToArray(_minMax, 2);

    var min = _minMax2[0];
    var max = _minMax2[1];

    if (min !== null) {
      range.actualMin = min;
      range.actualMax = max;
    }
  }

  var shape = new Map(); // axis name -> axis size (value count)
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = domain.axes.keys()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var axisName = _step7.value;

      shape.set(axisName, domain.axes.get(axisName).values.length);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  range.shape = shape;

  var ndarr = (0, _ndarray2.default)(vals, domain._rangeShape);
  range._ndarr = ndarr;
  range.get = createRangeGetFunction(ndarr, domain._rangeAxisOrder);

  range.__transformDone = true;
  return range;
}

/**
 * 
 * @param axisOrder An array of axis names.
 * @returns Function
 */
function createRangeGetFunction(ndarr, axisOrder) {
  // see below for slower reference version
  var ndargs = '';
  for (var i = 0; i < axisOrder.length; i++) {
    if (ndargs) ndargs += ',';
    ndargs += '\'' + axisOrder[i] + '\' in obj ? obj[\'' + axisOrder[i] + '\'] : 0';
  }
  var fn = new Function('ndarr', 'return function ndarrget (obj) { return ndarr.get(' + ndargs + ') }')(ndarr);
  return fn;
}

/*
 * Reference version of createRangeGetFunction().
 * Around 50% slower (on Chrome 46) compared to precompiled version.
 * 
function createRangeGetFunction (ndarr, axisOrder) {
  axisOrder = axisOrder.slice() // help the JIT (possibly..)
  const axisCount = axisOrder.length
  return obj => {
    let indices = new Array(axisCount)
    for (let i=0; i < axisCount; i++) {
      indices[i] = axisOrder[i] in obj ? obj[axisOrder[i]] : 0
    }
    return ndarr.get(...indices)
  }
}
*/

/**
 * Transforms a CoverageJSON domain to the Coverage API format.
 * Transformation is made in-place.
 * 
 * @param {Object} domain The original domain object.
 * @param {Array} [referencing] Referencing info to inject.
 * @return {Object} The transformed domain object.
 * @access private
 */
function transformDomain(domain, referencing) {
  if ('__transformDone' in domain) return;

  domain.profiles = [];
  var profile = domain.profile;
  if (profile) {
    if (profile.substr(0, 4) !== 'http') {
      profile = _util.PREFIX + profile;
    }
    domain.profiles.push(profile);
  }

  var axes = new Map(); // axis name -> axis object

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = Object.keys(domain.axes)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var axisName = _step8.value;

      axes.set(axisName, domain.axes[axisName]);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  domain.axes = axes;

  // expand start/stop/num regular axes
  // replace 1D numeric axis arrays with typed arrays for efficiency
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = axes[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _step9$value = _slicedToArray(_step9.value, 2);

      var key = _step9$value[0];
      var axis = _step9$value[1];

      axis.key = key;

      if (axis.dataType === 'Tuple' || axis.dataType === 'Polygon') {
        axis.dataType = _util.PREFIX + axis.dataType;
      }

      // TODO remove this if-block later, just here for backwards-compatibility
      if (axis.dimensions) {
        axis.components = axis.dimensions;
      }

      if (!axis.components) {
        axis.components = [key];
      }

      // TODO remove this line later, just here for backwards-compatibility
      axis.dimensions = axis.components;

      if ('start' in axis && 'stop' in axis && 'num' in axis) {
        var arr = new Float64Array(axis.num);
        var _step11 = undefined;
        if (axis.num === 1) {
          if (axis.start !== axis.stop) {
            throw new Error('regular axis of length 1 must have equal start/stop values');
          }
          _step11 = 0;
        } else {
          _step11 = (axis.stop - axis.start) / (axis.num - 1);
        }
        for (var i = 0; i < axis.num; i++) {
          arr[i] = axis.start + i * _step11;
        }

        axis.values = arr;
        delete axis.start;
        delete axis.stop;
        delete axis.num;
      }

      if (ArrayBuffer.isView(axis.values)) {
        // already a typed array
        continue;
      }
      if (Array.isArray(axis.values) && typeof axis.values[0] === 'number') {
        var arr = new Float64Array(axis.values.length);
        for (var i = 0; i < axis.values.length; i++) {
          arr[i] = axis.values[i];
        }
        axis.values = arr;
      }

      axis.bounds = wrapBounds(axis);
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  var needsRangeAxisOrder = [].concat(_toConsumableArray(axes.values())).filter(function (axis) {
    return axis.values.length > 1;
  }).length > 1;
  if (needsRangeAxisOrder && !domain.rangeAxisOrder) {
    throw new Error('Domain requires "rangeAxisOrder"');
  }

  domain._rangeAxisOrder = domain.rangeAxisOrder || [].concat(_toConsumableArray(axes.keys()));
  domain._rangeShape = domain._rangeAxisOrder.map(function (k) {
    return axes.get(k).values.length;
  });

  if (referencing) {
    domain.referencing = referencing;
  }

  // TODO remove this later, just here for backwards-compatibility
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = domain.referencing[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var obj = _step10.value;

      if (obj.system) break; // already transformed
      obj.system = obj.srs || obj.trs || obj.rs;
      if (obj.dimensions) {
        obj.components = obj.dimensions;
      }
      delete obj.srs;
      delete obj.trs;
      delete obj.rs;
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  domain.__transformDone = true;

  return domain;
}

function wrapBounds(axis) {
  if (axis.bounds) {
    var _ret2 = function () {
      var bounds = axis.bounds;
      return {
        v: {
          get: function get(i) {
            return [bounds[2 * i], bounds[2 * i + 1]];
          }
        }
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  }
}
},{"./http":3,"./referencing.js":6,"./util.js":7,"ndarray":9}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionQuery = undefined;

var _Coverage = require('./Coverage.js');

var _Coverage2 = _interopRequireDefault(_Coverage);

var _util = require('./util.js');

var _referencing = require('./referencing.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Wraps a CoverageJSON Collection object as a CoverageCollection API object.
 * 
 * @see https://github.com/Reading-eScience-Centre/coverage-jsapi
 * 
 */

var CoverageCollection = function () {
  /**
   * @param {Object} covjson The CoverageJSON Collection document.
   */

  function CoverageCollection(covjson) {
    _classCallCheck(this, CoverageCollection);

    /**
     * JSON-LD document
     * 
     * @type {Object}
     */
    this.ld = {};

    this._exposeLd(covjson);

    /** 
     * ID of the coverage collection.
     * 
     * @type {string|undefined} 
     */
    this.id = covjson.id;

    /** @type {Array<string>} */
    this.profiles = [];

    var profile = covjson.profile;
    if (profile) {
      if (profile.substr(0, 4) !== 'http') {
        profile = _util.PREFIX + profile;
      }
      this.profiles.push(profile);
    }

    var covs = [];
    var rootParams = covjson.parameters ? covjson.parameters : {};
    var covOptions = {};
    if (covjson.referencing) {
      covOptions.referencing = covjson.referencing;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = covjson.coverages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var coverage = _step.value;

        if (coverage.parameters) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = Object.keys(rootParams)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var key = _step3.value;

              if (key in coverage.ranges) {
                coverage.parameters[key] = rootParams[key];
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else {
          coverage.parameters = rootParams;
        }
        if (covjson['@context']) {
          coverage['@context'] = covjson['@context'];
        }
        covs.push(new _Coverage2.default(coverage, covOptions));
      }

      /** @type {Array<Coverage>} */
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.coverages = covs;
    if (covjson.parameters) {
      /** @type {Map} */
      this.parameters = new Map();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(covjson.parameters)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          (0, _Coverage.transformParameter)(covjson.parameters, key);
          this.parameters.set(key, covjson.parameters[key]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    if (covjson.domainTemplate) {
      (0, _Coverage.transformDomain)(covjson.domainTemplate);
      this.domainTemplate = covjson.domainTemplate;
    }
  }

  /**
   * 
   * @return {CollectionQuery}
   */

  _createClass(CoverageCollection, [{
    key: 'query',
    value: function query() {
      return new CollectionQuery(this);
    }
  }, {
    key: '_exposeLd',
    value: function _exposeLd(covjson) {
      if (!covjson['@context']) {
        // no LD love here...
        return;
      }
      // make a deep copy since the object gets modified in-place later
      // but first, remove the coverages (those have their own .ld property)
      var copy = (0, _util.shallowcopy)(covjson);
      delete copy.coverages;
      this.ld = JSON.parse(JSON.stringify(copy));
    }
  }]);

  return CoverageCollection;
}();

exports.default = CoverageCollection;

var CollectionQuery = exports.CollectionQuery = function () {
  /**
   * @param {CoverageCollection} collection
   */

  function CollectionQuery(collection) {
    _classCallCheck(this, CollectionQuery);

    this._collection = collection;
    this._filter = {};
    this._subset = {};
  }

  /**
   * Matching mode: intersect
   * 
   * Supports ISO8601 date string axes.
   * All other string-type axes are compared alphabetically.
   * 
   * @example
   * collection.query().filter({
   *   't': {start: '2015-01-01T01:00:00', stop: '2015-01-01T02:00:00'}
   * }).execute().then(filteredCollection => {
   *   console.log(filteredCollection.coverages.length)
   * })
   * @param {Object} spec
   * @return {CollectionQuery}
   */

  _createClass(CollectionQuery, [{
    key: 'filter',
    value: function filter(spec) {
      mergeInto(spec, this._filter);
      return this;
    }

    /**
     * Subset coverages by domain values.
     * 
     * Equivalent to calling {@link Coverage.subsetByValue}(spec) on each
     * coverage in the collection.
     * 
     * @param {Object} spec
     * @return {CollectionQuery}
     */

  }, {
    key: 'subset',
    value: function subset(spec) {
      mergeInto(spec, this._subset);
      return this;
    }

    /**
     * This query operation is not supported and has no effect.
     * 
     * @return {CollectionQuery}
     */

  }, {
    key: 'embed',
    value: function embed(spec) {
      return this;
    }

    /**
     * Applies the query operators and returns
     * a Promise that succeeds with a new CoverageCollection.
     * 
     * @return {Promise<CoverageCollection>}
     */

  }, {
    key: 'execute',
    value: function execute() {
      var _this = this;

      var coll = this._collection;
      var newcoll = {
        coverages: [],
        parameters: coll.parameters,
        // TODO is the domain template still valid in all cases after filtering and subsetting?
        domainTemplate: coll.domainTemplate,
        // TODO are the profiles still valid?
        profiles: coll.profiles
      };

      var promises = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop = function _loop() {
          var cov = _step4.value;

          promises.push(cov.loadDomain().then(function (domain) {
            if (!matchesFilter(domain, _this._filter)) {
              return;
            }

            if (Object.keys(_this._subset).length === 0) {
              newcoll.coverages.push(cov);
            } else {
              return cov.subsetByValue(_this._subset).then(function (subsetted) {
                newcoll.coverages.push(subsetted);
              });
            }
          }));
        };

        for (var _iterator4 = coll.coverages[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return Promise.all(promises).then(function () {
        newcoll.query = function () {
          return new CollectionQuery(newcoll);
        };
        return newcoll;
      });
    }
  }]);

  return CollectionQuery;
}();

function matchesFilter(domain, filter) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = Object.keys(filter)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var axisName = _step5.value;

      var condition = filter[axisName];
      if (!domain.axes.has(axisName)) {
        throw new Error('Axis "' + axisName + '" does not exist');
      }
      var axis = domain.axes.get(axisName);
      var vals = axis.values;

      var min = vals[0];
      var max = vals[vals.length - 1];

      if (typeof min !== 'number' && typeof min !== 'string') {
        throw new Error('Can only filter primitive axis values');
      }
      var start = condition.start;
      var stop = condition.stop;

      // special handling

      if ((0, _referencing.isISODateAxis)(domain, axisName)) {
        var _ref = [(0, _util.asTime)(min), (0, _util.asTime)(max)][(start, stop)] = [(0, _util.asTime)(start), (0, _util.asTime)(stop)];

        var _ref2 = _slicedToArray(_ref, 2);

        min = _ref2[0];
        max = _ref2[1];
      } else if ((0, _referencing.isLongitudeAxis)(domain, axisName)) {
        var lonWrapper = (0, _referencing.getLongitudeWrapper)(domain, axisName)[(start, stop)] = [lonWrapper(start), lonWrapper(stop)];
      }

      if (min > max) {
        var _ref3 = [max, min];
        min = _ref3[0];
        max = _ref3[1];
      }
      if (max < start || stop < min) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return true;
}

function mergeInto(inputObj, targetObj) {
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = Object.keys(inputObj)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var k = _step6.value;

      targetObj[k] = inputObj[k];
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
}
},{"./Coverage.js":1,"./referencing.js":6,"./util.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _cborJs = require('cbor-js');

var _cborJs2 = _interopRequireDefault(_cborJs);

var _util = require('./util.js');

var _httpCommon = require('./http-common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(url) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var responseType = arguments.length <= 2 || arguments[2] === undefined ? 'arraybuffer' : arguments[2];

  if (['arraybuffer', 'text'].indexOf(responseType) === -1) {
    throw new Error();
  }
  var headers = options.headers || {};
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = responseType;
    var accept = (0, _httpCommon.getAcceptHeader)(options.eagerload);
    req.setRequestHeader('Accept', accept);
    if (headers) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var header = _step.value;

          req.setRequestHeader(header, headers[header]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    req.addEventListener('load', function () {
      try {
        if (!(req.status >= 200 && req.status < 300 || req.status === 304)) {
          // as in jquery
          reject(new Error('Resource "' + url + '" not found, HTTP status code: ' + req.status));
          return;
        }

        var type = req.getResponseHeader('Content-Type');

        if (type.indexOf(_httpCommon.MEDIATYPE.OCTETSTREAM) === 0 || type.indexOf(_httpCommon.MEDIATYPE.TEXT) === 0) {
          // wrong media type, try to infer type from extension
          if ((0, _util.endsWith)(url, _httpCommon.EXT.COVJSON)) {
            type = _httpCommon.MEDIATYPE.COVJSON;
          } else if ((0, _util.endsWith)(url, _httpCommon.EXT.COVCBOR)) {
            type = _httpCommon.MEDIATYPE.COVCBOR;
          }
        }
        var data = undefined;
        if (type === _httpCommon.MEDIATYPE.COVCBOR) {
          var arrayBuffer = req.response;
          var t0 = new Date();
          data = _cborJs2.default.decode(arrayBuffer);
          console.log('CBOR decoding: ' + (new Date() - t0) + 'ms');
        } else if ([_httpCommon.MEDIATYPE.COVJSON, _httpCommon.MEDIATYPE.JSONLD, _httpCommon.MEDIATYPE.JSON].indexOf(type) > -1) {
          if (responseType === 'arraybuffer') {
            if (window.TextDecoder) {
              var t0 = new Date();
              data = JSON.parse(new TextDecoder().decode(new DataView(req.response)));
              console.log('JSON decoding: ' + (new Date() - t0) + 'ms');
            } else {
              // load again (from cache) to get correct response type
              // Note we use 'text' and not 'json' as we want to throw parsing errors.
              // With 'json', the response is just 'null'.
              reject({ responseType: 'text' });
              return;
            }
          } else {
            var t0 = new Date();
            data = JSON.parse(req.response);
            console.log('JSON decoding (slow path): ' + (new Date() - t0) + 'ms');
          }
        } else {
          reject(new Error('Unsupported media type: ' + type));
          return;
        }
        var responseHeaders = parseResponseHeaders(req.getAllResponseHeaders());
        resolve({
          data: data,
          headers: responseHeaders
        });
      } catch (e) {
        reject(e);
      }
    });
    req.addEventListener('error', function () {
      reject(new Error('Network error loading resource at ' + url));
    });

    req.send();
  }).catch(function (e) {
    if (e.responseType) {
      return load(url, headers, e.responseType);
    } else {
      throw e;
    }
  });
}

/**
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 * Header names are lower-cased.
 * 
 * https://gist.github.com/monsur/706839
 */
function parseResponseHeaders(headerStr) {
  var headers = {};
  if (!headerStr) {
    return headers;
  }
  var headerPairs = headerStr.split('\r\n');
  for (var i = 0; i < headerPairs.length; i++) {
    var headerPair = headerPairs[i];
    // Can't use split() here because it does the wrong thing
    // if the header value has the string ": " in it.
    var index = headerPair.indexOf(': ');
    if (index > 0) {
      var key = headerPair.substring(0, index).toLowerCase();
      var val = headerPair.substring(index + 2);
      headers[key] = val;
    }
  }
  return headers;
}
},{"./http-common.js":4,"./util.js":7,"cbor-js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAcceptHeader = getAcceptHeader;
var MEDIATYPE = exports.MEDIATYPE = {
    COVCBOR: 'application/prs.coverage+cbor',
    COVJSON: 'application/prs.coverage+json',
    JSONLD: 'application/ld+json',
    JSON: 'application/json',
    OCTETSTREAM: 'application/octet-stream',
    TEXT: 'text/plain'
};

var COVJSON_PROFILE_STANDALONE = exports.COVJSON_PROFILE_STANDALONE = 'http://coveragejson.org/profiles/standalone';

function getAcceptHeader(standalone) {
    var covjsonProfile = standalone ? '; profile="' + COVJSON_PROFILE_STANDALONE + '"' : '';
    var accept = MEDIATYPE.COVCBOR + '; q=1.0, ' + MEDIATYPE.COVJSON + covjsonProfile + '; q=0.5, ' + MEDIATYPE.JSONLD + '; q=0.1, ' + MEDIATYPE.JSON + '; q=0.1';
    return accept;
}

var EXT = exports.EXT = {
    COVJSON: '.covjson',
    COVCBOR: '.covcbor'
};
},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// NO FILE EXTENSION, to work around JSPM bug in handling package.json's "browser" field
// see https://github.com/jspm/jspm-cli/issues/1062#issuecomment-170342414

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
exports.read = read;

var _Coverage = require('./Coverage.js');

var _Coverage2 = _interopRequireDefault(_Coverage);

var _CoverageCollection = require('./CoverageCollection.js');

var _CoverageCollection2 = _interopRequireDefault(_CoverageCollection);

var _util = require('./util.js');

var _http = require('./http');

var http = _interopRequireWildcard(_http);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loads a CoverageJSON document from a given URL and returns a {@link Promise} object
 * that succeeds with the unmodified CoverageJSON object.
 * 
 * @param {string} url
 * @param {Object} [options] An options object. 
 * @param {Object} [options.headers] Additional HTTP headers to send if input is a URL.
 * @param {Object} [options.eagerload]
 *   Request a stand-alone CoverageJSON document (with domain and ranges embedded) if input is a URL.
 *   Note that the server may ignore that preference.
 * @return {Promise}
 *   A Promise succeeding with an object <code>{data, headers}</code> where data is the CoverageJSON object
 *   and headers are the HTTP response headers with lower-cased header names as object keys.
 *   The promise fails if the resource at the given URL is not a valid JSON or CBOR document. 
 */
function load(url, options) {
  return http.load(url, options);
}

/**
 * Reads a CoverageJSON document and returns a {@link Promise} that succeeds with
 * a {@link Coverage} or {@link CoverageCollection} object.
 * 
 * Note that if the document references external domain or range documents,
 * then these are not loaded immediately. 
 * 
 * 
 * @example
 * CovJSON.read('http://example.com/coverage.covjson').then(function (cov) {
 *   // work with Coverage object
 * }).catch(function (e) {
 *   // there was an error when loading the coverage
 *   console.log(e)
 * })
 * @param {Object|string} input
 *    Either a URL pointing to a CoverageJSON Coverage or Coverage Collection document
 *    or a CoverageJSON Coverage or Coverage Collection object.
 * @param {Object} [options]
 *   An options object. 
 * @param {Object} [options.headers]
 *   Additional HTTP headers to send if input is a URL.
 * @param {Object} [options.eagerload]
 *   Request a stand-alone CoverageJSON document (with domain and ranges embedded) if input is a URL.
 *   Note that the server may ignore that preference.
 * @return {Promise} 
 *    A promise object succeeding with a {@link Coverage} or {@link CoverageCollection} object,
 *    and failing with an {@link Error} object.
 */
function read(input) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
    return Promise.resolve().then(function () {
      return transformCovJSON(input);
    });
  } else {
    return load(input, options).then(function (_ref) {
      var data = _ref.data;
      var headers = _ref.headers;
      return transformCovJSON(data, headers);
    });
  }
}

/**
 * Transforms a CoverageJSON object into one or more Coverage objects.
 *  
 * @param {object} obj A CoverageJSON object of type Coverage or CoverageCollection.
 * @param {array} headers An optional array of HTTP headers. Keys are lower-cased header names.
 * @return {Coverage|Array of Coverage}
 */
function transformCovJSON(obj, headers) {
  checkValidCovJSON(obj);
  if (obj.type !== 'Coverage' && obj.type !== 'CoverageCollection') {
    throw new Error('CoverageJSON document must be of Coverage or CoverageCollection type');
  }

  var result = undefined;
  if (obj.type === 'Coverage') {
    result = new _Coverage2.default(obj);
  } else {
    result = new _CoverageCollection2.default(obj);
  }

  addLinkRelations(result, headers);

  return result;
}

/**
 * Scans the supplied HTTP headers for Link relations and adds them
 * to the .ld property of the Coverage/CoverageCollection.
 */
function addLinkRelations(cov, headers) {
  // for registered rel's
  var IANAPrefix = 'http://www.iana.org/assignments/relation/';

  if (!headers || !headers['link']) {
    return;
  }

  var ld = cov.ld;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = headers['link'].split(',')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;

      link = link.trim();
      // FIXME this will fail if the URL contains a ";" which is valid (see RFC5988)
      var parts = link.split(';');
      var url = parts[0].substr(1, parts[0].length - 2);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = parts.slice(1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var param = _step2.value;

          var relStart = param.indexOf('rel=');
          if (relStart === -1) {
            continue;
          }
          var rel = param.substring(relStart + 5, param.length - 1);
          if (!rel.startsWith('http://') && !rel.startsWith('https://')) {
            rel = IANAPrefix + rel;
          }
          if (ld[rel]) {
            if (Array.isArray(ld[rel])) {
              ld[rel].push(url);
            } else {
              ld[rel] = [ld[rel], url];
            }
          } else {
            ld[rel] = url;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Performs basic structural checks to validate whether a given object is a CoverageJSON object.
 * 
 * Note that this method is not comprehensive and should not be used for checking
 * whether an object fully conforms to the CoverageJSON specification.
 * 
 * @param obj
 * @throws {Error} when obj is not a valid CoverageJSON document 
 */
function checkValidCovJSON(obj) {
  (0, _util.assert)('type' in obj, '"type" missing');
  if (obj.type === 'Coverage') {
    (0, _util.assert)('parameters' in obj, '"parameters" missing');
    (0, _util.assert)('domain' in obj, '"domain" missing');
    (0, _util.assert)('ranges' in obj, '"ranges" missing');
  } else if (obj.type === 'CoverageCollection') {
    (0, _util.assert)(Array.isArray(obj.coverages), '"coverages" must be an array');
  }
}
},{"./Coverage.js":1,"./CoverageCollection.js":2,"./http":3,"./util.js":7}],6:[function(require,module,exports){
'use strict';

var _LongitudeAxisIndex;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongitudeWrapper = getLongitudeWrapper;
exports.isLongitudeAxis = isLongitudeAxis;
exports.isISODateAxis = isISODateAxis;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OPENGIS_CRS_PREFIX = 'http://www.opengis.net/def/crs/';

/** 3D WGS84 in lat-lon-height order */
var EPSG4979 = OPENGIS_CRS_PREFIX + 'EPSG/0/4979';

/** 2D WGS84 in lat-lon order */
var EPSG4326 = OPENGIS_CRS_PREFIX + 'EPSG/0/4326';

/** 2D WGS84 in lon-lat order */
var CRS84 = OPENGIS_CRS_PREFIX + 'OGC/1.3/CRS84';

/** CRSs in which position is specified by geodetic latitude and longitude */
var EllipsoidalCRSs = [EPSG4979, EPSG4326, CRS84];

/** Position of longitude axis */
var LongitudeAxisIndex = (_LongitudeAxisIndex = {}, _defineProperty(_LongitudeAxisIndex, EPSG4979, 1), _defineProperty(_LongitudeAxisIndex, EPSG4326, 1), _defineProperty(_LongitudeAxisIndex, CRS84, 0), _LongitudeAxisIndex);

/**
 * Returns a function which converts an arbitrary longitude to the
 * longitude extent used in the coverage domain.
 * This only supports primitive axes since this is what subsetByValue supports.
 * The longitude extent is extended to 360 degrees if the actual extent is smaller.
 * The extension is done equally on both sides of the extent. 
 * 
 * For example, the domain may have longitudes within [0,360].
 * An input longitude of -70 is converted to 290.
 * All longitudes within [0,360] are returned unchanged.
 * 
 * If the domain has longitudes within [10,50] then the
 * extended longitude range is [-150,210] (-+180 from the middle point).
 * An input longitude of -170 is converted to 190.
 * All longitudes within [-150,210] are returned unchanged.
 * 
 * @ignore
 */
function getLongitudeWrapper(domain, axisName) {
  // for primitive axes, the axis identifier = component identifier
  if (!isLongitudeAxis(domain, axisName)) {
    throw new Error('\'' + axisName + '\' is not a longitude axis');
  }

  var vals = domain.axes.get(axisName).values;
  var lon_min = vals[0];
  var lon_max = vals[vals.length - 1];
  if (lon_min > lon_max) {
    var _ref = [lon_max, lon_min];
    lon_min = _ref[0];
    lon_max = _ref[1];
  }

  var x_mid = (lon_max + lon_min) / 2;
  var x_min = x_mid - 180;
  var x_max = x_mid + 180;

  return function (lon) {
    if (x_min <= lon && lon <= x_max) {
      // directly return to avoid introducing rounding errors
      return lon;
    } else {
      return ((lon - x_min) % 360 + 360) % 360 + x_min;
    }
  };
}

/**
 * Return whether the given domain axis represents longitudes.
 * 
 * @ignore
 */
function isLongitudeAxis(domain, axisName) {
  var ref = getReferenceObject(domain, axisName);
  if (!ref) {
    return false;
  }

  var crsId = ref.system.id;
  // TODO should support unknown CRSs with embedded axis information
  if (EllipsoidalCRSs.indexOf(crsId) === -1) {
    // this also covers the case when there is no ID property
    return false;
  }

  var compIdx = ref.components.indexOf(axisName);
  var isLongitude = LongitudeAxisIndex[crsId] === compIdx;
  return isLongitude;
}

/**
 * Returns true if the given axis has ISO8601 date strings
 * as axis values.
 */
function isISODateAxis(domain, axisName) {
  var val = domain.axes.get(axisName).values[0];
  if (typeof val !== 'string') {
    return false;
  }
  return !isNaN(new Date(val).getTime());
}

/**
 * Return the reference system connection object for the given domain component,
 * or undefined if none exists.
 */
function getReferenceObject(domain, component) {
  var ref = domain.referencing.find(function (ref) {
    return ref.components.indexOf(component) !== -1;
  });
  return ref;
}
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.shallowcopy = shallowcopy;
exports.endsWith = endsWith;
exports.minMax = minMax;
exports.indicesOfNearest = indicesOfNearest;
exports.indexOfNearest = indexOfNearest;
exports.asTime = asTime;
var PREFIX = exports.PREFIX = 'http://coveragejson.org/def#';

function assert(condition, message) {
  if (!condition) {
    message = message || 'Assertion failed';
    throw new Error(message);
  }
}

function shallowcopy(obj) {
  var copy = Object.create(Object.getPrototypeOf(obj));
  for (var prop in obj) {
    copy[prop] = obj[prop];
  }
  return copy;
}

function endsWith(subject, search) {
  // IE support
  var position = subject.length - search.length;
  var lastIndex = subject.indexOf(search, position);
  return lastIndex !== -1 && lastIndex === position;
}

function minMax(arr) {
  var len = arr.length;
  var min = Infinity;
  var max = -Infinity;
  while (len--) {
    var el = arr[len];
    if (el == null) {
      // do nothing
    } else if (el < min) {
        min = el;
      } else if (el > max) {
        max = el;
      }
  }
  if (min === Infinity) {
    min = max;
  } else if (max === -Infinity) {
    max = min;
  }
  if (min === Infinity || min === -Infinity) {
    // all values were null
    min = null;
    max = null;
  }
  return [min, max];
}

/***
 * Return the indices of the two neighbors in the a array closest to x.
 * The array must be sorted (strictly monotone), either ascending or descending.
 * 
 * If x exists in the array, both neighbors point to x.
 * If x is lower (greater if descending) than the first value, both neighbors point to 0.
 * If x is greater (lower if descending) than the last value, both neighbors point to the last index.
 * 
 * Adapted from https://stackoverflow.com/a/4431347
 */
function indicesOfNearest(a, x) {
  if (a.length === 0) {
    throw new Error('Array must have at least one element');
  }
  var lo = -1;
  var hi = a.length;
  var ascending = a.length === 1 || a[0] < a[1];
  // we have two separate code paths to help the runtime optimize the loop
  if (ascending) {
    while (hi - lo > 1) {
      var mid = Math.round((lo + hi) / 2);
      if (a[mid] <= x) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
  } else {
    while (hi - lo > 1) {
      var mid = Math.round((lo + hi) / 2);
      if (a[mid] >= x) {
        // here's the difference
        lo = mid;
      } else {
        hi = mid;
      }
    }
  }
  if (a[lo] === x) hi = lo;
  if (lo === -1) lo = hi;
  if (hi === a.length) hi = lo;
  return [lo, hi];
}

/**
 * Return the index in a of the value closest to x.
 * The array a must be sorted, either ascending or descending.
 * If x happens to be exactly between two values, the one that
 * appears first is returned.
 */
function indexOfNearest(a, x) {
  var i = indicesOfNearest(a, x);
  var lo = i[0];
  var hi = i[1];
  if (Math.abs(x - a[lo]) <= Math.abs(x - a[hi])) {
    return lo;
  } else {
    return hi;
  }
}

function asTime(inp) {
  var res = undefined;
  var err = false;
  if (typeof inp === 'string') {
    res = new Date(inp).getTime();
  } else if (inp instanceof Date) {
    res = inp.getTime();
  } else {
    err = true;
  }
  if (isNaN(res)) {
    err = true;
  }
  if (err) {
    throw new Error('Invalid date: ' + inp);
  }
  return res;
}
},{}],8:[function(require,module,exports){
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Patrick Gansterer <paroga@paroga.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(global, undefined) { "use strict";
var POW_2_24 = Math.pow(2, -24),
    POW_2_32 = Math.pow(2, 32),
    POW_2_53 = Math.pow(2, 53);

function encode(value) {
  var data = new ArrayBuffer(256);
  var dataView = new DataView(data);
  var lastLength;
  var offset = 0;

  function ensureSpace(length) {
    var newByteLength = data.byteLength;
    var requiredLength = offset + length;
    while (newByteLength < requiredLength)
      newByteLength *= 2;
    if (newByteLength !== data.byteLength) {
      var oldDataView = dataView;
      data = new ArrayBuffer(newByteLength);
      dataView = new DataView(data);
      var uint32count = (offset + 3) >> 2;
      for (var i = 0; i < uint32count; ++i)
        dataView.setUint32(i * 4, oldDataView.getUint32(i * 4));
    }

    lastLength = length;
    return dataView;
  }
  function write() {
    offset += lastLength;
  }
  function writeFloat64(value) {
    write(ensureSpace(8).setFloat64(offset, value));
  }
  function writeUint8(value) {
    write(ensureSpace(1).setUint8(offset, value));
  }
  function writeUint8Array(value) {
    var dataView = ensureSpace(value.length);
    for (var i = 0; i < value.length; ++i)
      dataView.setUint8(offset + i, value[i]);
    write();
  }
  function writeUint16(value) {
    write(ensureSpace(2).setUint16(offset, value));
  }
  function writeUint32(value) {
    write(ensureSpace(4).setUint32(offset, value));
  }
  function writeUint64(value) {
    var low = value % POW_2_32;
    var high = (value - low) / POW_2_32;
    var dataView = ensureSpace(8);
    dataView.setUint32(offset, high);
    dataView.setUint32(offset + 4, low);
    write();
  }
  function writeTypeAndLength(type, length) {
    if (length < 24) {
      writeUint8(type << 5 | length);
    } else if (length < 0x100) {
      writeUint8(type << 5 | 24);
      writeUint8(length);
    } else if (length < 0x10000) {
      writeUint8(type << 5 | 25);
      writeUint16(length);
    } else if (length < 0x100000000) {
      writeUint8(type << 5 | 26);
      writeUint32(length);
    } else {
      writeUint8(type << 5 | 27);
      writeUint64(length);
    }
  }
  
  function encodeItem(value) {
    var i;

    if (value === false)
      return writeUint8(0xf4);
    if (value === true)
      return writeUint8(0xf5);
    if (value === null)
      return writeUint8(0xf6);
    if (value === undefined)
      return writeUint8(0xf7);
  
    switch (typeof value) {
      case "number":
        if (Math.floor(value) === value) {
          if (0 <= value && value <= POW_2_53)
            return writeTypeAndLength(0, value);
          if (-POW_2_53 <= value && value < 0)
            return writeTypeAndLength(1, -(value + 1));
        }
        writeUint8(0xfb);
        return writeFloat64(value);

      case "string":
        var utf8data = [];
        for (i = 0; i < value.length; ++i) {
          var charCode = value.charCodeAt(i);
          if (charCode < 0x80) {
            utf8data.push(charCode);
          } else if (charCode < 0x800) {
            utf8data.push(0xc0 | charCode >> 6);
            utf8data.push(0x80 | charCode & 0x3f);
          } else if (charCode < 0xd800) {
            utf8data.push(0xe0 | charCode >> 12);
            utf8data.push(0x80 | (charCode >> 6)  & 0x3f);
            utf8data.push(0x80 | charCode & 0x3f);
          } else {
            charCode = (charCode & 0x3ff) << 10;
            charCode |= value.charCodeAt(++i) & 0x3ff;
            charCode += 0x10000;

            utf8data.push(0xf0 | charCode >> 18);
            utf8data.push(0x80 | (charCode >> 12)  & 0x3f);
            utf8data.push(0x80 | (charCode >> 6)  & 0x3f);
            utf8data.push(0x80 | charCode & 0x3f);
          }
        }

        writeTypeAndLength(3, utf8data.length);
        return writeUint8Array(utf8data);

      default:
        var length;
        if (Array.isArray(value)) {
          length = value.length;
          writeTypeAndLength(4, length);
          for (i = 0; i < length; ++i)
            encodeItem(value[i]);
        } else if (value instanceof Uint8Array) {
          writeTypeAndLength(2, value.length);
          writeUint8Array(value);
        } else {
          var keys = Object.keys(value);
          length = keys.length;
          writeTypeAndLength(5, length);
          for (i = 0; i < length; ++i) {
            var key = keys[i];
            encodeItem(key);
            encodeItem(value[key]);
          }
        }
    }
  }
  
  encodeItem(value);

  if ("slice" in data)
    return data.slice(0, offset);
  
  var ret = new ArrayBuffer(offset);
  var retView = new DataView(ret);
  for (var i = 0; i < offset; ++i)
    retView.setUint8(i, dataView.getUint8(i));
  return ret;
}

function decode(data, tagger, simpleValue) {
  var dataView = new DataView(data);
  var offset = 0;
  
  if (typeof tagger !== "function")
    tagger = function(value) { return value; };
  if (typeof simpleValue !== "function")
    simpleValue = function() { return undefined; };

  function read(value, length) {
    offset += length;
    return value;
  }
  function readArrayBuffer(length) {
    return read(new Uint8Array(data, offset, length), length);
  }
  function readFloat16() {
    var tempArrayBuffer = new ArrayBuffer(4);
    var tempDataView = new DataView(tempArrayBuffer);
    var value = readUint16();

    var sign = value & 0x8000;
    var exponent = value & 0x7c00;
    var fraction = value & 0x03ff;
    
    if (exponent === 0x7c00)
      exponent = 0xff << 10;
    else if (exponent !== 0)
      exponent += (127 - 15) << 10;
    else if (fraction !== 0)
      return fraction * POW_2_24;
    
    tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);
    return tempDataView.getFloat32(0);
  }
  function readFloat32() {
    return read(dataView.getFloat32(offset), 4);
  }
  function readFloat64() {
    return read(dataView.getFloat64(offset), 8);
  }
  function readUint8() {
    return read(dataView.getUint8(offset), 1);
  }
  function readUint16() {
    return read(dataView.getUint16(offset), 2);
  }
  function readUint32() {
    return read(dataView.getUint32(offset), 4);
  }
  function readUint64() {
    return readUint32() * POW_2_32 + readUint32();
  }
  function readBreak() {
    if (dataView.getUint8(offset) !== 0xff)
      return false;
    offset += 1;
    return true;
  }
  function readLength(additionalInformation) {
    if (additionalInformation < 24)
      return additionalInformation;
    if (additionalInformation === 24)
      return readUint8();
    if (additionalInformation === 25)
      return readUint16();
    if (additionalInformation === 26)
      return readUint32();
    if (additionalInformation === 27)
      return readUint64();
    if (additionalInformation === 31)
      return -1;
    throw "Invalid length encoding";
  }
  function readIndefiniteStringLength(majorType) {
    var initialByte = readUint8();
    if (initialByte === 0xff)
      return -1;
    var length = readLength(initialByte & 0x1f);
    if (length < 0 || (initialByte >> 5) !== majorType)
      throw "Invalid indefinite length element";
    return length;
  }

  function appendUtf16data(utf16data, length) {
    for (var i = 0; i < length; ++i) {
      var value = readUint8();
      if (value & 0x80) {
        if (value < 0xe0) {
          value = (value & 0x1f) <<  6
                | (readUint8() & 0x3f);
          length -= 1;
        } else if (value < 0xf0) {
          value = (value & 0x0f) << 12
                | (readUint8() & 0x3f) << 6
                | (readUint8() & 0x3f);
          length -= 2;
        } else {
          value = (value & 0x0f) << 18
                | (readUint8() & 0x3f) << 12
                | (readUint8() & 0x3f) << 6
                | (readUint8() & 0x3f);
          length -= 3;
        }
      }

      if (value < 0x10000) {
        utf16data.push(value);
      } else {
        value -= 0x10000;
        utf16data.push(0xd800 | (value >> 10));
        utf16data.push(0xdc00 | (value & 0x3ff));
      }
    }
  }

  function decodeItem() {
    var initialByte = readUint8();
    var majorType = initialByte >> 5;
    var additionalInformation = initialByte & 0x1f;
    var i;
    var length;

    if (majorType === 7) {
      switch (additionalInformation) {
        case 25:
          return readFloat16();
        case 26:
          return readFloat32();
        case 27:
          return readFloat64();
      }
    }

    length = readLength(additionalInformation);
    if (length < 0 && (majorType < 2 || 6 < majorType))
      throw "Invalid length";

    switch (majorType) {
      case 0:
        return length;
      case 1:
        return -1 - length;
      case 2:
        if (length < 0) {
          var elements = [];
          var fullArrayLength = 0;
          while ((length = readIndefiniteStringLength(majorType)) >= 0) {
            fullArrayLength += length;
            elements.push(readArrayBuffer(length));
          }
          var fullArray = new Uint8Array(fullArrayLength);
          var fullArrayOffset = 0;
          for (i = 0; i < elements.length; ++i) {
            fullArray.set(elements[i], fullArrayOffset);
            fullArrayOffset += elements[i].length;
          }
          return fullArray;
        }
        return readArrayBuffer(length);
      case 3:
        var utf16data = [];
        if (length < 0) {
          while ((length = readIndefiniteStringLength(majorType)) >= 0)
            appendUtf16data(utf16data, length);
        } else
          appendUtf16data(utf16data, length);
        return String.fromCharCode.apply(null, utf16data);
      case 4:
        var retArray;
        if (length < 0) {
          retArray = [];
          while (!readBreak())
            retArray.push(decodeItem());
        } else {
          retArray = new Array(length);
          for (i = 0; i < length; ++i)
            retArray[i] = decodeItem();
        }
        return retArray;
      case 5:
        var retObject = {};
        for (i = 0; i < length || length < 0 && !readBreak(); ++i) {
          var key = decodeItem();
          retObject[key] = decodeItem();
        }
        return retObject;
      case 6:
        return tagger(decodeItem(), length);
      case 7:
        switch (length) {
          case 20:
            return false;
          case 21:
            return true;
          case 22:
            return null;
          case 23:
            return undefined;
          default:
            return simpleValue(length);
        }
    }
  }

  var ret = decodeItem();
  if (offset !== data.byteLength)
    throw "Remaining bytes";
  return ret;
}

var obj = { encode: encode, decode: decode };

if (typeof define === "function" && define.amd)
  define("cbor/cbor", obj);
else if (typeof module !== 'undefined' && module.exports)
  module.exports = obj;
else if (!global.CBOR)
  global.CBOR = obj;

})(this);

},{}],9:[function(require,module,exports){
var iota = require("iota-array")
var isBuffer = require("is-buffer")

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor

},{"iota-array":10,"is-buffer":11}],10:[function(require,module,exports){
"use strict"

function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota
},{}],11:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}]},{},[5])(5)
});