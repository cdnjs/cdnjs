/**
 * @file better-dateinput-polyfill.js
 * @version 1.2.2 2013-11-06T12:20:46
 * @overview input[type=date] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-dateinput-polyfill
 */
(function(DOM) {
    "use strict";

    var AMPM = DOM.find("html").get("lang") === "en-US",
        COMPONENT_CLASS = "better-dateinput",
        CALENDAR_CLASS = COMPONENT_CLASS + "-calendar",
        INPUT_KEY = "date-input",
        CALENDAR_KEY = "date-picker",
        DATEPICKER_TEMPLATE = DOM.template("div.$c>p.$c-header+button+button+table.$c-days>thead>tr>th[data-i18n=calendar.weekday.$]*7+tbody>tr*6>td*7", {c: CALENDAR_CLASS}),
        zeropad = function(value) { return ("00" + value).slice(-2) };

    DOM.extend("input[type=date]", "orientation" in window ? function() { this.addClass(COMPONENT_CLASS) } : {
        // polyfill timeinput for desktop browsers
        constructor: function() {
            var calendar = DOM.create(DATEPICKER_TEMPLATE).hide(),
                dateinput = DOM.create("input[type=hidden]", {name: this.get("name")});

            if (AMPM) calendar.find("th").before(calendar.findAll("th")[6]);

            this
                // remove legacy dateinput if it exists
                .set({type: "text", name: null})
                .addClass("better-dateinput")
                // sync value on click
                .on("focus", "handleCalendarFocus")
                // handle arrow keys, esc etc.
                .on("keydown", ["which", "shiftKey"], "handleCalendarKeyDown");

            calendar
                .on("click button", this, "handleCalendarNavClick")
                .on("click td", this, "handleCalendarDayClick");

            // hide calendar when a user clicks somewhere outside
            DOM.on("click", this, "handleDocumentClick");

            this
                .data(CALENDAR_KEY, calendar)
                .data(INPUT_KEY, dateinput)
                .after(calendar, dateinput);

            // display calendar for autofocused elements
            if (this.matches(":focus")) this.fire("focus");
        },
        getCalendarDate: function() {
            var isoParts = (this.data(INPUT_KEY).get() || "").split("-");

            return new Date(parseFloat(isoParts[0]), parseFloat(isoParts[1]) - 1, parseFloat(isoParts[2]));
        },
        setCalendarDate: function(value) {
            // FIXME: remove DOM.mock() in future
            var calendarCaption = this.data(CALENDAR_KEY).find("p") || DOM.mock(),
                calendarDays = this.data(CALENDAR_KEY).findAll("td") || DOM.mock(),
                now = new Date(),
                year = (value || now).getFullYear(),
                month = (value || now).getMonth(),
                date = (value || now).getDate(),
                iterDate = new Date(year, month, 0);
            // update caption
            calendarCaption.i18n("calendar.month." + month, {year: year});
            // move to begin of the start week
            iterDate.setDate(iterDate.getDate() - iterDate.getDay() - (AMPM ? 1 : 0));

            calendarDays.each(function(day) {
                iterDate.setDate(iterDate.getDate() + 1);

                var mDiff = month - iterDate.getMonth(),
                    dDiff = date - iterDate.getDate();

                if (year !== iterDate.getFullYear()) {
                    mDiff *= -1;
                }

                day.set("class", mDiff ?
                    (mDiff > 0 ? "prev-calendar-day" : "next-calendar-day") :
                    (dDiff ? "calendar-day" : "current-calendar-day")
                );

                day.set(iterDate.getDate().toString()).data("ts", iterDate.getTime());
            });

            // update current date
            this.data(INPUT_KEY).set(year + "-" + zeropad(month + 1) + "-" + zeropad(date));

            if (value) this.set((AMPM ? month + 1 : date) + "/" + (AMPM ? date : month + 1) + "/" + year);

            return this;
        },
        handleCalendarDayClick: function(target) {
            this.setCalendarDate(new Date(target.data("ts")));
            // prevent focusing after click if the input is inside of a label
            return false;
        },
        handleCalendarNavClick: function(target) {
            var isNext = !target.next("button").length,
                calendarDate = this.getCalendarDate(),
                targetDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + (isNext ? 1 : -1), 1);

            this.setCalendarDate(targetDate);
            this.fire("focus");

            return false;
        },
        handleCalendarKeyDown: function(which, shiftKey) {
            var calendar = this.data(CALENDAR_KEY),
                currentDate = this.getCalendarDate(),
                delta = 0;

            if (which === 13) {
                calendar.hide(); // hide picker to submit form
            } else if (which === 32) {
                calendar.toggle(); // show/hide calendar on enter key
            } else if (which === 27 || which === 9) {
                calendar.hide(); // esc or tab key hides calendar
            } else if (which === 8 || which === 46) {
                this.set("").handleCalendarFocus(); // backspace or delete clears the value
            } else {
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

                    this.setCalendarDate(currentDate);
                }
            }

            // prevent default action except if it was TAB or ENTER
            // so do not allow to change the value via manual input
            return which === 9 || which === 13;
        },
        handleDocumentClick: function() {
            var calendar = this.data(CALENDAR_KEY);

            if (!this.matches(":focus")) calendar.hide();
        },
        handleCalendarFocus: function() {
            var calendar = this.data(CALENDAR_KEY),
                parts = this.get().split("/"),
                value, year, month, date;

            if (parts.length === 3) {
                date = parseFloat(parts[AMPM ? 1 : 0]);
                month = parseFloat(parts[AMPM ? 0 : 1]) - 1;
                year = parseFloat(parts[2]);

                value = new Date(year, month, date);
            }
            // switch calendar to the input value date
            this.setCalendarDate(value);

            calendar.show();
        }
    });
}(window.DOM));
