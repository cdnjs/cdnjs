/*!
* metismenu https://github.com/onokumus/metismenu#readme
* A jQuery menu plugin
* @version 3.0.3
* @author Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* @license: MIT 
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.metisMenu = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var Util = function ($$$1) {
    // eslint-disable-line no-shadow
    var TRANSITION_END = 'transitionend';
    var Util = {
      // eslint-disable-line no-shadow
      TRANSITION_END: 'mmTransitionEnd',
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      }
    };

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined;
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.mmEmulateTransitionEnd = transitionEndEmulator; // eslint-disable-line no-param-reassign
      // eslint-disable-next-line no-param-reassign

      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }

    setTransitionEndSupport();
    return Util;
  }($);

  var NAME = 'metisMenu';
  var DATA_KEY = 'metisMenu';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 350;
  var Default = {
    toggle: true,
    preventDefault: true,
    triggerElement: 'a',
    parentTrigger: 'li',
    subMenu: 'ul'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    METIS: 'metismenu',
    ACTIVE: 'mm-active',
    SHOW: 'mm-show',
    COLLAPSE: 'mm-collapse',
    COLLAPSING: 'mm-collapsing',
    COLLAPSED: 'mm-collapsed'
  };

  var MetisMenu =
  /*#__PURE__*/
  function () {
    // eslint-disable-line no-shadow
    function MetisMenu(element, config) {
      this.element = element;
      this.config = _objectSpread({}, Default, config);
      this.transitioning = null;
      this.init();
    }

    var _proto = MetisMenu.prototype;

    _proto.init = function init() {
      var self = this;
      var conf = this.config;
      $(this.element).addClass(ClassName.METIS); // add metismenu class to element

      $(this.element).find(conf.parentTrigger + "." + ClassName.ACTIVE).children(conf.triggerElement).attr('aria-expanded', 'true'); // add attribute aria-expanded=true the trigger element

      $(this.element).find(conf.parentTrigger + "." + ClassName.ACTIVE).parents(conf.parentTrigger).addClass(ClassName.ACTIVE);
      $(this.element).find(conf.parentTrigger + "." + ClassName.ACTIVE).parents(conf.parentTrigger).children(conf.triggerElement).attr('aria-expanded', 'true'); // add attribute aria-expanded=true the triggers of all parents

      $(this.element).find(conf.parentTrigger + "." + ClassName.ACTIVE).has(conf.subMenu).children(conf.subMenu).addClass(ClassName.COLLAPSE + " " + ClassName.SHOW);
      $(this.element).find(conf.parentTrigger).not("." + ClassName.ACTIVE).has(conf.subMenu).children(conf.subMenu).addClass(ClassName.COLLAPSE);
      $(this.element).find(conf.parentTrigger).has(conf.subMenu).children(conf.triggerElement).on(Event.CLICK_DATA_API, function (e) {
        // eslint-disable-line func-names
        var eTar = $(this);
        var paRent = eTar.parent(conf.parentTrigger);
        var sibLings = paRent.siblings(conf.parentTrigger).children(conf.triggerElement);
        var List = paRent.children(conf.subMenu);

        if (conf.preventDefault) {
          e.preventDefault();
        }

        if (eTar.attr('aria-disabled') === 'true') {
          return;
        }

        if (paRent.hasClass(ClassName.ACTIVE)) {
          eTar.attr('aria-expanded', 'false');
          self.hide(List);
        } else {
          self.show(List);
          eTar.attr('aria-expanded', 'true');

          if (conf.toggle) {
            sibLings.attr('aria-expanded', 'false');
          }
        }

        if (conf.onTransitionStart) {
          conf.onTransitionStart(e);
        }
      });
    };

    _proto.show = function show(element) {
      var _this = this;

      if (this.transitioning || $(element).hasClass(ClassName.COLLAPSING)) {
        return;
      }

      var elem = $(element);
      var startEvent = $.Event(Event.SHOW);
      elem.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      elem.parent(this.config.parentTrigger).addClass(ClassName.ACTIVE);

      if (this.config.toggle) {
        var toggleElem = elem.parent(this.config.parentTrigger).siblings().children(this.config.subMenu + "." + ClassName.SHOW);
        this.hide(toggleElem);
      }

      elem.removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING).height(0);
      this.setTransitioning(true);

      var complete = function complete() {
        // check if disposed
        if (!_this.config || !_this.element) {
          return;
        }

        elem.removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE + " " + ClassName.SHOW).height('');

        _this.setTransitioning(false);

        elem.trigger(Event.SHOWN);
      };

      elem.height(element[0].scrollHeight).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
    };

    _proto.hide = function hide(element) {
      var _this2 = this;

      if (this.transitioning || !$(element).hasClass(ClassName.SHOW)) {
        return;
      }

      var elem = $(element);
      var startEvent = $.Event(Event.HIDE);
      elem.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      elem.parent(this.config.parentTrigger).removeClass(ClassName.ACTIVE); // eslint-disable-next-line no-unused-expressions

      elem.height(elem.height())[0].offsetHeight;
      elem.addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
      this.setTransitioning(true);

      var complete = function complete() {
        // check if disposed
        if (!_this2.config || !_this2.element) {
          return;
        }

        if (_this2.transitioning && _this2.config.onTransitionEnd) {
          _this2.config.onTransitionEnd();
        }

        _this2.setTransitioning(false);

        elem.trigger(Event.HIDDEN);
        elem.removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE);
      };

      if (elem.height() === 0 || elem.css('display') === 'none') {
        complete();
      } else {
        elem.height(0).one(Util.TRANSITION_END, complete).mmEmulateTransitionEnd(TRANSITION_DURATION);
      }
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this.transitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this.element, DATA_KEY);
      $(this.element).find(this.config.parentTrigger).has(this.config.subMenu).children(this.config.triggerElement).off('click');
      this.transitioning = null;
      this.config = null;
      this.element = null;
    };

    MetisMenu.jQueryInterface = function jQueryInterface(config) {
      // eslint-disable-next-line func-names
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        var conf = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new MetisMenu(this, conf);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    return MetisMenu;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = MetisMenu.jQueryInterface; // eslint-disable-line no-param-reassign

  $.fn[NAME].Constructor = MetisMenu; // eslint-disable-line no-param-reassign

  $.fn[NAME].noConflict = function () {
    // eslint-disable-line no-param-reassign
    $.fn[NAME] = JQUERY_NO_CONFLICT; // eslint-disable-line no-param-reassign

    return MetisMenu.jQueryInterface;
  };

  return MetisMenu;

})));
//# sourceMappingURL=metisMenu.js.map
