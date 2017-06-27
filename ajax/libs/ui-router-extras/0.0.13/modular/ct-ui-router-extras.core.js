/**

 * UI-Router Extras: Sticky states, Future States, Deep State Redirect, Transition promise
 * Module: core
 * @version 0.0.13
 * @link http://christopherthielen.github.io/ui-router-extras/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(angular, undefined){
"use strict";
var mod_core = angular.module("ct.ui.router.extras.core", [ "ui.router" ]);

var internalStates = {}, stateRegisteredCallbacks = [];
mod_core.config([ '$stateProvider', '$injector', function ($stateProvider, $injector) {
  // Decorate any state attribute in order to get access to the internal state representation.
  $stateProvider.decorator('parent', function (state, parentFn) {
    // Capture each internal UI-Router state representations as opposed to the user-defined state object.
    // The internal state is, e.g., the state returned by $state.$current as opposed to $state.current
    internalStates[state.self.name] = state;
    // Add an accessor for the internal state from the user defined state
    state.self.$$state = function () {
      return internalStates[state.self.name];
    };

    angular.forEach(stateRegisteredCallbacks, function(callback) { callback(state); });
    return parentFn(state);
  });
}]);

var DEBUG = false;

var forEach = angular.forEach;
var extend = angular.extend;
var isArray = angular.isArray;

var map = function (collection, callback) {
  "use strict";
  var result = [];
  forEach(collection, function (item, index) {
    result.push(callback(item, index));
  });
  return result;
};

var keys = function (collection) {
  "use strict";
  return map(collection, function (collection, key) {
    return key;
  });
};

var filter = function (collection, callback) {
  "use strict";
  var result = [];
  forEach(collection, function (item, index) {
    if (callback(item, index)) {
      result.push(item);
    }
  });
  return result;
};

var filterObj = function (collection, callback) {
  "use strict";
  var result = {};
  forEach(collection, function (item, index) {
    if (callback(item, index)) {
      result[index] = item;
    }
  });
  return result;
};

// Duplicates code in UI-Router common.js
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  }
  return path;
}

// Duplicates code in UI-Router common.js
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }
  var result = [];

  angular.forEach(object, function (val, key) {
    result.push(key);
  });
  return result;
}

/**
 * like objectKeys, but includes keys from prototype chain.
 * @param object the object whose prototypal keys will be returned
 * @param ignoreKeys an array of keys to ignore
 */
// Duplicates code in UI-Router common.js
function protoKeys(object, ignoreKeys) {
  var result = [];
  for (var key in object) {
    if (!ignoreKeys || ignoreKeys.indexOf(key) === -1)
      result.push(key);
  }
  return result;
}

// Duplicates code in UI-Router common.js
function arraySearch(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  }
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  }
  return -1;
}

// Duplicates code in UI-Router common.js
// Added compatibility code  (isArray check) to support both 0.2.x and 0.3.x series of UI-Router.
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

  for (var i in parents) {
    if (!parents[i].params) continue;
    // This test allows compatibility with 0.2.x and 0.3.x (optional and object params)
    parentParams = isArray(parents[i].params) ? parents[i].params : objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (arraySearch(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    }
  }
  return extend({}, inherited, newParams);
}

function inherit(parent, extra) {
  return extend(new (extend(function () { }, {prototype: parent}))(), extra);
}

function onStateRegistered(callback) { stateRegisteredCallbacks.push(callback); }

mod_core.provider("uirextras_core", function() {
  var core = {
    internalStates: internalStates,
    onStateRegistered: onStateRegistered,
    forEach: forEach,
    extend: extend,
    isArray: isArray,
    map: map,
    keys: keys,
    filter: filter,
    filterObj: filterObj,
    ancestors: ancestors,
    objectKeys: objectKeys,
    protoKeys: protoKeys,
    arraySearch: arraySearch,
    inheritParams: inheritParams,
    inherit: inherit
  };

  angular.extend(this, core);

  this.$get = function() {
    return core;
  };
});


})(angular);