/*! Prelodr v1.0.9 | MIT (c) 2016 José Luis Quintana */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prelodr v1.0.9
 * http://git.io/prelodr
 *
 * @author    José Luis Quintana | http://git.io/joseluisq
 * @license   MIT
 */

/**
 * Prelodr class
 */
var Prelodr = function () {

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
      var i = void 0;

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
    value: function _show(text, cb, ref) {
      ref.wrapper = window.document.createElement('span');

      var spanText = window.document.createElement('span');
      var progressbar = window.document.createElement('span');

      spanText.appendChild(window.document.createTextNode(text));
      ref.wrapper.appendChild(spanText);
      spanText.appendChild(progressbar);
      progressbar.className = ref.options.prefixClass + '-progressbar';

      if (!ref.element) {
        ref.element = window.document.createElement('span');
        ref.element.className = ref.options.prefixClass;
        ref.container.appendChild(ref.element);
      }

      ref.element.appendChild(ref.wrapper);

      setTimeout(function () {
        var cls = ref.options.prefixClass + ' ' + ref.options.prefixClass + '-in';
        ref.wrapper.children[0].className = ref.options.prefixClass + '-in';
        ref.element.className = cls;

        setTimeout(function () {
          ref.isShown = true;
          ref.isAnimating = false;
          ref.queu.shift();

          if (ref.options.show) {
            ref.options.show(ref, ref.element);
          }

          if (cb) {
            cb();
          }
        }, ref.options.duration);
      }, 10);
    }

    /**
     * Hide prelodr elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {Function} cb - Callback
     */

  }, {
    key: '_hide',
    value: function _hide(cb, ref) {
      var that = ref || this;

      if (that.isShown) {
        that.isShown = false;
        that._prepOut(cb, that);
      }
    }

    /**
     * Walk queue
     * @param  {Queu} queu - Queu object
     */

  }, {
    key: '_queueWalk',
    value: function _queueWalk(ref) {
      var that = ref || this;
      var one = that.queu.first();

      if (one && one.is === 'in') {
        that.isShown = true;

        one.fn(function () {
          var next = that.queu.first();
          that.isStart = false;

          if (next && next.is === 'out') {
            next.fn(function () {
              that._queueWalk(that);
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
      var _this = this;

      var obj = {
        id: this._getId(),
        is: 'in',
        fn: function fn(cb) {
          return _this._show(text, cb, _this);
        }
      };

      this.queu.add(obj);

      if (!this.isStart) {
        this.isStart = true;
        this._queueWalk(this);
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
      var that = this;

      that.queu.add({
        id: that._getId(),
        is: 'out',
        fn: function fn(cb, ref) {
          if (_fn && typeof _fn === 'function') {
            _fn(function () {
              that._hide(cb, ref);
            });
          } else {
            that._hide(cb, ref);
          }
        }
      });

      if (!that.isStart) {
        var one = that.queu.first();

        if (one && one.is === 'out') {
          one.fn(that._queueWalk, this);
        }
      }

      return that;
    }

    /**
     * Prepare to hide the Prelodr
     * @param  {Function} cb Callback
     */

  }, {
    key: '_prepOut',
    value: function _prepOut(cb, that) {
      that.isAnimating = true;
      that.queu.shift();

      var el = that.queu.first();
      that.wrapper.children[0].className = '';

      setTimeout(function () {
        if (that.options.hide) {
          that.options.hide(that, []);
        }

        if (!that.element) return;

        if (el) {
          that.element.removeChild(that.wrapper);
        } else {
          var cls = that.options.prefixClass + ' ' + that.options.prefixClass + '-out';
          that.element.className = cls;

          setTimeout(function () {
            that.container.removeChild(that.element);
            that.element = null;
          }, that.options.duration / 1.5);
        }

        that.isAnimating = false;
        that.isShown = false;

        if (cb) {
          cb(that);
        }
      }, that.options.duration);
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
}();

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
        var fn = void 0;
        var prelodr = void 0;

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