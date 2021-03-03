import * as $type from "../utils/Type";
/**
 * Maps time period names to their numeric representations in milliseconds.
 *
 * @ignore Exclude from docs
 */
export var timeUnitDurations = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2592000000,
    year: 31536000000
};
/**
 * Returns the next time unit that goes after source `unit`.
 *
 * E.g. "hour" is the next unit after "minute", etc.
 *
 * @ignore Exclude from docs
 * @param unit  Source time unit
 * @return Next time unit
 */
export function getNextUnit(unit) {
    switch (unit) {
        case "year":
            return;
        case "month":
            return "year";
        case "week":
            return "month";
        case "day":
            return "month"; // not a mistake
        case "hour":
            return "day";
        case "minute":
            return "hour";
        case "second":
            return "minute";
        case "millisecond":
            return "second";
    }
}
/**
 * Returns number of milliseconds in the `count` of time `unit`.
 *
 * Available units: "millisecond", "second", "minute", "hour", "day", "week",
 * "month", and "year".
 *
 * @ignore Exclude from docs
 * @param unit   Time unit
 * @param count  Number of units
 * @return Milliseconds
 */
export function getDuration(unit, count) {
    if (!$type.hasValue(count)) {
        count = 1;
    }
    return timeUnitDurations[unit] * count;
}
/**
 * Returns current `Date` object.
 *
 * @return Current date
 */
export function now() {
    return new Date();
}
/**
 * Returns current timestamp.
 *
 * @return Current timestamp
 */
export function getTime() {
    return now().getTime();
}
/**
 * Returns a copy of the `Date` object.
 *
 * @ignore Exclude from docs
 * @param date  Source date
 * @return Copy
 */
export function copy(date) {
    return new Date(date.getTime()); // todo: check if this is ok. new Date(date) used to strip milliseconds on FF in v3
}
/**
 * Checks if the `unit` part of two `Date` objects do not match. Two dates
 * represent a "range" of time, rather the same time date.
 *
 * @ignore Exclude from docs
 * @param dateOne  Date 1
 * @param dateTwo  Date 2
 * @param unit     Time unit to check
 * @return Range?
 */
export function checkChange(dateOne, dateTwo, unit, utc) {
    dateOne = new Date(dateOne.getTime());
    dateTwo = new Date(dateTwo.getTime());
    var timeZoneOffset1 = 0;
    var timeZoneOffset2 = 0;
    if (!utc && unit != "millisecond") {
        timeZoneOffset1 = dateOne.getTimezoneOffset();
        dateOne.setUTCMinutes(dateOne.getUTCMinutes() - timeZoneOffset1);
        timeZoneOffset2 = dateTwo.getTimezoneOffset();
        dateTwo.setUTCMinutes(dateTwo.getUTCMinutes() - timeZoneOffset2);
    }
    var changed = false;
    switch (unit) {
        case "year":
            if (dateOne.getUTCFullYear() != dateTwo.getUTCFullYear()) {
                changed = true;
            }
            break;
        case "month":
            if (dateOne.getUTCFullYear() != dateTwo.getUTCFullYear()) {
                changed = true;
            }
            else if (dateOne.getUTCMonth() != dateTwo.getUTCMonth()) {
                changed = true;
            }
            break;
        case "day":
            if (dateOne.getUTCMonth() != dateTwo.getUTCMonth()) {
                changed = true;
            }
            else if (dateOne.getUTCDate() != dateTwo.getUTCDate()) {
                changed = true;
            }
            break;
        case "hour":
            if (dateOne.getUTCHours() != dateTwo.getUTCHours()) {
                changed = true;
            }
            break;
        case "minute":
            if (dateOne.getUTCMinutes() != dateTwo.getUTCMinutes()) {
                changed = true;
            }
            break;
        case "second":
            if (dateOne.getUTCSeconds() != dateTwo.getUTCSeconds()) {
                changed = true;
            }
            break;
        case "millisecond":
            if (dateOne.getTime() != dateTwo.getTime()) {
                changed = true;
            }
            break;
    }
    if (changed) {
        return true;
    }
    var nextUnit = getNextUnit(unit);
    if (nextUnit) {
        dateOne.setUTCMinutes(dateOne.getUTCMinutes() + timeZoneOffset1);
        dateTwo.setUTCMinutes(dateTwo.getUTCMinutes() + timeZoneOffset2);
        return checkChange(dateOne, dateTwo, nextUnit, utc);
    }
    else {
        return false;
    }
}
/**
 * Adds `count` of time `unit` to the source date. Returns a modified `Date` object.
 *
 * @ignore Exclude from docs
 * @param date   Source date
 * @param unit   Time unit
 * @param count  Number of units to add
 * @return Modified date
 */
export function add(date, unit, count, utc) {
    var timeZoneOffset = 0;
    if (!utc && unit != "millisecond") {
        timeZoneOffset = date.getTimezoneOffset();
        date.setUTCMinutes(date.getUTCMinutes() - timeZoneOffset);
    }
    switch (unit) {
        case "day":
            var day = date.getUTCDate();
            date.setUTCDate(day + count);
            break;
        case "second":
            var seconds = date.getUTCSeconds();
            date.setUTCSeconds(seconds + count);
            break;
        case "millisecond":
            var milliseconds = date.getUTCMilliseconds();
            date.setUTCMilliseconds(milliseconds + count);
            break;
        case "hour":
            var hours = date.getUTCHours();
            date.setUTCHours(hours + count);
            break;
        case "minute":
            var minutes = date.getUTCMinutes();
            date.setUTCMinutes(minutes + count);
            break;
        case "year":
            var year = date.getUTCFullYear();
            date.setUTCFullYear(year + count);
            break;
        case "month":
            var month = date.getUTCMonth();
            date.setUTCMonth(month + count);
            break;
        case "week":
            var wday = date.getUTCDate();
            date.setUTCDate(wday + count * 7);
            break;
    }
    if (!utc && unit != "millisecond") {
        date.setUTCMinutes(date.getUTCMinutes() + timeZoneOffset);
        if (unit == "day" || unit == "week" || unit == "month" || unit == "year") {
            var newTimeZoneOffset = date.getTimezoneOffset();
            if (newTimeZoneOffset != timeZoneOffset) {
                var diff = newTimeZoneOffset - timeZoneOffset;
                date.setUTCMinutes(date.getUTCMinutes() + diff);
                // solves issues if newe time falls back to old time zone
                if (date.getTimezoneOffset() != newTimeZoneOffset) {
                    date.setUTCMinutes(date.getUTCMinutes() - diff);
                }
            }
        }
    }
    return date;
}
/**
 * "Rounds" the date to specific time unit.
 *
 * @ignore Exclude from docs
 * @param date             Source date
 * @param unit             Time unit
 * @param count            Number of units to round to
 * @param firstDateOfWeek  First day of week
 * @param roundMinutes     Minutes to round to (some timezones use non-whole hour)
 * @param timezone         Use specific named timezone when rounding
 * @return New date
 */
export function round(date, unit, count, firstDateOfWeek, utc, firstDate, roundMinutes, timezone) {
    if (roundMinutes === void 0) { roundMinutes = 0; }
    if (!$type.isNumber(count)) {
        count = 1;
    }
    var timeZoneOffset = 0;
    if (timezone && ["day", "month", "week", "year"].indexOf(unit) != -1) {
        date = setTimezone(date, timezone);
    }
    if (!utc && unit != "millisecond") {
        timeZoneOffset = date.getTimezoneOffset();
        date.setUTCMinutes(date.getUTCMinutes() - timeZoneOffset);
    }
    switch (unit) {
        case "day":
            var day = date.getUTCDate();
            if (count > 1) {
                //	day = Math.floor(day / count) * count;
                if (firstDate) {
                    firstDate = round(firstDate, "day", 1);
                    var difference = date.getTime() - firstDate.getTime();
                    var unitCount = Math.floor(difference / getDuration("day") / count);
                    var duration = getDuration("day", unitCount * count);
                    date.setTime(firstDate.getTime() + duration - timeZoneOffset * getDuration("minute"));
                }
            }
            else {
                date.setUTCDate(day);
            }
            date.setUTCHours(0, 0, 0, 0);
            break;
        case "second":
            var seconds = date.getUTCSeconds();
            if (count > 1) {
                seconds = Math.floor(seconds / count) * count;
            }
            date.setUTCSeconds(seconds, 0);
            break;
        case "millisecond":
            if (count == 1) {
                return date; // much better for perf!
            }
            var milliseconds = date.getUTCMilliseconds();
            milliseconds = Math.floor(milliseconds / count) * count;
            date.setUTCMilliseconds(milliseconds);
            break;
        case "hour":
            var hours = date.getUTCHours();
            if (count > 1) {
                hours = Math.floor(hours / count) * count;
            }
            date.setUTCHours(hours, roundMinutes, 0, 0);
            break;
        case "minute":
            var minutes = date.getUTCMinutes();
            milliseconds = date.getUTCMilliseconds();
            if (count > 1) {
                minutes = Math.floor(minutes / count) * count;
            }
            date.setUTCMinutes(minutes, 0, 0);
            break;
        case "month":
            var month = date.getUTCMonth();
            if (count > 1) {
                month = Math.floor(month / count) * count;
            }
            date.setUTCMonth(month, 1);
            date.setUTCHours(0, roundMinutes, 0, 0);
            break;
        case "year":
            var year = date.getUTCFullYear();
            if (count > 1) {
                year = Math.floor(year / count) * count;
            }
            date.setUTCFullYear(year, 0, 1);
            date.setUTCHours(0, roundMinutes, 0, 0);
            //let nonUTCDateY = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            //timeZoneOffset = nonUTCDateY.getTimezoneOffset();
            break;
        case "week":
            var wday = date.getUTCDate();
            var weekDay = date.getUTCDay();
            if (!$type.isNumber(firstDateOfWeek)) {
                firstDateOfWeek = 1;
            }
            // todo: rounding when count is not 1
            if (weekDay >= firstDateOfWeek) {
                wday = wday - weekDay + firstDateOfWeek;
            }
            else {
                wday = wday - (7 + weekDay) + firstDateOfWeek;
            }
            date.setUTCDate(wday);
            date.setUTCHours(0, roundMinutes, 0, 0);
            break;
    }
    if (!utc && unit != "millisecond") {
        date.setUTCMinutes(date.getUTCMinutes() + timeZoneOffset);
        if (unit == "day" || unit == "week" || unit == "month" || unit == "year") {
            var newTimeZoneOffset = date.getTimezoneOffset();
            if (newTimeZoneOffset != timeZoneOffset) {
                var diff = newTimeZoneOffset - timeZoneOffset;
                date.setUTCMinutes(date.getUTCMinutes() + diff);
            }
        }
    }
    return date;
}
/**
 * Returns a new `Date` object which corresponds to the source date in a
 * specific timezone.
 *
 * @since 4.10.1
 * @param   date      Source date
 * @param   timezone  Timezone identifier
 * @return            Recalculated new Date
 */
export function setTimezone(date, timezone) {
    var d = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
    return d;
}
/**
 * Returns minute fraction of the set timezone.
 *
 * @since 4.10.12
 * @param  timezone  Timezone identifier
 * @return           Minutes
 */
export function getTimezoneMinutes(timezone) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    var d2 = setTimezone(d, timezone);
    return d2.getMinutes();
}
//# sourceMappingURL=Time.js.map