/**
 * @file src/better-dateinput-polyfill.js
 * @version 1.3.0 2013-12-08T03:33:01
 * @overview input[type=date] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-dateinput-polyfill
 */
(function(DOM, CALENDAR_KEY, INPUT_KEY, COMPONENT_CLASS, I18N_DAYS, I18N_MONTHS) {
    "use strict";

    if ("orientation" in window) return; // skip mobile/tablet browsers

    var htmlEl = DOM.find("html"),
        zeropad = function(value) { return ("00" + value).slice(-2) },
        ampm = function(pos, neg) { return htmlEl.get("lang") === "en-US" ? pos : neg },
        dateparts = function(str) {
            str = (str || "").split("-");

            if (str.length === 3) {
                str[0] = parseFloat(str[0]);
                str[1] = parseFloat(str[1]) - 1;
                str[2] = parseFloat(str[2]);
            } else {
                str = [];
            }

            return str;
        },
        formatISODate = function(value) {
            return value.getFullYear() + "-" + zeropad(value.getMonth() + 1) + "-" + zeropad(value.getDate());
        };

    DOM.extend("input[type=date]", {
        constructor: function() {
            var calendar = DOM.create("div.${c}>a[unselectable=on]*2+p.${c}-header+table.${c}-days>thead>tr>th[unselectable=on]*7+tbody>tr*6>td*7", {c: COMPONENT_CLASS + "-calendar"}),
                dateinput = DOM.create("input[type=hidden name=${n}]", {n: this.get("name")});

            this
                // remove legacy dateinput if it exists
                .set({type: "text", name: null})
                .addClass(COMPONENT_CLASS)
                // handle arrow keys, esc etc.
                .on("keydown", this.onCalendarKeyDown, ["which", "shiftKey"])
                // sync picker visibility on focus/blur
                .on("focus", this.onCalendarFocus)
                .on("click", this.onCalendarFocus)
                .on("blur", this.onCalendarBlur)
                .data(CALENDAR_KEY, calendar)
                .data(INPUT_KEY, dateinput)
                .after(calendar.hide(), dateinput);

            calendar.on("mousedown", this, this.onCalendarClick);
            this.parent("form").on("reset", this, this.onFormReset);
            // patch set method to update visible input as well
            dateinput.set = this.onValueChanged.bind(this, dateinput.set);
            // update hidden input value and refresh all visible controls
            dateinput.set(this.get()).data("defaultValue", dateinput.get());
            // update defaultValue with formatted date
            this.set("defaultValue", this.get());
            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        onValueChanged: function(setter) {
            var dateinput = this.data(INPUT_KEY),
                calendar = this.data(CALENDAR_KEY),
                parts, year, month, date, now, iterDate;

            setter.apply(dateinput, Array.prototype.slice.call(arguments, 1));

            if (arguments.length === 2) {
                parts = dateparts(dateinput.get());
                year = parts[0];
                month = parts[1];
                date = parts[2];
                now = new Date();

                this.set(parts.length < 3 ? "" : ampm(month + 1, date) + "/" + ampm(date, month + 1) + "/" + year);

                if (parts.length < 3) {
                    year = now.getFullYear();
                    month = now.getMonth();
                }
                // update caption
                calendar.find("p").i18n(I18N_MONTHS[month], {year: year});
                // update weekday captions
                calendar.findAll("th").each(function(el, index) {
                    el.i18n(I18N_DAYS[ampm(index ? index - 1 : 6, index)]);
                });

                iterDate = new Date(year, month, 0);
                // move to beginning of current month week
                iterDate.setDate(iterDate.getDate() - iterDate.getDay() - ampm(1, 0));
                // update day numbers
                calendar.findAll("td").each(function(day) {
                    iterDate.setDate(iterDate.getDate() + 1);

                    var mDiff = month - iterDate.getMonth(),
                        dDiff = date - iterDate.getDate();

                    if (year !== iterDate.getFullYear()) mDiff *= -1;

                    day.set("class", mDiff ?
                        (mDiff > 0 ? "prev-calendar-day" : "next-calendar-day") :
                        (dDiff ? "calendar-day" : "current-calendar-day")
                    );

                    day.set(iterDate.getDate()).data("ts", +iterDate);
                });
            }

            return dateinput;
        },
        onCalendarClick: function(target) {
            var calendar = this.data(CALENDAR_KEY),
                dateinput = this.data(INPUT_KEY),
                parts, targetDate;

            if (target.matches("a")) {
                parts = dateparts(dateinput.get());
                targetDate = new Date(parts[0], parts[1] + (target.next("a").length ? -1 : 1), 1);
            } else if (target.matches("td")) {
                targetDate = new Date(target.data("ts"));
                calendar.hide();
            }

            if (targetDate != null) dateinput.set(formatISODate(targetDate));
            // prevent input from loosing focus
            return false;
        },
        onCalendarKeyDown: function(which, shiftKey) {
            var calendar = this.data(CALENDAR_KEY),
                dateinput = this.data(INPUT_KEY),
                parts, delta, currentDate;

            // ENTER key should submit form if calendar is hidden
            if (calendar.matches(":hidden") && which === 13) return true;

            if (which === 32) {
                calendar.toggle(); // SPACE key toggles calendar visibility
            } else if (which === 27 || which === 9 || which === 13) {
                calendar.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === 8 || which === 46) {
                dateinput.set(""); // BACKSPACE, DELETE clear value
            } else {
                parts = dateparts(dateinput.get());
                currentDate = new Date(parts[0], parts[1], parts[2]);

                if (which === 74 || which === 40) { delta = 7; }
                else if (which === 75 || which === 38) { delta = -7; }
                else if (which === 76 || which === 39) { delta = 1; }
                else if (which === 72 || which === 37) { delta = -1; }

                if (delta) {
                    if (shiftKey && (which === 40 || which === 38)) {
                        currentDate.setFullYear(currentDate.getFullYear() + (delta > 0 ? 1 : -1));
                    } else if (shiftKey && (which === 37 || which === 39)) {
                        currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
                    } else {
                        currentDate.setDate(currentDate.getDate() + delta);
                    }

                    dateinput.set(formatISODate(currentDate));
                }
            }
            // prevent default action except if it was TAB so
            // do not allow to change the value manually
            return which === 9;
        },
        onCalendarBlur: function() {
            this.data(CALENDAR_KEY).hide();
        },
        onCalendarFocus: function() {
            this.data(CALENDAR_KEY).show();
        },
        onFormReset: function() {
            this.data(INPUT_KEY).set(function(el) { return el.data("defaultValue") });
        }
    });
}(window.DOM, "date-picker", "date-input", "better-dateinput", [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su"
], [
    "January ${year}",
    "February ${year}",
    "March ${year}",
    "April ${year}",
    "May ${year}",
    "June ${year}",
    "July ${year}",
    "August ${year}",
    "September ${year}",
    "October ${year}",
    "November ${year}",
    "December ${year}"
]));
