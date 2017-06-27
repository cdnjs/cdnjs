(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Vidage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

},{}],2:[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

},{"date-now":1}],3:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Dependencies


// Moved out of the class some helper methods


var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _validateSelector = require('./helpers/validate-selector');

var _validateSelector2 = _interopRequireDefault(_validateSelector);

var _featureDetect = require('./helpers/feature-detect');

var _featureDetect2 = _interopRequireDefault(_featureDetect);

var _handleVideoSelector = require('./helpers/handle-video-selector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vidage = function () {
    function Vidage(selector) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Vidage);

        var defaults = {
            // Helper class for detection use through CSS
            helperClass: 'Vidage--allow',
            // Remove and Restore `<video>` selector if required
            videoRemoval: false
        };

        // Combine defaults and possible options
        this.options = (0, _objectAssign2.default)(defaults, options);

        // Store the name of the module
        this._name = this.constructor.name;

        // Validate given selector and handle errors
        this.element = (0, _validateSelector2.default)(selector, this._name);

        // Initiate the logic
        this.init();
    }

    _createClass(Vidage, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.element.addEventListener('canplay', function () {
                return _this.handler();
            });
            window.addEventListener('resize', (0, _debounce2.default)(function () {
                return _this.handler();
            }, 250));
        }
    }, {
        key: 'handler',
        value: function handler() {
            var body = document.body;

            if ((0, _featureDetect2.default)()) {
                this.element.pause();

                if (this.options.videoRemoval) {
                    (0, _handleVideoSelector.removeVideo)(this.element);
                }

                body.classList.remove(this.options.helperClass);
            } else {
                if (this.options.videoRemoval) {
                    (0, _handleVideoSelector.restoreVideo)(this.element);
                }

                this.element.play();

                body.classList.add(this.options.helperClass);
            }
        }
    }]);

    return Vidage;
}();

exports.default = Vidage;
module.exports = exports['default'];

},{"./helpers/feature-detect":5,"./helpers/handle-video-selector":6,"./helpers/validate-selector":7,"debounce":2,"object-assign":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var feature = {
        touch: !!('ontouchstart' in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),
        ie: window.navigator.userAgent.indexOf('MSIE') > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./),
        small: window.matchMedia('(max-width: 34em)').matches
    };

    return feature.touch && !feature.ie || feature.small;
};

module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.restoreVideo = restoreVideo;
exports.removeVideo = removeVideo;
var vdgContainer = null;

function restoreVideo(selector) {
    if (!document.body.contains(selector)) {
        vdgContainer.insertAdjacentElement('afterbegin', selector);
    }
}

function removeVideo(selector) {
    if (vdgContainer === null) {
        vdgContainer = selector.parentNode;
    }

    if (document.body.contains(selector)) {
        vdgContainer.removeChild(selector);
    }
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (selector, moduleName) {
    if (typeof selector === 'undefined') {
        throw new Error(moduleName + ' requires a video selector as first argument.');
    }

    selector = typeof selector === 'string' ? document.querySelector(selector) : selector;

    if (selector.nodeName.toLowerCase() !== 'video') {
        throw new Error(moduleName + ' requires a valid video selector. You passed a <' + selector.nodeName + '>');
    }

    return selector;
};

module.exports = exports['default'];

},{}]},{},[4])(4)
});