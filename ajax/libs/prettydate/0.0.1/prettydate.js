/*!
 * Pretty Date v0.0.1
 * https://github.com/fengyuanchen/prettydate
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {
   
    "use strict";

    var PrettyDate = function(element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, PrettyDate.defaults, this.$element.data(), options);
            this.init();
            // console.log(this);
        },
        s = 1000,
        m = 60 * s,
        h = 60 * m,
        D = 24 * h,
        w = 7 * D,
        M = 31 * D,
        Y = 365 * D;
            
    PrettyDate.prototype = {
        constructor: PrettyDate,

        number: {
            s: s,
            m: m,
            h: h,
            D: D,
            w: w,
            M: M,
            Y: Y
        },

        init: function() {
            var defaults = this.defaults,
                date = defaults.date || this.$element.text();

            this.format = PrettyDate.fn.parseFormat(defaults.dateFormat);
            this.date = PrettyDate.fn.parseDate(date, this.format);
            
            if (this.date) {
                this.prettify();
                
                if (defaults.autoUpdate) {
                    this.update();
                } else {
                    this.destory();
                }
            }
        },

        prettify: function() {
            var diff = (new Date()).getTime() - this.date.getTime(),
                past = diff > 0 ? true : false,
                n = this.number,
                msgs = this.defaults.messages,
                prettydate;
            
            diff = Math.abs(diff);
            prettydate = (
                diff < 2 * n.s ? msgs["second"] :
                diff < n.m ? msgs["seconds"].replace("%s", Math.floor(diff / n.s)) :
                diff < 2 * n.m ? msgs["minute"] :
                diff < n.h ? msgs["minutes"].replace("%s", Math.floor(diff / n.m)) :
                diff < 2 * n.h ? msgs["hour"] :
                diff < n.D ? msgs["hours"].replace("%s", Math.floor(diff / n.h)) :
                diff < 2 * n.D ? (past ? msgs["yesterday"] : msgs["tomorrow"]) :
                diff < 3 * n.D ? (past ? msgs["beforeYesterday"] : msgs["afterTomorrow"]) :
                /* diff < 2 * n.D ? msgs["day"] : */
                diff < n.w ? msgs["days"].replace("%s", Math.floor(diff / n.D)) :
                diff < 2 * n.w ? msgs["week"] :
                diff < 4 * n.w ? msgs["weeks"].replace("%s", Math.floor(diff / n.w)) :
                diff < 2 * n.M ? msgs["month"] :
                diff < n.Y ? msgs["months"].replace("%s", Math.floor(diff / n.M)) :
                diff < 2 * n.Y ? msgs["year"] : msgs["years"].replace("%s", Math.floor(diff / n.Y))
            );
            
            prettydate = prettydate.replace("%s", past ? this.defaults.beforeSuffix : this.defaults.afterSuffix);

            this.$element.data({
                date: this.date,
                prettydate: prettydate
            }).text(prettydate);

            this.prettydate = prettydate;
        },

        destory: function() {
            var that = this;

            if (this.defaults.autoUpdate && this.autoUpdate) {
                clearInterval(this.autoUpdate);
            }

            $.each(this, function(i) {
                that[i] = null;
            });
        },

        update: function() {
            var duration = this.defaults.duration,
                that = this;

            if (typeof duration === "number" && duration > 0) {
                this.autoUpdate = setInterval(function() {
                    that.prettify();
                }, duration);
            }
        }
    };

    PrettyDate.fn = {
        parseFormat: function(format) {
            var parts = typeof format === "string" ? format.match(/(\w+)/g) : [],
                monthMatched = false;
            
            if (!parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }

            format = $.map(parts, function(n) {
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

        parseDate: function(date, format) {
            var parts = typeof date === "string" ? date.match(/(\d+)/g) : [],
                data = {
                    Y: 0,
                    M: 0,
                    D: 0,
                    h: 0,
                    m: 0,
                    s: 0
                };

            if (parts.length === format.length) {

                $.each(format, function(i, n) {
                    data[n] = parseInt(parts[i], 10) || 0;
                });

                date = new Date(data.Y, data.M - 1, data.D, data.h, data.m, data.s);
            } else {
                date = new Date(date);
            }

            return date.getTime() ? date : null;
        }
    };

    // Default settings
    PrettyDate.defaults = {
        afterSuffix: "later",
        beforeSuffix: "ago",
        autoUpdate: false,
        date: undefined,
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

    // Set default settings
    PrettyDate.setDefaults = function(options) {
        $.extend(PrettyDate.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.prettydate = function(options) {
        return this.each(function() {
            $(this).data("prettydate", new PrettyDate(this, options));
        });
    };

    $.fn.prettydate.Constructor = PrettyDate;
    $.fn.prettydate.setDefaults = PrettyDate.setDefaults;

    // Initialize on DOM ready
    $(function() {
        $("[prettydate]").prettydate();
    });
    
}));