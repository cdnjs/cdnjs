/**
* Omniscient.js v2.1.0
* Authors: @torgeir,@mikaelbr
***************************************/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.omniscient=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var React     = window.React,
    deepEqual = _dereq_('deep-equal');

module.exports = component;
module.exports.shouldComponentUpdate = shouldComponentUpdate;
module.exports.isEqualState  = function isEqualState () { return deepEqual.apply(this, arguments); };
module.exports.isEqualCursor = function isEqualCursor (a, b) { return unCursor(a) === unCursor(b); };
module.exports.isCursor = isCursor;

var debug;
module.exports.debug = function (pattern) {
  var regex = new RegExp(pattern || '.*');
  debug = function (str) {
    var key = this._currentElement && this._currentElement.key ? ' key=' + this._currentElement.key : '';
    var name = this.constructor.displayName;
    var tag = name + key;
    if ((key || name) && regex.test(tag)) console.debug('<' + tag + '>: ' + str);
  };
}

function component (displayName, mixins, render) {
  var options = createDefaultArguments(displayName, mixins, render);
  var methodStatics = pickStaticMixins(options.mixins);

  var componentObject = {
    displayName: options.displayName,
    mixins: options.mixins,
    render: function render () {
      if (debug) debug.call(this, 'render');
      return options.render.call(this, this.props, this.props.statics);
    }
  };

  if (methodStatics) {
    componentObject.statics = methodStatics;
    removeOldStaticMethods(options.mixins);
  }

  var Component = React.createClass(componentObject);

  var create = function (key, props) {
    var children = toArray(arguments).filter(React.isValidElement);

    if (typeof key === 'object') {
      props = key;
      key   = void 0;
    }

    if (!props) {
      props = { };
    }

    if (isCursor(props)) {
      props = { cursor: props };
    }

    if (key) {
      props.key = key;
    }

    if (!!children.length) {
      props.children = children;
    }

    return React.createElement(Component, props);
  };

  create.jsx = Component;

  if (methodStatics) {
    create = extend(create, methodStatics);
  }

  return create;
};

function shouldComponentUpdate (nextProps, nextState) {
  var isEqualState  = module.exports.isEqualState;

  var isNotIgnorable = not(or(isStatics, isChildren));

  var nextCursors    = filterKeyValue(guaranteeObject(nextProps), isNotIgnorable),
      currentCursors = filterKeyValue(guaranteeObject(this.props), isNotIgnorable);

  var nextCursorsKeys    = Object.keys(nextCursors),
      currentCursorsKeys = Object.keys(currentCursors);

  if (currentCursorsKeys.length !== nextCursorsKeys.length) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (number of cursors differ)');
    return true;
  }

  if (hasDifferentKeys(currentCursorsKeys, currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (cursors have different keys)');
    return true;
  }

  if (hasChangedCursors(currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (cursors have changed)');
    return true;
  }

  if (!isEqualState(this.state, nextState)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (state has changed)');
    return true;
  }

  if (hasChangedProperties(currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (properties have changed)');
    return true;
  }

  if (debug) debug.call(this, 'shouldComponentUpdate => false');

  return false;
}

function guaranteeObject (prop) {
  if (!prop) {
    return {};
  }

  if (isCursor(prop)) {
    return { _dummy_key: prop };
  }

  if (typeof prop !== 'object') {
    return { _dummy_key: prop };
  }

  return prop;
}

function hasDifferentKeys (currentCursorsKeys, currentCursors, nextCursors) {
  return !currentCursorsKeys.every(function existsInBoth (key) {
    return typeof currentCursors[key] !== 'undefined' && typeof nextCursors[key] !== 'undefined';
  });
}

function hasChangedCursors (current, next) {
  current = filterKeyValue(current, isCursor);
  next    = filterKeyValue(next, isCursor);

  var isEqualCursor = module.exports.isEqualCursor;

  for (var key in current)
    if (!isEqualCursor(current[key], next[key]))
      return true;
  return false;
}

function hasChangedProperties (current, next) {
  current = filterKeyValue(current, not(isCursor));
  next    = filterKeyValue(next, not(isCursor));

  for (var key in current)
    if (!deepEqual(current[key], next[key]))
      return true;
  return false;
}

function createDefaultArguments (displayName, mixins, render) {

  // (render)
  if (typeof displayName === 'function') {
    render      = displayName;
    mixins      = [];
    displayName = void 0;
  }

  // (mixins, render)
  if (typeof displayName === 'object' && typeof mixins === 'function') {
    render      = mixins;
    mixins      = displayName;
    displayName = void 0;
  }

  // (displayName, render)
  if (typeof displayName === 'string' && typeof mixins === 'function') {
    render = mixins;
    mixins = [];
  }

  // Else (displayName, mixins, render)

  if (!Array.isArray(mixins)) {
    mixins = [mixins];
  }

  if (!hasShouldComponentUpdate(mixins)) {
    var ShouldComponentUpdate = {
      shouldComponentUpdate: module.exports.shouldComponentUpdate
    };
    mixins = [ShouldComponentUpdate].concat(mixins);
  }

  return {
    displayName: displayName,
    mixins: mixins,
    render: render
  };
}

function pickStaticMixins (mixins) {
  var filtered = mixins.filter(function (obj) {
    return !!obj.statics;
  });

  if (!filtered.length) {
    return void 0;
  }

  var statics = {};
  filtered.forEach(function (obj) {
    statics = extend(statics, obj.statics);
  });

  return statics;
}

function removeOldStaticMethods (mixins) {
  mixins.filter(function (obj) {
    return !!obj.statics;
  }).forEach(function (obj) {
    delete obj.statics;
  });
}

function extend (original, extension) {
  for (key in extension) {
    if (extension.hasOwnProperty(key) && !original[key]) {
      original[key] = extension[key];
    }
  }
  return original;
}

function hasShouldComponentUpdate (mixins) {
  return !!mixins.filter(function (mixin) {
    return !!mixin.shouldComponentUpdate;
  }).length;
}

function isCursor (potential) {
  return potential &&
    ((typeof potential.deref === 'function') || (typeof potential.__deref === 'function'));
}

function unCursor(cursor) {
  if (!isCursor(cursor)) {
    return cursor;
  }

  if (typeof cursor.deref === 'function') {
    return cursor.deref();
  }

  return cursor.__deref();
}

function filterKeyValue (object, predicate) {
  var key, filtered = {};
  for (key in object)
    if (predicate(object[key], key))
      filtered[key] = object[key];
  return filtered;
}

function not (fn) {
  return function () {
    return !fn.apply(fn, arguments);
  };
}

function isStatics (val, key) {
  return key === 'statics';
}

function isChildren (val, key) {
  return key === 'children';
}

function or (fn1, fn2) {
  return function () {
    return fn1.apply(null, arguments) || fn2.apply(null, arguments);
  };
}

function toArray (args) {
  return Array.prototype.slice.call(args);
}

},{"deep-equal":2,"react":undefined}],2:[function(_dereq_,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = _dereq_('./lib/keys.js');
var isArguments = _dereq_('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return true;
}

},{"./lib/is_arguments.js":3,"./lib/keys.js":4}],3:[function(_dereq_,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],4:[function(_dereq_,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}]},{},[1])(1)
});
