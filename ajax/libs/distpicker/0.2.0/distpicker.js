/*!
 * Distpicker v0.2.0
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2014-12-20T10:15:12.070Z
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as anonymous module.
    define(["jquery", "ChineseDistricts"], factory);
  } else {
    // Browser globals.
    factory(jQuery, ChineseDistricts);
  }
})(function ($, ChineseDistricts) {

  "use strict";

  if (typeof ChineseDistricts === "undefined") {
    throw new Error("The file \"distpicker.data.js\" must be included first!");
  }

  var NAMESPACE = ".distpicker",
      EVENT_CHANGE = "change" + NAMESPACE,

      Distpicker = function (element, options) {
        this.$element = $(element);
        this.defaults = $.extend({}, Distpicker.defaults, $.isPlainObject(options) ? options : {});
        this.placeholders = $.extend({}, Distpicker.defaults);
        this.init();
      };

  Distpicker.prototype = {
    constructor: Distpicker,

    data: ChineseDistricts,

    init: function () {
      var defaults = this.defaults,
          $select = this.$element.find("select"),
          length = $select.length,
          data = {};

      $select.each(function () {
        $.extend(data, $(this).data());
      });

      if (data.province) {
        defaults.province = data.province;
        this.$province = $select.filter("[data-province]");
      } else {
        this.$province = length > 0 ? $select.eq(0) : null;
      }

      if (data.city) {
        defaults.city = data.city;
        this.$city = $select.filter("[data-city]");
      } else {
        this.$city = length > 1 ? $select.eq(1) : null;
      }

      if (data.district) {
        defaults.district = data.district;
        this.$district = $select.filter("[data-district]");
      } else {
        this.$district = length > 2 ? $select.eq(2) : null;
      }

      this.reset(); // Reset all the selects.
      this.addListeners();
    },

    addListeners: function () {
      var that = this;

      if (this.$province) {
        this.$province.on(EVENT_CHANGE, function () {
          that.output("city");
          that.output("district");
        });
      }

      if (this.$city) {
        this.$city.on(EVENT_CHANGE, function () {
          that.output("district");
        });
      }
    },

    removeListeners: function () {
      if (this.$province) {
        this.$province.off(EVENT_CHANGE);
      }

      if (this.$city) {
        this.$city.off(EVENT_CHANGE);
      }
    },

    output: function (type) {
      var defaults = this.defaults,
          placeholders = this.placeholders,
          $select = this["$" + type],
          zipcode = 1,
          data = {},
          options = [],
          value = "",
          matched;

      if (!$select) {
        return;
      }

      value = defaults[type] || "";
      zipcode = (
        type === "province" ? 1 :
        type === "city"   ? this.$province.find("option:selected").data().zipcode :
        type === "district" ? this.$city.find("option:selected").data().zipcode : zipcode
      );

      data = $.isNumeric(zipcode) ? this.data[zipcode] : {};
      data = $.isPlainObject(data) ? data : {};

      $.each(data, function (zipcode, address) {
        var selected = address === value;

        if (selected) {
          matched = true;
        }

        options.push({
          zipcode: zipcode,
          address: address,
          selected: selected
        });
      });

      if (!matched) {
        if (defaults.autoSelect || defaults.autoselect) { // Triggered be change event of select element.
          options[0].selected = true;
        } else {
          placeholders[type] = value; // Save the unmatched value as a placeholder
        }
      }

      // Add placeholder option
      if (defaults.placeholder) {
        options.unshift({
          zipcode: "",
          address: placeholders[type],
          selected: false
        });
      }

      $select.html(this.template(options));
    },

    template: function (options) {
      var html = "";

      $.each(options, function (i, option) {
        html += (
          "<option value=\"" +
          (option.address && option.zipcode ? option.address : "") +
          "\"" +
          " data-zipcode=\"" +
          (option.zipcode || "") +
          "\"" +
          (option.selected ? " selected" : "") +
          ">" +
          (option.address || "") +
          "</option>"
        );
      });

      return html;
    },

    reset: function (deep) {
      var defaults = this.defaults;

      if (!deep) {
        this.output("province");
        this.output("city");
        this.output("district");
        return;
      }

      if (this.$province) {
        this.$province.find(":first").prop("selected", true);
      }

      if (this.$city) {
        if (defaults.placeholder) {
          this.$city.find(":gt(0)").remove();
        } else {
          this.output("city");
        }
      }

      if (this.$district) {
        if (defaults.placeholder) {
          this.$district.find(":gt(0)").remove();
        } else {
          this.output("district");
        }
      }
    },

    destroy: function () {
      this.removeListeners();
      this.$element.removeData("distpicker");
    }
  };

  // Default settings
  Distpicker.defaults = {
    autoSelect: true,
    placeholder: true,
    province: "—— 省 ——",
    city: "—— 市 ——",
    district: "—— 区 ——"
  };

  // Set default settings
  Distpicker.setDefaults = function (options) {
    $.extend(Distpicker.defaults, options);
  };

  // Register as jQuery plugin
  $.fn.distpicker = function (options) {
    var args = [].slice.call(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data("distpicker"),
          fn;

      if (!data) {
        $this.data("distpicker", (data = new Distpicker(this, options)));
      }

      if (typeof options === "string" && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });

    return (typeof result !== "undefined" ? result : this);
  };

  $.fn.distpicker.Constructor = Distpicker;
  $.fn.distpicker.setDefaults = Distpicker.setDefaults;

  $(function () {
    $("[data-distpicker]").distpicker();
  });
});
