/*!
 * Pretty Date v0.1.0
 * https://github.com/fengyuanchen/prettydate
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var PrettyDate = function (element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, PrettyDate.defaults, this.$element.data(), options);
            this.init();
        },

        // Helper variables
        floor = Math.floor,
        second = 1000,
        minute = 60 * second,
        hour = 60 * minute,
        day = 24 * hour,
        week = 7 * day,
        month = 31 * day,
        year = 365 * day;

    PrettyDate.prototype = {
        constructor: PrettyDate,

        init: function () {
            var $this = this.$element,
                defaults = this.defaults,
                isInput = $this.is("input"),
                originalDate = isInput ? $this.val() : $this.text();

            this.isInput = isInput;
            this.originalDate = originalDate;
            this.format = PrettyDate.fn.parseFormat(defaults.dateFormat);
            this.setDate(defaults.date || originalDate);
            this.active = true;

            if (this.date) {
                this.prettify();

                if (defaults.autoUpdate) {
                    this.update();
                }
            }
        },

        setDate: function (date) {
            if (date) {
                this.date = PrettyDate.fn.parseDate(date, this.format);
            }
        },

        prettify: function () {
            var diff = (new Date()).getTime() - this.date.getTime(),
                past = diff > 0 ? true : false,
                messages = this.defaults.messages,
                $this = this.$element,
                prettyDate;

            if (!this.active) {
                return;
            }

            diff = diff < 0 ? (second - diff) : diff;
            prettyDate = (
                diff < 2 * second ? messages.second :
                diff < minute ? messages.seconds.replace("%s", floor(diff / second)) :
                diff < 2 * minute ? messages.minute :
                diff < hour ? messages.minutes.replace("%s", floor(diff / minute)) :
                diff < 2 * hour ? messages.hour :
                diff < day ? messages.hours.replace("%s", floor(diff / hour)) :
                diff < 2 * day ? (past ? messages.yesterday : messages.tomorrow) :
                diff < 3 * day ? (past ? messages.beforeYesterday : messages.afterTomorrow) :
                /* diff < 2 * day ? messages.day : */
                diff < week ? messages.days.replace("%s", floor(diff / day)) :
                diff < 2 * week ? messages.week :
                diff < 4 * week ? messages.weeks.replace("%s", floor(diff / week)) :
                diff < 2 * month ? messages.month :
                diff < year ? messages.months.replace("%s", floor(diff / month)) :
                diff < 2 * year ? messages.year : messages.years.replace("%s", floor(diff / year))
            );

            prettyDate = prettyDate.replace("%s", past ? this.defaults.beforeSuffix : this.defaults.afterSuffix);

            if (this.isInput) {
                $this.val(prettyDate);
            } else {
                $this.text(prettyDate);
            }

            this.prettyDate = prettyDate;
        },

        destroy: function () {
            var $this = this.$element,
                originalDate = this.originalDate;

            if (!this.active) {
                return;
            }

            if (this.defaults.autoUpdate && this.autoUpdate) {
                clearInterval(this.autoUpdate);
            }

            if (this.isInput) {
                $this.val(originalDate);
            } else {
                $this.text(originalDate);
            }

            $this.removeData("prettydate");

            this.active = false;
        },

        update: function () {
            var duration = this.defaults.duration,
                that = this;

            if (typeof duration === "number" && duration > 0) {
                this.autoUpdate = setInterval(function () {
                    that.prettify();
                }, duration);
            }
        }
    };

    PrettyDate.fn = {
        parseFormat: function (format) {
            var parts = typeof format === "string" ? format.match(/(\w+)/g) : [],
                monthMatched = false;

            if (!parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }

            format = $.map(parts, function (n) {
                var part = n.substr(0, 1);

                switch (part) {
                    case "S":
                    case "s":
                        part = "s";
                        break;

                    case "m":
                        part = monthMatched ? "m" : "M";
                        monthMatched = true;
                        break;

                    case "H":
                    case "h":
                        part = "h";
                        break;

                    case "D":
                    case "d":
                        part = "D";
                        break;

                    case "M":
                        part = "M";
                        monthMatched = true;
                        break;

                    case "Y":
                    case "y":
                        part = "Y";
                        break;

                    // No default
                }

                return part;
            });

            return format;
        },

        parseDate: function (date, format) {
            var parts = typeof date === "string" ? date.match(/(\d+)/g) : [],
                data = {
                    Y: 0,
                    M: 0,
                    D: 0,
                    h: 0,
                    m: 0,
                    s: 0
                };

            if ($.isArray(parts) && $.isArray(format) && parts.length === format.length) {
                $.each(format, function (i, n) {
                    data[n] = parseInt(parts[i], 10) || 0;
                });

                data.Y += data.Y > 0 && data.Y < 100 ? 2000 : 0; // Year: 14 -> 2014

                date = new Date(data.Y, data.M - 1, data.D, data.h, data.m, data.s);
            } else {
                date = new Date(date);
            }

            return date.getTime() ? date : null;
        }
    };

    PrettyDate.defaults = {
        afterSuffix: "later",
        beforeSuffix: "ago",
        autoUpdate: false,
        date: null,
        dateFormat: "YYYY-MM-DD hh:mm:ss",
        duration: 60000, // milliseconds
        messages: {
            second: "Just now",
            seconds: "%s seconds %s",
            minute: "One minute %s",
            minutes: "%s minutes %s",
            hour: "One hour %s",
            hours: "%s hours %s",
            day: "One day %s",
            days: "%s days %s",
            week: "One week %s",
            weeks: "%s weeks %s",
            month: "One month %s",
            months: "%s months %s",
            year: "One year %s",
            years: "%s years %s",

            // Extra
            yesterday: "Yesterday",
            beforeYesterday: "The day before yesterday",
            tomorrow: "Tomorrow",
            afterTomorrow: "The day after tomorrow"
        }
    };

    PrettyDate.setDefaults = function (options) {
        $.extend(PrettyDate.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.prettydate = function (options, settings) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("prettydate");

            if (!data) {
                $this.data("prettydate", (data = new PrettyDate(this, options)));
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options](settings);
            }
        });
    };

    $.fn.prettydate.constructor = PrettyDate;
    $.fn.prettydate.setDefaults = PrettyDate.setDefaults;

    $(function () {
        $("[prettydate]").prettydate();
    });
});
