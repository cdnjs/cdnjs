/**
 * @file src/better-dateinput-polyfill.js
 * @version 1.4.1 2014-08-29T19:17:56
 * @overview input[type=date] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2014
 * @license MIT
 * @see https://github.com/chemerisuk/better-dateinput-polyfill
 */
(function(DOM, COMPONENT_CLASS, I18N_DAYS, I18N_MONTHS) {
    "use strict";

    var htmlEl = DOM.find("html"),
        ampm = function(pos, neg) { return htmlEl.get("lang") === "en-US" ? pos : neg },
        formatISODate = function(value) { return value.toISOString().split("T")[0] };

    // need to skip mobile/tablet browsers
    DOM.extend("input[type=date]", !("orientation" in window), {
        constructor: function() {
            var calendar = DOM.create("div.{0}>a[unselectable=on]*2+span[aria-hidden=true].{0}-header+table[aria-hidden=true].{0}-days>thead>tr>th[unselectable=on]*7+tbody>tr*6>td*7", [COMPONENT_CLASS + "-calendar"]),
                displayedValue = DOM.create("span[aria-hidden=true].{0}-value", [COMPONENT_CLASS]),
                color = this.style("color"),
                offset = this.offset(),
                calOffset;

            this
                // remove legacy dateinput implementation if it exists
                // also set value to current time to trigger watchers later
                .set({type: "text", value: Date.now()})
                // hide original input text
                // IE8 doesn't suport color:transparent - use background-color instead
                .style("color", document.addEventListener ? "transparent" : this.style("background-color"))
                // handle arrow keys, esc etc.
                .on("keydown", this.onCalendarKeyDown.bind(this, calendar), ["which", "shiftKey"])
                // sync picker visibility on focus/blur
                .on(["focus", "click"], this.onCalendarFocus.bind(this, calendar))
                .on("blur", this.onCalendarBlur.bind(this, calendar))
                .before(calendar, displayedValue);

            calOffset = calendar.offset();

            calendar
                .on("mousedown", this.onCalendarClick.bind(this, calendar))
                .style({
                    "margin-left": offset.left - calOffset.left + (offset.width - calOffset.width) / 2,
                    "margin-top": offset.bottom - calOffset.top,
                    "z-index": 1 + (this.style("z-index") | 0)
                })
                .hide(); // hide calendar to trigger show animation properly later

            // move calendar to the top when passing cross browser window bounds
            if (DOM.find("html").get("clientHeight") < offset.bottom + calOffset.height) {
                calendar.style("margin-top", calOffset.top - offset.bottom - calOffset.height);
            }

            displayedValue
                .on("click", this.onCalendarFocus.bind(this, calendar))
                // copy input CSS
                .style(this.style(["width", "font", "padding-left", "padding-right", "text-align", "border-width", "box-sizing"]))
                .style({
                    "color": color,
                    "line-height": offset.height + "px",
                    "margin-left": offset.left - calOffset.left,
                    "margin-top": offset.top - calOffset.top,
                });

            this.parent("form").on("reset", this.onFormReset.bind(this));
            this.watch("value", this.onValueChanged.bind(this, displayedValue,
                calendar.find("." + COMPONENT_CLASS + "-calendar-header"), calendar.findAll("th"), calendar.findAll("td")));
            // trigger watchers to build the calendar
            this.set(this.get("defaultValue"));
            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        onValueChanged: function(displayedValue, caption, weekdays, days, value) {
            var year, month, date, iterDate;

            displayedValue.set("");
            value = new Date(value);

            // display formatted date value for original input
            if (value.getTime()) {
                displayedValue
                    // build RFC 1123 string based on the lang attribute
                    .append(DOM.create("span").i18n(I18N_DAYS[value.getUTCDay() ? value.getUTCDay() - 1 : 6]))
                    .append(",&nbsp;" + ((value.getUTCDate() > 9 ? "" : "0") + value.getUTCDate()) + "&nbsp;")
                    .append(DOM.create("span").i18n(I18N_MONTHS[value.getUTCMonth()].substr(0, 3)))
                    .append("&nbsp;" + value.getUTCFullYear());
            } else {
                value = new Date();
            }

            month = value.getUTCMonth();
            date = value.getUTCDate();
            year = value.getUTCFullYear();

            // update calendar caption
            caption
                .set("&nbsp;" + year)
                .prepend(DOM.create("span").i18n(I18N_MONTHS[month]));
            // update calendar weekday captions
            weekdays.each(function(el, index) {
                el.i18n(I18N_DAYS[ampm(index ? index - 1 : 6, index)]);
            });
            // update calendar content
            iterDate = new Date(Date.UTC(year, month, 0));
            // move to beginning of current month week
            iterDate.setUTCDate(iterDate.getUTCDate() - iterDate.getUTCDay() - ampm(1, 0));
            // update day numbers
            days.set("class", function(day) {
                iterDate.setUTCDate(iterDate.getUTCDate() + 1);

                var mDiff = month - iterDate.getUTCMonth(),
                    dDiff = date - iterDate.getUTCDate();

                if (year !== iterDate.getUTCFullYear()) mDiff *= -1;

                day.set("-ts", iterDate.getTime()).set(iterDate.getUTCDate());

                return mDiff ?
                    (mDiff > 0 ? COMPONENT_CLASS + "-calendar-past" : COMPONENT_CLASS + "-calendar-future") :
                    (dDiff ? "" :  COMPONENT_CLASS + "-calendar-today");
            });
            // trigger event manually to notify about changes
            this.fire("change");
        },
        onCalendarClick: function(calendar, target) {
            var targetDate;

            if (target == "a") {
                targetDate = new Date(this.get());

                if (!targetDate.getTime()) targetDate = new Date();

                targetDate.setUTCMonth(targetDate.getUTCMonth() + (target.next("a").length ? -1 : 1));
            } else if (target == "td") {
                targetDate = new Date(target.get("-ts"));
                calendar.hide();
            }

            if (targetDate != null) this.set(formatISODate(targetDate));
            // prevent input from loosing focus
            return false;
        },
        onCalendarKeyDown: function(calendar, which, shiftKey) {
            var delta, currentDate;

            // ENTER key should submit form if calendar is hidden
            if (calendar.matches(":hidden") && which === 13) return true;

            if (which === 32) {
                calendar.toggle(); // SPACE key toggles calendar visibility
            } else if (which === 27 || which === 9 || which === 13) {
                calendar.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === 8 || which === 46) {
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

                    this.set(formatISODate(currentDate));
                }
            }
            // prevent default action except if it was TAB so
            // do not allow to change the value manually
            return which === 9;
        },
        onCalendarBlur: function(calendar) {
            calendar.hide();
        },
        onCalendarFocus: function(calendar) {
            this.legacy(function(node) {
                // use the trick below to reset text selection on focus
                setTimeout(function() {
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
            });

            calendar.show();
        },
        onFormReset: function() {
            // TODO: will be removed in future implementation of the
            // watch method, for now need to trigger watchers manually
            this.set(this.get("defaultValue"));
        }
    });
}(window.DOM, "better-dateinput", [
    "Mo","Tu","We","Th","Fr","Sa","Su"
], [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]));
