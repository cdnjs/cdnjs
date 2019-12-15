/*
 * metismenu - v2.7.4
 * A jQuery menu plugin
 * https://github.com/onokumus/metismenu#readme
 *
 * Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
 * Under MIT License
 */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery);
    global.metisMenu = mod.exports;
  }
})(this, function (_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Util = function ($) {
    var transition = false;

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments);
          }
          return undefined;
        }
      };
    }

    function transitionEndTest() {
      if (typeof window !== 'undefined' && window.QUnit) {
        return false;
      }

      return {
        end: 'transitionend'
      };
    }

    function transitionEndEmulator(duration) {
      var _this2 = this;

      var called = false;

      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });

      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this2);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();
      $.fn.mmEmulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    var Util = {
      TRANSITION_END: 'mmTransitionEnd',

      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      }
    };

    setTransitionEndSupport();

    return Util;
  }(_jquery2.default);

  var MetisMenu = function ($) {

    var NAME = 'metisMenu';
    var DATA_KEY = 'metisMenu';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 350;

    var Default = {
      toggle: true,
      preventDefault: true,
      activeClass: 'active',
      collapseClass: 'collapse',
      collapseInClass: 'in',
      collapsingClass: 'collapsing',
      triggerElement: 'a',
      parentTrigger: 'li',
      subMenu: 'ul'
    };

    var Event = {
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var MetisMenu = function () {
      function MetisMenu(element, config) {
        _classCallCheck(this, MetisMenu);

        this._element = element;
        this._config = this._getConfig(config);
        this._transitioning = null;

        this.init();
      }

      _createClass(MetisMenu, [{
        key: 'init',
        value: function init() {
          var self = this;
          $(this._element).find(this._config.parentTrigger + '.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', true).addClass(this._config.collapseClass + ' ' + this._config.collapseInClass);

          $(this._element).find(this._config.parentTrigger).not('.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', false).addClass(this._config.collapseClass);

          $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).on(Event.CLICK_DATA_API, function (e) {
            var _this = $(this);
            var _parent = _this.parent(self._config.parentTrigger);
            var _siblings = _parent.siblings(self._config.parentTrigger).children(self._config.triggerElement);
            var _list = _parent.children(self._config.subMenu);
            if (self._config.preventDefault) {
              e.preventDefault();
            }
            if (_this.attr('aria-disabled') === 'true') {
              return;
            }
            if (_parent.hasClass(self._config.activeClass)) {
              _this.attr('aria-expanded', false);
              self._hide(_list);
            } else {
              self._show(_list);
              _this.attr('aria-expanded', true);
              if (self._config.toggle) {
                _siblings.attr('aria-expanded', false);
              }
            }

            if (self._config.onTransitionStart) {
              self._config.onTransitionStart(e);
            }
          });
        }
      }, {
        key: '_show',
        value: function _show(element) {
          if (this._transitioning || $(element).hasClass(this._config.collapsingClass)) {
            return;
          }
          var _this = this;
          var _el = $(element);

          var startEvent = $.Event(Event.SHOW);
          _el.trigger(startEvent);

          if (startEvent.isDefaultPrevented()) {
            return;
          }

          _el.parent(this._config.parentTrigger).addClass(this._config.activeClass);

          if (this._config.toggle) {
            this._hide(_el.parent(this._config.parentTrigger).siblings().children(this._config.subMenu + '.' + this._config.collapseInClass).attr('aria-expanded', false));
          }

          _el.removeClass(this._config.collapseClass).addClass(this._config.collapsingClass).height(0);

          this.setTransitioning(true);

          var complete = function complete() {
            // check if disposed
            if (!_this._config || !_this._element) {
              return;
            }
            _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass + ' ' + _this._config.collapseInClass).height('').attr('aria-expanded', true);

            _this.setTransitioning(false);

            _el.trigger(Event.SHOWN);
          };

          if (!Util.supportsTransitionEnd()) {
            complete();
            return;
          }

          _el.height(_el[0].scrollHeight).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
        }
      }, {
        key: '_hide',
        value: function _hide(element) {

          if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
            return;
          }
          var _this = this;
          var _el = $(element);

          var startEvent = $.Event(Event.HIDE);
          _el.trigger(startEvent);

          if (startEvent.isDefaultPrevented()) {
            return;
          }

          _el.parent(this._config.parentTrigger).removeClass(this._config.activeClass);
          _el.height(_el.height())[0].offsetHeight;

          _el.addClass(this._config.collapsingClass).removeClass(this._config.collapseClass).removeClass(this._config.collapseInClass);

          this.setTransitioning(true);

          var complete = function complete() {
            // check if disposed
            if (!_this._config || !_this._element) {
              return;
            }
            if (_this._transitioning && _this._config.onTransitionEnd) {
              _this._config.onTransitionEnd();
            }

            _this.setTransitioning(false);
            _el.trigger(Event.HIDDEN);

            _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass).attr('aria-expanded', false);
          };

          if (!Util.supportsTransitionEnd()) {
            complete();
            return;
          }

          _el.height() == 0 || _el.css('display') == 'none' ? complete() : _el.height(0).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
        }
      }, {
        key: 'setTransitioning',
        value: function setTransitioning(isTransitioning) {
          this._transitioning = isTransitioning;
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);

          $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).off('click');

          this._transitioning = null;
          this._config = null;
          this._element = null;
        }
      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, Default, config);
          return config;
        }
      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY);
            var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

            if (!data && /dispose/.test(config)) {
              this.dispose();
            }

            if (!data) {
              data = new MetisMenu(this, _config);
              $this.data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }]);

      return MetisMenu;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = MetisMenu._jQueryInterface;
    $.fn[NAME].Constructor = MetisMenu;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return MetisMenu._jQueryInterface;
    };
    return MetisMenu;
  }(_jquery2.default);
});
