/**
 * @file better-dateinput-polyfill.js
 * @version 1.1.0 2013-07-21T12:03:38
 * @overview input[type=date] polyfill for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-dateinput-polyfill
 */
(function(DOM) {
    "use strict";

    if ("orientation" in window) return; // skip mobile and tablet browsers

    DOM.extend("input[type=date]", [
        "div[hidden].%CLS%>p.%CLS%-header+a.%CLS%-prev+a.%CLS%-next+table.%CLS%-days>thead>tr>th[data-i18n=calendar.weekday.$]*7+tbody>tr*6>td*7".replace(/%CLS%/g, "better-dateinput-calendar")
    ], {
        constructor: function(calendar) {
            this
                // remove legacy dateinput if it exists
                .set({type: "text", autocomplete: "off"})
                .addClass("better-dateinput")
                // sync value on click
                .on("focus", this, "_syncInputWithCalendar", [calendar])
                // handle arrow keys, esc etc.
                .on("keydown(keyCode,shiftKey)", this, "_handleCalendarKeyDown", [calendar]);

            calendar.findAll("a").on("click(target)", this, "_handleCalendarNavClick", [calendar]);
            calendar.on("click(target) td", this, "_handleCalendarDayClick", [calendar]);
                    
            // hide calendar when a user clicks somewhere outside
            DOM.on("click", this, "_handleDocumentClick", [calendar]);

            // cache access to some elements
            this.bind("setCalendarDate",
                calendar.find(".better-dateinput-calendar-header"),
                calendar.findAll("td")
            );

            this.after(calendar);

            // display calendar for autofocused elements
            if (this.isFocused()) this.fire("focus");
        },
        getCalendarDate: function() {
            return this.getData("calendarDate");
        },
        setCalendarDate: function(/*INTERNAL*/calendarCaption, /*INTERNAL*/calendarDays, value) {
            var iterDate = new Date(value.getFullYear(), value.getMonth(), 0);
            // update caption
            calendarCaption.set("<span data-i18n='calendar.month." + value.getMonth() + "'> " + (isNaN(value.getFullYear()) ? "" : value.getFullYear()));
            
            if (!isNaN(iterDate.getTime())) {
                // move to begin of the start week
                iterDate.setDate(iterDate.getDate() - iterDate.getDay());
                
                calendarDays.each(function(day) {
                    iterDate.setDate(iterDate.getDate() + 1);
                    
                    var mDiff = value.getMonth() - iterDate.getMonth(),
                        dDiff = value.getDate() - iterDate.getDate();

                    if (value.getFullYear() !== iterDate.getFullYear()) {
                        mDiff *= -1;
                    }

                    day.set("className", mDiff ?
                        (mDiff > 0 ? "prev-calendar-day" : "next-calendar-day") :
                        (dDiff ? "calendar-day" : "current-calendar-day")
                    );

                    day.set(iterDate.getDate().toString());
                });

                // update current date
                this.setData("calendarDate", value);
            }

            return this;
        },
        _handleCalendarDayClick: function(target, calendar) {
            var calendarDate = this.getCalendarDate(),
                currentYear = calendarDate.getFullYear(),
                currentMonth = calendarDate.getMonth(),
                targetDate = new Date(currentYear, currentMonth,
                    target.parent().get("rowIndex") * 7 + target.get("cellIndex") - 5 - new Date(currentYear, currentMonth, 1).getDay()
                );

            this.setCalendarDate(targetDate);
            this._syncCalendarWithInput(calendar);

            // prevent focusing after click if the input is inside of a label
            return false;
        },
        _handleCalendarNavClick: function(target, calendar) {
            var isNext = target.hasClass("better-dateinput-calendar-next"),
                calendarDate = this.getCalendarDate(),
                targetDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + (isNext ? 1 : -1), 1);

            this.setCalendarDate(targetDate)._syncCalendarWithInput(calendar, true);
            this.fire("focus");

            return false;
        },
        _handleCalendarKeyDown: function(keyCode, shiftKey, calendar) {
            var currentDate = this.getCalendarDate(),
                delta = 0;

            if (keyCode === 13) {
                calendar.toggle(); // show/hide calendar on enter key
            } else if (keyCode === 27 || keyCode === 9) {
                calendar.hide(); // esc or tab key hides calendar
            } else if (keyCode === 8 || keyCode === 46) {
                this.set("")._syncInputWithCalendar(calendar, true); // backspace or delete clears the value
            } else {
                if (keyCode === 74 || keyCode === 40) { delta = 7; }
                else if (keyCode === 75 || keyCode === 38) { delta = -7; }
                else if (keyCode === 76 || keyCode === 39) { delta = 1; }
                else if (keyCode === 72 || keyCode === 37) { delta = -1; }

                if (delta) {
                    if (shiftKey && (keyCode === 40 || keyCode === 38)) {
                        currentDate.setFullYear(currentDate.getFullYear() + (delta > 0 ? 1 : -1));
                    } else if (shiftKey && (keyCode === 37 || keyCode === 39)) {
                        currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
                    } else {
                        currentDate.setDate(currentDate.getDate() + delta);
                    }

                    this.setCalendarDate(currentDate)._syncCalendarWithInput(calendar, true);
                }
            }

            // prevent default action except if it was a TAB key
            // so do not allow to change the value via manual input
            return keyCode === 9;
        },
        _syncInputWithCalendar: function(calendar, skipCalendar) {
            var value = (this.get("value") || "").split("-");
            // switch calendar to the input value date
            this.setCalendarDate(value.length > 1 ? new Date( parseInt(value[0],10), parseInt(value[1],10) - 1, parseInt(value[2],10)) : new Date());

            if (!skipCalendar) calendar.show();
        },
        _syncCalendarWithInput: function(calendar, skipCalendar) {
            var date = this.getCalendarDate(),
                zeroPadMonth = ("00" + (date.getMonth() + 1)).slice(-2),
                zeroPadDate = ("00" + date.getDate()).slice(-2);

            this.set(date.getFullYear() + "-" + zeroPadMonth + "-" + zeroPadDate);

            if (!skipCalendar) calendar.hide();
        },
        _handleDocumentClick: function(calendar) {
            if (!this.isFocused()) calendar.hide();
        }
    });
}(window.DOM));
