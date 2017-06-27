/*!
 * Distpicker v1.0.4
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-01T15:05:52.606Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery', 'ChineseDistricts'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'), require('ChineseDistricts'));
  } else {
    // Browser globals.
    factory(jQuery, ChineseDistricts);
  }
})(function ($, ChineseDistricts) {

  'use strict';

  if (typeof ChineseDistricts === 'undefined') {
    throw new Error('The file "distpicker.data.js" must be included first!');
  }

  var NAMESPACE = 'distpicker';
  var EVENT_CHANGE = 'change.' + NAMESPACE;
  var PROVINCE = 'province';
  var CIRY = 'city';
  var DISTRICT = 'district';

  function Distpicker(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Distpicker.DEFAULTS, $.isPlainObject(options) && options);
    this.placeholders = $.extend({}, Distpicker.DEFAULTS);
    this.active = false;
    this.init();
  }

  Distpicker.prototype = {
    constructor: Distpicker,

    init: function () {
      var options = this.options;
      var $select = this.$element.find('select');
      var length = $select.length;
      var data = {};

      $select.each(function () {
        $.extend(data, $(this).data());
      });

      $.each([PROVINCE, CIRY, DISTRICT], $.proxy(function (i, type) {
        if (data[type]) {
          options[type] = data[type];
          this['$' + type] = $select.filter('[data-' + type + ']');
        } else {
          this['$' + type] = length > i ? $select.eq(i) : null;
        }
      }, this));

      this.bind();

      // Reset all the selects (after event binding)
      this.reset();

      this.active = true;
    },

    bind: function () {
      if (this.$province) {
        this.$province.on(EVENT_CHANGE, (this._changeProvince = $.proxy(function () {
          this.output(CIRY);
          this.output(DISTRICT);
        }, this)));
      }

      if (this.$city) {
        this.$city.on(EVENT_CHANGE, (this._changeCity = $.proxy(function () {
          this.output(DISTRICT);
        }, this)));
      }
    },

    unbind: function () {
      if (this.$province) {
        this.$province.off(EVENT_CHANGE, this._changeProvince);
      }

      if (this.$city) {
        this.$city.off(EVENT_CHANGE, this._changeCity);
      }
    },

    output: function (type) {
      var options = this.options;
      var placeholders = this.placeholders;
      var $select = this['$' + type];
      var districts = {};
      var data = [];
      var code;
      var matched;
      var value;

      if (!$select || !$select.length) {
        return;
      }

      value = options[type];

      code = (
        type === PROVINCE ? 86 :
        type === CIRY ? this.$province && this.$province.find(':selected').data('code') :
        type === DISTRICT ? this.$city && this.$city.find(':selected').data('code') : code
      );

      districts = $.isNumeric(code) ? ChineseDistricts[code] : null;

      if ($.isPlainObject(districts)) {
        $.each(districts, function (code, address) {
          var selected = address === value;

          if (selected) {
            matched = true;
          }

          data.push({
            code: code,
            address: address,
            selected: selected
          });
        });
      }

      if (!matched) {
        if (data.length && (options.autoSelect || options.autoselect)) {
          data[0].selected = true;
        }

        // Save the unmatched value as a placeholder at the first output
        if (!this.active && value) {
          placeholders[type] = value;
        }
      }

      // Add placeholder option
      if (options.placeholder) {
        data.unshift({
          code: '',
          address: placeholders[type],
          selected: false
        });
      }

      $select.html(this.getList(data));
    },

    getList: function (data) {
      var list = [];

      $.each(data, function (i, n) {
        list.push(
          '<option' +
          ' value="' + (n.address && n.code ? n.address : '') + '"' +
          ' data-code="' + (n.code || '') + '"' +
          (n.selected ? ' selected' : '') +
          '>' +
            (n.address || '') +
          '</option>'
        );
      });

      return list.join('');
    },

    reset: function (deep) {
      if (!deep) {
        this.output(PROVINCE);
        this.output(CIRY);
        this.output(DISTRICT);
      } else if (this.$province) {
        this.$province.find(':first').prop('selected', true).trigger(EVENT_CHANGE);
      }
    },

    destroy: function () {
      this.unbind();
      this.$element.removeData(NAMESPACE);
    }
  };

  Distpicker.DEFAULTS = {
    autoSelect: true,
    placeholder: true,
    province: '—— 省 ——',
    city: '—— 市 ——',
    district: '—— 区 ——'
  };

  Distpicker.setDefaults = function (options) {
    $.extend(Distpicker.DEFAULTS, options);
  };

  // Save the other distpicker
  Distpicker.other = $.fn.distpicker;

  // Register as jQuery plugin
  $.fn.distpicker = function (option) {
    var args = [].slice.call(arguments, 1);

    return this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var options;
      var fn;

      if (!data) {
        if (/destroy/.test(option)) {
          return;
        }

        options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
        $this.data(NAMESPACE, (data = new Distpicker(this, options)));
      }

      if (typeof option === 'string' && $.isFunction(fn = data[option])) {
        fn.apply(data, args);
      }
    });
  };

  $.fn.distpicker.Constructor = Distpicker;
  $.fn.distpicker.setDefaults = Distpicker.setDefaults;

  // No conflict
  $.fn.distpicker.noConflict = function () {
    $.fn.distpicker = Distpicker.other;
    return this;
  };

  $(function () {
    $('[data-toggle="distpicker"]').distpicker();
  });
});
