/*!
 * Datepicker v0.1.0
 * https://github.com/fengyuanchen/datepicker
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

    var $window = $(window),
        $document = $(document),
        Datepicker = function (element, options) {
            this.$element = $(element);
            this.defaults = $.extend({}, Datepicker.defaults, this.$element.data(), $.isPlainObject(options) ? options : {});
            this.init();
        };

    Datepicker.prototype = {
        constructor: Datepicker,

        init: function () {
            var trigger = this.defaults.trigger;

            this.$trigger = trigger ? $(trigger) : this.$element;
            this.$picker = $(this.defaults.template);
            this.$years = this.$picker.find("[data-type='years picker']");
            this.$months = this.$picker.find("[data-type='months picker']");
            this.$days = this.$picker.find("[data-type='days picker']");
            this.$picker.appendTo("body");
            this.place();
            this.hide();

            this.format = Datepicker.fn.parseFormat(this.defaults.dateFormat);
            this.fillWeek();
            this.enable();
        },

        enable: function () {
            if (this.enabled) {
                return;
            }

            if (this.$element.is("input")) {
                this.$element.on("keyup", $.proxy(this.update, this));

                if (!this.defaults.trigger) {
                    this.$element.on("focus", $.proxy(this.show, this));
                }
            }

            this.$trigger.on("click", $.proxy(this.show, this));

            this.$picker.on({
                click: $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });

            this.update();
            this.enabled = true;
        },

        disable: function () {
            if (!this.enabled) {
                return;
            }

            if (this.$element.is("input")) {
                this.$element.off("keyup", this.update);

                if (!this.defaults.trigger) {
                    this.$element.off("focus", this.show);
                }
            }

            this.$trigger.off("click", this.show);

            this.$picker.off({
                click: this.click,
                mousedown: this.mousedown
            });

            this.hide();
            this.enabled = false;
        },

        showView: function (type) {
            var format = this.format;

            if (format.year || format.month || format.day) {
                switch (type) {

                    case 2:
                    case "years":
                        this.$months.hide();
                        this.$days.hide();

                        if (format.year) {
                            this.fillYears();
                            this.$years.show();
                        } else {
                            this.showView(0);
                        }

                        break;

                    case 1:
                    case "months":
                        this.$years.hide();
                        this.$days.hide();

                        if (format.month) {
                            this.fillMonths();
                            this.$months.show();
                        } else {
                            this.showView(2);
                        }

                        break;

                    // case 0:
                    // case "days":
                    default:
                        this.$years.hide();
                        this.$months.hide();

                        if (format.day) {
                            this.fillDays();
                            this.$days.show();
                        } else {
                            this.showView(1);
                        }
                }
            }
        },

        hideView: function () {
            if (this.defaults.autoClose) {
                this.hide();
            }
        },

        place: function () {
            var offset = this.$trigger.offset(),
                height = this.$trigger.outerHeight();

            this.$picker.css({
                top: offset.top + height,
                left: offset.left
            });
        },

        show: function () {
            if (!this.enabled) {
                return;
            }

            this.$picker.show();
            $window.on("resize", $.proxy(this.place, this));
            $document.on("mousedown", $.proxy(this.hide, this));

            this.place();
            this.showView(this.defaults.viewStart);
        },

        hide: function () {
            this.$picker.hide();
            $window.off("resize", this.place);
            $document.off("mousedown", this.hide);
        },

        mousedown: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        update: function () {
            var viewDate = this.$element.is("input") ? this.$element.prop("value") : this.$element.text();

            this.date = Datepicker.fn.parseDate(viewDate, this.format);
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0);
            this.fillAll();
        },

        output: function () {
            var $element = this.$element,
                date = Datepicker.fn.formatDate(this.date, this.format);

            if ($element.is("input")) {
                $element.prop("value", date).trigger("change");
            } else {
                $element.text(date);
            }
        },

        template: function (options) {
            var defaults = {
                text: "",
                type: "",
                selected: false,
                disabled: false
            };

            $.extend(defaults, options);

            return [
                '<' + this.defaults.itemTag + ' ',
                (defaults.selected ? 'class="' + this.defaults.selectedClass + '"' :
                defaults.disabled ? 'class="' + this.defaults.disabledClass + '"' : ''),
                (defaults.type ? ' data-type="' + defaults.type + '"' : ''),
                '>',
                defaults.text,
                '</' + this.defaults.itemTag + '>'
            ].join("");
        },

        fillAll: function () {
            this.fillYears();
            this.fillMonths();
            this.fillDays();
        },

        fillYears: function () {
            var title = "",
                items = [],
                suffix = this.defaults.yearSuffix || "",
                year = this.date.getFullYear(),
                viewYear = this.viewDate.getFullYear(),
                isCurrent,
                i;

            title = (viewYear - 5) + suffix + " - " + (viewYear + 6) + suffix;

            for (i = -5; i < 7; i++) {
                isCurrent = (viewYear + i) === year;
                items.push(this.template({
                    text: viewYear + i,
                    type: isCurrent ? "year selected" : "year",
                    selected: isCurrent,
                    disabled: i === -5 || i === 6
                }));
            }

            this.$picker.find("[data-type='years current']").html(title);
            this.$picker.find("[data-type='years']").empty().html(items.join(""));
        },

        fillMonths: function () {
            var title = "",
                items = [],
                options = this.defaults.monthsShort,
                year = this.date.getFullYear(),
                month = this.date.getMonth(),
                viewYear = this.viewDate.getFullYear(),
                isCurrent,
                i;

            title = viewYear.toString() + this.defaults.yearSuffix || "";

            for (i = 0; i < 12; i++) {
                isCurrent = viewYear === year && i === month;

                items.push(this.template({
                    text: options[i],
                    type: isCurrent ? "month selected" : "month",
                    selected: isCurrent
                }));
            }

            this.$picker.find("[data-type='year current']").html(title);
            this.$picker.find("[data-type='months']").empty().html(items.join(""));
        },

        fillWeek: function () {
            var items = [],
                options = this.defaults.daysMin,
                weekStart = parseInt(this.defaults.weekStart, 10) % 7,
                i;

            options = $.merge(options.slice(weekStart), options.slice(0, weekStart));

            for (i = 0; i < 7; i++) {
                items.push(this.template({
                    text: options[i]
                }));
            }

            this.$picker.find("[data-type='week']").empty().html(items.join(""));
        },

        fillDays: function () {
            var title = "",
                items = [],
                prevItems = [],
                currentItems = [],
                nextItems = [],
                options = this.defaults.monthsShort,
                suffix = this.defaults.yearSuffix || "",
                year = this.date.getFullYear(),
                month = this.date.getMonth(),
                day = this.date.getDate(),
                viewYear = this.viewDate.getFullYear(),
                viewMonth = this.viewDate.getMonth(),
                weekStart = parseInt(this.defaults.weekStart, 10) % 7,
                isCurrent,
                isDisabled,
                length,
                date,
                i,
                n;

            // Title of current month
            title = this.defaults.showMonthAfterYear ? (viewYear + suffix + " " + options[viewMonth]) : options[viewMonth] + " " + viewYear + suffix;

            // Days of prev month
            length = viewMonth === 0 ? Datepicker.fn.getDaysInMonth(viewYear - 1, 11) : Datepicker.fn.getDaysInMonth(viewYear, viewMonth - 1);

            for (i = 1; i <= length; i++) {
                prevItems.push(this.template({
                    text: i,
                    type: "day prev",
                    disabled: true
                }));
            }

            date = new Date(viewYear, viewMonth, 1, 0, 0, 0, 0); // The first day of current month
            n = (7 + (date.getDay() - weekStart)) % 7;
            n = n > 0 ? n : 7;
            prevItems = prevItems.slice((length - n));

            // Days of prev month next
            length = viewMonth === 11 ? Datepicker.fn.getDaysInMonth(viewYear + 1, 0) : Datepicker.fn.getDaysInMonth(viewYear, viewMonth + 1);

            for (i = 1; i <= length; i++) {
                nextItems.push(this.template({
                    text: i,
                    type: "day next",
                    disabled: true
                }));
            }

            length = Datepicker.fn.getDaysInMonth(viewYear, viewMonth);
            date = new Date(viewYear, viewMonth, length, 0, 0, 0, 0); // The last day of current month
            n = (7 - (date.getDay() + 1 - weekStart)) % 7;
            n = n >= (7 * 6 - (prevItems.length + length)) ? n : n + 7; // 7 * 6 : 7 columns & 6 rows, 42 items
            nextItems = nextItems.slice(0, n);

            // Days of current month
            for (i = 1; i <= length; i++) {
                isCurrent = viewYear === year && viewMonth === month && i === day;
                isDisabled = this.defaults.isDisabled(new Date(viewYear, viewMonth, i));

                currentItems.push(this.template({
                    text: i,
                    type: isDisabled ? "day disabled" : isCurrent ? "day selected" : "day",
                    selected: isCurrent,
                    disabled: isDisabled
                }));
            }

            // Merge all the days
            $.merge(items, prevItems);
            $.merge(items, currentItems);
            $.merge(items, nextItems);

            this.$picker.find("[data-type='month current']").html(title);
            this.$picker.find("[data-type='days']").empty().html(items.join(""));
        },

        click: function (e) {
            var $target = $(e.target),
                yearRegex = /^\d{2,4}$/,
                isYear = false,
                viewYear,
                viewMonth,
                viewDay,
                year,
                type;

            e.stopPropagation();
            e.preventDefault();

            if ($target.length === 0) {
                return;
            }

            viewYear = this.viewDate.getFullYear();
            viewMonth = this.viewDate.getMonth();
            viewDay = this.viewDate.getDate();
            type = $target.data().type;

            switch (type) {
                case "years prev":
                case "years next":
                    viewYear = type === "years prev" ? viewYear - 10 : viewYear + 10;
                    year = $target.text();
                    isYear = yearRegex.test(year);

                    if (isYear) {
                        viewYear = parseInt(year, 10);
                        this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    }

                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillYears();

                    if (isYear) {
                        this.showView(1);
                        this.output();
                    }

                    break;

                case "year prev":
                case "year next":
                    viewYear = type === "year prev" ? viewYear - 1 : viewYear + 1;
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillMonths();
                    break;

                case "year current":

                    if (this.format.year) {
                        this.showView(2);
                    }

                    break;

                case "year selected":

                    if (this.format.month) {
                        this.showView(1);
                    } else {
                        this.hideView();
                    }

                    break;

                case "year":
                    viewYear = parseInt($target.text(), 10);
                    this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);

                    if (this.format.month) {
                        this.showView(1);
                    } else {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "month prev":
                case "month next":
                    viewMonth = type === "month prev" ? viewMonth - 1 : type === "month next" ? viewMonth + 1 : viewMonth;
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillDays();
                    break;

                case "month current":

                    if (this.format.month) {
                        this.showView(1);
                    }

                    break;

                case "month selected":

                    if (this.format.day) {
                        this.showView(0);
                    } else {
                        this.hideView();
                    }

                    break;

                case "month":
                    viewMonth = $target.parent().children().index($target);
                    this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);

                    if (this.format.day) {
                        this.showView(0);
                    } else {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "day prev":
                case "day next":
                case "day":
                    viewMonth = type === "day prev" ? viewMonth - 1 : type === "day next" ? viewMonth + 1 : viewMonth;
                    viewDay = parseInt($target.text(), 10);
                    this.date = new Date(viewYear, viewMonth, viewDay, 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, viewDay, 0, 0, 0, 0);
                    this.fillDays();

                    if (type === "day") {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "day selected":
                    this.hideView();
                    this.output();
                    break;

                case "day disabled":
                    this.hideView();
                    break;

                // No default
            }
        }
    };

    // Common methods
    Datepicker.fn = {
        isLeapYear: function (year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        getDaysInMonth: function (year, month) {
            return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },

        parseFormat: function (format) {
            var separator = format.match(/[.\/\-\s].*?/) || "/",
                parts = format.split(/\W+/),
                length,
                i;

            if (!parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }

            format = {
                separator: separator[0],
                parts: parts
            };

            for (i = 0, length = parts.length; i < length; i++) {
                switch (parts[i]) {
                    case "dd":
                    case "d":
                        format.day = true;
                        break;

                    case "mm":
                    case "m":
                        format.month = true;
                        break;

                    case "yyyy":
                    case "yy":
                        format.year = true;
                        break;

                    // No default
                }
            }

            return format;
        },

        parseDate: function (date, format) {
            var parts,
                length,
                year,
                day,
                month,
                val,
                i;

            parts = typeof date === "string" && date.length > 0 ? date.split(format.separator) : [];
            length = format.parts.length;

            date = new Date();
            year = date.getFullYear();
            day = date.getDate();
            month = date.getMonth();

            if (parts.length === length) {
                for (i = 0; i < length; i++) {
                    val = parseInt(parts[i], 10) || 1;

                    switch (format.parts[i]) {
                        case "dd":
                        case "d":
                            day = val;
                            break;

                        case "mm":
                        case "m":
                            month = val - 1;
                            break;

                        case "yy":
                            year = 2000 + val;
                            break;

                        case "yyyy":
                            year = val;
                            break;

                        // No default
                    }
                }
            }

            return new Date(year, month, day, 0, 0, 0, 0);
        },

        formatDate: function (date, format) {
            var val = {
                    d: date.getDate(),
                    m: date.getMonth() + 1,
                    yy: date.getFullYear().toString().substring(2),
                    yyyy: date.getFullYear()
                },
                parts = [],
                length = format.parts.length,
                i;

            val.dd = (val.d < 10 ? "0" : "") + val.d;
            val.mm = (val.m < 10 ? "0" : "") + val.m;

            for (i = 0; i < length; i++) {
                parts.push(val[format.parts[i]]);
            }

            return parts.join(format.separator);
        }
    };

    Datepicker.defaults = {
        autoClose: false,
        dateFormat: "mm/dd/yyyy",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        disabledClass: "disabled",

        isDisabled: function ( /* date */ ) {
            return false;
        },

        itemTag: "li",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        selectedClass: "selected",
        showMonthAfterYear: false,
        template: [
            '<div class="datepicker-container" data-type="datepicker">',
                '<div class="datepicker-arrow"></div>',
                '<div class="datepicker-content">',
                    '<div class="content-years" data-type="years picker">',
                        '<ul class="datepicker-title">',
                            '<li class="datepicker-prev" data-type="years prev">&lsaquo;</li>',
                            '<li class="col-5" data-type="years current"></li>',
                            '<li class="datepicker-next" data-type="years next">&rsaquo;</li>',
                        '</ul>',
                        '<ul class="datepicker-years" data-type="years"></ul>',
                    '</div>',
                    '<div class="content-months" data-type="months picker">',
                        '<ul class="datepicker-title">',
                            '<li class="datepicker-prev" data-type="year prev">&lsaquo;</li>',
                            '<li class="col-5" data-type="year current"></li>',
                            '<li class="datepicker-next" data-type="year next">&rsaquo;</li>',
                        '</ul>',
                        '<ul class="datepicker-months" data-type="months"></ul>',
                    '</div>',
                    '<div class="content-days" data-type="days picker">',
                        '<ul class="datepicker-title">',
                            '<li class="datepicker-prev" data-type="month prev">&lsaquo;</li>',
                            '<li class="col-5" data-type="month current"></li>',
                            '<li class="datepicker-next" data-type="month next">&rsaquo;</li>',
                        '</ul>',
                        '<ul class="datepicker-week" data-type="week"></ul>',
                        '<ul class="datepicker-days" data-type="days"></ul>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(""),
        trigger: undefined,
        viewStart: 0, // 0 for "days", 1 for "months", 2 for "years"
        weekStart: 0, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
        yearSuffix: ""
    };

    Datepicker.setDefaults = function (options) {
        $.extend(Datepicker.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.datepicker = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("datepicker");

            if (!data) {
                data = new Datepicker(this, options);
                $this.data("datepicker", data);
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options]();
            }
        });
    };

    $.fn.datepicker.constructor = Datepicker;
    $.fn.datepicker.setDefaults = Datepicker.setDefaults;

    $(function () {
        $("[datepicker]").datepicker();
    });
});
