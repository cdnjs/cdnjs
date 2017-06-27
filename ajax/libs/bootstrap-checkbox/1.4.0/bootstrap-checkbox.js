/*!
 * Bootstrap-checkbox v1.4.0 (https://vsn4ik.github.io/bootstrap-checkbox/)
 * Copyright 2013-2016 Vasily A. (https://github.com/vsn4ik)
 * Licensed under the MIT license
 */

/**
 * $.inArray: friends with IE8. Use Array.prototype.indexOf in future.
 * Use this.element.hidden in future.
 * $.proxy: friends with IE8. Use Function.prototype.bind in future.
 */

'use strict';

(function(factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  }
  else if (typeof exports == 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  $.create = function() {
    return $($.map(arguments, $.proxy(document, 'createElement')));
  };

  function Checkboxpicker(element, options) {
    this.element = element;
    this.$element = $(element);

    var data = this.$element.data();

    // <... data-reverse>
    if (data.reverse === '') {
      data.reverse = true;
    }

    // <... data-switch-always>
    if (data.switchAlways === '') {
      data.switchAlways = true;
    }

    // <... data-html>
    if (data.html === '') {
      data.html = true;
    }

    this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, data);

    if (this.$element.closest('label').length) {
      console.warn(this.options.warningMessage);

      return;
    }

    this.$group = $.create('div');

    // .btn-group-justified works with <a> elements as the <button> doesn't pick up the styles
    this.$buttons = $.create('a', 'a');

    this.$off = this.$buttons.eq(this.options.reverse ? 1 : 0);
    this.$on = this.$buttons.eq(this.options.reverse ? 0 : 1);

    this.init();
  }

  Checkboxpicker.prototype = {
    init: function() {
      var fn = this.options.html ? 'html' : 'text';

      this.$element.addClass('hidden');
      this.$group.addClass(this.options.baseGroupCls).addClass(this.options.groupCls);
      this.$buttons.addClass(this.options.baseCls).addClass(this.options.cls);

      if (this.options.offLabel) {
        this.$off[fn](this.options.offLabel);
      }

      if (this.options.onLabel) {
        this.$on[fn](this.options.onLabel);
      }

      if (this.options.offIconCls) {
        if (this.options.offLabel) {
          // &nbsp; -- whitespace (or wrap into span)
          this.$off.prepend('&nbsp;');
        }

        // $.addClass for XSS check
        $.create('span').addClass(this.options.iconCls).addClass(this.options.offIconCls).prependTo(this.$off);
      }

      if (this.options.onIconCls) {
        if (this.options.onLabel) {
          // &nbsp; -- whitespace (or wrap into span)
          this.$on.prepend('&nbsp;');
        }

        // $.addClass for XSS check
        $.create('span').addClass(this.options.iconCls).addClass(this.options.onIconCls).prependTo(this.$on);
      }

      if (this.element.checked) {
        this.$on.addClass('active');
        this.$on.addClass(this.options.onActiveCls);
        this.$off.addClass(this.options.offCls);
      }
      else {
        this.$off.addClass('active');
        this.$off.addClass(this.options.offActiveCls);
        this.$on.addClass(this.options.onCls);
      }

      if (this.element.title) {
        this.$group.attr('title', this.element.title);
      }
      else {
        // Attribute title (offTitle, onTitle) on this.$buttons not work (native) if this.element.disabled, fine!
        if (this.options.offTitle) {
          this.$off.attr('title', this.options.offTitle);
        }

        if (this.options.onTitle) {
          this.$on.attr('title', this.options.onTitle);
        }
      }

      // Keydown event only trigger if set tabindex, fine!
      this.$group.on('keydown', $.proxy(this, 'keydown'));

      // Don't trigger if <a> element has .disabled class, fine!
      this.$buttons.on('click', $.proxy(this, 'click'));

      this.$element.on('change', $.proxy(this, 'toggleChecked'));
      $(this.element.labels).on('click', $.proxy(this, 'focus'));
      $(this.element.form).on('reset', $.proxy(this, 'reset'));

      this.$group.append(this.$buttons).insertAfter(this.element);

      // Necessarily after this.$group.append() (autofocus)
      if (this.element.disabled) {
        this.$buttons.addClass('disabled');

        if (this.options.disabledCursor) {
          this.$group.css('cursor', this.options.disabledCursor);
        }
      }
      else {
        this.$group.attr('tabindex', this.element.tabIndex);

        if (this.element.autofocus) {
          this.focus();
        }
      }
    },
    toggleChecked: function() {
      // this.$group not focus (incorrect on form reset)
      this.$buttons.toggleClass('active');

      this.$off.toggleClass(this.options.offCls);
      this.$off.toggleClass(this.options.offActiveCls);
      this.$on.toggleClass(this.options.onCls);
      this.$on.toggleClass(this.options.onActiveCls);
    },
    toggleDisabled: function() {
      this.$buttons.toggleClass('disabled');

      if (this.element.disabled) {
        this.$group.attr('tabindex', this.element.tabIndex);
        this.$group.css('cursor', '');
      }
      else {
        this.$group.removeAttr('tabindex');

        if (this.options.disabledCursor) {
          this.$group.css('cursor', this.options.disabledCursor);
        }
      }
    },
    focus: function() {
      // Original behavior
      this.$group.trigger('focus');
    },
    click: function(event) {
      // Strictly event.currentTarget. Fix #19
      var $button = $(event.currentTarget);

      if (!$button.hasClass('active') || this.options.switchAlways) {
        this.change();
      }
    },
    change: function() {
      this.set(!this.element.checked);
    },
    set: function(value) {
      // Fix #12
      this.element.checked = value;

      this.$element.trigger('change');
    },
    keydown: function(event) {
      if ($.inArray(event.keyCode, this.options.toggleKeyCodes) != -1) {
        // Off vertical scrolling on Spacebar
        event.preventDefault();

        this.change();
      }
      else if (event.keyCode == 13) {
        $(this.element.form).trigger('submit');
      }
    },
    reset: function() {
      // this.element.checked not used (incorect on large number of form elements)
      if ((this.element.defaultChecked && this.$off.hasClass('active')) || (!this.element.defaultChecked && this.$on.hasClass('active'))) {
        this.set(this.element.defaultChecked);
      }
    }
  };

  // Be hooks friendly
  var oldPropHooks = $.extend({}, $.propHooks);

  // Support $.fn.prop setter (checked, disabled)
  $.extend($.propHooks, {
    checked: {
      set: function(element, value) {
        var data = $.data(element, 'bs.checkbox');

        if (data && element.checked != value) {
          data.change(value);
        }

        if (oldPropHooks.checked && oldPropHooks.checked.set) {
          oldPropHooks.checked.set(element, value);
        }
      }
    },
    disabled: {
      set: function(element, value) {
        var data = $.data(element, 'bs.checkbox');

        if (data && element.disabled != value) {
          data.toggleDisabled();
        }

        if (oldPropHooks.disabled && oldPropHooks.disabled.set) {
          oldPropHooks.disabled.set(element, value);
        }
      }
    }
  });

  var old = $.fn.checkboxpicker;

  // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/
  $.fn.checkboxpicker = function(options, elements) {
    var $elements;

    if (this instanceof $) {
      $elements = this;
    }
    else if (typeof options == 'string') {
      $elements = $(options);
    }
    else {
      $elements = $(elements);
    }

    return $elements.each(function() {
      var data = $.data(this, 'bs.checkbox');

      if (!data) {
        data = new Checkboxpicker(this, options);

        $.data(this, 'bs.checkbox', data);
      }
    });
  };

  // HTML5 data-*.
  // <input data-on-label="43"> --> $('input').data('onLabel') == '43'.
  $.fn.checkboxpicker.defaults = {
    baseGroupCls: 'btn-group',
    baseCls: 'btn',
    groupCls: null,
    cls: null,
    offCls: 'btn-default',
    onCls: 'btn-default',
    offActiveCls: 'btn-danger',
    onActiveCls: 'btn-success',
    offLabel: 'No',
    onLabel: 'Yes',
    offTitle: false,
    onTitle: false,
    iconCls: 'glyphicon',

    disabledCursor: 'not-allowed',

    // Event key codes:
    // 13: Return
    // 32: Spacebar
    toggleKeyCodes: [13, 32],

    warningMessage: 'Please do not use Bootstrap-checkbox element in label element.'
  };

  $.fn.checkboxpicker.Constructor = Checkboxpicker;
  $.fn.checkboxpicker.noConflict = function() {
    $.fn.checkboxpicker = old;
    return this;
  };

  return $.fn.checkboxpicker;
});
