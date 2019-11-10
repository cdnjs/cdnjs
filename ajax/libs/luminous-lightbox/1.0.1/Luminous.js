(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('./util/dom');

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
var HAS_ANIMATION = typeof document === 'undefined' ? false : 'animation' in document.createElement('div').style;

var Lightbox = function () {
  function Lightbox() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Lightbox);

    this._sizeImgWrapperEl = function () {
      var style = _this.imgWrapperEl.style;
      style.width = _this.innerEl.clientWidth + 'px';
      style.maxWidth = _this.innerEl.clientWidth + 'px';
      style.height = _this.innerEl.clientHeight - _this.captionEl.clientHeight + 'px';
      style.maxHeight = _this.innerEl.clientHeight - _this.captionEl.clientHeight + 'px';
    };

    this._handleKeydown = function (e) {
      if (e.keyCode == LEFT_ARROW) {
        _this.showPrevious();
      } else if (e.keyCode == RIGHT_ARROW) {
        _this.showNext();
      }
    };

    this.showNext = function () {
      if (!_this.settings._gallery) {
        return;
      }

      _this.currentTrigger = _this.settings._gallery.nextTrigger(_this.currentTrigger);
      _this._updateImgSrc();
      _this._updateCaption();
      _this._sizeImgWrapperEl();
    };

    this.showPrevious = function () {
      if (!_this.settings._gallery) {
        return;
      }

      _this.currentTrigger = _this.settings._gallery.previousTrigger(_this.currentTrigger);
      _this._updateImgSrc();
      _this._updateCaption();
      _this._sizeImgWrapperEl();
    };

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
    var _options$caption = options.caption;
    var caption = _options$caption === undefined ? null : _options$caption;
    var _options$includeImgix = options.includeImgixJSClass;
    var includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
    var _options$_gallery = options._gallery;

    var _gallery = _options$_gallery === undefined ? null : _options$_gallery;

    var _options$_arrowNaviga = options._arrowNavigation;

    var _arrowNavigation = _options$_arrowNaviga === undefined ? null : _options$_arrowNaviga;

    this.settings = { namespace: namespace, parentEl: parentEl, triggerEl: triggerEl, sourceAttribute: sourceAttribute, caption: caption, includeImgixJSClass: includeImgixJSClass, _gallery: _gallery, _arrowNavigation: _arrowNavigation };

    if (!(0, _dom.isDOMElement)(this.settings.parentEl)) {
      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
    }

    this.currentTrigger = this.settings.triggerEl;

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');

    this.elementBuilt = false;
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

      this.innerEl = document.createElement('div');
      (0, _dom.addClasses)(this.innerEl, this._buildClasses('lightbox-inner'));
      this.el.appendChild(this.innerEl);

      var loaderEl = document.createElement('div');
      (0, _dom.addClasses)(loaderEl, this._buildClasses('lightbox-loader'));
      this.innerEl.appendChild(loaderEl);

      this.imgWrapperEl = document.createElement('div');
      (0, _dom.addClasses)(this.imgWrapperEl, this._buildClasses('lightbox-image-wrapper'));
      this.innerEl.appendChild(this.imgWrapperEl);

      var positionHelperEl = document.createElement('span');
      (0, _dom.addClasses)(positionHelperEl, this._buildClasses('lightbox-position-helper'));
      this.imgWrapperEl.appendChild(positionHelperEl);

      this.imgEl = document.createElement('img');
      (0, _dom.addClasses)(this.imgEl, this._buildClasses('img'));
      positionHelperEl.appendChild(this.imgEl);

      this.captionEl = document.createElement('p');
      (0, _dom.addClasses)(this.captionEl, this._buildClasses('lightbox-caption'));
      positionHelperEl.appendChild(this.captionEl);

      if (this.settings._gallery) {
        this._setUpGalleryElements();
      }

      this.settings.parentEl.appendChild(this.el);

      this._updateImgSrc();
      this._updateCaption();

      if (this.settings.includeImgixJSClass) {
        this.imgEl.classList.add('imgix-fluid');
      }
    }
  }, {
    key: '_setUpGalleryElements',
    value: function _setUpGalleryElements() {
      this._buildGalleryButton('previous', this.showPrevious);
      this._buildGalleryButton('next', this.showNext);
    }
  }, {
    key: '_buildGalleryButton',
    value: function _buildGalleryButton(name, fn) {
      var btn = document.createElement('button');
      this[name + 'Button'] = btn;

      btn.innerText = name;
      (0, _dom.addClasses)(btn, this._buildClasses(name + '-button'));
      (0, _dom.addClasses)(btn, this._buildClasses('gallery-button'));
      this.innerEl.appendChild(btn);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();

        fn();
      }, false);
    }
  }, {
    key: '_updateCaption',
    value: function _updateCaption() {
      var captionType = _typeof(this.settings.caption);
      var caption = '';

      if (captionType === 'string') {
        caption = this.settings.caption;
      } else if (captionType === 'function') {
        caption = this.settings.caption(this.currentTrigger);
      }

      this.captionEl.innerHTML = caption;
    }
  }, {
    key: '_updateImgSrc',
    value: function _updateImgSrc() {
      var _this2 = this;

      var imageURL = this.currentTrigger.getAttribute(this.settings.sourceAttribute);

      if (!imageURL) {
        throw new Error('No image URL was found in the ' + this.settings.sourceAttribute + ' attribute of the trigger.');
      }

      var loadingClasses = this._buildClasses('loading');
      (0, _dom.addClasses)(this.el, loadingClasses);
      this.imgEl.onload = function () {
        (0, _dom.removeClasses)(_this2.el, loadingClasses);
      };

      this.imgEl.setAttribute('src', imageURL);
    }
  }, {
    key: 'open',
    value: function open() {
      if (!this.elementBuilt) {
        this._buildElement();
        this.elementBuilt = true;
      }

      // When opening, always reset to the trigger we were passed
      this.currentTrigger = this.settings.triggerEl;

      // Make sure to re-set the `img` `src`, in case it's been changed
      // by someone/something else.
      this._updateImgSrc();
      this._updateCaption();

      (0, _dom.addClasses)(this.el, this.openClasses);

      this._sizeImgWrapperEl();
      window.addEventListener('resize', this._sizeImgWrapperEl, false);

      if (this.settings._arrowNavigation) {
        window.addEventListener('keydown', this._handleKeydown, false);
      }

      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeOpen, false);
        (0, _dom.addClasses)(this.el, this.openingClasses);
      }
    }
  }, {
    key: 'close',
    value: function close() {
      window.removeEventListener('resize', this._sizeImgWrapperEl, false);

      if (this.settings._arrowNavigation) {
        window.removeEventListener('keydown', this._handleKeydown, false);
      }

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
      if (this.el) {
        this.settings.parentEl.removeChild(this.el);
      }
    }
  }]);

  return Lightbox;
}();

exports.default = Lightbox;

},{"./util/dom":6,"./util/throwIfMissing":7}],2:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _class, _temp, _initialiseProps;

var _dom = require('./util/dom');

var _injectBaseStylesheet = require('./injectBaseStylesheet');

var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

var _Lightbox = require('./Lightbox');

var _Lightbox2 = _interopRequireDefault(_Lightbox);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = (_temp = _class = function () {
  function Luminous(trigger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
    var namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$sourceAttrib = options.sourceAttribute;
    var sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
    var _options$caption = options.caption;
    var caption = _options$caption === undefined ? null : _options$caption;
    var _options$openTrigger = options.openTrigger;
    var openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
    var _options$closeTrigger = options.closeTrigger;
    var closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
    var _options$closeWithEsc = options.closeWithEscape;
    var closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
    var _options$closeOnScrol = options.closeOnScroll;
    var closeOnScroll = _options$closeOnScrol === undefined ? false : _options$closeOnScrol;
    var _options$appendToSele = options.appendToSelector;
    var appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
    var _options$onOpen = options.onOpen;
    var onOpen = _options$onOpen === undefined ? null : _options$onOpen;
    var _options$onClose = options.onClose;
    var onClose = _options$onClose === undefined ? null : _options$onClose;
    var _options$includeImgix = options.includeImgixJSClass;
    var includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
    var _options$injectBaseSt = options.injectBaseStyles;
    var injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;
    var _options$_gallery = options._gallery;

    var _gallery = _options$_gallery === undefined ? null : _options$_gallery;

    var _options$_arrowNaviga = options._arrowNavigation;

    var _arrowNavigation = _options$_arrowNaviga === undefined ? null : _options$_arrowNaviga;

    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, caption: caption, openTrigger: openTrigger, closeTrigger: closeTrigger, closeWithEscape: closeWithEscape, closeOnScroll: closeOnScroll, appendToSelector: appendToSelector, onOpen: onOpen, onClose: onClose, includeImgixJSClass: includeImgixJSClass, injectBaseStyles: injectBaseStyles, _gallery: _gallery, _arrowNavigation: _arrowNavigation };

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
        caption: this.settings.caption,
        includeImgixJSClass: this.settings.includeImgixJSClass,
        _gallery: this.settings._gallery,
        _arrowNavigation: this.settings._arrowNavigation
      });
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      this.trigger.addEventListener(this.settings.openTrigger, this.open, false);

      if (this.settings.closeWithEscape) {
        window.addEventListener('keyup', this._handleKeyup, false);
      }
    }
  }, {
    key: '_bindCloseEvent',
    value: function _bindCloseEvent() {
      this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
      if (this.lightbox.el) {
        this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);
      }

      if (this.settings.closeWithEscape) {
        window.removeEventListener('keyup', this._handleKeyup, false);
      }
    }
  }]);

  return Luminous;
}(), _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.VERSION = '1.0.1';

  this.open = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    var previouslyBuilt = _this.lightbox.elementBuilt;

    _this.lightbox.open();

    if (!previouslyBuilt) {
      _this._bindCloseEvent();
    }

    if (_this.settings.closeOnScroll) {
      window.addEventListener('scroll', _this.close, false);
    }

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

    if (_this.settings.closeOnScroll) {
      window.removeEventListener('scroll', _this.close, false);
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
}, _temp);

},{"./Lightbox":1,"./injectBaseStylesheet":4,"./util/dom":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('./util/dom');

var _Luminous = require('./Luminous');

var _Luminous2 = _interopRequireDefault(_Luminous);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var LuminousGallery = function () {
  function LuminousGallery(triggers) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var luminousOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, LuminousGallery);

    this.boundMethod = function () {};

    var _options$arrowNavigat = options.arrowNavigation;
    var arrowNavigation = _options$arrowNavigat === undefined ? true : _options$arrowNavigat;

    this.settings = { arrowNavigation: arrowNavigation };

    this.triggers = triggers;
    this.luminousOpts = luminousOpts;
    this.luminousOpts._gallery = this;
    this.luminousOpts._arrowNavigation = this.settings.arrowNavigation;
    this._constructLuminousInstances();
  }

  _createClass(LuminousGallery, [{
    key: '_constructLuminousInstances',
    value: function _constructLuminousInstances() {
      this.luminousInstances = [];

      var triggerLen = this.triggers.length;
      for (var i = 0; i < triggerLen; i++) {
        var trigger = this.triggers[i];
        var lum = new _Luminous2.default(trigger, this.luminousOpts);
        this.luminousInstances.push(lum);
      }
    }
  }, {
    key: 'nextTrigger',
    value: function nextTrigger(trigger) {
      var nextTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) + 1;

      return nextTriggerIndex >= this.triggers.length ? this.triggers[0] : this.triggers[nextTriggerIndex];
    }
  }, {
    key: 'previousTrigger',
    value: function previousTrigger(trigger) {
      var prevTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) - 1;

      return prevTriggerIndex < 0 ? this.triggers[this.triggers.length - 1] : this.triggers[prevTriggerIndex];
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);

  return LuminousGallery;
}();

exports.default = LuminousGallery;

},{"./Luminous":2,"./util/dom":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectBaseStylesheet;
var RULES = '\n@keyframes lum-noop {\n  0% { zoom: 1; }\n}\n\n.lum-lightbox {\n  position: fixed;\n  display: none;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.lum-lightbox.lum-open {\n  display: block;\n}\n\n.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {\n  animation: lum-noop 1ms;\n}\n\n.lum-lightbox-inner {\n  position: absolute;\n  top: 0%;\n  right: 0%;\n  bottom: 0%;\n  left: 0%;\n\n  overflow: hidden;\n}\n\n.lum-lightbox-loader {\n  display: none;\n}\n\n.lum-lightbox-inner img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.lum-lightbox-image-wrapper {\n  vertical-align: middle;\n  display: table-cell;\n  text-align: center;\n}\n';

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

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var _Luminous = require('./Luminous');

var _Luminous2 = _interopRequireDefault(_Luminous);

var _LuminousGallery = require('./LuminousGallery');

var _LuminousGallery2 = _interopRequireDefault(_LuminousGallery);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

global.Luminous = _Luminous2.default;
global.LuminousGallery = _LuminousGallery2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Luminous":2,"./LuminousGallery":3}],6:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

exports.isDOMElement = isDOMElement;
exports.addClasses = addClasses;
exports.removeClasses = removeClasses;
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throwIfMissing;
function throwIfMissing() {
  throw new Error('Missing parameter');
}

},{}]},{},[5]);
