/**
 * @file src/better-dateinput-polyfill.js
 * @version 1.3.1 2013-12-27T08:01:17
 * @overview input[type=date] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-dateinput-polyfill
 */
(function(DOM, COMPONENT_CLASS, I18N_DAYS, I18N_MONTHS) {
    "use strict";

    if ("orientation" in window) return; // skip mobile/tablet browsers

    var htmlEl = DOM.find("html"),
        ampm = function(pos, neg) { return htmlEl.get("lang") === "en-US" ? pos : neg },
        formatISODate = function(value) { return value.toISOString().split("T")[0] };

    DOM.extend("input[type=date]", {
        constructor: function() {
            var calendar = DOM.create("div.${c}>a[unselectable=on]*2+p.${c}-header+table.${c}-days>thead>tr>th[unselectable=on]*7+tbody>tr*6>td*7", {c: COMPONENT_CLASS + "-calendar"}),
                dateinput = DOM.create("input[type=hidden name=${name}]", {name: this.get("name")});

            this
                // remove legacy dateinput if it exists
                .set({type: "text", name: null})
                .addClass(COMPONENT_CLASS)
                // handle arrow keys, esc etc.
                .on("keydown", this.onCalendarKeyDown.bind(this, calendar, dateinput), ["which", "shiftKey"])
                // sync picker visibility on focus/blur
                .on(["focus", "click"], this.onCalendarFocus.bind(this, calendar))
                .on("blur", this.onCalendarBlur.bind(this, calendar))
                .after(calendar.hide(), dateinput);

            calendar.on("mousedown", this.onCalendarClick.bind(this, calendar, dateinput));
            this.parent("form").on("reset", this.onFormReset.bind(this, dateinput));
            // patch set method to update visible input as well
            dateinput.set = this.onValueChanged.bind(this, dateinput, dateinput.set,
                calendar.find("p"), calendar.findAll("th"), calendar.findAll("td"));
            // update hidden input value and refresh all visible controls
            dateinput.set(this.get()).data("defaultValue", dateinput.get());
            // update defaultValue with formatted date
            this.set("defaultValue", this.get());
            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        onValueChanged: function(dateinput, setter, caption, weekdays, days) {
            var year, month, date, iterDate;

            setter.apply(dateinput, Array.prototype.slice.call(arguments, 5));

            if (arguments.length === 6) {
                this.set(function() {
                    var value = new Date(dateinput.get()),
                        result;

                    if (!value.getTime()) {
                        value = new Date();
                        result = "";
                    }

                    month = value.getMonth();
                    date = value.getDate();
                    year = value.getFullYear();

                    if (typeof result !== "string") {
                        result = ampm(month + 1, date) + "/" + ampm(date, month + 1) + "/" + year;
                    }

                    return result;
                });

                // update caption
                caption.i18n(I18N_MONTHS[month], {year: year});
                // update weekday captions
                weekdays.each(function(el, index) {
                    el.i18n(I18N_DAYS[ampm(index ? index - 1 : 6, index)]);
                });

                iterDate = new Date(year, month, 0, 12);
                // move to beginning of current month week
                iterDate.setDate(iterDate.getDate() - iterDate.getDay() - ampm(1, 0));
                // update day numbers
                days.set("class", function(day) {
                    iterDate.setDate(iterDate.getDate() + 1);

                    var mDiff = month - iterDate.getMonth(),
                        dDiff = date - iterDate.getDate();

                    if (year !== iterDate.getFullYear()) mDiff *= -1;

                    day.data("ts", iterDate.getTime()).set(iterDate.getDate());

                    return mDiff ?
                        (mDiff > 0 ? "prev-calendar-day" : "next-calendar-day") :
                        (dDiff ? "calendar-day" : "current-calendar-day");
                });
            }

            return dateinput;
        },
        onCalendarClick: function(calendar, dateinput, target) {
            var targetDate;

            if (target.matches("a")) {
                targetDate = new Date(dateinput.get());
                targetDate.setMonth(targetDate.getMonth() + (target.next("a").length ? -1 : 1));
            } else if (target.matches("td")) {
                targetDate = new Date(target.data("ts"));
                calendar.hide();
            }

            if (targetDate != null) dateinput.set(formatISODate(targetDate));
            // prevent input from loosing focus
            return false;
        },
        onCalendarKeyDown: function(calendar, dateinput, which, shiftKey) {
            var delta, currentDate;

            // ENTER key should submit form if calendar is hidden
            if (calendar.matches(":hidden") && which === 13) return true;

            if (which === 32) {
                calendar.toggle(); // SPACE key toggles calendar visibility
            } else if (which === 27 || which === 9 || which === 13) {
                calendar.hide(); // ESC, TAB or ENTER keys hide calendar
            } else if (which === 8 || which === 46) {
                dateinput.set(""); // BACKSPACE, DELETE clear value
            } else {
                currentDate = new Date(dateinput.get());

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
        onCalendarBlur: function(calendar) {
            calendar.hide();
        },
        onCalendarFocus: function(calendar) {
            calendar.show();
        },
        onFormReset: function(dateinput) {
            dateinput.set(function(el) { return el.data("defaultValue") });
        }
    });
}(window.DOM, "better-dateinput", [
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
