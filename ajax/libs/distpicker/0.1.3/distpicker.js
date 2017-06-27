/*!
 * Distpicker v0.1.3
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
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

    var DistPicker = function (element, options) {
            this.$element = $(element);
            this.defaults = $.extend({}, DistPicker.defaults, $.isPlainObject(options) ? options : {});
            this.init();
        };

    DistPicker.prototype = {
        constructor: DistPicker,

        data: ChineseDistricts,

        init: function () {
            var $select = this.$element.find("select"),
                length = $select.length,
                settings = {};

            $select.each(function () {
                $.extend(settings, $(this).data());
            });

            if (settings.province) {
                this.defaults.province = settings.province;
                this.$province = $select.filter("[data-province]");
            } else {
                this.$province = length > 0 ? $select.eq(0) : null;
            }

            if (settings.city) {
                this.defaults.city = settings.city;
                this.$city = $select.filter("[data-city]");
            } else {
                this.$city = length > 1 ? $select.eq(1) : null;
            }

            if (settings.district) {
                this.defaults.district = settings.district;
                this.$district = $select.filter("[data-district]");
            } else {
                this.$district = length >= 2 ? $select.eq(2) : null;
            }

            this.output("province");
            this.output("city");
            this.output("district");
            this.addListener();
        },

        addListener: function () {
            var that = this;

            if (this.$province) {
                this.$province.change(function () {
                    that.output("city");
                    that.output("district");
                });
            }

            if (this.$city) {
                this.$city.change(function () {
                    that.output("district");
                });
            }
        },

        output: function (type) {
            var zipcode = 1,
                data = {},
                options = [],
                value = "",
                $select = this["$" + type],
                that = this;

            if (!$select) {
                return;
            }

            value = this.defaults[type] || "";
            zipcode = type === "province" ? 1 :
                      type === "city"     ? this.$province.find("option:selected").data().zipcode :
                      type === "district" ? this.$city.find("option:selected").data().zipcode : zipcode;

            data = $.isNumeric(zipcode) ? this.data[zipcode] : {};
            data = $.isPlainObject(data) ? data : {};

            $.each(data, function (zipcode, address) {
                var selected = address === value;

                if (selected) {
                    that.selected = true;
                }

                options.push(that.template({
                    zipcode: zipcode,
                    address: address,
                    selected: selected
                }));
            });

            if (!this.selected) {
                options.unshift(that.template({
                    zipcode: "",
                    address: value,
                    selected: false
                }));
            }

            $select.html(options.join(""));
        },

        template: function (options) {
            var defaults = {
                    zipcode: "",
                    address: "",
                    selected: false
                };

            $.extend(defaults, options);

            return [
                "<option value=\"" + (defaults.address && defaults.zipcode ? defaults.address : "") + "\"",
                " data-zipcode=\"" + (defaults.zipcode ? defaults.zipcode : "") + "\"",
                (defaults.selected ? " selected" : ""),
                ">" + (defaults.address ? defaults.address : "") + "</option>"
            ].join("");
        }
    };

    // Default settings
    DistPicker.defaults = {
        province: "—— 省 ——",
        city: "—— 市 ——",
        district: "—— 区 ——"
    };

    // Set default settings
    DistPicker.setDefaults = function (options) {
        $.extend(DistPicker.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.distpicker = function (options) {
        return this.each(function () {
            $(this).data("distpicker", new DistPicker(this, options));
        });
    };

    $.fn.distpicker.constructor = DistPicker;
    $.fn.distpicker.setDefaults = DistPicker.setDefaults;

    // Initialize on DOM ready
    $(function () {
        $("[distpicker]").distpicker();
    });
});
