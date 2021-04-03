/*!
 * Bootstrap Confirmation (v4.2.1)
 * @copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * @copyright 2014-2021 Damien "Mistic" Sorel <contact@git.strangeplanet.fr>
 * @licence Apache License, Version 2.0
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('bootstrap')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'bootstrap'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jQuery));
}(this, (function ($) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  if (typeof $.fn.popover === 'undefined' || $.fn.popover.Constructor.VERSION.split('.').shift() !== '4') {
    throw new Error('Bootstrap Confirmation 4 requires Bootstrap Popover 4');
  }

  var Popover = $.fn.popover.Constructor;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'confirmation';
  var VERSION = '4.2.1';
  var DATA_KEY = "bs." + NAME;
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var BTN_CLASS_BASE = 'h-100 d-flex align-items-center';
  var BTN_CLASS_DEFAULT = 'btn btn-sm';

  var DefaultType = _extends({}, Popover.DefaultType, {
    singleton: 'boolean',
    popout: 'boolean',
    copyAttributes: '(string|array)',
    onConfirm: 'function',
    onCancel: 'function',
    btnOkClass: 'string',
    btnOkLabel: 'string',
    btnOkIconClass: 'string',
    btnOkIconContent: 'string',
    btnCancelClass: 'string',
    btnCancelLabel: 'string',
    btnCancelIconClass: 'string',
    btnCancelIconContent: 'string',
    buttons: 'array'
  });

  var Default = _extends({}, Popover.Default, {
    _attributes: {},
    _selector: null,
    placement: 'top',
    title: 'Are you sure?',
    trigger: 'click',
    confirmationEvent: undefined,
    content: '',
    singleton: false,
    popout: false,
    copyAttributes: 'href target',
    onConfirm: $.noop,
    onCancel: $.noop,
    btnOkClass: BTN_CLASS_DEFAULT + " btn-primary",
    btnOkLabel: 'Yes',
    btnOkIconClass: '',
    btnOkIconContent: '',
    btnCancelClass: BTN_CLASS_DEFAULT + " btn-secondary",
    btnCancelLabel: 'No',
    btnCancelIconClass: '',
    btnCancelIconContent: '',
    buttons: [],
    // @formatter:off
    template: "\n<div class=\"popover confirmation\">\n  <div class=\"arrow\"></div>\n  <h3 class=\"popover-header\"></h3>\n  <div class=\"popover-body\">\n    <p class=\"confirmation-content\"></p>\n    <div class=\"confirmation-buttons text-center\">\n      <div class=\"btn-group\"></div>\n    </div>\n  </div>\n</div>" // @formatter:on

  });

  if (Default.whiteList) {
    Default.whiteList['*'].push('data-apply', 'data-dismiss');
  }

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.confirmation-content',
    BUTTONS: '.confirmation-buttons .btn-group'
  };
  var Keymap = {
    13: 'Enter',
    27: 'Escape',
    39: 'ArrowRight',
    40: 'ArrowDown'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY,
    CONFIRMED: "confirmed" + EVENT_KEY,
    CANCELED: "canceled" + EVENT_KEY,
    KEYUP: "keyup" + EVENT_KEY
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  // keep track of the last openned confirmation for keyboard navigation

  var activeConfirmation;

  var Confirmation = /*#__PURE__*/function (_Popover) {
    _inheritsLoose(Confirmation, _Popover);

    // Constructor
    function Confirmation(element, config) {
      var _this;

      _this = _Popover.call(this, element, config) || this;

      if ((_this.config.popout || _this.config.singleton) && !_this.config.rootSelector) {
        throw new Error('The rootSelector option is required to use popout and singleton features since jQuery 3.');
      } // keep trace of selectors


      _this._isDelegate = false;

      if (config.selector) {
        // container of buttons
        config._selector = config.rootSelector + " " + config.selector;
        _this.config._selector = config._selector;
      } else if (config._selector) {
        // children of container
        _this.config._selector = config._selector;
        _this._isDelegate = true;
      } else {
        // standalone
        _this.config._selector = config.rootSelector;
      }

      if (_this.config.confirmationEvent === undefined) {
        _this.config.confirmationEvent = _this.config.trigger;
      }

      if (!_this.config.selector) {
        _this._copyAttributes();
      }

      _this._setConfirmationListeners();

      return _this;
    } // Overrides


    var _proto = Confirmation.prototype;

    _proto.isWithContent = function isWithContent() {
      return true;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      $tip.find(Selector.CONTENT).toggle(!!content);

      if (content) {
        this.setElementContent($tip.find(Selector.CONTENT), content);
      }

      if (this.config.buttons.length > 0) {
        this._setButtons($tip, this.config.buttons);
      } else {
        this._setStandardButtons($tip);
      }

      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);

      this._setupKeyupEvent();
    };

    _proto.dispose = function dispose() {
      $('body').off(Event.CLICK + "." + this.uid);
      this.eventBody = false;

      this._cleanKeyupEvent();

      _Popover.prototype.dispose.call(this);
    };

    _proto.hide = function hide(callback) {
      this._cleanKeyupEvent();

      _Popover.prototype.hide.call(this, callback);
    } // Private

    /**
     * Build configuration object
     * Bootstrap standard is to give priority to JS config over data attributes,
     * but for Confirmation we prefer data attributes
     * @param config
     * @return {*}
     * @private
     */
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _Popover.prototype._getConfig.call(this, config);
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (dataAttr.indexOf('btn') !== 0) {
          delete dataAttributes[dataAttr];
        }
      });
      return _extends({}, config, dataAttributes);
    }
    /**
     * Copy the value of `copyAttributes` on the config object
     * @private
     */
    ;

    _proto._copyAttributes = function _copyAttributes() {
      var _this2 = this;

      this.config._attributes = {};

      if (this.config.copyAttributes) {
        if (typeof this.config.copyAttributes === 'string') {
          this.config.copyAttributes = this.config.copyAttributes.split(' ');
        }
      } else {
        this.config.copyAttributes = [];
      }

      this.config.copyAttributes.forEach(function (attr) {
        _this2.config._attributes[attr] = $(_this2.element).attr(attr);
      });
    }
    /**
     * Custom event listeners for popouts and singletons
     * @private
     */
    ;

    _proto._setConfirmationListeners = function _setConfirmationListeners() {
      var self = this;

      if (!this.config.selector) {
        // cancel original event
        $(this.element).on(this.config.trigger, function (e, ack) {
          if (!ack) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }
        }); // manage singleton

        $(this.element).on(Event.SHOWN, function () {
          if (self.config.singleton) {
            // close all other popover already initialized
            $(self.config._selector).not($(this)).filter(function () {
              return $(this).data(DATA_KEY) !== undefined;
            }).confirmation('hide');
          }
        });
      } else {
        // cancel original event
        $(this.element).on(this.config.trigger, this.config.selector, function (e, ack) {
          if (!ack) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }
        });
      }

      if (!this._isDelegate) {
        // manage popout
        this.eventBody = false;
        this.uid = this.element.id || Confirmation.getUID(NAME + "_group");
        $(this.element).on(Event.SHOWN, function () {
          if (self.config.popout && !self.eventBody) {
            self.eventBody = $('body').on(Event.CLICK + "." + self.uid, function (e) {
              if ($(self.config._selector).is(e.target) || $(self.config._selector).has(e.target).length > 0) {
                return;
              } // close all popover already initialized


              $(self.config._selector).filter(function () {
                return $(this).data(DATA_KEY) !== undefined;
              }).confirmation('hide');
              $('body').off(Event.CLICK + "." + self.uid);
              self.eventBody = false;
            });
          }
        });
      }
    }
    /**
     * Init the standard ok/cancel buttons
     * @param $tip
     * @private
     */
    ;

    _proto._setStandardButtons = function _setStandardButtons($tip) {
      var buttons = [{
        "class": this.config.btnOkClass,
        label: this.config.btnOkLabel,
        iconClass: this.config.btnOkIconClass,
        iconContent: this.config.btnOkIconContent,
        attr: this.config._attributes
      }, {
        "class": this.config.btnCancelClass,
        label: this.config.btnCancelLabel,
        iconClass: this.config.btnCancelIconClass,
        iconContent: this.config.btnCancelIconContent,
        cancel: true
      }];

      this._setButtons($tip, buttons);
    }
    /**
     * Init the buttons
     * @param $tip
     * @param buttons
     * @private
     */
    ;

    _proto._setButtons = function _setButtons($tip, buttons) {
      var self = this;
      var $group = $tip.find(Selector.BUTTONS).empty();
      buttons.forEach(function (button) {
        var btn = $('<a href="#"></a>').addClass(BTN_CLASS_BASE).addClass(button["class"] || BTN_CLASS_DEFAULT + " btn-secondary").html(button.label || '').attr(button.attr || (button.cancel ? {} : self.config._attributes));

        if (button.iconClass || button.iconContent) {
          btn.prepend($('<i></i>').addClass(button.iconClass || '').text(button.iconContent || ''));
        }

        btn.one('click', function (e) {
          if ($(this).attr('href') === '#') {
            e.preventDefault();
          }

          if (button.onClick) {
            button.onClick.call($(self.element));
          }

          if (button.cancel) {
            self.config.onCancel.call(self.element, button.value);
            $(self.element).trigger(Event.CANCELED, [button.value]);
          } else {
            self.config.onConfirm.call(self.element, button.value);
            $(self.element).trigger(Event.CONFIRMED, [button.value]);
            $(self.element).trigger(self.config.confirmationEvent, [true]);
          }

          self.hide();
        });
        $group.append(btn);
      });
    }
    /**
     * Install the keyboatd event handler
     * @private
     */
    ;

    _proto._setupKeyupEvent = function _setupKeyupEvent() {
      activeConfirmation = this;
      $(window).off(Event.KEYUP).on(Event.KEYUP, this._onKeyup.bind(this));
    }
    /**
     * Remove the keyboard event handler
     * @private
     */
    ;

    _proto._cleanKeyupEvent = function _cleanKeyupEvent() {
      if (activeConfirmation === this) {
        activeConfirmation = undefined;
        $(window).off(Event.KEYUP);
      }
    }
    /**
     * Event handler for keyboard navigation
     * @param event
     * @private
     */
    ;

    _proto._onKeyup = function _onKeyup(event) {
      if (!this.tip) {
        this._cleanKeyupEvent();

        return;
      }

      var $tip = $(this.getTipElement());
      var key = event.key || Keymap[event.keyCode || event.which];
      var $group = $tip.find(Selector.BUTTONS);
      var $active = $group.find('.active');
      var $next;

      switch (key) {
        case 'Escape':
          this.hide();
          break;

        case 'ArrowRight':
          if ($active.length && $active.next().length) {
            $next = $active.next();
          } else {
            $next = $group.children().first();
          }

          $active.removeClass('active');
          $next.addClass('active').focus();
          break;

        case 'ArrowLeft':
          if ($active.length && $active.prev().length) {
            $next = $active.prev();
          } else {
            $next = $group.children().last();
          }

          $active.removeClass('active');
          $next.addClass('active').focus();
          break;
      }
    } // Static

    /**
     * Generates an uui, copied from Bootrap's utils
     * @param {string} prefix
     * @returns {string}
     */
    ;

    Confirmation.getUID = function getUID(prefix) {
      var uid = prefix;

      do {
        // eslint-disable-next-line no-bitwise
        uid += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(uid));

      return uid;
    };

    Confirmation._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : {};

        _config.rootSelector = $(this).selector || _config.rootSelector; // this.selector removed in jQuery > 3

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Confirmation(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Confirmation, null, [{
      key: "VERSION",
      get: // Getters
      function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return Confirmation;
  }(Popover);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Confirmation._jQueryInterface;
  $.fn[NAME].Constructor = Confirmation;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Confirmation._jQueryInterface;
  };

})));
//# sourceMappingURL=bootstrap-confirmation.js.map
