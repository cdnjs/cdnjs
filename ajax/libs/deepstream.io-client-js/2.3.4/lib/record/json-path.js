'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('../utils/utils');

var PARTS_REG_EXP = /([^.[\]\s]+)/g;
var cache = Object.create(null);

/**
 * Returns the value of the path or
 * undefined if the path can't be resolved
 *
 * @public
 * @returns {Mixed}
 */
module.exports.get = function (data, path, deepCopy) {
  var tokens = tokenize(path);
  var value = data;
  for (var i = 0; i < tokens.length; i++) {
    if (value === undefined) {
      return undefined;
    }
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
      throw new Error('invalid data or path');
    }
    value = value[tokens[i]];
  }

  return deepCopy !== false ? utils.deepCopy(value) : value;
};

/**
 * Sets the value of the path. If the path (or parts
 * of it) doesn't exist yet, it will be created
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {Mixed} updated value
 */
module.exports.set = function (data, path, value, deepCopy) {
  var tokens = tokenize(path);

  if (tokens.length === 0) {
    return patch(data, value, deepCopy);
  }

  var oldValue = module.exports.get(data, path, false);
  var newValue = patch(oldValue, value, deepCopy);

  if (newValue === oldValue) {
    return data;
  }

  var result = utils.shallowCopy(data);

  var node = result;
  for (var i = 0; i < tokens.length; i++) {
    if (i === tokens.length - 1) {
      node[tokens[i]] = newValue;
    } else if (node[tokens[i]] !== undefined) {
      node = node[tokens[i]] = utils.shallowCopy(node[tokens[i]]);
    } else if (tokens[i + 1] && !isNaN(tokens[i + 1])) {
      node = node[tokens[i]] = [];
    } else {
      node = node[tokens[i]] = Object.create(null);
    }
  }

  return result;
};

/**
 * Merge the new value into the old value
 * @param  {Mixed} oldValue
 * @param  {Mixed} newValue
 * @param  {boolean} deepCopy
 * @return {Mixed}
 */
function patch(oldValue, newValue, deepCopy) {
  var i = void 0;
  var j = void 0;
  if (oldValue === null || newValue === null) {
    return newValue;
  } else if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    var arr = void 0;
    for (i = 0; i < newValue.length; i++) {
      var value = patch(oldValue[i], newValue[i], false);
      if (!arr) {
        if (value === oldValue[i]) {
          continue;
        }
        arr = [];
        for (j = 0; j < i; ++j) {
          arr[j] = oldValue[j];
        }
      }
      arr[i] = value;
    }
    arr = arr && deepCopy !== false ? utils.deepCopy(arr) : arr;
    arr = arr || (oldValue.length === newValue.length ? oldValue : newValue);
    return arr;
  } else if (!Array.isArray(newValue) && (typeof oldValue === 'undefined' ? 'undefined' : _typeof(oldValue)) === 'object' && (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
    var obj = void 0;
    var props = Object.keys(newValue);
    for (i = 0; i < props.length; i++) {
      var _value = patch(oldValue[props[i]], newValue[props[i]], false);
      if (!obj) {
        if (_value === oldValue[props[i]]) {
          continue;
        }
        obj = Object.create(null);
        for (j = 0; j < i; ++j) {
          obj[props[j]] = oldValue[props[j]];
        }
      }
      obj[props[i]] = newValue[props[i]];
    }
    obj = obj && deepCopy !== false ? utils.deepCopy(obj) : obj;
    obj = obj || (Object.keys(oldValue).length === props.length ? oldValue : newValue);
    return obj;
  } else if (newValue !== oldValue) {
    return deepCopy !== false ? utils.deepCopy(newValue) : newValue;
  }

  return oldValue;
}

/**
 * Parses the path. Splits it into
 * keys for objects and indices for arrays.
 *
 * @returns Array of tokens
 */
function tokenize(path) {
  if (cache[path]) {
    return cache[path];
  }

  var parts = String(path) !== 'undefined' ? String(path).match(PARTS_REG_EXP) : [];

  if (!parts) {
    throw new Error('invalid path ' + path);
  }

  cache[path] = parts;
  return cache[path];
}