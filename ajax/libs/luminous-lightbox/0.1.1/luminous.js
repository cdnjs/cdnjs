(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('./util/dom');

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
var HAS_ANIMATION = 'animation' in document.body.style;

var Lightbox = (function () {
  function Lightbox() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Lightbox);

    this._completeOpen = function () {
      _this.el.removeEventListener('animationend', _this._completeOpen, false);

      (0, _dom.removeClasses)(_this.el, _this.openingClasses);
    };

    this._completeClose = function () {
      _this.el.removeEventListener('animationend', _this._completeClose, false);

      (0, _dom.removeClasses)(_this.el, _this.openClasses);
      (0, _dom.removeClasses)(_this.el, _this.closingClasses);
    };

    var _options$namespace = options.namespace;
    var namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$parentEl = options.parentEl;
    var parentEl = _options$parentEl === undefined ? (0, _throwIfMissing2.default)() : _options$parentEl;
    var _options$triggerEl = options.triggerEl;
    var triggerEl = _options$triggerEl === undefined ? (0, _throwIfMissing2.default)() : _options$triggerEl;
    var _options$sourceAttrib = options.sourceAttribute;
    var sourceAttribute = _options$sourceAttrib === undefined ? (0, _throwIfMissing2.default)() : _options$sourceAttrib;
    var _options$includeImgix = options.includeImgixJSClass;
    var includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
    var _options$closeTrigger = options.closeTrigger;
    var closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;

    this.settings = { namespace: namespace, parentEl: parentEl, triggerEl: triggerEl, sourceAttribute: sourceAttribute, includeImgixJSClass: includeImgixJSClass, closeTrigger: closeTrigger };

    if (!(0, _dom.isDOMElement)(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');

    this._buildElement();
  }

  _createClass(Lightbox, [{
    key: '_buildClasses',
    value: function _buildClasses(suffix) {
      var classes = ['lum-' + suffix];

      var ns = this.settings.namespace;
      if (ns) {
        classes.push(ns + '-' + suffix);
      }

      return classes;
    }
  }, {
    key: '_buildElement',
    value: function _buildElement() {
      this.el = document.createElement('div');
      (0, _dom.addClasses)(this.el, this._buildClasses('lightbox'));

      var innerEl = document.createElement('div');
      (0, _dom.addClasses)(innerEl, this._buildClasses('lightbox-inner'));
      this.el.appendChild(innerEl);

      this.imgEl = document.createElement('img');
      innerEl.appendChild(this.imgEl);

      this.settings.parentEl.appendChild(this.el);

      this._updateImgSrc();

      if (this.settings.includeImgixJSClass) {
        this.imgEl.classList.add('imgix-fluid');
      }
    }
  }, {
    key: '_updateImgSrc',
    value: function _updateImgSrc() {
      var imageURL = this.settings.triggerEl.getAttribute(this.settings.sourceAttribute);

      if (!imageURL) {
        throw new Error('No image URL was found in the ' + this.settings.sourceAttribute + ' attribute of the trigger.');
      }

      this.imgEl.setAttribute('src', imageURL);
    }
  }, {
    key: 'open',
    value: function open() {
      // Make sure to re-set the `img` `src`, in case it's been changed
      // by someone/something else.
      this._updateImgSrc();

      (0, _dom.addClasses)(this.el, this.openClasses);

      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeOpen, false);
        (0, _dom.addClasses)(this.el, this.openingClasses);
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeClose, false);
        (0, _dom.addClasses)(this.el, this.closingClasses);
      } else {
        (0, _dom.removeClasses)(this.el, this.openClasses);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.settings.parentEl.removeChild(this.el);
    }
  }]);

  return Lightbox;
})();

exports.default = Lightbox;

},{"./util/dom":4,"./util/throwIfMissing":5}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = undefined;

var _dom = require('./util/dom');

var _injectBaseStylesheet = require('./injectBaseStylesheet');

var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

var _Lightbox = require('./Lightbox');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.0';

var Luminous = (function () {
  function Luminous(trigger) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Luminous);

    _initialiseProps.call(this);

    this.isOpen = false;

    this.trigger = trigger;

    if (!(0, _dom.isDOMElement)(this.trigger)) {
      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    var _options$namespace = options.namespace;
    var
    // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-lightbox`. Default `lum-`
    // prefixed classes will always be added as well.
    namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$sourceAttrib = options.sourceAttribute;
    var
    // Which attribute to pull the lightbox image source from.
    sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
    var _options$openTrigger = options.openTrigger;
    var
    // The event to listen to on the _trigger_ element: triggers opening.
    openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
    var _options$closeTrigger = options.closeTrigger;
    var
    // The event to listen to on the _lightbox_ element: triggers closing.
    closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
    var _options$closeWithEsc = options.closeWithEscape;
    var
    // Allow closing by pressing escape.
    closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
    var _options$appendToSele = options.appendToSelector;
    var
    // A selector defining what to append the lightbox element to.
    appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
    var _options$onOpen = options.onOpen;
    var
    // If present (and a function), this will be called
    // whenever the lightbox is opened.
    onOpen = _options$onOpen === undefined ? null : _options$onOpen;
    var _options$onClose = options.onClose;
    var
    // If present (and a function), this will be called
    // whenever the lightbox is closed.
    onClose = _options$onClose === undefined ? null : _options$onClose;
    var _options$includeImgix = options.includeImgixJSClass;
    var
    // When true, adds the `imgix-fluid` class to the `img`
    // inside the lightbox. See https://github.com/imgix/imgix.js
    // for more information.
    includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
    var _options$injectBaseSt = options.injectBaseStyles;
    var
    // Add base styles to the page. See the "Theming"
    // section of README.md for more information.
    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;

    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, openTrigger: openTrigger, closeTrigger: closeTrigger, closeWithEscape: closeWithEscape, appendToSelector: appendToSelector, onOpen: onOpen, onClose: onClose, includeImgixJSClass: includeImgixJSClass, injectBaseStyles: injectBaseStyles };

    if (this.settings.injectBaseStyles) {
      (0, _injectBaseStylesheet2.default)();
    }

    this._buildLightbox();
    this._bindEvents();
  }

  _createClass(Luminous, [{
    key: '_buildLightbox',
    value: function _buildLightbox() {
      this.lightbox = new _Lightbox2.default({
        namespace: this.settings.namespace,
        parentEl: document.querySelector(this.settings.appendToSelector),
        triggerEl: this.trigger,
        sourceAttribute: this.settings.sourceAttribute,
        includeImgixJSClass: this.settings.includeImgixJSClass,
        closeTrigger: this.settings.closeTrigger
      });
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this.trigger.addEventListener(this.settings.openTrigger, this.open, false);
      this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);

      if (this.settings.closeWithEscape) {
        window.addEventListener('keyup', this._handleKeyup, false);
      }
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
      this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);

      if (this.settings.closeWithEscape) {
        window.removeEventListener('keyup', this._handleKeyup, false);
      }
    }
  }]);

  return Luminous;
})();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.open = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    _this.lightbox.open();

    var onOpen = _this.settings.onOpen;
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }

    _this.isOpen = true;
  };

  this.close = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    _this.lightbox.close();

    var onClose = _this.settings.onClose;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }

    _this.isOpen = false;
  };

  this._handleKeyup = function (e) {
    if (_this.isOpen && e.keyCode === 27) {
      _this.close();
    }
  };

  this.destroy = function () {
    _this._unbindEvents();
    _this.lightbox.destroy();
  };
};

exports.default = Luminous;

global.Luminous = Luminous;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Lightbox":1,"./injectBaseStylesheet":3,"./util/dom":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectBaseStylesheet;
var RULES = '\n@keyframes noop {  }\n\n.lum-lightbox {\n  position: fixed;\n  display: none;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.lum-lightbox.lum-open {\n  display: block;\n}\n\n.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {\n  animation: noop;\n}\n\n.lum-lightbox-inner {\n  position: absolute;\n  top: 0%;\n  right: 0%;\n  bottom: 0%;\n  left: 0%;\n\n  overflow: hidden;\n}\n\n.lum-lightbox-inner img {\n  max-width: 100%;\n  max-height: 100%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: block;\n}\n';

function injectBaseStylesheet() {
  if (document.querySelector('.lum-base-styles')) {
    return;
  }

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('lum-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  var head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDOMElement = isDOMElement;
exports.addClasses = addClasses;
exports.removeClasses = removeClasses;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var HAS_DOM_2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';

function isDOMElement(obj) {
  return HAS_DOM_2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

function addClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.add(className);
  });
}

function removeClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.remove(className);
  });
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throwIfMissing;
function throwIfMissing() {
  throw new Error('Missing parameter');
}

},{}]},{},[2]);
