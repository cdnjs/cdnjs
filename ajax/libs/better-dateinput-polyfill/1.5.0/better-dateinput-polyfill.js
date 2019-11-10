/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 1.5.0 Sun, 16 Nov 2014 15:57:55 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2014 Maksim Chemerisuk
 * @license MIT
 */
(function(DOM, BASE_CLASS, VK_SPACE, VK_TAB, VK_ENTER, VK_ESCAPE, VK_BACKSPACE, VK_DELETE) {
    "use strict";

    var __ = DOM.__,
        ampm = function(pos, neg)  {return DOM.get("lang") === "en-US" ? pos : neg},
        formatISODate = function(value)  {return value.toISOString().split("T")[0]},
        DAYS = "Su Mo Tu We Th Fr Sa".split(" "),
        MONTHS = "January February March April May June July August September October November December".split(" "),
        PICKER_TMP = DOM.create("div.{0}>p.{0}-header>a[{1}]*2+span[{2} {1}].{0}-caption^table[{2}].{0}-days>thead>(tr>th[{1}]*7)^(tbody.{0}-body*2>tr*6>td*7)", [(("" + BASE_CLASS) + "-calendar"), "unselectable=on", "aria-hidden=true"]),
        LABEL_TMP = DOM.create("span[aria-hidden=true].{0}-value", [BASE_CLASS]),
        readDateRange = function(el)  {return ["min", "max"].map(function(x)  {return new Date(el.get(x) || "")})};

    // need to skip mobile/tablet browsers
    DOM.extend("input[type=date]", !("orientation" in window), {
        constructor: function() {var this$0 = this;
            var calendar = PICKER_TMP.clone(true),
                label = LABEL_TMP.clone(true),
                color = this.css("color"),
                offset = this.offset(),
                calOffset;

            this
                // remove legacy dateinput implementation if it exists
                // also set value to current time to trigger watchers later
                .set({type: "text", value: Date.now()})
                // hide original input text
                // IE8 doesn't suport color:transparent - use background-color instead
                .css("color", document.addEventListener ? "transparent" : this.css("background-color"))
                // handle arrow keys, esc etc.
                .on("keydown", [calendar, "which", "shiftKey"], this.onCalendarKeyDown)
                // sync picker visibility on focus/blur
                .on(["focus", "click"], [calendar], this.onCalendarFocus)
                .on("blur", [calendar], this.onCalendarBlur)
                .on("change", [label], this.doFormatValue)
                .before(calendar)
                .before(label);

            calOffset = calendar.offset();

            calendar
                .on("mousedown", [calendar, "target"], this.onCalendarClick)
                .css({
                    "margin-left": offset.left - calOffset.left + (offset.width - calOffset.width) / 2,
                    "margin-top": offset.bottom - calOffset.top,
                    "z-index": 1 + (this.css("z-index") | 0)
                })
                .hide(); // hide calendar to trigger show animation properly later

            // move calendar to the top when passing cross browser window bounds
            if (DOM.get("clientHeight") < offset.bottom + calOffset.height) {
                calendar.css("margin-top", calOffset.top - offset.bottom - calOffset.height);
            }

            label
                .on("click", function()  { this$0.fire("focus") })
                // copy input CSS
                .css(this.css(["width", "font", "padding-left", "padding-right", "text-align", "border-width", "box-sizing"]))
                .css({
                    "color": color,
                    "line-height": offset.height + "px",
                    "margin-left": offset.left - calOffset.left,
                    "margin-top": offset.top - calOffset.top,
                });

            var calenderDays = calendar.findAll((("." + BASE_CLASS) + "-calendar-body"));

            calenderDays[1].hide().remove();

            this.closest("form").on("reset", this.onFormReset);
            this.watch("value", this.onValueChanged.bind(this,
                calendar.find((("." + BASE_CLASS) + "-calendar-caption")), calenderDays, calendar));
            // trigger watchers to build the calendar
            this.set(this.get("defaultValue"));
            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        onValueChanged: function(caption, calenderDays, calendar, value, prevValue) {
            var year, month, date, iterDate;

            value = new Date(value);

            if (!value.getTime()) {
                value = new Date();
            }

            month = value.getUTCMonth();
            date = value.getUTCDate();
            year = value.getUTCFullYear();

            // update calendar caption
            caption.set(__(MONTHS[month]).toHTMLString() + " " + year);
            // update calendar content
            iterDate = new Date(Date.UTC(year, month, 0));
            // move to beginning of current month week
            iterDate.setUTCDate(iterDate.getUTCDate() - iterDate.getUTCDay() - ampm(1, 0));

            prevValue = new Date(prevValue);

            var delta = value.getUTCMonth() - prevValue.getUTCMonth() + 100 * (value.getUTCFullYear() - prevValue.getUTCFullYear());
            var currenDays = calenderDays[calendar.contains(calenderDays[0]) ? 0 : 1];
            var targetDays = delta ? calenderDays[calenderDays[0] === currenDays ? 1 : 0] : currenDays;
            var range = readDateRange(this);

            // update days
            targetDays.findAll("td").forEach(function(day)  {
                iterDate.setUTCDate(iterDate.getUTCDate() + 1);

                var mDiff = month - iterDate.getUTCMonth(),
                    className = (("" + BASE_CLASS) + "-calendar-");

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

                day.set({
                    _ts: iterDate.getTime(),
                    className: className,
                    textContent: iterDate.getUTCDate()
                });
            });

            if (delta) {
                currenDays[delta > 0 ? "after" : "before"](targetDays);
                currenDays.hide(function()  { currenDays.remove() });
                targetDays.show();
            }

            // trigger event manually to notify about changes
            this.fire("change");
        },
        doFormatValue: function(label) {
            var value = new Date(this.get()),
                formattedValue = "";

            if (value.getTime()) {
                // TODO: read formatString value from data-format attribute
                var formatString = "E, dd MMM yyyy".replace(/\w+/g, "{$&}");

                formattedValue = DOM.format(formatString, {
                    E: __(DAYS[value.getUTCDay()]).toHTMLString(),
                    dd: (value.getUTCDate() > 9 ? "" : "0") + value.getUTCDate(),
                    MMM: __(MONTHS[value.getUTCMonth()].substr(0, 3) + ".").toHTMLString(),
                    yyyy: value.getUTCFullYear()
                });
            }

            // display formatted date value instead of real one
            label.set(formattedValue);
        },
        onCalendarClick: function(calendar, target) {
            var targetDate;

            if (target.matches("a")) {
                targetDate = new Date(this.get());

                if (!targetDate.getTime()) targetDate = new Date();

                targetDate.setUTCMonth(targetDate.getUTCMonth() + (target.next("a")[0] ? -1 : 1));

                var range = readDateRange(this);

                if (targetDate < range[0]) {
                    targetDate = range[0];
                } else if (targetDate > range[1]) {
                    targetDate = range[1];
                }
            } else if (target.matches("td")) {
                targetDate = target.get("_ts");

                if (targetDate) {
                    targetDate = new Date(targetDate);
                    calendar.hide();
                }
            }

            if (targetDate != null) {
                this.set(formatISODate(targetDate));
            }
            // prevent input from loosing focus
            return false;
        },
        onCalendarKeyDown: function(calendar, which, shiftKey) {
            var delta, currentDate;

            // ENTER key should submit form if calendar is hidden
            if (calendar.matches(":hidden") && which === VK_ENTER) return true;

            if (which === VK_SPACE) {
                calendar.toggle(); // SPACE key toggles calendar visibility
            } else if (which === VK_ESCAPE || which === VK_TAB || which === VK_ENTER) {
                calendar.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === VK_BACKSPACE || which === VK_DELETE) {
                this.set(""); // BACKSPACE, DELETE clear value
            } else {
                currentDate = new Date(this.get());

                if (!currentDate.getTime()) currentDate = new Date();

                if (which === 74 || which === 40) { delta = 7; }
                else if (which === 75 || which === 38) { delta = -7; }
                else if (which === 76 || which === 39) { delta = 1; }
                else if (which === 72 || which === 37) { delta = -1; }

                if (delta) {
                    if (shiftKey && (which === 40 || which === 38)) {
                        currentDate.setUTCFullYear(currentDate.getUTCFullYear() + (delta > 0 ? 1 : -1));
                    } else if (shiftKey && (which === 37 || which === 39)) {
                        currentDate.setUTCMonth(currentDate.getUTCMonth() + (delta > 0 ? 1 : -1));
                    } else {
                        currentDate.setUTCDate(currentDate.getUTCDate() + delta);
                    }

                    var range = readDateRange(this);

                    if (!(currentDate < range[0] || currentDate > range[1])) {
                        this.set(formatISODate(currentDate));
                    }
                }
            }
            // prevent default action except if it was TAB so
            // do not allow to change the value manually
            return which === VK_TAB;
        },
        onCalendarBlur: function(calendar) {
            calendar.hide();
        },
        onCalendarFocus: function(calendar) {
            var node = this[0];
            // use the trick below to reset text selection on focus
            setTimeout(function()  {
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

            // update calendar weekday captions
            calendar.findAll("th").forEach(function(el, index)  {
                el.l10n(DAYS[ampm(index, ++index % 7)]);
            });

            calendar.show();
        },
        onFormReset: function() {
            this.set(this.get("defaultValue"));
        }
    });
}(window.DOM, "btr-dateinput", 32, 9, 13, 27, 8, 46));

DOM.importStyles(".btr-dateinput-value", "position:absolute;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-style:none solid;border-color:transparent");
DOM.importStyles(".btr-dateinput-calendar", "position:absolute;visibility:hidden;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#FFF;border-bottom:1px solid #CCC;overflow:hidden;border-radius:3px;-webkit-box-shadow:0 .25em .5em rgba(0,0,0,.2);box-shadow:0 .25em .5em rgba(0,0,0,.2);font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:center;opacity:1;-webkit-transform:scale(1,1);-ms-transform:scale(1,1);transform:scale(1,1);-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transition:.1s ease-out;transition:.1s ease-out;width:15em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale");
DOM.importStyles(".btr-dateinput-calendar[aria-hidden=true]", "opacity:0;-webkit-transform:scale(.75,.75);-ms-transform:scale(.75,.75);transform:scale(.75,.75)");
DOM.importStyles(".btr-dateinput-calendar-header", "position:relative;margin:0;line-height:2.5em;font-weight:700;white-space:nowrap;background:#2da4d6;text-shadow:0 1px 0 #555;border-bottom:1px solid #207fb1");
DOM.importStyles(".btr-dateinput-calendar-header>a", "width:2.5em;height:2.5em;position:absolute;left:0;top:0");
DOM.importStyles(".btr-dateinput-calendar-header>a:before", "content:'\\25C4'");
DOM.importStyles(".btr-dateinput-calendar-header>a::before", "font-size:.85em");
DOM.importStyles(".btr-dateinput-calendar-header>a+a", "left:auto;right:0");
DOM.importStyles(".btr-dateinput-calendar-header>a+a:before", "content:'\\25BA'");
DOM.importStyles(".btr-dateinput-calendar-days", "table-layout:fixed;border-spacing:0;border-collapse:collapse;color:#555;background:#FFF;border-radius:3px;border:1px solid #CCC;border-bottom:0");
DOM.importStyles(".btr-dateinput-calendar-days>thead", "border-top:1px solid #EEE;border-bottom:1px solid #CCC;font-size:.75em;background:#DDD;font-weight:700;text-shadow:0 1px 0 #f3f3f3");
DOM.importStyles(".btr-dateinput-calendar-body", "-webkit-transform:translate(0);-ms-transform:translate(0);transform:translate(0);-webkit-transition:-webkit-transform .1s linear;transition:transform .1s linear");
DOM.importStyles(".btr-dateinput-calendar-body[aria-hidden=true]", "-webkit-transform:translate(-100%);-ms-transform:translate(-100%);transform:translate(-100%)");
DOM.importStyles(".btr-dateinput-calendar-body+.btr-dateinput-calendar-body", "position:absolute;bottom:0");
DOM.importStyles(".btr-dateinput-calendar-body+.btr-dateinput-calendar-body[aria-hidden=true]", "-webkit-transform:translate(100%);-ms-transform:translate(100%);transform:translate(100%)");
DOM.importStyles(".btr-dateinput-calendar-days td,.btr-dateinput-calendar-days th", "width:2em;height:2em;line-height:2");
DOM.importStyles(".btr-dateinput-calendar-past,.btr-dateinput-calendar-future", "color:#DDD");
DOM.importStyles(".btr-dateinput-calendar-out", "color:#CCC;text-shadow:0 1px 0 #FFF");
DOM.importStyles(".btr-dateinput-calendar-today", "color:#FFF;background-color:#2da4d6;text-shadow:0 1px 0 #555;font-weight:700");
DOM.importStyles(".btr-dateinput-calendar-out,.btr-dateinput-calendar-days td:hover", "background-color:#f3f3f3;background-color:rgba(0,0,0,.05)");
DOM.importStyles(".btr-dateinput-calendar-header>a:hover,td.btr-dateinput-calendar-today:hover", "background-color:#207fb1");
DOM.importStyles(".btr-dateinput-value+input::-moz-placeholder", "color:initial");
