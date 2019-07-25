(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spritejs"] = factory();
	else
		root["spritejs"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = exports.Easings = exports.Effects = exports.Resource = exports.Color = exports.createElement = exports.createNode = exports.registerNodeType = exports.Paper2D = exports.Scene = exports.Layer = exports.Group = exports.Path = exports.Label = exports.Sprite = exports.BaseSprite = exports.BaseNode = exports.utils = exports.math = exports.version = exports._debugger = undefined;

var _spriteCore = __webpack_require__(1);

var _basesprite = __webpack_require__(222);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _sprite = __webpack_require__(230);

var _sprite2 = _interopRequireDefault(_sprite);

var _layer = __webpack_require__(257);

var _layer2 = _interopRequireDefault(_layer);

var _scene = __webpack_require__(258);

var _scene2 = _interopRequireDefault(_scene);

var _resource = __webpack_require__(223);

var _resource2 = _interopRequireDefault(_resource);

var _platform = __webpack_require__(228);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDeprecation = _spriteCore.utils.setDeprecation;


if (_platform.shim) {
  (0, _platform.shim)();
}

(0, _spriteCore.registerNodeType)('layer', _layer2.default, true);

function Paper2D() {
  setDeprecation('spritejs.Paper2D', 'Instead use new spritejs.Scene.');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_scene2.default, [null].concat(args)))();
}

var version = '2.7.9';

exports._debugger = _platform._debugger;
exports.version = version;
exports.math = _spriteCore.math;
exports.utils = _spriteCore.utils;
exports.BaseNode = _spriteCore.BaseNode;
exports.BaseSprite = _basesprite2.default;
exports.Sprite = _sprite2.default;
exports.Label = _spriteCore.Label;
exports.Path = _spriteCore.Path;
exports.Group = _spriteCore.Group;
exports.Layer = _layer2.default;
exports.Scene = _scene2.default;
exports.Paper2D = Paper2D;
exports.registerNodeType = _spriteCore.registerNodeType;
exports.createNode = _spriteCore.createNode;
exports.createElement = _spriteCore.createElement;
exports.Color = _spriteCore.Color;
exports.Resource = _resource2.default;
exports.Effects = _spriteCore.Effects;
exports.Easings = _spriteCore.Easings;
exports.Timeline = _spriteCore.Timeline;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgPath = exports.Color = exports.createElement = exports.createNode = exports.registerNodeType = exports.Timeline = exports.Easings = exports.Effects = exports.Group = exports.Layer = exports.Path = exports.Label = exports.Sprite = exports.Batch = exports.BaseSprite = exports.BaseNode = exports.math = exports.utils = undefined;

var _spriteAnimator = __webpack_require__(2);

var _svgPathToCanvas = __webpack_require__(141);

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _spriteUtils = __webpack_require__(152);

var utils = _interopRequireWildcard(_spriteUtils);

var _spriteMath = __webpack_require__(143);

var math = _interopRequireWildcard(_spriteMath);

var _basesprite = __webpack_require__(168);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _sprite = __webpack_require__(203);

var _sprite2 = _interopRequireDefault(_sprite);

var _label = __webpack_require__(204);

var _label2 = _interopRequireDefault(_label);

var _layer = __webpack_require__(212);

var _layer2 = _interopRequireDefault(_layer);

var _group = __webpack_require__(214);

var _group2 = _interopRequireDefault(_group);

var _basenode = __webpack_require__(196);

var _basenode2 = _interopRequireDefault(_basenode);

var _path = __webpack_require__(221);

var _path2 = _interopRequireDefault(_path);

var _batch = __webpack_require__(213);

var _batch2 = _interopRequireDefault(_batch);

var _nodetype = __webpack_require__(200);

var _render = __webpack_require__(201);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

utils.findColor = _render.findColor;
utils.cacheContextPool = _render.cacheContextPool;

var Color = utils.Color;

exports.utils = utils;
exports.math = math;
exports.BaseNode = _basenode2.default;
exports.BaseSprite = _basesprite2.default;
exports.Batch = _batch2.default;
exports.Sprite = _sprite2.default;
exports.Label = _label2.default;
exports.Path = _path2.default;
exports.Layer = _layer2.default;
exports.Group = _group2.default;
exports.Effects = _spriteAnimator.Effects;
exports.Easings = _spriteAnimator.Easings;
exports.Timeline = _spriteAnimator.Timeline;
exports.registerNodeType = _nodetype.registerNodeType;
exports.createNode = _nodetype.createNode;
exports.createElement = _nodetype.createElement;
exports.Color = Color;
exports.SvgPath = _svgPathToCanvas2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = exports.Effects = exports.Easings = exports.Animator = undefined;

var _spriteTimeline = __webpack_require__(3);

var _spriteTimeline2 = _interopRequireDefault(_spriteTimeline);

var _effect = __webpack_require__(116);

var _effect2 = _interopRequireDefault(_effect);

var _easing = __webpack_require__(117);

var _animator = __webpack_require__(119);

var _animator2 = _interopRequireDefault(_animator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Animator = _animator2.default;
exports.Easings = _easing.Easings;
exports.Effects = _effect2.default;
exports.Timeline = _spriteTimeline2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _utils = __webpack_require__(114);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  originTime: 0,
  playbackRate: 1.0
};

var _timeMark = (0, _symbol2.default)('timeMark'),
    _playbackRate = (0, _symbol2.default)('playbackRate'),
    _timers = (0, _symbol2.default)('timers'),
    _originTime = (0, _symbol2.default)('originTime'),
    _setTimer = (0, _symbol2.default)('setTimer'),
    _parent = (0, _symbol2.default)('parent'),
    _createTime = (0, _symbol2.default)('createTime');

var Timeline = function () {
  function Timeline(options, parent) {
    (0, _classCallCheck3.default)(this, Timeline);

    if (options instanceof Timeline) {
      parent = options;
      options = {};
    }

    options = (0, _assign2.default)({}, defaultOptions, options);

    if (parent) {
      this[_parent] = parent;
    }

    // timeMark records the reference points on timeline
    // Each time we change the playbackRate or currentTime or entropy
    // A new timeMark will be generated
    // timeMark sorted by entropy
    // If you reset entropy, all the timeMarks behind the new entropy
    // should be dropped
    this[_timeMark] = [{
      globalTime: this.globalTime,
      localTime: -options.originTime,
      entropy: -options.originTime,
      playbackRate: options.playbackRate,
      globalEntropy: 0
    }];

    this[_createTime] = (0, _utils.nowtime)();

    if (this[_parent]) {
      this[_timeMark][0].globalEntropy = this[_parent].entropy;
    }

    this[_originTime] = options.originTime;
    this[_playbackRate] = options.playbackRate;
    this[_timers] = new _map2.default();
  }

  (0, _createClass3.default)(Timeline, [{
    key: 'markTime',
    value: function markTime() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$time = _ref.time,
          time = _ref$time === undefined ? this.currentTime : _ref$time,
          _ref$entropy = _ref.entropy,
          entropy = _ref$entropy === undefined ? this.entropy : _ref$entropy,
          _ref$playbackRate = _ref.playbackRate,
          playbackRate = _ref$playbackRate === undefined ? this.playbackRate : _ref$playbackRate;

      var timeMark = {
        globalTime: this.globalTime,
        localTime: time,
        entropy: entropy,
        playbackRate: playbackRate,
        globalEntropy: this.globalEntropy
      };
      this[_timeMark].push(timeMark);
    }
  }, {
    key: 'fork',
    value: function fork(options) {
      return new Timeline(options, this);
    }
  }, {
    key: 'seekGlobalTime',
    value: function seekGlobalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate,
          globalTime = timeMark.globalTime;


      return globalTime + (seekEntropy - entropy) / Math.abs(playbackRate);
    }
  }, {
    key: 'seekLocalTime',
    value: function seekLocalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var localTime = timeMark.localTime,
          entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate;


      if (playbackRate > 0) {
        return localTime + (seekEntropy - entropy);
      }
      return localTime - (seekEntropy - entropy);
    }
  }, {
    key: 'seekTimeMark',
    value: function seekTimeMark(entropy) {
      var timeMark = this[_timeMark];

      var l = 0,
          r = timeMark.length - 1;

      if (entropy <= timeMark[l].entropy) {
        return l;
      }
      if (entropy >= timeMark[r].entropy) {
        return r;
      }

      var m = Math.floor((l + r) / 2); // binary search

      while (m > l && m < r) {
        if (entropy === timeMark[m].entropy) {
          return m;
        }if (entropy < timeMark[m].entropy) {
          r = m;
        } else if (entropy > timeMark[m].entropy) {
          l = m;
        }
        m = Math.floor((l + r) / 2);
      }

      return l;
    }
  }, {
    key: 'updateTimers',
    value: function updateTimers() {
      var _this = this;

      var timers = [].concat((0, _toConsumableArray3.default)(this[_timers]));
      timers.forEach(function (_ref2) {
        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
            id = _ref3[0],
            timer = _ref3[1];

        _this[_setTimer](timer.handler, timer.time, id);
      });
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout(_x) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (id) {
      var timer = this[_timers].get(id);

      if (timer && timer.timerID != null) {
        if (this[_parent]) {
          this[_parent].clearTimeout(timer.timerID);
        } else {
          clearTimeout(timer.timerID);
        }
      }
      this[_timers].delete(id);
    })
  }, {
    key: 'clearInterval',
    value: function clearInterval(id) {
      return this.clearTimeout(id);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      // clear all running timers
      var timers = this[_timers];[].concat((0, _toConsumableArray3.default)(timers.keys())).forEach(function (id) {
        _this2.clearTimeout(id);
      });
    }

    /*
      setTimeout(func, {delay: 100, isEntropy: true})
      setTimeout(func, {entropy: 100})
      setTimeout(func, 100})
     */

  }, {
    key: 'setTimeout',
    value: function setTimeout(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { delay: 0 };

      return this[_setTimer](handler, time);
    }
  }, {
    key: 'setInterval',
    value: function setInterval(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { delay: 0 };

      var that = this;
      var id = this[_setTimer](function step() {
        // reset timer before handler cause we may clearTimeout in handler()
        that[_setTimer](step, time, id);
        handler();
      }, time);

      return id;
    }
  }, {
    key: _setTimer,
    value: function value(handler, time) {
      var _this3 = this;

      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _symbol2.default)('timerID');

      time = (0, _utils.formatDelay)(time);

      var timer = this[_timers].get(id);
      var delay = void 0,
          timerID = null,
          startTime = void 0,
          startEntropy = void 0;

      if (timer) {
        this.clearTimeout(id);
        if (time.isEntropy) {
          delay = (time.delay - (this.entropy - timer.startEntropy)) / Math.abs(this.playbackRate);
        } else {
          delay = (time.delay - (this.currentTime - timer.startTime)) / this.playbackRate;
        }
        startTime = timer.startTime;
        startEntropy = timer.startEntropy;
      } else {
        delay = time.delay / (time.isEntropy ? Math.abs(this.playbackRate) : this.playbackRate);
        startTime = this.currentTime;
        startEntropy = this.entropy;
      }

      var parent = this[_parent],
          globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout;

      var heading = time.heading;
      // console.log(heading, parent, delay)
      if (!parent && heading === false && delay < 0) {
        delay = Infinity;
      }

      // if playbackRate is zero, delay will be infinity.
      // For wxapp bugs, cannot use Number.isFinite yet.
      if (isFinite(delay) || parent) {
        // eslint-disable-line no-restricted-globals
        delay = Math.ceil(delay);
        if (globalTimeout !== setTimeout) {
          delay = { delay: delay, heading: heading };
        }
        timerID = globalTimeout(function () {
          _this3[_timers].delete(id);
          handler();
        }, delay);
      }

      this[_timers].set(id, {
        timerID: timerID,
        handler: handler,
        time: time,
        startTime: startTime,
        startEntropy: startEntropy
      });

      return id;
    }
  }, {
    key: 'parent',
    get: function get() {
      return this[_parent];
    }
  }, {
    key: 'lastTimeMark',
    get: function get() {
      return this[_timeMark][this[_timeMark].length - 1];
    }
  }, {
    key: 'currentTime',
    get: function get() {
      var _lastTimeMark = this.lastTimeMark,
          localTime = _lastTimeMark.localTime,
          globalTime = _lastTimeMark.globalTime;

      return localTime + (this.globalTime - globalTime) * this.playbackRate;
    },
    set: function set(time) {
      var _this4 = this;

      var from = this.currentTime,
          to = time,
          timers = this[_timers];

      this.markTime({ time: time });[].concat((0, _toConsumableArray3.default)(timers)).forEach(function (_ref4) {
        var _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
            id = _ref5[0],
            timer = _ref5[1];

        var _timer$time = timer.time,
            isEntropy = _timer$time.isEntropy,
            delay = _timer$time.delay,
            heading = _timer$time.heading,
            handler = timer.handler,
            startTime = timer.startTime;


        if (!isEntropy) {
          var endTime = startTime + delay;
          if (delay === 0 || heading !== false && (to - from) * delay < 0 || from < endTime && endTime < to || from > endTime && endTime > to) {
            handler();
            _this4.clearTimeout(id);
          }
        } else if (delay === 0) {
          handler();
          _this4.clearTimeout(id);
        }
      });
      this.updateTimers();
    }

    // Both currentTime and entropy should be influenced by playbackRate.
    // If current playbackRate is negative, the currentTime should go backwards
    // while the entropy remain to go forwards.
    // Both of the initial values is set to -originTime

  }, {
    key: 'entropy',
    get: function get() {
      var _lastTimeMark2 = this.lastTimeMark,
          entropy = _lastTimeMark2.entropy,
          globalEntropy = _lastTimeMark2.globalEntropy;

      return entropy + Math.abs((this.globalEntropy - globalEntropy) * this.playbackRate);
    },


    // change entropy will NOT cause currentTime changing but may influence the pass
    // and the future of the timeline. (It may change the result of seek***Time)
    // While entropy is set, all the marks behind will be droped
    set: function set(entropy) {
      if (this.entropy > entropy) {
        var idx = this.seekTimeMark(entropy);
        this[_timeMark].length = idx + 1;
      }
      this.markTime({ entropy: entropy });
      this.updateTimers();
    }
  }, {
    key: 'globalEntropy',
    get: function get() {
      return this[_parent] ? this[_parent].entropy : (0, _utils.nowtime)() - this[_createTime];
    }
  }, {
    key: 'globalTime',
    get: function get() {
      if (this[_parent]) {
        return this[_parent].currentTime;
      }

      return (0, _utils.nowtime)();
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_playbackRate];
    },
    set: function set(rate) {
      if (rate !== this.playbackRate) {
        this.markTime({ playbackRate: rate });
        this[_playbackRate] = rate;
        this.updateTimers();
      }
    }
  }, {
    key: 'paused',
    get: function get() {
      if (this.playbackRate === 0) return true;
      var parent = this.parent;
      while (parent) {
        if (parent.playbackRate === 0) return true;
        parent = parent.parent;
      }
      return false;
    }
  }]);
  return Timeline;
}();

exports.default = Timeline;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(5);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(57);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
__webpack_require__(53);
module.exports = __webpack_require__(55);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
var global = __webpack_require__(19);
var hide = __webpack_require__(23);
var Iterators = __webpack_require__(11);
var TO_STRING_TAG = __webpack_require__(50)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(9);
var step = __webpack_require__(10);
var Iterators = __webpack_require__(11);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(16)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(13);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(14);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(18);
var redefine = __webpack_require__(33);
var hide = __webpack_require__(23);
var has = __webpack_require__(34);
var Iterators = __webpack_require__(11);
var $iterCreate = __webpack_require__(35);
var setToStringTag = __webpack_require__(49);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(50)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);
var core = __webpack_require__(20);
var ctx = __webpack_require__(21);
var hide = __webpack_require__(23);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(22);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(24);
var createDesc = __webpack_require__(32);
module.exports = __webpack_require__(28) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(25);
var IE8_DOM_DEFINE = __webpack_require__(27);
var toPrimitive = __webpack_require__(31);
var dP = Object.defineProperty;

exports.f = __webpack_require__(28) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(28) && !__webpack_require__(29)(function () {
  return Object.defineProperty(__webpack_require__(30)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(29)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
var document = __webpack_require__(19).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(26);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(32);
var setToStringTag = __webpack_require__(49);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(23)(IteratorPrototype, __webpack_require__(50)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(25);
var dPs = __webpack_require__(37);
var enumBugKeys = __webpack_require__(47);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(30)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(24);
var anObject = __webpack_require__(25);
var getKeys = __webpack_require__(38);

module.exports = __webpack_require__(28) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(39);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(34);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(40)(false);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(41);
var toAbsoluteIndex = __webpack_require__(43);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(42);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(46);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(19).document;
module.exports = document && document.documentElement;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(24).f;
var has = __webpack_require__(34);
var TAG = __webpack_require__(50)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(46);
var Symbol = __webpack_require__(19).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(34);
var toObject = __webpack_require__(52);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(54)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(16)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);
var defined = __webpack_require__(15);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(56);
var ITERATOR = __webpack_require__(50)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(20).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(14);
var TAG = __webpack_require__(50)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
__webpack_require__(53);
module.exports = __webpack_require__(59);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(25);
var get = __webpack_require__(60);
module.exports = __webpack_require__(20).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(56);
var ITERATOR = __webpack_require__(50)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(20).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(62);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(64);
module.exports = __webpack_require__(20).Array.from;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(21);
var $export = __webpack_require__(18);
var toObject = __webpack_require__(52);
var call = __webpack_require__(65);
var isArrayIter = __webpack_require__(66);
var toLength = __webpack_require__(41);
var createProperty = __webpack_require__(67);
var getIterFn = __webpack_require__(60);

$export($export.S + $export.F * !__webpack_require__(68)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(25);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(11);
var ITERATOR = __webpack_require__(50)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(24);
var createDesc = __webpack_require__(32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(50)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
__webpack_require__(53);
__webpack_require__(7);
__webpack_require__(72);
__webpack_require__(85);
__webpack_require__(88);
__webpack_require__(90);
module.exports = __webpack_require__(20).Map;


/***/ }),
/* 71 */
/***/ (function(module, exports) {



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(73);
var validate = __webpack_require__(79);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(80)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(24).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(74);
var ctx = __webpack_require__(21);
var anInstance = __webpack_require__(75);
var forOf = __webpack_require__(76);
var $iterDefine = __webpack_require__(16);
var step = __webpack_require__(10);
var setSpecies = __webpack_require__(77);
var DESCRIPTORS = __webpack_require__(28);
var fastKey = __webpack_require__(78).fastKey;
var validate = __webpack_require__(79);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(23);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(21);
var call = __webpack_require__(65);
var isArrayIter = __webpack_require__(66);
var anObject = __webpack_require__(25);
var toLength = __webpack_require__(41);
var getIterFn = __webpack_require__(60);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(19);
var core = __webpack_require__(20);
var dP = __webpack_require__(24);
var DESCRIPTORS = __webpack_require__(28);
var SPECIES = __webpack_require__(50)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(46)('meta');
var isObject = __webpack_require__(26);
var has = __webpack_require__(34);
var setDesc = __webpack_require__(24).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(29)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(19);
var $export = __webpack_require__(18);
var meta = __webpack_require__(78);
var fails = __webpack_require__(29);
var hide = __webpack_require__(23);
var redefineAll = __webpack_require__(74);
var forOf = __webpack_require__(76);
var anInstance = __webpack_require__(75);
var isObject = __webpack_require__(26);
var setToStringTag = __webpack_require__(49);
var dP = __webpack_require__(24).f;
var each = __webpack_require__(81)(0);
var DESCRIPTORS = __webpack_require__(28);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(21);
var IObject = __webpack_require__(13);
var toObject = __webpack_require__(52);
var toLength = __webpack_require__(41);
var asc = __webpack_require__(82);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(83);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(26);
var isArray = __webpack_require__(84);
var SPECIES = __webpack_require__(50)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(14);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(18);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(86)('Map') });


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(56);
var from = __webpack_require__(87);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(76);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(89)('Map');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(18);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(91)('Map');


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(18);
var aFunction = __webpack_require__(22);
var ctx = __webpack_require__(21);
var forOf = __webpack_require__(76);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
module.exports = __webpack_require__(20).Object.assign;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(18);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(95) });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(38);
var gOPS = __webpack_require__(96);
var pIE = __webpack_require__(97);
var toObject = __webpack_require__(52);
var IObject = __webpack_require__(13);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(29)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 96 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(100);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
var $Object = __webpack_require__(20).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(28), 'Object', { defineProperty: __webpack_require__(24).f });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
__webpack_require__(71);
__webpack_require__(112);
__webpack_require__(113);
module.exports = __webpack_require__(20).Symbol;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(19);
var has = __webpack_require__(34);
var DESCRIPTORS = __webpack_require__(28);
var $export = __webpack_require__(18);
var redefine = __webpack_require__(33);
var META = __webpack_require__(78).KEY;
var $fails = __webpack_require__(29);
var shared = __webpack_require__(45);
var setToStringTag = __webpack_require__(49);
var uid = __webpack_require__(46);
var wks = __webpack_require__(50);
var wksExt = __webpack_require__(106);
var wksDefine = __webpack_require__(107);
var enumKeys = __webpack_require__(108);
var isArray = __webpack_require__(84);
var anObject = __webpack_require__(25);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(31);
var createDesc = __webpack_require__(32);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(109);
var $GOPD = __webpack_require__(111);
var $DP = __webpack_require__(24);
var $keys = __webpack_require__(38);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(110).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(97).f = $propertyIsEnumerable;
  __webpack_require__(96).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(23)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(50);


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);
var core = __webpack_require__(20);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(106);
var defineProperty = __webpack_require__(24).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(38);
var gOPS = __webpack_require__(96);
var pIE = __webpack_require__(97);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(110).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(39);
var hiddenKeys = __webpack_require__(47).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(97);
var createDesc = __webpack_require__(32);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(31);
var has = __webpack_require__(34);
var IE8_DOM_DEFINE = __webpack_require__(27);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(28) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107)('asyncIterator');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107)('observable');


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.nowtime = nowtime;
exports.formatDelay = formatDelay;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nowtime() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }if (typeof process !== 'undefined' && process.hrtime) {
    var _process$hrtime = process.hrtime(),
        _process$hrtime2 = (0, _slicedToArray3.default)(_process$hrtime, 2),
        s = _process$hrtime2[0],
        ns = _process$hrtime2[1];

    return s * 1e3 + ns * 1e-6;
  }
  return Date.now ? Date.now() : new Date().getTime();
}

/*
  delay = 100 -> delay = {delay: 100}
  delay = {entropy: 100} -> delay = {delay: 100, isEntropy: true}
 */
function formatDelay(delay) {
  if (typeof delay === 'number') {
    delay = { delay: delay };
  } else if ('entropy' in delay) {
    delay = { delay: delay.entropy, isEntropy: true };
  }
  return delay;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(115)))

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // s - startFrame, e - endFrame
  default: function _default(from, to, p, s, e) {
    if (typeof from === 'number' && typeof to === 'number') {
      return from + (p - s) / (e - s) * (to - from);
    }

    if (p - s > e - p) {
      return to;
    }
    return from;
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEasing = exports.Easings = undefined;

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BezierEasing = __webpack_require__(118);
var bezierFuncCache = new _map2.default();

function getBezierEasing() {
  for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
    value[_key] = arguments[_key];
  }

  var easing = bezierFuncCache.get(value);
  if (easing) {
    return easing;
  }
  easing = BezierEasing.apply(undefined, value);
  bezierFuncCache.set(value, easing);
  return easing;
}

function getStepsEasing(step) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

  return function (p, frames) {
    for (var i = 1; i < frames.length; i++) {
      var offset = frames[i].offset;

      if (p <= offset) {
        var start = frames[i - 1].offset,
            end = offset;
        var fp = (p - start) / (end - start),
            d = 1 / step;

        var t = fp / d;
        if (pos === 'end') {
          t = Math.floor(t);
        } else {
          t = Math.ceil(t);
        }

        return d * t * (end - start) + start;
      }
    }
    return 0;
  };
}

function parseEasingStr(easingStr) {
  var pattern = /^cubic-bezier\((.*)\)/,
      matched = easingStr.match(pattern);

  if (matched) {
    var value = matched[1].trim();
    value = value.split(',').map(function (v) {
      return parseFloat(v.trim());
    });
    return getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(value));
  }

  pattern = /^steps\((.*)\)/;
  matched = easingStr.match(pattern);

  if (matched) {
    var _value = matched[1].trim();
    _value = _value.split(',').map(function (v) {
      return v.trim();
    });

    var _value2 = _value,
        _value3 = (0, _slicedToArray3.default)(_value2, 2),
        step = _value3[0],
        pos = _value3[1];

    return getStepsEasing(parseInt(step, 10), pos);
  }
  return easingStr;
}

var Easings = {
  linear: function linear(p) {
    return p;
  },

  ease: getBezierEasing(0.25, 0.1, 0.25, 1),
  'ease-in': getBezierEasing(0.42, 0, 1, 1),
  'ease-out': getBezierEasing(0, 0, 0.58, 1),
  'ease-in-out': getBezierEasing(0.42, 0, 0.58, 1),
  // 'step-start': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     ret = offset
  //     if(p < offset){
  //       break
  //     }
  //   }
  //   return ret
  // },
  // 'step-end': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     if(p < offset){
  //       break
  //     }
  //     ret = offset
  //   }
  //   return ret
  // }
  'step-start': getStepsEasing(1, 'start'),
  'step-end': getStepsEasing(1, 'end')
};

function parseEasing(easing) {
  if (typeof easing === 'string') {
    if (!Easings[easing]) {
      easing = parseEasingStr(easing);
    } else {
      // load default Easing
      easing = Easings[easing];
    }
  } else if (easing.type === 'cubic-bezier') {
    easing = getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(easing.value));
  } else if (easing.type === 'steps') {
    easing = getStepsEasing(easing.step, easing.pos);
  }
  return easing;
}

exports.Easings = Easings;
exports.parseEasing = parseEasing;

/***/ }),
/* 118 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _keys = __webpack_require__(132);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteTimeline = __webpack_require__(3);

var _spriteTimeline2 = _interopRequireDefault(_spriteTimeline);

var _utils = __webpack_require__(136);

var _easing = __webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _timing = (0, _symbol2.default)('timing'),
    _keyframes = (0, _symbol2.default)('keyframes'),
    _initState = (0, _symbol2.default)('initState'),
    _readyDefer = (0, _symbol2.default)('readyDefer'),
    _finishedDefer = (0, _symbol2.default)('finishedDefer'),
    _effects = (0, _symbol2.default)('effects'),
    _activeReadyTimer = (0, _symbol2.default)('activeReadyTimer'),
    _activeFinishTimer = (0, _symbol2.default)('activeFinishTimer'),
    _removeDefer = (0, _symbol2.default)('removeDefer');

/**
  easing: {
    type: 'cubic-bezier',
    value: [...]
  }
  easing: {
    type: 'steps',
    step: 1,
    pos: 'end'
  }
 */
var defaultTiming = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterations: 1.0,
  playbackRate: 1.0,
  direction: 'normal',
  easing: 'linear',
  effect: null
};

/**
  animation: play --> delay --> effect --> endDelay
  playState: idle --> pending --> running --> pending --> finished
 */

var _default = function () {
  function _default(initState, keyframes, timing) {
    var _this = this;

    (0, _classCallCheck3.default)(this, _default);

    if (Array.isArray(initState)) {
      var _ref = [initState[0], initState, keyframes];
      // 如果 initState 缺省，默认 keyframes 的第一帧为 initState

      initState = _ref[0];
      keyframes = _ref[1];
      timing = _ref[2];
    }

    if (typeof timing === 'number') {
      timing = { duration: timing };
    }

    this[_timing] = (0, _assign2.default)({}, defaultTiming, timing);
    this[_timing].easing = (0, _easing.parseEasing)(this[_timing].easing);
    this[_keyframes] = (0, _utils.calculateFramesOffset)(keyframes);

    var lastFrame = this[_keyframes][this[_keyframes].length - 1];

    this[_initState] = {}; // 初始状态

    (0, _keys2.default)(lastFrame).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(initState, key)) {
        if (key !== 'easing' && key !== 'offset') {
          _this[_initState][key] = initState[key];
        }
      }
    });

    // 补齐参数
    this[_keyframes] = this[_keyframes].map(function (frame) {
      return (0, _assign2.default)({}, _this[_initState], frame);
    });

    if (this[_keyframes][0].offset !== 0) {
      // 要补第一帧
      this[_keyframes].unshift((0, _assign2.default)({}, this[_initState], { offset: 0 }));
    }
    if (lastFrame.offset < 1) {
      // 要补最后一帧
      this[_keyframes].push((0, _assign2.default)({}, lastFrame, { offset: 1 }));
    }

    this[_effects] = {};
    this.timeline = null; // idle, no effect
  }

  (0, _createClass3.default)(_default, [{
    key: 'pause',
    value: function pause() {
      this.timeline.playbackRate = 0;
    }
  }, {
    key: _activeReadyTimer,
    value: function value() {
      var _this2 = this;

      if (this[_readyDefer] && !this[_readyDefer].timerID) {
        if (this.timeline.currentTime < 0) {
          this[_readyDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_readyDefer].resolve();
            delete _this2[_readyDefer];
          }, { delay: -this.timeline.currentTime, heading: false });
        } else {
          this[_readyDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_readyDefer].resolve();
            delete _this2[_readyDefer];
          }, { delay: 0, isEntropy: true });
        }
      }
    }
  }, {
    key: _activeFinishTimer,
    value: function value() {
      var _this3 = this;

      var _timing2 = this[_timing],
          duration = _timing2.duration,
          iterations = _timing2.iterations,
          endDelay = _timing2.endDelay;

      var delay = Math.ceil(duration * iterations + endDelay - this.timeline.currentTime) + 1;
      if (this[_finishedDefer] && !this[_finishedDefer].timerID) {
        this[_finishedDefer].timerID = this.timeline.setTimeout(function () {
          _this3[_finishedDefer].resolve();
          _this3[_removeDefer](_readyDefer);
          _this3[_removeDefer](_finishedDefer);
        }, { delay: delay, heading: false });
        this[_finishedDefer].reverseTimerID = this.timeline.setTimeout(function () {
          _this3[_finishedDefer].resolve();
          _this3[_removeDefer](_readyDefer);
          _this3[_removeDefer](_finishedDefer);
          _this3.timeline = null;
        }, { delay: -this[_timing].delay - 1, heading: false });
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (this.playState === 'finished') {
        this.cancel();
      }

      if (this.playState === 'idle') {
        if (this.playbackRate <= 0) {
          return;
        }
        var _timing3 = this[_timing],
            delay = _timing3.delay,
            playbackRate = _timing3.playbackRate,
            timeline = _timing3.timeline;

        this.timeline = new _spriteTimeline2.default({
          originTime: delay,
          playbackRate: playbackRate
        }, timeline);
        this[_activeReadyTimer]();
        this[_activeFinishTimer]();
      } else if (this.playState === 'paused') {
        this.timeline.playbackRate = this.playbackRate;
        this[_activeReadyTimer]();
      }
    }
  }, {
    key: _removeDefer,
    value: function value(deferID) {
      var defered = this[deferID],
          timeline = this.timeline;


      if (defered && timeline) {
        timeline.clearTimeout(defered.timerID);
        if (defered.reverseTimerID) {
          timeline.clearTimeout(defered.reverseTimerID);
        }
      }
      delete this[deferID];
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this[_removeDefer](_readyDefer);
      this[_removeDefer](_finishedDefer);
      this.timeline = null;
    }
  }, {
    key: 'finish',
    value: function finish() {
      this.timeline.currentTime = Infinity / this.playbackRate;
      this[_removeDefer](_readyDefer);
      this[_removeDefer](_finishedDefer);
    }
  }, {
    key: 'applyEffects',
    value: function applyEffects(effects) {
      return (0, _assign2.default)(this[_effects], effects);
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_timing].playbackRate;
    },
    set: function set(rate) {
      if (this.timeline) {
        this.timeline.playbackRate = rate;
      }
      this[_timing].playbackRate = rate;
    }
  }, {
    key: 'playState',
    get: function get() {
      var timeline = this.timeline,
          _timing4 = this[_timing],
          iterations = _timing4.iterations,
          duration = _timing4.duration,
          endDelay = _timing4.endDelay;

      var state = 'running';

      if (timeline == null) {
        state = 'idle';
      } else if (timeline.paused) {
        state = 'paused';
      } else if (timeline.currentTime < 0) {
        // 开始 pending
        state = 'pending';
      } else {
        var ed = timeline.currentTime - iterations * duration;
        if (ed > 0 && ed < endDelay) {
          // 结束 pending
          state = 'pending';
        } else if (ed >= endDelay) {
          state = 'finished';
        }
      }
      return state;
    }
  }, {
    key: 'progress',
    get: function get() {
      if (!this.timeline) return 0;

      var _timing5 = this[_timing],
          duration = _timing5.duration,
          iterations = _timing5.iterations;

      var timeline = this.timeline,
          playState = this.playState;

      var p = void 0;

      if (playState === 'idle') {
        p = 0;
      } else if (playState === 'paused' && timeline.currentTime < 0) {
        p = 0;
      } else if (playState === 'pending') {
        if (timeline.currentTime < 0) {
          p = 0;
        } else {
          var time = timeline.seekLocalTime(iterations * duration);
          p = (0, _utils.periodicity)(time, duration)[1] / duration;
        }
      } else if (playState === 'running' || playState === 'paused') {
        p = (0, _utils.periodicity)(timeline.currentTime, duration)[1] / duration;
      }

      if (playState === 'finished') {
        p = (0, _utils.periodicity)(iterations, 1)[1];
      }

      return p;
    }
  }, {
    key: 'frame',
    get: function get() {
      var playState = this.playState,
          initState = this[_initState],
          fill = this[_timing].fill;


      if (playState === 'idle') {
        return initState;
      }

      var currentTime = this.timeline.currentTime,
          keyframes = this[_keyframes].slice(0);

      var _getProgress = (0, _utils.getProgress)(this.timeline, this[_timing], this.progress),
          p = _getProgress.p,
          inverted = _getProgress.inverted;

      var frameState = initState;
      if (currentTime < 0 && playState === 'pending') {
        // 在开始前 delay 阶段
        if (fill === 'backwards' || fill === 'both') {
          frameState = inverted ? keyframes[keyframes.length - 1] : keyframes[0];
        }
      } else if (playState !== 'pending' && playState !== 'finished' || fill === 'forwards' || fill === 'both') {
        // 不在 endDelay 或结束状态，或 forwards
        frameState = (0, _utils.getCurrentFrame)(this[_timing], keyframes, this[_effects], p);
      }
      return frameState;
    }
  }, {
    key: 'timing',
    get: function get() {
      return this[_timing];
    }
  }, {
    key: 'baseTimeline',
    set: function set(timeline) {
      this[_timing].timeline = timeline;
    },
    get: function get() {
      return this[_timing].timeline;
    }
  }, {
    key: 'ready',
    get: function get() {
      if (this[_readyDefer]) {
        return this[_readyDefer].promise;
      }

      if (this.timeline && this.timeline.currentTime >= 0) {
        if (this.playState !== 'paused') {
          return _promise2.default.resolve();
        }
      }

      this[_readyDefer] = (0, _utils.defer)();
      if (this.timeline) {
        // 已经在 pending 状态
        this[_activeReadyTimer]();
      }
      if (this[_readyDefer]) {
        return this[_readyDefer].promise;
      }
      return _promise2.default.resolve();
    }
  }, {
    key: 'finished',
    get: function get() {
      if (this.playState === 'finished') {
        return _promise2.default.resolve();
      }
      if (!this[_finishedDefer]) {
        this[_finishedDefer] = (0, _utils.defer)();

        if (this.timeline) {
          this[_activeFinishTimer]();
        }
      }

      return this[_finishedDefer].promise;
    }
  }]);
  return _default;
}();

exports.default = _default;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
__webpack_require__(53);
__webpack_require__(7);
__webpack_require__(122);
__webpack_require__(130);
__webpack_require__(131);
module.exports = __webpack_require__(20).Promise;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var global = __webpack_require__(19);
var ctx = __webpack_require__(21);
var classof = __webpack_require__(56);
var $export = __webpack_require__(18);
var isObject = __webpack_require__(26);
var aFunction = __webpack_require__(22);
var anInstance = __webpack_require__(75);
var forOf = __webpack_require__(76);
var speciesConstructor = __webpack_require__(123);
var task = __webpack_require__(124).set;
var microtask = __webpack_require__(126)();
var newPromiseCapabilityModule = __webpack_require__(127);
var perform = __webpack_require__(128);
var promiseResolve = __webpack_require__(129);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(50)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(74)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(49)($Promise, PROMISE);
__webpack_require__(77)(PROMISE);
Wrapper = __webpack_require__(20)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(68)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(25);
var aFunction = __webpack_require__(22);
var SPECIES = __webpack_require__(50)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(21);
var invoke = __webpack_require__(125);
var html = __webpack_require__(48);
var cel = __webpack_require__(30);
var global = __webpack_require__(19);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(14)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(19);
var macrotask = __webpack_require__(124).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(14)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(22);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(25);
var isObject = __webpack_require__(26);
var newPromiseCapability = __webpack_require__(127);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(18);
var core = __webpack_require__(20);
var global = __webpack_require__(19);
var speciesConstructor = __webpack_require__(123);
var promiseResolve = __webpack_require__(129);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(18);
var newPromiseCapability = __webpack_require__(127);
var perform = __webpack_require__(128);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
module.exports = __webpack_require__(20).Object.keys;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(52);
var $keys = __webpack_require__(38);

__webpack_require__(135)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(18);
var core = __webpack_require__(20);
var fails = __webpack_require__(29);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

exports.defer = defer;
exports.periodicity = periodicity;
exports.calculateFramesOffset = calculateFramesOffset;
exports.getProgress = getProgress;
exports.getCurrentFrame = getCurrentFrame;

var _easing2 = __webpack_require__(117);

var _effect = __webpack_require__(116);

var _effect2 = _interopRequireDefault(_effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defer() {
  var ret = {};
  ret.promise = new _promise2.default(function (resolve, reject) {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
}

function periodicity(val, dur) {
  var t = Math.floor(val / dur);
  var v = val - t * dur;
  if (v === 0 && t > 0) {
    v = dur;
    t--;
  }
  return [t, v];
}

function calculateFramesOffset(keyframes) {
  keyframes = keyframes.slice(0);

  var firstFrame = keyframes[0],
      lastFrame = keyframes[keyframes.length - 1];

  lastFrame.offset = lastFrame.offset || 1;
  firstFrame.offset = firstFrame.offset || 0;

  var offset = 0,
      offsetFrom = -1;

  for (var i = 0; i < keyframes.length; i++) {
    var frame = keyframes[i];
    if (frame.offset != null) {
      var dis = i - offsetFrom;
      if (dis > 1) {
        var delta = (frame.offset - offset) / dis;
        for (var j = 0; j < dis - 1; j++) {
          keyframes[offsetFrom + j + 1].offset = offset + delta * (j + 1);
        }
      }
      offset = frame.offset;
      offsetFrom = i;
    }
    if (frame.easing != null) {
      frame.easing = (0, _easing2.parseEasing)(frame.easing);
    }
    if (i > 0) {
      var hasEasing = keyframes[i].easing != null;
      // 如果中间某个属性没有了，需要从前一帧复制过来
      keyframes[i] = (0, _assign2.default)({}, keyframes[i - 1], keyframes[i]);
      if (!hasEasing) {
        // easing 不能复制
        delete keyframes[i].easing;
      }
    }
  }

  return keyframes;
}

function getProgress(timeline, timing, p) {
  var currentTime = timeline.currentTime,
      direction = timing.direction,
      duration = timing.duration;

  var inverted = false;
  if (direction === 'reverse') {
    p = 1 - p;
    inverted = true;
  } else if (direction === 'alternate' || direction === 'alternate-reverse') {
    var period = Math.floor(currentTime / duration);

    if (p === 1) period--;
    // period = Math.max(0, period)

    if (period % 2 ^ direction === 'alternate-reverse') {
      p = 1 - p;
      inverted = true;
    }
  }
  return { p: p, inverted: inverted };
}

function calculateFrame(previousFrame, nextFrame, effects, p) {
  var ret = {};
  (0, _entries2.default)(nextFrame).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key !== 'offset' && key !== 'easing') {
      var effect = effects[key] || effects.default;

      var v = effect(previousFrame[key], value, p, previousFrame.offset, nextFrame.offset);

      if (v != null) {
        ret[key] = v;
      }
    }
  });
  return ret;
}

function getCurrentFrame(timing, keyframes, effects, p) {
  var easing = timing.easing,
      effect = timing.effect;


  if (!effect) {
    // timing.effect 会覆盖掉 Effects 和 animator.applyEffects 中定义的 effects
    effects = (0, _assign2.default)({}, effects, _effect2.default);
  }

  var ret = {};

  p = easing(p, keyframes);

  for (var i = 1; i < keyframes.length; i++) {
    var frame = keyframes[i],
        offset = frame.offset;

    if (offset >= p || i === keyframes.length - 1) {
      var previousFrame = keyframes[i - 1],
          previousOffset = previousFrame.offset,
          _easing = previousFrame.easing;

      var ep = p;
      if (_easing) {
        var d = offset - previousOffset;
        ep = _easing((p - previousOffset) / d) * d + previousOffset;
      }

      if (effect) {
        ret = effect(previousFrame, frame, ep, previousOffset, offset);
      } else {
        ret = calculateFrame(previousFrame, frame, effects, ep);
      }
      break;
    }
  }

  return ret;
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
module.exports = __webpack_require__(20).Object.entries;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(18);
var $entries = __webpack_require__(140)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(38);
var toIObject = __webpack_require__(12);
var isEnum = __webpack_require__(97).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toArray2 = __webpack_require__(142);

var _toArray3 = _interopRequireDefault(_toArray2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteMath = __webpack_require__(143);

var _platform = __webpack_require__(146);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parse = __webpack_require__(147);
var abs = __webpack_require__(148);
var normalize = __webpack_require__(149);
var isSvgPath = __webpack_require__(151);

var _path = (0, _symbol2.default)('path');
var _bounds = (0, _symbol2.default)('bounds');
var _savedPaths = (0, _symbol2.default)('savedPaths');
var _renderProps = (0, _symbol2.default)('renderProps');
var _beginPath = (0, _symbol2.default)('beginPath');

var SvgPath = function () {
  function SvgPath(d) {
    (0, _classCallCheck3.default)(this, SvgPath);

    if (!isSvgPath(d)) {
      throw new Error('Not an SVG path!');
    }

    var path = normalize(abs(parse(d)));

    this[_path] = path;

    this[_bounds] = null;
    this[_savedPaths] = [];
    this[_renderProps] = {};
    this[_beginPath] = false;
  }

  (0, _createClass3.default)(SvgPath, [{
    key: 'save',
    value: function save() {
      this[_savedPaths].push({ path: this[_path],
        bounds: this[_bounds],
        renderProps: (0, _assign2.default)({}, this[_renderProps]) });
      return this;
    }
  }, {
    key: 'restore',
    value: function restore() {
      if (this[_savedPaths].length) {
        var _savedPaths$pop = this[_savedPaths].pop(),
            path = _savedPaths$pop.path,
            bounds = _savedPaths$pop.bounds,
            renderProps = _savedPaths$pop.renderProps;

        this[_path] = path;
        this[_bounds] = bounds;
        this[_renderProps] = renderProps;
      }
      return this;
    }
  }, {
    key: 'isPointInPath',
    value: function isPointInPath(x, y) {
      return (0, _platform.isPointInPath)(this, x, y);
    }
  }, {
    key: 'getPointAtLength',
    value: function getPointAtLength(len) {
      return (0, _platform.getPointAtLength)(this.d, len);
    }
  }, {
    key: 'getTotalLength',
    value: function getTotalLength() {
      return (0, _platform.getTotalLength)(this.d);
    }
  }, {
    key: 'transform',
    value: function transform() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[_bounds] = null;
      var m = new _spriteMath.Matrix(args);
      var commands = this[_path];
      this[_path] = commands.map(function (c) {
        var _c = (0, _toArray3.default)(c),
            cmd = _c[0],
            args = _c.slice(1);

        var transformed = [cmd];
        for (var i = 0; i < args.length; i += 2) {
          var x0 = args[i],
              y0 = args[i + 1];

          var _m$transformPoint = m.transformPoint(x0, y0),
              _m$transformPoint2 = (0, _slicedToArray3.default)(_m$transformPoint, 2),
              x = _m$transformPoint2[0],
              y = _m$transformPoint2[1];

          transformed.push(x, y);
        }
        return transformed;
      });
      return this;
    }
  }, {
    key: 'translate',
    value: function translate(x, y) {
      var m = new _spriteMath.Matrix().translate(x, y);
      return this.transform.apply(this, (0, _toConsumableArray3.default)(m.m));
    }
  }, {
    key: 'rotate',
    value: function rotate(deg) {
      var m = new _spriteMath.Matrix().rotate(deg);
      return this.transform.apply(this, (0, _toConsumableArray3.default)(m.m));
    }
  }, {
    key: 'scale',
    value: function scale(sx, sy) {
      if (sy == null) sy = sx;
      var m = new _spriteMath.Matrix().scale(sx, sy);
      return this.transform.apply(this, (0, _toConsumableArray3.default)(m.m));
    }
  }, {
    key: 'skew',
    value: function skew(degX, degY) {
      var m = new _spriteMath.Matrix().skew(degX, degY);
      return this.transform.apply(this, (0, _toConsumableArray3.default)(m.m));
    }
  }, {
    key: 'trim',
    value: function trim() {
      var _bounds2 = (0, _slicedToArray3.default)(this.bounds, 2),
          x = _bounds2[0],
          y = _bounds2[1];

      this.translate(-x, -y);
      return this;
    }
  }, {
    key: 'beginPath',
    value: function beginPath() {
      this[_beginPath] = true;
      return this;
    }
  }, {
    key: 'to',
    value: function to(context) {
      var commands = this[_path];
      var renderProps = this[_renderProps];
      if (commands.length) {
        if (this[_beginPath]) {
          context.beginPath();
        }
        commands.forEach(function (c) {
          var _c2 = (0, _toArray3.default)(c),
              cmd = _c2[0],
              args = _c2.slice(1);

          if (cmd === 'M') {
            context.moveTo.apply(context, (0, _toConsumableArray3.default)(args));
          } else {
            context.bezierCurveTo.apply(context, (0, _toConsumableArray3.default)(args));
          }
        });
      }
      (0, _assign2.default)(context, renderProps);
      return {
        stroke: function stroke() {
          context.stroke();
          return this;
        },
        fill: function fill() {
          context.fill();
          return this;
        }
      };
    }
  }, {
    key: 'strokeStyle',
    value: function strokeStyle(value) {
      this[_renderProps].strokeStyle = value;
      return this;
    }
  }, {
    key: 'fillStyle',
    value: function fillStyle(value) {
      this[_renderProps].fillStyle = value;
      return this;
    }
  }, {
    key: 'lineWidth',
    value: function lineWidth(value) {
      this[_renderProps].lineWidth = value;
      return this;
    }
  }, {
    key: 'lineCap',
    value: function lineCap(value) {
      this[_renderProps].lineCap = value;
      return this;
    }
  }, {
    key: 'lineJoin',
    value: function lineJoin(value) {
      this[_renderProps].lineJoin = value;
      return this;
    }
  }, {
    key: 'bounds',
    get: function get() {
      if (!this[_bounds]) {
        var path = this[_path];
        this[_bounds] = [0, 0, 0, 0];
        if (path.length) {
          var bounds = [Infinity, Infinity, -Infinity, -Infinity];

          for (var i = 0, l = path.length; i < l; i++) {
            var points = path[i].slice(1);

            for (var j = 0; j < points.length; j += 2) {
              if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
              if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
              if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
              if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
            }
          }
          this[_bounds] = bounds;
        }
      }
      return this[_bounds];
    }
  }, {
    key: 'size',
    get: function get() {
      var bounds = this.bounds;
      return [bounds[2] - bounds[0], bounds[3] - bounds[1]];
    }
  }, {
    key: 'center',
    get: function get() {
      var _bounds3 = (0, _slicedToArray3.default)(this.bounds, 4),
          x0 = _bounds3[0],
          y0 = _bounds3[1],
          x1 = _bounds3[2],
          y1 = _bounds3[3];

      return [(x0 + x1) / 2, (y0 + y1) / 2];
    }
  }, {
    key: 'd',
    get: function get() {
      return this[_path].map(function (p) {
        var _p = (0, _toArray3.default)(p),
            c = _p[0],
            points = _p.slice(1);

        return c + points.join();
      }).join('');
    }
  }, {
    key: 'path',
    get: function get() {
      return this[_path];
    }
  }]);
  return SvgPath;
}();

exports.default = SvgPath;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(62);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = exports.Matrix = undefined;

var _matrix = __webpack_require__(144);

var _matrix2 = _interopRequireDefault(_matrix);

var _vector = __webpack_require__(145);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Matrix = _matrix2.default;
exports.Vector = _vector2.default;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// from https://github.com/chrisaljoudi/transformatrix.js
/**
  default:
          (1, 0, 0)
          (0, 1, 0)
 */
var Matrix = function Matrix(m) {
  m = m || [1, 0, 0, 1, 0, 0];
  this.m = [m[0], m[1], m[2], m[3], m[4], m[5]];
};

Matrix.prototype.unit = function () {
  this.m = [1, 0, 0, 1, 0, 0];
  return this;
};

Matrix.prototype.multiply = function (m) {
  var m1 = this.m;
  var m2 = void 0;

  if (m instanceof Matrix) {
    m2 = m.m;
  } else {
    m2 = m;
  }

  var m11 = m1[0] * m2[0] + m1[2] * m2[1],
      m12 = m1[1] * m2[0] + m1[3] * m2[1],
      m21 = m1[0] * m2[2] + m1[2] * m2[3],
      m22 = m1[1] * m2[2] + m1[3] * m2[3];

  var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

  m1[0] = m11;
  m1[1] = m12;
  m1[2] = m21;
  m1[3] = m22;
  m1[4] = dx;
  m1[5] = dy;

  return this;
};

Matrix.prototype.inverse = function () {
  var inv = new Matrix(this.m),
      invm = inv.m;

  var d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
      m0 = invm[3] * d,
      m1 = -invm[1] * d,
      m2 = -invm[2] * d,
      m3 = invm[0] * d,
      m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
      m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);

  invm[0] = m0;
  invm[1] = m1;
  invm[2] = m2;
  invm[3] = m3;
  invm[4] = m4;
  invm[5] = m5;

  return inv;
};

/**
  (1, 0, sx)
  (0, 1, sy)
 * */
Matrix.prototype.translate = function (x, y) {
  return this.multiply([1, 0, 0, 1, x, y]);
};

/**
    (cos, -sin, 0)
    (sin, cos, 0)
 */
Matrix.prototype.rotate = function (deg) {
  var rad = deg * Math.PI / 180,
      c = Math.cos(rad),
      s = Math.sin(rad);

  return this.multiply([c, s, -s, c, 0, 0]);
};

/**
    (1, tx, 0)
    (ty, 1, 0)
 */
Matrix.prototype.skew = function (degX, degY) {
  degY |= 0;
  var radX = degX * Math.PI / 180,
      radY = degY * Math.PI / 180;
  var tx = Math.tan(radX),
      ty = Math.tan(radY);

  return this.multiply([1, ty, tx, 1, 0, 0]);
};

/**
  (sx, 0, 0)
  (0, sy, 0)
 */
Matrix.prototype.scale = function (sx, sy) {
  return this.multiply([sx, 0, 0, sy, 0, 0]);
};

Matrix.prototype.transformPoint = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];

  return [px, py];
};

Matrix.prototype.transformVector = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2];
  py = x * this.m[1] + y * this.m[3];

  return [px, py];
};

exports.default = Matrix;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector = function () {
  function Vector(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
    (0, _classCallCheck3.default)(this, Vector);

    var _p = (0, _slicedToArray3.default)(p1, 3),
        x1 = _p[0],
        y1 = _p[1],
        z1 = _p[2],
        _p2 = (0, _slicedToArray3.default)(p2, 3),
        x2 = _p2[0],
        y2 = _p2[1],
        z2 = _p2[2];

    z1 = z1 || 0;
    z2 = z2 || 0;

    this.x = x1 - x2;
    this.y = y1 - y2;
    this.z = z1 - z2;
  }

  (0, _createClass3.default)(Vector, [{
    key: "unit",
    value: function unit() {
      var length = this.length;
      return new Vector([this.x / length, this.y / length, this.z / length]);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          x2 = v.x,
          y2 = v.y,
          z2 = v.z;

      return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - x2 * y1]);
    }
  }, {
    key: "length",
    get: function get() {
      var x = this.x,
          y = this.y,
          z = this.z;

      return Math.sqrt(x * x + y * y + z * z);
    }
  }]);
  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointAtLength = getPointAtLength;
exports.getTotalLength = getTotalLength;
exports.isPointInPath = isPointInPath;
function createSvgPath(d) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  return path;
}

function getPointAtLength(d, len) {
  var path = createSvgPath(d);

  var _path$getPointAtLengt = path.getPointAtLength(len),
      x = _path$getPointAtLengt.x,
      y = _path$getPointAtLengt.y;

  return [x, y];
}

function getTotalLength(d, len) {
  var path = createSvgPath(d);
  return path.getTotalLength(len);
}

function isPointInPath(_ref, x, y) {
  var d = _ref.d;

  var path = new Path2D(d);
  var context = document.createElement('canvas').getContext('2d');
  return context.isPointInPath(path, x, y);
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = parse;

/**
 * expected argument lengths
 * @type {Object}
 */
/* eslint-disable */
var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0

	/**
  * segment pattern
  * @type {RegExp}
  */

};var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
	var data = [];
	path.replace(segment, function (_, command, args) {
		var type = command.toLowerCase();
		args = parseValues(args);

		// overloaded moveTo
		if (type == 'm' && args.length > 2) {
			data.push([command].concat(args.splice(0, 2)));
			type = 'l';
			command = command == 'm' ? 'l' : 'L';
		}

		while (true) {
			if (args.length == length[type]) {
				args.unshift(command);
				return data.push(args);
			}
			if (args.length < length[type]) throw new Error('malformed path data');
			data.push([command].concat(args.splice(0, length[type])));
		}
	});
	return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
	var numbers = args.match(number);
	return numbers ? numbers.map(Number) : [];
}
/* eslint-enable */

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = absolutize;

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

/* eslint-disable */
function absolutize(path) {
	var startX = 0;
	var startY = 0;
	var x = 0;
	var y = 0;

	return path.map(function (seg) {
		seg = seg.slice();
		var type = seg[0];
		var command = type.toUpperCase();

		// is relative
		if (type != command) {
			seg[0] = command;
			switch (type) {
				case 'a':
					seg[6] += x;
					seg[7] += y;
					break;
				case 'v':
					seg[1] += y;
					break;
				case 'h':
					seg[1] += x;
					break;
				default:
					for (var i = 1; i < seg.length;) {
						seg[i++] += x;
						seg[i++] += y;
					}
			}
		}

		// update cursor state
		switch (command) {
			case 'Z':
				x = startX;
				y = startY;
				break;
			case 'H':
				x = seg[1];
				break;
			case 'V':
				y = seg[1];
				break;
			case 'M':
				x = startX = seg[1];
				y = startY = seg[2];
				break;
			default:
				x = seg[seg.length - 2];
				y = seg[seg.length - 1];
		}

		return seg;
	});
}
/* eslint-enable */

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = normalize;

var a2c = __webpack_require__(150);

/* eslint-disable */
function normalize(path) {
  // init state
  var prev;
  var result = [];
  var bezierX = 0;
  var bezierY = 0;
  var startX = 0;
  var startY = 0;
  var quadX = null;
  var quadY = null;
  var x = 0;
  var y = 0;

  for (var i = 0, len = path.length; i < len; i++) {
    var seg = path[i];
    var command = seg[0];

    switch (command) {
      case 'M':
        startX = seg[1];
        startY = seg[2];
        break;
      case 'A':
        var curves = a2c(x, y, seg[6], seg[7], seg[4], seg[5], seg[1], seg[2], seg[3]);

        if (!curves.length) continue;

        curves = curves.map(function (curve) {
          var _curve = (0, _slicedToArray3.default)(curve, 8),
              x0 = _curve[0],
              y0 = _curve[1],
              x1 = _curve[2],
              y1 = _curve[3],
              x2 = _curve[4],
              y2 = _curve[5],
              x = _curve[6],
              y = _curve[7];

          return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
        });

        for (var j = 0, c; j < curves.length; j++) {
          c = curves[j];
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
          if (j < curves.length - 1) result.push(seg);
        }

        break;
      case 'S':
        // default control point
        var cx = x;
        var cy = y;
        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX; // reflect the previous command's control
          cy += cy - bezierY; // point relative to the current point
        }
        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]];
        break;
      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point
          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }
        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2]);
        break;
      case 'Q':
        quadX = seg[1];
        quadY = seg[2];
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4]);
        break;
      case 'L':
        seg = line(x, y, seg[1], seg[2]);
        break;
      case 'H':
        seg = line(x, y, seg[1], y);
        break;
      case 'V':
        seg = line(x, y, x, seg[1]);
        break;
      case 'Z':
        seg = line(x, y, startX, startY);
        break;
    }

    // update state
    prev = command;
    x = seg[seg.length - 2];
    y = seg[seg.length - 1];
    if (seg.length > 4) {
      bezierX = seg[seg.length - 4];
      bezierY = seg[seg.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }
    result.push(seg);
  }

  return result;
}

function line(x1, y1, x2, y2) {
  return ['C', x1, y1, x2, y2, x2, y2];
}

function quadratic(x1, y1, cx, cy, x2, y2) {
  return ['C', x1 / 3 + 2 / 3 * cx, y1 / 3 + 2 / 3 * cy, x2 / 3 + 2 / 3 * cx, y2 / 3 + 2 / 3 * cy, x2, y2];
}
/* eslint-enable */

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Convert an arc to a sequence of cubic bézier curves
//


var TAU = Math.PI * 2;

/* eslint-disable space-infix-ops */

// Calculate an angle between two unit vectors
//
// Since we measure angle between radii of circular arcs,
// we can use simplified math (without length normalization)
//
function unit_vector_angle(ux, uy, vx, vy) {
  var sign = ux * vy - uy * vx < 0 ? -1 : 1;
  var dot = ux * vx + uy * vy;

  // Add this to work with arbitrary vectors:
  // dot /= Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);

  // rounding errors, e.g. -1.0000000000000002 can screw up this
  if (dot > 1.0) {
    dot = 1.0;
  }
  if (dot < -1.0) {
    dot = -1.0;
  }

  return sign * Math.acos(dot);
}

// Convert from endpoint to center parameterization,
// see http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
//
// Return [cx, cy, theta1, delta_theta]
//
function get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi) {
  // Step 1.
  //
  // Moving an ellipse so origin will be the middlepoint between our two
  // points. After that, rotate it to line up ellipse axes with coordinate
  // axes.
  //
  var x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
  var y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;

  var rx_sq = rx * rx;
  var ry_sq = ry * ry;
  var x1p_sq = x1p * x1p;
  var y1p_sq = y1p * y1p;

  // Step 2.
  //
  // Compute coordinates of the centre of this ellipse (cx', cy')
  // in the new coordinate system.
  //
  var radicant = rx_sq * ry_sq - rx_sq * y1p_sq - ry_sq * x1p_sq;

  if (radicant < 0) {
    // due to rounding errors it might be e.g. -1.3877787807814457e-17
    radicant = 0;
  }

  radicant /= rx_sq * y1p_sq + ry_sq * x1p_sq;
  radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);

  var cxp = radicant * rx / ry * y1p;
  var cyp = radicant * -ry / rx * x1p;

  // Step 3.
  //
  // Transform back to get centre coordinates (cx, cy) in the original
  // coordinate system.
  //
  var cx = cos_phi * cxp - sin_phi * cyp + (x1 + x2) / 2;
  var cy = sin_phi * cxp + cos_phi * cyp + (y1 + y2) / 2;

  // Step 4.
  //
  // Compute angles (theta1, delta_theta).
  //
  var v1x = (x1p - cxp) / rx;
  var v1y = (y1p - cyp) / ry;
  var v2x = (-x1p - cxp) / rx;
  var v2y = (-y1p - cyp) / ry;

  var theta1 = unit_vector_angle(1, 0, v1x, v1y);
  var delta_theta = unit_vector_angle(v1x, v1y, v2x, v2y);

  if (fs === 0 && delta_theta > 0) {
    delta_theta -= TAU;
  }
  if (fs === 1 && delta_theta < 0) {
    delta_theta += TAU;
  }

  return [cx, cy, theta1, delta_theta];
}

//
// Approximate one unit arc segment with bézier curves,
// see http://math.stackexchange.com/questions/873224
//
function approximate_unit_arc(theta1, delta_theta) {
  var alpha = 4 / 3 * Math.tan(delta_theta / 4);

  var x1 = Math.cos(theta1);
  var y1 = Math.sin(theta1);
  var x2 = Math.cos(theta1 + delta_theta);
  var y2 = Math.sin(theta1 + delta_theta);

  return [x1, y1, x1 - y1 * alpha, y1 + x1 * alpha, x2 + y2 * alpha, y2 - x2 * alpha, x2, y2];
}

module.exports = function a2c(x1, y1, x2, y2, fa, fs, rx, ry, phi) {
  var sin_phi = Math.sin(phi * TAU / 360);
  var cos_phi = Math.cos(phi * TAU / 360);

  // Make sure radii are valid
  //
  var x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
  var y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;

  if (x1p === 0 && y1p === 0) {
    // we're asked to draw line to itself
    return [];
  }

  if (rx === 0 || ry === 0) {
    // one of the radii is zero
    return [];
  }

  // Compensate out-of-range radii
  //
  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  // Get center parameters (cx, cy, theta1, delta_theta)
  //
  var cc = get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi);

  var result = [];
  var theta1 = cc[2];
  var delta_theta = cc[3];

  // Split an arc to multiple segments, so each segment
  // will be less than τ/4 (= 90°)
  //
  var segments = Math.max(Math.ceil(Math.abs(delta_theta) / (TAU / 4)), 1);
  delta_theta /= segments;

  for (var i = 0; i < segments; i++) {
    result.push(approximate_unit_arc(theta1, delta_theta));
    theta1 += delta_theta;
  }

  // We have a bezier approximation of a unit circle,
  // now need to transform back to the original ellipse
  //
  return result.map(function (curve) {
    for (var _i = 0; _i < curve.length; _i += 2) {
      var x = curve[_i + 0];
      var y = curve[_i + 1];

      // scale
      x *= rx;
      y *= ry;

      // rotate
      var xp = cos_phi * x - sin_phi * y;
      var yp = sin_phi * x + cos_phi * y;

      // translate
      curve[_i + 0] = xp + cc[0];
      curve[_i + 1] = yp + cc[1];
    }

    return curve;
  });
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isPath(str) {
  if (typeof str !== 'string') return false;

  str = str.trim();

  // https://www.w3.org/TR/SVG/paths.html#PathDataBNF
  if (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(str) && /[\dz]$/i.test(str) && str.length > 4) return true;

  return false;
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortOrderedSprites = exports.resolveValue = exports.parseValue = exports.deprecate = exports.setDeprecation = exports.flow = exports.attr = exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.praseString = exports.oneOrTwoValues = exports.parseColor = exports.Color = exports.notice = undefined;

var _utils = __webpack_require__(153);

var _decorators = __webpack_require__(167);

exports.notice = _utils.notice;
exports.Color = _utils.Color;
exports.parseColor = _utils.parseColor;
exports.oneOrTwoValues = _utils.oneOrTwoValues;
exports.praseString = _utils.praseString;
exports.parseStringInt = _utils.parseStringInt;
exports.parseStringFloat = _utils.parseStringFloat;
exports.parseColorString = _utils.parseColorString;
exports.fourValuesShortCut = _utils.fourValuesShortCut;
exports.parseStringTransform = _utils.parseStringTransform;
exports.boxIntersect = _utils.boxIntersect;
exports.boxToRect = _utils.boxToRect;
exports.boxEqual = _utils.boxEqual;
exports.boxUnion = _utils.boxUnion;
exports.rectToBox = _utils.rectToBox;
exports.rectVertices = _utils.rectVertices;
exports.appendUnit = _utils.appendUnit;
exports.attr = _decorators.attr;
exports.flow = _decorators.flow;
exports.setDeprecation = _decorators.setDeprecation;
exports.deprecate = _decorators.deprecate;
exports.parseValue = _decorators.parseValue;
exports.resolveValue = _decorators.resolveValue;
exports.sortOrderedSprites = _utils.sortOrderedSprites;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortOrderedSprites = exports.appendUnit = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.praseString = exports.oneOrTwoValues = exports.parseColor = exports.notice = exports.Color = undefined;

var _set = __webpack_require__(154);

var _set2 = _interopRequireDefault(_set);

var _isNan = __webpack_require__(160);

var _isNan2 = _interopRequireDefault(_isNan);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorString = __webpack_require__(163);

var Color = function () {
  function Color(color) {
    (0, _classCallCheck3.default)(this, Color);

    if (typeof color === 'string') {
      var _colorString$get = colorString.get(color || 'rgba(0,0,0,0)'),
          model = _colorString$get.model,
          value = _colorString$get.value;

      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  (0, _createClass3.default)(Color, [{
    key: 'toString',
    value: function toString() {
      var _value = (0, _slicedToArray3.default)(this.value, 4),
          a = _value[0],
          b = _value[1],
          c = _value[2],
          d = _value[3];

      var model = this.model;

      if (model === 'rgb') {
        return model + 'a(' + a + ',' + b + ',' + c + ',' + d + ')';
      }
      return model + 'a(' + a + ',' + b + '%,' + c + '%,' + d + ')';
    }
  }, {
    key: 'str',
    get: function get() {
      return String(this);
    }
  }]);
  return Color;
}();

exports.Color = Color;


var parseColor = function parseColor(color) {
  return new Color(color);
};

function parseColorString(color) {
  if (color && typeof color === 'string') {
    return parseColor(color).toString();
  }
  return color;
}

function parseStringTransform(str) {
  if (typeof str !== 'string') return str;

  var rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  var ret = {};
  if (rules) {
    rules.forEach(function (rule) {
      var matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);

      var _matched = (0, _slicedToArray3.default)(matched, 3),
          m = _matched[1],
          v = _matched[2];

      if (m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}

function parseValuesString(str, parser) {
  if (typeof str === 'string') {
    var values = str.split(/[\s,]+/g);
    return values.map(function (v) {
      return parser ? parser(v) : v;
    });
  }
  return str;
}

function praseString(str) {
  return parseValuesString(str);
}

function parseStringInt(str) {
  return parseValuesString(str, parseInt);
}

function parseStringFloat(str) {
  return parseValuesString(str, parseFloat);
}

function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  }if (val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  }if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  }if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [].concat((0, _toConsumableArray3.default)(val), [0, 0, 0, 0]).slice(0, 4);
}

function boxIntersect(box1, box2) {
  // left, top, right, buttom
  var _ref = [box1[0], box1[1], box1[2], box1[3]],
      l1 = _ref[0],
      t1 = _ref[1],
      r1 = _ref[2],
      b1 = _ref[3],
      _ref2 = [box2[0], box2[1], box2[2], box2[3]],
      l2 = _ref2[0],
      t2 = _ref2[1],
      r2 = _ref2[2],
      b2 = _ref2[3];


  var t = Math.max(t1, t2),
      r = Math.min(r1, r2),
      b = Math.min(b1, b2),
      l = Math.max(l1, l2);

  if (b >= t && r >= l) {
    return [l, t, r, b];
  }
  return null;
}

function boxToRect(box) {
  return [box[0], box[1], box[2] - box[0], box[3] - box[1]];
}

function boxEqual(box1, box2) {
  return box1[0] === box2[0] && box1[1] === box2[1] && box1[2] === box2[2] && box1[3] === box2[3];
}

function rectToBox(rect) {
  return [rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3]];
}

function rectVertices(rect) {
  var _rectToBox = rectToBox(rect),
      _rectToBox2 = (0, _slicedToArray3.default)(_rectToBox, 4),
      x1 = _rectToBox2[0],
      y1 = _rectToBox2[1],
      x2 = _rectToBox2[2],
      y2 = _rectToBox2[3];

  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}

function boxUnion(box1, box2) {
  if (!box1) return box2;
  if (!box2) return box1;

  return [Math.min(box1[0], box2[0]), Math.min(box1[1], box2[1]), Math.max(box1[2], box2[2]), Math.max(box1[3], box2[3])];
}

function appendUnit(value) {
  var defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (value === '') {
    return value;
  }
  if (typeof value === 'string' && (0, _isNan2.default)(Number(value))) {
    return value;
  }
  return value + defaultUnit;
}

function sortOrderedSprites(sprites) {
  var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return sprites.sort(function (a, b) {
    if (reversed) {
      ;
      var _ref3 = [b, a];
      a = _ref3[0];
      b = _ref3[1];
    }if (a.zIndex === b.zIndex) {
      return a.zOrder - b.zOrder;
    }
    return a.zIndex - b.zIndex;
  });
}

var noticed = new _set2.default();
function notice(msg) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warn';

  if (typeof console !== 'undefined' && !noticed.has(msg)) {
    console[level](msg); // eslint-disable-line no-console
    noticed.add(msg);
  }
}

exports.notice = notice;
exports.parseColor = parseColor;
exports.oneOrTwoValues = oneOrTwoValues;
exports.praseString = praseString;
exports.parseStringInt = parseStringInt;
exports.parseStringFloat = parseStringFloat;
exports.parseColorString = parseColorString;
exports.fourValuesShortCut = fourValuesShortCut;
exports.parseStringTransform = parseStringTransform;
exports.boxIntersect = boxIntersect;
exports.boxToRect = boxToRect;
exports.boxEqual = boxEqual;
exports.boxUnion = boxUnion;
exports.rectToBox = rectToBox;
exports.rectVertices = rectVertices;
exports.appendUnit = appendUnit;
exports.sortOrderedSprites = sortOrderedSprites;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
__webpack_require__(53);
__webpack_require__(7);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
module.exports = __webpack_require__(20).Set;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(73);
var validate = __webpack_require__(79);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(80)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(18);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(86)('Set') });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(89)('Set');


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(91)('Set');


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(162);
module.exports = __webpack_require__(20).Number.isNaN;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(18);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(164);
var swizzle = __webpack_require__(165);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(166);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attr = attr;
exports.flow = flow;
exports.setDeprecation = setDeprecation;
exports.deprecate = deprecate;
exports.parseValue = parseValue;
exports.resolveValue = resolveValue;

var _utils = __webpack_require__(153);

function attr(target, prop, descriptor) {
  target.__attributeNames = target.__attributeNames || [];
  target.__attributeNames.push(prop);
  if (!descriptor.get) {
    descriptor.get = function () {
      return this.get(prop);
    };
  } else {
    // enable set default to user defined getter
    var _getter = descriptor.get;
    descriptor.get = function () {
      var ret = _getter.call(this);
      if (ret == null) {
        ret = this.get(prop);
      }
      return ret;
    };
  }
  var _setter = descriptor.set;
  descriptor.set = function (val) {
    this.__clearCacheTag = false;
    this.__updateTag = false;
    this.__reflowTag = false;
    _setter.call(this, val);
    if (this.subject && this.subject.hasLayout) {
      var offsetSize = this.subject.offsetSize,
          layoutSize = this.subject.__layoutSize;

      if (!layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
        this.subject.parent.clearLayout();
      }
      this.subject.__lastLayout = offsetSize;
    }
    if (this.subject && this.__updateTag) {
      this.subject.forceUpdate(this.__clearCacheTag);
      if (this.__reflowTag) {
        this.subject.reflow();
      }
    }
    delete this.__reflowTag;
    delete this.__updateTag;
    delete this.__clearCacheTag;
  };
  return descriptor;
}

function flow(target, prop, descriptor) {
  if (descriptor.get) {
    var _getter = descriptor.get;
    descriptor.get = function () {
      var ret = this.flow(prop);
      if (ret === undefined) {
        ret = _getter.call(this);
        this.flow(prop, ret);
      }
      return ret;
    };
  }
  return descriptor;
}

function setDeprecation(apiName) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  msg = '[Deprecation] ' + apiName + ' has been deprecated.' + msg;
  (0, _utils.notice)(msg);
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var msg = '',
      apiName = '';
  function decorator(target, prop, descriptor) {
    apiName = apiName || target.constructor.name + '#' + prop;
    if (typeof descriptor.value === 'function') {
      var func = descriptor.value;
      descriptor.value = function () {
        setDeprecation(apiName, msg);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return func.apply(this, args);
      };
    }
    if (descriptor.set) {
      var setter = descriptor.set;
      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }
    if (descriptor.get) {
      var getter = descriptor.get;
      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }
  }
  if (args.length === 1) {
    msg = args[0];
    return decorator;
  }
  if (args.length === 2) {
    apiName = args[0];
    msg = args[1];
    return decorator;
  }
  return decorator.apply(undefined, args);
}

function parseValue() {
  for (var _len3 = arguments.length, parsers = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    parsers[_key3] = arguments[_key3];
  }

  return function (target, prop, descriptor) {
    var setter = descriptor.set;

    descriptor.set = function (val) {
      val = parsers.reduce(function (v, parser) {
        return parser(v);
      }, val);

      setter.call(this, val);
    };

    return descriptor;
  };
}

function resolveValue() {
  for (var _len4 = arguments.length, resolvers = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    resolvers[_key4] = arguments[_key4];
  }

  return function (target, prop, descriptor) {
    var getter = descriptor.get;

    descriptor.get = function (val) {
      val = getter.call(this);
      val = resolvers.reduce(function (v, resolver) {
        return resolver(v);
      }, val);
      return val;
    };
  };
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty2 = __webpack_require__(100);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty4 = __webpack_require__(172);

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(176);

var _stringify2 = _interopRequireDefault(_stringify);

var _set = __webpack_require__(154);

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp;

var _spriteMath = __webpack_require__(143);

var _spriteUtils = __webpack_require__(152);

var _spriteAnimator = __webpack_require__(2);

var _attr19 = __webpack_require__(191);

var _attr20 = _interopRequireDefault(_attr19);

var _basenode = __webpack_require__(196);

var _basenode2 = _interopRequireDefault(_basenode);

var _animation2 = __webpack_require__(197);

var _animation3 = _interopRequireDefault(_animation2);

var _nodetype = __webpack_require__(200);

var _render = __webpack_require__(201);

var _filters = __webpack_require__(202);

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var _attr = (0, _symbol2.default)('attr'),
    _animations = (0, _symbol2.default)('animations'),
    _cachePriority = (0, _symbol2.default)('cachePriority'),
    _effects = (0, _symbol2.default)('effects'),
    _flow = (0, _symbol2.default)('flow');

var BaseSprite = (_class = (_temp = _class2 = function (_BaseNode) {
  (0, _inherits3.default)(BaseSprite, _BaseNode);

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  function BaseSprite(attr) {
    (0, _classCallCheck3.default)(this, BaseSprite);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseSprite.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite)).call(this));

    _this[_attr] = new _this.constructor.Attr(_this);
    _this[_animations] = new _set2.default();
    _this[_cachePriority] = 0;
    _this[_flow] = {};
    _this.__cachePolicyThreshold = 6;

    if (attr) {
      _this.attr(attr);
    }
    return _this;
  }

  (0, _createClass3.default)(BaseSprite, [{
    key: 'reflow',
    value: function reflow() {
      this[_flow] = {};
      // let parent = this.parent
      // while(parent) {
      //   if(parent.reflow) parent.reflow()
      //   parent = parent.parent
      // }
    }
  }, {
    key: 'flow',
    value: function flow(prop, value) {
      if (value === undefined) {
        return this[_flow][prop];
      }
      this[_flow][prop] = value;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var nodeType = this.nodeType,
          attrs = this[_attr].serialize(),
          dataset = (0, _stringify2.default)(this.dataset),
          id = this.id;

      return {
        nodeType: nodeType,
        attrs: attrs,
        dataset: dataset,
        id: id
      };
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      this[_attr].merge(attrs);
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode() {
      var node = new this.constructor();
      node.merge(this[_attr].serialize());
      node.data(this.dataset);
      var bgimage = this.attr('bgimage');
      if (bgimage && bgimage.image) {
        node.attr('bgimage', null);
        node.attr('bgimage', (0, _assign2.default)({}, bgimage));
      }
      return node;
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      /* istanbul ignore next */
      return this.attr(prop, val);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop, null);
    }
  }, {
    key: 'attr',
    value: function attr(props, val) {
      var _this2 = this;

      var setVal = function setVal(key, value) {
        _this2[_attr][key] = value;
        if (key === 'zIndex' && _this2.parent) {
          _this2.parent.children.sort(function (a, b) {
            if (a.zIndex === b.zIndex) {
              return a.zOrder - b.zOrder;
            }
            return a.zIndex - b.zIndex;
          });
        }
      };
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _entries2.default)(props).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              prop = _ref2[0],
              value = _ref2[1];

          _this2.attr(prop, value);
        });
        return this;
      }if (typeof props === 'string') {
        if (val !== undefined) {
          if (typeof val === 'function') {
            val = val(this[_attr][props]);
          }
          if (val && typeof val.then === 'function') {
            return val.then(function (res) {
              setVal(props, res);
            });
          }
          setVal(props, val);
          return this;
        }
        return this[_attr][props];
      }

      return this[_attr].attrs;
    }
  }, {
    key: 'isVisible',
    value: function isVisible() {
      if (!this.parent) return false;

      var display = this.attr('display');
      if (display === 'none') {
        return false;
      }

      var opacity = this.attr('opacity');
      if (opacity <= 0) {
        return false;
      }

      if (this.isVirtual) return true;

      var _offsetSize = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize[0],
          height = _offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      if (this.parent.isVisible) {
        return this.parent.isVisible();
      }
      return true;
    }
  }, {
    key: 'transition',
    value: function transition(sec) {
      var _ref5;

      var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'linear';

      var that = this,
          _animation = (0, _symbol2.default)('animation');

      return _ref5 = {}, (0, _defineProperty5.default)(_ref5, _animation, null), (0, _defineProperty5.default)(_ref5, 'end', function end() {
        var animation = this[_animation];
        if (animation && (animation.playState === 'running' || animation.playState === 'pending')) {
          animation.finish();
        }
      }), (0, _defineProperty5.default)(_ref5, 'reverse', function reverse() {
        var animation = this[_animation];
        if (animation) {
          if (animation.playState === 'running' || animation.playState === 'pending') {
            animation.playbackRate = -animation.playbackRate;
          } else {
            var direction = animation.timing.direction;
            animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse';
            animation.play();
          }
        }
        return animation.finished;
      }), (0, _defineProperty5.default)(_ref5, 'attr', function attr(prop, val) {
        this.end();
        if (typeof prop === 'string') {
          prop = (0, _defineProperty5.default)({}, prop, val);
        }
        (0, _entries2.default)(prop).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (typeof value === 'function') {
            prop[key] = value(that.attr(key));
          }
        });
        this[_animation] = that.animate([prop], {
          duration: sec * 1000,
          fill: 'forwards',
          easing: easing
        });
        return this[_animation].finished;
      }), _ref5;
    }
  }, {
    key: 'animate',
    value: function animate(frames, timing) {
      var _this3 = this;

      var animation = new _animation3.default(this, frames, timing);
      if (this[_effects]) animation.applyEffects(this[_effects]);
      if (this.layer) {
        animation.baseTimeline = this.layer.timeline;
        animation.play();
        animation.finished.then(function () {
          _this3[_animations].delete(animation);
        });
      }
      this[_animations].add(animation);
      return animation;
    }
  }, {
    key: 'connect',
    value: function connect(parent) {
      var _this4 = this;

      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (parent && !(parent instanceof _basenode2.default)) {
        var node = new _basenode2.default();
        node.context = parent;
        node.timeline = new _spriteAnimator.Timeline();
        node.update = function () {
          var currentTime = this.timeline.currentTime;
          node.dispatchEvent('update', { target: this, timeline: this.timeline, renderTime: currentTime }, true, true);
        };
        parent = node;
      }
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'connect', this).call(this, parent, zOrder);
      Object.defineProperty(this, 'context', {
        get: function get() {
          return parent.cache || parent.context;
        },
        configurable: true
      });
      this[_animations].forEach(function (animation) {
        if (parent.layer) {
          animation.baseTimeline = parent.layer.timeline;
        }
        animation.play();
        animation.finished.then(function () {
          _this4[_animations].delete(animation);
        });
      });
      if (this.hasLayout) parent.clearLayout();
      this.reflow();
      return ret;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      this[_animations].forEach(function (animation) {
        return animation.cancel();
      });
      if (this.cache) {
        this.cache = null;
      }
      if (this.hasLayout) parent.clearLayout();
      this.reflow();
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'disconnect', this).call(this, parent);
      delete this.context;
      return ret;
    }
  }, {
    key: 'getLayerXY',
    value: function getLayerXY() {
      var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var layer = this.layer;
      if (!layer) return [0, 0];
      var target = this;
      var x = dx,
          y = dy;

      while (target && target !== layer) {
        var _target$offsetToPoint = target.offsetToPoint(x, y);

        var _target$offsetToPoint2 = (0, _slicedToArray3.default)(_target$offsetToPoint, 2);

        x = _target$offsetToPoint2[0];
        y = _target$offsetToPoint2[1];

        var parent = target.parent;

        if (parent !== layer) {
          var borderWidth = parent.attr('border').width;
          var padding = parent.attr('padding'),
              scrollLeft = parent.attr('scrollLeft') || 0,
              scrollTop = parent.attr('scrollTop') || 0;

          // const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft
          // const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop

          x = x + parent.originalRect[0] + borderWidth + padding[3] - scrollLeft;
          y = y + parent.originalRect[1] + borderWidth + padding[0] - scrollTop;
        }
        target = parent;
      }
      return [x, y];
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this[_cachePriority] = 0;
      this.cache = null;
      if (this.parent && this.parent.cache) {
        this.parent[_cachePriority] = 0;
        this.parent.cache = null;
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (!this.parent) return false;
      this.parent.removeChild(this);
      return true;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this);
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (clearCache) {
        this.clearCache();
      }
      var parent = this.parent;
      if (parent) {
        this.parent.update(this);
      }
    }

    // layer position to sprite offset

  }, {
    key: 'pointToOffset',
    value: function pointToOffset(x, y) {
      var _attr2 = this.attr('pos'),
          _attr3 = (0, _slicedToArray3.default)(_attr2, 2),
          x0 = _attr3[0],
          y0 = _attr3[1];

      var dx = x - x0,
          dy = y - y0;

      var transform = this.transform;
      return transform.inverse().transformPoint(dx, dy);
    }
  }, {
    key: 'offsetToPoint',
    value: function offsetToPoint(dx, dy) {
      var transform = this.transform;

      var _attr4 = this.attr('pos'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 2),
          x0 = _attr5[0],
          y0 = _attr5[1];

      var _transform$transformP = transform.transformPoint(dx, dy),
          _transform$transformP2 = (0, _slicedToArray3.default)(_transform$transformP, 2),
          x = _transform$transformP2[0],
          y = _transform$transformP2[1];

      return [x + x0, y + y0];
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      /* istanbul ignore if */
      if (!this.isVisible()) {
        return false;
      }

      var parentX = void 0,
          parentY = void 0;

      if (evt.parentX != null) {
        // group
        parentX = evt.parentX;
        parentY = evt.parentY;
      } else {
        parentX = evt.layerX;
        parentY = evt.layerY;
      }

      var _pointToOffset = this.pointToOffset(parentX, parentY),
          _pointToOffset2 = (0, _slicedToArray3.default)(_pointToOffset, 2),
          nx = _pointToOffset2[0],
          ny = _pointToOffset2[1];

      evt.offsetX = nx;
      evt.offsetY = ny;

      var _originalRect = (0, _slicedToArray3.default)(this.originalRect, 4),
          ox = _originalRect[0],
          oy = _originalRect[1],
          ow = _originalRect[2],
          oh = _originalRect[3];

      if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
        if (this.context && this.context.isPointInPath) {
          var borderWidth = this.attr('border').width,
              borderRadius = this.attr('borderRadius');
          if (borderWidth || borderRadius) {
            var _outerSize = (0, _slicedToArray3.default)(this.outerSize, 2),
                width = _outerSize[0],
                height = _outerSize[1];

            var _ref6 = [0, 0, width, height, Math.max(0, borderRadius + borderWidth / 2)],
                x = _ref6[0],
                y = _ref6[1],
                w = _ref6[2],
                h = _ref6[3],
                r = _ref6[4];

            (0, _render.drawRadiusBox)(this.context, { x: x, y: y, w: w, h: h, r: r });
            if (this.layer && this.layer.offset) {
              nx += this.layer.offset[0];
              ny += this.layer.offset[1];
            }
            return this.context.isPointInPath(nx - ox, ny - oy);
          }
        }
        return true;
      }
    }

    // OBB: http://blog.csdn.net/silangquan/article/details/50812425

  }, {
    key: 'OBBCollision',
    value: function OBBCollision(sprite) {
      // vertices: [p1, p2, p3, p4]
      var _vertices = (0, _slicedToArray3.default)(this.vertices, 3),
          p11 = _vertices[0],
          p12 = _vertices[1],
          p13 = _vertices[2],
          _sprite$vertices = (0, _slicedToArray3.default)(sprite.vertices, 3),
          p21 = _sprite$vertices[0],
          p22 = _sprite$vertices[1],
          p23 = _sprite$vertices[2];

      var a1 = new _spriteMath.Vector(p12, p11).unit(),
          a2 = new _spriteMath.Vector(p13, p12).unit(),
          a3 = new _spriteMath.Vector(p22, p21).unit(),
          a4 = new _spriteMath.Vector(p23, p22).unit();

      // The projection of the axis of a vertex in a certain direction
      function verticesProjection(vertices, axis) {
        var _vertices$map = vertices.map(function (v) {
          return axis.dot(new _spriteMath.Vector(v));
        }),
            _vertices$map2 = (0, _slicedToArray3.default)(_vertices$map, 4),
            p1 = _vertices$map2[0],
            p2 = _vertices$map2[1],
            p3 = _vertices$map2[2],
            p4 = _vertices$map2[3];

        return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
      }

      function projectionIntersect(p1, p2) {
        var m1 = (p1[0] + p1[1]) / 2,
            l1 = Math.abs(p1[1] - p1[0]),
            m2 = (p2[0] + p2[1]) / 2,
            l2 = Math.abs(p2[1] - p2[0]);

        return Math.abs(m2 - m1) <= (l1 + l2) / 2;
      }

      return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
    }
  }, {
    key: 'relayout',
    value: function relayout() {}
  }, {
    key: 'draw',
    value: function draw(t) {
      var drawingContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var bound = this.originalRect;
      var cachableContext = this.cache;

      var filter = this.attr('filter'),
          shadow = this.attr('shadow');

      // filter & shadow require cachableContext
      if (!cachableContext && (filter || shadow || this.cachePriority > this.__cachePolicyThreshold)) {
        cachableContext = _render.cacheContextPool.get(drawingContext);
        if (cachableContext) {
          // +2 to solve 1px problem
          cachableContext.canvas.width = Math.ceil(bound[2]) + 2;
          cachableContext.canvas.height = Math.ceil(bound[3]) + 2;
        } else {
          this.__cachePolicyThreshold = Infinity;
        }
      }

      this[_cachePriority] = Math.min(this[_cachePriority] + 1, 10);
      var evtArgs = { context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache };

      drawingContext.save();
      drawingContext.translate.apply(drawingContext, (0, _toConsumableArray3.default)(this.attr('pos')));
      drawingContext.transform.apply(drawingContext, (0, _toConsumableArray3.default)(this.transform.m));

      // fix for wxapp
      var alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
      drawingContext.globalAlpha = alpha * this.attr('opacity');

      if (!cachableContext) {
        drawingContext.translate(bound[0], bound[1]);
      } else {
        // solve 1px problem
        cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);
      }

      this.dispatchEvent('beforedraw', evtArgs, true, true);

      if (cachableContext) {
        // set cache before render for group
        if (!this.cache) {
          this.cache = cachableContext;
          this.render(t, cachableContext);
        }
      } else {
        this.render(t, drawingContext);
      }

      if (cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
        if (filter) {
          drawingContext.filter = _filters2.default.compile(filter);
        }
        if (shadow) {
          var blur = shadow.blur,
              color = shadow.color,
              offset = shadow.offset;

          blur = blur || 1;
          color = color || 'rgba(0,0,0,1)';
          drawingContext.shadowBlur = blur;
          drawingContext.shadowColor = color;
          if (offset) {
            drawingContext.shadowOffsetX = offset[0];
            drawingContext.shadowOffsetY = offset[1];
          }
        }
        drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1);
      }

      this.dispatchEvent('afterdraw', evtArgs, true, true);

      drawingContext.restore();

      return drawingContext;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var border = this.attr('border'),
          borderRadius = this.attr('borderRadius'),
          padding = this.attr('padding'),
          _offsetSize2 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize2[0],
          offsetHeight = _offsetSize2[1],
          _clientSize = (0, _slicedToArray3.default)(this.clientSize, 2),
          clientWidth = _clientSize[0],
          clientHeight = _clientSize[1];


      if (!this.needRender) {
        return false;
      }

      var borderWidth = border.width;
      var borderStyle = border.style;

      // draw border
      if (borderWidth) {
        drawingContext.lineWidth = borderWidth;

        var x = borderWidth / 2,
            y = borderWidth / 2,
            w = offsetWidth - borderWidth,
            h = offsetHeight - borderWidth,
            r = borderRadius;


        (0, _render.drawRadiusBox)(drawingContext, { x: x, y: y, w: w, h: h, r: r });

        if (borderStyle && borderStyle !== 'solid') {
          var dashOffset = this.attr('dashOffset');
          drawingContext.lineDashOffset = dashOffset;
          if (borderStyle === 'dashed') {
            borderStyle = [borderWidth * 3, borderWidth * 3];
          }
          drawingContext.setLineDash(borderStyle);
        }
        drawingContext.strokeStyle = (0, _render.findColor)(drawingContext, this, 'border');
        drawingContext.stroke();
      }

      // draw bgcolor
      var bgcolor = (0, _render.findColor)(drawingContext, this, 'bgcolor');
      var bgimage = this.attr('bgimage');

      if (this.cache == null || borderWidth || borderRadius || bgcolor || bgimage && bgimage.display !== 'none') {
        var _ref7 = [borderWidth, borderWidth, clientWidth, clientHeight, Math.max(0, borderRadius - borderWidth / 2)],
            _x7 = _ref7[0],
            _y = _ref7[1],
            _w = _ref7[2],
            _h = _ref7[3],
            _r = _ref7[4];


        (0, _render.drawRadiusBox)(drawingContext, { x: _x7, y: _y, w: _w, h: _h, r: _r });

        if (bgcolor) {
          drawingContext.fillStyle = bgcolor;
          drawingContext.fill();
        }

        // clip is expensive, we should only perform clip when it has to.
        if (bgimage && bgimage.display !== 'none' || borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
          drawingContext.clip();
        }

        if (bgimage && bgimage.image && bgimage.display !== 'none') {
          drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
        }
      }

      drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);

      return true;
    }
  }, {
    key: 'cachePriority',
    get: function get() {
      if (this.isVirtual) return -1;
      return this[_cachePriority];
    },
    set: function set(priority) {
      this[_cachePriority] = priority;
    }
  }, {
    key: 'layer',
    get: function get() {
      return this.parent && this.parent.layer;
    }
  }, {
    key: 'id',
    set: function set(val) {
      this.attr('id', val);
    },
    get: function get() {
      return this.attr('id');
    }
  }, {
    key: 'name',
    set: function set(val) {
      this.attr('name', val);
    },
    get: function get() {
      return this.attr('name');
    }
  }, {
    key: 'hasLayout',
    get: function get() {
      if (this.attr('position') === 'absolute') return false;
      if (this.parent && this.parent.relayout) {
        var display = this.parent.attr('display');
        return display !== '' && display !== 'static';
      }
      return false;
    }
  }, {
    key: 'zIndex',
    set: function set(val) {
      this.attr('zIndex', val);
    },
    get: function get() {
      return this.attr('zIndex');
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this[_attr];
    }
  }, {
    key: 'isVirtual',
    get: function get() {
      return false;
    }
  }, {
    key: 'transform',
    get: function get() {
      var transform = new _spriteMath.Matrix(this[_attr].get('transformMatrix'));
      var transformOrigin = this.attr('transformOrigin');
      if (transformOrigin) {
        var t = new _spriteMath.Matrix();
        t.translate.apply(t, (0, _toConsumableArray3.default)(transformOrigin));
        t.multiply(transform);
        t.translate.apply(t, (0, _toConsumableArray3.default)(transformOrigin.map(function (v) {
          return -v;
        })));
        return t;
      }
      return transform;
    }
  }, {
    key: 'attrSize',
    get: function get() {
      var _attr6 = this.attr('size'),
          _attr7 = (0, _slicedToArray3.default)(_attr6, 2),
          width = _attr7[0],
          height = _attr7[1];

      var isBorderBox = this.attr('boxSizing') === 'border-box';

      if (this.hasLayout) {
        var layoutWidth = this.attr('layoutWidth'),
            layoutHeight = this.attr('layoutHeight');var _ref8 = [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height];
        width = _ref8[0];
        height = _ref8[1];
      }
      if (isBorderBox) {
        var borderWidth = this.attr('border').width,
            _attr8 = this.attr('padding'),
            _attr9 = (0, _slicedToArray3.default)(_attr8, 4),
            paddingTop = _attr9[0],
            paddingRight = _attr9[1],
            paddingBottom = _attr9[2],
            paddingLeft = _attr9[3];


        if (width !== '') {
          width = Math.max(0, width - 2 * borderWidth - paddingLeft - paddingRight);
        }if (width !== '') {
          height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
        }
      }

      return [width, height];
    }

    // content width / height

  }, {
    key: 'contentSize',
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1];

      return [width | 0, height | 0];
    }

    // content + padding

  }, {
    key: 'clientSize',
    get: function get() {
      var _attr10 = this.attr('padding'),
          _attr11 = (0, _slicedToArray3.default)(_attr10, 4),
          top = _attr11[0],
          right = _attr11[1],
          bottom = _attr11[2],
          left = _attr11[3],
          _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
          width = _contentSize[0],
          height = _contentSize[1];

      return [left + width + right, top + height + bottom];
    }

    // content + padding + border

  }, {
    key: 'offsetSize',
    get: function get() {
      var _attr12 = this.attr('border'),
          borderWidth = _attr12.width,
          _clientSize2 = (0, _slicedToArray3.default)(this.clientSize, 2),
          width = _clientSize2[0],
          height = _clientSize2[1];

      return [width + 2 * borderWidth, height + 2 * borderWidth];
    }
  }, {
    key: 'layoutSize',
    get: function get() {
      var size = this.offsetSize;

      var _attr13 = this.attr('margin'),
          _attr14 = (0, _slicedToArray3.default)(_attr13, 4),
          top = _attr14[0],
          right = _attr14[1],
          bottom = _attr14[2],
          left = _attr14[3];

      return [left + size[0] + right, top + size[1] + bottom];
    }
  }, {
    key: 'innerSize',
    get: function get() {
      return this.contentSize;
    }
  }, {
    key: 'outerSize',
    get: function get() {
      return this.offsetSize;
    }
  }, {
    key: 'boundingRect',
    get: function get() {
      var transform = this.transform;

      var _originalRect2 = (0, _slicedToArray3.default)(this.originalRect, 4),
          ox = _originalRect2[0],
          oy = _originalRect2[1],
          width = _originalRect2[2],
          height = _originalRect2[3];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        width += margin[1];
        height += margin[2];
      }

      var vertexs = [[ox, oy], [width + ox, oy], [ox, height + oy], [width + ox, height + oy]];

      var transformed = vertexs.map(function (v) {
        return transform.transformPoint(v[0], v[1]);
      });

      var vx = transformed.map(function (v) {
        return v[0];
      }),
          vy = transformed.map(function (v) {
        return v[1];
      });

      var minX = Math.min.apply(Math, (0, _toConsumableArray3.default)(vx)),
          minY = Math.min.apply(Math, (0, _toConsumableArray3.default)(vy)),
          maxX = Math.max.apply(Math, (0, _toConsumableArray3.default)(vx)),
          maxY = Math.max.apply(Math, (0, _toConsumableArray3.default)(vy));

      return [minX, minY].concat([maxX - minX, maxY - minY]);
    }

    // rect before transform

  }, {
    key: 'originalRect',
    get: function get() {
      var _offsetSize3 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize3[0],
          height = _offsetSize3[1],
          _attr15 = this.attr('anchor'),
          _attr16 = (0, _slicedToArray3.default)(_attr15, 2),
          anchorX = _attr16[0],
          anchorY = _attr16[1];

      var rect = [-anchorX * width, -anchorY * height, width, height];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        rect[0] += margin[3];
        rect[1] += margin[0];
      }
      return rect;
    }
  }, {
    key: 'originalRenderRect',
    get: function get() {
      var bound = this.originalRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'renderBox',
    get: function get() {
      var bound = this.boundingRect,
          pos = this.attr('pos');

      return [Math.floor(pos[0] + bound[0]), Math.floor(pos[1] + bound[1]), Math.ceil(pos[0] + bound[0] + bound[2]), Math.ceil(pos[1] + bound[1] + bound[3])];
    }
  }, {
    key: 'renderRect',
    get: function get() {
      return (0, _spriteUtils.boxToRect)(this.renderBox);
    }
  }, {
    key: 'vertices',
    get: function get() {
      var vertices = (0, _spriteUtils.rectVertices)(this.originalRect),
          transform = this.transform,
          _attr17 = this.attr('pos'),
          _attr18 = (0, _slicedToArray3.default)(_attr17, 2),
          x0 = _attr18[0],
          y0 = _attr18[1];


      return vertices.map(function (v) {
        var _transform$transformP3 = transform.transformPoint(v[0], v[1]),
            _transform$transformP4 = (0, _slicedToArray3.default)(_transform$transformP3, 2),
            x = _transform$transformP4[0],
            y = _transform$transformP4[1];

        return [x0 + x, y0 + y];
      });
    }
  }, {
    key: 'cache',
    set: function set(context) {
      if (this.cacheContext && context !== this.cacheContext) {
        _render.cacheContextPool.put(this.cacheContext);
      }
      this.cacheContext = context;
    },
    get: function get() {
      return this.cacheContext;
    }
  }, {
    key: 'needRender',
    get: function get() {
      if (this.isVirtual) return false;

      var _offsetSize4 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize4[0],
          offsetHeight = _offsetSize4[1];

      if (offsetWidth <= 0 || offsetHeight <= 0) return false;

      var border = this.attr('border');

      if (border.width <= 0 && this.attr('borderRadius') <= 0 && !this.attr('bgcolor') && !this.attr('gradients').bgcolor && !this.attr('bgimage')) {
        return false; // don't need to render
      }

      return true;
    }
  }], [{
    key: 'setAttributeEffects',
    value: function setAttributeEffects() {
      var effects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.prototype[_effects] == null) {
        this.prototype[_effects] = effects;
      }
      (0, _assign2.default)(this.prototype[_effects], effects);
    }
  }, {
    key: 'addAttributes',
    value: function addAttributes() {
      var _this5 = this;

      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _entries2.default)(attrs).forEach(function (_ref9) {
        var _ref10 = (0, _slicedToArray3.default)(_ref9, 2),
            prop = _ref10[0],
            handler = _ref10[1];

        var getter = function getter() {
          return this.get(prop);
        };
        if (typeof handler !== 'function' && handler.set) {
          getter = handler.get || getter;
          handler = handler.set;
        }
        if (prop !== 'init') {
          _this5.Attr.prototype.__attributeNames.push(prop);
          (0, _defineProperty3.default)(_this5.Attr.prototype, prop, {
            set: function set(val) {
              this.__clearCacheTag = false;
              this.__updateTag = false;
              this.__reflowTag = false;
              handler(this, val);
              if (this.subject && this.subject.hasLayout) {
                var offsetSize = this.subject.offsetSize,
                    layoutSize = this.subject.__layoutSize;

                if (!layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
                  this.subject.parent.clearLayout();
                }
                this.subject.__lastLayout = offsetSize;
              }
              if (this.subject && this.__updateTag) {
                this.subject.forceUpdate(this.__clearCacheTag);
                if (this.__reflowTag) {
                  this.subject.reflow();
                }
              }
              delete this.__reflowTag;
              delete this.__updateTag;
              delete this.__clearCacheTag;
            },

            get: getter
          });
        }
      });
    }
  }, {
    key: 'defineAttributes',
    value: function defineAttributes(attrs, effects) {
      this.Attr = function (_Attr) {
        (0, _inherits3.default)(_class3, _Attr);

        function _class3(subject) {
          (0, _classCallCheck3.default)(this, _class3);

          var _this6 = (0, _possibleConstructorReturn3.default)(this, (_class3.__proto__ || (0, _getPrototypeOf2.default)(_class3)).call(this, subject));

          if (attrs.init) attrs.init(_this6, subject);
          return _this6;
        }

        return _class3;
      }(this.Attr);
      if (attrs) this.addAttributes(attrs);
      if (effects) this.setAttributeEffects(effects);
      return this.Attr;
    }
  }]);
  return BaseSprite;
}(_basenode2.default), _class2.Attr = _attr20.default, _temp), (_applyDecoratedDescriptor(_class.prototype, 'attrSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'attrSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'contentSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'contentSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clientSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clientSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'originalRect', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'originalRect'), _class.prototype)), _class);
exports.default = BaseSprite;


function drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var w = image.width,
      h = image.height;

  var _ref11 = clip9 || [16, 16, 16, 16],
      _ref12 = (0, _slicedToArray3.default)(_ref11, 4),
      top = _ref12[0],
      right = _ref12[1],
      bottom = _ref12[2],
      left = _ref12[3];

  var leftTop = [0, 0, left, top],
      rightTop = [w - right, 0, right, top],
      rightBottom = [w - right, h - bottom, right, bottom],
      leftBottom = [0, h - bottom, left, bottom];

  var boxRight = offsetWidth - right - borderWidth,
      boxBottom = offsetHeight - borderWidth - bottom;

  // draw four corners
  drawingContext.drawImage.apply(drawingContext, [image].concat(leftTop, [borderWidth, borderWidth, left, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightTop, [boxRight, borderWidth, right, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightBottom, [boxRight, boxBottom, left, bottom]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(leftBottom, [borderWidth, boxBottom, left, bottom]));

  // draw .9 cross
  var midWidth = w - left - right,
      midHeight = h - top - bottom;

  if (midWidth > 0) {
    var midBoxWidth = clientWidth - left - right;
    var leftOffset = borderWidth + left;
    while (midBoxWidth > 0) {
      var ww = Math.min(midBoxWidth, midWidth);
      var topPiece = [left, 0, ww, top],
          bottomPiece = [left, h - bottom, ww, bottom];

      drawingContext.drawImage.apply(drawingContext, [image].concat(topPiece, [leftOffset, borderWidth, ww, top]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(bottomPiece, [leftOffset, boxBottom, ww, bottom]));
      midBoxWidth -= midWidth;
      if (midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if (midHeight > 0) {
    var midBoxHeight = clientHeight - top - bottom;
    var topOffset = borderWidth + top;
    while (midBoxHeight > 0) {
      var hh = Math.min(midBoxHeight, midHeight);
      var leftPiece = [0, top, left, hh],
          rightPiece = [w - right, top, right, hh];

      drawingContext.drawImage.apply(drawingContext, [image].concat(leftPiece, [borderWidth, topOffset, left, hh]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(rightPiece, [boxRight, topOffset, right, hh]));
      midBoxHeight -= midHeight;
      if (midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if (midHeight && midWidth > 0) {
    var _midBoxWidth = clientWidth - left - right;
    var _leftOffset = borderWidth + left;

    while (_midBoxWidth > 0) {
      var _midBoxHeight = clientHeight - top - bottom;
      var _topOffset = borderWidth + top;
      while (_midBoxHeight > 0) {
        var _ww = Math.min(_midBoxWidth, midWidth),
            _hh = Math.min(_midBoxHeight, midHeight);
        var midPiece = [left, top, _ww, _hh];
        drawingContext.drawImage.apply(drawingContext, [image].concat(midPiece, [_leftOffset, _topOffset, _ww, _hh]));
        _midBoxHeight -= midWidth;
        if (_midBoxHeight > 0) {
          _topOffset += midHeight;
        }
      }
      _midBoxWidth -= midWidth;
      if (_midBoxWidth > 0) {
        _leftOffset += midWidth;
      }
    }
  }
}

function drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var image = bgimage.image,
      display = bgimage.display,
      clip9 = bgimage.clip9;


  if (display === '.9') {
    drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
  } else {
    var offset = bgimage.offset || [0, 0],
        w = image.width,
        h = image.height;

    if (display === 'center') {
      offset = [(clientWidth - w) * 0.5, (clientHeight - h) * 0.5];
    } else if (display === 'stretch') {
      w = clientWidth - offset[0];
      h = clientHeight - offset[1];
    }
    drawingContext.drawImage(image, borderWidth + offset[0], borderWidth + offset[1], w, h);

    if (w > 0 && (display === 'repeat' || display === 'repeatX')) {
      var cw = clientWidth - borderWidth - offset[0] - w;
      while (cw > borderWidth) {
        drawingContext.drawImage(image, clientWidth - cw, borderWidth + offset[1], w, h);
        if (h > 0 && display === 'repeat') {
          var ch = clientHeight - borderWidth - offset[1] - h;
          while (ch > borderWidth) {
            drawingContext.drawImage(image, clientWidth - cw, clientHeight - ch, w, h);
            ch -= h;
          }
        }
        cw -= w;
      }
    }

    if (h > 0 && (display === 'repeat' || display === 'repeatY')) {
      var _ch = clientHeight - borderWidth - offset[1] - h;
      while (_ch > borderWidth) {
        drawingContext.drawImage(image, borderWidth + offset[0], clientHeight - _ch, w, h);
        _ch -= h;
      }
    }
  }
}

(0, _nodetype.registerNodeType)('basesprite', BaseSprite);

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
var $Object = __webpack_require__(20).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(12);
var $getOwnPropertyDescriptor = __webpack_require__(111).f;

__webpack_require__(135)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(100);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(174);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(7);
module.exports = __webpack_require__(106).f('iterator');


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(20);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(179), __esModule: true };

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(180);
module.exports = __webpack_require__(20).Object.getPrototypeOf;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(52);
var $getPrototypeOf = __webpack_require__(51);

__webpack_require__(135)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(184);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(188);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(185), __esModule: true };

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(186);
module.exports = __webpack_require__(20).Object.setPrototypeOf;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(18);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(187).set });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(26);
var anObject = __webpack_require__(25);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(21)(Function.call, __webpack_require__(111).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(189), __esModule: true };

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(190);
var $Object = __webpack_require__(20).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty = __webpack_require__(100);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _stringify = __webpack_require__(176);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperties = __webpack_require__(192);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _desc, _value, _class;

var _spriteMath = __webpack_require__(143);

var _spriteUtils = __webpack_require__(152);

var _svgPathToCanvas = __webpack_require__(141);

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var _attr = (0, _symbol2.default)('attr'),
    _temp = (0, _symbol2.default)('store'),
    _subject = (0, _symbol2.default)('subject'),
    _default = (0, _symbol2.default)('default'),
    _props = (0, _symbol2.default)('props');

var SpriteAttr = (_dec = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringFloat, _spriteUtils.oneOrTwoValues), _dec2 = (0, _spriteUtils.parseValue)(parseFloat), _dec3 = (0, _spriteUtils.parseValue)(parseFloat), _dec4 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt), _dec5 = (0, _spriteUtils.parseValue)(_spriteUtils.parseColorString), _dec6 = (0, _spriteUtils.parseValue)(function (val) {
  return val ? parseFloat(val) : val;
}), _dec7 = (0, _spriteUtils.parseValue)(function (val) {
  return val ? parseFloat(val) : val;
}), _dec8 = (0, _spriteUtils.parseValue)(function (val) {
  return val ? parseFloat(val) : val;
}), _dec9 = (0, _spriteUtils.parseValue)(function (val) {
  return val ? parseFloat(val) : val;
}), _dec10 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt), _dec11 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringInt, _spriteUtils.fourValuesShortCut), _dec12 = (0, _spriteUtils.parseValue)(parseFloat), _dec13 = (0, _spriteUtils.parseValue)(parseFloat), _dec14 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringTransform), _dec15 = (0, _spriteUtils.parseValue)(parseFloat), _dec16 = (0, _spriteUtils.parseValue)(_spriteUtils.parseStringFloat, _spriteUtils.oneOrTwoValues), _dec17 = (0, _spriteUtils.deprecate)('Instead use attr.gradients.'), _dec18 = (0, _spriteUtils.parseValue)(parseFloat), _dec19 = (0, _spriteUtils.parseValue)(parseFloat), (_class = function () {
  function SpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, SpriteAttr);

    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_props] = {};

    this.setDefault({
      anchor: [0, 0],
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      layoutWidth: '',
      layoutHeight: '',
      bgcolor: '',
      flex: '',
      order: 0,
      position: '',
      alignSelf: '',
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transform: 'matrix(1,0,0,1,0,0)',
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      border: {
        width: 0,
        color: 'rgba(0,0,0,0)',
        style: 'solid'
      },
      // border: [0, 'rgba(0,0,0,0)'],
      borderRadius: 0,
      boxSizing: 'content-box',
      dashOffset: 0,
      display: '',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      zIndex: 0,
      offsetRotate: 'auto',
      gradients: {},
      offsetDistance: 0,
      filter: '', // filter: {blur, ...}
      shadow: '', // shadow: {color = 'rgba(0,0,0,1)', blur = 1[, offset]}
      bgimage: ''
    }, {
      pos: function pos() {
        return [this.x, this.y];
      },
      size: function size() {
        return [this.width, this.height];
      },
      linearGradients: function linearGradients() {
        /* istanbul ignore next  */
        return this.gradients;
      }
    });
    this[_temp] = new _map2.default(); // save non-serialized values
  }

  (0, _createClass3.default)(SpriteAttr, [{
    key: 'setDefault',
    value: function setDefault(attrs) {
      var _this = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _assign2.default)(this[_default], attrs);
      (0, _assign2.default)(this[_attr], attrs);
      var _p = {};
      (0, _entries2.default)(props).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            prop = _ref2[0],
            getter = _ref2[1];

        _p[prop] = {
          get: getter.bind(_this)
        };
      });
      (0, _defineProperties2.default)(this[_attr], _p);
      (0, _assign2.default)(this[_props], _p);
    }
  }, {
    key: 'saveObj',
    value: function saveObj(key, val) {
      this[_temp].set(key, val);
      this.__updateTag = true;
    }
  }, {
    key: 'loadObj',
    value: function loadObj(key) {
      return this[_temp].get(key);
    }
  }, {
    key: 'quietSet',
    value: function quietSet(key, val) {
      this[_attr][key] = val;
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      if (val == null) {
        val = this[_default][key];
      }
      if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
        var oldVal = this[_attr][key];
        if (oldVal !== val && (0, _stringify2.default)(val) === (0, _stringify2.default)(oldVal)) {
          return;
        }
      }
      this[_attr][key] = val;
      this.__updateTag = true;
      // auto reflow
      if (key === 'width' || key === 'height' || key === 'layoutWidth' || key === 'layoutHeight' || key === 'display' || key === 'anchor' || key === 'border' || key === 'padding' || key === 'boxSizing' || key === 'margin' || key === 'flex') {
        this.__reflowTag = true;
      }
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this[_attr][key];
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this.__clearCacheTag = true;
      return this;
    }
  }, {
    key: 'clearFlow',
    value: function clearFlow() {
      this.__reflowTag = true;
      return this;
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      var _this2 = this;

      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }
      (0, _entries2.default)(attrs).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (_this2[_default][key] !== value) {
          if (key !== 'offsetPath' && key !== 'offsetDistance' && key !== 'offsetRotate' && key !== 'offsetAngle' && key !== 'offsetPoint') {
            _this2[key] = value;
          } else if (key === 'offsetPath') {
            var offsetPath = new _svgPathToCanvas2.default(value);
            _this2.set('offsetPath', offsetPath.d);
            _this2.saveObj('offsetPath', offsetPath);
          } else {
            _this2.set(key, value);
          }
        }
      });

      return this;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var attrs = this.attrs;
      delete attrs.id;
      var offsetAngle = this.get('offsetAngle');
      if (offsetAngle != null) attrs.offsetAngle = offsetAngle;
      var offsetPoint = this.get('offsetPoint');
      if (offsetPoint != null) attrs.offsetPoint = offsetPoint;
      return (0, _stringify2.default)(attrs);
    }
  }, {
    key: 'resetOffset',
    value: function resetOffset() {
      var offsetPath = this.get('offsetPath');
      var dis = this.offsetDistance;

      if (offsetPath) {
        var pathObj = this.loadObj('offsetPath');
        if (pathObj) {
          offsetPath = pathObj;
        } else {
          offsetPath = new _svgPathToCanvas2.default(offsetPath);
          this.saveObj('offsetPath', offsetPath);
        }
      }

      if (offsetPath != null) {
        var len = dis * offsetPath.getTotalLength();

        var _offsetPath$getPointA = offsetPath.getPointAtLength(len),
            _offsetPath$getPointA2 = (0, _slicedToArray3.default)(_offsetPath$getPointA, 2),
            x = _offsetPath$getPointA2[0],
            y = _offsetPath$getPointA2[1];

        var angle = this.offsetRotate;

        if (angle === 'auto' || angle === 'reverse') {
          if (angle === 'reverse' && len === 0) {
            len = 1;
          }

          var _offsetPath$getPointA3 = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1),
              _offsetPath$getPointA4 = (0, _slicedToArray3.default)(_offsetPath$getPointA3, 2),
              x1 = _offsetPath$getPointA4[0],
              y1 = _offsetPath$getPointA4[1];

          if (x1 === x && y1 === y) {
            // last point
            angle = this.get('offsetAngle');
          } else {
            angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
          }

          if (this.offsetRotate === 'reverse') {
            angle = -angle;
          }
        }

        var offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        this.set('offsetAngle', angle);
        this.rotate += angle;

        var offsetPoint = this.get('offsetPoint');
        if (offsetPoint) {
          this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
        }

        this.set('offsetPoint', [x, y]);
        this.pos = [this.x + x, this.y + y];
      }
    }
  }, {
    key: 'attrs',
    get: function get() {
      var _this3 = this;

      var ret = {};
      this.__attributeNames.forEach(function (key) {
        if (key in _this3[_props]) {
          (0, _defineProperty2.default)(ret, key, _this3[_props][key]);
        } else if (key !== 'x' && key !== 'y' && key !== 'width' && key !== 'height') {
          ret[key] = _this3[key];
        } else {
          ret[key] = _this3.get(key);
        }
      });
      return ret;
    }
  }, {
    key: 'subject',
    get: function get() {
      return this[_subject];
    }

    /* ------------------- define attributes ----------------------- */

  }, {
    key: 'id',
    set: function set(val) {
      return this.quietSet('id', String(val));
    }
  }, {
    key: 'name',
    set: function set(val) {
      return this.quietSet('name', String(val));
    }
  }, {
    key: 'anchor',
    set: function set(val) {
      this.set('anchor', val);
    }
  }, {
    key: 'display',
    set: function set(val) {
      this.clearCache();
      this.set('display', val);
    }
  }, {
    key: 'x',
    set: function set(val) {
      if (this.subject.hasLayout) {
        this.set('layoutX', val);
      } else {
        this.set('x', val);
      }
    },
    get: function get() {
      if (this.subject.hasLayout) {
        var layoutX = this.get('layoutX');
        return layoutX !== '' ? layoutX : this.get('x');
      }
      return this.get('x');
    }
  }, {
    key: 'y',
    set: function set(val) {
      if (this.subject.hasLayout) {
        this.set('layoutY', val);
      } else {
        this.set('y', val);
      }
    },
    get: function get() {
      if (this.subject.hasLayout) {
        var layoutY = this.get('layoutY');
        return layoutY !== '' ? layoutY : this.get('y');
      }
      return this.get('y');
    }
  }, {
    key: 'pos',
    set: function set(val) {
      if (val == null) {
        val = [0, 0];
      }

      var _val = val,
          _val2 = (0, _slicedToArray3.default)(_val, 2),
          x = _val2[0],
          y = _val2[1];

      this.x = x;
      this.y = y;
    }
  }, {
    key: 'bgcolor',
    set: function set(val) {
      this.clearCache();
      this.set('bgcolor', val);
    }
  }, {
    key: 'opacity',
    set: function set(val) {
      this.set('opacity', val);
    }
  }, {
    key: 'width',
    set: function set(val) {
      this.clearCache();
      this.set('width', val);
    }
  }, {
    key: 'height',
    set: function set(val) {
      this.clearCache();
      this.set('height', val);
    }
  }, {
    key: 'layoutWidth',
    set: function set(val) {
      this.clearCache();
      this.set('layoutWidth', val);
    }
  }, {
    key: 'layoutHeight',
    set: function set(val) {
      this.clearCache();
      this.set('layoutHeight', val);
    }
  }, {
    key: 'size',
    set: function set(val) {
      if (val == null) {
        val = ['', ''];
      }

      var _val3 = val,
          _val4 = (0, _slicedToArray3.default)(_val3, 2),
          width = _val4[0],
          height = _val4[1];

      this.width = width;
      this.height = height;
    }
  }, {
    key: 'border',
    set: function set(val) {
      this.clearCache();
      if (val == null) {
        this.set('border', null);
        return;
      }
      if (typeof val === 'number' || typeof val === 'string') {
        val = {
          width: parseFloat(val)
        };
      } else if (Array.isArray(val)) {
        val = {
          width: parseFloat(val[0]),
          color: (0, _spriteUtils.parseColorString)(val[1] || '#000')
        };
      } else {
        val.width = parseFloat(val.width);
        val.color = (0, _spriteUtils.parseColorString)(val.color || '#000');
      }
      val = (0, _assign2.default)({
        width: 1,
        color: (0, _spriteUtils.parseColorString)('#000'),
        style: 'solid'
      }, val);
      this.set('border', val);
    }
  }, {
    key: 'padding',
    set: function set(val) {
      this.clearCache();
      this.set('padding', val);
    }
  }, {
    key: 'borderRadius',
    set: function set(val) {
      this.clearCache();
      this.set('borderRadius', val);
    }
  }, {
    key: 'boxSizing',
    set: function set(val) {
      this.clearCache();
      this.set('boxSizing', val);
    }
  }, {
    key: 'dashOffset',
    set: function set(val) {
      this.clearCache();
      this.set('dashOffset', val);
    }

    // transform attributes

  }, {
    key: 'transform',
    set: function set(val) {
      var _this4 = this;

      /*
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0],
        matrix: [1,0,0,1,0,0],
       */
      (0, _assign2.default)(this[_attr], {
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0]
      });

      if (Array.isArray(val)) {
        this.set('transformMatrix', val);
        this.set('transform', 'matrix(' + val + ')');
      } else {
        this.set('transformMatrix', [1, 0, 0, 1, 0, 0]);
        var transformStr = [];

        (0, _entries2.default)(val).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          if (key === 'matrix' && Array.isArray(value)) {
            _this4.set('transformMatrix', new _spriteMath.Matrix(value).m);
          } else {
            _this4[key] = value;
          }
          transformStr.push(key + '(' + value + ')');
        });

        this.set('transform', transformStr.join(' '));
      }
    }
  }, {
    key: 'transformOrigin',
    set: function set(val) {
      this.set('transformOrigin', val);
    }
  }, {
    key: 'rotate',
    set: function set(val) {
      var delta = this.get('rotate') - val;
      this.set('rotate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix')).rotate(-delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'scale',
    set: function set(val) {
      val = (0, _spriteUtils.oneOrTwoValues)(val).map(function (v) {
        if (Math.abs(v) > 0.001) {
          return v;
        }
        return 1 / v > 0 ? 0.001 : -0.001;
      });
      var oldVal = this.get('scale') || [1, 1];
      var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
      this.set('scale', val);

      var offsetAngle = this.get('offsetAngle');
      if (offsetAngle) {
        this.rotate -= offsetAngle;
      }

      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.scale.apply(transform, delta);
      this.set('transformMatrix', transform.m);

      if (offsetAngle) {
        this.rotate += offsetAngle;
      }
    }
  }, {
    key: 'translate',
    set: function set(val) {
      var oldVal = this.get('translate') || [0, 0];
      var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
      this.set('translate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.translate.apply(transform, delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'skew',
    set: function set(val) {
      var _ref7, _transform$multiply;

      var oldVal = this.get('skew') || [0, 0];
      var invm = (_ref7 = new _spriteMath.Matrix()).skew.apply(_ref7, (0, _toConsumableArray3.default)(oldVal)).inverse();
      this.set('skew', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray3.default)(val));
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: 'zIndex',
    set: function set(val) {
      this.set('zIndex', val);
    }

    /**
      linearGradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],
          vector: [x1, y1, x2, y2], // direction/rect or from/to
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: 'linearGradients',
    set: function set(val) /* istanbul ignore next  */{
      this.gradients = val;
    }

    /**
      gradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],  // rect + direction or vector
          vector: [x1, y1, r1, x2, y2, r2], // vector.length -> linear or radial
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: 'gradients',
    set: function set(val) {
      this.clearCache();
      this.set('gradients', val);
    }
  }, {
    key: 'offsetPath',
    set: function set(val) {
      var offsetPath = new _svgPathToCanvas2.default(val);

      this.set('offsetPath', offsetPath.d);
      this.saveObj('offsetPath', offsetPath);
      this.resetOffset();
    }
  }, {
    key: 'offsetDistance',
    set: function set(val) {
      this.set('offsetDistance', val);
      this.resetOffset();
    }
  }, {
    key: 'offsetRotate',
    set: function set(val) {
      if (typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
        val = parseFloat(val);
      }
      this.set('offsetRotate', val);
      this.resetOffset();
    }
  }, {
    key: 'filter',
    set: function set(val) {
      this.set('filter', val);
    }
  }, {
    key: 'shadow',
    set: function set(val) {
      this.set('shadow', val);
    }
  }, {
    key: 'flex',
    set: function set(val) {
      if (this.subject.hasLayout) this.subject.parent.clearLayout();
      this.set('flex', val);
    }
  }, {
    key: 'order',
    set: function set(val) {
      if (this.subject.hasLayout) this.subject.parent.clearLayout();
      this.set('order', val);
    }
  }, {
    key: 'position',
    set: function set(val) {
      if (this.subject.hasLayout) this.subject.parent.clearLayout();
      this.set('position', val);
    }
  }, {
    key: 'alignSelf',
    set: function set(val) {
      if (this.subject.hasLayout) this.subject.parent.clearLayout();
      this.set('alignSelf', val);
    }
  }, {
    key: 'margin',
    set: function set(val) {
      if (this.subject.hasLayout) this.subject.parent.clearLayout();
      this.set('margin', val);
    }

    /*
      {
        src: image | url,
        display: 'none' | 'repeatX' | 'repeatY' | 'repeat' | 'stretch' | 'center' | '.9',
        offset: [x, y],
        clip9: [paddingTop, paddingRight, paddingBottom, paddingLeft],
      }
    */

  }, {
    key: 'bgimage',
    set: function set(val) {
      this.clearCache();
      if (val && val.clip9) val.clip9 = (0, _spriteUtils.fourValuesShortCut)(val.clip9);
      if (val && !val.image && this.subject.loadBgImage) {
        val = this.subject.loadBgImage(val);
      }
      this.set('bgimage', val);
    }
  }]);
  return SpriteAttr;
}(), (_applyDecoratedDescriptor(_class.prototype, 'id', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'id'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'name', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'name'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'anchor', [_dec, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'anchor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'display', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'display'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'x', [_dec2, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'x'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'y', [_dec3, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'y'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pos', [_dec4, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'pos'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bgcolor', [_dec5, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'bgcolor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'opacity', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'opacity'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_dec6, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_dec7, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutWidth', [_dec8, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutHeight', [_dec9, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'size', [_dec10, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'size'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'border', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'border'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'padding', [_dec11, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'padding'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'borderRadius', [_dec12, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'borderRadius'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'boxSizing', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'boxSizing'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dashOffset', [_dec13, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'dashOffset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'transform', [_dec14, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'transform'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'transformOrigin', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'transformOrigin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rotate', [_dec15, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rotate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scale', [_dec16, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'translate', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'translate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'skew', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'skew'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'zIndex', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'zIndex'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'linearGradients', [_dec17, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'linearGradients'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'gradients', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'gradients'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetPath', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetPath'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetDistance', [_dec18, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetDistance'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetRotate', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetRotate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'filter', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'filter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'shadow', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'shadow'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flex', [_dec19, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flex'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'order', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'order'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'position', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'position'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'alignSelf', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'alignSelf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'margin', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'margin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bgimage', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'bgimage'), _class.prototype)), _class));
exports.default = SpriteAttr;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(193), __esModule: true };

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(194);
var $Object = __webpack_require__(20).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(28), 'Object', { defineProperties: __webpack_require__(37) });


/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = function (target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _from = __webpack_require__(62);

var _from2 = _interopRequireDefault(_from);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventHandlers = (0, _symbol2.default)('eventHandlers'),
    _collisionState = (0, _symbol2.default)('collisionState'),
    _data = (0, _symbol2.default)('data'),
    _mouseCapture = (0, _symbol2.default)('mouseCapture');

var BaseNode = function () {
  function BaseNode() {
    (0, _classCallCheck3.default)(this, BaseNode);

    this[_eventHandlers] = {};
    this[_data] = {};
  }

  (0, _createClass3.default)(BaseNode, [{
    key: 'data',
    value: function data(props, val) {
      var _this = this;

      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _entries2.default)(props).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              prop = _ref2[0],
              value = _ref2[1];

          _this.data(prop, value);
        });
        return this;
      }if (typeof props === 'string') {
        if (val !== undefined) {
          if (typeof val === 'function') {
            val = val(this[_data][props]);
          }
          if (val && typeof val.then === 'function') {
            return val.then(function (res) {
              _this[_data][props] = res;
            });
          }
          this[_data][props] = val;
          return this;
        }
        return this[_data][props];
      }
      return this[_data];
    }
  }, {
    key: 'getEventHandlers',
    value: function getEventHandlers(type) {
      return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      var _this2 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this2.on(t, handler);
        });
      } else {
        this[_eventHandlers][type] = this[_eventHandlers][type] || [];
        this[_eventHandlers][type].push(handler);
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      var _this3 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this3.off(t, handler);
        });
      } else if (handler && this[_eventHandlers][type]) {
        var idx = this[_eventHandlers][type].indexOf(handler);

        if (idx >= 0) {
          this[_eventHandlers][type].splice(idx, 1);
        }
      } else {
        delete this[_eventHandlers][type];
      }
      return this;
    }

    // d3-friendly

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, handler) {
      return this.on(type, handler);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, handler) {
      return this.off(type, handler);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      throw Error('you mast override this method');
    }
  }, {
    key: 'setMouseCapture',
    value: function setMouseCapture() {
      this[_mouseCapture] = true;
    }
  }, {
    key: 'releaseMouseCapture',
    value: function releaseMouseCapture() {
      this[_mouseCapture] = false;
    }
  }, {
    key: 'isCaptured',
    value: function isCaptured(evt) {
      return (evt.type === 'mousemove' || evt.type === 'mousedown' || evt.type === 'mouseup') && this[_mouseCapture];
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this4 = this;

      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var handlers = this.getEventHandlers(type);
      if (swallow && handlers.length === 0) {
        return;
      }
      if (!evt.stopDispatch) {
        evt.stopDispatch = function () {
          evt.terminated = true;
        };
      }
      if (evt.type !== type) {
        if (evt.type) {
          evt.originalType = evt.type;
        }
        evt.type = type;
      }

      var isCollision = collisionState || this.pointCollision(evt);
      var captured = this.isCaptured(evt);

      if (!evt.terminated && (isCollision || captured)) {
        evt.target = this;

        var changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;
        if (changedTouches) {
          if (type === 'touchstart') {
            var touch = changedTouches[0],
                layer = this.layer;
            if (touch && touch.identifier != null) {
              layer.touchedTargets[touch.identifier] = layer.touchedTargets[touch.identifier] || [];
              layer.touchedTargets[touch.identifier].push(this);
            }
          }
          if (type.startsWith('touch')) {
            var touches = (0, _from2.default)(evt.originalEvent.touches),
                _layer = this.layer;
            evt.targetTouches = [];

            touches.forEach(function (touch) {
              var identifier = touch.identifier;
              if (_layer.touchedTargets[identifier] && _layer.touchedTargets[identifier].indexOf(_this4) >= 0) {
                evt.targetTouches.push(touch);
              }
            });
            evt.touches = touches;
            evt.changedTouches = (0, _from2.default)(changedTouches);
          }
        }

        handlers.forEach(function (handler) {
          return handler.call(_this4, evt);
        });

        if (!this[_collisionState] && isCollision && type === 'mousemove') {
          var _evt = (0, _assign2.default)({}, evt);
          _evt.type = 'mouseenter';
          _evt.terminated = false;
          this.dispatchEvent('mouseenter', _evt, true);
          this[_collisionState] = true;
        }
      }

      if (this[_collisionState] && !isCollision && type === 'mousemove') {
        var _evt2 = (0, _assign2.default)({}, evt);
        _evt2.type = 'mouseleave';
        _evt2.target = this;
        _evt2.terminated = false;
        this.dispatchEvent('mouseleave', _evt2, true);
        this[_collisionState] = false;
      }

      return isCollision;
    }
  }, {
    key: 'connect',


    // called when layer appendChild
    value: function connect(parent) {
      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.parent) {
        // throw new Error('This node belongs to another parent node! Remove it first...')
        this.disconnect(this.parent);
      }

      Object.defineProperty(this, 'zOrder', {
        value: zOrder,
        writable: false,
        configurable: true
      });

      Object.defineProperty(this, 'parent', {
        get: function get() {
          return parent;
        },
        configurable: true
      });

      var handlers = this[_eventHandlers].append;
      if (handlers && handlers.length) {
        this.dispatchEvent('append', {
          parent: parent,
          zOrder: zOrder
        }, true, true);
      }

      return this;
    }

    // override to recycling resources

  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (!this.parent || parent !== this.parent) {
        throw new Error('Invalid node to disconnect');
      }

      var zOrder = this.zOrder;
      delete this.zOrder;

      var handlers = this[_eventHandlers].remove;
      if (handlers && handlers.length) {
        this.dispatchEvent('remove', {
          parent: parent,
          zOrder: zOrder
        }, true, true);
      }

      delete this.parent;
      delete this.isDirty;

      return this;
    }
  }, {
    key: 'dataset',
    get: function get() {
      return this[_data];
    }
  }, {
    key: 'parentNode',
    get: function get() {
      return this.parent;
    }
  }]);
  return BaseNode;
}();

exports.default = BaseNode;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = __webpack_require__(132);

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _spriteAnimator = __webpack_require__(2);

var _fastAnimationFrame = __webpack_require__(198);

var _spriteMath = __webpack_require__(143);

var _spriteUtils = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEffect = _spriteAnimator.Effects.default;

function arrayEffect(arr1, arr2, p, start, end) {
  if (Array.isArray(arr1)) {
    return arr1.map(function (o, i) {
      return defaultEffect(o, arr2[i], p, start, end);
    });
  }
  return defaultEffect(arr1, arr2, p, start, end);
}

function objectEffect(obj1, obj2, p, start, end) {
  var t1 = (0, _assign2.default)({}, obj2, obj1),
      t2 = (0, _assign2.default)({}, obj1, obj2);

  (0, _entries2.default)(t1).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    t1[key] = arrayEffect(value, t2[key], p, start, end);
  });

  return t1;
}

function getTransformMatrix(trans) {
  var matrix = new _spriteMath.Matrix();
  (0, _entries2.default)(trans).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    if (key === 'matrix') {
      matrix = new _spriteMath.Matrix(val);
    } else if (Array.isArray(val)) {
      var _matrix;

      (_matrix = matrix)[key].apply(_matrix, (0, _toConsumableArray3.default)(val));
    } else if (key === 'scale') {
      matrix.scale(val, val);
    } else {
      matrix[key](val);
    }
  });
  return matrix.m;
}

function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function transformEffect(trans1, trans2, p, start, end) {
  trans1 = (0, _spriteUtils.parseStringTransform)(trans1);
  trans2 = (0, _spriteUtils.parseStringTransform)(trans2);

  if (!arrayEqual((0, _keys2.default)(trans1), (0, _keys2.default)(trans2))) {
    trans1 = getTransformMatrix(trans1);
    trans2 = getTransformMatrix(trans2);
  }

  if (Array.isArray(trans1) || Array.isArray(trans2)) {
    return arrayEffect(trans1, trans2, p, start, end);
  }
  return objectEffect(trans1, trans2, p, start, end);
}

function colorEffect(color1, color2, p, start, end) {
  var c1 = (0, _spriteUtils.parseColor)(color1);
  var c2 = (0, _spriteUtils.parseColor)(color2);

  if (c1.model === c2.model) {
    c1.value = arrayEffect(c1.value, c2.value, p, start, end).map(function (c, i) {
      return i < 3 ? Math.round(c) : Math.round(c * 100) / 100;
    });
    return c1.str;
  }

  return defaultEffect(color1, color2, p, start, end);
}

(0, _assign2.default)(_spriteAnimator.Effects, {
  arrayEffect: arrayEffect,
  transformEffect: transformEffect,
  colorEffect: colorEffect,
  pos: arrayEffect,
  size: arrayEffect,
  transform: transformEffect,
  bgcolor: colorEffect,
  border: function border(v1, v2, p, start, end) {
    return {
      width: defaultEffect(v1.width, v2.width, p, start, end),
      color: colorEffect(v1.color, v2.color, p, start, end),
      style: arrayEffect(v1.style, v2.style, p, start, end)
    };
  },

  scale: arrayEffect,
  translate: arrayEffect,
  skew: arrayEffect,
  color: colorEffect,
  strokeColor: colorEffect,
  fillColor: colorEffect
});

var _default = function (_Animator) {
  (0, _inherits3.default)(_default, _Animator);

  function _default(sprite, frames, timing) {
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this, sprite.attr(), frames, timing));

    _this.target = sprite;
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'finish',
    value: function finish() {
      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'finish', this).call(this);
      (0, _fastAnimationFrame.cancelAnimationFrame)(this.requestId);
      var sprite = this.target;
      sprite.attr(this.frame);
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.target.parent || this.playState === 'running') {
        return;
      }

      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'play', this).call(this);

      var sprite = this.target;

      sprite.attr(this.frame);

      var that = this;
      this.ready.then(function () {
        sprite.attr(that.frame);
        that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(function update() {
          var target = that.target;
          if (typeof document !== 'undefined' && document.documentElement && document.documentElement.contains && target.layer && target.layer.canvas && !document.documentElement.contains(target.layer.canvas)) {
            // if dom element has been removed stop animation.
            // it usually occurs in single page applications.
            that.cancel();
            return;
          }
          var playState = that.playState;
          sprite.attr(that.frame);
          if (playState === 'idle') return;
          if (playState === 'running') {
            that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(update);
          } else if (playState === 'paused' || playState === 'pending' && that.timeline.currentTime < 0) {
            // playbackRate < 0 will cause playState reset to pending...
            that.ready.then(function () {
              sprite.attr(that.frame);
              that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(update);
            });
          }
        });
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      var preserveState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      (0, _fastAnimationFrame.cancelAnimationFrame)(this.requestId);
      if (preserveState) {
        this.target.attr(this.frame);
        (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'cancel', this).call(this);
      } else {
        (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'cancel', this).call(this);
        this.target.attr(this.frame);
      }
    }
  }, {
    key: 'playState',
    get: function get() {
      if (!this.target.parent) {
        return 'idle';
      }
      return (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'playState', this);
    }
  }, {
    key: 'finished',
    get: function get() {
      var _this2 = this;

      // set last frame when finished
      // because while the web page is not focused
      // requestAnimationFrame will not trigger while deferTime of
      // the animator is still running
      var sprite = this.target;
      return (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'finished', this).then(function () {
        sprite.attr(_this2.frame);
        (0, _fastAnimationFrame.cancelAnimationFrame)(_this2.requestId);
      });
    }
  }]);
  return _default;
}(_spriteAnimator.Animator);

exports.default = _default;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = undefined;

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
function nowtime() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }if (typeof process !== 'undefined' && process.hrtime) {
    var _process$hrtime = process.hrtime(),
        _process$hrtime2 = (0, _slicedToArray3.default)(_process$hrtime, 2),
        s = _process$hrtime2[0],
        ns = _process$hrtime2[1];

    return s * 1e3 + ns * 1e-6;
  }
  return Date.now ? Date.now() : new Date().getTime();
}
/* eslint-enable no-undef */

var _requestAnimationFrame = void 0,
    _cancelAnimationFrame = void 0;

if (typeof global.requestAnimationFrame === 'undefined') {
  _requestAnimationFrame = function _requestAnimationFrame(fn) {
    return setTimeout(function () {
      fn(nowtime());
    }, 16);
  };
  _cancelAnimationFrame = function _cancelAnimationFrame(id) {
    return clearTimeout(id);
  };
} else {
  _requestAnimationFrame = global.requestAnimationFrame;
  _cancelAnimationFrame = global.cancelAnimationFrame;
}

var steps = new _map2.default();
var timerId = void 0;

var requestAnimationFrame = function requestAnimationFrame(step) {
  var id = (0, _symbol2.default)('requestId');
  steps.set(id, step);

  if (timerId == null) {
    timerId = _requestAnimationFrame(function (t) {
      timerId = null;[].concat((0, _toConsumableArray3.default)(steps)).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            id = _ref2[0],
            callback = _ref2[1];

        callback(t);
        steps.delete(id);
      });
    });
  }
  return id;
};

var cancelAnimationFrame = function cancelAnimationFrame(id) {
  steps.delete(id);
  if (!steps.size && timerId) {
    _cancelAnimationFrame(timerId);
    timerId = null;
  }
};

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(115), __webpack_require__(199)))

/***/ }),
/* 199 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

exports.registerNodeType = registerNodeType;
exports.createNode = createNode;
exports.createElement = createElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeTypes = new _map2.default();

/* istanbul ignore next  */
var ownerDocumentDescriptor = {
  get: function get() {
    var that = this;
    return {
      createElementNS: function createElementNS(uri, name) {
        var sprite = createNode(name);
        if (sprite) {
          return that.appendChild(sprite);
        }
        return null;
      }
    };
  }
};

function getAllSubNodes(parent) {
  var children = parent.children;
  return children.reduce(function (list, child) {
    if (child.children) {
      return [].concat((0, _toConsumableArray3.default)(list), [child], (0, _toConsumableArray3.default)(getAllSubNodes(child)));
    }
    return [].concat((0, _toConsumableArray3.default)(list), [child]);
  }, []);
}

function querySelectorLimits(node, functor) {
  var limits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  var nodeList = [];
  var elements = getAllSubNodes(node);
  for (var i = 0; i < elements.length; i++) {
    var _node = elements[i];
    if (functor(_node)) {
      nodeList.push(_node);
      if (limits === nodeList.length) {
        break;
      }
    }
  }
  return nodeList;
}

var elementProto = {
  getElementById: function getElementById(id) {
    var children = getAllSubNodes(this);
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.id === id) {
        return child;
      }
    }
    return null;
  },
  getElementsByName: function getElementsByName(name) {
    return getAllSubNodes(this).filter(function (c) {
      return c.name === name;
    });
  },

  /*
    d3-friendly
    *, nodeType, #id, :name, {nodeType: checker}
  */
  querySelector: function querySelector(selector) {
    var _this = this;

    var ret = null;

    if (!selector || selector === '*') {
      ret = this.children[0];
    } else if (typeof selector === 'string') {
      // querySelector('nodeType')
      // querySelector('#id')
      // querySelector(':name')
      if (selector.startsWith('#')) {
        ret = this.getElementById(selector.slice(1));
      } else if (selector.startsWith(':')) {
        var name = selector.slice(1);
        var nodeList = querySelectorLimits(this, function (c) {
          return c.name === name;
        }, 1);
        if (nodeList.length) ret = nodeList[0];
      } else {
        var nodeType = getNodeType(selector);
        if (nodeType) {
          var _nodeList = querySelectorLimits(this, function (c) {
            return c instanceof nodeType;
          }, 1);
          if (_nodeList.length) ret = _nodeList[0];
        }
      }
    } else {
      /*
        {
          nodeType: () => {...},   //checker
        }
      */
      var _nodeList2 = querySelectorLimits(this, function (child) {
        return (0, _entries2.default)(selector).some(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              type = _ref2[0],
              checker = _ref2[1];

          var nodeType = getNodeType(type);
          return nodeType && child instanceof nodeType && checker.call(_this, child);
        });
      }, 1);
      if (_nodeList2.length) ret = _nodeList2[0];
    }
    return ret;
  },
  querySelectorAll: function querySelectorAll(selector) {
    var _this2 = this;

    var ret = [];

    if (!selector || selector === '*') {
      ret = getAllSubNodes(this);
    } else if (typeof selector === 'string') {
      if (selector.startsWith('#')) {
        var sprite = this.getElementById(selector.slice(1));
        ret = sprite ? [sprite] : [];
      }
      if (selector.startsWith(':')) {
        ret = this.getElementsByName(selector.slice(1));
      }
      var nodeType = getNodeType(selector);
      if (nodeType) {
        ret = querySelectorLimits(this, function (c) {
          return c instanceof nodeType;
        });
      }
    } else {
      ret = querySelectorLimits(this, function (child) {
        return (0, _entries2.default)(selector).some(function (_ref3) {
          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
              type = _ref4[0],
              checker = _ref4[1];

          var nodeType = getNodeType(type);
          if (!nodeType || !(child instanceof nodeType)) {
            return false;
          }
          return checker.call(_this2, child);
        });
      });
    }
    return ret;
  }
};

function registerNodeType(type, Class) {
  var isQuerable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var nodeType = type.toLowerCase();
  var tagName = type.toUpperCase();
  Object.defineProperty(Class.prototype, 'nodeType', {
    get: function get() {
      return nodeType;
    }
  });
  // friendly to snabbdom
  Object.defineProperty(Class.prototype, 'tagName', {
    get: function get() {
      return tagName;
    }
  });
  nodeTypes.set(nodeType, Class);
  if (isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', ownerDocumentDescriptor);
    Class.prototype.namespaceURI = 'http://spritejs.org/' + type;
    (0, _assign2.default)(Class.prototype, elementProto);
  }
}

function createNode(type) {
  var Class = getNodeType(type);
  if (Class) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
  }
  return null;
}

function createElement(type, attrs, content) {
  var Node = typeof type === 'string' ? getNodeType(type) : type;

  if (!Node) return null;

  var sprite = new Node(typeof content === 'string' ? content : undefined);

  if (attrs !== null) {
    sprite.attr(attrs);
  }

  if ((typeof content === 'undefined' ? 'undefined' : (0, _typeof3.default)(content)) === 'object' && sprite.append) {
    if (content instanceof Array) {
      sprite.append.apply(sprite, (0, _toConsumableArray3.default)(content));
    } else {
      sprite.append(content);
    }
  }
  return sprite;
}

function getNodeType(type) {
  return nodeTypes.get(type.toLowerCase());
}

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheContextPool = undefined;

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.drawRadiusBox = drawRadiusBox;
exports.findColor = findColor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawRadiusBox(context, _ref) {
  var x = _ref.x,
      y = _ref.y,
      w = _ref.w,
      h = _ref.h,
      r = _ref.r;

  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

/* istanbul ignore next  */
function gradientBox(angle, rect) {
  var _rect = (0, _slicedToArray3.default)(rect, 4),
      x = _rect[0],
      y = _rect[1],
      w = _rect[2],
      h = _rect[3];

  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }

  var ret = [x, y, x + w, y + h];
  if (angle >= 0 && angle < 90) {
    var tan = Math.tan(Math.PI * angle / 180);

    var d = tan * w;

    if (d <= h) {
      ret = [x, y, x + w, y + d];
    } else {
      d = h / tan;
      ret = [x, y, x + d, y + h];
    }
  } else if (angle >= 90 && angle < 180) {
    var _tan = Math.tan(Math.PI * (angle - 90) / 180);

    var _d = _tan * h;

    if (_d <= w) {
      ret = [x + w, y, x + w - _d, y + h];
    } else {
      _d = w / _tan;
      ret = [x + w, y, x, y + _d];
    }
  } else if (angle >= 180 && angle < 270) {
    var _tan2 = Math.tan(Math.PI * (angle - 180) / 180);

    var _d2 = _tan2 * w;

    if (_d2 <= h) {
      ret = [x + w, y + h, x, y + h - _d2];
    } else {
      _d2 = h / _tan2;
      ret = [x + w, y + h, x + w - _d2, y];
    }
  } else if (angle >= 270 && angle < 360) {
    var _tan3 = Math.tan(Math.PI * (angle - 270) / 180);

    var _d3 = _tan3 * h;

    if (_d3 <= w) {
      ret = [x, y + h, x + _d3, y];
    } else {
      _d3 = w / _tan3;
      ret = [x, y + h, x + w, y + h - _d3];
    }
  }

  return ret;
}

function findColor(context, sprite, prop) {
  var gradients = sprite.attr('gradients') || {};
  var color = prop === 'border' ? sprite.attr(prop).color : sprite.attr(prop),
      gradient = void 0;

  if (gradients[prop]) {
    /* istanbul ignore next */
    gradient = gradients[prop];
  } else if (typeof color !== 'string') {
    gradient = color;
  }

  if (gradient) {
    var _gradient = gradient,
        colors = _gradient.colors,
        vector = _gradient.vector,
        direction = _gradient.direction,
        rect = _gradient.rect;

    /* istanbul ignore if  */

    if (direction != null) {
      if (prop === 'border') {
        rect = rect || [0, 0].concat((0, _toConsumableArray3.default)(sprite.outerSize));
      } else {
        var _sprite$attr = sprite.attr('border'),
            borderWidth = _sprite$attr.width;

        rect = rect || [borderWidth, borderWidth].concat((0, _toConsumableArray3.default)(sprite.innerSize));
      }
      vector = gradientBox(direction, rect);
    }

    if (vector.length === 4) {
      color = context.createLinearGradient.apply(context, (0, _toConsumableArray3.default)(vector));
    } else if (vector.length === 6) {
      color = context.createRadialGradient.apply(context, (0, _toConsumableArray3.default)(vector));
    } /* istanbul ignore next  */else if (vector.length === 3) {
        // for wxapp
        color = context.createCircularGradient.apply(context, (0, _toConsumableArray3.default)(vector));
      } /* istanbul ignore next  */else {
          throw Error('Invalid gradient vector!');
        }

    colors.forEach(function (o) {
      color.addColorStop(o.offset, o.color);
    });
  }

  return color;
}

var contextPool = [],
    maxPollSize = 20;

var cacheContextPool = exports.cacheContextPool = {
  get: function get(context) {
    if (contextPool.length > 0) {
      return contextPool.pop();
    }

    var canvas = context.canvas;
    if (!canvas || !canvas.cloneNode) {
      return;
    }
    var copied = canvas.cloneNode();
    return copied.getContext('2d');
  },
  put: function put() {
    for (var _len = arguments.length, contexts = Array(_len), _key = 0; _key < _len; _key++) {
      contexts[_key] = arguments[_key];
    }

    contexts.every(function (context) {
      context.canvas.width = 0;
      context.canvas.height = 0;
      contextPool.push(context);
      return contextPool.length < maxPollSize;
    });
  },

  get size() {
    return contextPool.length;
  }
};

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _spriteUtils = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  blur: function blur(px) {
    return 'blur(' + (0, _spriteUtils.appendUnit)(px) + ')';
  },
  brightness: function brightness(percent) {
    return 'brightness(' + percent + ')';
  },
  contrast: function contrast(percent) {
    return 'contrast(' + percent + ')';
  },
  dropShadow: function dropShadow(_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 4),
        offsetX = _ref2[0],
        offsetY = _ref2[1],
        shadowRadius = _ref2[2],
        color = _ref2[3];

    return 'drop-shadow(' + (0, _spriteUtils.appendUnit)(offsetX) + ' ' + (0, _spriteUtils.appendUnit)(offsetY) + ' ' + (0, _spriteUtils.appendUnit)(shadowRadius) + ' ' + color + ')';
  },
  grayscale: function grayscale(percent) {
    return 'grayscale(' + percent + ')';
  },
  hueRotate: function hueRotate(value) {
    return 'hue-rotate(' + (0, _spriteUtils.appendUnit)(value, 'deg') + ')';
  },
  invert: function invert(percent) {
    return 'invert(' + percent + ')';
  },
  opacity: function opacity(percent) {
    return 'opacity(' + percent + ')';
  },
  saturate: function saturate(percent) {
    return 'saturate(' + percent + ')';
  },
  sepia: function sepia(percent) {
    return 'sepia(' + percent + ')';
  },
  url: function url(path) {
    return 'url(' + path + ')';
  },
  compile: function compile() {
    var _this = this;

    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _entries2.default)(filter).reduce(function (accumulator, curVal) {
      return accumulator.concat(_this[curVal[0]](curVal[1]));
    }, []).join(' ');
  }
}; // http://www.runoob.com/cssref/css3-pr-filter.html

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__(176);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _desc2, _value2, _class2, _class3, _temp;

var _spriteUtils = __webpack_require__(152);

var _basesprite = __webpack_require__(168);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _filters = __webpack_require__(202);

var _filters2 = _interopRequireDefault(_filters);

var _nodetype = __webpack_require__(200);

var _render = __webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var _texturesCache = (0, _symbol2.default)('_texturesCache');
var _images = (0, _symbol2.default)('_images');

var TextureAttr = (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(TextureAttr, _BaseSprite$Attr);

  function TextureAttr(subject) {
    (0, _classCallCheck3.default)(this, TextureAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextureAttr.__proto__ || (0, _getPrototypeOf2.default)(TextureAttr)).call(this, subject));

    _this.setDefault({
      textures: []
    });
    return _this;
  }

  /*
    {
      image: ...,  //texture resource
      srcRect: ..., //texture clip
      rect: ....,  //texture in sprite offset
      filter: ...  //texture filters
    }
   */


  (0, _createClass3.default)(TextureAttr, [{
    key: 'loadTextures',
    value: function loadTextures(textures) {
      var subject = this.subject;

      // adaptive textures
      var width = 0,
          height = 0;

      subject.images = textures.map(function (texture) {
        var image = texture.image,
            rect = texture.rect,
            srcRect = texture.srcRect;

        var w = void 0,
            h = void 0;
        if (rect) {
          w = rect[2] + rect[0];
          h = rect[3] + rect[1];
        } else if (srcRect) {
          w = srcRect[2];
          h = srcRect[3];
        } else {
          w = image.width;
          h = image.height;
        }
        if (width < w) {
          width = w;
        }
        if (height < h) {
          height = h;
        }
        delete texture.image;
        return image;
      });
      var texturesSize = subject.texturesSize;
      if (!texturesSize || texturesSize[0] !== width || texturesSize[1] !== height) {
        var attrSize = subject.attrSize;
        if (attrSize[0] === '' || attrSize[1] === '') {
          subject.reflow();
        }
      }
      subject.texturesSize = [width, height];
      return textures;
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (!texture.image) {
          texture = { image: texture };
        }
        return texture;
      });

      this.loadTextures(textures);
      this.set('textures', textures);
    }
  }]);
  return TextureAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype)), _class);
var Sprite = (_class2 = (_temp = _class3 = function (_BaseSprite) {
  (0, _inherits3.default)(Sprite, _BaseSprite);

  /**
    new Sprite({
      attr: {
        ...
      },
      attributeChangedCallback: function(prop, oldValue, newValue){
       }
    })
   */
  function Sprite(attr) {
    (0, _classCallCheck3.default)(this, Sprite);

    if (attr && attr.constructor !== Object) {
      attr = { textures: [attr] };
    }

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Sprite.__proto__ || (0, _getPrototypeOf2.default)(Sprite)).call(this));

    _this2[_texturesCache] = new _map2.default();
    if (attr) {
      _this2.attr(attr);
    }
    return _this2;
  }

  (0, _createClass3.default)(Sprite, [{
    key: 'cloneNode',
    value: function cloneNode() {
      var _this3 = this;

      var node = (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'cloneNode', this).call(this);
      if (this.images) {
        node.textures = this.textures.map(function (texture, i) {
          texture.image = _this3.images[i];
          return texture;
        });
      }
      return node;
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var _this4 = this;

      if ((0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'pointCollision', this).call(this, evt)) {
        var textures = this.textures;

        if (textures) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          evt.targetTextures = [];

          var _attr = this.attr('anchor'),
              _attr2 = (0, _slicedToArray3.default)(_attr, 2),
              anchorX = _attr2[0],
              anchorY = _attr2[1],
              _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
              width = _contentSize[0],
              height = _contentSize[1];

          offsetX += width * anchorX;
          offsetY += height * anchorY;

          textures.forEach(function (texture) {
            var _ref = texture.rect || [0, 0].concat((0, _toConsumableArray3.default)(_this4.innerSize)),
                _ref2 = (0, _slicedToArray3.default)(_ref, 4),
                x = _ref2[0],
                y = _ref2[1],
                w = _ref2[2],
                h = _ref2[3];

            if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
              // touched textures
              evt.targetTextures.push(texture);
            }
          });
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var _this5 = this;

      (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'render', this).call(this, t, drawingContext);
      var bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;
      if (!bg && this.textures.length <= 1) {
        this.cachePriority = 0;
      }
      var textures = this.textures;
      var cliped = false;
      if (this.images && this.images.length) {
        textures.forEach(function (texture, i) {
          var img = _this5.images[i];

          var _contentSize2 = (0, _slicedToArray3.default)(_this5.contentSize, 2),
              w = _contentSize2[0],
              h = _contentSize2[1];

          var rect = texture.rect || [0, 0, w, h];
          var srcRect = texture.srcRect;

          if (!cliped && texture.rect && (rect[2] - rect[0] > w || rect[3] - rect[1] > h)) {
            cliped = true;
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          drawingContext.save();

          if (texture.filter) {
            (0, _spriteUtils.setDeprecation)('texture.filter', 'Instead use sprite.attr({filter}).');
            var imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];

            var sx = rect[2] / imgRect[2],
                sy = rect[3] / imgRect[3];

            drawingContext.filter = _filters2.default.compile(texture.filter);

            if (srcRect) {
              drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray3.default)(srcRect), [sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]]));
            } else {
              drawingContext.drawImage(img, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * img.width, sy * img.height);
            }
          } else if (srcRect) {
            drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray3.default)(srcRect), (0, _toConsumableArray3.default)(rect)));
          } else {
            drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray3.default)(rect)));
          }

          drawingContext.restore();
        });
      }
    }
  }, {
    key: 'images',
    set: function set(images) {
      this[_images] = images;
    },
    get: function get() {
      return this[_images];
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      this.attr('textures', textures);
    },
    get: function get() {
      return this.attr('textures');
    }

    // override to adapt textures' size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1];

      var boxSize = this.texturesSize || [0, 0];

      var w = width,
          h = height;


      if (width === '') {
        w = boxSize[0] | 0;
        if (height !== '' && boxSize[1]) {
          w *= height / boxSize[1];
        }
      }
      if (height === '') {
        h = boxSize[1] | 0;
        if (width !== '' && boxSize[0]) {
          h *= width / boxSize[0];
        }
      }

      return [w, h];
    }
  }, {
    key: 'cache',
    set: function set(context) {
      if (context == null) {
        _render.cacheContextPool.put.apply(_render.cacheContextPool, (0, _toConsumableArray3.default)(this[_texturesCache].values()));
        this[_texturesCache].clear();
        return;
      }
      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];

      if (!cacheMap.has(key)) {
        cacheMap.set(key, context);
      }
    },
    get: function get() {
      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];
      if (cacheMap.has(key)) {
        return cacheMap.get(key);
      }
      return null;
    }
  }]);
  return Sprite;
}(_basesprite2.default), _class3.Attr = TextureAttr, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'contentSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'contentSize'), _class2.prototype)), _class2);
exports.default = Sprite;


(0, _nodetype.registerNodeType)('sprite', Sprite);

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _set2 = __webpack_require__(205);

var _set3 = _interopRequireDefault(_set2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _class, _desc2, _value2, _class2, _class3, _temp;

var _spriteUtils = __webpack_require__(152);

var _cssLineBreak = __webpack_require__(206);

var _basesprite = __webpack_require__(168);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = __webpack_require__(200);

var _render = __webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var parseFont = __webpack_require__(211);
var _boxSize = (0, _symbol2.default)('boxSize'),
    _outputText = (0, _symbol2.default)('outputText');

var measureText = function measureText(node, text, font) {
  var lineHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var ctx = node.context;
  if (!ctx) {
    return [0, 0];
  }
  ctx.save();
  ctx.font = font;

  var _ctx$measureText = ctx.measureText(text),
      width = _ctx$measureText.width;

  ctx.restore();

  var letterSpacing = node.attr('letterSpacing');
  if (letterSpacing) {
    width += letterSpacing * (text.length - 1);
  }

  var _parseFont = parseFont(font),
      size = _parseFont.size;

  var height = lineHeight || size * 1.2;

  return [width, height].map(Math.round);
};

function calculTextboxSize(node) {
  if (!node.context) return '';
  var text = node.text,
      font = node.attr('font'),
      lineHeight = node.attr('lineHeight'),
      textIndent = node.attr('textIndent');

  var lines = [];
  var width = 0,
      height = 0;

  node[_outputText] = text;
  var lineBreak = node.attr('lineBreak'),
      textboxWidth = node.hasLayout ? node.attr('layoutWidth') : node.attr('width');

  if (lineBreak !== '' && textboxWidth !== '') {
    var wordBreak = node.attr('wordBreak');

    text.split(/\n/).forEach(function (line) {
      var breaker = (0, _cssLineBreak.LineBreaker)(line, { lineBreak: lineBreak, wordBreak: wordBreak });
      var words = [];
      var bk = breaker.next();
      while (!bk.done) {
        words.push(bk.value.slice());
        bk = breaker.next();
      }
      var l = '';
      words.forEach(function (word) {
        if (!l) {
          l = word;
        } else {
          var ll = '' + l + word;

          var _measureText = measureText(node, ll, font),
              _measureText2 = (0, _slicedToArray3.default)(_measureText, 1),
              w = _measureText2[0];

          if (w > (lines.length === 0 ? textboxWidth - textIndent : textboxWidth)) {
            lines.push(l);
            l = word;
          } else {
            l = ll;
          }
        }
      });
      lines.push(l);
    });
    // lines = node[_outputText].split(/\n/)
    node[_outputText] = lines.join('\n');
  } else {
    lines = text.split(/\n/);
  }

  lines.forEach(function (line, idx) {
    var _measureText3 = measureText(node, line, font, lineHeight),
        _measureText4 = (0, _slicedToArray3.default)(_measureText3, 2),
        w = _measureText4[0],
        h = _measureText4[1];

    if (idx === 0) w += textIndent;
    width = Math.max(width, w);
    height += h;
  });

  var boxSize = node[_boxSize];
  if (!boxSize || boxSize[0] !== width || boxSize[1] !== height) {
    var attrSize = node.attrSize;
    if (attrSize[0] === '' || attrSize[1] === '') {
      node.reflow();
    }
  }
  node[_boxSize] = [width, height];
}

var LabelSpriteAttr = (_dec = (0, _spriteUtils.parseValue)(parseFloat), _dec2 = (0, _spriteUtils.parseValue)(_spriteUtils.parseColorString), _dec3 = (0, _spriteUtils.parseValue)(_spriteUtils.parseColorString), _dec4 = (0, _spriteUtils.parseValue)(parseFloat), _dec5 = (0, _spriteUtils.parseValue)(parseFloat), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(LabelSpriteAttr, _BaseSprite$Attr);

  function LabelSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, LabelSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LabelSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(LabelSpriteAttr)).call(this, subject));

    _this.setDefault({
      font: '16px Arial',
      textAlign: 'left',
      strokeColor: '',
      fillColor: '',
      lineHeight: '',
      text: '',
      flexible: false,
      lineBreak: '',
      wordBreak: 'normal',
      letterSpacing: 0,
      textIndent: 0
    }, {
      color: function color() {
        return this.fillColor;
      }
    });
    return _this;
  }

  (0, _createClass3.default)(LabelSpriteAttr, [{
    key: 'text',
    set: function set(val) {
      this.clearCache();
      val = String(val);
      this.set('text', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'font',
    set: function set(val) {
      this.clearCache();
      this.set('font', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'lineHeight',
    set: function set(val) {
      this.clearCache();
      this.set('lineHeight', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'textAlign',
    set: function set(val) {
      this.clearCache();
      this.set('textAlign', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.fillColor = val;
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.clearCache();
      this.set('strokeColor', val);
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.clearCache();
      this.set('fillColor', val);
    }
  }, {
    key: 'flexible',
    set: function set(val) {
      this.clearCache();
      this.set('flexible', val);
    }
  }, {
    key: 'lineBreak',
    set: function set(val) {
      // normal, strict, none
      this.clearCache();
      this.set('lineBreak', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'wordBreak',
    set: function set(val) {
      // normal | break-all | break-word | keep-all
      this.clearCache();
      this.set('wordBreak', val);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'letterSpacing',
    set: function set(value) {
      this.clearCache();
      this.set('letterSpacing', value);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'textIndent',
    set: function set(value) {
      this.clearCache();
      this.set('textIndent', value);
      calculTextboxSize(this.subject);
    }
  }, {
    key: 'width',
    set: function set(val) {
      if (this.lineBreak !== '') calculTextboxSize(this.subject);
      (0, _set3.default)(LabelSpriteAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(LabelSpriteAttr.prototype), 'width', val, this);
    }
  }, {
    key: 'layoutWidth',
    set: function set(val) {
      if (this.lineBreak !== '') calculTextboxSize(this.subject);
      (0, _set3.default)(LabelSpriteAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(LabelSpriteAttr.prototype), 'layoutWidth', val, this);
    }
  }]);
  return LabelSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'text', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'text'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'font', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'font'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineHeight', [_dec, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textAlign', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textAlign'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_dec2, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_dec3, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexible', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexible'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineBreak', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineBreak'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'wordBreak', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'wordBreak'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'letterSpacing', [_dec4, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'letterSpacing'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textIndent', [_dec5, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textIndent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutWidth'), _class.prototype)), _class));
var Label = (_class2 = (_temp = _class3 = function (_BaseSprite) {
  (0, _inherits3.default)(Label, _BaseSprite);

  function Label(attr) {
    (0, _classCallCheck3.default)(this, Label);

    if (typeof attr === 'string') {
      attr = { text: attr };
    }
    return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).call(this, attr));
  }

  (0, _createClass3.default)(Label, [{
    key: 'render',
    value: function render(t, drawingContext) {
      var _this3 = this;

      (0, _get3.default)(Label.prototype.__proto__ || (0, _getPrototypeOf2.default)(Label.prototype), 'render', this).call(this, t, drawingContext);

      var textAlign = this.attr('textAlign'),
          flexible = this.attr('flexible'),
          font = flexible ? this.flexibleFont : this.attr('font'),
          lineHeight = this.attr('lineHeight');

      var text = this.text;

      if (text) {
        var _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            w = _contentSize[0],
            h = _contentSize[1];

        if (!this[_outputText]) calculTextboxSize(this);
        text = this[_outputText] || this.text;

        if (this.textboxSize[0] > w || this.textboxSize[1] > h) {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, w, h);
          drawingContext.clip();
        }
        drawingContext.font = font;
        var lines = text.split(/\n/);

        drawingContext.textBaseline = 'top';

        var align = textAlign;

        drawingContext.textBaseline = 'middle';

        var strokeColor = (0, _render.findColor)(drawingContext, this, 'strokeColor');
        if (strokeColor) {
          drawingContext.strokeStyle = strokeColor;
        }

        var fillColor = (0, _render.findColor)(drawingContext, this, 'fillColor');

        if (!strokeColor && !fillColor) {
          fillColor = (0, _spriteUtils.parseColorString)('black');
        }
        if (fillColor) {
          drawingContext.fillStyle = fillColor;
        }

        var top = 0;
        var width = this.contentSize[0];
        var letterSpacing = this.attr('letterSpacing'),
            textIndent = this.attr('textIndent');

        lines.forEach(function (line, idx) {
          var _measureText5 = measureText(_this3, line, font, lineHeight),
              _measureText6 = (0, _slicedToArray3.default)(_measureText5, 2),
              w = _measureText6[0],
              h = _measureText6[1];

          var left = 0;
          if (align === 'center') {
            left = (width - w) / 2;
          } else if (align === 'right') {
            left = width - w;
          }

          var indent = 0;
          if (textIndent && idx === 0 && align !== 'right') {
            indent = textIndent;
          }

          if (letterSpacing) {
            var l = left;[].concat((0, _toConsumableArray3.default)(line)).forEach(function (letter, i) {
              if (idx === 0 && i === 0) {
                l += indent;
              }
              if (fillColor) {
                drawingContext.fillText(letter, l, top + h / 2);
              }
              if (strokeColor) {
                drawingContext.strokeText(letter, l, top + h / 2);
              }
              l += measureText(_this3, letter, font)[0] + letterSpacing;
            });
          } else {
            if (fillColor) {
              drawingContext.fillText(line, left + indent, top + h / 2);
            }
            if (strokeColor) {
              drawingContext.strokeText(line, left + indent, top + h / 2);
            }
          }

          top += h;
        });
      }
    }
  }, {
    key: 'text',
    set: function set(val) {
      this.attr('text', val);
    },
    get: function get() {
      return this.attr('text');
    }
  }, {
    key: 'textboxSize',
    get: function get() {
      if (!this[_boxSize]) calculTextboxSize(this);
      return this[_boxSize];
    }
  }, {
    key: 'flexibleFont',
    get: function get() {
      var font = this.attr('font');
      if (this.attr('width') === '' && this.attr('layoutWidth') === '') return font;
      var textboxSize = this.textboxSize,
          contentSize = this.contentSize;

      var _parseFont2 = parseFont(font),
          style = _parseFont2.style,
          variant = _parseFont2.variant,
          weight = _parseFont2.weight,
          size = _parseFont2.size,
          family = _parseFont2.family;

      size *= contentSize[0] / textboxSize[0];
      return style + ' ' + variant + ' ' + weight + ' ' + Math.floor(size) + 'px "' + family + '"';
    }

    // override to adapt content size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1];

      if (width === '' || height === '') {
        var textboxSize = this.textboxSize;
        if (!textboxSize) return [0, 0];
        width = width || textboxSize[0];
        height = height || textboxSize[1];
      }

      if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
        height = Math.ceil(height * width / this.textboxSize[0]);
      }

      return [width, height];
    }
  }]);
  return Label;
}(_basesprite2.default), _class3.Attr = LabelSpriteAttr, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'contentSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'contentSize'), _class2.prototype)), _class2);
exports.default = Label;


(0, _nodetype.registerNodeType)('label', Label);

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function set(object, property, value, receiver) {
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Util = __webpack_require__(207);

Object.defineProperty(exports, 'toCodePoints', {
  enumerable: true,
  get: function get() {
    return _Util.toCodePoints;
  }
});
Object.defineProperty(exports, 'fromCodePoint', {
  enumerable: true,
  get: function get() {
    return _Util.fromCodePoint;
  }
});

var _LineBreak = __webpack_require__(208);

Object.defineProperty(exports, 'LineBreaker', {
  enumerable: true,
  get: function get() {
    return _LineBreak.LineBreaker;
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var toCodePoints = exports.toCodePoints = function toCodePoints(str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
            var extra = str.charCodeAt(i++);
            if ((extra & 0xfc00) === 0xdc00) {
                codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            } else {
                codePoints.push(value);
                i--;
            }
        } else {
            codePoints.push(value);
        }
    }
    return codePoints;
};

var fromCodePoint = exports.fromCodePoint = function fromCodePoint() {
    if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, arguments);
    }

    var length = arguments.length;
    if (!length) {
        return '';
    }

    var codeUnits = [];

    var index = -1;
    var result = '';
    while (++index < length) {
        var codePoint = arguments.length <= index ? undefined : arguments[index];
        if (codePoint <= 0xffff) {
            codeUnits.push(codePoint);
        } else {
            codePoint -= 0x10000;
            codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
            result += String.fromCharCode.apply(String, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

var decode = exports.decode = function decode(base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i = void 0,
        p = 0,
        encoded1 = void 0,
        encoded2 = void 0,
        encoded3 = void 0,
        encoded4 = void 0;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8Array.prototype.slice !== 'undefined' ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return buffer;
};

var polyUint16Array = exports.polyUint16Array = function polyUint16Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i = 0; _i < length; _i += 2) {
        bytes.push(buffer[_i + 1] << 8 | buffer[_i]);
    }
    return bytes;
};

var polyUint32Array = exports.polyUint32Array = function polyUint32Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i2 = 0; _i2 < length; _i2 += 4) {
        bytes.push(buffer[_i2 + 3] << 24 | buffer[_i2 + 2] << 16 | buffer[_i2 + 1] << 8 | buffer[_i2]);
    }
    return bytes;
};

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineBreaker = exports.inlineBreakOpportunities = exports.lineBreakAtIndex = exports.codePointsToCharacterClasses = exports.UnicodeTrie = exports.BREAK_ALLOWED = exports.BREAK_NOT_ALLOWED = exports.BREAK_MANDATORY = exports.classes = exports.LETTER_NUMBER_MODIFIER = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Trie = __webpack_require__(209);

var _linebreakTrie = __webpack_require__(210);

var _linebreakTrie2 = _interopRequireDefault(_linebreakTrie);

var _Util = __webpack_require__(207);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LETTER_NUMBER_MODIFIER = exports.LETTER_NUMBER_MODIFIER = 50;

// Non-tailorable Line Breaking Classes
var BK = 1; //  Cause a line break (after)
var CR = 2; //  Cause a line break (after), except between CR and LF
var LF = 3; //  Cause a line break (after)
var CM = 4; //  Prohibit a line break between the character and the preceding character
var NL = 5; //  Cause a line break (after)
var SG = 6; //  Do not occur in well-formed text
var WJ = 7; //  Prohibit line breaks before and after
var ZW = 8; //  Provide a break opportunity
var GL = 9; //  Prohibit line breaks before and after
var SP = 10; // Enable indirect line breaks
var ZWJ = 11; // Prohibit line breaks within joiner sequences
// Break Opportunities
var B2 = 12; //  Provide a line break opportunity before and after the character
var BA = 13; //  Generally provide a line break opportunity after the character
var BB = 14; //  Generally provide a line break opportunity before the character
var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
var CB = 16; //   Provide a line break opportunity contingent on additional information
// Characters Prohibiting Certain Breaks
var CL = 17; //  Prohibit line breaks before
var CP = 18; //  Prohibit line breaks before
var EX = 19; //  Prohibit line breaks before
var IN = 20; //  Allow only indirect line breaks between pairs
var NS = 21; //  Allow only indirect line breaks before
var OP = 22; //  Prohibit line breaks after
var QU = 23; //  Act like they are both opening and closing
// Numeric Context
var IS = 24; //  Prevent breaks after any and before numeric
var NU = 25; //  Form numeric expressions for line breaking purposes
var PO = 26; //  Do not break following a numeric expression
var PR = 27; //  Do not break in front of a numeric expression
var SY = 28; //  Prevent a break before; and allow a break after
// Other Characters
var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
var EB = 32; //  Do not break from following Emoji Modifier
var EM = 33; //  Do not break from preceding Emoji Base
var H2 = 34; //  Form Korean syllable blocks
var H3 = 35; //  Form Korean syllable blocks
var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
var ID = 37; //  Break before or after; except in some numeric context
var JL = 38; //  Form Korean syllable blocks
var JV = 39; //  Form Korean syllable blocks
var JT = 40; //  Form Korean syllable blocks
var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions

var classes = exports.classes = {
    BK: BK,
    CR: CR,
    LF: LF,
    CM: CM,
    NL: NL,
    SG: SG,
    WJ: WJ,
    ZW: ZW,
    GL: GL,
    SP: SP,
    ZWJ: ZWJ,
    B2: B2,
    BA: BA,
    BB: BB,
    HY: HY,
    CB: CB,
    CL: CL,
    CP: CP,
    EX: EX,
    IN: IN,
    NS: NS,
    OP: OP,
    QU: QU,
    IS: IS,
    NU: NU,
    PO: PO,
    PR: PR,
    SY: SY,
    AI: AI,
    AL: AL,
    CJ: CJ,
    EB: EB,
    EM: EM,
    H2: H2,
    H3: H3,
    HL: HL,
    ID: ID,
    JL: JL,
    JV: JV,
    JT: JT,
    RI: RI,
    SA: SA,
    XX: XX
};

var BREAK_MANDATORY = exports.BREAK_MANDATORY = '!';
var BREAK_NOT_ALLOWED = exports.BREAK_NOT_ALLOWED = '×';
var BREAK_ALLOWED = exports.BREAK_ALLOWED = '÷';
var UnicodeTrie = exports.UnicodeTrie = (0, _Trie.createTrieFromBase64)(_linebreakTrie2.default);

var ALPHABETICS = [AL, HL];
var HARD_LINE_BREAKS = [BK, CR, LF, NL];
var SPACE = [SP, ZW];
var PREFIX_POSTFIX = [PR, PO];
var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
var HYPHEN = [HY, BA];

var codePointsToCharacterClasses = exports.codePointsToCharacterClasses = function codePointsToCharacterClasses(codePoints) {
    var lineBreak = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'strict';

    var types = [];
    var indicies = [];
    var categories = [];
    codePoints.forEach(function (codePoint, index) {
        var classType = UnicodeTrie.get(codePoint);
        if (classType > LETTER_NUMBER_MODIFIER) {
            categories.push(true);
            classType -= LETTER_NUMBER_MODIFIER;
        } else {
            categories.push(false);
        }

        if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
            // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
            if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                indicies.push(index);
                return types.push(CB);
            }
        }

        if (classType === CM || classType === ZWJ) {
            // LB10 Treat any remaining combining mark or ZWJ as AL.
            if (index === 0) {
                indicies.push(index);
                return types.push(AL);
            }

            // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
            // the base character in all of the following rules. Treat ZWJ as if it were CM.
            var prev = types[index - 1];
            if (LINE_BREAKS.indexOf(prev) === -1) {
                indicies.push(indicies[index - 1]);
                return types.push(prev);
            }
            indicies.push(index);
            return types.push(AL);
        }

        indicies.push(index);

        if (classType === CJ) {
            return types.push(lineBreak === 'strict' ? NS : ID);
        }

        if (classType === SA) {
            return types.push(AL);
        }

        if (classType === AI) {
            return types.push(AL);
        }

        // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
        // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
        // to take into account the actual line breaking properties for these characters.
        if (classType === XX) {
            if (codePoint >= 0x20000 && codePoint <= 0x2fffd || codePoint >= 0x30000 && codePoint <= 0x3fffd) {
                return types.push(ID);
            } else {
                return types.push(AL);
            }
        }

        types.push(classType);
    });

    return [indicies, types, categories];
};

var isAdjacentWithSpaceIgnored = function isAdjacentWithSpaceIgnored(a, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
        var i = currentIndex;
        while (i <= classTypes.length) {
            i++;
            var next = classTypes[i];

            if (next === b) {
                return true;
            }

            if (next !== SP) {
                break;
            }
        }
    }

    if (current === SP) {
        var _i = currentIndex;

        while (_i > 0) {
            _i--;
            var prev = classTypes[_i];

            if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                var n = currentIndex;
                while (n <= classTypes.length) {
                    n++;
                    var _next = classTypes[n];

                    if (_next === b) {
                        return true;
                    }

                    if (_next !== SP) {
                        break;
                    }
                }
            }

            if (prev !== SP) {
                break;
            }
        }
    }
    return false;
};

var previousNonSpaceClassType = function previousNonSpaceClassType(currentIndex, classTypes) {
    var i = currentIndex;
    while (i >= 0) {
        var type = classTypes[i];
        if (type === SP) {
            i--;
        } else {
            return type;
        }
    }
    return 0;
};

var _lineBreakAtIndex = function _lineBreakAtIndex(codePoints, classTypes, indicies, index, forbiddenBreaks) {
    if (indicies[index] === 0) {
        return BREAK_NOT_ALLOWED;
    }

    var currentIndex = index - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
        return BREAK_NOT_ALLOWED;
    }

    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];

    // LB4 Always break after hard line breaks.
    // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];

    if (current === CR && next === LF) {
        return BREAK_NOT_ALLOWED;
    }

    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
        return BREAK_MANDATORY;
    }

    // LB6 Do not break before hard line breaks.
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB7 Do not break before spaces or zero width space.
    if (SPACE.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
        return BREAK_ALLOWED;
    }

    // LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
    if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB11 Do not break before or after Word joiner and related characters.
    if (current === WJ || next === WJ) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12 Do not break after NBSP and related characters.
    if (current === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB14 Do not break after ‘[’, even after spaces.
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB15 Do not break within ‘”[’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB17 Do not break within ‘——’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB18 Break after spaces.
    if (current === SP) {
        return BREAK_ALLOWED;
    }

    // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
    if (current === QU || next === QU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB20 Break before and after unresolved CB.
    if (next === CB || current === CB) {
        return BREAK_ALLOWED;
    }

    // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21a Don't break after Hebrew + Hyphen.
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21b Don’t break between Solidus and Hebrew letters.
    if (current === SY && next === HL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
    if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23 Do not break between digits and letters.
    if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
    if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
        return BREAK_NOT_ALLOWED;
    }

    // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
    if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB25 Do not break between the following pairs of classes relevant to numbers:
    if (
    // (PR | PO) × ( OP | HY )? NU
    [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) ||
    // ( OP | HY ) × NU
    [OP, HY].indexOf(current) !== -1 && next === NU ||
    // NU ×	(NU | SY | IS)
    current === NU && [NU, SY, IS].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
        var prevIndex = currentIndex;
        while (prevIndex >= 0) {
            var type = classTypes[prevIndex];
            if (type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
            } else {
                break;
            }
        }
    }

    // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
    if ([PR, PO].indexOf(next) !== -1) {
        var _prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
        while (_prevIndex >= 0) {
            var _type = classTypes[_prevIndex];
            if (_type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(_type) !== -1) {
                _prevIndex--;
            } else {
                break;
            }
        }
    }

    // LB26 Do not break a Korean syllable.
    if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
        return BREAK_NOT_ALLOWED;
    }

    // LB27 Treat a Korean Syllable Block the same as ID.
    if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
        return BREAK_NOT_ALLOWED;
    }

    // LB28 Do not break between alphabetics (“at”).
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
    if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
    // indicators preceding the position of the break.
    if (current === RI && next === RI) {
        var i = indicies[currentIndex];
        var count = 1;
        while (i > 0) {
            i--;
            if (classTypes[i] === RI) {
                count++;
            } else {
                break;
            }
        }
        if (count % 2 !== 0) {
            return BREAK_NOT_ALLOWED;
        }
    }

    // LB30b Do not break between an emoji base and an emoji modifier.
    if (current === EB && next === EM) {
        return BREAK_NOT_ALLOWED;
    }

    return BREAK_ALLOWED;
};

var lineBreakAtIndex = exports.lineBreakAtIndex = function lineBreakAtIndex(codePoints, index) {
    // LB2 Never break at the start of text.
    if (index === 0) {
        return BREAK_NOT_ALLOWED;
    }

    // LB3 Always break at the end of text.
    if (index >= codePoints.length) {
        return BREAK_MANDATORY;
    }

    var _codePointsToCharacte = codePointsToCharacterClasses(codePoints),
        _codePointsToCharacte2 = _slicedToArray(_codePointsToCharacte, 2),
        indicies = _codePointsToCharacte2[0],
        classTypes = _codePointsToCharacte2[1];

    return _lineBreakAtIndex(codePoints, classTypes, indicies, index);
};

var cssFormattedClasses = function cssFormattedClasses(codePoints, options) {
    if (!options) {
        options = { lineBreak: 'normal', wordBreak: 'normal' };
    }

    var _codePointsToCharacte3 = codePointsToCharacterClasses(codePoints, options.lineBreak),
        _codePointsToCharacte4 = _slicedToArray(_codePointsToCharacte3, 3),
        indicies = _codePointsToCharacte4[0],
        classTypes = _codePointsToCharacte4[1],
        isLetterNumber = _codePointsToCharacte4[2];

    if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
        classTypes = classTypes.map(function (type) {
            return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
        });
    }

    var forbiddenBreakpoints = options.wordBreak === 'keep-all' ? isLetterNumber.map(function (isLetterNumber, i) {
        return isLetterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
    }) : null;

    return [indicies, classTypes, forbiddenBreakpoints];
};

var inlineBreakOpportunities = exports.inlineBreakOpportunities = function inlineBreakOpportunities(str, options) {
    var codePoints = (0, _Util.toCodePoints)(str);
    var output = BREAK_NOT_ALLOWED;

    var _cssFormattedClasses = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses2 = _slicedToArray(_cssFormattedClasses, 3),
        indicies = _cssFormattedClasses2[0],
        classTypes = _cssFormattedClasses2[1],
        forbiddenBreakpoints = _cssFormattedClasses2[2];

    codePoints.forEach(function (codePoint, i) {
        output += (0, _Util.fromCodePoint)(codePoint) + (i >= codePoints.length - 1 ? BREAK_MANDATORY : _lineBreakAtIndex(codePoints, classTypes, indicies, i + 1, forbiddenBreakpoints));
    });

    return output;
};

var Break = function () {
    function Break(codePoints, lineBreak, start, end) {
        _classCallCheck(this, Break);

        this._codePoints = codePoints;
        this.required = lineBreak === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
    }

    _createClass(Break, [{
        key: 'slice',
        value: function slice() {
            return _Util.fromCodePoint.apply(undefined, _toConsumableArray(this._codePoints.slice(this.start, this.end)));
        }
    }]);

    return Break;
}();

var LineBreaker = exports.LineBreaker = function LineBreaker(str, options) {
    var codePoints = (0, _Util.toCodePoints)(str);

    var _cssFormattedClasses3 = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses4 = _slicedToArray(_cssFormattedClasses3, 3),
        indicies = _cssFormattedClasses4[0],
        classTypes = _cssFormattedClasses4[1],
        forbiddenBreakpoints = _cssFormattedClasses4[2];

    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;

    return {
        next: function next() {
            if (nextIndex >= length) {
                return { done: true };
            }
            var lineBreak = BREAK_NOT_ALLOWED;
            while (nextIndex < length && (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED) {}

            if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
                var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                lastEnd = nextIndex;
                return { value: value, done: false };
            }

            return { done: true };
        }
    };
};

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trie = exports.createTrieFromBase64 = exports.UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_DATA_MASK = exports.UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_SHIFT_1_2 = exports.UTRIE2_INDEX_SHIFT = exports.UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(207);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Shift size for getting the index-2 table offset. */
var UTRIE2_SHIFT_2 = exports.UTRIE2_SHIFT_2 = 5;

/** Shift size for getting the index-1 table offset. */
var UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_1 = 6 + 5;

/**
 * Shift size for shifting left the index array values.
 * Increases possible data size with 16-bit index values at the cost
 * of compactability.
 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
 */
var UTRIE2_INDEX_SHIFT = exports.UTRIE2_INDEX_SHIFT = 2;

/**
 * Difference between the two shift sizes,
 * for getting an index-1 offset from an index-2 offset. 6=11-5
 */
var UTRIE2_SHIFT_1_2 = exports.UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;

/**
 * The part of the index-2 table for U+D800..U+DBFF stores values for
 * lead surrogate code _units_ not code _points_.
 * Values for lead surrogate code _points_ are indexed with this portion of the table.
 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
 */
var UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;

/** Number of entries in a data block. 32=0x20 */
var UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
/** Mask for getting the lower bits for the in-data-block offset. */
var UTRIE2_DATA_MASK = exports.UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;

var UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
/** Count the lengths of both BMP pieces. 2080=0x820 */
var UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
/**
 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
 */
var UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
/**
 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
 * Variable length, for code points up to highStart, where the last single-value range starts.
 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
 *
 * The part of the index-2 table for supplementary code points starts
 * after this index-1 table.
 *
 * Both the index-1 table and the following part of the index-2 table
 * are omitted completely if there is only BMP data.
 */
var UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;

/**
 * Number of index-1 entries for the BMP. 32=0x20
 * This part of the index-1 table is omitted from the serialized form.
 */
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;

/** Number of entries in an index-2 block. 64=0x40 */
var UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
/** Mask for getting the lower bits for the in-index-2-block offset. */
var UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;

var createTrieFromBase64 = exports.createTrieFromBase64 = function createTrieFromBase64(base64) {
    var buffer = (0, _Util.decode)(base64);
    var view32 = Array.isArray(buffer) ? (0, _Util.polyUint32Array)(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? (0, _Util.polyUint16Array)(buffer) : new Uint16Array(buffer);
    var headerLength = 24;

    var index = view16.slice(headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ? view16.slice((headerLength + view32[4]) / 2) : view32.slice(Math.ceil((headerLength + view32[4]) / 4));

    return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
};

var Trie = exports.Trie = function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
        _classCallCheck(this, Trie);

        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
    }

    /**
     * Get the value for a code point as stored in the Trie.
     *
     * @param codePoint the code point
     * @return the value
     */


    _createClass(Trie, [{
        key: 'get',
        value: function get(codePoint) {
            var ix = void 0;
            if (codePoint >= 0) {
                if (codePoint < 0x0d800 || codePoint > 0x0dbff && codePoint <= 0x0ffff) {
                    // Ordinary BMP code point, excluding leading surrogates.
                    // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                    // 16 bit data is stored in the index array itself.
                    ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint <= 0xffff) {
                    // Lead Surrogate Code Point.  A Separate index section is stored for
                    // lead surrogate code units and code points.
                    //   The main index has the code unit data.
                    //   For this function, we need the code point data.
                    // Note: this expression could be refactored for slightly improved efficiency, but
                    //       surrogate code points will be so rare in practice that it's not worth it.
                    ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> UTRIE2_SHIFT_2)];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint < this.highStart) {
                    // Supplemental code point, use two-level lookup.
                    ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                    ix = this.index[ix];
                    ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
                    ix = this.index[ix];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint <= 0x10ffff) {
                    return this.data[this.highValueIndex];
                }
            }

            // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
            return this.errorValue;
        }
    }]);

    return Trie;
}();

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */

// borrow from node-canvas (https://github.com/Automattic/node-canvas)

/**
 * Font RegExp helpers.
 */

var weights = 'bold|bolder|lighter|[1-9]00',
    styles = 'italic|oblique',
    variants = 'small-caps',
    stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
    units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q|vw|vh',
    string = '\'([^\']+)\'|"([^"]+)"|[\\w-]+';

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
var weightRe = new RegExp('(' + weights + ') +', 'i');
var styleRe = new RegExp('(' + styles + ') +', 'i');
var variantRe = new RegExp('(' + variants + ') +', 'i');
var stretchRe = new RegExp('(' + stretches + ') +', 'i');
var sizeFamilyRe = new RegExp('([\\d\\.]+)(' + units + ') *' + '((?:' + string + ')( *, *(?:' + string + '))*)');

/**
 * Cache font parsing.
 */

var cache = {};

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = function f(str, defaultHeight) {
  if (defaultHeight == null) {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      var root = window.getComputedStyle(document.documentElement).fontSize;
      defaultHeight = f(root + ' Arial', 16).size;
    } else {
      defaultHeight = 16;
    }
  }

  // Cached
  if (cache[str]) return cache[str];

  // Try for required properties first.
  var sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) return; // invalid

  // Default values and required properties
  var font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')

    // Optional, unordered properties.
  };var weight = void 0,
      style = void 0,
      variant = void 0,
      stretch = void 0;
  // Stop search at `sizeFamily.index`
  var substr = str.substring(0, sizeFamily.index);
  if (weight = weightRe.exec(substr)) font.weight = weight[1];
  if (style = styleRe.exec(substr)) font.style = style[1];
  if (variant = variantRe.exec(substr)) font.variant = variant[1];
  if (stretch = stretchRe.exec(substr)) font.stretch = stretch[1];

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75;
      break;
    case 'pc':
      font.size *= 16;
      break;
    case 'in':
      font.size *= 96;
      break;
    case 'cm':
      font.size *= 96.0 / 2.54;
      break;
    case 'mm':
      font.size *= 96.0 / 25.4;
      break;
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break;
    case 'em':
    case 'rem':
      font.size *= defaultHeight;
      break;
    case 'q':
      font.size *= 96 / 25.4 / 4;
      break;
  }

  if (font.unit === 'vw') {
    if (typeof document !== 'undefined' && document.documentElement) {
      var width = document.documentElement.clientWidth;
      font.size = width * font.size / 100;
    }
  } else if (font.unit === 'vh') {
    if (typeof document !== 'undefined' && document.documentElement) {
      var height = document.documentElement.clientHeight;
      font.size = height * font.size / 100;
    }
  }

  return cache[str] = font;
};

/* eslint-enable */

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _set = __webpack_require__(154);

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteAnimator = __webpack_require__(2);

var _fastAnimationFrame = __webpack_require__(198);

var _spriteUtils = __webpack_require__(152);

var _basenode = __webpack_require__(196);

var _basenode2 = _interopRequireDefault(_basenode);

var _batch = __webpack_require__(213);

var _batch2 = _interopRequireDefault(_batch);

var _group = __webpack_require__(214);

var _group2 = _interopRequireDefault(_group);

var _nodetype = __webpack_require__(200);

var _dirtyCheck = __webpack_require__(220);

var _group3 = __webpack_require__(219);

var _group4 = _interopRequireDefault(_group3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _children = (0, _symbol2.default)('children'),
    _updateSet = (0, _symbol2.default)('updateSet'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _tRecord = (0, _symbol2.default)('tRecord'),
    _timeline = (0, _symbol2.default)('timeline'),
    _renderDeferer = (0, _symbol2.default)('renderDeferrer'),
    _drawTask = (0, _symbol2.default)('drawTask'),
    _autoRender = (0, _symbol2.default)('autoRender'),
    _adjustTimer = (0, _symbol2.default)('adjustTimer');

var Layer = function (_BaseNode) {
  (0, _inherits3.default)(Layer, _BaseNode);

  function Layer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        _ref$handleEvent = _ref.handleEvent,
        handleEvent = _ref$handleEvent === undefined ? true : _ref$handleEvent,
        _ref$evaluateFPS = _ref.evaluateFPS,
        evaluateFPS = _ref$evaluateFPS === undefined ? false : _ref$evaluateFPS,
        _ref$renderMode = _ref.renderMode,
        renderMode = _ref$renderMode === undefined ? 'repaintAll' : _ref$renderMode,
        _ref$autoRender = _ref.autoRender,
        autoRender = _ref$autoRender === undefined ? true : _ref$autoRender;

    (0, _classCallCheck3.default)(this, Layer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

    _this.handleEvent = handleEvent;
    _this.evaluateFPS = evaluateFPS;
    _this[_autoRender] = autoRender;

    // renderMode: repaintAll | repaintDirty
    _this.renderMode = renderMode;

    _this.outputContext = context;

    // auto release
    /* istanbul ignore if  */
    if (context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', function () {
        _this.timeline.clear();
        _this.clear();
      });
    }

    _this[_children] = [];
    _this[_updateSet] = new _set2.default();
    _this[_zOrder] = 0;
    _this[_tRecord] = []; // calculate FPS
    _this[_timeline] = new _spriteAnimator.Timeline();
    _this[_renderDeferer] = null;

    _this.touchedTargets = {};
    return _this;
  }

  (0, _createClass3.default)(Layer, [{
    key: 'clearContext',
    value: function clearContext(context) {
      if (context.canvas) {
        var _context$canvas = context.canvas,
            width = _context$canvas.width,
            height = _context$canvas.height;

        context.clearRect(0, 0, width, height);
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 0) {
        (0, _spriteUtils.setDeprecation)('layer.remove()', 'Instead use layer.clear().');
        return this.clear();
      }
      return args.map(function (child) {
        return _this2.removeChild(child);
      });
    }
  }, {
    key: 'prepareRender',
    value: function prepareRender() {
      var _this3 = this;

      if (!this[_renderDeferer]) {
        this[_renderDeferer] = {};
        this[_renderDeferer].promise = new _promise2.default(function (resolve, reject) {
          (0, _assign2.default)(_this3[_renderDeferer], { resolve: resolve, reject: reject });
          if (_this3.autoRender) {
            _this3[_drawTask] = (0, _fastAnimationFrame.requestAnimationFrame)(function () {
              delete _this3[_drawTask];
              _this3.draw();
            });
          }
        });
        // .catch(ex => console.error(ex.message))
      }
      return this[_renderDeferer] ? this[_renderDeferer].promise : _promise2.default.resolve();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var clearContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var renderDeferrer = this[_renderDeferer];
      this[_renderDeferer] = null;
      if (this[_drawTask]) {
        (0, _fastAnimationFrame.cancelAnimationFrame)(this[_drawTask]);
        delete this[_drawTask];
      }
      /* istanbul ignore if  */
      if (this.evaluateFPS) {
        this[_tRecord].push(Date.now());
        this[_tRecord] = this[_tRecord].slice(-10);
      }

      var renderer = void 0;
      if (this.renderMode === 'repaintDirty') {
        renderer = this.renderRepaintDirty.bind(this);
      } else if (this.renderMode === 'repaintAll') {
        renderer = this.renderRepaintAll.bind(this);
      } else {
        /* istanbul ignore next  */
        throw new Error('unknown render mode!');
      }
      var currentTime = this.timeline.currentTime;
      renderer(currentTime, clearContext);

      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, 'update', { target: this, timeline: this.timeline, renderTime: currentTime }, true);

      if (renderDeferrer) {
        renderDeferrer.resolve();
      }
    }
  }, {
    key: 'update',
    value: function update(target) {
      if (target && target.isDirty) return;
      if (target) {
        this[_updateSet].add(target);
        target.isDirty = true;
      }
      this.prepareRender();
    }
  }, {
    key: 'isVisible',
    value: function isVisible() {
      if (this.canvas) {
        return this.canvas.width > 0 && this.canvas.height > 0;
      }
      return true;
    }
  }, {
    key: 'drawSprites',
    value: function drawSprites(renderEls, t) {
      this[_updateSet].clear();
      for (var i = 0; i < renderEls.length; i++) {
        var child = renderEls[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.parent === this) {
          var isVisible = child.isVisible();
          if (isVisible) {
            child.draw(t);
            if (this.renderMode === 'repaintDirty') {
              child.lastRenderBox = child.renderBox;
            } else {
              child.lastRenderBox = 'no-calc';
            }
          } else {
            // invisible, only need to remove lastRenderBox
            delete child.lastRenderBox;
          }
          if (isDirty) {
            child.dispatchEvent('update', { target: child, renderTime: t, isVisible: isVisible }, true, true);
          }
        }
      }
    }
  }, {
    key: 'renderRepaintAll',
    value: function renderRepaintAll(t) {
      var clearContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var renderEls = this[_children];
      var outputContext = this.outputContext;
      if (clearContext) this.clearContext(outputContext);
      this.drawSprites(renderEls, t);
    }
  }, {
    key: 'renderRepaintDirty',
    value: function renderRepaintDirty(t) {
      var clearContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var updateEls = [].concat((0, _toConsumableArray3.default)(this[_updateSet]));
      if (updateEls.some(function (el) {
        return !!el.attr('filter') || el.isVirtual || el.lastRenderBox === 'no-calc';
      })) {
        return this.renderRepaintAll(t, clearContext);
      }

      var outputContext = this.outputContext;

      var renderEls = this[_children];

      outputContext.save();
      outputContext.beginPath();

      (0, _dirtyCheck.clearDirtyRects)(outputContext, updateEls, true);

      if (clearContext) this.clearContext(outputContext);

      this.drawSprites(renderEls, t);

      outputContext.restore();
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX,
            layerY = evt.layerY;
        var _outputContext$canvas = this.outputContext.canvas,
            width = _outputContext$canvas.width,
            height = _outputContext$canvas.height;


        if (layerX == null && layerY == null || layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }
        return false;
      }
      /* istanbul ignore next  */
      return true;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this4 = this;

      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (swallow && this.getEventHandlers(type).length === 0) {
        return;
      }
      if (!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
        var isCollision = collisionState || this.pointCollision(evt);
        var changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;
        if (changedTouches && type === 'touchend') {
          isCollision = true;
        }
        if (isCollision) {
          var sprites = this[_children].slice(0).reverse(),
              targetSprites = [];

          if (changedTouches && type === 'touchend') {
            var touch = changedTouches[0];
            if (touch && touch.identifier != null) {
              var targets = this.layer.touchedTargets[touch.identifier];
              if (targets) {
                targets.forEach(function (target) {
                  if (target !== _this4 && target.layer === _this4) {
                    target.dispatchEvent(type, evt, true);
                  }
                });
                delete this.layer.touchedTargets[touch.identifier];
              }
            }
          } else {
            for (var i = 0; i < sprites.length; i++) {
              var sprite = sprites[i];
              var hit = sprite.dispatchEvent(type, evt, collisionState, swallow);
              if (hit) {
                // detect mouseenter/mouseleave
                targetSprites.push(sprite);
              }
              if (evt.terminated && !type.startsWith('mouse')) {
                break;
              }
            }
          }
          evt.targetSprites = targetSprites;
          // stopDispatch can only terminate event in the same level
          evt.terminated = false;
          return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt, isCollision, swallow);
        }
      }
      evt.targetSprites = evt.targetSprites || [];
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'connect',
    value: function connect(parent, zOrder, zIndex) /* istanbul ignore next  */{
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'connect', this).call(this, parent, zOrder);
      this.zIndex = zIndex;
      if (parent && parent.container) {
        parent.container.appendChild(this.outputContext.canvas);
      }
      return this;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) /* istanbul ignore next  */{
      if (this.canvas && this.canvas.remove) {
        this.canvas.remove();
      }
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'disconnect', this).call(this, parent);
    }
  }, {
    key: 'group',
    value: function group() {
      var group = new _group2.default();
      group.append.apply(group, arguments);
      this.appendChild(group);
      return group;
    }
  }, {
    key: 'batch',
    value: function batch() {
      var _this5 = this;

      for (var _len2 = arguments.length, sprites = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sprites[_key2] = arguments[_key2];
      }

      sprites.forEach(function (sprite) {
        if (sprite.layer !== _this5) {
          _this5.appendChild(sprite);
        }
      });
      var batch = new _batch2.default(this);
      batch.add.apply(batch, sprites);
      return batch;
    }
  }, {
    key: 'adjust',
    value: function adjust(handler) /* istanbul ignore next  */{
      var _this6 = this;

      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!update) return;
      var outputContext = this.outputContext;
      var shadowContext = this.adjustContext || outputContext.canvas.cloneNode().getContext('2d');

      if (!this[_adjustTimer]) {
        this.autoRender = false;
        shadowContext.clearRect(0, 0, shadowContext.canvas.width, shadowContext.canvas.height);
        shadowContext._clearTag = false;
        shadowContext.drawImage(outputContext.canvas, 0, 0);
        this.adjustContext = shadowContext;
      } else {
        clearTimeout(this[_adjustTimer]);
      }
      this[_adjustTimer] = setTimeout(function () {
        _this6.autoRender = true;
        delete _this6[_adjustTimer];
      }, 100);

      if (shadowContext.canvas.width > 0 && shadowContext.canvas.height > 0) {
        this.clearContext(outputContext);
        outputContext.save();
        handler.call(this, outputContext);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
        outputContext.restore();
      }
    }
  }, {
    key: 'clearUpdate',
    value: function clearUpdate() {
      /* istanbul ignore next  */
      this[_updateSet].clear();
    }
  }, {
    key: 'autoRender',
    set: function set(value) {
      this[_autoRender] = value;
      if (value) {
        this.draw();
      }
    },
    get: function get() {
      return this[_autoRender];
    }
  }, {
    key: 'layer',
    get: function get() {
      return this;
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'timeline',
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: 'context',
    get: function get() {
      return this.outputContext;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.outputContext.canvas;
    }
  }, {
    key: 'offset',
    get: function get() {
      return [0, 0];
    }
  }, {
    key: 'fps',
    get: function get() /* istanbul ignore next  */{
      if (!this.evaluateFPS) {
        return NaN;
      }
      var sum = 0;
      var tr = this[_tRecord].slice(-10);
      var len = tr.length;

      if (len <= 5) {
        return NaN;
      }
      tr.reduceRight(function (a, b, i) {
        sum += a - b;return b;
      });

      return Math.round(1000 * (len - 1) / sum);
    }
  }]);
  return Layer;
}(_basenode2.default);

exports.default = Layer;


(0, _assign2.default)(Layer.prototype, _group4.default);

(0, _nodetype.registerNodeType)('layer', Layer, true);

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = __webpack_require__(154);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _render = __webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _batch = (0, _symbol2.default)('batch');

var Batch = function () {
  function Batch(layer) {
    (0, _classCallCheck3.default)(this, Batch);

    this.layer = layer;
    this[_batch] = new _set2.default();
    this.cache = null;
  }

  (0, _createClass3.default)(Batch, [{
    key: 'add',
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      nodes.forEach(function (node) {
        if (!node.layer || node.layer !== _this.layer) {
          /* istanbul ignore next  */
          throw new Error('Batch node must append to this layer first!');
        }
        if (node[_batch]) {
          /* istanbul ignore next  */
          throw new Error('Node already batched!');
        }
        var that = _this;
        Object.defineProperty(node, 'cache', {
          configurable: true,
          get: function get() {
            return that.cache;
          },
          set: function set(context) {
            if (that.baseNode === this) {
              if (that.cache && context !== that.cache) {
                _render.cacheContextPool.put(that.cache);
              }
              that.cache = context;
            } else if (context == null) {
              throw new Error('Cannot set non-cachable attributes to batch members.Use batch.baseNode.attr(...)');
            }
          }
        });
        Object.defineProperty(node, 'cachePriority', {
          configurable: true,
          get: function get() {
            return Infinity;
          }
        });
        node[_batch] = _this;
        _this[_batch].add(node);
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this2 = this;

      for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nodes[_key2] = arguments[_key2];
      }

      nodes.forEach(function (node) {
        if (_this2[_batch].has(node)) {
          delete node[_batch];
          delete node.cache;
          _this2[_batch].delete(node);
        }
      });
    }
  }, {
    key: 'baseNode',
    get: function get() {
      var batchNodes = [].concat((0, _toConsumableArray3.default)(this[_batch]));
      var baseNode = batchNodes[0],
          zOrder = Infinity,
          zIndex = Infinity;

      for (var i = 0; i < batchNodes.length; i++) {
        var node = batchNodes[i];
        if (zIndex > node.zIndex) {
          zIndex = node.zIndex;
          zOrder = node.zOrder;
          baseNode = node;
        } else if (zIndex === node.zIndex && zOrder > node.zOrder) {
          zOrder = node.zOrder;
          baseNode = node;
        }
      }
      return baseNode;
    }
  }]);
  return Batch;
}();

exports.default = Batch;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _set2 = __webpack_require__(205);

var _set3 = _interopRequireDefault(_set2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _desc, _value, _class, _class2, _temp, _desc2, _value2, _class3, _class4, _temp2;

var _spriteUtils = __webpack_require__(152);

var _basesprite = __webpack_require__(168);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = __webpack_require__(200);

var _path = __webpack_require__(215);

var _layout2 = __webpack_require__(217);

var layout = _interopRequireWildcard(_layout2);

var _group = __webpack_require__(219);

var _group2 = _interopRequireDefault(_group);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var _children = (0, _symbol2.default)('children'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _layoutTag = (0, _symbol2.default)('layoutTag');

var GroupAttr = (_dec = (0, _spriteUtils.parseValue)(parseFloat), _dec2 = (0, _spriteUtils.parseValue)(parseFloat), (_class = (_temp = _class2 = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(GroupAttr, _BaseSprite$Attr);

  function GroupAttr(subject) {
    (0, _classCallCheck3.default)(this, GroupAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAttr.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr)).call(this, subject));

    _this.setDefault({
      clip: null,
      scrollTop: 0,
      scrollLeft: 0
    });

    GroupAttr.inits.forEach(function (init) {
      init(_this, subject);
    });
    return _this;
  }

  (0, _createClass3.default)(GroupAttr, [{
    key: 'clip',
    set: function set(val) {
      this.clearCache();
      this.clearFlow();
      if (val) {
        val = typeof val === 'string' ? { d: val } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('clip', val);
      } else {
        this.subject.svg = null;
        this.set('clip', null);
      }
    }
  }, {
    key: 'width',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'width', value, this);
    }
  }, {
    key: 'height',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'height', value, this);
    }
  }, {
    key: 'layoutWidth',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'layoutWidth', value, this);
    }
  }, {
    key: 'layoutHeight',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'layoutHeight', value, this);
    }
  }, {
    key: 'display',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'display', value, this);
    }
  }, {
    key: 'scrollLeft',
    set: function set(value) {
      this.clearCache();
      this.set('scrollLeft', value);
    }
  }, {
    key: 'scrollTop',
    set: function set(value) {
      this.clearCache();
      this.set('scrollTop', value);
    }
  }]);
  return GroupAttr;
}(_basesprite2.default.Attr), _class2.inits = [], _temp), (_applyDecoratedDescriptor(_class.prototype, 'clip', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clip'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutHeight', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'display', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'display'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scrollLeft', [_dec, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scrollLeft'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scrollTop', [_dec2, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scrollTop'), _class.prototype)), _class));


var _layout = (0, _symbol2.default)('layout');

var Group = (_class3 = (_temp2 = _class4 = function (_BaseSprite) {
  (0, _inherits3.default)(Group, _BaseSprite);
  (0, _createClass3.default)(Group, null, [{
    key: 'applyLayout',
    value: function applyLayout(name, layout) {
      this[_layout] = this[_layout] || {};
      var attrs = layout.attrs,
          relayout = layout.relayout;

      if (attrs.init) {
        GroupAttr.inits.push(attrs.init);
      }
      Group.addAttributes(attrs);
      this[_layout][name] = relayout;
    }
  }]);

  function Group() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Group);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, attr));

    _this2[_children] = [];
    _this2[_zOrder] = 0;
    _this2[_layoutTag] = false;
    return _this2;
  }

  (0, _createClass3.default)(Group, [{
    key: 'scrollTo',
    value: function scrollTo(x, y) {
      this.attr('scrollLeft', x);
      this.attr('scrollTop', y);
    }
  }, {
    key: 'scrollBy',
    value: function scrollBy(dx, dy) {
      var x = this.attr('scrollLeft'),
          y = this.attr('scrollTop');

      this.scrollTo(x + dx, y + dy);
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode(deepCopy) {
      var node = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'cloneNode', this).call(this);
      if (deepCopy) {
        var children = this.children;
        children.forEach(function (child) {
          var subNode = child.cloneNode(deepCopy);
          node.append(subNode);
        });
      }
      return node;
    }
  }, {
    key: 'update',
    value: function update(child) {
      child.isDirty = true;
      var attrSize = this.attrSize;
      if (attrSize[0] === '' || attrSize[1] === '') {
        this.reflow();
      }
      this.forceUpdate(true);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'pointCollision', this).call(this, evt) || this.isVirtual) {
        if (this.svg) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          var rect = this.originalRect;
          evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (swallow && this.getEventHandlers(type).length === 0) {
        return;
      }
      if (!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
        var isCollision = collisionState || this.pointCollision(evt);
        if (isCollision) {
          var scrollLeft = this.attr('scrollLeft'),
              scrollTop = this.attr('scrollTop'),
              borderWidth = this.attr('border').width,
              padding = this.attr('padding');

          var parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
          var parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;
          // console.log(evt.parentX, evt.parentY)

          var _evt = (0, _assign2.default)({}, evt);
          _evt.parentX = parentX;
          _evt.parentY = parentY;

          var sprites = this[_children].slice(0).reverse();

          var targetSprites = [];

          for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
            var sprite = sprites[i];
            var hit = sprite.dispatchEvent(type, _evt, collisionState, swallow);
            if (hit) {
              targetSprites.push(sprite);
            }
            if (evt.terminated && !type.startsWith('mouse')) {
              break;
            }
          }

          evt.targetSprites = targetSprites;
          // stopDispatch can only terminate event in the same level
          evt.terminated = false;
          return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, isCollision, swallow);
        }
      }
      evt.targetSprites = evt.targetSprites || [];
      return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'relayout',
    value: function relayout() {
      var items = this.children.filter(function (child) {
        if (child.hasLayout) {
          child.attr('layoutWidth', null);
          child.attr('layoutHeight', null);
        }
        if (child.relayout) {
          var _display = child.attr('display');
          if (_display !== '' && _display !== 'static') {
            child.relayout();
          }
        }
        return child.hasLayout;
      });

      var display = this.attr('display');
      var doLayout = Group[_layout][display];
      if (doLayout) {
        doLayout(this, items);
      }
    }
  }, {
    key: 'clearLayout',
    value: function clearLayout() {
      this[_layoutTag] = false;
      var parent = this.parent;
      while (parent) {
        if (parent[_layoutTag]) parent[_layoutTag] = false;
        parent = parent.parent;
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var display = this.attr('display');
      if (display !== '' && display !== 'static' && !this[_layoutTag]) {
        this.relayout();
      }

      var clipPath = this.attr('clip');
      if (clipPath) {
        this.svg.beginPath().to(drawingContext);
        drawingContext.clip();
      }

      if (!this.isVirtual) {
        (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);

        var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
            w = _attrSize[0],
            h = _attrSize[1];

        if (w !== '' || h !== '') {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
          drawingContext.clip();
        }
      }

      drawingContext.save();
      var scrollLeft = this.attr('scrollLeft'),
          scrollTop = this.attr('scrollTop');

      drawingContext.translate(-scrollLeft, -scrollTop);
      var sprites = this[_children];

      for (var i = 0; i < sprites.length; i++) {
        var child = sprites[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.isVisible()) {
          child.draw(t, drawingContext);
        }
        if (isDirty) {
          child.dispatchEvent('update', { target: child, renderTime: t }, true, true);
        }
      }
      drawingContext.restore();

      if (display !== '' && display !== 'static') {
        this[_layoutTag] = true;
      }
    }
  }, {
    key: 'isVirtual',
    get: function get() {
      var display = this.attr('display');
      if (display !== '') return false;

      var _attr = this.attr('border'),
          borderWidth = _attr.width,
          borderRadius = this.attr('borderRadius'),
          bgcolor = this.attr('bgcolor'),
          _attr2 = this.attr('gradients'),
          bgGradient = _attr2.bgcolor,
          _attrSize2 = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize2[0],
          height = _attrSize2[1],
          _attr3 = this.attr('anchor'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          anchorX = _attr4[0],
          anchorY = _attr4[1],
          bgimage = this.attr('bgimage');

      return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient && !bgimage;
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'childNodes',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'contentSize',
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _attrSize3 = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize3[0],
          height = _attrSize3[1];

      if (width === '' || height === '') {
        if (this.attr('clip')) {
          var svg = this.svg;
          var bounds = svg.bounds;
          width = width || bounds[2];
          height = height || bounds[3];
        } else {
          var right = void 0,
              bottom = void 0;

          right = 0;
          bottom = 0;
          this[_children].forEach(function (sprite) {
            var renderBox = sprite.renderBox;
            right = Math.max(right, renderBox[2]);
            bottom = Math.max(bottom, renderBox[3]);
          });
          width = width || right;
          height = height || bottom;
        }
      }
      return [width, height];
    }
  }]);
  return Group;
}(_basesprite2.default), _class4.Attr = GroupAttr, _temp2), (_applyDecoratedDescriptor(_class3.prototype, 'contentSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class3.prototype, 'contentSize'), _class3.prototype)), _class3);
exports.default = Group;

(0, _assign2.default)(Group.prototype, _group2.default);
Group.applyLayout('flex', layout.flexLayout);

(0, _nodetype.registerNodeType)('group', Group, true);

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = __webpack_require__(142);

var _toArray3 = _interopRequireDefault(_toArray2);

exports.pathEffect = pathEffect;
exports.createSvgPath = createSvgPath;

var _svgPathToCanvas = __webpack_require__(141);

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _sort = __webpack_require__(216);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/AlloyTeam/pasition

function _subShapes(shapes, count) {
  var _loop = function _loop(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];
    var x = shape[0][0],
        y = shape[0][1];
    shape.forEach(function () {
      newShape.push([x, y, x, y, x, y, x, y]);
    });

    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop(i);
  }
}

function _upShapes(shapes, count) {
  var _loop2 = function _loop2(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];

    shape.forEach(function (curve) {
      newShape.push(curve.slice(0));
    });
    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop2(i);
  }
}

function split(x1, y1, x2, y2, x3, y3, x4, y4, t) {
  return {
    left: _split(x1, y1, x2, y2, x3, y3, x4, y4, t),
    right: _split(x4, y4, x3, y3, x2, y2, x1, y1, 1 - t, true)
  };
}

function _split(x1, y1, x2, y2, x3, y3, x4, y4, t, reverse) {
  var x12 = (x2 - x1) * t + x1;
  var y12 = (y2 - y1) * t + y1;

  var x23 = (x3 - x2) * t + x2;
  var y23 = (y3 - y2) * t + y2;

  var x34 = (x4 - x3) * t + x3;
  var y34 = (y4 - y3) * t + y3;

  var x123 = (x23 - x12) * t + x12;
  var y123 = (y23 - y12) * t + y12;

  var x234 = (x34 - x23) * t + x23;
  var y234 = (y34 - y23) * t + y23;

  var x1234 = (x234 - x123) * t + x123;
  var y1234 = (y234 - y123) * t + y123;

  if (reverse) {
    return [x1234, y1234, x123, y123, x12, y12, x1, y1];
  }
  return [x1, y1, x12, y12, x123, y123, x1234, y1234];
}

function _splitCurves(curves, count) {
  var i = 0,
      index = 0;

  for (; i < count; i++) {
    var curve = curves[index];
    var cs = split(curve[0], curve[1], curve[2], curve[3], curve[4], curve[5], curve[6], curve[7], 0.5);
    curves.splice(index, 1);
    curves.splice(index, 0, cs.left, cs.right);

    index += 2;
    if (index >= curves.length - 1) {
      index = 0;
    }
  }
}

function pathToShapes(path) {
  var x = 0,
      y = 0;
  var shapes = [];
  path.forEach(function (p) {
    var _p = (0, _toArray3.default)(p),
        cmd = _p[0],
        points = _p.slice(1);

    if (cmd === 'M') {
      x = points[0];
      y = points[1];
    } else {
      shapes.push([x, y].concat((0, _toConsumableArray3.default)(points)));
      x = points[4];
      y = points[5];
    }
  });
  return [shapes];
}

// match two path
function match(pathA, pathB) {
  var minCurves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

  var shapesA = pathToShapes(pathA.path);
  var shapesB = pathToShapes(pathB.path);

  var lenA = shapesA.length,
      lenB = shapesB.length;

  if (lenA > lenB) {
    _subShapes(shapesB, lenA - lenB);
  } else if (lenA < lenB) {
    _upShapes(shapesA, lenB - lenA);
  }

  shapesA = (0, _sort.sort)(shapesA, shapesB);

  shapesA.forEach(function (curves, index) {
    var lenA = curves.length,
        lenB = shapesB[index].length;

    if (lenA > lenB) {
      if (lenA < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(shapesB[index], lenA - lenB);
      }
    } else if (lenA < lenB) {
      if (lenB < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(curves, lenB - lenA);
      }
    }
  });

  shapesA.forEach(function (curves, index) {
    shapesA[index] = (0, _sort.sortCurves)(curves, shapesB[index]);
  });

  return [shapesA, shapesB];
}

function lerpPoints(x1, y1, x2, y2, t) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}

function lerpCurve(curveA, curveB, t) {
  return lerpPoints(curveA[0], curveA[1], curveB[0], curveB[1], t).concat(lerpPoints(curveA[2], curveA[3], curveB[2], curveB[3], t)).concat(lerpPoints(curveA[4], curveA[5], curveB[4], curveB[5], t)).concat(lerpPoints(curveA[6], curveA[7], curveB[6], curveB[7], t));
}

function lerp(pathA, pathB, t) {
  var _match = match(pathA, pathB),
      _match2 = (0, _slicedToArray3.default)(_match, 2),
      shapesA = _match2[0],
      shapesB = _match2[1];

  return shapesA.map(function (shapeA, i) {
    var shapeB = shapesB[i];
    return shapeA.map(function (curveA, i) {
      var curveB = shapeB[i];
      var curve = lerpCurve(curveA, curveB, t);
      if (i === 0) {
        return 'M' + curve[0] + ' ' + curve[1] + ' C' + curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
      }
      return curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
    });
  }).join(' ') + 'z';
}

function pathEffect(pathA, pathB, p, s, e) {
  var ep = (p - s) / (e - s);
  if (ep <= 0) return pathA;
  if (ep >= 1) return pathB;
  pathA = new _svgPathToCanvas2.default(pathA);
  pathB = new _svgPathToCanvas2.default(pathB);
  return lerp(pathA, pathB, ep);
}

function createSvgPath(path) {
  if (typeof path === 'string') path = { d: path };
  var p = new _svgPathToCanvas2.default(path.d);
  if (path.transform || path.trim) {
    if (path.transform) {
      (0, _entries2.default)(path.transform).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (!Array.isArray(value)) value = [value];
        p[key].apply(p, (0, _toConsumableArray3.default)(value));
      });
    }
    if (path.trim) {
      p.trim();
    }
  }
  return p;
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/AlloyTeam/pasition

function shapeBox(shape) {
  var minX = shape[0][0],
      minY = shape[0][1],
      maxX = minX,
      maxY = minY;
  shape.forEach(function (curve) {
    var x1 = curve[0],
        x2 = curve[2],
        x3 = curve[4],
        x4 = curve[6],
        y1 = curve[1],
        y2 = curve[3],
        y3 = curve[5],
        y4 = curve[7];

    minX = Math.min(minX, x1, x2, x3, x4);
    minY = Math.min(minY, y1, y2, y3, y4);
    maxX = Math.max(maxX, x1, x2, x3, x4);
    maxY = Math.max(maxY, y1, y2, y3, y4);
  });

  return [minX, minY, maxX, maxY];
}

function boxDistance(boxA, boxB) {
  return Math.sqrt(Math.pow(boxA[0] - boxB[0], 2) + Math.pow(boxA[1] - boxB[1], 2)) + Math.sqrt(Math.pow(boxA[2] - boxB[2], 2) + Math.pow(boxA[3] - boxB[3], 2));
}

function curveDistance(curveA, curveB) {
  var x1 = curveA[0],
      x2 = curveA[2],
      x3 = curveA[4],
      x4 = curveA[6],
      y1 = curveA[1],
      y2 = curveA[3],
      y3 = curveA[5],
      y4 = curveA[7],
      xb1 = curveB[0],
      xb2 = curveB[2],
      xb3 = curveB[4],
      xb4 = curveB[6],
      yb1 = curveB[1],
      yb2 = curveB[3],
      yb3 = curveB[5],
      yb4 = curveB[7];

  return Math.sqrt(Math.pow(xb1 - x1, 2) + Math.pow(yb1 - y1, 2)) + Math.sqrt(Math.pow(xb2 - x2, 2) + Math.pow(yb2 - y2, 2)) + Math.sqrt(Math.pow(xb3 - x3, 2) + Math.pow(yb3 - y3, 2)) + Math.sqrt(Math.pow(xb4 - x4, 2) + Math.pow(yb4 - y4, 2));
}

function sortCurves(curvesA, curvesB) {
  var arrList = permuteCurveNum(curvesA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    var i = 0;
    arr.forEach(function (index) {
      distance += curveDistance(curvesA[index], curvesB[i++]);
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(curvesA[index]);
  });

  return result;
}

function sort(pathA, pathB) {
  var arrList = permuteNum(pathA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    arr.forEach(function (index) {
      distance += boxDistance(shapeBox(pathA[index]), shapeBox(pathB[index]));
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(pathA[index]);
  });

  return result;
}

function permuteCurveNum(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    var indexArr = [];
    for (var j = 0; j < num; j++) {
      var index = j + i;
      if (index > num - 1) index -= num;
      indexArr[index] = j;
    }

    arr.push(indexArr);
  }

  return arr;
}

function permuteNum(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }

  return permute(arr);
}

function permute(input) {
  var permArr = [],
      usedChars = [];
  function main(input) {
    var i = void 0,
        ch = void 0;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      main(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  }
  return main(input);
}

exports.sort = sort;
exports.sortCurves = sortCurves;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flexLayout = undefined;

var _flex = __webpack_require__(218);

var flexLayout = _interopRequireWildcard(_flex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.flexLayout = flexLayout;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attrs = undefined;

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.relayout = relayout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attrs = exports.attrs = {
  init: function init(attr) {
    attr.setDefault({
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch'
    });
  },
  flexDirection: function flexDirection(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexDirection', value);
  },
  flexWrap: function flexWrap(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexWrap', value);
  },
  justifyContent: function justifyContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('justifyContent', value);
  },
  alignItems: function alignItems(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignItems', value);
  },
  alignContent: function alignContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignContent', value);
  }
};

function relayout(container, items) {
  items.sort(function (a, b) {
    return (a.attributes.order || 0) - (b.attributes.order || 0);
  });

  function getSize(node, key) {
    return key === 'width' ? node.attrSize[0] : node.attrSize[1];
  }
  var style = container.attributes;

  var mainSize = 'width',
      mainStart = 'x',
      mainEnd = 'layoutRight',
      mainSign = +1,
      mainBase = 0,
      crossSize = 'height',
      crossStart = 'y',
      crossEnd = 'layoutBottom',
      crossSign = void 0,
      crossBase = void 0;

  var flexDirection = style.flexDirection;

  if (flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'layoutRight';
    mainEnd = 'x';
    mainSign = -1;
    mainBase = getSize(container, 'width');

    crossSize = 'height';
    crossStart = 'y';
    crossEnd = 'layoutBottom';
  } else if (flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'y';
    mainEnd = 'layoutBottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'x';
    crossEnd = 'layoutRight';
  } else if (flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'layoutBottom';
    mainEnd = 'y';
    mainSign = -1;
    mainBase = getSize(container, 'height');

    crossSize = 'width';
    crossStart = 'x';
    crossEnd = 'layoutRight';
  }

  if (style.flexWrap === 'wrap-reverse') {
    var _ref = [crossEnd, crossStart];
    crossStart = _ref[0];
    crossEnd = _ref[1];

    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  function isAutoSize(size) {
    return size == null || size === '';
  }

  var isAutoMainSize = isAutoSize(getSize(container, mainSize));

  var groupMainSize = void 0;

  if (isAutoMainSize) {
    // auto sizing
    var maxSize = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i],
          _item$layoutSize = (0, _slicedToArray3.default)(item.layoutSize, 2),
          width = _item$layoutSize[0],
          height = _item$layoutSize[1];

      var _size = mainSize === 'width' ? width : height;
      maxSize += _size;
    }
    if (flexDirection === 'row-reverse' || flexDirection === 'column-reverse') {
      mainBase = maxSize;
    }
    groupMainSize = maxSize;
  } else {
    groupMainSize = mainSize === 'width' ? container.layoutSize[0] : container.layoutSize[1];
  }

  var flexLine = [];
  var flexLines = [flexLine];

  var mainSpace = groupMainSize,
      crossSpace = 0;

  function setBoxLayoutSize(item, axis, size) {
    var isBorderBox = item.attr('boxSizing') === 'border-box';

    var _item$attr = item.attr('margin'),
        _item$attr2 = (0, _slicedToArray3.default)(_item$attr, 4),
        marginTop = _item$attr2[0],
        marginRight = _item$attr2[1],
        marginBottom = _item$attr2[2],
        marginLeft = _item$attr2[3];

    if (isBorderBox) {
      if (axis === 'width') {
        size = Math.max(0, size - marginRight - marginLeft);
        item.attr({ layoutWidth: size });
      } else if (axis === 'height') {
        size = Math.max(0, size - marginTop - marginBottom);
        item.attr({ layoutHeight: size });
      }
    } else {
      var borderWidth = item.attr('border').width,
          _item$attr3 = item.attr('padding'),
          _item$attr4 = (0, _slicedToArray3.default)(_item$attr3, 4),
          paddingTop = _item$attr4[0],
          paddingRight = _item$attr4[1],
          paddingBottom = _item$attr4[2],
          paddingLeft = _item$attr4[3];


      if (axis === 'width') {
        size = Math.max(0, size - 2 * borderWidth - paddingRight - paddingLeft - marginRight - marginLeft);
        item.attr({ layoutWidth: size });
      } else if (axis === 'height') {
        size = Math.max(0, size - 2 * borderWidth - paddingTop - paddingBottom - marginTop - marginBottom);
        item.attr({ layoutHeight: size });
      }
    }
  }
  // collect items into lines

  for (var _i = 0; _i < items.length; _i++) {
    var _item = items[_i];
    var itemStyle = _item.attributes;

    var _item$layoutSize2 = (0, _slicedToArray3.default)(_item.layoutSize, 2),
        itemMainSize = _item$layoutSize2[0],
        itemCrossSize = _item$layoutSize2[1];

    if (mainSize === 'height') {
      ;

      var _ref2 = [itemCrossSize, itemMainSize];
      itemMainSize = _ref2[0];
      itemCrossSize = _ref2[1];
    }if (itemStyle.flex !== '') {
      flexLine.push(_item);
    } else if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      mainSpace -= itemMainSize;
      crossSpace = Math.max(crossSpace, itemCrossSize);
      flexLine.push(_item);
    } else {
      if (itemMainSize > groupMainSize) {
        setBoxLayoutSize(_item, mainSize, groupMainSize);
        itemMainSize = groupMainSize;
        itemCrossSize = mainSize === 'width' ? _item.layoutSize[1] : _item.layoutSize[0];
      }
      if (mainSpace < itemMainSize) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [_item];
        flexLines.push(flexLine);
        mainSpace = groupMainSize;
        crossSpace = 0;
      } else {
        flexLine.push(_item);
      }
      crossSpace = Math.max(crossSpace, itemCrossSize);
      mainSpace -= itemMainSize;
    }
  }
  flexLine.mainSpace = mainSpace;

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    var _size2 = getSize(container, crossSize);
    flexLine.crossSpace = !isAutoSize(_size2) ? _size2 : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  function fixAnchor(item) {
    var _item$originalRect = (0, _slicedToArray3.default)(item.originalRect, 2),
        left = _item$originalRect[0],
        top = _item$originalRect[1],
        margin = item.attr('margin');
    // console.log(margin[3])


    item.attr({ x: function x(_x) {
        return _x - left + margin[3];
      } });
    item.attr({ y: function y(_y) {
        return _y - top + margin[0];
      } });
  }

  if (mainSpace < 0) {
    // overflow (happens only if container is single line), scale every item
    var scale = groupMainSize / (groupMainSize - mainSpace);
    var currentMain = mainBase;
    for (var _i2 = 0; _i2 < items.length; _i2++) {
      var _item2 = items[_i2];
      var _itemStyle = _item2.attributes;
      var boxSize = mainSize === 'width' ? _item2.layoutSize[0] : _item2.layoutSize[1];

      if (_itemStyle.flex !== '') {
        boxSize = 0;
      }

      boxSize *= scale;

      _item2.attr(mainStart, currentMain);
      _item2.attr(mainEnd, currentMain + mainSign * boxSize);
      setBoxLayoutSize(_item2, mainSize, boxSize);
      currentMain = _item2.attr(mainEnd);
    }
  } else {
    // process each flex line
    flexLines.forEach(function (items) {
      var mainSpace = items.mainSpace;
      var flexTotal = 0;
      for (var _i3 = 0; _i3 < items.length; _i3++) {
        var _item3 = items[_i3];
        var _itemStyle2 = _item3.attributes;

        flexTotal += _itemStyle2.flex === '' ? 0 : parseInt(_itemStyle2.flex, 10);
      }

      if (flexTotal > 0) {
        // There is flexible flex items
        var _currentMain = mainBase;
        for (var _i4 = 0; _i4 < items.length; _i4++) {
          var _item4 = items[_i4];
          var _itemStyle3 = _item4.attributes;
          var _boxSize = mainSize === 'width' ? _item4.layoutSize[0] : _item4.layoutSize[1];

          if (_itemStyle3.flex !== '') {
            _boxSize = mainSpace / flexTotal * parseInt(_itemStyle3.flex, 10);
          }

          _item4.attr(mainStart, _currentMain);
          _item4.attr(mainEnd, _currentMain + mainSign * _boxSize);
          setBoxLayoutSize(_item4, mainSize, _boxSize);
          _currentMain = _item4.attr(mainEnd);
        }
      } else {
        var _currentMain2 = mainBase,
            _step = 0;
        // There is *NO* flexible flex items, which means, justifyContent shoud work
        var justifyContent = style.justifyContent;

        if (justifyContent === 'flex-end') {
          _currentMain2 = mainSpace * mainSign + mainBase;
          _step = 0;
        } else if (justifyContent === 'center') {
          _currentMain2 = mainSpace / 2 * mainSign + mainBase;
          _step = 0;
        } else if (justifyContent === 'space-between') {
          _step = mainSpace / (items.length - 1) * mainSign;
          _currentMain2 = mainBase;
        } else if (justifyContent === 'space-around') {
          _step = mainSpace / items.length * mainSign;
          _currentMain2 = _step / 2 + mainBase;
        }

        for (var _i5 = 0; _i5 < items.length; _i5++) {
          var _item5 = items[_i5];
          var _boxSize2 = mainSize === 'width' ? _item5.layoutSize[0] : _item5.layoutSize[1];

          _item5.attr(mainStart, _currentMain2);
          _item5.attr(mainEnd, _item5.attr(mainStart) + mainSign * _boxSize2);
          setBoxLayoutSize(_item5, mainSize, _boxSize2);
          _currentMain2 = _item5.attr(mainEnd) + _step;
        }
      }
    });
  }

  // compute the cross axis sizes
  // align-items, align-self
  var crossSizeValue = void 0;
  var size = getSize(container, crossSize);
  if (isAutoSize(size)) {
    // auto sizing
    crossSpace = 0;
    crossSizeValue = 0;
    for (var _i6 = 0; _i6 < flexLines.length; _i6++) {
      crossSizeValue += flexLines[_i6].crossSpace;
    }
    // setBoxSize(container, crossSize, crossSizeValue)
  } else {
    crossSpace = size;
    for (var _i7 = 0; _i7 < flexLines.length; _i7++) {
      crossSpace -= flexLines[_i7].crossSpace;
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = isAutoSize(size) ? crossSizeValue : size;
  } else {
    crossBase = 0;
  }

  var step = 0;
  var alignContent = style.alignContent;

  if (alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
  } else if (alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
  } else if (alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1);
  } else if (alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    crossBase += crossSign * step / 2;
  }

  flexLines.forEach(function (items) {
    var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

    for (var _i8 = 0; _i8 < items.length; _i8++) {
      var _item6 = items[_i8];

      var align = _item6.attributes.alignSelf || style.alignItems;

      var _size3 = crossSize === 'width' ? _item6.offsetSize[0] : _item6.offsetSize[1];

      if (align === 'flex-start') {
        _item6.attr(crossStart, crossBase);
        _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _size3);
      }

      if (align === 'flex-end') {
        _item6.attr(crossEnd, crossBase + crossSign * lineCrossSize);
        _item6.attr(crossStart, _item6.attr(crossEnd) - crossSign * _size3);
      }

      if (align === 'center') {
        _item6.attr(crossStart, crossBase + crossSign * (lineCrossSize - _size3) / 2);
        _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _size3);
      }

      if (align === 'stretch') {
        _item6.attr(crossStart, crossBase);
        _item6.attr(crossEnd, crossBase + crossSign * (!isAutoSize(getSize(_item6, crossSize)) ? _size3 : lineCrossSize));
        // setBoxLayoutSize(item, crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
        var crossAttr = crossSize === 'width' ? 'layoutWidth' : 'layoutHeight';
        _item6.attr(crossAttr, crossSign * (_item6.attr(crossEnd) - _item6.attr(crossStart)));
      }

      fixAnchor(_item6);
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zOrder = (0, _symbol2.default)('zOrder');

exports.default = {
  appendChild: function appendChild(sprite) {
    var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    sprite.remove();

    var children = this.children;
    children.push(sprite);

    this[_zOrder] = this[_zOrder] || 0;
    sprite.connect(this, this[_zOrder]++);

    for (var i = children.length - 1; i > 0; i--) {
      var a = children[i],
          b = children[i - 1];

      if (a.zIndex < b.zIndex) {
        children[i] = b;
        children[i - 1] = a;
      }
    }

    if (update) {
      sprite.forceUpdate();
    }
    return sprite;
  },
  append: function append() {
    var _this = this;

    for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
      sprites[_key] = arguments[_key];
    }

    sprites.forEach(function (sprite) {
      return _this.appendChild(sprite);
    });
  },
  removeChild: function removeChild(sprite) {
    var idx = this.children.indexOf(sprite);
    if (idx === -1) {
      return null;
    }
    this.children.splice(idx, 1);
    if (sprite.isVisible() || sprite.lastRenderBox) {
      sprite.forceUpdate();
    }
    sprite.disconnect(this);
    return sprite;
  },
  clear: function clear() {
    var _this2 = this;

    var children = this.children.slice(0);
    return children.map(function (child) {
      return _this2.removeChild(child);
    });
  },
  insertBefore: function insertBefore(newchild, refchild) {
    if (refchild == null) {
      return this.appendChild(newchild);
    }
    var idx = this.children.indexOf(refchild);
    if (idx >= 0) {
      this.removeChild(newchild);
      this.children.splice(idx, 0, newchild);
      var refZOrder = refchild.zOrder;
      newchild.connect(this, refZOrder);
      newchild.forceUpdate();

      for (var i = 0; i < this.children.length; i++) {
        if (i !== idx) {
          var child = this.children[i],
              zOrder = child.zOrder;

          if (zOrder >= refZOrder) {
            delete child.zOrder;
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true
            });
          }
        }
      }

      this[_zOrder] = this[_zOrder] || 0;
      this[_zOrder]++;
    }

    return newchild;
  }
};

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.clearDirtyRect = clearDirtyRect;
exports.clearDirtyRects = clearDirtyRects;

var _spriteUtils = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export function isSpriteDirty(sprite, dirtyEls, isUpdateEl = false) {
//   for(let i = 0; i < dirtyEls.length; i++) {
//     const dirtyEl = dirtyEls[i]
//     const box1 = dirtyEl.renderBox,
//       box2 = sprite.renderBox,
//       box3 = dirtyEl.lastRenderBox

//     if(boxIntersect(box1, box2) || isUpdateEl && box3 && boxIntersect(box3, box2)) {
//       return true
//     }
//   }
//   return false
// }

function clearDirtyRect(outputContext, box, width, height) {
  box = box.map(function (b, i) {
    return i < 2 ? b - 1 : b + 1;
  });
  var dirtyBox = (0, _spriteUtils.boxIntersect)(box, [0, 0, width, height]);

  if (dirtyBox) {
    var dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);
    outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(dirtyRect));
  }
}

function clearDirtyRects(outputContext, dirtyEls) {
  var isUpdateEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _outputContext$canvas = outputContext.canvas,
      width = _outputContext$canvas.width,
      height = _outputContext$canvas.height;


  outputContext.beginPath();
  for (var i = 0; i < dirtyEls.length; i++) {
    var dirtyEl = dirtyEls[i];
    var box = dirtyEl.renderBox;

    clearDirtyRect(outputContext, box, width, height);

    if (isUpdateEl) {
      var lastRenderBox = dirtyEl.lastRenderBox;
      if (lastRenderBox && !(0, _spriteUtils.boxEqual)(lastRenderBox, box)) {
        clearDirtyRect(outputContext, lastRenderBox, width, height);
      }
    }
  }
  outputContext.clip();
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _desc, _value, _class, _desc2, _value2, _class2, _class3, _temp;

var _spriteUtils = __webpack_require__(152);

var _basesprite = __webpack_require__(168);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _render = __webpack_require__(201);

var _path = __webpack_require__(215);

var _nodetype = __webpack_require__(200);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var PathSpriteAttr = (_dec = (0, _spriteUtils.parseValue)(parseFloat), _dec2 = (0, _spriteUtils.parseValue)(parseFloat), _dec3 = (0, _spriteUtils.deprecate)('Instead use strokeColor.'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(PathSpriteAttr, _BaseSprite$Attr);

  function PathSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, PathSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PathSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(PathSpriteAttr)).call(this, subject));

    _this.setDefault({
      lineWidth: 1,
      lineDash: null,
      lineDashOffset: 0,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeColor: '',
      fillColor: '',
      bounding: 'box'
    }, {
      color: function color() {
        return this.strokeColor;
      },
      d: function d() {
        return this.path ? this.path.d : null;
      }
    });
    return _this;
  }

  (0, _createClass3.default)(PathSpriteAttr, [{
    key: 'path',
    set: function set(val) {
      this.clearCache();
      this.clearFlow();
      if (val) {
        val = typeof val === 'string' ? { d: val } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('path', val);
      } else {
        this.subject.svg = null;
        this.set('path', null);
      }
    }
  }, {
    key: 'd',
    set: function set(val) {
      if (val) {
        var path = this.get('path');
        if (!path) {
          this.path = { d: val };
        } else {
          this.path = (0, _assign2.default)(path, { d: val });
        }
      } else {
        this.path = null;
      }
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.clearCache();
      this.clearFlow();
      this.set('lineWidth', Math.round(val));
    }
  }, {
    key: 'lineDash',
    set: function set(val) {
      this.clearCache();
      this.set('lineDash', val);
    }
  }, {
    key: 'lineDashOffset',
    set: function set(val) {
      this.clearCache();
      this.set('lineDashOffset', val);
    }

    /**
      lineCap: butt|round|square
     */

  }, {
    key: 'lineCap',
    set: function set(val) {
      this.clearCache();
      this.set('lineCap', val);
    }

    /**
      lineJoin: miter|round|bevel
     */

  }, {
    key: 'lineJoin',
    set: function set(val) {
      this.clearCache();
      this.set('lineJoin', val);
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.clearCache();
      this.set('strokeColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.clearCache();
      this.set('fillColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'flexible',
    set: function set(val) {
      this.clearCache();
      this.clearFlow();
      this.set('flexible', val);
    }
  }, {
    key: 'bounding',
    set: function set(val) {
      // box | path
      this.set('bounding', val);
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.strokeColor = val;
    }
  }]);
  return PathSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'path', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'path'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'd', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_dec, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineDash', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineDash'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineDashOffset', [_dec2, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineDashOffset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineCap', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineCap'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineJoin', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexible', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexible'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bounding', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'bounding'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_dec3, _spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype)), _class));
var Path = (_class2 = (_temp = _class3 = function (_BaseSprite) {
  (0, _inherits3.default)(Path, _BaseSprite);

  function Path(attr) {
    (0, _classCallCheck3.default)(this, Path);

    if (typeof attr === 'string') {
      attr = { d: attr };
    }
    return (0, _possibleConstructorReturn3.default)(this, (Path.__proto__ || (0, _getPrototypeOf2.default)(Path)).call(this, attr));
  }

  (0, _createClass3.default)(Path, [{
    key: 'getPointAtLength',
    value: function getPointAtLength(length) {
      if (this.svg) {
        return this.svg.getPointAtLength(length);
      }
      return [0, 0];
    }
  }, {
    key: 'getPathLength',
    value: function getPathLength() {
      if (this.svg) {
        return this.svg.getTotalLength();
      }
      return 0;
    }
  }, {
    key: 'findPath',
    value: function findPath(offsetX, offsetY) {
      var rect = this.originalRect;
      var pathOffset = this.pathOffset;
      if (this.svg && this.svg.isPointInPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1])) {
        return [this.svg];
      }
      return [];
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'pointCollision', this).call(this, evt)) {
        var offsetX = evt.offsetX,
            offsetY = evt.offsetY;

        var svg = this.svg;
        if (svg) {
          var bounds = svg.bounds;
          offsetX += Math.min(0, bounds[0]);
          offsetY += Math.min(0, bounds[1]);
        }
        evt.targetPaths = this.findPath(offsetX, offsetY);
        if (this.attr('bounding') === 'path') {
          return evt.targetPaths.length > 0;
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'render', this).call(this, t, drawingContext);
      var d = this.attr('d'),
          lineWidth = this.attr('lineWidth'),
          lineCap = this.attr('lineCap'),
          lineJoin = this.attr('lineJoin'),
          lineDash = this.attr('lineDash'),
          flexible = this.attr('flexible');

      if (d) {
        var svg = this.svg;

        var _svg$bounds = (0, _slicedToArray3.default)(svg.bounds, 4),
            ox = _svg$bounds[0],
            oy = _svg$bounds[1],
            ow = _svg$bounds[2],
            oh = _svg$bounds[3];

        var _pathOffset = (0, _slicedToArray3.default)(this.pathOffset, 2),
            px = _pathOffset[0],
            py = _pathOffset[1];

        var _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            w = _contentSize[0],
            h = _contentSize[1];

        if (w < ow || h < oh) {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, w, h);
          drawingContext.clip();
        }

        if (flexible) {
          svg.save();
          var sw = w / (ow - Math.min(0, ox) + 2 * px);
          svg.scale(sw, sw);
          ox *= sw;
          oy *= sw;
          px *= sw;
          py *= sw;
        }

        if (ox < 0 || oy < 0) {
          drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy));
        }
        drawingContext.translate(px, py);

        svg.beginPath().to(drawingContext);

        if (flexible) {
          svg.restore();
        }

        drawingContext.lineWidth = lineWidth;
        drawingContext.lineCap = lineCap;
        drawingContext.lineJoin = lineJoin;

        if (lineDash != null) {
          drawingContext.setLineDash(lineDash);

          var lineDashOffset = this.attr('lineDashOffset');
          drawingContext.lineDashOffset = lineDashOffset;
        }

        var fillColor = (0, _render.findColor)(drawingContext, this, 'fillColor');
        if (fillColor) {
          drawingContext.fillStyle = fillColor;
        }

        var strokeColor = (0, _render.findColor)(drawingContext, this, 'strokeColor');

        if (!strokeColor && !fillColor) {
          strokeColor = (0, _spriteUtils.parseColorString)('black');
        }
        if (strokeColor) {
          drawingContext.strokeStyle = strokeColor;
        }

        if (fillColor) {
          drawingContext.fill();
        }
        if (strokeColor) {
          drawingContext.stroke();
        }
      }
    }
  }, {
    key: 'path',
    set: function set(val) {
      this.attr('path', val);
    },
    get: function get() {
      return this.attr('path');
    }
  }, {
    key: 'lineWidth',
    get: function get() {
      var lineWidth = this.attr('lineWidth'),
          gradients = this.attr('gradients'),
          fillColor = this.attr('fillColor'),
          strokeColor = this.attr('strokeColor');

      var hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
          hasFillColor = fillColor || gradients && gradients.fillColor;

      if (!hasStrokeColor && hasFillColor) {
        // fill: ignore stroke
        return 0;
      }
      return lineWidth;
    }
  }, {
    key: 'pathOffset',
    get: function get() {
      var lw = Math.round(this.lineWidth);
      return [lw, lw];
    }
  }, {
    key: 'pathSize',
    get: function get() {
      return this.svg ? this.svg.size : [0, 0];
    }
  }, {
    key: 'contentSize',
    get: function get() {
      if (!this.svg) return (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'contentSize', this);

      var bounds = this.svg.bounds;

      var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1];

      var pathOffset = this.pathOffset;

      if (width === '') {
        width = bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0];
      }
      if (height === '') {
        height = bounds[3] - Math.min(0, bounds[1]) + 2 * pathOffset[1];
      }

      if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
        height = Math.ceil(height * width / (bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0]));
      }

      return [width, height].map(Math.ceil);
    }
  }, {
    key: 'originalRect',
    get: function get() {
      var svg = this.svg;
      if (svg) {
        var bounds = svg.bounds,
            offset = this.pathOffset;

        var _offsetSize = (0, _slicedToArray3.default)(this.offsetSize, 2),
            width = _offsetSize[0],
            height = _offsetSize[1],
            _attr = this.attr('anchor'),
            _attr2 = (0, _slicedToArray3.default)(_attr, 2),
            anchorX = _attr2[0],
            anchorY = _attr2[1];

        var rect = [0, 0, width, height],
            offsetX = Math.min(0, bounds[0]),
            offsetY = Math.min(0, bounds[1]);

        rect[0] = offsetX - offset[0] - anchorX * (width + offsetX - 2 * offset[0]);
        rect[1] = offsetY - offset[1] - anchorY * (height + offsetY - 2 * offset[1]);
        return rect;
      }

      return (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'originalRect', this);
    }
  }]);
  return Path;
}(_basesprite2.default), _class3.Attr = PathSpriteAttr, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'contentSize', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'contentSize'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'originalRect', [_spriteUtils.flow], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'originalRect'), _class2.prototype)), _class2);
exports.default = Path;


Path.setAttributeEffects({
  d: _path.pathEffect,
  path: function path(path1, path2, p, start, end) {
    path1 = (0, _path.createSvgPath)(path1);
    path2 = (0, _path.createSvgPath)(path2);
    return (0, _path.pathEffect)(path1.d, path2.d, p, start, end);
  }
});

(0, _nodetype.registerNodeType)('path', Path);

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteCore = __webpack_require__(1);

var _resource = __webpack_require__(223);

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadBgImagePassport = (0, _symbol2.default)('loadBgImagePassport');

var passport = void 0;

_spriteCore.BaseSprite.prototype.loadBgImage = function (val) {
  var _this = this;

  var res = void 0;
  if (val.id) {
    res = _resource2.default.loadTexture({ id: val.id });
  } else if (val.src) {
    res = _resource2.default.loadTexture(val.src);
  }
  if (res instanceof _promise2.default) {
    passport = (0, _symbol2.default)('passport');
    this[_loadBgImagePassport] = passport;
    res.then(function (_ref) {
      var img = _ref.img,
          texture = _ref.texture;

      if (passport === _this[_loadBgImagePassport]) {
        var bgimage = _this.attr('bgimage');
        bgimage.image = img;
        _this.attr('bgimage', null);
        _this.attr('bgimage', bgimage);
      }
    });
  } else if (res) {
    val.image = res.img;
  }

  return val;
};

exports.default = _spriteCore.BaseSprite;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(224);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = __webpack_require__(137);

var _entries2 = _interopRequireDefault(_entries);

var _asyncToGenerator2 = __webpack_require__(227);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(69);

var _map2 = _interopRequireDefault(_map);

var _platform = __webpack_require__(228);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = __webpack_require__(231);

var loadedResources = new _map2.default();

/**
  loadTexture({
    id: 'bird1',
    src: 'http://some.path/brid1.png'
  })
 */

var Resource = {
  loadTexture: function loadTexture(texture) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;

    if (typeof texture === 'string') {
      texture = { src: texture };
    }
    if (!texture.id) {
      texture.id = texture.src;
    }

    var mapKey = texture.id;

    if (!loadedResources.has(mapKey)) {
      var promise = new _promise2.default(function (resolve, reject) {
        var timer = setTimeout(function () {
          reject(new Error('load img timeout'));
        }, timeout);

        (0, _platform.loadImage)(texture.src).then(function (img) {
          // save image not canvas for svg preserveAspectRatio
          resolve({ img: img, texture: texture, fromCache: false });
          loadedResources.set(mapKey, img);
          clearTimeout(timer);
        });
      });
      loadedResources.set(mapKey, promise);
      return promise;
    }
    var img = loadedResources.get(mapKey);
    if (img instanceof _promise2.default) {
      return img;
    }
    return {
      img: img,
      texture: texture,
      fromCache: true
    };
  },

  /**
    u3d-json compatible: https://www.codeandweb.com/texturepacker
    {
      frames: {
        key: {
          frame: {x, y, w, h},
          trimmed: ...,
          rotated: true|false,
          spriteSourceSize: {x, y, w, h},
          sourceSize: {w, h}
        }
      }
    }
   */
  loadFrames: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(src, frameData) {
      var texture, frames;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof frameData === 'string')) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return axios.get(frameData);

            case 3:
              frameData = _context.sent;

              frameData = frameData.data;

            case 5:
              _context.next = 7;
              return this.loadTexture(src);

            case 7:
              texture = _context.sent;
              frames = frameData.frames;


              (0, _entries2.default)(frames).forEach(function (_ref2) {
                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                    key = _ref3[0],
                    frame = _ref3[1];

                var _frame$sourceSize = frame.sourceSize,
                    w = _frame$sourceSize.w,
                    h = _frame$sourceSize.h;


                var canvas = (0, _platform.createCanvas)(w, h),
                    srcRect = frame.frame,
                    rect = frame.spriteSourceSize,
                    context = canvas.getContext('2d');

                var rotated = frame.rotated;

                context.save();

                if (rotated) {
                  context.translate(0, h);
                  context.rotate(-0.5 * Math.PI);

                  var tmp = rect.y;
                  rect.y = rect.x;
                  rect.x = h - srcRect.h - tmp;

                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.h, srcRect.w, rect.x, rect.y, rect.h, rect.w);
                } else {
                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.w, srcRect.h, rect.x, rect.y, rect.w, rect.h);
                }

                context.restore();

                loadedResources.set(key, canvas);
              });

              return _context.abrupt('return', texture);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadFrames(_x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return loadFrames;
  }()
};

exports.default = Resource;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(225);


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(226);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 226 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeDebugToolsObserver = exports.setDebugToolsObserver = exports._debugger = undefined;

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

exports.createCanvas = createCanvas;
exports.loadImage = loadImage;
exports.getContainer = getContainer;
exports.shim = shim;

var _devtools = __webpack_require__(229);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCanvas() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function loadImage(src) {
  var img = document.createElement('img');
  if (typeof src === 'string' && !/^data:image\/(.*);base64/.test(src)) {
    // base64 dont need crossOrigin - fix early webkit cross domain bug
    img.crossOrigin = 'anonymous';
  }

  var promise = new _promise2.default(function (resolve) {
    img.addEventListener('load', function () {
      resolve(img);
    });
  });
  img.src = src;
  return promise;
}

function getContainer(container) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  if (!container) {
    throw new Error('Container is not defined or cannot found.');
  }
  return container;
}

exports._debugger = _devtools._debugger;
exports.setDebugToolsObserver = _devtools.setDebugToolsObserver;
exports.removeDebugToolsObserver = _devtools.removeDebugToolsObserver;
function shim() {
  // CustomEvent polyfill https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent
  try {
    // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
    // b : There is no window.CustomEvent object
    new window.CustomEvent('T');
  } catch (e) {
    var CustomEvent = function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };

      var evt = document.createEvent('CustomEvent');

      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  }
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._debugger = undefined;

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

exports.setDebugToolsObserver = setDebugToolsObserver;
exports.removeDebugToolsObserver = removeDebugToolsObserver;

var _sprite = __webpack_require__(230);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _debugToolsHandler = (0, _symbol2.default)('debugToolsHandler');
var _debugToolsOpened = false;

var _debugger = exports._debugger = {
  selectedSprite: null
};

function setDebugToolsObserver(scene, layer) {
  var observer = void 0,
      mouseTip = void 0,
      tipEl = void 0,
      debugLayer = void 0;

  layer[_debugToolsHandler] = layer[_debugToolsHandler] || {};
  layer[_debugToolsHandler].initObserver = function () {
    var handler = void 0;

    debugLayer = scene.layer('__debuglayer__');
    debugLayer.canvas.style.background = 'transparent';
    debugLayer.zIndex = 2147483647;

    function hideMouseTip() {
      if (_debugger.selectedSprite) {
        _debugger.selectedSprite.off('update', handler);
        _debugger.selectedSprite = null;
        var event = new CustomEvent('spritejs: observer', { detail: '' });
        document.dispatchEvent(event);
        if (tipEl) {
          tipEl.attr('opacity', 0);
        }
      }
    }

    observer = function observer(evt) {
      var sprites = evt.targetSprites;
      if (sprites.length) {
        var sprite = sprites[0];
        if (sprite) {
          if (_debugger.selectedSprite === sprite) {
            return;
          }if (_debugger.selectedSprite) {
            var _event = new CustomEvent('spritejs: observer', { detail: '' });
            document.dispatchEvent(_event);
            _debugger.selectedSprite.off('update', handler);
          }

          var event = new CustomEvent('spritejs: observer', { detail: sprite.attr() });
          document.dispatchEvent(event);

          var applyObserver = function applyObserver(sprite) {
            var event = new CustomEvent('spritejs: observer', { detail: sprite.attr() });
            document.dispatchEvent(event);
            setMouseTip(sprite);
          };

          handler = function handler(evt) {
            applyObserver(evt.target);
          };

          applyObserver(sprite);

          sprite.on('update', handler);
          _debugger.selectedSprite = sprite;
          evt.stopDispatch();
        }
      } else {
        hideMouseTip();
      }
    };
    layer.on('click', observer);

    function setMouseTip(sprite) {
      var renderRect = sprite.renderRect;
      if (!tipEl) {
        tipEl = new _sprite2.default();
        tipEl.attr({
          zIndex: Infinity,
          bgcolor: 'rgba(0, 0, 0, 0.3)'
        });
        debugLayer.append(tipEl);
      }
      tipEl.attr({
        pos: [renderRect[0], renderRect[1]],
        size: [renderRect[2], renderRect[3]]
      });
    }

    mouseTip = function mouseTip(evt) {
      if (_debugger.selectedSprite) {
        return;
      }

      var sprite = evt.targetSprites[0];
      if (sprite) {
        setMouseTip(sprite);
      } else {
        debugLayer.remove(tipEl);
        tipEl = null;
      }
    };
    layer.on('mousemove', mouseTip);
    _debugToolsOpened = true;
  };

  layer[_debugToolsHandler].removeObserver = function () {
    if (observer) {
      layer.off('click', observer);
      observer = null;
    }
    if (mouseTip) {
      layer.off('mousemove', mouseTip);
      mouseTip = null;
    }
    if (tipEl) {
      layer.remove(tipEl);
      tipEl = null;
    }
    if (debugLayer) {
      scene.removeLayer(debugLayer);
    }
    _debugger.selectedSprite = null;
    _debugToolsOpened = false;
  };

  if (_debugToolsOpened) {
    layer[_debugToolsHandler].initObserver();
  }

  layer[_debugToolsHandler].attrChange = function (evt) {
    var _evt$detail = evt.detail,
        key = _evt$detail.key,
        value = _evt$detail.value;

    if (_debugger.selectedSprite) {
      var sprite = _debugger.selectedSprite;
      var keys = key.split('.');
      var prop = keys[1];

      if (keys.length === 2) {
        /* eslint-disable no-empty */
        try {
          sprite.attr(prop, value);
        } catch (ex) {}
        /* eslint-enable no-empty */
      } else {
        var attr = sprite.attr(prop);
        for (var i = 2; i < keys.length - 1; i++) {
          attr[keys[i]] = attr[keys[i]] || {};
        }
        attr[keys[keys.length - 1]] = value;
        /* eslint-disable no-empty */
        try {
          sprite.attr(prop, attr);
        } catch (ex) {}
        /* eslint-enable no-empty */
      }
    }
  };

  var debugToolsHandler = layer[_debugToolsHandler];
  document.addEventListener('spritejs: devtools-opened', debugToolsHandler.initObserver);
  document.addEventListener('spritejs: devtools-closed', debugToolsHandler.removeObserver);
  document.addEventListener('spritejs: attr-change', debugToolsHandler.attrChange);
}

function removeDebugToolsObserver(layer) {
  var debugToolsHandler = layer[_debugToolsHandler];
  if (debugToolsHandler) {
    document.removeEventListener('spritejs: devtools-opened', debugToolsHandler.initObserver);
    document.removeEventListener('spritejs: devtools-closed', debugToolsHandler.removeObserver);
    document.removeEventListener('spritejs: attr-change', debugToolsHandler.attrChange);
  }
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(169);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class;

var _spriteCore = __webpack_require__(1);

var _resource = __webpack_require__(223);

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = __webpack_require__(195);

var attr = _spriteCore.utils.attr;
var _mapTextures = (0, _symbol2.default)('mapTextures'),
    _loadTexturePassport = (0, _symbol2.default)('loadTexturePassport');

var ResAttr = (_class = function (_Sprite$Attr) {
  (0, _inherits3.default)(ResAttr, _Sprite$Attr);

  function ResAttr() {
    (0, _classCallCheck3.default)(this, ResAttr);
    return (0, _possibleConstructorReturn3.default)(this, (ResAttr.__proto__ || (0, _getPrototypeOf2.default)(ResAttr)).apply(this, arguments));
  }

  (0, _createClass3.default)(ResAttr, [{
    key: _mapTextures,
    value: function value(textures) {
      var clearCache = false;
      var res = textures.map(function (_ref) {
        var img = _ref.img,
            texture = _ref.texture,
            fromCache = _ref.fromCache;

        if (!fromCache) clearCache = true;
        return (0, _assign2.default)({}, texture, { image: img });
      });
      if (clearCache) {
        this.subject.forceUpdate(true);
      }
      (0, _get3.default)(ResAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(ResAttr.prototype), 'loadTextures', this).call(this, res);
    }
  }, {
    key: 'loadTextures',
    value: function loadTextures(textures) {
      var _this2 = this;

      // adaptive textures
      var passport = (0, _symbol2.default)('passport');
      this[_loadTexturePassport] = passport;
      var hasPromise = false;
      var tasks = textures.map(function (texture) {
        if (texture.image) {
          return { img: texture.image, texture: texture };
        }

        var loadingTexture = _resource2.default.loadTexture(texture);
        if (loadingTexture instanceof _promise2.default) {
          hasPromise = true;
        }
        return loadingTexture;
      });

      if (hasPromise) {
        _promise2.default.all(tasks).then(function (res) {
          if (_this2[_loadTexturePassport] === passport) {
            // prevent multicall loadTextures
            _this2[_mapTextures](res);
          }
        });
      } else {
        // if preload image, calculate the size of sprite synchronously
        this[_mapTextures](tasks);
      }
    }
  }, {
    key: 'textures',
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (typeof texture === 'string') {
          texture = { src: texture };
        } else if (!texture.src && !texture.id && !texture.image) {
          texture = { image: texture };
        }

        return texture;
      });

      this.set('textures', textures);
      this.loadTextures(textures);
    }
  }]);
  return ResAttr;
}(_spriteCore.Sprite.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype)), _class);


_spriteCore.Sprite.Attr = ResAttr;

exports.default = _spriteCore.Sprite;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(232);

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);
var bind = __webpack_require__(234);
var Axios = __webpack_require__(236);
var defaults = __webpack_require__(237);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(254);
axios.CancelToken = __webpack_require__(255);
axios.isCancel = __webpack_require__(251);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(256);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(234);
var isBuffer = __webpack_require__(235);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 235 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(237);
var utils = __webpack_require__(233);
var InterceptorManager = __webpack_require__(248);
var dispatchRequest = __webpack_require__(249);
var isAbsoluteURL = __webpack_require__(252);
var combineURLs = __webpack_require__(253);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(233);
var normalizeHeaderName = __webpack_require__(238);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(239);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(239);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(115)))

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);
var settle = __webpack_require__(240);
var buildURL = __webpack_require__(243);
var parseHeaders = __webpack_require__(244);
var isURLSameOrigin = __webpack_require__(245);
var createError = __webpack_require__(241);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(246);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("none" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(247);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(241);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(242);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);
var transformData = __webpack_require__(250);
var isCancel = __webpack_require__(251);
var defaults = __webpack_require__(237);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(233);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(254);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(224);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(227);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = __webpack_require__(173);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteCore = __webpack_require__(1);

var _platform = __webpack_require__(228);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _resolution = (0, _symbol2.default)('resolution');

var ExLayer = function (_Layer) {
  (0, _inherits3.default)(ExLayer, _Layer);

  function ExLayer(id) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, ExLayer);

    if ((typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id)) === 'object') {
      opts = id;
      id = opts.id || 'id_' + Math.random().toString().slice(2, 10);
    }
    var _opts = opts,
        context = _opts.context,
        resolution = _opts.resolution,
        _opts$handleEvent = _opts.handleEvent,
        handleEvent = _opts$handleEvent === undefined ? true : _opts$handleEvent,
        _opts$evaluateFPS = _opts.evaluateFPS,
        evaluateFPS = _opts$evaluateFPS === undefined ? false : _opts$evaluateFPS,
        _opts$renderMode = _opts.renderMode,
        renderMode = _opts$renderMode === undefined ? 'repaintAll' : _opts$renderMode,
        _opts$autoRender = _opts.autoRender,
        autoRender = _opts$autoRender === undefined ? true : _opts$autoRender;


    context = context || (0, _platform.createCanvas)().getContext('2d');
    var canvas = context.canvas;
    canvas.dataset.layerId = id;
    canvas.style.position = 'absolute';

    var _this = (0, _possibleConstructorReturn3.default)(this, (ExLayer.__proto__ || (0, _getPrototypeOf2.default)(ExLayer)).call(this, { context: context, handleEvent: handleEvent, evaluateFPS: evaluateFPS, renderMode: renderMode, autoRender: autoRender }));

    if (resolution) {
      _this.resolution = resolution;
    } else {
      _this[_resolution] = [_this.canvas.width, _this.canvas.height, 0, 0];
    }
    return _this;
  }

  (0, _createClass3.default)(ExLayer, [{
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX | 0,
            layerY = evt.layerY | 0;

        var _resolution2 = (0, _slicedToArray3.default)(this.resolution, 4),
            width = _resolution2[0],
            height = _resolution2[1],
            offsetLeft = _resolution2[2],
            offsetTop = _resolution2[3];

        layerX += offsetLeft;
        layerY += offsetTop;

        if (layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }
        return false;
      }
      /* istanbul ignore next  */
      return true;
    }
  }, {
    key: 'clearContext',
    value: function clearContext() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.outputContext;

      if (context.canvas) {
        var resolution = this.resolution,
            offsetTop = resolution[3],
            offsetLeft = resolution[2];

        context.clearRect(-offsetLeft, -offsetTop, context.canvas.width, context.canvas.height);
      }
    }
  }, {
    key: 'toLocalPos',
    value: function toLocalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * resolution[0] / viewport[0] - resolution[2];
      y = y * resolution[1] / viewport[1] - resolution[3];

      return [x, y];
    }
  }, {
    key: 'toGlobalPos',
    value: function toGlobalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * viewport[0] / resolution[0] + resolution[2];
      y = y * viewport[1] / resolution[1] + resolution[3];

      return [x, y];
    }
  }, {
    key: 'takeSnapshot',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var snapshotCanvas, context, children;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.prepareRender();

              case 2:
                snapshotCanvas = this.canvas.cloneNode(true), context = snapshotCanvas.getContext('2d');


                context.drawImage(this.canvas, 0, 0);
                children = this.children.map(function (child) {
                  return child.serialize();
                });
                return _context.abrupt('return', { context: context, children: children });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function takeSnapshot() {
        return _ref.apply(this, arguments);
      }

      return takeSnapshot;
    }()
  }, {
    key: 'putSnapshot',
    value: function putSnapshot(snapshot) {
      var _this2 = this;

      var outputContext = this.outputContext;

      this.clearContext(outputContext);
      outputContext.drawImage(snapshot.context.canvas, 0, 0);

      this.clearUpdate();

      snapshot.children.forEach(function (child) {
        var node = (0, _spriteCore.createNode)(child.nodeType);
        if (child.id) {
          node.id = child.id;
        }
        node.attr(JSON.parse(child.attrs));
        _this2.appendChild(node, false);
      });

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.dispatchEvent('update', {
          target: child, context: child.context, renderBox: child.renderBox, lastRenderBox: child.lastRenderBox
        }, true);

        child.lastRenderBox = child.renderBox;
      }

      return this.children;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.canvas.dataset.layerId;
    }
  }, {
    key: 'resolution',
    get: function get() {
      return this[_resolution];
    },
    set: function set(resolution) {
      var _resolution3 = (0, _slicedToArray3.default)(resolution, 4),
          width = _resolution3[0],
          height = _resolution3[1],
          offsetLeft = _resolution3[2],
          offsetTop = _resolution3[3];

      var outputCanvas = this.outputContext.canvas;
      outputCanvas.width = width;
      outputCanvas.height = height;
      this.outputContext.clearRect(0, 0, width, height);

      if (offsetLeft || offsetTop) {
        this.outputContext.translate(offsetLeft, offsetTop);
      }

      this.children.forEach(function (child) {
        delete child.lastRenderBox;
        child.forceUpdate();
      });

      this[_resolution] = resolution;
      this.dispatchEvent('resolutionChange', { target: this }, true, true);
    }
  }, {
    key: 'viewport',
    get: function get() {
      var canvas = this.canvas;
      if (canvas && canvas.clientWidth) {
        return [canvas.clientWidth, canvas.clientHeight];
      }
      if (this.parent) {
        return this.parent.layerViewport;
      }

      var _resolution4 = (0, _slicedToArray3.default)(this[_resolution], 2),
          width = _resolution4[0],
          height = _resolution4[1];

      return [width, height];
    }
  }, {
    key: 'offset',
    get: function get() {
      return [this.resolution[2], this.resolution[3]];
    }
  }, {
    key: 'center',
    get: function get() {
      var _resolution5 = (0, _slicedToArray3.default)(this.resolution, 2),
          width = _resolution5[0],
          height = _resolution5[1];

      return [width / 2, height / 2];
    }
  }, {
    key: 'zIndex',
    get: function get() {
      return this.canvas.style.zIndex;
    },
    set: function set(zIndex) {
      this.canvas.style.zIndex = zIndex;
    }
  }]);
  return ExLayer;
}(_spriteCore.Layer);

exports.default = ExLayer;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isNan = __webpack_require__(160);

var _isNan2 = _interopRequireDefault(_isNan);

var _regenerator = __webpack_require__(224);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(120);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(227);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _values = __webpack_require__(259);

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(178);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(181);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(182);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(183);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(103);

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteCore = __webpack_require__(1);

var _layer = __webpack_require__(257);

var _layer2 = _interopRequireDefault(_layer);

var _resource = __webpack_require__(223);

var _resource2 = _interopRequireDefault(_resource);

var _platform = __webpack_require__(228);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDeprecation = _spriteCore.utils.setDeprecation,
    sortOrderedSprites = _spriteCore.utils.sortOrderedSprites;


var _layerMap = (0, _symbol2.default)('layerMap'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _layers = (0, _symbol2.default)('layers'),
    _snapshot = (0, _symbol2.default)('snapshot'),
    _viewport = (0, _symbol2.default)('viewport'),
    _resolution = (0, _symbol2.default)('resolution'),
    _resizeHandler = (0, _symbol2.default)('resizeHandler');

var _default = function (_BaseNode) {
  (0, _inherits3.default)(_default, _BaseNode);

  function _default(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this));

    container = (0, _platform.getContainer)(container);

    _this.container = container;

    /* istanbul ignore if */
    if (arguments.length === 3) {
      setDeprecation('Scene(container, width, height)', 'Instead use Scene(container, {viewport, resolution}).');
      /* eslint-disable prefer-rest-params */
      options = { viewport: [arguments[1], arguments[2]] };
      /* eslint-enabel prefer-rest-params */
    }

    _this[_zOrder] = 0;
    _this[_layerMap] = {};
    _this[_layers] = [];
    _this[_snapshot] = (0, _platform.createCanvas)();

    var viewport = options.viewport || ['', ''];
    _this.viewport = viewport;

    // scale, width, height, top, bottom, left, right
    // width-extend, height-extend, top-extend, bottom-extend, left-extend, right-extend
    _this.stickMode = options.stickMode || 'scale';
    _this.stickExtend = !!options.stickExtend;
    _this.stickOffset = [0, 0];
    _this.resolution = options.resolution || [].concat((0, _toConsumableArray3.default)(_this.viewport));

    // d3-friendly
    _this.namespaceURI = 'http://spritejs.org/scene';
    var that = _this;
    _this.ownerDocument = {
      createElementNS: function createElementNS(uri, name) {
        return that.layer(name);
      }
    };

    var events = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'click', 'dblclick'];

    events.forEach(function (event) {
      return _this.delegateEvent(event);
    });

    /* istanbul ignore next */
    container.addEventListener('DOMNodeRemovedFromDocument', function () {
      if (_this[_resizeHandler]) {
        window.removeEventListener('resize', _this[_resizeHandler]);
        delete _this[_resizeHandler];
      }
    });
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'insertBefore',
    value: function insertBefore(newchild, refchild) {
      var _this2 = this;

      if (!this.hasLayer(refchild)) {
        throw new Error('Failed to execute \'insertBefore\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.');
      }
      this.appendLayer(newchild);
      this.container.insertBefore(newchild.canvas, refchild.canvas);
      var els = void 0;
      /* istanbul ignore if */
      if (this.container.querySelectorAll) {
        els = this.container.querySelectorAll('canvas');
      } else {
        els = this.container.children;
      }
      els.forEach(function (el, i) {
        var id = el.dataset.layerId;
        if (id) {
          var layer = _this2.layer(id);
          delete layer.zOrder;
          Object.defineProperty(layer, 'zOrder', {
            value: i,
            writable: false,
            configurable: true
          });
        }
      });
      this[_layers] = sortOrderedSprites((0, _values2.default)(this[_layerMap]), true);
    }
  }, {
    key: 'appendChild',
    value: function appendChild(layer) {
      return this.appendLayer(layer);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(layer) {
      return this.removeLayer(layer);
    }
  }, {
    key: 'updateViewport',
    value: function updateViewport(layer) {
      var _this3 = this;

      var _layerViewport = (0, _slicedToArray3.default)(this.layerViewport, 2),
          width = _layerViewport[0],
          height = _layerViewport[1],
          layers = layer ? [layer] : this[_layers],
          stickMode = this.stickMode,
          stickExtend = this.stickExtend;

      layers.forEach(function (layer) {
        var canvas = layer.canvas;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        (0, _assign2.default)(canvas.style, {
          top: '',
          right: '',
          bottom: '',
          left: '',
          transform: ''
        });
        if (!stickExtend && (stickMode === 'width' || stickMode === 'height')) {
          canvas.style.top = '50%';
          canvas.style.left = '50%';
          canvas.style.transform = 'translate(-50%, -50%)';
        } else if (!stickExtend && (stickMode === 'right' || stickMode === 'bottom')) {
          canvas.style.right = '0';
          canvas.style.bottom = '0';
        } else {
          canvas.style.top = '0';
          canvas.style.left = '0';
        }
        if (stickExtend) {
          layer.resolution = _this3.layerResolution;
        }
      });

      this.dispatchEvent('viewportChange', { target: this, layers: layers });
      return this;
    }
  }, {
    key: 'updateResolution',
    value: function updateResolution(layer) {
      var _this4 = this;

      var layers = layer ? [layer] : this[_layers];

      layers.forEach(function (layer) {
        layer.resolution = _this4.layerResolution;
      });
      this.dispatchEvent('resolutionChange', { target: this, layers: layers });
      return this;
    }
  }, {
    key: 'setViewport',
    value: function setViewport(width, height) {
      this.viewport = [width, height];
      return this;
    }
  }, {
    key: 'setResolution',
    value: function setResolution(width, height) {
      this.resolution = [width, height];
      return this;
    }
  }, {
    key: 'delegateEvent',
    value: function delegateEvent(event) {
      var _this5 = this;

      var receiver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.container;

      if (typeof event === 'string') {
        event = { type: event, passive: true };
      }

      var _event = event,
          type = _event.type,
          passive = _event.passive;


      receiver.addEventListener(type, function (e) {
        var layers = _this5[_layers];
        var evtArgs = {
          originalEvent: e,
          type: type,
          stopDispatch: function stopDispatch() {
            this.terminated = true;
          }
        };

        // mouse event layerX, layerY value change while browser scaled.
        var originalX = void 0,
            originalY = void 0,
            x = void 0,
            y = void 0;

        /* istanbul ignore else */
        if (e instanceof CustomEvent) {
          (0, _assign2.default)(evtArgs, e.detail);
          if (evtArgs.x != null && evtArgs.y != null) {
            x = evtArgs.x;
            y = evtArgs.y;
          } else if (evtArgs.originalX != null && evtArgs.originalY != null) {
            originalX = evtArgs.originalX;
            originalY = evtArgs.originalY;
          }
        } else if (e.target.dataset.layerId && _this5[_layerMap][e.target.dataset.layerId]) {
          var _e$target$getBounding = e.target.getBoundingClientRect(),
              left = _e$target$getBounding.left,
              top = _e$target$getBounding.top;

          var _ref = e.changedTouches ? e.changedTouches[0] : e,
              clientX = _ref.clientX,
              clientY = _ref.clientY;

          originalX = Math.round((clientX | 0) - left);
          originalY = Math.round((clientY | 0) - top);
        }

        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          if (originalX != null && originalY != null) {
            var _layer$toLocalPos = layer.toLocalPos(originalX, originalY);

            var _layer$toLocalPos2 = (0, _slicedToArray3.default)(_layer$toLocalPos, 2);

            x = _layer$toLocalPos2[0];
            y = _layer$toLocalPos2[1];
          } else if (x != null && y != null) {
            var _layer$toGlobalPos = layer.toGlobalPos(x, y);

            var _layer$toGlobalPos2 = (0, _slicedToArray3.default)(_layer$toGlobalPos, 2);

            originalX = _layer$toGlobalPos2[0];
            originalY = _layer$toGlobalPos2[1];
          }
          (0, _assign2.default)(evtArgs, {
            layerX: x, layerY: y, originalX: originalX, originalY: originalY, x: x, y: y
          });

          if (layer.handleEvent) {
            layer.dispatchEvent(type, evtArgs);
          }
        }
      }, { passive: passive });
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var container = this.container;
      container.dispatchEvent(new CustomEvent(type, { detail: evt }));
      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'dispatchEvent', this).call(this, type, evt, true);
    }
  }, {
    key: 'preload',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this6 = this;

        for (var _len = arguments.length, resources = Array(_len), _key = 0; _key < _len; _key++) {
          resources[_key] = arguments[_key];
        }

        var ret, tasks, i, res, task, id, src;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ret = [], tasks = [];


                for (i = 0; i < resources.length; i++) {
                  res = resources[i];
                  task = void 0;


                  if (typeof res === 'string') {
                    task = _resource2.default.loadTexture(res);
                  } else if (Array.isArray(res)) {
                    task = _resource2.default.loadFrames.apply(_resource2.default, (0, _toConsumableArray3.default)(res));
                  } else {
                    id = res.id, src = res.src;

                    task = _resource2.default.loadTexture({ id: id, src: src });
                  }
                  /* istanbul ignore if  */
                  if (!(task instanceof _promise2.default)) {
                    task = _promise2.default.resolve(task);
                  }

                  tasks.push(task.then(function (r) {
                    ret.push(r);
                    _this6.dispatchEvent('preload', {
                      target: _this6, current: r, loaded: ret, resources: resources
                    });
                  }));
                }

                _context.next = 4;
                return _promise2.default.all(tasks);

              case 4:
                return _context.abrupt('return', ret);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload() {
        return _ref2.apply(this, arguments);
      }

      return preload;
    }()
  }, {
    key: 'layer',
    value: function layer() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { handleEvent: true };

      if (typeof opts === 'number') {
        opts = { zIndex: opts };
      }
      if (!this.hasLayer(id)) {
        var zIndex = 0;
        if (opts.zIndex != null) {
          zIndex = opts.zIndex;
          delete opts.zIndex;
        }

        /* istanbul ignore if  */
        if (typeof window !== 'undefined' && window.getComputedStyle) {
          var pos = window.getComputedStyle && window.getComputedStyle(this.container).position;

          if (this.container.style && pos !== 'absolute' && pos !== 'fixed') {
            this.container.style.position = 'relative';
          }
        }

        this.appendLayer(new _layer2.default(id, opts), zIndex);
      }

      return this[_layerMap][id];
    }
  }, {
    key: 'appendLayer',
    value: function appendLayer(layer) {
      var zIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var id = layer.id;

      if (this.hasLayer(id) && this[_layerMap][id] !== layer) {
        throw new Error('layer ' + id + ' already exists! remove first...');
      }

      this.removeLayer(layer);

      this[_layerMap][id] = layer;
      layer.connect(this, this[_zOrder]++, zIndex);
      this.updateViewport(layer);
      if (!this.stickExtend) {
        layer.resolution = this.layerResolution;
      }

      this[_layers] = sortOrderedSprites((0, _values2.default)(this[_layerMap]), true);
      /* istanbul ignore if  */
      if (_platform.setDebugToolsObserver && layer.id !== '__debuglayer__') {
        (0, _platform.setDebugToolsObserver)(this, layer);
      }
      return layer;
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      if (typeof layer === 'string') {
        layer = this[_layerMap][layer];
      }
      if (this.hasLayer(layer)) {
        layer.disconnect(this);
        delete this[_layerMap][layer.id];
        this[_layers] = sortOrderedSprites((0, _values2.default)(this[_layerMap]), true);
        /* istanbul ignore if  */
        if (_platform.removeDebugToolsObserver) {
          (0, _platform.removeDebugToolsObserver)(layer);
        }
        return layer;
      }

      return null;
    }
  }, {
    key: 'hasLayer',
    value: function hasLayer(layer) {
      var layerID = void 0;
      if (typeof layer === 'string') {
        layerID = layer;
        layer = this[_layerMap][layer];
      } else {
        layerID = layer.id;
      }
      return layer && this[_layerMap][layerID] === layer;
    }
  }, {
    key: 'snapshot',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _viewport2, width, height, canvas, _layerViewport2, sw, sh, layers, ctx, renderTasks, rect;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _viewport2 = (0, _slicedToArray3.default)(this.viewport, 2), width = _viewport2[0], height = _viewport2[1];
                canvas = this[_snapshot];

                canvas.width = width;
                canvas.height = height;

                _layerViewport2 = (0, _slicedToArray3.default)(this.layerViewport, 2), sw = _layerViewport2[0], sh = _layerViewport2[1];
                layers = this[_layers].slice(0).reverse();
                ctx = canvas.getContext('2d');
                renderTasks = layers.map(function (layer) {
                  return layer.prepareRender();
                });
                _context2.next = 10;
                return _promise2.default.all(renderTasks);

              case 10:
                rect = [0, 0, sw, sh];


                if (!this.stickExtend) {
                  if (this.stickMode === 'width' || this.stickMode === 'height') {
                    rect[0] = (width - sw) / 2;
                    rect[1] = (height - sh) / 2;
                  } else if (this.stickMode === 'bottom' || this.stickMode === 'right') {
                    rect[0] = width - sw;
                    rect[1] = height - sh;
                  }
                }

                layers.forEach(function (layer) {
                  ctx.drawImage.apply(ctx, [layer.canvas].concat(rect));
                });

                return _context2.abrupt('return', canvas);

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function snapshot() {
        return _ref3.apply(this, arguments);
      }

      return snapshot;
    }()
  }, {
    key: 'width',
    get: function get() {
      return this.viewport[0];
    }
  }, {
    key: 'height',
    get: function get() {
      return this.viewport[1];
    }
  }, {
    key: 'layerViewport',
    get: function get() {
      var _resolution2 = (0, _slicedToArray3.default)(this.resolution, 2),
          rw = _resolution2[0],
          rh = _resolution2[1],
          _viewport3 = (0, _slicedToArray3.default)(this.viewport, 2),
          vw = _viewport3[0],
          vh = _viewport3[1],
          stickMode = this.stickMode,
          stickExtend = this.stickExtend;

      var width = vw,
          height = vh;

      if (!stickExtend) {
        if (stickMode === 'width' || stickMode === 'top' || stickMode === 'bottom') {
          height = vw * rh / rw;
        } else if (stickMode === 'height' || stickMode === 'left' || stickMode === 'right') {
          width = vh * rw / rh;
        }
      }

      return [width, height];
    }
  }, {
    key: 'distortion',
    get: function get() /* istanbul ignore next */{
      if (this.stickMode !== 'scale') {
        return 1.0;
      }

      var _resolution3 = (0, _slicedToArray3.default)(this.resolution, 2),
          rw = _resolution3[0],
          rh = _resolution3[1],
          _viewport4 = (0, _slicedToArray3.default)(this.viewport, 2),
          vw = _viewport4[0],
          vh = _viewport4[1];

      var dw = rw === 'flex' ? 2 : rw / vw,
          dh = rh === 'flex' ? 2 : rh / vh;

      return dw / dh;
    }
  }, {
    key: 'viewport',
    set: function set(viewport) {
      var _this7 = this;

      if (!Array.isArray(viewport)) viewport = [viewport, viewport];

      var _viewport5 = viewport,
          _viewport6 = (0, _slicedToArray3.default)(_viewport5, 2),
          width = _viewport6[0],
          height = _viewport6[1];

      this[_viewport] = [width, height];
      /* istanbul ignore next */
      if (width === 'auto' || height === 'auto') {
        if (!this[_resizeHandler]) {
          this[_resizeHandler] = function () {
            _this7.updateViewport();
            if (_this7.resolution[0] === 'flex' || _this7.resolution[1] === 'flex') {
              _this7.updateResolution();
            }
          };
          window.addEventListener('resize', this[_resizeHandler]);
        }
      } else if (this[_resizeHandler]) {
        window.removeEventListener('resize', this[_resizeHandler]);
        delete this[_resizeHandler];
      }
      if (this[_layers].length) {
        this.updateViewport();
      }
    },
    get: function get() {
      var _viewport7 = (0, _slicedToArray3.default)(this[_viewport], 2),
          width = _viewport7[0],
          height = _viewport7[1];

      if (width === '' || (0, _isNan2.default)(Number(width))) {
        width = this.container.clientWidth;
      }
      if (height === '' || (0, _isNan2.default)(Number(height))) {
        height = this.container.clientHeight;
      }
      return [width, height];
    }
  }, {
    key: 'layerResolution',
    get: function get() {
      var _resolution4 = (0, _slicedToArray3.default)(this.resolution, 2),
          rw = _resolution4[0],
          rh = _resolution4[1];

      var _viewport8 = (0, _slicedToArray3.default)(this.viewport, 2),
          vw = _viewport8[0],
          vh = _viewport8[1],
          stickMode = this.stickMode,
          stickExtend = this.stickExtend;

      if (rw === 'flex') {
        rw = 2 * vw;
      }
      if (rh === 'flex') {
        rh = 2 * vh;
      }

      var width = rw,
          height = rh,
          offsetTop = 0,
          offsetLeft = 0;

      if (stickExtend) {
        if (stickMode === 'width' || stickMode === 'top' || stickMode === 'bottom') {
          var vrh = rw * vh / vw;
          height = vrh;

          if (stickMode === 'width') {
            offsetTop = Math.round((vrh - rh) / 2);
          } else if (stickMode === 'bottom') {
            offsetTop = vrh - rh;
          }
        } else if (stickMode === 'height' || stickMode === 'left' || stickMode === 'right') {
          var vrw = rh * vw / vh;
          width = vrw;

          if (stickMode === 'height') {
            offsetLeft = Math.round((vrw - rw) / 2);
          } else if (stickMode === 'right') {
            offsetLeft = vrw - rw;
          }
        }
      }
      this.stickOffset = [offsetLeft, offsetTop];
      return [width, height, offsetLeft, offsetTop];
    }
  }, {
    key: 'resolution',
    set: function set(resolution) {
      if (!Array.isArray(resolution)) {
        resolution = [resolution, resolution];
      }

      var _resolution5 = resolution,
          _resolution6 = (0, _slicedToArray3.default)(_resolution5, 2),
          width = _resolution6[0],
          height = _resolution6[1];

      this[_resolution] = [width, height];
      this.updateResolution();
    },
    get: function get() {
      return this[_resolution];
    }
  }, {
    key: 'layers',
    get: function get() {
      return this[_layers];
    }
  }]);
  return _default;
}(_spriteCore.BaseNode);

exports.default = _default;

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(260), __esModule: true };

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(261);
module.exports = __webpack_require__(20).Object.values;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(18);
var $values = __webpack_require__(140)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ })
/******/ ]);
});