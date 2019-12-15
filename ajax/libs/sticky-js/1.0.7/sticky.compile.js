'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Sticky = function Sticky(selector) {
  var sticky = this;

  sticky.version = '1.0.6';

  sticky.selector = selector;

  sticky.vp = sticky.getViewportSize();
  sticky.scrollTop = sticky.getScrollTopPosition();
  sticky.elements = [];

  sticky.run();
};

Sticky.prototype = {
  run: function run() {
    var _this = this;

    var elements = document.querySelectorAll(this.selector);

    // run sticky only when dom is fully loaded
    var DOMContentLoaded = setInterval(function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        clearInterval(DOMContentLoaded);

        _this.iterate(elements, function (el) {
          return _this.activate(el);
        });

        window.addEventListener('scroll', function () {
          _this.scrollTop = _this.getScrollTopPosition();
          _this.setPosition();
        });

        window.addEventListener('resize', function () {
          _this.vp = _this.getViewportSize();
          _this.updatePosition();
        });

        _this.isSet = true;
        _this.setPosition();
      }
    }, 100);
  },

  activate: function activate(el) {
    var _this2 = this;

    el.sticky = {};

    el.sticky.active = false;

    el.sticky.breakpoint = parseInt(el.getAttribute('data-sticky-for')) || 0;
    el.sticky.marginTop = parseInt(el.getAttribute('data-margin-top')) || 0;
    el.sticky.class = el.getAttribute('data-sticky-class') || false;

    el.sticky.rect = this.getRect(el);

    // fix when el is image that has not yet loaded and width, height = 0
    if (el.tagName.toLowerCase() === 'img') {
      el.onload = function () {
        return el.sticky.rect = _this2.getRect(el);
      };
    }

    el.sticky.container = this.getContainer(el);
    el.sticky.container.rect = this.getRect(el.sticky.container);

    if (el.sticky.breakpoint < this.vp.width && !el.sticky.active) {
      el.sticky.active = true;
    }

    window.addEventListener('resize', function () {
      _this2.vp = _this2.getViewportSize();

      if (el.sticky.breakpoint < _this2.vp.width && !el.sticky.active) {
        el.sticky.active = true;
        _this2.setPosition();
      } else if (el.sticky.breakpoint >= _this2.vp.width && el.sticky.active) {
        el.sticky.active = false;
        _this2.setPosition();
      }
    });

    this.elements.push(el);
  },

  getRect: function getRect(el) {
    var position = this.getTopLeftPosition(el);

    position.width = el.offsetWidth;
    position.height = el.offsetHeight;

    return position;
  },

  updateRect: function updateRect() {
    var _this3 = this;

    this.iterate(this.elements, function (el) {
      _this3.removeStyle(el, ['position', 'width', 'top', 'left']);

      el.sticky.rect = _this3.getRect(el);
      el.sticky.container.rect = _this3.getRect(el.sticky.container);
    });
  },

  getTopLeftPosition: function getTopLeftPosition(el) {
    var top = 0,
        left = 0;

    do {
      top += el.offsetTop || 0;
      left += el.offsetLeft || 0;
      el = el.offsetParent;
    } while (el);

    return { top: top, left: left };
  },

  getContainer: function getContainer(el) {
    var container = el;

    while (typeof container.getAttribute('data-sticky-container') !== 'string' && container !== document.documentElement) {
      container = container.parentNode;
    }

    return container;
  },

  getViewportSize: function getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  },

  getScrollTopPosition: function getScrollTopPosition() {
    return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
  },

  setPosition: function setPosition() {
    var _this4 = this;

    this.iterate(this.elements, function (el) {
      _this4.removeStyle(el, ['position', 'width', 'top', 'left']);

      if (_this4.vp.height < el.sticky.rect.height || !el.sticky.active) {
        return;
      }

      if (_this4.scrollTop > el.sticky.rect.top - el.sticky.marginTop) {
        _this4.addStyle(el, {
          position: 'fixed',
          width: el.sticky.rect.width + 'px',
          left: el.sticky.rect.left + 'px'
        });

        if (_this4.scrollTop + el.sticky.rect.height + el.sticky.marginTop > el.sticky.container.rect.top + el.sticky.container.rect.height) {

          if (el.sticky.class) el.classList.remove(el.sticky.class);

          _this4.addStyle(el, {
            top: el.sticky.container.rect.top + el.sticky.container.rect.height - (_this4.scrollTop + el.sticky.rect.height) + 'px' });
        } else {
          if (el.sticky.class) el.classList.add(el.sticky.class);

          _this4.addStyle(el, { top: el.sticky.marginTop + 'px' });
        }
      } else {
        if (el.sticky.class) el.classList.remove(el.sticky.class);

        _this4.removeStyle(el, ['position', 'width', 'top', 'left']);
      }
    });
  },

  updatePosition: function updatePosition() {
    this.updateRect();
    this.setPosition();
  },

  update: function update() {
    var _this5 = this;

    if (this.isSet) {
      (function () {
        var self = _this5;

        var thisUpdate = function thisUpdate() {
          self.update();
        };

        _this5.iterate(_this5.elements, function (element) {
          if (typeof element.sticky !== 'undefined') {
            _this5.updatePosition();
          } else {
            setTimeout(thisUpdate, 100);
          }
        });
      })();
    }
  },

  addStyle: function addStyle(el, styles) {
    for (var property in styles) {
      if (styles.hasOwnProperty(property)) {
        el.style[property] = styles[property];
      }
    }
  },

  removeStyle: function removeStyle(el, properties) {
    this.iterate(properties, function (property) {
      return el.style[property] = null;
    });
  },

  iterate: function iterate(array, callback) {
    for (var i = 0, len = array.length; i < len; i++) {
      callback(array[i]);
    }
  }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
  module.exports = exports = Sticky;
}