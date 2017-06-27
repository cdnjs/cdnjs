/*!
 * Completer v0.1.3
 * https://github.com/fengyuanchen/completer
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-13T12:43:37.946Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var $window = $(window);
  var $document = $(document);
  var NAMESPACE = 'completer';
  var EVENT_RESIZE = 'resize';
  var EVENT_MOUSE_DOWN = 'mousedown';

  function Completer(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Completer.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }

  function espace(s) {
    return s.replace(/([\.\$\^\{\[\(\|\)\*\+\?\\])/g, '\\$1');
  }

  function toRegexp (s) {
    if (typeof s === 'string' && s !== '') {
      s = espace(s);

      return new RegExp(s + '+[^' + s + ']*$', 'i');
    }

    return null;
  }

  function toArray(s) {
    if (typeof s === 'string') {
      s = s.replace(/[\{\}\[\]"']+/g, '').split(/\s*,+\s*/);
    }

    s = $.map(s, function (n) {
      return typeof n !== 'string' ? n.toString() : n;
    });

    return s;
  }

  Completer.prototype = {
    constructor: Completer,

    init: function () {
      var options = this.options,
          data = toArray(options.source);

      if (data.length > 0) {
        this.data = data;
        this.regexp = toRegexp(options.separator);
        this.$completer = $(options.template);
        this.$completer.hide().appendTo('body');
        this.place();

        this.$element.attr('autocomplete', 'off').on({
          focus: $.proxy(this.enable, this),
          blur: $.proxy(this.disable, this)
        });

        if (this.$element.is(':focus')) {
          this.enable();
        }
      }
    },

    enable: function () {
      if (!this.active) {
        this.active = true;
        this.$element.on({
          keydown: $.proxy(this.keydown, this),
          keyup: $.proxy(this.keyup, this)
        });
        this.$completer.on({
          mousedown: $.proxy(this.mousedown, this),
          mouseover: $.proxy(this.mouseover, this)
        });
      }
    },

    disable: function () {
      if (this.active) {
        this.active = false;
        this.$element.off({
          keydown: this.keydown,
          keyup: this.keyup
        });
        this.$completer.off({
          mousedown: this.mousedown,
          mouseover: this.mouseover
        });
      }
    },

    attach: function (val) {
      var options = this.options;
      var separator = options.separator;
      var regexp = this.regexp;
      var part = regexp ? val.match(regexp) : null;
      var matched = [];
      var all = [];
      var that = this;
      var reg;
      var item;

      if (part) {
        part = part[0];
        val = val.replace(regexp, '');
        reg = new RegExp('^' +  espace(part), 'i');
      }

      $.each(this.data, function (i, n) {
        n = separator + n;
        item = that.template(val + n);

        if (reg && reg.test(n)) {
          matched.push(item);
        } else {
          all.push(item);
        }
      });

      matched = matched.length ? matched.sort() : all;

      if (options.position === 'top') {
        matched = matched.reverse();
      }

      this.fill(matched.join(''));
    },

    suggest: function (val) {
      var reg = new RegExp(espace(val), 'i');
      var that = this;
      var matched = [];

      $.each(this.data, function (i, n) {
        if (reg.test(n)) {
          matched.push(n);
        }
      });

      matched.sort(function (a, b) {
        return a.indexOf(val) - b.indexOf(val);
      });

      $.each(matched, function (i, n) {
        matched[i] = that.template(n);
      });

      this.fill(matched.join(''));
    },

    template: function (text) {
      var tag = this.options.itemTag;

      return ('<' + tag + '>' + text + '</' + tag + '>');
    },

    fill: function (html) {
      var filter;

      this.$completer.empty();

      if (html) {
        filter = this.options.position === 'top' ? ':last' : ':first';
        this.$completer.html(html);
        this.$completer.children(filter).addClass(this.options.selectedClass);
        this.show();
      } else {
        this.hide();
      }
    },

    complete: function () {
      var options = this.options;
      var val = options.filter(this.$element.val()).toString();

      if (val === '') {
        this.hide();
        return;
      }

      if (options.suggest) {
        this.suggest(val);
      } else {
        this.attach(val);
      }
    },

    keydown: function (e) {
      var keyCode = e.keyCode || e.which || e.charCode;

      if (keyCode === 13) {
        e.stopPropagation();
        e.preventDefault();
      }
    },

    keyup: function (e) {
      var keyCode = e.keyCode || e.which || e.charCode;

      if (keyCode === 13 || keyCode === 38 || keyCode === 40) {
        this.toggle(keyCode);
      } else {
        this.complete();
      }
    },

    mouseover: function (e) {
      var options = this.options;
      var selectedClass = options.selectedClass,
          $target = $(e.target);

      if ($target.is(options.itemTag)) {
        $target.addClass(selectedClass).siblings().removeClass(selectedClass);
      }
    },

    mousedown: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.setValue($(e.target).text());
    },

    setValue: function (val) {
      this.$element.val(val);
      this.options.complete();
      this.hide();
    },

    toggle: function (keyCode) {
      var selectedClass = this.options.selectedClass;
      var $selected = this.$completer.find('.' + selectedClass);

      switch (keyCode) {

        // Down
        case 40:
          $selected.removeClass(selectedClass);
          $selected = $selected.next();
          break;

        // Up
        case 38:
          $selected.removeClass(selectedClass);
          $selected = $selected.prev();
          break;

        // Enter
        case 13:
          this.setValue($selected.text());
          break;

        // No default
      }

      if ($selected.length === 0) {
        $selected = this.$completer.children(keyCode === 40 ? ':first' : ':last');
      }

      $selected.addClass(selectedClass);
    },

    place: function () {
      var $element = this.$element;
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;
      var height = $element.outerHeight();
      var width = $element.outerWidth();
      var styles = {
        minWidth: width,
        zIndex: this.options.zIndex
      };

      switch (this.options.position) {
        case 'right':
          styles.left = left + width;
          styles.top = top;
          break;

        case 'left':
          styles.right = $window.innerWidth() - left;
          styles.top = top;
          break;

        case 'top':
          styles.left = left;
          styles.bottom = $window.innerHeight() - top;
          break;

        // case 'bottom':
        default:
          styles.left = left;
          styles.top = top + height;
      }

      this.$completer.css(styles);
    },

    show: function () {
      this.$completer.show();
      $window.on(EVENT_RESIZE, $.proxy(this.place, this));
      $document.on(EVENT_MOUSE_DOWN, $.proxy(this.hide, this));
    },

    hide: function () {
      this.$completer.hide();
      $window.off(EVENT_RESIZE, this.place);
      $document.off(EVENT_MOUSE_DOWN, this.hide);
    },

    destroy: function () {
      var $this = this.$element;

      this.hide();
      this.disable();

      $this.off({
        focus: this.enable,
        blur: this.disable
      });

      $this.removeData(NAMESPACE);
    }
  };

  Completer.DEFAULTS = {
    itemTag: 'li',
    position: 'bottom', // or 'right'
    source: [],
    selectedClass: 'completer-selected',
    separator: '',
    suggest: false,
    template: '<ul class="completer-container"></ul>',
    zIndex: 1,
    complete: $.noop,
    filter: function (val) {
      return val;
    }
  };

  Completer.setDefaults = function (options) {
    $.extend(Completer.DEFAULTS, options);
  };

  // Save the other completer
  Completer.other = $.fn.completer;

  // Register as jQuery plugin
  $.fn.completer = function (option) {
    var args = [].slice.call(arguments, 1);
    var result;

    this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var options;
      var fn;

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
        $this.data(NAMESPACE, (data = new Completer(this, options)));
      }

      if (typeof option === 'string' && $.isFunction(fn = data[option])) {
        result = fn.apply(data, args);
      }
    });

    return typeof result !== 'undefined' ? result : this;
  };

  $.fn.completer.Constructor = Completer;
  $.fn.completer.setDefaults = Completer.setDefaults;

  // No conflict
  $.fn.completer.noConflict = function () {
    $.fn.completer = Completer.other;
    return this;
  };

  $(function () {
    $('[data-toggle="completer"]').completer();
  });
});
