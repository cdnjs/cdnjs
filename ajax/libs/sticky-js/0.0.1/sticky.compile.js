'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sticky = function () {
  function Sticky(element) {
    _classCallCheck(this, Sticky);

    this.element = element;

    this.vp = this.getViewportSize();
    this.scrollTop = this.getScrollTopPosition();

    this.initialize();
  }

  _createClass(Sticky, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var stickyElements = document.querySelectorAll(this.element);

      var _loop = function _loop(i, len) {
        window.addEventListener('load', function () {
          return _this.activate(stickyElements[i]);
        });
      };

      for (var i = 0, len = stickyElements.length; i < len; i++) {
        _loop(i, len);
      }
    }
  }, {
    key: 'activate',
    value: function activate(el) {
      var _this2 = this;

      el.sticky = {};

      el.sticky.marginTop = el.getAttribute('data-margin-top') ? parseInt(el.getAttribute('data-margin-top')) : 0;
      el.sticky.rect = this.getRect(el);

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
    }
  }, {
    key: 'getRect',
    value: function getRect(el) {
      var position = this.getTopLeftPosition(el);

      position.offsetLeft = el.offsetLeft;
      position.width = el.offsetWidth;
      position.height = el.offsetHeight;

      return position;
    }
  }, {
    key: 'updateRect',
    value: function updateRect(el) {
      this.removeStyle(el, ['position', 'width', 'top', 'left', 'right', 'bottom']);

      el.sticky.rect = this.getRect(el);
      el.sticky.container.rect = this.getRect(el.sticky.container);
    }
  }, {
    key: 'getTopLeftPosition',
    value: function getTopLeftPosition(el) {
      var top = 0,
          left = 0;

      do {
        top += el.offsetTop || 0;
        left += el.offsetLeft || 0;
        el = el.offsetParent;
      } while (el);

      return { top: top, left: left };
    }
  }, {
    key: 'getContainer',
    value: function getContainer(el) {
      var container = el;

      while (typeof container.getAttribute('data-sticky-container') !== 'string' && container !== document.documentElement) {
        container = container.parentNode;
      }

      return container;
    }
  }, {
    key: 'getViewportSize',
    value: function getViewportSize() {
      return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      };
    }
  }, {
    key: 'getScrollTopPosition',
    value: function getScrollTopPosition() {
      return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(el) {
      if (this.vp.height < el.sticky.rect.height) {
        return;
      }

      this.removeStyle(el, ['position', 'width', 'top', 'left', 'right', 'bottom']);

      if (this.scrollTop > el.sticky.rect.top - el.sticky.marginTop) {
        this.addStyle(el, {
          position: 'fixed',
          width: el.sticky.rect.width + 'px',
          left: el.sticky.rect.left + 'px',
          right: 'auto',
          bottom: 'auto'
        });

        if (this.scrollTop + el.sticky.rect.height + el.sticky.marginTop > el.sticky.container.rect.top + el.sticky.container.rect.height) {
          this.addStyle(el, { top: el.sticky.container.rect.top + el.sticky.container.rect.height - (this.scrollTop + el.sticky.rect.height) + 'px' });
        } else {
          this.addStyle(el, { top: el.sticky.marginTop + 'px' });
        }
      } else {
        this.removeStyle(el, ['position', 'width', 'top', 'left', 'right', 'bottom']);
      }
    }
  }, {
    key: 'addStyle',
    value: function addStyle(el, styles) {
      for (var property in styles) {
        if (styles.hasOwnProperty(property)) {
          el.style[property] = styles[property];
        }
      }
    }
  }, {
    key: 'removeStyle',
    value: function removeStyle(el, properties) {
      for (var i = 0, len = properties.length; i < len; i++) {
        el.style[properties[i]] = null;
      }
    }
  }]);

  return Sticky;
}();