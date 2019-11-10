(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TWEEN = {})));
}(this, (function (exports) { 'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/* global global */


var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
var requestAnimationFrame = root.requestAnimationFrame || function (fn) {
  return root.setTimeout(fn, 16);
};
var cancelAnimationFrame = root.cancelAnimationFrame || function (id) {
  return root.clearTimeout(id);
};

/* global process */
/**
 * Get browser/Node.js current time-stamp
 * @return Normalised current time-stamp in milliseconds
 * @memberof TWEEN
 * @example
 * TWEEN.now
 */

var now = function () {
  if (typeof process !== 'undefined' && process.hrtime !== undefined && (!process.versions || process.versions.electron === undefined)) {
    return function () {
      var time = process.hrtime(); // Convert [seconds, nanoseconds] to milliseconds.

      return time[0] * 1000 + time[1] / 1000000;
    }; // In a browser, use window.performance.now if it is available.
  } else if (root.performance !== undefined && root.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    return root.performance.now.bind(root.performance); // Use Date.now if it is available.
  } else {
    var offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
    return function () {
      return Date.now() - offset;
    };
  }
}();
/**
 * Lightweight, effecient and modular ES6 version of tween.js
 * @copyright 2017 @dalisoft and es6-tween contributors
 * @license MIT
 * @namespace TWEEN
 * @example
 * // ES6
 * const {add, remove, isRunning, autoPlay} = TWEEN
 */


var _tweens = [];
var isStarted = false;
var _autoPlay = false;

var _tick;

var _ticker = requestAnimationFrame;
var _stopTicker = cancelAnimationFrame;
var emptyFrame = 0;
var powerModeThrottle = 120;
/**
 * Adds tween to list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * let tween = new Tween({x:0})
 * tween.to({x:200}, 1000)
 * TWEEN.add(tween)
 */

var add = function add(tween) {
  var i = _tweens.indexOf(tween);

  if (i > -1) {
    _tweens.splice(i, 1);
  }

  _tweens.push(tween);

  emptyFrame = 0;

  if (_autoPlay && !isStarted) {
    _tick = _ticker(update);
    isStarted = true;
  }
};
/**
 * Adds ticker like event
 * @param {Function} fn callback
 * @memberof TWEEN
 * @example
 * TWEEN.onTick(time => console.log(time))
 */


var onTick = function onTick(fn) {
  return _tweens.push({
    update: fn
  });
};
/**
 * @returns {Array<Tween>} List of tweens in Array
 * @memberof TWEEN
 * TWEEN.getAll() // list of tweens
 */


var getAll = function getAll() {
  return _tweens;
};
/**
 * Runs update loop automaticlly
 * @param {Boolean} state State of auto-run of update loop
 * @example TWEEN.autoPlay(true)
 * @memberof TWEEN
 */


var autoPlay = function autoPlay(state) {
  _autoPlay = state;
};
/**
 * Removes all tweens from list
 * @example TWEEN.removeAll() // removes all tweens, stored in global tweens list
 * @memberof TWEEN
 */


var removeAll = function removeAll() {
  _tweens.length = 0;
};
/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Tween} Matched tween
 * @memberof TWEEN
 * @example
 * TWEEN.get(tween)
 */


var get = function get(tween) {
  for (var i = 0; i < _tweens.length; i++) {
    if (tween === _tweens[i]) {
      return _tweens[i];
    }
  }

  return null;
};
/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Boolean} Status of Exists tween or not
 * @memberof TWEEN
 * @example
 * TWEEN.has(tween)
 */


var has = function has(tween) {
  return get(tween) !== null;
};
/**
 * Removes tween from list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * TWEEN.remove(tween)
 */


var remove = function remove(tween) {
  var i = _tweens.indexOf(tween);

  if (i !== -1) {
    _tweens.splice(i, 1);
  }
};
/**
 * Updates global tweens by given time
 * @param {number=} time Timestamp
 * @param {Boolean=} preserve Prevents tween to be removed after finish
 * @memberof TWEEN
 * @example
 * TWEEN.update(500)
 */


var update = function update() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : now();
  var preserve = arguments.length > 1 ? arguments[1] : undefined;

  if (_autoPlay && isStarted) {
    _tick = _ticker(update);
  }

  if (!_tweens.length) {
    emptyFrame++;
  }

  if (emptyFrame > powerModeThrottle) {
    _stopTicker(_tick);

    isStarted = false;
    emptyFrame = 0;
    return false;
  }

  var i = 0;

  while (i < _tweens.length) {
    _tweens[i++].update(time, preserve);
  }

  return true;
};
/**
 * The state of ticker running
 * @return {Boolean} Status of running updates on all tweens
 * @memberof TWEEN
 * @example TWEEN.isRunning()
 */


var isRunning = function isRunning() {
  return isStarted;
};
/**
 * The plugins store object
 * @namespace TWEEN.Plugins
 * @memberof TWEEN
 * @example
 * let num = Plugins.num = function (node, start, end) {
 * return t => start + (end - start) * t
 * }
 *
 * @static
 */


var Plugins = {};

/**
 * List of full easings
 * @namespace TWEEN.Easing
 * @example
 * import {Tween, Easing} from 'es6-tween'
 *
 * // then set via new Tween({x:0}).to({x:100}, 1000).easing(Easing.Quadratic.InOut).start()
 */
var Easing = {
  Linear: {
    None: function None(k) {
      return k;
    }
  },
  Quadratic: {
    In: function In(k) {
      return k * k;
    },
    Out: function Out(k) {
      return k * (2 - k);
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }

      return -0.5 * (--k * (k - 2) - 1);
    }
  },
  Cubic: {
    In: function In(k) {
      return k * k * k;
    },
    Out: function Out(k) {
      return --k * k * k + 1;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k + 2);
    }
  },
  Quartic: {
    In: function In(k) {
      return k * k * k * k;
    },
    Out: function Out(k) {
      return 1 - --k * k * k * k;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }

      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  },
  Quintic: {
    In: function In(k) {
      return k * k * k * k * k;
    },
    Out: function Out(k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  },
  Sinusoidal: {
    In: function In(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function Out(k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function InOut(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  },
  Exponential: {
    In: function In(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    Out: function Out(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    InOut: function InOut(k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  },
  Circular: {
    In: function In(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function Out(k) {
      return Math.sqrt(1 - --k * k);
    },
    InOut: function InOut(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  },
  Elastic: {
    In: function In(k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    Out: function Out(k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function InOut(k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      k *= 2;

      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function In(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function Out(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function InOut(k) {
      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  },
  Bounce: {
    In: function In(k) {
      return 1 - Easing.Bounce.Out(1 - k);
    },
    Out: function Out(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    InOut: function InOut(k) {
      if (k < 0.5) {
        return Easing.Bounce.In(k * 2) * 0.5;
      }

      return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  },
  Stepped: {
    steps: function steps(_steps) {
      return function (k) {
        return (k * _steps | 0) / _steps;
      };
    }
  }
};

// Frame lag-fix constants
var FRAME_MS = 50 / 3;
var TOO_LONG_FRAME_MS = 250;
var CHAINED_TWEENS = '_chainedTweens'; // Event System

var EVENT_CALLBACK = 'Callback';
var EVENT_UPDATE = 'update';
var EVENT_COMPLETE = 'complete';
var EVENT_START = 'start';
var EVENT_REPEAT = 'repeat';
var EVENT_REVERSE = 'reverse';
var EVENT_PAUSE = 'pause';
var EVENT_PLAY = 'play';
var EVENT_RESTART = 'restart';
var EVENT_STOP = 'stop';
var EVENT_SEEK = 'seek'; // For String tweening stuffs

var STRING_PROP = 'STRING_PROP'; // Also RegExp's for string tweening

var NUM_REGEX = /\s+|([A-Za-z?().,{}:""[\]#%]+)|([-+]=+)?([-+]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]=?\d+)?/g;
 // Copies everything, duplicates, no shallow-copy

function deepCopy(source) {
  if (source && source.nodeType || source === undefined || _typeof(source) !== 'object') {
    return source;
  } else if (Array.isArray(source)) {
    return [].concat(source);
  } else if (_typeof(source) === 'object') {
    var target = {};

    for (var prop in source) {
      target[prop] = deepCopy(source[prop]);
    }

    return target;
  }

  return source;
}

var isNaNForST = function isNaNForST(v) {
  return isNaN(+v) || (v[0] === '+' || v[0] === '-') && v[1] === '=' || v === '' || v === ' ';
};

var hexColor = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;

var hex2rgb = function hex2rgb(all, hex) {
  var r;
  var g;
  var b;

  if (hex.length === 3) {
    r = hex[0];
    g = hex[1];
    b = hex[2];
    hex = r + r + g + g + b + b;
  }

  var color = parseInt(hex, 16);
  r = color >> 16 & 255;
  g = color >> 8 & 255;
  b = color & 255;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

function decomposeString(fromValue) {
  return typeof fromValue !== 'string' ? fromValue : fromValue.replace(hexColor, hex2rgb).match(NUM_REGEX).map(function (v) {
    return isNaNForST(v) ? v : +v;
  });
} // Decompose value, now for only `string` that required

function decompose(prop, obj, from, to, stringBuffer) {
  var fromValue = from[prop];
  var toValue = to[prop];

  if (typeof fromValue === 'string' || typeof toValue === 'string') {
    var fromValue1 = Array.isArray(fromValue) && fromValue[0] === STRING_PROP ? fromValue : decomposeString(fromValue);
    var toValue1 = Array.isArray(toValue) && toValue[0] === STRING_PROP ? toValue : decomposeString(toValue);
    var i = 1;

    while (i < fromValue1.length) {
      if (fromValue1[i] === toValue1[i] && typeof fromValue1[i - 1] === 'string') {
        fromValue1.splice(i - 1, 2, fromValue1[i - 1] + fromValue1[i]);
        toValue1.splice(i - 1, 2, toValue1[i - 1] + toValue1[i]);
      } else {
        i++;
      }
    }

    i = 0;

    if (fromValue1[0] === STRING_PROP) {
      fromValue1.shift();
    }

    if (toValue1[0] === STRING_PROP) {
      toValue1.shift();
    }

    var fromValue2 = {
      isString: true,
      length: fromValue1.length
    };
    var toValue2 = {
      isString: true,
      length: toValue1.length
    };

    while (i < fromValue2.length) {
      fromValue2[i] = fromValue1[i];
      toValue2[i] = toValue1[i];
      i++;
    }

    from[prop] = fromValue2;
    to[prop] = toValue2;
    return true;
  } else if (_typeof(fromValue) === 'object' && _typeof(toValue) === 'object') {
    if (Array.isArray(fromValue)) {
      return fromValue.map(function (v, i) {
        return decompose(i, obj[prop], fromValue, toValue);
      });
    } else {
      for (var prop2 in toValue) {
        decompose(prop2, obj[prop], fromValue, toValue);
      }
    }

    return true;
  }

  return false;
} // Recompose value

var DECIMAL = Math.pow(10, 4);
var RGB = 'rgb(';
var RGBA = 'rgba(';
var isRGBColor = function isRGBColor(v, i) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RGB;
  return typeof v[i] === 'number' && (v[i - 1] === r || v[i - 3] === r || v[i - 5] === r);
};
function recompose(prop, obj, from, to, t, originalT, stringBuffer) {
  var fromValue = stringBuffer ? from : from[prop];
  var toValue = stringBuffer ? to : to[prop];

  if (toValue === undefined) {
    return fromValue;
  }

  if (fromValue === undefined || typeof fromValue === 'string' || fromValue === toValue) {
    return toValue;
  } else if (_typeof(fromValue) === 'object' && _typeof(toValue) === 'object') {
    if (!fromValue || !toValue) {
      return obj[prop];
    }

    if (_typeof(fromValue) === 'object' && !!fromValue && fromValue.isString) {
      var STRING_BUFFER = '';

      for (var i = 0, len = fromValue.length; i < len; i++) {
        var isRelative = typeof fromValue[i] === 'number' && typeof toValue[i] === 'string' && toValue[i][1] === '=';
        var currentValue = typeof fromValue[i] !== 'number' ? fromValue[i] : ((isRelative ? fromValue[i] + parseFloat(toValue[i][0] + toValue[i].substr(2)) * t : fromValue[i] + (toValue[i] - fromValue[i]) * t) * DECIMAL | 0) / DECIMAL;

        if (isRGBColor(fromValue, i) || isRGBColor(fromValue, i, RGBA)) {
          currentValue |= 0;
        }

        STRING_BUFFER += currentValue;

        if (isRelative && originalT === 1) {
          fromValue[i] = fromValue[i] + parseFloat(toValue[i][0] + toValue[i].substr(2));
        }
      }

      if (!stringBuffer) {
        obj[prop] = STRING_BUFFER;
      }

      return STRING_BUFFER;
    } else if (Array.isArray(fromValue) && fromValue[0] !== STRING_PROP) {
      for (var _i = 0, _len = fromValue.length; _i < _len; _i++) {
        if (fromValue[_i] === toValue[_i]) {
          continue;
        }

        recompose(_i, obj[prop], fromValue, toValue, t, originalT);
      }
    } else if (_typeof(fromValue) === 'object' && !!fromValue && !fromValue.isString) {
      for (var _i2 in fromValue) {
        if (fromValue[_i2] === toValue[_i2]) {
          continue;
        }

        recompose(_i2, obj[prop], fromValue, toValue, t, originalT);
      }
    }
  } else if (typeof fromValue === 'number') {
    var _isRelative = typeof toValue === 'string';

    obj[prop] = ((_isRelative ? fromValue + parseFloat(toValue[0] + toValue.substr(2)) * t : fromValue + (toValue - fromValue) * t) * DECIMAL | 0) / DECIMAL;

    if (_isRelative && originalT === 1) {
      from[prop] = obj[prop];
    }
  } else if (typeof toValue === 'function') {
    obj[prop] = toValue(t);
  }

  return obj[prop];
} // Dot notation => Object structure converter
// example
// {'scale.x.y.z':'VALUE'} => {scale:{x:{y:{z:'VALUE'}}}}
// Only works for 3-level parsing, after 3-level, parsing dot-notation not works as it's not affects

var propRegExp = /([.[])/g;
var replaceBrace = /\]/g;

var propExtract = function propExtract(obj, property) {
  var value = obj[property];
  var props = property.replace(replaceBrace, '').split(propRegExp);
  var propsLastIndex = props.length - 1;
  var lastArr = Array.isArray(obj);
  var lastObj = _typeof(obj) === 'object' && !lastArr;

  if (lastObj) {
    obj[property] = null;
    delete obj[property];
  } else if (lastArr) {
    obj.splice(property, 1);
  }

  return props.reduce(function (nested, prop, index) {
    if (lastArr) {
      if (prop !== '.' && prop !== '[') {
        prop *= 1;
      }
    }

    var nextProp = props[index + 1];
    var nextIsArray = nextProp === '[';

    if (prop === '.' || prop === '[') {
      if (prop === '.') {
        lastObj = true;
        lastArr = false;
      } else if (prop === '[') {
        lastObj = false;
        lastArr = true;
      }

      return nested;
    } else if (nested[prop] === undefined) {
      if (lastArr || lastObj) {
        nested[prop] = index === propsLastIndex ? value : lastArr || nextIsArray ? [] : lastObj ? {} : null;
        lastObj = lastArr = false;
        return nested[prop];
      }
    } else if (nested[prop] !== undefined) {
      if (index === propsLastIndex) {
        nested[prop] = value;
      }

      return nested[prop];
    }

    return nested;
  }, obj);
};

var SET_NESTED = function SET_NESTED(nested) {
  if (_typeof(nested) === 'object' && !!nested) {
    for (var prop in nested) {
      if (prop.indexOf('.') !== -1 || prop.indexOf('[') !== -1) {
        propExtract(nested, prop);
      } else if (_typeof(nested[prop]) === 'object' && !!nested[prop]) {
        var nested2 = nested[prop];

        for (var prop2 in nested2) {
          if (prop2.indexOf('.') !== -1 || prop2.indexOf('[') !== -1) {
            propExtract(nested2, prop2);
          } else if (_typeof(nested2[prop2]) === 'object' && !!nested2[prop2]) {
            var nested3 = nested2[prop2];

            for (var prop3 in nested3) {
              if (prop3.indexOf('.') !== -1 || prop3.indexOf('[') !== -1) {
                propExtract(nested3, prop3);
              }
            }
          }
        }
      }
    }
  }

  return nested;
};

/**
 * List of full Interpolation
 * @namespace TWEEN.Interpolation
 * @example
 * import {Interpolation, Tween} from 'es6-tween'
 *
 * let bezier = Interpolation.Bezier
 * new Tween({x:0}).to({x:[0, 4, 8, 12, 15, 20, 30, 40, 20, 40, 10, 50]}, 1000).interpolation(bezier).start()
 * @memberof TWEEN
 */

var Interpolation = {
  Linear: function Linear(v, k, value) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;

    if (k < 0) {
      return fn(v[0], v[1], f, value);
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f, value);
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i, value);
  },
  Bezier: function Bezier(v, k, value) {
    var b = Interpolation.Utils.Reset(value);
    var n = v.length - 1;
    var pw = Math.pow;
    var fn = Interpolation.Utils.Bernstein;
    var isBArray = Array.isArray(b);

    for (var i = 0; i <= n; i++) {
      if (typeof b === 'number') {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * fn(n, i);
      } else if (isBArray) {
        for (var p = 0, len = b.length; p < len; p++) {
          if (typeof b[p] === 'number') {
            b[p] += pw(1 - k, n - i) * pw(k, i) * v[i][p] * fn(n, i);
          } else {
            b[p] = v[i][p];
          }
        }
      } else if (_typeof(b) === 'object') {
        for (var _p in b) {
          if (typeof b[_p] === 'number') {
            b[_p] += pw(1 - k, n - i) * pw(k, i) * v[i][_p] * fn(n, i);
          } else {
            b[_p] = v[i][_p];
          }
        }
      } else if (typeof b === 'string') {
        var STRING_BUFFER = '';
        var idx = Math.round(n * k);
        var vCurr = v[idx];

        for (var ks = 1, _len = vCurr.length; ks < _len; ks++) {
          STRING_BUFFER += vCurr[ks];
        }

        return STRING_BUFFER;
      }
    }

    return b;
  },
  CatmullRom: function CatmullRom(v, k, value) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;

    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i, value);
    } else {
      if (k < 0) {
        return fn(v[1], v[1], v[0], v[0], -k, value);
      }

      if (k > 1) {
        return fn(v[m - 1], v[m - 1], v[m], v[m], (k | 0) - k, value);
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i, value);
    }
  },
  Utils: {
    Linear: function Linear(p0, p1, t, v) {
      if (typeof p0 === 'string') {
        return p1;
      } else if (typeof p0 === 'number') {
        return typeof p0 === 'function' ? p0(t) : p0 + (p1 - p0) * t;
      } else if (_typeof(p0) === 'object') {
        if (p0.length !== undefined) {
          if (p0[0] === STRING_PROP) {
            var STRING_BUFFER = '';

            for (var i = 1, len = p0.length; i < len; i++) {
              var currentValue = typeof p0[i] === 'number' ? p0[i] + (p1[i] - p0[i]) * t : p1[i];

              if (isRGBColor(p0, i) || isRGBColor(p0, i, RGBA)) {
                currentValue |= 0;
              }

              STRING_BUFFER += currentValue;
            }

            return STRING_BUFFER;
          }

          for (var p = 0, _len2 = v.length; p < _len2; p++) {
            v[p] = Interpolation.Utils.Linear(p0[p], p1[p], t, v[p]);
          }
        } else {
          for (var _p2 in v) {
            v[_p2] = Interpolation.Utils.Linear(p0[_p2], p1[_p2], t, v[_p2]);
          }
        }

        return v;
      }
    },
    Reset: function Reset(value) {
      if (Array.isArray(value)) {
        for (var i = 0, len = value.length; i < len; i++) {
          value[i] = Interpolation.Utils.Reset(value[i]);
        }

        return value;
      } else if (_typeof(value) === 'object') {
        for (var _i in value) {
          value[_i] = Interpolation.Utils.Reset(value[_i]);
        }

        return value;
      } else if (typeof value === 'number') {
        return 0;
      }

      return value;
    },
    Bernstein: function Bernstein(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function () {
      var a = [1];
      return function (n) {
        var s = 1;

        if (a[n]) {
          return a[n];
        }

        for (var i = n; i > 1; i--) {
          s *= i;
        }

        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function CatmullRom(p0, p1, p2, p3, t, v) {
      if (typeof p0 === 'string') {
        return p1;
      } else if (typeof p0 === 'number') {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
      } else if (_typeof(p0) === 'object') {
        if (p0.length !== undefined) {
          if (p0[0] === STRING_PROP) {
            var STRING_BUFFER = '';

            for (var i = 1, len = p0.length; i < len; i++) {
              var currentValue = typeof p0[i] === 'number' ? Interpolation.Utils.CatmullRom(p0[i], p1[i], p2[i], p3[i], t) : p3[i];

              if (isRGBColor(p0, i) || isRGBColor(p0, i, RGBA)) {
                currentValue |= 0;
              }

              STRING_BUFFER += currentValue;
            }

            return STRING_BUFFER;
          }

          for (var p = 0, _len3 = v.length; p < _len3; p++) {
            v[p] = Interpolation.Utils.CatmullRom(p0[p], p1[p], p2[p], p3[p], t, v[p]);
          }
        } else {
          for (var _p3 in v) {
            v[_p3] = Interpolation.Utils.CatmullRom(p0[_p3], p1[_p3], p2[_p3], p3[_p3], t, v[_p3]);
          }
        }

        return v;
      }
    }
  }
};

var Store = {};
var NodeCache = function (node, object, tween) {
  if (!node || !node.nodeType) {
    return object;
  }

  var ID = node.queueID || 'q_' + Date.now();

  if (!node.queueID) {
    node.queueID = ID;
  }

  var storeID = Store[ID];

  if (storeID) {
    if (storeID.object === object && node === storeID.tween.node && tween._startTime === storeID.tween._startTime) {
      remove(storeID.tween);
    } else if (_typeof(object) === 'object' && !!object && !!storeID.object) {
      for (var prop in object) {
        if (prop in storeID.object) {
          if (tween._startTime === storeID.tween._startTime) {
            delete storeID.object[prop];
          } else {
            storeID.propNormaliseRequired = true;
          }
        }
      }

      storeID.object = _objectSpread({}, storeID.object, object);
    }

    return storeID.object;
  }

  if (_typeof(object) === 'object' && !!object) {
    Store[ID] = {
      tween: tween,
      object: object,
      propNormaliseRequired: false
    };
    return Store[ID].object;
  }

  return object;
};

var Selector = function (selector, collection) {
  if (collection) {
    return !selector ? null : selector === window || selector === document ? [selector] : typeof selector === 'string' ? !!document.querySelectorAll && document.querySelectorAll(selector) : Array.isArray(selector) ? selector : selector.nodeType ? [selector] : [];
  }

  return !selector ? null : selector === window || selector === document ? selector : typeof selector === 'string' ? !!document.querySelector && document.querySelector(selector) : Array.isArray(selector) ? selector[0] : selector.nodeType ? selector : null;
};

var _id = 0; // Unique ID

var defaultEasing = Easing.Linear.None;
/**
 * Tween main constructor
 * @constructor
 * @class
 * @namespace TWEEN.Tween
 * @param {Object|Element} node Node Element or Tween initial object
 * @param {Object=} object If Node Element is using, second argument is used for Tween initial object
 * @example let tween = new Tween(myNode, {width:'100px'}).to({width:'300px'}, 2000).start()
 */

var Tween =
/*#__PURE__*/
function () {
  _createClass(Tween, null, [{
    key: "fromTo",

    /**
     * Easier way to call the Tween
     * @param {Element} node DOM Element
     * @param {object} object - Initial value
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example Tween.fromTo(node, {x:0}, {x:200}, {duration:1000})
     * @memberof TWEEN.Tween
     * @static
     */
    value: function fromTo(node, object, to) {
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      params.quickRender = params.quickRender ? params.quickRender : !to;
      var tween = new Tween(node, object).to(to, params);

      if (params.quickRender) {
        tween.render().update(tween._startTime);
        tween._rendered = false;
        tween._onStartCallbackFired = false;
      }

      return tween;
    }
    /**
     * Easier way calling constructor only applies the `to` value, useful for CSS Animation
     * @param {Element} node DOM Element
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example Tween.to(node, {x:200}, {duration:1000})
     * @memberof TWEEN.Tween
     * @static
     */

  }, {
    key: "to",
    value: function to(node, _to, params) {
      return Tween.fromTo(node, null, _to, params);
    }
    /**
     * Easier way calling constructor only applies the `from` value, useful for CSS Animation
     * @param {Element} node DOM Element
     * @param {object} from - Initial value
     * @param {object} params - Options of tweens
     * @example Tween.from(node, {x:200}, {duration:1000})
     * @memberof TWEEN.Tween
     * @static
     */

  }, {
    key: "from",
    value: function from(node, _from, params) {
      return Tween.fromTo(node, _from, null, params);
    }
  }]);

  function Tween(node, object) {
    _classCallCheck(this, Tween);

    this.id = _id++;

    if (!!node && _typeof(node) === 'object' && !object && !node.nodeType) {
      object = this.object = node;
      node = null;
    } else if (!!node && (node.nodeType || node.length || typeof node === 'string')) {
      node = this.node = Selector(node);
      object = this.object = NodeCache(node, object, this);
    }

    this._valuesEnd = null;
    this._valuesStart = {};
    this._duration = 1000;
    this._easingFunction = defaultEasing;
    this._easingReverse = defaultEasing;
    this._interpolationFunction = Interpolation.Linear;
    this._startTime = 0;
    this._initTime = 0;
    this._delayTime = 0;
    this._repeat = 0;
    this._r = 0;
    this._isPlaying = false;
    this._yoyo = false;
    this._reversed = false;
    this._onStartCallbackFired = false;
    this._pausedTime = null;
    this._isFinite = true;
    this._maxListener = 15;
    this._chainedTweensCount = 0;
    this._prevTime = null;
    return this;
  }
  /**
   * Sets max `event` listener's count to Events system
   * @param {number} count - Event listener's count
   * @memberof TWEEN.Tween
   */


  _createClass(Tween, [{
    key: "setMaxListener",
    value: function setMaxListener() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
      this._maxListener = count;
      return this;
    }
    /**
     * Adds `event` to Events system
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof TWEEN.Tween
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      var _maxListener = this._maxListener;
      var callbackName = event + EVENT_CALLBACK;

      for (var i = 0; i < _maxListener; i++) {
        var callbackId = callbackName + i;

        if (!this[callbackId]) {
          this[callbackId] = callback;
          break;
        }
      }

      return this;
    }
    /**
     * Adds `event` to Events system.
     * Removes itself after fired once
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof TWEEN.Tween
     */

  }, {
    key: "once",
    value: function once(event, callback) {
      return this;
    }
    /**
     * Removes `event` from Events system
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof TWEEN.Tween
     */

  }, {
    key: "off",
    value: function off(event, callback) {
      var _maxListener = this._maxListener;
      var callbackName = event + EVENT_CALLBACK;

      for (var i = 0; i < _maxListener; i++) {
        var callbackId = callbackName + i;

        if (this[callbackId] === callback) {
          this[callbackId] = null;
        }
      }

      return this;
    }
    /**
     * Emits/Fired/Trigger `event` from Events system listeners
     * @param {string} event - Event listener name
     * @memberof TWEEN.Tween
     */

  }, {
    key: "emit",
    value: function emit(event, arg1, arg2, arg3, arg4) {
      var _maxListener = this._maxListener;
      var callbackName = event + EVENT_CALLBACK;

      if (!this[callbackName + 0]) {
        return this;
      }

      for (var i = 0; i < _maxListener; i++) {
        var callbackId = callbackName + i;

        if (this[callbackId]) {
          this[callbackId](arg1, arg2, arg3, arg4);
        }
      }

      return this;
    }
    /**
     * @return {boolean} State of playing of tween
     * @example tween.isPlaying() // returns `true` if tween in progress
     * @memberof TWEEN.Tween
     */

  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return this._isPlaying;
    }
    /**
     * @return {boolean} State of started of tween
     * @example tween.isStarted() // returns `true` if tween in started
     * @memberof TWEEN.Tween
     */

  }, {
    key: "isStarted",
    value: function isStarted() {
      return this._onStartCallbackFired;
    }
    /**
     * Reverses the tween state/direction
     * @example tween.reverse()
     * @param {boolean=} state Set state of current reverse
     * @memberof TWEEN.Tween
     */

  }, {
    key: "reverse",
    value: function reverse(state) {
      var _reversed = this._reversed;
      this._reversed = state !== undefined ? state : !_reversed;
      return this;
    }
    /**
     * @return {boolean} State of reversed
     * @example tween.reversed() // returns `true` if tween in reversed state
     * @memberof TWEEN.Tween
     */

  }, {
    key: "reversed",
    value: function reversed() {
      return this._reversed;
    }
    /**
     * Pauses tween
     * @example tween.pause()
     * @memberof TWEEN.Tween
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this._isPlaying) {
        return this;
      }

      this._isPlaying = false;
      remove(this);
      this._pausedTime = now();
      return this.emit(EVENT_PAUSE, this.object);
    }
    /**
     * Play/Resume the tween
     * @example tween.play()
     * @memberof TWEEN.Tween
     */

  }, {
    key: "play",
    value: function play() {
      if (this._isPlaying) {
        return this;
      }

      this._isPlaying = true;
      this._startTime += now() - this._pausedTime;
      this._initTime = this._startTime;
      add(this);
      this._pausedTime = now();
      return this.emit(EVENT_PLAY, this.object);
    }
    /**
     * Restarts tween from initial value
     * @param {boolean=} noDelay If this param is set to `true`, restarts tween without `delay`
     * @example tween.restart()
     * @memberof TWEEN.Tween
     */

  }, {
    key: "restart",
    value: function restart(noDelay) {
      this._repeat = this._r;
      this.reassignValues();
      add(this);
      return this.emit(EVENT_RESTART, this.object);
    }
    /**
     * Seek tween value by `time`. Note: Not works as excepted. PR are welcome
     * @param {Time} time Tween update time
     * @param {boolean=} keepPlaying When this param is set to `false`, tween pausing after seek
     * @example tween.seek(500)
     * @memberof TWEEN.Tween
     * @deprecated Not works as excepted, so we deprecated this method
     */

  }, {
    key: "seek",
    value: function seek(time, keepPlaying) {
      var _duration = this._duration,
          _initTime = this._initTime,
          _startTime = this._startTime,
          _reversed = this._reversed;
      var updateTime = _initTime + time;
      this._isPlaying = true;

      if (updateTime < _startTime && _startTime >= _initTime) {
        this._startTime -= _duration;
        this._reversed = !_reversed;
      }

      this.update(time, false);
      this.emit(EVENT_SEEK, time, this.object);
      return keepPlaying ? this : this.pause();
    }
    /**
     * Sets tween duration
     * @param {number} amount Duration is milliseconds
     * @example tween.duration(2000)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "duration",
    value: function duration(amount) {
      this._duration = typeof amount === 'function' ? amount(this._duration) : amount;
      return this;
    }
    /**
     * Sets target value and duration
     * @param {object} properties Target value (to value)
     * @param {number|Object=} [duration=1000] Duration of tween
     * @example let tween = new Tween({x:0}).to({x:100}, 2000)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "to",
    value: function to(properties) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      this._valuesEnd = properties;

      if (typeof duration === 'number' || typeof duration === 'function') {
        this._duration = typeof duration === 'function' ? duration(this._duration) : duration;
      } else if (_typeof(duration) === 'object') {
        for (var prop in duration) {
          if (typeof this[prop] === 'function') {
            var _ref = Array.isArray(duration[prop]) ? duration[prop] : [duration[prop]],
                _ref2 = _slicedToArray(_ref, 4),
                _ref2$ = _ref2[0],
                arg1 = _ref2$ === void 0 ? null : _ref2$,
                _ref2$2 = _ref2[1],
                arg2 = _ref2$2 === void 0 ? null : _ref2$2,
                _ref2$3 = _ref2[2],
                arg3 = _ref2$3 === void 0 ? null : _ref2$3,
                _ref2$4 = _ref2[3],
                arg4 = _ref2$4 === void 0 ? null : _ref2$4;

            this[prop](arg1, arg2, arg3, arg4);
          }
        }
      }

      return this;
    }
    /**
     * Renders and computes value at first render
     * @private
     * @memberof TWEEN.Tween
     */

  }, {
    key: "render",
    value: function render() {
      if (this._rendered) {
        return this;
      }

      var _valuesStart = this._valuesStart,
          _valuesEnd = this._valuesEnd,
          object = this.object,
          node = this.node,
          InitialValues = this.InitialValues;
      SET_NESTED(object);
      SET_NESTED(_valuesEnd);

      if (node && node.queueID && Store[node.queueID]) {
        var prevTweenByNode = Store[node.queueID];

        if (prevTweenByNode.propNormaliseRequired && prevTweenByNode.tween !== this) {
          prevTweenByNode.normalisedProp = true;
          prevTweenByNode.propNormaliseRequired = false;
        }
      }

      if (node && InitialValues) {
        if (!object || Object.keys(object).length === 0) {
          object = this.object = NodeCache(node, InitialValues(node, _valuesEnd), this);
        } else if (!_valuesEnd || Object.keys(_valuesEnd).length === 0) {
          _valuesEnd = this._valuesEnd = InitialValues(node, object);
        }
      }

      for (var _property in _valuesEnd) {
        var start = object && object[_property] && deepCopy(object[_property]);
        var end = _valuesEnd[_property];

        if (Plugins[_property] && Plugins[_property].init) {
          Plugins[_property].init.call(this, start, end, _property, object);

          if (start === undefined && _valuesStart[_property]) {
            start = _valuesStart[_property];
          }

          if (Plugins[_property].skipProcess) {
            continue;
          }
        }

        if (typeof start === 'number' && isNaN(start) || start === null || end === null || start === false || end === false || start === undefined || end === undefined || start === end) {
          continue;
        }

        if (Array.isArray(end) && !Array.isArray(start)) {
          end.unshift(start);

          for (var i = 0, len = end.length; i < len; i++) {
            if (typeof end[i] === 'string') {
              var arrayOfStrings = decomposeString(end[i]);
              var stringObject = {
                length: arrayOfStrings.length,
                isString: true
              };

              for (var ii = 0, len2 = arrayOfStrings.length; ii < len2; ii++) {
                stringObject[ii] = arrayOfStrings[ii];
              }

              end[i] = stringObject;
            }
          }
        }

        _valuesStart[_property] = start;

        if (typeof start === 'number' && typeof end === 'string' && end[1] === '=') {
          continue;
        }

        decompose(_property, object, _valuesStart, _valuesEnd);
      }

      if (Tween.Renderer && this.node && Tween.Renderer.init) {
        Tween.Renderer.init.call(this, object, _valuesStart, _valuesEnd);
        this.__render = true;
      }

      return this;
    }
    /**
     * Start the tweening
     * @param {number|string} time setting manual time instead of Current browser timestamp or like `+1000` relative to current timestamp
     * @example tween.start()
     * @memberof TWEEN.Tween
     */

  }, {
    key: "start",
    value: function start(time) {
      this._startTime = time !== undefined ? typeof time === 'string' ? now() + parseFloat(time) : time : now();
      this._startTime += this._delayTime;
      this._initTime = this._prevTime = this._startTime;
      this._onStartCallbackFired = false;
      this._rendered = false;
      this._isPlaying = true;
      add(this);
      return this;
    }
    /**
     * Stops the tween
     * @example tween.stop()
     * @memberof TWEEN.Tween
     */

  }, {
    key: "stop",
    value: function stop() {
      var _isPlaying = this._isPlaying,
          _isFinite = this._isFinite,
          object = this.object,
          _startTime = this._startTime,
          _duration = this._duration,
          _r = this._r,
          _yoyo = this._yoyo,
          _reversed = this._reversed;

      if (!_isPlaying) {
        return this;
      }

      var atStart = _isFinite ? (_r + 1) % 2 === 1 : !_reversed;
      this._reversed = false;

      if (_yoyo && atStart) {
        this.update(_startTime);
      } else {
        this.update(_startTime + _duration);
      }

      remove(this);
      return this.emit(EVENT_STOP, object);
    }
    /**
     * Set delay of tween
     * @param {number} amount Sets tween delay / wait duration
     * @example tween.delay(500)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "delay",
    value: function delay(amount) {
      this._delayTime = typeof amount === 'function' ? amount(this._delayTime) : amount;
      return this;
    }
    /**
     * Chained tweens
     * @param {any} arguments Arguments list
     * @example tween.chainedTweens(tween1, tween2)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "chainedTweens",
    value: function chainedTweens() {
      this._chainedTweensCount = arguments.length;

      if (!this._chainedTweensCount) {
        return this;
      }

      for (var i = 0, len = this._chainedTweensCount; i < len; i++) {
        this[CHAINED_TWEENS + i] = arguments[i];
      }

      return this;
    }
    /**
     * Sets how times tween is repeating
     * @param {amount} amount the times of repeat
     * @example tween.repeat(5)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "repeat",
    value: function repeat(amount) {
      this._repeat = !this._duration ? 0 : typeof amount === 'function' ? amount(this._repeat) : amount;
      this._r = this._repeat;
      this._isFinite = isFinite(amount);
      return this;
    }
    /**
     * Set delay of each repeat alternate of tween
     * @param {number} amount Sets tween repeat alternate delay / repeat alternate wait duration
     * @example tween.reverseDelay(500)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "reverseDelay",
    value: function reverseDelay(amount) {
      this._reverseDelayTime = typeof amount === 'function' ? amount(this._reverseDelayTime) : amount;
      return this;
    }
    /**
     * Set `yoyo` state (enables reverse in repeat)
     * @param {boolean} state Enables alternate direction for repeat
     * @param {Function=} _easingReverse Easing function in reverse direction
     * @example tween.yoyo(true)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "yoyo",
    value: function yoyo(state, _easingReverse) {
      this._yoyo = typeof state === 'function' ? state(this._yoyo) : state === null ? this._yoyo : state;

      if (!state) {
        this._reversed = false;
      }

      this._easingReverse = _easingReverse || null;
      return this;
    }
    /**
     * Set easing
     * @param {Function} _easingFunction Easing function, applies in non-reverse direction if Tween#yoyo second argument is applied
     * @example tween.easing(Easing.Elastic.InOut)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "easing",
    value: function easing(_easingFunction) {
      this._easingFunction = _easingFunction;
      return this;
    }
    /**
     * Set interpolation
     * @param {Function} _interpolationFunction Interpolation function
     * @example tween.interpolation(Interpolation.Bezier)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "interpolation",
    value: function interpolation(_interpolationFunction) {
      if (typeof _interpolationFunction === 'function') {
        this._interpolationFunction = _interpolationFunction;
      }

      return this;
    }
    /**
     * Reassigns value for rare-case like Tween#restart or for Timeline
     * @private
     * @memberof TWEEN.Tween
     */

  }, {
    key: "reassignValues",
    value: function reassignValues(time) {
      var _valuesStart = this._valuesStart,
          object = this.object,
          _delayTime = this._delayTime;
      this._isPlaying = true;
      this._startTime = time !== undefined ? time : now();
      this._startTime += _delayTime;
      this._reversed = false;
      add(this);

      for (var property in _valuesStart) {
        var start = _valuesStart[property];
        object[property] = start;
      }

      return this;
    }
    /**
     * Updates initial object to target value by given `time`
     * @param {Time} time Current time
     * @param {boolean=} preserve Prevents from removing tween from store
     * @param {boolean=} forceTime Forces to be frame rendered, even mismatching time
     * @example tween.update(100)
     * @memberof TWEEN.Tween
     */

  }, {
    key: "update",
    value: function update$$1(time, preserve, forceTime) {
      var _onStartCallbackFired = this._onStartCallbackFired,
          _easingFunction = this._easingFunction,
          _interpolationFunction = this._interpolationFunction,
          _easingReverse = this._easingReverse,
          _repeat = this._repeat,
          _delayTime = this._delayTime,
          _reverseDelayTime = this._reverseDelayTime,
          _yoyo = this._yoyo,
          _reversed = this._reversed,
          _startTime = this._startTime,
          _prevTime = this._prevTime,
          _duration = this._duration,
          _valuesStart = this._valuesStart,
          _valuesEnd = this._valuesEnd,
          object = this.object,
          _isFinite = this._isFinite,
          _isPlaying = this._isPlaying,
          __render = this.__render,
          _chainedTweensCount = this._chainedTweensCount;
      var elapsed;
      var currentEasing;
      var property;
      var propCount = 0;

      if (!_duration) {
        elapsed = 1;
        _repeat = 0;
      } else {
        time = time !== undefined ? time : now();
        var delta = time - _prevTime;
        this._prevTime = time;

        if (delta > TOO_LONG_FRAME_MS) {
          time -= delta - FRAME_MS;
        }

        if (!_isPlaying || time < _startTime && !forceTime) {
          return true;
        }

        elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = _reversed ? 1 - elapsed : elapsed;
      }

      if (!_onStartCallbackFired) {
        if (!this._rendered) {
          this.render();
          this._rendered = true;
        }

        this.emit(EVENT_START, object);
        this._onStartCallbackFired = true;
      }

      currentEasing = _reversed ? _easingReverse || _easingFunction : _easingFunction;

      if (!object) {
        return true;
      }

      for (property in _valuesEnd) {
        var start = _valuesStart[property];

        if ((start === undefined || start === null) && !(Plugins[property] && Plugins[property].update)) {
          continue;
        }

        var end = _valuesEnd[property];
        var value = currentEasing[property] ? currentEasing[property](elapsed) : typeof currentEasing === 'function' ? currentEasing(elapsed) : defaultEasing(elapsed);

        var _interpolationFunctionCall = _interpolationFunction[property] ? _interpolationFunction[property] : typeof _interpolationFunction === 'function' ? _interpolationFunction : Interpolation.Linear;

        if (typeof end === 'number') {
          object[property] = ((start + (end - start) * value) * DECIMAL | 0) / DECIMAL;
        } else if (Array.isArray(end) && !Array.isArray(start)) {
          object[property] = _interpolationFunctionCall(end, value, object[property]);
        } else if (end && end.update) {
          end.update(value);
        } else if (typeof end === 'function') {
          object[property] = end(value);
        } else if (typeof end === 'string' && typeof start === 'number') {
          object[property] = start + parseFloat(end[0] + end.substr(2)) * value;
        } else {
          recompose(property, object, _valuesStart, _valuesEnd, value, elapsed);
        }

        if (Plugins[property] && Plugins[property].update) {
          Plugins[property].update.call(this, object[property], start, end, value, elapsed, property);
        }

        propCount++;
      }

      if (!propCount) {
        remove(this);
        return false;
      }

      if (__render && Tween.Renderer && Tween.Renderer.update) {
        Tween.Renderer.update.call(this, object, elapsed);
      }

      this.emit(EVENT_UPDATE, object, elapsed, time);

      if (elapsed === 1 || _reversed && elapsed === 0) {
        if (_repeat > 0 && _duration > 0) {
          if (_isFinite) {
            this._repeat--;
          }

          if (_yoyo) {
            this._reversed = !_reversed;
          } else {
            for (property in _valuesEnd) {
              var _end = _valuesEnd[property];

              if (typeof _end === 'string' && typeof _valuesStart[property] === 'number') {
                _valuesStart[property] += parseFloat(_end[0] + _end.substr(2));
              }
            }
          }

          this.emit(_yoyo && !_reversed ? EVENT_REVERSE : EVENT_REPEAT, object);

          if (_reversed && _reverseDelayTime) {
            this._startTime = time - _reverseDelayTime;
          } else {
            this._startTime = time + _delayTime;
          }

          return true;
        } else {
          if (!preserve) {
            this._isPlaying = false;
            remove(this);
            _id--;
          }

          this.emit(EVENT_COMPLETE, object);
          this._repeat = this._r;

          if (_chainedTweensCount) {
            for (var i = 0; i < _chainedTweensCount; i++) {
              this[CHAINED_TWEENS + i].start(time + _duration);
            }
          }

          return false;
        }
      }

      return true;
    }
  }]);

  return Tween;
}();

/**
 * Tween helper for plugins
 * @namespace TWEEN.Interpolator
 * @memberof TWEEN
 * @param {any} a - Initial position
 * @param {any} b - End position
 * @return {Function} Returns function that accepts number between `0-1`
 */

var Interpolator = function Interpolator(a, b) {
  var isArray = Array.isArray(a);
  var origin = typeof a === 'string' ? a : isArray ? a.slice() : _objectSpread({}, a);

  if (isArray) {
    for (var i = 0, len = a.length; i < len; i++) {
      decompose(i, origin, a, b);
    }
  } else if (_typeof(a) === 'object') {
    for (var _i in a) {
      decompose(_i, origin, a, b);
    }
  } else if (typeof a === 'string') {
    a = decomposeString(a);
    b = decomposeString(b);
    var _i2 = 1;

    while (_i2 < a.length) {
      if (a[_i2] === b[_i2] && typeof a[_i2 - 1] === 'string') {
        a.splice(_i2 - 1, 2, a[_i2 - 1] + a[_i2]);
        b.splice(_i2 - 1, 2, b[_i2 - 1] + b[_i2]);
      } else {
        _i2++;
      }
    }

    var c = {
      isString: true,
      length: a.length
    };
    while (_i2 < c.length) {
      c[_i2] = a[_i2];
      _i2++;
    }
  }

  return function (t) {
    if (isArray) {
      for (var _i3 = 0, _len = a.length; _i3 < _len; _i3++) {
        recompose(_i3, origin, a, b, t);
      }
    } else if (_typeof(origin) === 'object') {
      for (var _i4 in a) {
        recompose(_i4, origin, a, b, t);
      }
    } else if (typeof origin === 'string') {
      origin = recompose(0, 0, a, b, t, t, true);
    }

    return origin;
  };
};

exports.Plugins = Plugins;
exports.Selector = Selector;
exports.Interpolator = Interpolator;
exports.onTick = onTick;
exports.has = has;
exports.get = get;
exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now;
exports.update = update;
exports.autoPlay = autoPlay;
exports.isRunning = isRunning;
exports.Tween = Tween;
exports.Easing = Easing;
exports.Interpolation = Interpolation;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
