/*! Prelodr v1.0.6 | MIT (c) 2015 José Luis Quintana */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prelodr v1.0.5
 * http://git.io/prelodr
 *
 * @author    José Luis Quintana | quintana.io
 * @license   MIT
 */

/**
 * Prelodr class
 */

var Prelodr = (function () {

  /**
   * Constructor class
   * @param {HTMLElement} container - Container element for Prelodr.
   * Default is body
   * @param {Object} options - Default options object
   * @constructor
   */

  function Prelodr(container, options) {
    _classCallCheck(this, Prelodr);

    this.queu = {
      queue: [],
      offset: 0,
      add: function add(el) {
        this.queue.push(el);
        this.offset += 1;
      },
      shift: function shift() {
        var el = null;

        if (this.queue.length > 0) {
          el = this.queue.shift();
        }

        return el;
      },
      first: function first() {
        var el = null;

        if (this.queue.length > 0) {
          el = this.queue[0];
        }

        return el;
      }
    };
    this._interval = 0;
    this.isShown = false;
    this.isAnimating = false;
    this.isStart = false;
    this.options = {
      duration: 750,
      prefixClass: 'prelodr',
      show: null,
      hide: null
    };

    if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object') {
      if (container.nodeName) {
        this.setContainer(container);
        this.setOptions(options);
      } else {
        this.setContainer(window.document.body);
        this.setOptions(container);
      }
    } else {
      this.container = window.document.body;
    }
  }

  /**
   * Set the default options
   *
   * @param {Object} options - Options object
   */

  _createClass(Prelodr, [{
    key: 'setOptions',
    value: function setOptions(options) {
      this.options = this._merge(this.options, options);
    }

    /**
     * Marge two hash objects
     *
     * @param {Object} a - First object
     * @param {Object} b - Second object
     * @return {Object}
     */

  }, {
    key: '_merge',
    value: function _merge(a, b) {
      var i = undefined;

      if (b) {
        for (i in b) {
          if (b && b[i]) {
            a[i] = b[i];
          }
        }
      }

      return a;
    }

    /**
     * Set container for Prelodr
     *
     * @param {HTMLElement} container - The container for Prelodr.
     */

  }, {
    key: 'setContainer',
    value: function setContainer(container) {
      this.container = container;
    }

    /**
     * Get ramdom string id
     * @return {String} - String Id
     */

  }, {
    key: '_getId',
    value: function _getId() {
      return Math.random().toString(36).slice(2);
    }

    /**
     * Create and show preloader elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {String} text - Text for prelodr
     * @param  {Function} cb - Callback
     */

  }, {
    key: '_show',
    value: function _show(text, cb) {
      var _this = this;

      this.wrapper = window.document.createElement('span');

      var spanText = window.document.createElement('span');
      var progressbar = window.document.createElement('span');

      spanText.appendChild(window.document.createTextNode(text));
      this.wrapper.appendChild(spanText);
      spanText.appendChild(progressbar);
      progressbar.className = this.options.prefixClass + '-progressbar';

      if (!this.element) {
        this.element = window.document.createElement('span');
        this.element.className = this.options.prefixClass;
        this.container.appendChild(this.element);
      }

      this.element.appendChild(this.wrapper);

      setTimeout(function () {
        var cls = _this.options.prefixClass + ' ' + _this.options.prefixClass + '-in';
        _this.wrapper.children[0].className = _this.options.prefixClass + '-in';
        _this.element.className = cls;

        setTimeout(function () {
          _this.isShown = true;
          _this.isAnimating = false;
          _this.queu.shift();

          if (_this.options.show) {
            _this.options.show(_this, _this.element);
          }

          if (cb) {
            cb();
          }
        }, _this.options.duration);
      }, 10);
    }

    /**
     * Hide prelodr elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {Function} cb - Callback
     */

  }, {
    key: '_hide',
    value: function _hide(cb) {
      if (this.isShown) {
        this.isShown = false;
        this._prepOut(cb);
      }
    }

    /**
     * Walk queue
     * @param  {Queu} queu - Queu object
     */

  }, {
    key: '_queueWalk',
    value: function _queueWalk() {
      var _this2 = this;

      var one = this.queu.first();

      if (one && one.is === 'in') {
        this.isShown = true;

        one.fn(function () {
          var next = _this2.queu.first();
          _this2.isStart = false;

          if (next && next.is === 'out') {
            next.fn(function () {
              _this2._queueWalk();
            });
          }
        });
      }
    }

    /**
     * Show the Prelodr
     * @param  {String} text - Text for prelodr
     * @return {Prelodr} - Prelodr object
     */

  }, {
    key: 'in',
    value: function _in(text) {
      var _this3 = this;

      var obj = {
        id: this._getId(),
        is: 'in',
        fn: function fn(cb) {
          return _this3._show(text, cb);
        }
      };

      this.queu.add(obj);

      if (!this.isStart) {
        this.isStart = true;
        this._queueWalk();
      }

      return this;
    }

    /**
     * Hide the Prelodr
     * @return {Prelodr} - Prelodr object
     */

  }, {
    key: 'out',
    value: function out(_fn) {
      var _this4 = this;

      this.queu.add({
        id: this._getId(),
        is: 'out',
        fn: function fn(cb) {
          if (_fn && typeof _fn === 'function') {
            _fn(function () {
              _this4._hide(cb);
            });
          } else {
            _this4._hide(cb);
          }
        }
      });

      if (!this.isStart) {
        var one = this.queu.first();

        if (one && one.is === 'out') {
          one.fn(this._queueWalk);
        }
      }

      return this;
    }

    /**
     * Prepare to hide the Prelodr
     * @param  {Function} cb Callback
     */

  }, {
    key: '_prepOut',
    value: function _prepOut(cb) {
      var _this5 = this;

      this.isAnimating = true;
      this.queu.shift();

      var el = this.queu.first();
      this.wrapper.children[0].className = '';

      setTimeout(function () {
        if (_this5.options.hide) {
          _this5.options.hide(_this5, []);
        }

        if (el) {
          _this5.element.removeChild(_this5.wrapper);
        } else {
          var cls = _this5.options.prefixClass + ' ' + _this5.options.prefixClass + '-out';
          _this5.element.className = cls;

          setTimeout(function () {
            _this5.container.removeChild(_this5.element);
            _this5.element = null;
          }, _this5.options.duration / 1.5);
        }

        _this5.isAnimating = false;
        _this5.isShown = false;

        if (cb) {
          cb();
        }
      }, this.options.duration);
    }

    /**
     * Check if Prelodr is visible
     *
     * @return {Boolean}
     */

  }, {
    key: 'isVisible',
    value: function isVisible() {
      return this.isShown;
    }
  }]);

  return Prelodr;
})();

(function () {
  /* istanbul ignore else */
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = Prelodr;
    /* istanbul ignore else */
  } else if (typeof define === 'function' && define.amd) {
      define([], function () {
        return Prelodr;
      });
    } else {
      window.Prelodr = Prelodr;

      if (window.jQuery) {
        window.jQuery.fn.prelodr = function (options) {
          var fn = undefined;
          var prelodr = undefined;

          if (typeof options === 'string') {
            prelodr = this.data('prelodr');
            fn = prelodr[options];

            if (prelodr !== 'undefined' && typeof options === 'string' && fn) {
              return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
            }

            var str = 'Method ' + options + ' is not supported by jQuery.prelodr.';
            window.jQuery.error(str);
          } else {
            prelodr = new window.Prelodr(this[0], options);
            this.data('prelodr', prelodr);
          }

          return this;
        };
      }
    }
})();