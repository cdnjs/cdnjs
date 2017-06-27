/*!
 * Bootstrap-checkbox v1.2.2 (http://vsn4ik.github.io/bootstrap-checkbox)
 * Copyright 2013-2014 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-checkbox/blob/master/LICENSE)
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
  function Checkboxpicker(element, options) {
    this.element = element;
    this.$element = $(element);

    this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, this.$element.data());

    if (this.$element.closest('label').length) {
      console.warn(this.options.warningMessage);

      return;
    }

    this.$group = $('<div class="btn-group">');

    // .btn-group-justified works with <a> elements as the <button> doesn't pick up the styles
    this.$buttons = $('<a><a>').addClass('btn');

    // === '': <... data-reverse>
    var reverse = this.options.reverse || this.options.reverse === '';

    this.$off = this.$buttons.eq(reverse ? 1 : 0);
    this.$on = this.$buttons.eq(reverse ? 0 : 1);

    this.init();
  }

  Checkboxpicker.prototype = {
    init: function() {
      // For IE 9/10 use $.fn.hide() instead $.fn.prop('hidden', true)
      this.$element.hide();

      if (this.options.offLabel) {
        this.$off.html(this.options.offLabel);
      }

      if (this.options.onLabel) {
        this.$on.html(this.options.onLabel);
      }

      if (this.options.offIconClass) {
        this.$off.prepend('<span class="' + this.options.offIconClass + '">');
      }

      if (this.options.onIconClass) {
        this.$on.prepend('<span class="' + this.options.onIconClass + '">');
      }

      if (this.element.checked) {
        this.$on.addClass('active ' + this.options.onClass);
        this.$off.addClass(this.options.defaultClass);
      }
      else {
        this.$off.addClass('active ' + this.options.offClass);
        this.$on.addClass(this.options.defaultClass);
      }

      if (this.options.style) {
        this.$group.addClass(this.options.style);
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
      this.$group.keydown(this.keydown.bind(this));

      // Don't trigger if <a> element has .disabled class, fine!
      this.$group.on('click', 'a:not(.active)', this.click.bind(this));

      this.$element.change(this.toggle_checked.bind(this));

      if (this.element.id) {
        $('label[for="' + this.element.id + '"]').click(this.focus.bind(this));
      }

      $(this.element.form).on('reset', this.reset.bind(this));

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
    toggle_checked: function() {
      // this.$group not focus (incorrect on form reset)
      this.$buttons.toggleClass('active ' + this.options.defaultClass);
      this.$off.toggleClass(this.options.offClass);
      this.$on.toggleClass(this.options.onClass);
    },
    toggle_disabled: function() {
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
      this.$group.focus();
    },
    click: function() {
      this.$element.prop('checked', !this.element.checked);
    },
    change: function(value) {
      // Fix #12
      this.element.checked = value;

      this.$element.change();
    },
    keydown: function(event) {
      // 13: Return, 32: Spacebar

      // Off vertical scrolling
      if (event.keyCode == 32) {
        event.preventDefault();
      }

      if (/^(13|32)$/.test(event.keyCode)) {
        this.click();
      }
    },
    reset: function() {
      // this.element.checked not used (incorect on large number of form elements)
      if ((this.element.defaultChecked && this.$off.hasClass('active')) || (!this.element.defaultChecked && this.$on.hasClass('active'))) {
        this.change(this.element.defaultChecked);
      }
    }
  };

  // Be hooks friendly
  var oldPropHooks = $.extend({}, $.propHooks);

  // Support $.fn.prop setter (checked, disabled)
  $.extend($.propHooks, {
    checked: {
      set: function(elem, value) {
        var data = $.data(elem, 'bs.checkbox');

        if (data && elem.checked != value) {
          data.change(value);
        }

        if (oldPropHooks.checked && oldPropHooks.checked.set) {
          oldPropHooks.checked.set(elem, value);
        }
      }
    },
    disabled: {
      set: function(elem, value) {
        var data = $.data(elem, 'bs.checkbox');

        if (data && elem.disabled != value) {
          data.toggle_disabled();
        }

        if (oldPropHooks.disabled && oldPropHooks.disabled.set) {
          oldPropHooks.disabled.set(elem, value);
        }
      }
    }
  });

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
    style: false,
    defaultClass: 'btn-default',
    disabledCursor: 'not-allowed',
    offClass: 'btn-danger',
    onClass: 'btn-success',
    offLabel: 'No',
    onLabel: 'Yes',
    offTitle: false,
    onTitle: false,
    warningMessage: 'Please do not use Bootstrap-checkbox element in label element.'
  };

  return $.fn.checkboxpicker;
});
