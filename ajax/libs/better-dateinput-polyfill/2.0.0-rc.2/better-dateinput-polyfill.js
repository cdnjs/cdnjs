/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 2.0.0-rc.2 Mon, 11 Apr 2016 15:35:18 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2016 Maksim Chemerisuk
 * @license MIT
 */
var _templateObject = _taggedTemplateLiteralLoose(["div.", "-calendar>(p.", "-calendar-header>a[unselectable=on]*2+time[is=local-time data-format='MMMM yyyy' aria-hidden=true unselectable=on].", "-calendar-caption)"], ["div.", "-calendar>(p.", "-calendar-header>a[unselectable=on]*2+time[is=local-time data-format='MMMM yyyy' aria-hidden=true unselectable=on].", "-calendar-caption)"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["table[aria-hidden=true].", "-calendar-days>(thead>(tr>th[unselectable=on]*7>time[is=local-time data-format=E]))+(tbody.", "-calendar-body>tr*6>td*7)"], ["table[aria-hidden=true].", "-calendar-days>(thead>(tr>th[unselectable=on]*7>time[is=local-time data-format=E]))+(tbody.", "-calendar-body>tr*6>td*7)"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["table[aria-hidden=true].", "-calendar-months>tbody>tr*3>td*4>time[is=local-time data-format=MMM])"], ["table[aria-hidden=true].", "-calendar-months>tbody>tr*3>td*4>time[is=local-time data-format=MMM])"]),
    _templateObject4 = _taggedTemplateLiteralLoose(["time[is=local-time aria-hidden=true].", "-value"], ["time[is=local-time aria-hidden=true].", "-value"]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

(function (DOM, BASE, VK_SPACE, VK_TAB, VK_ENTER, VK_ESCAPE, VK_BACKSPACE, VK_DELETE, VK_CONTROL) {
    "use strict";

    var emmet = DOM.emmetLiteral,
        HTML = DOM.get("documentElement"),
        ampm = function (pos, neg) {
        return HTML.lang === "en-US" ? pos : neg;
    },
        formatISODate = function (value) {
        return value.toISOString().split("T")[0];
    },
        PICKER_TEMPLATE = DOM.create(emmet(_templateObject, BASE, BASE, BASE)),
        DAYS_TEMPLATE = DOM.create(emmet(_templateObject2, BASE, BASE)),
        MONTHS_TEMPLATE = DOM.create(emmet(_templateObject3, BASE)),
        LABEL_TEMPLATE = DOM.create(emmet(_templateObject4, BASE)),
        readDateRange = function (el) {
        return ["min", "max"].map(function (x) {
            return new Date(el.get(x) || "");
        });
    };

    MONTHS_TEMPLATE.findAll("time").forEach(function (time, index) {
        time.set("datetime", new Date(2001, index, 9).toISOString());
    });

    DAYS_TEMPLATE.findAll("time").forEach(function (time, index) {
        time.set("datetime", new Date(ampm(2001, 2002), 0, index).toISOString());
    });

    PICKER_TEMPLATE.append(DAYS_TEMPLATE).append(MONTHS_TEMPLATE);

    DOM.extend("input[type=date]", {
        constructor: function () {
            if (this._isNative()) return false;

            var defaultValue = this.get("defaultValue"),
                picker = PICKER_TEMPLATE.clone(true),
                label = LABEL_TEMPLATE.clone(true),
                calenderDays = picker.find("." + BASE + "-calendar-body"),
                calendarMonths = picker.find("." + BASE + "-calendar-months"),
                calendarCaption = picker.find("." + BASE + "-calendar-caption"),
                invalidatePicker = this._invalidatePicker.bind(this, calendarCaption, calendarMonths, calenderDays, picker);

            this // hide original input text
            // IE8 doesn't suport color:transparent - use background-color instead
            .css("color", document.addEventListener ? "transparent" : this.css("background-color"))
            // sync picker visibility on focus/blur
            .on(["focus", "click"], this._focusPicker.bind(this, picker)).on("blur", this._blurPicker.bind(this, picker)).on("change", this._syncValue.bind(this, "value", label)).on("keydown", ["which"], this._keydownPicker.bind(this, picker)).value(defaultValue); // restore initial value

            label.set("data-format", this.get("data-format") || "E, dd MMM yyyy").css(this.css(["width", "font", "padding", "text-align", "border-width", "box-sizing"])).css("line-height", "") // IE10 returns invalid line-height for hidden elements
            .on("click", this._clickLabel.bind(this)).watch("datetime", invalidatePicker).set("datetime", defaultValue);

            this.before(picker.hide(), label).closest("form").on("reset", this._syncValue.bind(this, "defaultValue", label));

            picker.watch("aria-expanded", invalidatePicker).on("mousedown", ["target"], this._clickPicker.bind(this, picker, calendarMonths)).css("z-index", 1 + (this.css("z-index") | 0));

            calendarCaption.on("click", this._clickPickerCaption.bind(this, picker));

            // display calendar for autofocused elements
            if (this.matches(":focus")) picker.show();
        },
        _isNative: function () {
            var polyfillType = this.get("data-polyfill"),
                deviceType = "orientation" in window ? "mobile" : "desktop";

            if (polyfillType === "none") return true;

            if (!polyfillType || polyfillType === deviceType && polyfillType !== "all") {
                // use a stronger type support detection that handles old WebKit browsers:
                // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
                if (this[0].type === "date") return true;
                // persist current value to restore it later
                this.set("defaultValue", this.value());
                // if browser allows invalid value then it doesn't support the feature
                return this.value("_").value() !== "_";
            } else {
                // remove native control
                this.set("type", "text");
                // force applying the polyfill
                return false;
            }
        },
        _invalidatePicker: function (caption, calendarMonths, calenderDays, picker) {
            var expanded = picker.get("aria-expanded") === "true";
            var value = new Date(this.value());
            var year, month, date;

            if (!value.getTime()) {
                value = new Date();
            }

            month = value.getUTCMonth();
            date = value.getUTCDate();
            year = value.getUTCFullYear();

            var range = readDateRange(this);
            var iterDate = new Date(Date.UTC(year, month, 0));

            if (expanded) {
                calendarMonths.findAll("td").forEach(function (day, index) {
                    iterDate.setUTCMonth(index);

                    var mDiff = month - iterDate.getUTCMonth(),
                        className = BASE + "-calendar-";

                    if (iterDate < range[0] || iterDate > range[1]) {
                        className += "out";
                    } else if (!mDiff) {
                        className += "today";
                    } else {
                        className = "";
                    }

                    day.set("class", className);
                });
            } else {
                // move to beginning of the first week in current month
                iterDate.setUTCDate(iterDate.getUTCDate() - iterDate.getUTCDay() - ampm(1, 0));
                // update days picker
                calenderDays.findAll("td").forEach(function (day) {
                    iterDate.setUTCDate(iterDate.getUTCDate() + 1);

                    var mDiff = month - iterDate.getUTCMonth(),
                        className = BASE + "-calendar-";

                    if (year !== iterDate.getUTCFullYear()) mDiff *= -1;

                    if (iterDate < range[0] || iterDate > range[1]) {
                        className += "out";
                    } else if (mDiff > 0) {
                        className += "past";
                    } else if (mDiff < 0) {
                        className += "future";
                    } else if (date === iterDate.getUTCDate()) {
                        className += "today";
                    } else {
                        className = "";
                    }

                    day.set("class", className).data("ts", iterDate.getTime()).value(iterDate.getUTCDate());
                });
            }

            // update calendar caption
            caption.set("data-format", expanded ? "yyyy" : "MMMM yyyy").set("datetime", new Date(year, month).toISOString());
        },
        _syncValue: function (propName, label) {
            var value = this.get(propName);

            this.value(value);
            label.set("datetime", value);
        },
        _clickPicker: function (picker, calendarMonths, target) {
            var targetDate;

            if (target.matches("a")) {
                targetDate = new Date(this.value());

                if (!targetDate.getTime()) targetDate = new Date();

                var sign = target.next("a")[0] ? -1 : 1;

                if (picker.get("aria-expanded") === "true") {
                    targetDate.setUTCFullYear(targetDate.getUTCFullYear() + sign);
                } else {
                    targetDate.setUTCMonth(targetDate.getUTCMonth() + sign);
                }
            } else if (calendarMonths.contains(target)) {
                target = target.closest("time");

                targetDate = new Date(this.value());
                targetDate.setUTCMonth(new Date(target.get("datetime")).getUTCMonth());

                picker.hide();
            } else if (target.matches("td")) {
                targetDate = target.data("ts");

                if (targetDate) {
                    targetDate = new Date(targetDate);
                    picker.hide();
                }
            }

            if (targetDate != null) {
                var range = readDateRange(this);

                if (targetDate < range[0]) {
                    targetDate = range[0];
                } else if (targetDate > range[1]) {
                    targetDate = range[1];
                }

                this.value(formatISODate(targetDate)).fire("change");
            }
            // prevent input from loosing focus
            return false;
        },
        _keydownPicker: function (picker, which) {
            var delta, currentDate;
            // ENTER key should submit form if calendar is hidden
            if (picker.matches(":hidden") && which === VK_ENTER) return true;

            if (which === VK_SPACE) {
                // SPACE key toggles calendar visibility
                picker.set("aria-expanded", "false").toggle();
            } else if (which === VK_ESCAPE || which === VK_TAB || which === VK_ENTER) {
                picker.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === VK_BACKSPACE || which === VK_DELETE) {
                    this.value("").fire("change"); // BACKSPACE, DELETE clear value
                } else if (which === VK_CONTROL) {
                        // CONTROL toggles calendar mode
                        picker.set("aria-expanded", String(picker.get("aria-expanded") !== "true"));
                    } else {
                        currentDate = new Date(this.value());

                        if (!currentDate.getTime()) currentDate = new Date();

                        if (which === 74 || which === 40) {
                            delta = 7;
                        } else if (which === 75 || which === 38) {
                            delta = -7;
                        } else if (which === 76 || which === 39) {
                            delta = 1;
                        } else if (which === 72 || which === 37) {
                            delta = -1;
                        }

                        if (delta) {
                            var expanded = picker.get("aria-expanded") === "true";

                            if (expanded && (which === 40 || which === 38)) {
                                currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 4 : -4));
                            } else if (expanded && (which === 37 || which === 39)) {
                                currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 1 : -1));
                            } else {
                                currentDate.setUTCDate(currentDate.getUTCDate() + delta);
                            }

                            var range = readDateRange(this);

                            if (!(currentDate < range[0] || currentDate > range[1])) {
                                this.value(formatISODate(currentDate)).fire("change");
                            }
                        }
                    }
            // prevent default action except if it was TAB so
            // do not allow to change the value manually
            return which === VK_TAB;
        },
        _blurPicker: function (picker) {
            picker.hide();
        },
        _focusPicker: function (picker) {
            var _this = this;

            if (this.get("readonly")) return false;

            var offset = this.offset();
            var pickerOffset = picker.offset();
            var marginTop = offset.height;

            // #3: move calendar to the top when passing cross browser window bounds
            if (HTML.clientHeight < offset.bottom + pickerOffset.height) {
                marginTop = -pickerOffset.height;
            }

            picker
            // always recalculate picker top position
            .css("margin-top", marginTop)
            // always reset picker mode to default
            .set("aria-expanded", "false")
            // display the date picker
            .show();

            // use the trick below to reset text selection on focus
            /* istanbul ignore next */
            setTimeout(function () {
                var node = _this[0];

                if ("selectionStart" in node) {
                    node.selectionStart = 0;
                    node.selectionEnd = 0;
                } else {
                    var inputRange = node.createTextRange();

                    inputRange.moveStart("character", 0);
                    inputRange.collapse();
                    inputRange.moveEnd("character", 0);
                    inputRange.select();
                }
            }, 0);
        },
        _clickPickerCaption: function (picker) {
            picker.set("aria-expanded", String(picker.get("aria-expanded") !== "true"));
        },
        _clickLabel: function () {
            this.fire("focus");
        }
    });
})(window.DOM, "btr-dateinput", 32, 9, 13, 27, 8, 46, 17);
DOM.importStyles("@media screen", ".btr-dateinput-value{position:absolute;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-style:solid;border-color:transparent;pointer-events:none}.btr-dateinput-calendar{position:absolute;visibility:hidden;display:inline-block;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#FFF;border-bottom:1px solid #DDD;overflow:hidden;border-radius:3px;-webkit-box-shadow:0 .25em .5em rgba(0,0,0,.2);box-shadow:0 .25em .5em rgba(0,0,0,.2);font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:center;opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;-webkit-transition:.1s ease-out;transition:.1s ease-out;width:17em;max-height:18.25em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.btr-dateinput-calendar-months{position:absolute;margin-top:1px;top:2.5em;left:0;visibility:hidden}.btr-dateinput-calendar[aria-expanded=true]{max-height:14.25em}.btr-dateinput-calendar[aria-expanded=true] .btr-dateinput-calendar-months{visibility:inherit}.btr-dateinput-calendar[aria-hidden=true]{opacity:0;-webkit-transform:skew(-25deg) scaleX(.75);-ms-transform:skew(-25deg) scaleX(.75);transform:skew(-25deg) scaleX(.75)}.btr-dateinput-calendar-header{position:relative;margin:0;height:2.5em;line-height:2.5em;font-weight:700;white-space:nowrap;background:#34b3df;text-shadow:0 1px 0 #555;border-bottom:1px solid #207fb1}.btr-dateinput-calendar-header>a{width:2.5em;height:2.5em;position:absolute;left:0;top:0;color:inherit}.btr-dateinput-calendar-header>time{display:block}.btr-dateinput-calendar-header>a:before{content:'\\25C4'}.btr-dateinput-calendar-header>a:before{font-size:.85em}.btr-dateinput-calendar-header>a+a{left:auto;right:0}.btr-dateinput-calendar-header>a+a:before{content:'\\25BA'}.btr-dateinput-calendar-days,.btr-dateinput-calendar-months{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;color:#555;background:#FFF;border-radius:3px;border:1px solid #DDD;border-bottom:0}.btr-dateinput-calendar-days>thead{border-top:1px solid #EEE;border-bottom:1px solid #ababab;font-size:.85em;background:#DDD;font-weight:700;text-shadow:0 1px 0 #f3f3f3}.btr-dateinput-calendar td,.btr-dateinput-calendar th{width:2.5em;height:2.25em;line-height:2.25;padding:0;text-align:center}.btr-dateinput-calendar-months td{line-height:4;height:4em}.btr-dateinput-calendar-months time{display:block}.btr-dateinput-calendar-past,.btr-dateinput-calendar-future{color:#ababab}.btr-dateinput-calendar-out{color:#ababab;text-shadow:0 1px 0 #FFF}.btr-dateinput-calendar-today{color:#FFF;background-color:#34b3df;text-shadow:0 1px 0 #555;font-weight:700}.btr-dateinput-calendar-out,.btr-dateinput-calendar td:hover{background-color:#f3f3f3;background-color:rgba(0,0,0,.05)}.btr-dateinput-calendar-header>a:hover,td.btr-dateinput-calendar-today:hover{background-color:#207fb1;text-decoration:none}.btr-dateinput-value+input::-moz-placeholder{color:#ababab}.btr-dateinput-value+input:-ms-input-placeholder{color:#ababab!important}.btr-dateinput-value+input::-webkit-input-placeholder{color:#ababab}");
