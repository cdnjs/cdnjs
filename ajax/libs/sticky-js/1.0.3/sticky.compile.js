'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var Sticky = function Sticky(selector) {
  var sticky = this;

  sticky.selector = selector;

  sticky.vp = sticky.getViewportSize();
  sticky.scrollTop = sticky.getScrollTopPosition();

  sticky.initialize();
};

Sticky.prototype = {
  initialize: function initialize() {
    var _this = this;

    this.elements = document.querySelectorAll(this.selector);

    // initialize sticky only when dom is fully loaded
    var DOMContentLoaded = setInterval(function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        for (var i = 0, len = _this.elements.length; i < len; i++) {
          _this.activate(_this.elements[i]);
        }

        clearInterval(DOMContentLoaded);
      }
    }, 100);
  },

  activate: function activate(el) {
    var _this2 = this;

    el.sticky = {};

    el.sticky.marginTop = el.getAttribute('data-margin-top') ? parseInt(el.getAttribute('data-margin-top')) : 0;
    el.sticky.rect = this.getRect(el);

    // fix when el is image that has not yet loaded and width, height = 0
    if (el.tagName.toLowerCase() === 'img') {
      el.onload = function () {
        return el.sticky.rect = _this2.getRect(el);
      };
    }

    el.sticky.container = this.getContainer(el);
    el.sticky.container.rect = this.getRect(el.sticky.container);

    window.addEventListener('resize', function () {
      _this2.vp = _this2.getViewportSize();
      _this2.updateRect(el);
      _this2.setPosition(el);
    });

    window.addEventListener('scroll', function () {
      return _this2.scrollTop = _this2.getScrollTopPosition();
    });
    window.addEventListener('scroll', function () {
      return _this2.setPosition(el);
    });

    this.setPosition(el);
  },

  getRect: function getRect(el) {
    var position = this.getTopLeftPosition(el);

    position.width = el.offsetWidth;
    position.height = el.offsetHeight;

    return position;
  },

  updateRect: function updateRect(el) {
    this.removeStyle(el, ['position', 'width', 'top', 'left']);

    el.sticky.rect = this.getRect(el);
    el.sticky.container.rect = this.getRect(el.sticky.container);
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

  setPosition: function setPosition(el) {
    if (this.vp.height < el.sticky.rect.height) {
      return;
    }

    this.removeStyle(el, ['position', 'width', 'top', 'left']);

    if (this.scrollTop > el.sticky.rect.top - el.sticky.marginTop) {
      this.addStyle(el, {
        position: 'fixed',
        width: el.sticky.rect.width + 'px',
        left: el.sticky.rect.left + 'px'
      });

      if (this.scrollTop + el.sticky.rect.height + el.sticky.marginTop > el.sticky.container.rect.top + el.sticky.container.rect.height) {
        this.addStyle(el, { top: el.sticky.container.rect.top + el.sticky.container.rect.height - (this.scrollTop + el.sticky.rect.height) + 'px' });
      } else {
        this.addStyle(el, { top: el.sticky.marginTop + 'px' });
      }
    } else {
      this.removeStyle(el, ['position', 'width', 'top', 'left']);
    }
  },

  update: function update() {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.updateRect(this.elements[i]);
      this.setPosition(this.elements[i]);
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
    for (var i = 0, len = properties.length; i < len; i++) {
      el.style[properties[i]] = null;
    }
  }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
  module.exports = exports = Sticky;
}