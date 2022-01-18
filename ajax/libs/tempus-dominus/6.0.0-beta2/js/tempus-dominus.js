/*!
  * Tempus Dominus v6.0.0-beta2 (https://getdatepicker.com/)
  * Copyright 2013-2022 [object Object]
  * Licensed under MIT (https://github.com/Eonasdan/tempus-dominus/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@popperjs/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@popperjs/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tempusDominus = {}, global.Popper));
})(this, (function (exports, core) { 'use strict';

    exports.Unit = void 0;
    (function (Unit) {
        Unit["seconds"] = "seconds";
        Unit["minutes"] = "minutes";
        Unit["hours"] = "hours";
        Unit["date"] = "date";
        Unit["month"] = "month";
        Unit["year"] = "year";
    })(exports.Unit || (exports.Unit = {}));
    /**
     * For the most part this object behaves exactly the same way
     * as the native Date object with a little extra spice.
     */
    class DateTime extends Date {
        constructor() {
            super(...arguments);
            /**
             * Used with Intl.DateTimeFormat
             */
            this.locale = 'default';
            this.nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            this.leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        }
        /**
         * Chainable way to set the {@link locale}
         * @param value
         */
        setLocale(value) {
            this.locale = value;
            return this;
        }
        /**
         * Converts a plain JS date object to a DateTime object.
         * Doing this allows access to format, etc.
         * @param  date
         */
        static convert(date, locale = 'default') {
            if (!date)
                throw `A date is required`;
            return new DateTime(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()).setLocale(locale);
        }
        /**
         * Native date manipulations are not pure functions. This function creates a duplicate of the DateTime object.
         */
        get clone() {
            return new DateTime(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.getMilliseconds()).setLocale(this.locale);
        }
        /**
         * Sets the current date to the start of the {@link unit} provided
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).startOf('month')
         * would return April 1, 2021, 12:00:00.000 AM (midnight)
         * @param unit
         * @param startOfTheWeek Allows for the changing the start of the week.
         */
        startOf(unit, startOfTheWeek = 0) {
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            switch (unit) {
                case 'seconds':
                    this.setMilliseconds(0);
                    break;
                case 'minutes':
                    this.setSeconds(0, 0);
                    break;
                case 'hours':
                    this.setMinutes(0, 0, 0);
                    break;
                case 'date':
                    this.setHours(0, 0, 0, 0);
                    break;
                case 'weekDay':
                    this.startOf(exports.Unit.date);
                    this.manipulate(startOfTheWeek - this.weekDay, exports.Unit.date);
                    break;
                case 'month':
                    this.startOf(exports.Unit.date);
                    this.setDate(1);
                    break;
                case 'year':
                    this.startOf(exports.Unit.date);
                    this.setMonth(0, 1);
                    break;
            }
            return this;
        }
        /**
         * Sets the current date to the end of the {@link unit} provided
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).endOf('month')
         * would return April 30, 2021, 11:59:59.999 PM
         * @param unit
         */
        endOf(unit) {
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            switch (unit) {
                case 'seconds':
                    this.setMilliseconds(999);
                    break;
                case 'minutes':
                    this.setSeconds(59, 999);
                    break;
                case 'hours':
                    this.setMinutes(59, 59, 999);
                    break;
                case 'date':
                    this.setHours(23, 59, 59, 999);
                    break;
                case 'weekDay':
                    this.startOf(exports.Unit.date);
                    this.manipulate(6 - this.weekDay, exports.Unit.date);
                    break;
                case 'month':
                    this.endOf(exports.Unit.date);
                    this.manipulate(1, exports.Unit.month);
                    this.setDate(0);
                    break;
                case 'year':
                    this.endOf(exports.Unit.date);
                    this.manipulate(1, exports.Unit.year);
                    this.setDate(0);
                    break;
            }
            return this;
        }
        /**
         * Change a {@link unit} value. Value can be positive or negative
         * Example: Consider a date of "April 30, 2021, 11:45:32.984 AM" => new DateTime(2021, 3, 30, 11, 45, 32, 984).manipulate(1, 'month')
         * would return May 30, 2021, 11:45:32.984 AM
         * @param value A positive or negative number
         * @param unit
         */
        manipulate(value, unit) {
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            this[unit] += value;
            return this;
        }
        /**
         * Returns a string format.
         * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
         * for valid templates and locale objects
         * @param template An object. Uses browser defaults otherwise.
         * @param locale Can be a string or an array of strings. Uses browser defaults otherwise.
         */
        format(template, locale = this.locale) {
            return new Intl.DateTimeFormat(locale, template).format(this);
        }
        /**
         * Return true if {@link compare} is before this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparision.
         */
        isBefore(compare, unit) {
            if (!unit)
                return this.valueOf() < compare.valueOf();
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            return (this.clone.startOf(unit).valueOf() < compare.clone.startOf(unit).valueOf());
        }
        /**
         * Return true if {@link compare} is after this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparision.
         */
        isAfter(compare, unit) {
            if (!unit)
                return this.valueOf() > compare.valueOf();
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            return (this.clone.startOf(unit).valueOf() > compare.clone.startOf(unit).valueOf());
        }
        /**
         * Return true if {@link compare} is same this date
         * @param compare The Date/DateTime to compare
         * @param unit If provided, uses {@link startOf} for
         * comparision.
         */
        isSame(compare, unit) {
            if (!unit)
                return this.valueOf() === compare.valueOf();
            if (this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            compare = DateTime.convert(compare);
            return (this.clone.startOf(unit).valueOf() === compare.startOf(unit).valueOf());
        }
        /**
         * Check if this is between two other DateTimes, optionally looking at unit scale. The match is exclusive.
         * @param left
         * @param right
         * @param unit.
         * @param inclusivity. A [ indicates inclusion of a value. A ( indicates exclusion.
         * If the inclusivity parameter is used, both indicators must be passed.
         */
        isBetween(left, right, unit, inclusivity = '()') {
            if (unit && this[unit] === undefined)
                throw `Unit '${unit}' is not valid`;
            const leftInclusivity = inclusivity[0] === '(';
            const rightInclusivity = inclusivity[1] === ')';
            return (((leftInclusivity
                ? this.isAfter(left, unit)
                : !this.isBefore(left, unit)) &&
                (rightInclusivity
                    ? this.isBefore(right, unit)
                    : !this.isAfter(right, unit))) ||
                ((leftInclusivity
                    ? this.isBefore(left, unit)
                    : !this.isAfter(left, unit)) &&
                    (rightInclusivity
                        ? this.isAfter(right, unit)
                        : !this.isBefore(right, unit))));
        }
        /**
         * Returns flattened object of the date. Does not include literals
         * @param locale
         * @param template
         */
        parts(locale = this.locale, template = { dateStyle: 'full', timeStyle: 'long' }) {
            const parts = {};
            new Intl.DateTimeFormat(locale, template)
                .formatToParts(this)
                .filter((x) => x.type !== 'literal')
                .forEach((x) => (parts[x.type] = x.value));
            return parts;
        }
        /**
         * Shortcut to Date.getSeconds()
         */
        get seconds() {
            return this.getSeconds();
        }
        /**
         * Shortcut to Date.setSeconds()
         */
        set seconds(value) {
            this.setSeconds(value);
        }
        /**
         * Returns two digit hours
         */
        get secondsFormatted() {
            return this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
        }
        /**
         * Shortcut to Date.getMinutes()
         */
        get minutes() {
            return this.getMinutes();
        }
        /**
         * Shortcut to Date.setMinutes()
         */
        set minutes(value) {
            this.setMinutes(value);
        }
        /**
         * Returns two digit minutes
         */
        get minutesFormatted() {
            return this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
        }
        /**
         * Shortcut to Date.getHours()
         */
        get hours() {
            return this.getHours();
        }
        /**
         * Shortcut to Date.setHours()
         */
        set hours(value) {
            this.setHours(value);
        }
        /**
         * Returns two digit hours
         */
        get hoursFormatted() {
            let formatted = this.format({ hour: '2-digit', hour12: false });
            if (formatted === '24')
                formatted = '00';
            return formatted;
        }
        /**
         * Returns two digit hours but in twelve hour mode e.g. 13 -> 1
         */
        get twelveHoursFormatted() {
            let hour = this.parts().hour;
            if (hour.length === 1)
                hour = `0${hour}`;
            return hour;
        }
        /**
         * Get the meridiem of the date. E.g. AM or PM.
         * If the {@link locale} provides a "dayPeriod" then this will be returned,
         * otherwise it will return AM or PM.
         * @param locale
         */
        meridiem(locale = this.locale) {
            var _a;
            return (_a = new Intl.DateTimeFormat(locale, {
                hour: 'numeric',
                hour12: true,
            })
                .formatToParts(this)
                .find((p) => p.type === 'dayPeriod')) === null || _a === void 0 ? void 0 : _a.value;
        }
        /**
         * Shortcut to Date.getDate()
         */
        get date() {
            return this.getDate();
        }
        /**
         * Shortcut to Date.setDate()
         */
        set date(value) {
            this.setDate(value);
        }
        /**
         * Return two digit date
         */
        get dateFormatted() {
            return this.date < 10 ? `0${this.date}` : `${this.date}`;
        }
        /**
         * Shortcut to Date.getDay()
         */
        get weekDay() {
            return this.getDay();
        }
        /**
         * Shortcut to Date.getMonth()
         */
        get month() {
            return this.getMonth();
        }
        /**
         * Shortcut to Date.setMonth()
         */
        set month(value) {
            this.setMonth(value);
        }
        /**
         * Return two digit, human expected month. E.g. January = 1, December = 12
         */
        get monthFormatted() {
            return this.month + 1 < 10 ? `0${this.month}` : `${this.month}`;
        }
        /**
         * Shortcut to Date.getFullYear()
         */
        get year() {
            return this.getFullYear();
        }
        /**
         * Shortcut to Date.setFullYear()
         */
        set year(value) {
            this.setFullYear(value);
        }
        // borrowed a bunch of stuff from Luxon
        /**
         * Gets the week of the year
         */
        get week() {
            const ordinal = this.computeOrdinal(), weekday = this.getUTCDay();
            let weekNumber = Math.floor((ordinal - weekday + 10) / 7);
            if (weekNumber < 1) {
                weekNumber = this.weeksInWeekYear(this.year - 1);
            }
            else if (weekNumber > this.weeksInWeekYear(this.year)) {
                weekNumber = 1;
            }
            return weekNumber;
        }
        weeksInWeekYear(weekYear) {
            const p1 = (weekYear +
                Math.floor(weekYear / 4) -
                Math.floor(weekYear / 100) +
                Math.floor(weekYear / 400)) %
                7, last = weekYear - 1, p2 = (last +
                Math.floor(last / 4) -
                Math.floor(last / 100) +
                Math.floor(last / 400)) %
                7;
            return p1 === 4 || p2 === 3 ? 53 : 52;
        }
        get isLeapYear() {
            return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
        }
        computeOrdinal() {
            return this.date + (this.isLeapYear ? this.leapLadder : this.nonLeapLadder)[this.month];
        }
    }

    class TdError extends Error {
    }
    class ErrorMessages {
        constructor() {
            this.base = 'TD:';
            //#endregion
            //#region used with notify.error
            /**
             * Used with an Error Event type if the user selects a date that
             * fails restriction validation.
             */
            this.failedToSetInvalidDate = 'Failed to set invalid date';
            /**
             * Used with an Error Event type when a user changes the value of the
             * input field directly, and does not provide a valid date.
             */
            this.failedToParseInput = 'Failed parse input field';
            //#endregion
        }
        //#region out to console
        /**
         * Throws an error indicating that a key in the options object is invalid.
         * @param optionName
         */
        unexpectedOption(optionName) {
            const error = new TdError(`${this.base} Unexpected option: ${optionName} does not match a known option.`);
            error.code = 1;
            throw error;
        }
        /**
         * Throws an error indicating that one more keys in the options object is invalid.
         * @param optionName
         */
        unexpectedOptions(optionName) {
            const error = new TdError(`${this.base}: ${optionName.join(', ')}`);
            error.code = 1;
            throw error;
        }
        /**
         * Throws an error when an option is provide an unsupported value.
         * For example a value of 'cheese' for toolbarPlacement which only supports
         * 'top', 'bottom', 'default'.
         * @param optionName
         * @param badValue
         * @param validOptions
         */
        unexpectedOptionValue(optionName, badValue, validOptions) {
            const error = new TdError(`${this.base} Unexpected option value: ${optionName} does not accept a value of "${badValue}". Valid values are: ${validOptions.join(', ')}`);
            error.code = 2;
            throw error;
        }
        /**
         * Throws an error when an option value is the wrong type.
         * For example a string value was provided to multipleDates which only
         * supports true or false.
         * @param optionName
         * @param badType
         * @param expectedType
         */
        typeMismatch(optionName, badType, expectedType) {
            const error = new TdError(`${this.base} Mismatch types: ${optionName} has a type of ${badType} instead of the required ${expectedType}`);
            error.code = 3;
            throw error;
        }
        /**
         * Throws an error when an option value is  outside of the expected range.
         * For example restrictions.daysOfWeekDisabled excepts a value between 0 and 6.
         * @param optionName
         * @param lower
         * @param upper
         */
        numbersOutOfRage(optionName, lower, upper) {
            const error = new TdError(`${this.base} ${optionName} expected an array of number between ${lower} and ${upper}.`);
            error.code = 4;
            throw error;
        }
        /**
         * Throws an error when a value for a date options couldn't be parsed. Either
         * the option was an invalide string or an invalid Date object.
         * @param optionName
         * @param date
         * @param soft If true, logs a warning instead of an error.
         */
        failedToParseDate(optionName, date, soft = false) {
            const error = new TdError(`${this.base} Could not correctly parse "${date}" to a date for ${optionName}.`);
            error.code = 5;
            if (!soft)
                throw error;
            console.warn(error);
        }
        /**
         * Throws when an element to attach to was not provided in the constructor.
         */
        mustProvideElement() {
            const error = new TdError(`${this.base} No element was provided.`);
            error.code = 6;
            throw error;
        }
        /**
         * Throws if providing an array for the events to subscribe method doesn't have
         * the same number of callbacks. E.g., subscribe([1,2], [1])
         */
        subscribeMismatch() {
            const error = new TdError(`${this.base} The subscribed events does not match the number of callbacks`);
            error.code = 7;
            throw error;
        }
        /**
         * Throws if the configuration has conflicting rules e.g. minDate is after maxDate
         */
        conflictingConfiguration(message) {
            const error = new TdError(`${this.base} A configuration value conflicts with another rule. ${message}`);
            error.code = 8;
            throw error;
        }
        /**
         * Logs a warning if a date option value is provided as a string, instead of
         * a date/datetime object.
         */
        dateString() {
            console.warn(`${this.base} Using a string for date options is not recommended unless you specify an ISO string.`);
        }
    }

    // this is not the way I want this to stay but nested classes seemed to blown up once its compiled.
    const NAME = 'tempus-dominus', version = '6.0.0-alpha1', dataKey = 'td';
    /**
     * Events
     */
    class Events {
        constructor() {
            this.key = `.${dataKey}`;
            /**
             * Change event. Fired when the user selects a date.
             * See also EventTypes.ChangeEvent
             */
            this.change = `change${this.key}`;
            /**
             * Emit when the view changes for example from month view to the year view.
             * See also EventTypes.ViewUpdateEvent
             */
            this.update = `update${this.key}`;
            /**
             * Emits when a selected date or value from the input field fails to meet the provided validation rules.
             * See also EventTypes.FailEvent
             */
            this.error = `error${this.key}`;
            /**
             * Show event
             * @event Events#show
             */
            this.show = `show${this.key}`;
            /**
             * Hide event
             * @event Events#hide
             */
            this.hide = `hide${this.key}`;
            // blur and focus are used in the jQuery provider but are otherwise unused.
            // keyup/down will be used later for keybinding options
            this.blur = `blur${this.key}`;
            this.focus = `focus${this.key}`;
            this.keyup = `keyup${this.key}`;
            this.keydown = `keydown${this.key}`;
        }
    }
    class Css {
        constructor() {
            /**
             * The outer element for the widget.
             */
            this.widget = `${NAME}-widget`;
            /**
             * Hold the previous, next and switcher divs
             */
            this.calendarHeader = 'calendar-header';
            /**
             * The element for the action to change the calendar view. E.g. month -> year.
             */
            this.switch = 'picker-switch';
            /**
             * The elements for all of the toolbar options
             */
            this.toolbar = 'toolbar';
            /**
             * Disables the hover and rounding affect.
             */
            this.noHighlight = 'no-highlight';
            /**
             * Applied to the widget element when the side by side option is in use.
             */
            this.sideBySide = 'timepicker-sbs';
            /**
             * The element for the action to change the calendar view, e.g. August -> July
             */
            this.previous = 'previous';
            /**
             * The element for the action to change the calendar view, e.g. August -> September
             */
            this.next = 'next';
            /**
             * Applied to any action that would violate any restriction options. ALso applied
             * to an input field if the disabled function is called.
             */
            this.disabled = 'disabled';
            /**
             * Applied to any date that is less than requested view,
             * e.g. the last day of the previous month.
             */
            this.old = 'old';
            /**
             * Applied to any date that is greater than of requested view,
             * e.g. the last day of the previous month.
             */
            this.new = 'new';
            /**
             * Applied to any date that is currently selected.
             */
            this.active = 'active';
            //#region date element
            /**
             * The outer most element for the calendar view.
             */
            this.dateContainer = 'date-container';
            /**
             * The outer most element for the decades view.
             */
            this.decadesContainer = `${this.dateContainer}-decades`;
            /**
             * Applied to elements within the decades container, e.g. 2020, 2030
             */
            this.decade = 'decade';
            /**
             * The outer most element for the years view.
             */
            this.yearsContainer = `${this.dateContainer}-years`;
            /**
             * Applied to elements within the years container, e.g. 2021, 2021
             */
            this.year = 'year';
            /**
             * The outer most element for the month view.
             */
            this.monthsContainer = `${this.dateContainer}-months`;
            /**
             * Applied to elements within the month container, e.g. January, February
             */
            this.month = 'month';
            /**
             * The outer most element for the calendar view.
             */
            this.daysContainer = `${this.dateContainer}-days`;
            /**
             * Applied to elements within the day container, e.g. 1, 2..31
             */
            this.day = 'day';
            /**
             * If display.calendarWeeks is enabled, a column displaying the week of year
             * is shown. This class is applied to each cell in that column.
             */
            this.calendarWeeks = 'cw';
            /**
             * Applied to the first row of the calendar view, e.g. Sunday, Monday
             */
            this.dayOfTheWeek = 'dow';
            /**
             * Applied to the current date on the calendar view.
             */
            this.today = 'today';
            /**
             * Applied to the locale's weekend dates on the calendar view, e.g. Sunday, Saturday
             */
            this.weekend = 'weekend';
            //#endregion
            //#region time element
            /**
             * The outer most element for all time related elements.
             */
            this.timeContainer = 'time-container';
            /**
             * Applied the separator columns between time elements, e.g. hour *:* minute *:* second
             */
            this.separator = 'separator';
            /**
             * The outer most element for the clock view.
             */
            this.clockContainer = `${this.timeContainer}-clock`;
            /**
             * The outer most element for the hours selection view.
             */
            this.hourContainer = `${this.timeContainer}-hour`;
            /**
             * The outer most element for the minutes selection view.
             */
            this.minuteContainer = `${this.timeContainer}-minute`;
            /**
             * The outer most element for the seconds selection view.
             */
            this.secondContainer = `${this.timeContainer}-second`;
            /**
             * Applied to each element in the hours selection view.
             */
            this.hour = 'hour';
            /**
             * Applied to each element in the minutes selection view.
             */
            this.minute = 'minute';
            /**
             * Applied to each element in the seconds selection view.
             */
            this.second = 'second';
            /**
             * Applied AM/PM toggle button.
             */
            this.toggleMeridiem = 'toggleMeridiem';
            //#endregion
            //#region collapse
            /**
             * Applied the element of the current view mode, e.g. calendar or clock.
             */
            this.show = 'show';
            /**
             * Applied to the currently showing view mode during a transition
             * between calendar and clock views
             */
            this.collapsing = 'td-collapsing';
            /**
             * Applied to the currently hidden view mode.
             */
            this.collapse = 'td-collapse';
            //#endregion
            /**
             * Applied to the widget when the option display.inline is enabled.
             */
            this.inline = 'inline';
        }
    }
    class Namespace {
    }
    Namespace.NAME = NAME;
    // noinspection JSUnusedGlobalSymbols
    Namespace.version = version;
    Namespace.dataKey = dataKey;
    Namespace.events = new Events();
    Namespace.css = new Css();
    Namespace.errorMessages = new ErrorMessages();

    const DefaultOptions = {
        restrictions: {
            minDate: undefined,
            maxDate: undefined,
            disabledDates: [],
            enabledDates: [],
            daysOfWeekDisabled: [],
            disabledTimeIntervals: [],
            disabledHours: [],
            enabledHours: [],
        },
        display: {
            icons: {
                type: 'icons',
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'fas fa-calendar-check',
                clear: 'fas fa-trash',
                close: 'fas fa-times',
            },
            sideBySide: false,
            calendarWeeks: false,
            viewMode: 'calendar',
            toolbarPlacement: 'bottom',
            keepOpen: false,
            buttons: {
                today: false,
                clear: false,
                close: false,
            },
            components: {
                calendar: true,
                date: true,
                month: true,
                year: true,
                decades: true,
                clock: true,
                hours: true,
                minutes: true,
                seconds: false,
                useTwentyfourHour: false,
            },
            inline: false,
        },
        stepping: 1,
        useCurrent: true,
        defaultDate: undefined,
        localization: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            previousMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            previousYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            previousDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            previousCentury: 'Previous Century',
            nextCentury: 'Next Century',
            pickHour: 'Pick Hour',
            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            pickMinute: 'Pick Minute',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            pickSecond: 'Pick Second',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            toggleMeridiem: 'Toggle Meridiem',
            selectTime: 'Select Time',
            selectDate: 'Select Date',
            dayViewHeaderFormat: { month: 'long', year: '2-digit' },
            locale: 'default',
            startOfTheWeek: 0,
        },
        keepInvalid: false,
        debug: false,
        allowInputToggle: false,
        viewDate: new DateTime(),
        multipleDates: false,
        multipleDatesSeparator: '; ',
        promptTimeOnDateChange: false,
        promptTimeOnDateChangeTransitionDelay: 200,
        hooks: {
            inputParse: undefined,
            inputFormat: undefined,
        },
        meta: {},
        container: undefined
    };
    const DatePickerModes = [
        {
            name: 'calendar',
            className: Namespace.css.daysContainer,
            unit: exports.Unit.month,
            step: 1,
        },
        {
            name: 'months',
            className: Namespace.css.monthsContainer,
            unit: exports.Unit.year,
            step: 1,
        },
        {
            name: 'years',
            className: Namespace.css.yearsContainer,
            unit: exports.Unit.year,
            step: 10,
        },
        {
            name: 'decades',
            className: Namespace.css.decadesContainer,
            unit: exports.Unit.year,
            step: 100,
        },
    ];

    /**
     * Provides a collapse functionality to the view changes
     */
    class Collapse {
        /**
         * Flips the show/hide state of `target`
         * @param target html element to affect.
         */
        static toggle(target) {
            if (target.classList.contains(Namespace.css.show)) {
                this.hide(target);
            }
            else {
                this.show(target);
            }
        }
        /**
         * If `target` is not already showing, then show after the animation.
         * @param target
         */
        static show(target) {
            if (target.classList.contains(Namespace.css.collapsing) ||
                target.classList.contains(Namespace.css.show))
                return;
            const complete = () => {
                target.classList.remove(Namespace.css.collapsing);
                target.classList.add(Namespace.css.collapse, Namespace.css.show);
                target.style.height = '';
            };
            target.style.height = '0';
            target.classList.remove(Namespace.css.collapse);
            target.classList.add(Namespace.css.collapsing);
            setTimeout(complete, this.getTransitionDurationFromElement(target));
            target.style.height = `${target.scrollHeight}px`;
        }
        /**
         * If `target` is not already hidden, then hide after the animation.
         * @param target HTML Element
         */
        static hide(target) {
            if (target.classList.contains(Namespace.css.collapsing) ||
                !target.classList.contains(Namespace.css.show))
                return;
            const complete = () => {
                target.classList.remove(Namespace.css.collapsing);
                target.classList.add(Namespace.css.collapse);
            };
            target.style.height = `${target.getBoundingClientRect()['height']}px`;
            const reflow = (element) => element.offsetHeight;
            reflow(target);
            target.classList.remove(Namespace.css.collapse, Namespace.css.show);
            target.classList.add(Namespace.css.collapsing);
            target.style.height = '';
            setTimeout(complete, this.getTransitionDurationFromElement(target));
        }
    }
    /**
     * Gets the transition duration from the `element` by getting css properties
     * `transition-duration` and `transition-delay`
     * @param element HTML Element
     */
    Collapse.getTransitionDurationFromElement = (element) => {
        if (!element) {
            return 0;
        }
        // Get transition-duration of the element
        let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        // Return 0 if element or transition duration is not found
        if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
        }
        // If multiple durations are defined, take the first
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return ((Number.parseFloat(transitionDuration) +
            Number.parseFloat(transitionDelay)) *
            1000);
    };

    /**
     *
     */
    class Actions {
        constructor(context) {
            this._context = context;
        }
        /**
         * Performs the selected `action`. See ActionTypes
         * @param e This is normally a click event
         * @param action If not provided, then look for a [data-action]
         */
        do(e, action) {
            var _a, _b;
            const currentTarget = e === null || e === void 0 ? void 0 : e.currentTarget;
            if ((_a = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.classList) === null || _a === void 0 ? void 0 : _a.contains(Namespace.css.disabled))
                return false;
            action = action || ((_b = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.dataset) === null || _b === void 0 ? void 0 : _b.action);
            const lastPicked = (this._context.dates.lastPicked || this._context._viewDate).clone;
            /**
             * Common function to manipulate {@link lastPicked} by `unit`.
             * @param unit
             * @param value Value to change by
             */
            const manipulateAndSet = (unit, value = 1) => {
                const newDate = lastPicked.manipulate(value, unit);
                if (this._context._validation.isValid(newDate, unit)) {
                    this._context.dates._setValue(newDate, this._context.dates.lastPickedIndex);
                }
            };
            /**
             * Common function to manipulate {@link lastPicked} by `unit`.
             * After setting the value it will either show the clock or hide the widget.
             * @param unit
             * @param value Value to change by
             */
            const hideOrClock = () => {
                if (this._context._options.display.components.useTwentyfourHour &&
                    !this._context._options.display.components.minutes &&
                    !this._context._options.display.keepOpen &&
                    !this._context._options.display.inline) {
                    this._context._display.hide();
                }
                else {
                    this.do(e, ActionTypes.showClock);
                }
            };
            switch (action) {
                case ActionTypes.next:
                case ActionTypes.previous:
                    const { unit, step } = DatePickerModes[this._context._currentViewMode];
                    if (action === ActionTypes.next)
                        this._context._viewDate.manipulate(step, unit);
                    else
                        this._context._viewDate.manipulate(step * -1, unit);
                    this._context._viewUpdate(unit);
                    this._context._display._showMode();
                    break;
                case ActionTypes.pickerSwitch:
                    this._context._display._showMode(1);
                    this._context._viewUpdate(DatePickerModes[this._context._currentViewMode].unit);
                    this._context._display._updateCalendarHeader();
                    break;
                case ActionTypes.selectMonth:
                case ActionTypes.selectYear:
                case ActionTypes.selectDecade:
                    const value = +currentTarget.dataset.value;
                    switch (action) {
                        case ActionTypes.selectMonth:
                            this._context._viewDate.month = value;
                            this._context._viewUpdate(exports.Unit.month);
                            break;
                        case ActionTypes.selectYear:
                            this._context._viewDate.year = value;
                            this._context._viewUpdate(exports.Unit.year);
                            break;
                        case ActionTypes.selectDecade:
                            this._context._viewDate.year = value;
                            this._context._viewUpdate(exports.Unit.year);
                            break;
                    }
                    if (this._context._currentViewMode === this._context._minViewModeNumber) {
                        this._context.dates._setValue(this._context._viewDate, this._context.dates.lastPickedIndex);
                        if (!this._context._options.display.inline) {
                            this._context._display.hide();
                        }
                    }
                    else {
                        this._context._display._showMode(-1);
                    }
                    break;
                case ActionTypes.selectDay:
                    const day = this._context._viewDate.clone;
                    if (currentTarget.classList.contains(Namespace.css.old)) {
                        day.manipulate(-1, exports.Unit.month);
                    }
                    if (currentTarget.classList.contains(Namespace.css.new)) {
                        day.manipulate(1, exports.Unit.month);
                    }
                    day.date = +currentTarget.dataset.day;
                    let index = 0;
                    if (this._context._options.multipleDates) {
                        index = this._context.dates.pickedIndex(day, exports.Unit.date);
                        if (index !== -1) {
                            this._context.dates._setValue(null, index); //deselect multi-date
                        }
                        else {
                            this._context.dates._setValue(day, this._context.dates.lastPickedIndex + 1);
                        }
                    }
                    else {
                        this._context.dates._setValue(day, this._context.dates.lastPickedIndex);
                    }
                    if (!this._context._display._hasTime &&
                        !this._context._options.display.keepOpen &&
                        !this._context._options.display.inline &&
                        !this._context._options.multipleDates) {
                        this._context._display.hide();
                    }
                    break;
                case ActionTypes.selectHour:
                    let hour = +currentTarget.dataset.value;
                    if (lastPicked.hours >= 12 &&
                        !this._context._options.display.components.useTwentyfourHour)
                        hour += 12;
                    lastPicked.hours = hour;
                    this._context.dates._setValue(lastPicked, this._context.dates.lastPickedIndex);
                    hideOrClock();
                    break;
                case ActionTypes.selectMinute:
                    lastPicked.minutes = +currentTarget.dataset.value;
                    this._context.dates._setValue(lastPicked, this._context.dates.lastPickedIndex);
                    hideOrClock();
                    break;
                case ActionTypes.selectSecond:
                    lastPicked.seconds = +currentTarget.dataset.value;
                    this._context.dates._setValue(lastPicked, this._context.dates.lastPickedIndex);
                    hideOrClock();
                    break;
                case ActionTypes.incrementHours:
                    manipulateAndSet(exports.Unit.hours);
                    break;
                case ActionTypes.incrementMinutes:
                    manipulateAndSet(exports.Unit.minutes, this._context._options.stepping);
                    break;
                case ActionTypes.incrementSeconds:
                    manipulateAndSet(exports.Unit.seconds);
                    break;
                case ActionTypes.decrementHours:
                    manipulateAndSet(exports.Unit.hours, -1);
                    break;
                case ActionTypes.decrementMinutes:
                    manipulateAndSet(exports.Unit.minutes, this._context._options.stepping * -1);
                    break;
                case ActionTypes.decrementSeconds:
                    manipulateAndSet(exports.Unit.seconds, -1);
                    break;
                case ActionTypes.toggleMeridiem:
                    manipulateAndSet(exports.Unit.hours, this._context.dates.lastPicked.hours >= 12 ? -12 : 12);
                    break;
                case ActionTypes.togglePicker:
                    if (currentTarget.getAttribute('title') ===
                        this._context._options.localization.selectDate) {
                        currentTarget.setAttribute('title', this._context._options.localization.selectTime);
                        currentTarget.innerHTML = this._context._display._iconTag(this._context._options.display.icons.time).outerHTML;
                        this._context._display._updateCalendarHeader();
                    }
                    else {
                        currentTarget.setAttribute('title', this._context._options.localization.selectDate);
                        currentTarget.innerHTML = this._context._display._iconTag(this._context._options.display.icons.date).outerHTML;
                        if (this._context._display._hasTime) {
                            this.do(e, ActionTypes.showClock);
                            this._context._display._update('clock');
                        }
                    }
                    this._context._display.widget
                        .querySelectorAll(`.${Namespace.css.dateContainer}, .${Namespace.css.timeContainer}`)
                        .forEach((htmlElement) => Collapse.toggle(htmlElement));
                    break;
                case ActionTypes.showClock:
                case ActionTypes.showHours:
                case ActionTypes.showMinutes:
                case ActionTypes.showSeconds:
                    this._context._display.widget
                        .querySelectorAll(`.${Namespace.css.timeContainer} > div`)
                        .forEach((htmlElement) => (htmlElement.style.display = 'none'));
                    let classToUse = '';
                    switch (action) {
                        case ActionTypes.showClock:
                            classToUse = Namespace.css.clockContainer;
                            this._context._display._update('clock');
                            break;
                        case ActionTypes.showHours:
                            classToUse = Namespace.css.hourContainer;
                            this._context._display._update(exports.Unit.hours);
                            break;
                        case ActionTypes.showMinutes:
                            classToUse = Namespace.css.minuteContainer;
                            this._context._display._update(exports.Unit.minutes);
                            break;
                        case ActionTypes.showSeconds:
                            classToUse = Namespace.css.secondContainer;
                            this._context._display._update(exports.Unit.seconds);
                            break;
                    }
                    (this._context._display.widget.getElementsByClassName(classToUse)[0]).style.display = 'grid';
                    break;
                case ActionTypes.clear:
                    this._context.dates._setValue(null);
                    this._context._display._updateCalendarHeader();
                    break;
                case ActionTypes.close:
                    this._context._display.hide();
                    break;
                case ActionTypes.today:
                    const today = new DateTime().setLocale(this._context._options.localization.locale);
                    this._context._viewDate = today;
                    if (this._context._validation.isValid(today, exports.Unit.date))
                        this._context.dates._setValue(today, this._context.dates.lastPickedIndex);
                    break;
            }
        }
    }
    var ActionTypes;
    (function (ActionTypes) {
        ActionTypes["next"] = "next";
        ActionTypes["previous"] = "previous";
        ActionTypes["pickerSwitch"] = "pickerSwitch";
        ActionTypes["selectMonth"] = "selectMonth";
        ActionTypes["selectYear"] = "selectYear";
        ActionTypes["selectDecade"] = "selectDecade";
        ActionTypes["selectDay"] = "selectDay";
        ActionTypes["selectHour"] = "selectHour";
        ActionTypes["selectMinute"] = "selectMinute";
        ActionTypes["selectSecond"] = "selectSecond";
        ActionTypes["incrementHours"] = "incrementHours";
        ActionTypes["incrementMinutes"] = "incrementMinutes";
        ActionTypes["incrementSeconds"] = "incrementSeconds";
        ActionTypes["decrementHours"] = "decrementHours";
        ActionTypes["decrementMinutes"] = "decrementMinutes";
        ActionTypes["decrementSeconds"] = "decrementSeconds";
        ActionTypes["toggleMeridiem"] = "toggleMeridiem";
        ActionTypes["togglePicker"] = "togglePicker";
        ActionTypes["showClock"] = "showClock";
        ActionTypes["showHours"] = "showHours";
        ActionTypes["showMinutes"] = "showMinutes";
        ActionTypes["showSeconds"] = "showSeconds";
        ActionTypes["clear"] = "clear";
        ActionTypes["close"] = "close";
        ActionTypes["today"] = "today";
    })(ActionTypes || (ActionTypes = {}));

    /**
     * Creates and updates the grid for `date`
     */
    class DateDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.daysContainer);
            container.append(...this._daysOfTheWeek());
            if (this._context._options.display.calendarWeeks) {
                const div = document.createElement('div');
                div.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
                container.appendChild(div);
            }
            for (let i = 0; i < 42; i++) {
                if (i !== 0 && i % 7 === 0) {
                    if (this._context._options.display.calendarWeeks) {
                        const div = document.createElement('div');
                        div.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
                        container.appendChild(div);
                    }
                }
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectDay);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.daysContainer)[0];
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.daysContainer, this._context._viewDate.format(this._context._options.localization.dayViewHeaderFormat));
            this._context._validation.isValid(this._context._viewDate.clone.manipulate(-1, exports.Unit.month), exports.Unit.month)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this._context._validation.isValid(this._context._viewDate.clone.manipulate(1, exports.Unit.month), exports.Unit.month)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
            let innerDate = this._context._viewDate.clone
                .startOf(exports.Unit.month)
                .startOf('weekDay', this._context._options.localization.startOfTheWeek)
                .manipulate(12, exports.Unit.hours);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectDay}"], .${Namespace.css.calendarWeeks}`)
                .forEach((containerClone, index) => {
                if (this._context._options.display.calendarWeeks &&
                    containerClone.classList.contains(Namespace.css.calendarWeeks)) {
                    if (containerClone.innerText === '#')
                        return;
                    containerClone.innerText = `${innerDate.week}`;
                    return;
                }
                let classes = [];
                classes.push(Namespace.css.day);
                if (innerDate.isBefore(this._context._viewDate, exports.Unit.month)) {
                    classes.push(Namespace.css.old);
                }
                if (innerDate.isAfter(this._context._viewDate, exports.Unit.month)) {
                    classes.push(Namespace.css.new);
                }
                if (!this._context._unset &&
                    this._context.dates.isPicked(innerDate, exports.Unit.date)) {
                    classes.push(Namespace.css.active);
                }
                if (!this._context._validation.isValid(innerDate, exports.Unit.date)) {
                    classes.push(Namespace.css.disabled);
                }
                if (innerDate.isSame(new DateTime(), exports.Unit.date)) {
                    classes.push(Namespace.css.today);
                }
                if (innerDate.weekDay === 0 || innerDate.weekDay === 6) {
                    classes.push(Namespace.css.weekend);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${innerDate.year}-${innerDate.monthFormatted}-${innerDate.dateFormatted}`);
                containerClone.setAttribute('data-day', `${innerDate.date}`);
                containerClone.innerText = innerDate.format({ day: 'numeric' });
                innerDate.manipulate(1, exports.Unit.date);
            });
        }
        /***
         * Generates an html row that contains the days of the week.
         * @private
         */
        _daysOfTheWeek() {
            let innerDate = this._context._viewDate.clone
                .startOf('weekDay', this._context._options.localization.startOfTheWeek)
                .startOf(exports.Unit.date);
            const row = [];
            document.createElement('div');
            if (this._context._options.display.calendarWeeks) {
                const htmlDivElement = document.createElement('div');
                htmlDivElement.classList.add(Namespace.css.calendarWeeks, Namespace.css.noHighlight);
                htmlDivElement.innerText = '#';
                row.push(htmlDivElement);
            }
            for (let i = 0; i < 7; i++) {
                const htmlDivElement = document.createElement('div');
                htmlDivElement.classList.add(Namespace.css.dayOfTheWeek, Namespace.css.noHighlight);
                htmlDivElement.innerText = innerDate.format({ weekday: 'short' });
                innerDate.manipulate(1, exports.Unit.date);
                row.push(htmlDivElement);
            }
            return row;
        }
    }

    /**
     * Creates and updates the grid for `month`
     */
    class MonthDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.monthsContainer);
            for (let i = 0; i < 12; i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectMonth);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.monthsContainer)[0];
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.monthsContainer, this._context._viewDate.format({ year: 'numeric' }));
            this._context._validation.isValid(this._context._viewDate.clone.manipulate(-1, exports.Unit.year), exports.Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this._context._validation.isValid(this._context._viewDate.clone.manipulate(1, exports.Unit.year), exports.Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
            let innerDate = this._context._viewDate.clone.startOf(exports.Unit.year);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectMonth}"]`)
                .forEach((containerClone, index) => {
                let classes = [];
                classes.push(Namespace.css.month);
                if (!this._context._unset &&
                    this._context.dates.isPicked(innerDate, exports.Unit.month)) {
                    classes.push(Namespace.css.active);
                }
                if (!this._context._validation.isValid(innerDate, exports.Unit.month)) {
                    classes.push(Namespace.css.disabled);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${index}`);
                containerClone.innerText = `${innerDate.format({ month: 'short' })}`;
                innerDate.manipulate(1, exports.Unit.month);
            });
        }
    }

    class OptionConverter {
        static _mergeOptions(providedOptions, mergeTo) {
            var _a;
            const newOptions = {};
            let path = '';
            const ignoreProperties = [
                'inputParse',
                'inputFormat',
                'meta',
                'dayViewHeaderFormat',
                'container'
            ];
            //see if the options specify a locale
            const locale = mergeTo.localization.locale !== 'default' ? mergeTo.localization.locale :
                ((_a = providedOptions === null || providedOptions === void 0 ? void 0 : providedOptions.localization) === null || _a === void 0 ? void 0 : _a.locale) || 'default';
            const processKey = (key, value, providedType, defaultType) => {
                switch (key) {
                    case 'defaultDate': {
                        const dateTime = this._dateConversion(value, 'defaultDate');
                        if (dateTime !== undefined) {
                            dateTime.setLocale(locale);
                            return dateTime;
                        }
                        Namespace.errorMessages.typeMismatch('defaultDate', providedType, 'DateTime or Date');
                    }
                    case 'viewDate': {
                        const dateTime = this._dateConversion(value, 'viewDate');
                        if (dateTime !== undefined) {
                            dateTime.setLocale(locale);
                            return dateTime;
                        }
                        Namespace.errorMessages.typeMismatch('viewDate', providedType, 'DateTime or Date');
                    }
                    case 'minDate': {
                        if (value === undefined) {
                            return value;
                        }
                        const dateTime = this._dateConversion(value, 'restrictions.minDate');
                        if (dateTime !== undefined) {
                            dateTime.setLocale(locale);
                            return dateTime;
                        }
                        Namespace.errorMessages.typeMismatch('restrictions.minDate', providedType, 'DateTime or Date');
                    }
                    case 'maxDate': {
                        if (value === undefined) {
                            return value;
                        }
                        const dateTime = this._dateConversion(value, 'restrictions.maxDate');
                        if (dateTime !== undefined) {
                            dateTime.setLocale(locale);
                            return dateTime;
                        }
                        Namespace.errorMessages.typeMismatch('restrictions.maxDate', providedType, 'DateTime or Date');
                    }
                    case 'disabledHours':
                        if (value === undefined) {
                            return [];
                        }
                        this._typeCheckNumberArray('restrictions.disabledHours', value, providedType);
                        if (value.filter((x) => x < 0 || x > 24).length > 0)
                            Namespace.errorMessages.numbersOutOfRage('restrictions.disabledHours', 0, 23);
                        return value;
                    case 'enabledHours':
                        if (value === undefined) {
                            return [];
                        }
                        this._typeCheckNumberArray('restrictions.enabledHours', value, providedType);
                        if (value.filter((x) => x < 0 || x > 24).length > 0)
                            Namespace.errorMessages.numbersOutOfRage('restrictions.enabledHours', 0, 23);
                        return value;
                    case 'daysOfWeekDisabled':
                        if (value === undefined) {
                            return [];
                        }
                        this._typeCheckNumberArray('restrictions.daysOfWeekDisabled', value, providedType);
                        if (value.filter((x) => x < 0 || x > 6).length > 0)
                            Namespace.errorMessages.numbersOutOfRage('restrictions.daysOfWeekDisabled', 0, 6);
                        return value;
                    case 'enabledDates':
                        if (value === undefined) {
                            return [];
                        }
                        this._typeCheckDateArray('restrictions.enabledDates', value, providedType, locale);
                        return value;
                    case 'disabledDates':
                        if (value === undefined) {
                            return [];
                        }
                        this._typeCheckDateArray('restrictions.disabledDates', value, providedType, locale);
                        return value;
                    case 'disabledTimeIntervals':
                        if (value === undefined) {
                            return [];
                        }
                        if (!Array.isArray(value)) {
                            Namespace.errorMessages.typeMismatch(key, providedType, 'array of { from: DateTime|Date, to: DateTime|Date }');
                        }
                        const valueObject = value;
                        for (let i = 0; i < valueObject.length; i++) {
                            Object.keys(valueObject[i]).forEach((vk) => {
                                const subOptionName = `${key}[${i}].${vk}`;
                                let d = valueObject[i][vk];
                                const dateTime = this._dateConversion(d, subOptionName);
                                if (!dateTime) {
                                    Namespace.errorMessages.typeMismatch(subOptionName, typeof d, 'DateTime or Date');
                                }
                                dateTime.setLocale(locale);
                                valueObject[i][vk] = dateTime;
                            });
                        }
                        return valueObject;
                    case 'toolbarPlacement':
                    case 'type':
                    case 'viewMode':
                        const optionValues = {
                            toolbarPlacement: ['top', 'bottom', 'default'],
                            type: ['icons', 'sprites'],
                            viewMode: ['clock', 'calendar', 'months', 'years', 'decades'],
                        };
                        const keyOptions = optionValues[key];
                        if (!keyOptions.includes(value))
                            Namespace.errorMessages.unexpectedOptionValue(path.substring(1), value, keyOptions);
                        return value;
                    case 'inputParse':
                    case 'inputFormat':
                    case 'meta':
                    case 'dayViewHeaderFormat':
                        return value;
                    case 'container':
                        if (value && !(value instanceof HTMLElement || value instanceof Element || (value === null || value === void 0 ? void 0 : value.appendChild))) {
                            Namespace.errorMessages.typeMismatch(path.substring(1), typeof value, 'HTMLElement');
                        }
                        return value;
                    default:
                        switch (defaultType) {
                            case 'boolean':
                                return value === 'true' || value === true;
                            case 'number':
                                return +value;
                            case 'string':
                                return value.toString();
                            case 'object':
                                return {};
                            case 'function':
                                return value;
                            default:
                                Namespace.errorMessages.typeMismatch(path.substring(1), providedType, defaultType);
                        }
                }
            };
            /**
             * The spread operator caused sub keys to be missing after merging.
             * This is to fix that issue by using spread on the child objects first.
             * Also handles complex options like disabledDates
             * @param provided An option from new providedOptions
             * @param mergeOption Default option to compare types against
             * @param copyTo Destination object. This was add to prevent reference copies
             */
            const spread = (provided, mergeOption, copyTo) => {
                const unsupportedOptions = Object.keys(provided).filter((x) => !Object.keys(mergeOption).includes(x));
                if (unsupportedOptions.length > 0) {
                    const flattenedOptions = OptionConverter._flattenDefaultOptions;
                    const errors = unsupportedOptions.map((x) => {
                        let error = `"${path.substring(1)}.${x}" in not a known option.`;
                        let didYouMean = flattenedOptions.find((y) => y.includes(x));
                        if (didYouMean)
                            error += `Did you mean "${didYouMean}"?`;
                        return error;
                    });
                    Namespace.errorMessages.unexpectedOptions(errors);
                }
                Object.keys(mergeOption).forEach((key) => {
                    const defaultOptionValue = mergeOption[key];
                    let providedType = typeof provided[key];
                    let defaultType = typeof defaultOptionValue;
                    let value = provided[key];
                    if (!provided.hasOwnProperty(key)) {
                        if (defaultType === 'undefined' ||
                            ((value === null || value === void 0 ? void 0 : value.length) === 0 && Array.isArray(defaultOptionValue))) {
                            copyTo[key] = defaultOptionValue;
                            return;
                        }
                        provided[key] = defaultOptionValue;
                        value = provided[key];
                    }
                    path += `.${key}`;
                    copyTo[key] = processKey(key, value, providedType, defaultType);
                    if (typeof defaultOptionValue !== 'object' ||
                        ignoreProperties.includes(key)) {
                        path = path.substring(0, path.lastIndexOf(`.${key}`));
                        return;
                    }
                    if (!Array.isArray(provided[key])) {
                        spread(provided[key], defaultOptionValue, copyTo[key]);
                        path = path.substring(0, path.lastIndexOf(`.${key}`));
                    }
                    path = path.substring(0, path.lastIndexOf(`.${key}`));
                });
            };
            spread(providedOptions, mergeTo, newOptions);
            return newOptions;
        }
        static _dataToOptions(element, options) {
            const eData = element.dataset;
            if (eData === null || eData === void 0 ? void 0 : eData.tdTargetInput)
                delete eData.tdTargetInput;
            if (eData === null || eData === void 0 ? void 0 : eData.tdTargetToggle)
                delete eData.tdTargetToggle;
            if (!eData ||
                Object.keys(eData).length === 0 ||
                eData.constructor !== DOMStringMap)
                return options;
            let dataOptions = {};
            // because dataset returns camelCase including the 'td' key the option
            // key won't align
            const objectToNormalized = (object) => {
                const lowered = {};
                Object.keys(object).forEach((x) => {
                    lowered[x.toLowerCase()] = x;
                });
                return lowered;
            };
            const rabbitHole = (split, index, optionSubgroup, value) => {
                // first round = display { ... }
                const normalizedOptions = objectToNormalized(optionSubgroup);
                const keyOption = normalizedOptions[split[index].toLowerCase()];
                const internalObject = {};
                if (keyOption === undefined)
                    return internalObject;
                // if this is another object, continue down the rabbit hole
                if (optionSubgroup[keyOption].constructor === Object) {
                    index++;
                    internalObject[keyOption] = rabbitHole(split, index, optionSubgroup[keyOption], value);
                }
                else {
                    internalObject[keyOption] = value;
                }
                return internalObject;
            };
            const optionsLower = objectToNormalized(options);
            Object.keys(eData)
                .filter((x) => x.startsWith(Namespace.dataKey))
                .map((x) => x.substring(2))
                .forEach((key) => {
                let keyOption = optionsLower[key.toLowerCase()];
                // dataset merges dashes to camelCase... yay
                // i.e. key = display_components_seconds
                if (key.includes('_')) {
                    // [display, components, seconds]
                    const split = key.split('_');
                    // display
                    keyOption = optionsLower[split[0].toLowerCase()];
                    if (keyOption !== undefined &&
                        options[keyOption].constructor === Object) {
                        dataOptions[keyOption] = rabbitHole(split, 1, options[keyOption], eData[`td${key}`]);
                    }
                }
                // or key = multipleDate
                else if (keyOption !== undefined) {
                    dataOptions[keyOption] = eData[`td${key}`];
                }
            });
            return this._mergeOptions(dataOptions, options);
        }
        /**
         * Attempts to prove `d` is a DateTime or Date or can be converted into one.
         * @param d If a string will attempt creating a date from it.
         * @private
         */
        static _dateTypeCheck(d) {
            if (d.constructor.name === DateTime.name)
                return d;
            if (d.constructor.name === Date.name) {
                return DateTime.convert(d);
            }
            if (typeof d === typeof '') {
                const dateTime = new DateTime(d);
                if (JSON.stringify(dateTime) === 'null') {
                    return null;
                }
                return dateTime;
            }
            return null;
        }
        /**
         * Type checks that `value` is an array of Date or DateTime
         * @param optionName Provides text to error messages e.g. disabledDates
         * @param value Option value
         * @param providedType Used to provide text to error messages
         */
        static _typeCheckDateArray(optionName, value, providedType, locale = 'default') {
            if (!Array.isArray(value)) {
                Namespace.errorMessages.typeMismatch(optionName, providedType, 'array of DateTime or Date');
            }
            for (let i = 0; i < value.length; i++) {
                let d = value[i];
                const dateTime = this._dateConversion(d, optionName);
                if (!dateTime) {
                    Namespace.errorMessages.typeMismatch(optionName, typeof d, 'DateTime or Date');
                }
                dateTime.setLocale(locale);
                value[i] = dateTime;
            }
        }
        /**
         * Type checks that `value` is an array of numbers
         * @param optionName Provides text to error messages e.g. disabledDates
         * @param value Option value
         * @param providedType Used to provide text to error messages
         */
        static _typeCheckNumberArray(optionName, value, providedType) {
            if (!Array.isArray(value) || value.find((x) => typeof x !== typeof 0)) {
                Namespace.errorMessages.typeMismatch(optionName, providedType, 'array of numbers');
            }
            return;
        }
        /**
         * Attempts to convert `d` to a DateTime object
         * @param d value to convert
         * @param optionName Provides text to error messages e.g. disabledDates
         */
        static _dateConversion(d, optionName) {
            if (typeof d === typeof '' && optionName !== 'input') {
                Namespace.errorMessages.dateString();
            }
            const converted = this._dateTypeCheck(d);
            if (!converted) {
                Namespace.errorMessages.failedToParseDate(optionName, d, optionName === 'input');
            }
            return converted;
        }
        static get _flattenDefaultOptions() {
            if (this._flatback)
                return this._flatback;
            const deepKeys = (t, pre = []) => Array.isArray(t)
                ? []
                : Object(t) === t
                    ? Object.entries(t).flatMap(([k, v]) => deepKeys(v, [...pre, k]))
                    : pre.join('.');
            this._flatback = deepKeys(DefaultOptions);
            return this._flatback;
        }
        /**
         * Some options conflict like min/max date. Verify that these kinds of options
         * are set correctly.
         * @param config
         */
        static _validateConflcits(config) {
            if (config.display.sideBySide && (!config.display.components.clock ||
                !(config.display.components.hours ||
                    config.display.components.minutes ||
                    config.display.components.seconds))) {
                Namespace.errorMessages.conflictingConfiguration('Cannot use side by side mode without the clock components');
            }
            if (config.restrictions.minDate && config.restrictions.maxDate) {
                if (config.restrictions.minDate.isAfter(config.restrictions.maxDate)) {
                    Namespace.errorMessages.conflictingConfiguration('minDate is after maxDate');
                }
                if (config.restrictions.maxDate.isBefore(config.restrictions.minDate)) {
                    Namespace.errorMessages.conflictingConfiguration('maxDate is before minDate');
                }
            }
        }
    }

    class Dates {
        constructor(context) {
            this._dates = [];
            this._context = context;
        }
        /**
         * Returns the array of selected dates
         */
        get picked() {
            return this._dates;
        }
        /**
         * Returns the last picked value.
         */
        get lastPicked() {
            return this._dates[this.lastPickedIndex];
        }
        /**
         * Returns the length of picked dates -1 or 0 if none are selected.
         */
        get lastPickedIndex() {
            if (this._dates.length === 0)
                return 0;
            return this._dates.length - 1;
        }
        /**
         * Adds a new DateTime to selected dates array
         * @param date
         */
        add(date) {
            this._dates.push(date);
        }
        /**
         * Tries to convert the provided value to a DateTime object.
         * If value is null|undefined then clear the value of the provided index (or 0).
         * @param value Value to convert or null|undefined
         * @param index When using multidates this is the index in the array
         * @param from Used in the warning message, useful for debugging.
         */
        set(value, index, from = 'date.set') {
            if (!value)
                this._setValue(value, index);
            const converted = OptionConverter._dateConversion(value, from);
            if (converted) {
                converted.setLocale(this._context._options.localization.locale);
                this._setValue(converted, index);
            }
        }
        /**
         * Returns true if the `targetDate` is part of the selected dates array.
         * If `unit` is provided then a granularity to that unit will be used.
         * @param targetDate
         * @param unit
         */
        isPicked(targetDate, unit) {
            if (!unit)
                return this._dates.find((x) => x === targetDate) !== undefined;
            const format = Dates.getFormatByUnit(unit);
            let innerDateFormatted = targetDate.format(format);
            return (this._dates
                .map((x) => x.format(format))
                .find((x) => x === innerDateFormatted) !== undefined);
        }
        /**
         * Returns the index at which `targetDate` is in the array.
         * This is used for updating or removing a date when multi-date is used
         * If `unit` is provided then a granularity to that unit will be used.
         * @param targetDate
         * @param unit
         */
        pickedIndex(targetDate, unit) {
            if (!unit)
                return this._dates.indexOf(targetDate);
            const format = Dates.getFormatByUnit(unit);
            let innerDateFormatted = targetDate.format(format);
            return this._dates.map((x) => x.format(format)).indexOf(innerDateFormatted);
        }
        /**
         * Clears all selected dates.
         */
        clear() {
            this._context._unset = true;
            this._context._triggerEvent({
                type: Namespace.events.change,
                date: undefined,
                oldDate: this.lastPicked,
                isClear: true,
                isValid: true,
            });
            this._dates = [];
        }
        /**
         * Find the "book end" years given a `year` and a `factor`
         * @param factor e.g. 100 for decades
         * @param year e.g. 2021
         */
        static getStartEndYear(factor, year) {
            const step = factor / 10, startYear = Math.floor(year / factor) * factor, endYear = startYear + step * 9, focusValue = Math.floor(year / step) * step;
            return [startYear, endYear, focusValue];
        }
        /**
         * Do not use direectly. Attempts to either clear or set the `target` date at `index`.
         * If the `target` is null then the date will be cleared.
         * If multi-date is being used then it will be removed from the array.
         * If `target` is valid and multi-date is used then if `index` is
         * provided the date at that index will be replaced, otherwise it is appended.
         * @param target
         * @param index
         */
        _setValue(target, index) {
            const noIndex = typeof index === 'undefined', isClear = !target && noIndex;
            let oldDate = this._context._unset ? null : this._dates[index];
            if (!oldDate && !this._context._unset && noIndex && isClear) {
                oldDate = this.lastPicked;
            }
            const updateInput = () => {
                if (!this._context._input)
                    return;
                let newValue = this._context._options.hooks.inputFormat(this._context, target);
                if (this._context._options.multipleDates) {
                    newValue = this._dates
                        .map((d) => this._context._options.hooks.inputFormat(this._context, d))
                        .join(this._context._options.multipleDatesSeparator);
                }
                if (this._context._input.value != newValue)
                    this._context._input.value = newValue;
            };
            if (target && (oldDate === null || oldDate === void 0 ? void 0 : oldDate.isSame(target))) {
                updateInput();
                return;
            }
            // case of calling setValue(null)
            if (!target) {
                if (!this._context._options.multipleDates ||
                    this._dates.length === 1 ||
                    isClear) {
                    this._context._unset = true;
                    this._dates = [];
                }
                else {
                    this._dates.splice(index, 1);
                }
                this._context._triggerEvent({
                    type: Namespace.events.change,
                    date: undefined,
                    oldDate,
                    isClear,
                    isValid: true,
                });
                updateInput();
                this._context._display._update('all');
                return;
            }
            index = index || 0;
            target = target.clone;
            // minute stepping is being used, force the minute to the closest value
            if (this._context._options.stepping !== 1) {
                target.minutes =
                    Math.round(target.minutes / this._context._options.stepping) *
                        this._context._options.stepping;
                target.seconds = 0;
            }
            if (this._context._validation.isValid(target)) {
                this._dates[index] = target;
                this._context._viewDate = target.clone;
                updateInput();
                this._context._unset = false;
                this._context._display._update('all');
                this._context._triggerEvent({
                    type: Namespace.events.change,
                    date: target,
                    oldDate,
                    isClear,
                    isValid: true,
                });
                return;
            }
            if (this._context._options.keepInvalid) {
                this._dates[index] = target;
                this._context._viewDate = target.clone;
                updateInput();
                this._context._triggerEvent({
                    type: Namespace.events.change,
                    date: target,
                    oldDate,
                    isClear,
                    isValid: false,
                });
            }
            this._context._triggerEvent({
                type: Namespace.events.error,
                reason: Namespace.errorMessages.failedToSetInvalidDate,
                date: target,
                oldDate,
            });
        }
        /**
         * Returns a format object based on the granularity of `unit`
         * @param unit
         */
        static getFormatByUnit(unit) {
            switch (unit) {
                case 'date':
                    return { dateStyle: 'short' };
                case 'month':
                    return {
                        month: 'numeric',
                        year: 'numeric',
                    };
                case 'year':
                    return { year: 'numeric' };
            }
        }
    }

    /**
     * Creates and updates the grid for `year`
     */
    class YearDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.yearsContainer);
            for (let i = 0; i < 12; i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectYear);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            Dates.getStartEndYear(10, this._context._viewDate.year);
            this._startYear = this._context._viewDate.clone.manipulate(-1, exports.Unit.year);
            this._endYear = this._context._viewDate.clone.manipulate(10, exports.Unit.year);
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.yearsContainer)[0];
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.yearsContainer, `${this._startYear.format({ year: 'numeric' })}-${this._endYear.format({ year: 'numeric' })}`);
            this._context._validation.isValid(this._startYear, exports.Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this._context._validation.isValid(this._endYear, exports.Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
            let innerDate = this._context._viewDate.clone
                .startOf(exports.Unit.year)
                .manipulate(-1, exports.Unit.year);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectYear}"]`)
                .forEach((containerClone, index) => {
                let classes = [];
                classes.push(Namespace.css.year);
                if (!this._context._unset &&
                    this._context.dates.isPicked(innerDate, exports.Unit.year)) {
                    classes.push(Namespace.css.active);
                }
                if (!this._context._validation.isValid(innerDate, exports.Unit.year)) {
                    classes.push(Namespace.css.disabled);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${innerDate.year}`);
                containerClone.innerText = innerDate.format({ year: "numeric" });
                innerDate.manipulate(1, exports.Unit.year);
            });
        }
    }

    /**
     * Creates and updates the grid for `seconds`
     */
    class DecadeDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.decadesContainer);
            for (let i = 0; i < 12; i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectDecade);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const [start, end] = Dates.getStartEndYear(100, this._context._viewDate.year);
            this._startDecade = this._context._viewDate.clone.startOf(exports.Unit.year);
            this._startDecade.year = start;
            this._endDecade = this._context._viewDate.clone.startOf(exports.Unit.year);
            this._endDecade.year = end;
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.decadesContainer)[0];
            const [previous, switcher, next] = container.parentElement
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switcher.setAttribute(Namespace.css.decadesContainer, `${this._startDecade.format({ year: 'numeric' })}-${this._endDecade.format({ year: 'numeric' })}`);
            this._context._validation.isValid(this._startDecade, exports.Unit.year)
                ? previous.classList.remove(Namespace.css.disabled)
                : previous.classList.add(Namespace.css.disabled);
            this._context._validation.isValid(this._endDecade, exports.Unit.year)
                ? next.classList.remove(Namespace.css.disabled)
                : next.classList.add(Namespace.css.disabled);
            const pickedYears = this._context.dates.picked.map((x) => x.year);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectDecade}"]`)
                .forEach((containerClone, index) => {
                if (index === 0) {
                    containerClone.classList.add(Namespace.css.old);
                    if (this._startDecade.year - 10 < 0) {
                        containerClone.textContent = ' ';
                        previous.classList.add(Namespace.css.disabled);
                        containerClone.classList.add(Namespace.css.disabled);
                        containerClone.setAttribute('data-value', ``);
                        return;
                    }
                    else {
                        containerClone.innerText = this._startDecade.clone.manipulate(-10, exports.Unit.year).format({ year: 'numeric' });
                        containerClone.setAttribute('data-value', `${this._startDecade.year}`);
                        return;
                    }
                }
                let classes = [];
                classes.push(Namespace.css.decade);
                const startDecadeYear = this._startDecade.year;
                const endDecadeYear = this._startDecade.year + 9;
                if (!this._context._unset &&
                    pickedYears.filter((x) => x >= startDecadeYear && x <= endDecadeYear)
                        .length > 0) {
                    classes.push(Namespace.css.active);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${this._startDecade.year}`);
                containerClone.innerText = `${this._startDecade.format({ year: 'numeric' })}`;
                this._startDecade.manipulate(10, exports.Unit.year);
            });
        }
    }

    /**
     * Creates the clock display
     */
    class TimeDisplay {
        constructor(context) {
            this._gridColumns = '';
            this._context = context;
        }
        /**
         * Build the container html for the clock display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.clockContainer);
            container.append(...this._grid());
            return container;
        }
        /**
         * Populates the various elements with in the clock display
         * like the current hour and if the manipulation icons are enabled.
         * @private
         */
        _update() {
            if (!this._context._display._hasTime)
                return;
            const timesDiv = (this._context._display.widget.getElementsByClassName(Namespace.css.clockContainer)[0]);
            const lastPicked = (this._context.dates.lastPicked || this._context._viewDate).clone;
            timesDiv
                .querySelectorAll('.disabled')
                .forEach((element) => element.classList.remove(Namespace.css.disabled));
            if (this._context._options.display.components.hours) {
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(1, exports.Unit.hours), exports.Unit.hours)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.incrementHours}]`)
                        .classList.add(Namespace.css.disabled);
                }
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(-1, exports.Unit.hours), exports.Unit.hours)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.decrementHours}]`)
                        .classList.add(Namespace.css.disabled);
                }
                timesDiv.querySelector(`[data-time-component=${exports.Unit.hours}]`).innerText = this._context._options.display.components.useTwentyfourHour
                    ? lastPicked.hoursFormatted
                    : lastPicked.twelveHoursFormatted;
            }
            if (this._context._options.display.components.minutes) {
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(1, exports.Unit.minutes), exports.Unit.minutes)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.incrementMinutes}]`)
                        .classList.add(Namespace.css.disabled);
                }
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(-1, exports.Unit.minutes), exports.Unit.minutes)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.decrementMinutes}]`)
                        .classList.add(Namespace.css.disabled);
                }
                timesDiv.querySelector(`[data-time-component=${exports.Unit.minutes}]`).innerText = lastPicked.minutesFormatted;
            }
            if (this._context._options.display.components.seconds) {
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(1, exports.Unit.seconds), exports.Unit.seconds)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.incrementSeconds}]`)
                        .classList.add(Namespace.css.disabled);
                }
                if (!this._context._validation.isValid(this._context._viewDate.clone.manipulate(-1, exports.Unit.seconds), exports.Unit.seconds)) {
                    timesDiv
                        .querySelector(`[data-action=${ActionTypes.decrementSeconds}]`)
                        .classList.add(Namespace.css.disabled);
                }
                timesDiv.querySelector(`[data-time-component=${exports.Unit.seconds}]`).innerText = lastPicked.secondsFormatted;
            }
            if (!this._context._options.display.components.useTwentyfourHour) {
                const toggle = timesDiv.querySelector(`[data-action=${ActionTypes.toggleMeridiem}]`);
                toggle.innerText = lastPicked.meridiem();
                if (!this._context._validation.isValid(lastPicked.clone.manipulate(lastPicked.hours >= 12 ? -12 : 12, exports.Unit.hours))) {
                    toggle.classList.add(Namespace.css.disabled);
                }
                else {
                    toggle.classList.remove(Namespace.css.disabled);
                }
            }
            timesDiv.style.gridTemplateAreas = `"${this._gridColumns}"`;
        }
        /**
         * Creates the table for the clock display depending on what options are selected.
         * @private
         */
        _grid() {
            this._gridColumns = '';
            const top = [], middle = [], bottom = [], separator = document.createElement('div'), upIcon = this._context._display._iconTag(this._context._options.display.icons.up), downIcon = this._context._display._iconTag(this._context._options.display.icons.down);
            separator.classList.add(Namespace.css.separator, Namespace.css.noHighlight);
            const separatorColon = separator.cloneNode(true);
            separatorColon.innerHTML = ':';
            const getSeparator = (colon = false) => {
                return colon
                    ? separatorColon.cloneNode(true)
                    : separator.cloneNode(true);
            };
            if (this._context._options.display.components.hours) {
                let divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.incrementHour);
                divElement.setAttribute('data-action', ActionTypes.incrementHours);
                divElement.appendChild(upIcon.cloneNode(true));
                top.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.pickHour);
                divElement.setAttribute('data-action', ActionTypes.showHours);
                divElement.setAttribute('data-time-component', exports.Unit.hours);
                middle.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.decrementHour);
                divElement.setAttribute('data-action', ActionTypes.decrementHours);
                divElement.appendChild(downIcon.cloneNode(true));
                bottom.push(divElement);
                this._gridColumns += 'a';
            }
            if (this._context._options.display.components.minutes) {
                this._gridColumns += ' a';
                if (this._context._options.display.components.hours) {
                    top.push(getSeparator());
                    middle.push(getSeparator(true));
                    bottom.push(getSeparator());
                    this._gridColumns += ' a';
                }
                let divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.incrementMinute);
                divElement.setAttribute('data-action', ActionTypes.incrementMinutes);
                divElement.appendChild(upIcon.cloneNode(true));
                top.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.pickMinute);
                divElement.setAttribute('data-action', ActionTypes.showMinutes);
                divElement.setAttribute('data-time-component', exports.Unit.minutes);
                middle.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.decrementMinute);
                divElement.setAttribute('data-action', ActionTypes.decrementMinutes);
                divElement.appendChild(downIcon.cloneNode(true));
                bottom.push(divElement);
            }
            if (this._context._options.display.components.seconds) {
                this._gridColumns += ' a';
                if (this._context._options.display.components.minutes) {
                    top.push(getSeparator());
                    middle.push(getSeparator(true));
                    bottom.push(getSeparator());
                    this._gridColumns += ' a';
                }
                let divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.incrementSecond);
                divElement.setAttribute('data-action', ActionTypes.incrementSeconds);
                divElement.appendChild(upIcon.cloneNode(true));
                top.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.pickSecond);
                divElement.setAttribute('data-action', ActionTypes.showSeconds);
                divElement.setAttribute('data-time-component', exports.Unit.seconds);
                middle.push(divElement);
                divElement = document.createElement('div');
                divElement.setAttribute('title', this._context._options.localization.decrementSecond);
                divElement.setAttribute('data-action', ActionTypes.decrementSeconds);
                divElement.appendChild(downIcon.cloneNode(true));
                bottom.push(divElement);
            }
            if (!this._context._options.display.components.useTwentyfourHour) {
                this._gridColumns += ' a';
                let divElement = getSeparator();
                top.push(divElement);
                let button = document.createElement('button');
                button.setAttribute('title', this._context._options.localization.toggleMeridiem);
                button.setAttribute('data-action', ActionTypes.toggleMeridiem);
                button.setAttribute('tabindex', '-1');
                button.classList.add(Namespace.css.toggleMeridiem);
                divElement = document.createElement('div');
                divElement.classList.add(Namespace.css.noHighlight);
                divElement.appendChild(button);
                middle.push(divElement);
                divElement = getSeparator();
                bottom.push(divElement);
            }
            this._gridColumns = this._gridColumns.trim();
            return [...top, ...middle, ...bottom];
        }
    }

    /**
     * Creates and updates the grid for `hours`
     */
    class HourDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.hourContainer);
            for (let i = 0; i <
                (this._context._options.display.components.useTwentyfourHour ? 24 : 12); i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectHour);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.hourContainer)[0];
            let innerDate = this._context._viewDate.clone.startOf(exports.Unit.date);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectHour}"]`)
                .forEach((containerClone, index) => {
                let classes = [];
                classes.push(Namespace.css.hour);
                if (!this._context._validation.isValid(innerDate, exports.Unit.hours)) {
                    classes.push(Namespace.css.disabled);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${innerDate.hours}`);
                containerClone.innerText = this._context._options.display.components
                    .useTwentyfourHour
                    ? innerDate.hoursFormatted
                    : innerDate.twelveHoursFormatted;
                innerDate.manipulate(1, exports.Unit.hours);
            });
        }
    }

    /**
     * Creates and updates the grid for `minutes`
     */
    class MinuteDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.minuteContainer);
            let step = this._context._options.stepping === 1
                ? 5
                : this._context._options.stepping;
            for (let i = 0; i < 60 / step; i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectMinute);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.minuteContainer)[0];
            let innerDate = this._context._viewDate.clone.startOf(exports.Unit.hours);
            let step = this._context._options.stepping === 1
                ? 5
                : this._context._options.stepping;
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectMinute}"]`)
                .forEach((containerClone, index) => {
                let classes = [];
                classes.push(Namespace.css.minute);
                if (!this._context._validation.isValid(innerDate, exports.Unit.minutes)) {
                    classes.push(Namespace.css.disabled);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${innerDate.minutesFormatted}`);
                containerClone.innerText = innerDate.minutesFormatted;
                innerDate.manipulate(step, exports.Unit.minutes);
            });
        }
    }

    /**
     * Creates and updates the grid for `seconds`
     */
    class secondDisplay {
        constructor(context) {
            this._context = context;
        }
        /**
         * Build the container html for the display
         * @private
         */
        get _picker() {
            const container = document.createElement('div');
            container.classList.add(Namespace.css.secondContainer);
            for (let i = 0; i < 12; i++) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.selectSecond);
                container.appendChild(div);
            }
            return container;
        }
        /**
         * Populates the grid and updates enabled states
         * @private
         */
        _update() {
            const container = this._context._display.widget.getElementsByClassName(Namespace.css.secondContainer)[0];
            let innerDate = this._context._viewDate.clone.startOf(exports.Unit.minutes);
            container
                .querySelectorAll(`[data-action="${ActionTypes.selectSecond}"]`)
                .forEach((containerClone, index) => {
                let classes = [];
                classes.push(Namespace.css.second);
                if (!this._context._validation.isValid(innerDate, exports.Unit.seconds)) {
                    classes.push(Namespace.css.disabled);
                }
                containerClone.classList.remove(...containerClone.classList);
                containerClone.classList.add(...classes);
                containerClone.setAttribute('data-value', `${innerDate.seconds}`);
                containerClone.innerText = innerDate.secondsFormatted;
                innerDate.manipulate(5, exports.Unit.seconds);
            });
        }
    }

    /**
     * Main class for all things display related.
     */
    class Display {
        constructor(context) {
            this._isVisible = false;
            /**
             * A document click event to hide the widget if click is outside
             * @private
             * @param e MouseEvent
             */
            this._documentClickEvent = (e) => {
                var _a;
                if (this._context._options.debug || window.debug)
                    return;
                if (this._isVisible &&
                    !e.composedPath().includes(this.widget) && // click inside the widget
                    !((_a = e.composedPath()) === null || _a === void 0 ? void 0 : _a.includes(this._context._element)) // click on the element
                ) {
                    this.hide();
                }
            };
            /**
             * Click event for any action like selecting a date
             * @param e MouseEvent
             * @private
             */
            this._actionsClickEvent = (e) => {
                this._context._action.do(e);
            };
            this._context = context;
            this._dateDisplay = new DateDisplay(context);
            this._monthDisplay = new MonthDisplay(context);
            this._yearDisplay = new YearDisplay(context);
            this._decadeDisplay = new DecadeDisplay(context);
            this._timeDisplay = new TimeDisplay(context);
            this._hourDisplay = new HourDisplay(context);
            this._minuteDisplay = new MinuteDisplay(context);
            this._secondDisplay = new secondDisplay(context);
            this._widget = undefined;
        }
        /**
         * Returns the widget body or undefined
         * @private
         */
        get widget() {
            return this._widget;
        }
        /**
         * Returns this visible state of the picker (shown)
         */
        get isVisible() {
            return this._isVisible;
        }
        /**
         * Updates the table for a particular unit. Used when an option as changed or
         * whenever the class list might need to be refreshed.
         * @param unit
         * @private
         */
        _update(unit) {
            if (!this.widget)
                return;
            //todo do I want some kind of error catching or other guards here?
            switch (unit) {
                case exports.Unit.seconds:
                    this._secondDisplay._update();
                    break;
                case exports.Unit.minutes:
                    this._minuteDisplay._update();
                    break;
                case exports.Unit.hours:
                    this._hourDisplay._update();
                    break;
                case exports.Unit.date:
                    this._dateDisplay._update();
                    break;
                case exports.Unit.month:
                    this._monthDisplay._update();
                    break;
                case exports.Unit.year:
                    this._yearDisplay._update();
                    break;
                case 'clock':
                    if (!this._hasTime)
                        break;
                    this._timeDisplay._update();
                    this._update(exports.Unit.hours);
                    this._update(exports.Unit.minutes);
                    this._update(exports.Unit.seconds);
                    break;
                case 'calendar':
                    this._update(exports.Unit.date);
                    this._update(exports.Unit.year);
                    this._update(exports.Unit.month);
                    this._decadeDisplay._update();
                    this._updateCalendarHeader();
                    break;
                case 'all':
                    if (this._hasTime) {
                        this._update('clock');
                    }
                    if (this._hasDate) {
                        this._update('calendar');
                    }
            }
        }
        /**
         * Shows the picker and creates a Popper instance if needed.
         * Add document click event to hide when clicking outside the picker.
         * @fires Events#show
         */
        show() {
            var _a, _b, _c;
            if (this.widget == undefined) {
                if (this._context._options.useCurrent &&
                    !this._context._options.defaultDate &&
                    !((_a = this._context._input) === null || _a === void 0 ? void 0 : _a.value)) {
                    //todo in the td4 branch a pr changed this to allow granularity
                    const date = new DateTime().setLocale(this._context._options.localization.locale);
                    if (!this._context._options.keepInvalid) {
                        let tries = 0;
                        let direction = 1;
                        if ((_b = this._context._options.restrictions.maxDate) === null || _b === void 0 ? void 0 : _b.isBefore(date)) {
                            direction = -1;
                        }
                        while (!this._context._validation.isValid(date)) {
                            date.manipulate(direction, exports.Unit.date);
                            if (tries > 31)
                                break;
                            tries++;
                        }
                    }
                    this._context.dates._setValue(date);
                }
                if (this._context._options.defaultDate) {
                    this._context.dates._setValue(this._context._options.defaultDate);
                }
                this._buildWidget();
                // If modeView is only clock
                const onlyClock = this._hasTime && !this._hasDate;
                // reset the view to the clock if there's no date components
                if (onlyClock) {
                    this._context._action.do(null, ActionTypes.showClock);
                }
                // otherwise return to the calendar view
                this._context._currentViewMode = this._context._minViewModeNumber;
                if (!onlyClock) {
                    if (this._hasTime) {
                        Collapse.hide(this._context._display.widget.querySelector(`div.${Namespace.css.timeContainer}`));
                    }
                    Collapse.show(this._context._display.widget.querySelector(`div.${Namespace.css.dateContainer}`));
                }
                if (this._hasDate) {
                    this._showMode();
                }
                if (!this._context._options.display.inline) {
                    // If needed to change the parent container
                    const container = ((_c = this._context._options) === null || _c === void 0 ? void 0 : _c.container) || document.body;
                    container.appendChild(this.widget);
                    this._popperInstance = core.createPopper(this._context._element, this.widget, {
                        modifiers: [{ name: 'eventListeners', enabled: true }],
                        //#2400
                        placement: document.documentElement.dir === 'rtl'
                            ? 'bottom-end'
                            : 'bottom-start'
                    });
                }
                else {
                    this._context._element.appendChild(this.widget);
                }
                if (this._context._options.display.viewMode == 'clock') {
                    this._context._action.do(null, ActionTypes.showClock);
                }
                this.widget
                    .querySelectorAll('[data-action]')
                    .forEach((element) => element.addEventListener('click', this._actionsClickEvent));
                // show the clock when using sideBySide
                if (this._context._options.display.sideBySide) {
                    this._timeDisplay._update();
                    this.widget.getElementsByClassName(Namespace.css.clockContainer)[0].style.display = 'grid';
                }
            }
            this.widget.classList.add(Namespace.css.show);
            if (!this._context._options.display.inline) {
                this._popperInstance.update();
                document.addEventListener('click', this._documentClickEvent);
            }
            this._context._triggerEvent({ type: Namespace.events.show });
            this._isVisible = true;
        }
        /**
         * Changes the calendar view mode. E.g. month <-> year
         * @param direction -/+ number to move currentViewMode
         * @private
         */
        _showMode(direction) {
            if (!this.widget) {
                return;
            }
            if (direction) {
                const max = Math.max(this._context._minViewModeNumber, Math.min(3, this._context._currentViewMode + direction));
                if (this._context._currentViewMode == max)
                    return;
                this._context._currentViewMode = max;
            }
            this.widget
                .querySelectorAll(`.${Namespace.css.dateContainer} > div:not(.${Namespace.css.calendarHeader}), .${Namespace.css.timeContainer} > div:not(.${Namespace.css.clockContainer})`)
                .forEach((e) => (e.style.display = 'none'));
            const datePickerMode = DatePickerModes[this._context._currentViewMode];
            let picker = this.widget.querySelector(`.${datePickerMode.className}`);
            switch (datePickerMode.className) {
                case Namespace.css.decadesContainer:
                    this._decadeDisplay._update();
                    break;
                case Namespace.css.yearsContainer:
                    this._yearDisplay._update();
                    break;
                case Namespace.css.monthsContainer:
                    this._monthDisplay._update();
                    break;
                case Namespace.css.daysContainer:
                    this._dateDisplay._update();
                    break;
            }
            picker.style.display = 'grid';
            this._updateCalendarHeader();
        }
        _updateCalendarHeader() {
            const showing = [
                ...this.widget.querySelector(`.${Namespace.css.dateContainer} div[style*="display: grid"]`).classList
            ].find((x) => x.startsWith(Namespace.css.dateContainer));
            const [previous, switcher, next] = this._context._display.widget
                .getElementsByClassName(Namespace.css.calendarHeader)[0]
                .getElementsByTagName('div');
            switch (showing) {
                case Namespace.css.decadesContainer:
                    previous.setAttribute('title', this._context._options.localization.previousCentury);
                    switcher.setAttribute('title', '');
                    next.setAttribute('title', this._context._options.localization.nextCentury);
                    break;
                case Namespace.css.yearsContainer:
                    previous.setAttribute('title', this._context._options.localization.previousDecade);
                    switcher.setAttribute('title', this._context._options.localization.selectDecade);
                    next.setAttribute('title', this._context._options.localization.nextDecade);
                    break;
                case Namespace.css.monthsContainer:
                    previous.setAttribute('title', this._context._options.localization.previousYear);
                    switcher.setAttribute('title', this._context._options.localization.selectYear);
                    next.setAttribute('title', this._context._options.localization.nextYear);
                    break;
                case Namespace.css.daysContainer:
                    previous.setAttribute('title', this._context._options.localization.previousMonth);
                    switcher.setAttribute('title', this._context._options.localization.selectMonth);
                    next.setAttribute('title', this._context._options.localization.nextMonth);
                    switcher.innerText = this._context._viewDate.format(this._context._options.localization.dayViewHeaderFormat);
                    break;
            }
            switcher.innerText = switcher.getAttribute(showing);
        }
        /**
         * Hides the picker if needed.
         * Remove document click event to hide when clicking outside the picker.
         * @fires Events#hide
         */
        hide() {
            if (!this.widget || !this._isVisible)
                return;
            this.widget.classList.remove(Namespace.css.show);
            if (this._isVisible) {
                this._context._triggerEvent({
                    type: Namespace.events.hide,
                    date: this._context._unset
                        ? null
                        : this._context.dates.lastPicked
                            ? this._context.dates.lastPicked.clone
                            : void 0
                });
                this._isVisible = false;
            }
            document.removeEventListener('click', this._documentClickEvent);
        }
        /**
         * Toggles the picker's open state. Fires a show/hide event depending.
         */
        toggle() {
            return this._isVisible ? this.hide() : this.show();
        }
        /**
         * Removes document and data-action click listener and reset the widget
         * @private
         */
        _dispose() {
            document.removeEventListener('click', this._documentClickEvent);
            if (!this.widget)
                return;
            this.widget
                .querySelectorAll('[data-action]')
                .forEach((element) => element.removeEventListener('click', this._actionsClickEvent));
            this.widget.parentNode.removeChild(this.widget);
            this._widget = undefined;
        }
        /**
         * Builds the widgets html template.
         * @private
         */
        _buildWidget() {
            const template = document.createElement('div');
            template.classList.add(Namespace.css.widget);
            const dateView = document.createElement('div');
            dateView.classList.add(Namespace.css.dateContainer);
            dateView.append(this._headTemplate, this._decadeDisplay._picker, this._yearDisplay._picker, this._monthDisplay._picker, this._dateDisplay._picker);
            const timeView = document.createElement('div');
            timeView.classList.add(Namespace.css.timeContainer);
            timeView.appendChild(this._timeDisplay._picker);
            timeView.appendChild(this._hourDisplay._picker);
            timeView.appendChild(this._minuteDisplay._picker);
            timeView.appendChild(this._secondDisplay._picker);
            const toolbar = document.createElement('div');
            toolbar.classList.add(Namespace.css.toolbar);
            toolbar.append(...this._toolbar);
            if (this._context._options.display.inline) {
                template.classList.add(Namespace.css.inline);
            }
            if (this._context._options.display.calendarWeeks) {
                template.classList.add('calendarWeeks');
            }
            if (this._context._options.display.sideBySide &&
                this._hasDate &&
                this._hasTime) {
                template.classList.add(Namespace.css.sideBySide);
                if (this._context._options.display.toolbarPlacement === 'top') {
                    template.appendChild(toolbar);
                }
                const row = document.createElement('div');
                row.classList.add('td-row');
                dateView.classList.add('td-half');
                timeView.classList.add('td-half');
                row.appendChild(dateView);
                row.appendChild(timeView);
                template.appendChild(row);
                if (this._context._options.display.toolbarPlacement === 'bottom') {
                    template.appendChild(toolbar);
                }
                this._widget = template;
                return;
            }
            if (this._context._options.display.toolbarPlacement === 'top') {
                template.appendChild(toolbar);
            }
            if (this._hasDate) {
                if (this._hasTime) {
                    dateView.classList.add(Namespace.css.collapse);
                    if (this._context._options.display.viewMode !== 'clock')
                        dateView.classList.add(Namespace.css.show);
                }
                template.appendChild(dateView);
            }
            if (this._hasTime) {
                if (this._hasDate) {
                    timeView.classList.add(Namespace.css.collapse);
                    if (this._context._options.display.viewMode === 'clock')
                        timeView.classList.add(Namespace.css.show);
                }
                template.appendChild(timeView);
            }
            if (this._context._options.display.toolbarPlacement === 'bottom') {
                template.appendChild(toolbar);
            }
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.setAttribute('data-popper-arrow', '');
            template.appendChild(arrow);
            this._widget = template;
        }
        /**
         * Returns true if the hours, minutes, or seconds component is turned on
         */
        get _hasTime() {
            return (this._context._options.display.components.clock &&
                (this._context._options.display.components.hours ||
                    this._context._options.display.components.minutes ||
                    this._context._options.display.components.seconds));
        }
        /**
         * Returns true if the year, month, or date component is turned on
         */
        get _hasDate() {
            return (this._context._options.display.components.calendar &&
                (this._context._options.display.components.year ||
                    this._context._options.display.components.month ||
                    this._context._options.display.components.date));
        }
        /**
         * Get the toolbar html based on options like buttons.today
         * @private
         */
        get _toolbar() {
            const toolbar = [];
            if (this._context._options.display.buttons.today) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.today);
                div.setAttribute('title', this._context._options.localization.today);
                div.appendChild(this._iconTag(this._context._options.display.icons.today));
                toolbar.push(div);
            }
            if (!this._context._options.display.sideBySide &&
                this._hasDate &&
                this._hasTime) {
                let title, icon;
                if (this._context._options.display.viewMode === 'clock') {
                    title = this._context._options.localization.selectDate;
                    icon = this._context._options.display.icons.date;
                }
                else {
                    title = this._context._options.localization.selectTime;
                    icon = this._context._options.display.icons.time;
                }
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.togglePicker);
                div.setAttribute('title', title);
                div.appendChild(this._iconTag(icon));
                toolbar.push(div);
            }
            if (this._context._options.display.buttons.clear) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.clear);
                div.setAttribute('title', this._context._options.localization.clear);
                div.appendChild(this._iconTag(this._context._options.display.icons.clear));
                toolbar.push(div);
            }
            if (this._context._options.display.buttons.close) {
                const div = document.createElement('div');
                div.setAttribute('data-action', ActionTypes.close);
                div.setAttribute('title', this._context._options.localization.close);
                div.appendChild(this._iconTag(this._context._options.display.icons.close));
                toolbar.push(div);
            }
            return toolbar;
        }
        /***
         * Builds the base header template with next and previous icons
         * @private
         */
        get _headTemplate() {
            const calendarHeader = document.createElement('div');
            calendarHeader.classList.add(Namespace.css.calendarHeader);
            const previous = document.createElement('div');
            previous.classList.add(Namespace.css.previous);
            previous.setAttribute('data-action', ActionTypes.previous);
            previous.appendChild(this._iconTag(this._context._options.display.icons.previous));
            const switcher = document.createElement('div');
            switcher.classList.add(Namespace.css.switch);
            switcher.setAttribute('data-action', ActionTypes.pickerSwitch);
            const next = document.createElement('div');
            next.classList.add(Namespace.css.next);
            next.setAttribute('data-action', ActionTypes.next);
            next.appendChild(this._iconTag(this._context._options.display.icons.next));
            calendarHeader.append(previous, switcher, next);
            return calendarHeader;
        }
        /**
         * Builds an icon tag as either an `<i>`
         * or with icons.type is `sprites` then an svg tag instead
         * @param iconClass
         * @private
         */
        _iconTag(iconClass) {
            if (this._context._options.display.icons.type === 'sprites') {
                const svg = document.createElement('svg');
                svg.innerHTML = `<use xlink:href='${iconClass}'></use>`;
                return svg;
            }
            const icon = document.createElement('i');
            DOMTokenList.prototype.add.apply(icon.classList, iconClass.split(' '));
            return icon;
        }
        /**
         * Causes the widget to get rebuilt on next show. If the picker is already open
         * then hide and reshow it.
         * @private
         */
        _rebuild() {
            const wasVisible = this._isVisible;
            if (wasVisible)
                this.hide();
            this._dispose();
            if (wasVisible) {
                this.show();
            }
        }
    }

    /**
     * Main class for date validation rules based on the options provided.
     */
    class Validation {
        constructor(context) {
            this._context = context;
        }
        /**
         * Checks to see if the target date is valid based on the rules provided in the options.
         * Granularity can be provide to chek portions of the date instead of the whole.
         * @param targetDate
         * @param granularity
         */
        isValid(targetDate, granularity) {
            var _a;
            if (this._context._options.restrictions.disabledDates.length > 0 &&
                this._isInDisabledDates(targetDate)) {
                return false;
            }
            if (this._context._options.restrictions.enabledDates.length > 0 &&
                !this._isInEnabledDates(targetDate)) {
                return false;
            }
            if (granularity !== exports.Unit.month &&
                granularity !== exports.Unit.year &&
                ((_a = this._context._options.restrictions.daysOfWeekDisabled) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                this._context._options.restrictions.daysOfWeekDisabled.indexOf(targetDate.weekDay) !== -1) {
                return false;
            }
            if (this._context._options.restrictions.minDate &&
                targetDate.isBefore(this._context._options.restrictions.minDate, granularity)) {
                return false;
            }
            if (this._context._options.restrictions.maxDate &&
                targetDate.isAfter(this._context._options.restrictions.maxDate, granularity)) {
                return false;
            }
            if (granularity === exports.Unit.hours ||
                granularity === exports.Unit.minutes ||
                granularity === exports.Unit.seconds) {
                if (this._context._options.restrictions.disabledHours.length > 0 &&
                    this._isInDisabledHours(targetDate)) {
                    return false;
                }
                if (this._context._options.restrictions.enabledHours.length > 0 &&
                    !this._isInEnabledHours(targetDate)) {
                    return false;
                }
                if (this._context._options.restrictions.disabledTimeIntervals.length > 0) {
                    for (let i = 0; i < this._context._options.restrictions.disabledTimeIntervals.length; i++) {
                        if (targetDate.isBetween(this._context._options.restrictions.disabledTimeIntervals[i].from, this._context._options.restrictions.disabledTimeIntervals[i].to))
                            return false;
                    }
                }
            }
            return true;
        }
        /**
         * Checks to see if the disabledDates option is in use and returns true (meaning invalid)
         * if the `testDate` is with in the array. Granularity is by date.
         * @param testDate
         * @private
         */
        _isInDisabledDates(testDate) {
            if (!this._context._options.restrictions.disabledDates ||
                this._context._options.restrictions.disabledDates.length === 0)
                return false;
            const formattedDate = testDate.format(Dates.getFormatByUnit(exports.Unit.date));
            return this._context._options.restrictions.disabledDates
                .map((x) => x.format(Dates.getFormatByUnit(exports.Unit.date)))
                .find((x) => x === formattedDate);
        }
        /**
         * Checks to see if the enabledDates option is in use and returns true (meaning valid)
         * if the `testDate` is with in the array. Granularity is by date.
         * @param testDate
         * @private
         */
        _isInEnabledDates(testDate) {
            if (!this._context._options.restrictions.enabledDates ||
                this._context._options.restrictions.enabledDates.length === 0)
                return true;
            const formattedDate = testDate.format(Dates.getFormatByUnit(exports.Unit.date));
            return this._context._options.restrictions.enabledDates
                .map((x) => x.format(Dates.getFormatByUnit(exports.Unit.date)))
                .find((x) => x === formattedDate);
        }
        /**
         * Checks to see if the disabledHours option is in use and returns true (meaning invalid)
         * if the `testDate` is with in the array. Granularity is by hours.
         * @param testDate
         * @private
         */
        _isInDisabledHours(testDate) {
            if (!this._context._options.restrictions.disabledHours ||
                this._context._options.restrictions.disabledHours.length === 0)
                return false;
            const formattedDate = testDate.hours;
            return this._context._options.restrictions.disabledHours.find((x) => x === formattedDate);
        }
        /**
         * Checks to see if the enabledHours option is in use and returns true (meaning valid)
         * if the `testDate` is with in the array. Granularity is by hours.
         * @param testDate
         * @private
         */
        _isInEnabledHours(testDate) {
            if (!this._context._options.restrictions.enabledHours ||
                this._context._options.restrictions.enabledHours.length === 0)
                return true;
            const formattedDate = testDate.hours;
            return this._context._options.restrictions.enabledHours.find((x) => x === formattedDate);
        }
    }

    /**
     * A robust and powerful date/time picker component.
     */
    class TempusDominus {
        constructor(element, options = {}) {
            this._currentViewMode = 0;
            this._subscribers = {};
            this._minViewModeNumber = 0;
            this._isDisabled = false;
            this._notifyChangeEventContext = 0;
            this._viewDate = new DateTime();
            /**
             * Event for when the input field changes. This is a class level method so there's
             * something for the remove listener function.
             * @private
             */
            this._inputChangeEvent = () => {
                const setViewDate = () => {
                    if (this.dates.lastPicked)
                        this._viewDate = this.dates.lastPicked;
                };
                const value = this._input.value;
                if (this._options.multipleDates) {
                    try {
                        const valueSplit = value.split(this._options.multipleDatesSeparator);
                        for (let i = 0; i < valueSplit.length; i++) {
                            if (this._options.hooks.inputParse) {
                                this.dates.set(this._options.hooks.inputParse(this, valueSplit[i]), i, 'input');
                            }
                            else {
                                this.dates.set(valueSplit[i], i, 'input');
                            }
                        }
                        setViewDate();
                    }
                    catch (_a) {
                        console.warn('TD: Something went wrong trying to set the multidate values from the input field.');
                    }
                }
                else {
                    if (this._options.hooks.inputParse) {
                        this.dates.set(this._options.hooks.inputParse(this, value), 0, 'input');
                    }
                    else {
                        this.dates.set(value, 0, 'input');
                    }
                    setViewDate();
                }
            };
            /**
             * Event for when the toggle is clicked. This is a class level method so there's
             * something for the remove listener function.
             * @private
             */
            this._toggleClickEvent = () => {
                this.toggle();
            };
            if (!element) {
                Namespace.errorMessages.mustProvideElement;
            }
            this._element = element;
            this._options = this._initializeOptions(options, DefaultOptions, true);
            this._viewDate.setLocale(this._options.localization.locale);
            this._unset = true;
            this._display = new Display(this);
            this._validation = new Validation(this);
            this.dates = new Dates(this);
            this._action = new Actions(this);
            this._initializeInput();
            this._initializeToggle();
            if (this._options.display.inline)
                this._display.show();
        }
        get viewDate() {
            return this._viewDate;
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Update the picker options. If `reset` is provide `options` will be merged with DefaultOptions instead.
         * @param options
         * @param reset
         * @public
         */
        updateOptions(options, reset = false) {
            if (reset)
                this._options = this._initializeOptions(options, DefaultOptions);
            else
                this._options = this._initializeOptions(options, this._options);
            this._display._rebuild();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Toggles the picker open or closed. If the picker is disabled, nothing will happen.
         * @public
         */
        toggle() {
            if (this._isDisabled)
                return;
            this._display.toggle();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Shows the picker unless the picker is disabled.
         * @public
         */
        show() {
            if (this._isDisabled)
                return;
            this._display.show();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Hides the picker unless the picker is disabled.
         * @public
         */
        hide() {
            this._display.hide();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Disables the picker and the target input field.
         * @public
         */
        disable() {
            var _a;
            this._isDisabled = true;
            // todo this might be undesired. If a dev disables the input field to
            // only allow using the picker, this will break that.
            (_a = this._input) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'disabled');
            this._display.hide();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Enables the picker and the target input field.
         * @public
         */
        enable() {
            var _a;
            this._isDisabled = false;
            (_a = this._input) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Clears all the selected dates
         * @public
         */
        clear() {
            this.dates.clear();
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Allows for a direct subscription to picker events, without having to use addEventListener on the element.
         * @param eventTypes See Namespace.Events
         * @param callbacks Function to call when event is triggered
         * @public
         */
        subscribe(eventTypes, callbacks) {
            if (typeof eventTypes === 'string') {
                eventTypes = [eventTypes];
            }
            let callBackArray = [];
            if (!Array.isArray(callbacks)) {
                callBackArray = [callbacks];
            }
            else {
                callBackArray = callbacks;
            }
            if (eventTypes.length !== callBackArray.length) {
                Namespace.errorMessages.subscribeMismatch;
            }
            const returnArray = [];
            for (let i = 0; i < eventTypes.length; i++) {
                const eventType = eventTypes[i];
                if (!Array.isArray(this._subscribers[eventType])) {
                    this._subscribers[eventType] = [];
                }
                this._subscribers[eventType].push(callBackArray[i]);
                returnArray.push({
                    unsubscribe: this._unsubscribe.bind(this, eventType, this._subscribers[eventType].length - 1),
                });
                if (eventTypes.length === 1) {
                    return returnArray[0];
                }
            }
            return returnArray;
        }
        // noinspection JSUnusedGlobalSymbols
        /**
         * Hides the picker and removes event listeners
         */
        dispose() {
            var _a, _b;
            this._display.hide();
            // this will clear the document click event listener
            this._display._dispose();
            (_a = this._input) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this._inputChangeEvent);
            if (this._options.allowInputToggle) {
                (_b = this._input) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this._toggleClickEvent);
            }
            this._toggle.removeEventListener('click', this._toggleClickEvent);
            this._subscribers = {};
        }
        /**
         * Triggers an event like ChangeEvent when the picker has updated the value
         * of a selected date.
         * @param event Accepts a BaseEvent object.
         * @private
         */
        _triggerEvent(event) {
            // checking hasOwnProperty because the BasicEvent also falls through here otherwise
            if (event && event.hasOwnProperty('date')) {
                const { date, oldDate, isClear } = event;
                // this was to prevent a max call stack error
                // https://github.com/tempusdominus/core/commit/15a280507f5277b31b0b3319ab1edc7c19a000fb
                // todo see if this is still needed or if there's a cleaner way
                this._notifyChangeEventContext++;
                if ((date && oldDate && date.isSame(oldDate)) ||
                    (!isClear && !date && !oldDate) ||
                    this._notifyChangeEventContext > 1) {
                    this._notifyChangeEventContext = 0;
                    return;
                }
                this._handleAfterChangeEvent(event);
            }
            this._element.dispatchEvent(new CustomEvent(event.type, { detail: event }));
            if (window.jQuery) {
                const $ = window.jQuery;
                $(this._element).trigger(event);
            }
            const publish = () => {
                // return if event is not subscribed
                if (!Array.isArray(this._subscribers[event.type])) {
                    return;
                }
                // Trigger callback for each subscriber
                this._subscribers[event.type].forEach((callback) => {
                    callback(event);
                });
            };
            publish();
            this._notifyChangeEventContext = 0;
        }
        /**
         * Fires a ViewUpdate event when, for example, the month view is changed.
         * @param {Unit} unit
         * @private
         */
        _viewUpdate(unit) {
            this._triggerEvent({
                type: Namespace.events.update,
                change: unit,
                viewDate: this._viewDate.clone,
            });
        }
        _unsubscribe(eventName, index) {
            this._subscribers[eventName].splice(index, 1);
        }
        /**
         * Merges two Option objects together and validates options type
         * @param config new Options
         * @param mergeTo Options to merge into
         * @param includeDataset When true, the elements data-td attributes will be included in the
         * @private
         */
        _initializeOptions(config, mergeTo, includeDataset = false) {
            var _a;
            config = OptionConverter._mergeOptions(config, mergeTo);
            if (includeDataset)
                config = OptionConverter._dataToOptions(this._element, config);
            OptionConverter._validateConflcits(config);
            config.viewDate = config.viewDate.setLocale(config.localization.locale);
            if (!this._viewDate.isSame(config.viewDate)) {
                this._viewDate = config.viewDate;
            }
            /**
             * Sets the minimum view allowed by the picker. For example the case of only
             * allowing year and month to be selected but not date.
             */
            if (config.display.components.year) {
                this._minViewModeNumber = 2;
            }
            if (config.display.components.month) {
                this._minViewModeNumber = 1;
            }
            if (config.display.components.date) {
                this._minViewModeNumber = 0;
            }
            this._currentViewMode = Math.max(this._minViewModeNumber, this._currentViewMode);
            // Update view mode if needed
            if (DatePickerModes[this._currentViewMode].name !== config.display.viewMode) {
                this._currentViewMode = Math.max(DatePickerModes.findIndex((x) => x.name === config.display.viewMode), this._minViewModeNumber);
            }
            // defaults the input format based on the components enabled
            if (config.hooks.inputFormat === undefined) {
                const components = config.display.components;
                config.hooks.inputFormat = (_, date) => {
                    if (!date)
                        return '';
                    return date.format({
                        year: components.calendar && components.year ? 'numeric' : undefined,
                        month: components.calendar && components.month ? '2-digit' : undefined,
                        day: components.calendar && components.date ? '2-digit' : undefined,
                        hour: components.clock && components.hours
                            ? components.useTwentyfourHour
                                ? '2-digit'
                                : 'numeric'
                            : undefined,
                        minute: components.clock && components.minutes ? '2-digit' : undefined,
                        second: components.clock && components.seconds ? '2-digit' : undefined,
                        hour12: !components.useTwentyfourHour,
                    });
                };
            }
            if ((_a = this._display) === null || _a === void 0 ? void 0 : _a.isVisible) {
                this._display._update('all');
            }
            return config;
        }
        /**
         * Checks if an input field is being used, attempts to locate one and sets an
         * event listener if found.
         * @private
         */
        _initializeInput() {
            if (this._element.tagName == 'INPUT') {
                this._input = this._element;
            }
            else {
                let query = this._element.dataset.tdTargetInput;
                if (query == undefined || query == 'nearest') {
                    this._input = this._element.querySelector('input');
                }
                else {
                    this._input = this._element.querySelector(query);
                }
            }
            if (!this._input)
                return;
            this._input.addEventListener('change', this._inputChangeEvent);
            if (this._options.allowInputToggle) {
                this._input.addEventListener('click', this._toggleClickEvent);
            }
            if (this._input.value) {
                this._inputChangeEvent();
            }
        }
        /**
         * Attempts to locate a toggle for the picker and sets an event listener
         * @private
         */
        _initializeToggle() {
            if (this._options.display.inline)
                return;
            let query = this._element.dataset.tdTargetToggle;
            if (query == 'nearest') {
                query = '[data-td-toggle="datetimepicker"]';
            }
            this._toggle =
                query == undefined ? this._element : this._element.querySelector(query);
            this._toggle.addEventListener('click', this._toggleClickEvent);
        }
        /**
         * If the option is enabled this will render the clock view after a date pick.
         * @param e change event
         * @private
         */
        _handleAfterChangeEvent(e) {
            var _a, _b;
            if (
            // options is disabled
            !this._options.promptTimeOnDateChange ||
                this._options.display.inline ||
                this._options.display.sideBySide ||
                // time is disabled
                !this._display._hasTime ||
                (
                // clock component is already showing
                (_a = this._display.widget) === null || _a === void 0 ? void 0 : _a.getElementsByClassName(Namespace.css.show)[0].classList.contains(Namespace.css.timeContainer)))
                return;
            // First time ever. If useCurrent option is set to true (default), do nothing
            // because the first date is selected automatically.
            // or date didn't change (time did) or date changed because time did.
            if ((!e.oldDate && this._options.useCurrent) ||
                (e.oldDate && ((_b = e.date) === null || _b === void 0 ? void 0 : _b.isSame(e.oldDate)))) {
                return;
            }
            clearTimeout(this._currentPromptTimeTimeout);
            this._currentPromptTimeTimeout = setTimeout(() => {
                if (this._display.widget) {
                    this._action.do({
                        currentTarget: this._display.widget.querySelector(`.${Namespace.css.switch} div`),
                    }, ActionTypes.togglePicker);
                }
            }, this._options.promptTimeOnDateChangeTransitionDelay);
        }
    }

    exports.DateTime = DateTime;
    exports.DefaultOptions = DefaultOptions;
    exports.Namespace = Namespace;
    exports.TempusDominus = TempusDominus;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempus-dominus.js.map
