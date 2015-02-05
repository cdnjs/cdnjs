/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
* The datemath module provides utility methods for basic JavaScript Date object manipulation and 
* comparison. 
* 
* @module datemath
*/

/**
* YAHOO.widget.DateMath is used for simple date manipulation. The class is a static utility
* used for adding, subtracting, and comparing dates.
* @namespace YAHOO.widget
* @class DateMath
*/
YAHOO.widget.DateMath = {
    /**
    * Constant field representing Day
    * @property DAY
    * @static
    * @final
    * @type String
    */
    DAY : "D",

    /**
    * Constant field representing Week
    * @property WEEK
    * @static
    * @final
    * @type String
    */
    WEEK : "W",

    /**
    * Constant field representing Year
    * @property YEAR
    * @static
    * @final
    * @type String
    */
    YEAR : "Y",

    /**
    * Constant field representing Month
    * @property MONTH
    * @static
    * @final
    * @type String
    */
    MONTH : "M",

    /**
    * Constant field representing one day, in milliseconds
    * @property ONE_DAY_MS
    * @static
    * @final
    * @type Number
    */
    ONE_DAY_MS : 1000*60*60*24,
    
    /**
     * Constant field representing the date in first week of January
     * which identifies the first week of the year.
     * <p>
     * In the U.S, Jan 1st is normally used based on a Sunday start of week.
     * ISO 8601, used widely throughout Europe, uses Jan 4th, based on a Monday start of week.
     * </p>
     * @property WEEK_ONE_JAN_DATE
     * @static
     * @type Number
     */
    WEEK_ONE_JAN_DATE : 1,

    /**
    * Adds the specified amount of time to the this instance.
    * @method add
    * @param {Date} date The JavaScript Date object to perform addition on
    * @param {String} field The field constant to be used for performing addition.
    * @param {Number} amount The number of units (measured in the field constant) to add to the date.
    * @return {Date} The resulting Date object
    */
    add : function(date, field, amount) {
        var d = new Date(date.getTime());
        switch (field) {
            case this.MONTH:
                var newMonth = date.getMonth() + amount;
                var years = 0;

                if (newMonth < 0) {
                    while (newMonth < 0) {
                        newMonth += 12;
                        years -= 1;
                    }
                } else if (newMonth > 11) {
                    while (newMonth > 11) {
                        newMonth -= 12;
                        years += 1;
                    }
                }

                d.setMonth(newMonth);
                d.setFullYear(date.getFullYear() + years);
                break;
            case this.DAY:
                this._addDays(d, amount);
                // d.setDate(date.getDate() + amount);
                break;
            case this.YEAR:
                d.setFullYear(date.getFullYear() + amount);
                break;
            case this.WEEK:
                this._addDays(d, (amount * 7));
                // d.setDate(date.getDate() + (amount * 7));
                break;
        }
        return d;
    },

    /**
     * Private helper method to account for bug in Safari 2 (webkit < 420)
     * when Date.setDate(n) is called with n less than -128 or greater than 127.
     * <p>
     * Fix approach and original findings are available here:
     * http://brianary.blogspot.com/2006/03/safari-date-bug.html
     * </p>
     * @method _addDays
     * @param {Date} d JavaScript date object
     * @param {Number} nDays The number of days to add to the date object (can be negative)
     * @private
     */
    _addDays : function(d, nDays) {
        if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420) {
            if (nDays < 0) {
                // Ensure we don't go below -128 (getDate() is always 1 to 31, so we won't go above 127)
                for(var min = -128; nDays < min; nDays -= min) {
                    d.setDate(d.getDate() + min);
                }
            } else {
                // Ensure we don't go above 96 + 31 = 127
                for(var max = 96; nDays > max; nDays -= max) {
                    d.setDate(d.getDate() + max);
                }
            }
            // nDays should be remainder between -128 and 96
        }
        d.setDate(d.getDate() + nDays);
    },

    /**
    * Subtracts the specified amount of time from the this instance.
    * @method subtract
    * @param {Date} date The JavaScript Date object to perform subtraction on
    * @param {Number} field The this field constant to be used for performing subtraction.
    * @param {Number} amount The number of units (measured in the field constant) to subtract from the date.
    * @return {Date} The resulting Date object
    */
    subtract : function(date, field, amount) {
        return this.add(date, field, (amount*-1));
    },

    /**
    * Determines whether a given date is before another date on the calendar.
    * @method before
    * @param {Date} date  The Date object to compare with the compare argument
    * @param {Date} compareTo The Date object to use for the comparison
    * @return {Boolean} true if the date occurs before the compared date; false if not.
    */
    before : function(date, compareTo) {
        var ms = compareTo.getTime();
        if (date.getTime() < ms) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * Determines whether a given date is after another date on the calendar.
    * @method after
    * @param {Date} date  The Date object to compare with the compare argument
    * @param {Date} compareTo The Date object to use for the comparison
    * @return {Boolean} true if the date occurs after the compared date; false if not.
    */
    after : function(date, compareTo) {
        var ms = compareTo.getTime();
        if (date.getTime() > ms) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * Determines whether a given date is between two other dates on the calendar.
    * @method between
    * @param {Date} date  The date to check for
    * @param {Date} dateBegin The start of the range
    * @param {Date} dateEnd  The end of the range
    * @return {Boolean} true if the date occurs between the compared dates; false if not.
    */
    between : function(date, dateBegin, dateEnd) {
        if (this.after(date, dateBegin) && this.before(date, dateEnd)) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
    * Retrieves a JavaScript Date object representing January 1 of any given year.
    * @method getJan1
    * @param {Number} calendarYear  The calendar year for which to retrieve January 1
    * @return {Date} January 1 of the calendar year specified.
    */
    getJan1 : function(calendarYear) {
        return this.getDate(calendarYear,0,1);
    },

    /**
    * Calculates the number of days the specified date is from January 1 of the specified calendar year.
    * Passing January 1 to this function would return an offset value of zero.
    * @method getDayOffset
    * @param {Date} date The JavaScript date for which to find the offset
    * @param {Number} calendarYear The calendar year to use for determining the offset
    * @return {Number} The number of days since January 1 of the given year
    */
    getDayOffset : function(date, calendarYear) {
        var beginYear = this.getJan1(calendarYear); // Find the start of the year. This will be in week 1.
        
        // Find the number of days the passed in date is away from the calendar year start
        var dayOffset = Math.ceil((date.getTime()-beginYear.getTime()) / this.ONE_DAY_MS);
        return dayOffset;
    },

    /**
    * Calculates the week number for the given date. Can currently support standard
    * U.S. week numbers, based on Jan 1st defining the 1st week of the year, and 
    * ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.
    * 
    * @method getWeekNumber
    * @param {Date} date The JavaScript date for which to find the week number
    * @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).
    * Defaults to 0
    * @param {Number} janDate The date in the first week of January which defines week one for the year
    * Defaults to the value of YAHOO.widget.DateMath.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st). 
    * For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.
    * 
    * @return {Number} The number of the week containing the given date.
    */
    getWeekNumber : function(date, firstDayOfWeek, janDate) {

        // Setup Defaults
        firstDayOfWeek = firstDayOfWeek || 0;
        janDate = janDate || this.WEEK_ONE_JAN_DATE;

        var targetDate = this.clearTime(date),
            startOfWeek,
            endOfWeek;

        if (targetDate.getDay() === firstDayOfWeek) { 
            startOfWeek = targetDate;
        } else {
            startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
        }

        var startYear = startOfWeek.getFullYear();

        // DST shouldn't be a problem here, math is quicker than setDate();
        endOfWeek = new Date(startOfWeek.getTime() + 6*this.ONE_DAY_MS);

        var weekNum;
        if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
            // If years don't match, endOfWeek is in Jan. and if the 
            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
            weekNum = 1;
        } else {
            // Get the 1st day of the 1st week, and 
            // find how many days away we are from it.
            var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);

            // Round days to smoothen out 1 hr DST diff
            var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime())/this.ONE_DAY_MS);

            // Calc. Full Weeks
            var rem = daysDiff % 7;
            var weeksDiff = (daysDiff - rem)/7;
            weekNum = weeksDiff + 1;
        }
        return weekNum;
    },

    /**
     * Get the first day of the week, for the give date. 
     * @param {Date} dt The date in the week for which the first day is required.
     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
     * @return {Date} The first day of the week
     */
    getFirstDayOfWeek : function (dt, startOfWeek) {
        startOfWeek = startOfWeek || 0;
        var dayOfWeekIndex = dt.getDay(),
            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;

        return this.subtract(dt, this.DAY, dayOfWeek);
    },

    /**
    * Determines if a given week overlaps two different years.
    * @method isYearOverlapWeek
    * @param {Date} weekBeginDate The JavaScript Date representing the first day of the week.
    * @return {Boolean} true if the date overlaps two different years.
    */
    isYearOverlapWeek : function(weekBeginDate) {
        var overlaps = false;
        var nextWeek = this.add(weekBeginDate, this.DAY, 6);
        if (nextWeek.getFullYear() != weekBeginDate.getFullYear()) {
            overlaps = true;
        }
        return overlaps;
    },

    /**
    * Determines if a given week overlaps two different months.
    * @method isMonthOverlapWeek
    * @param {Date} weekBeginDate The JavaScript Date representing the first day of the week.
    * @return {Boolean} true if the date overlaps two different months.
    */
    isMonthOverlapWeek : function(weekBeginDate) {
        var overlaps = false;
        var nextWeek = this.add(weekBeginDate, this.DAY, 6);
        if (nextWeek.getMonth() != weekBeginDate.getMonth()) {
            overlaps = true;
        }
        return overlaps;
    },

    /**
    * Gets the first day of a month containing a given date.
    * @method findMonthStart
    * @param {Date} date The JavaScript Date used to calculate the month start
    * @return {Date}  The JavaScript Date representing the first day of the month
    */
    findMonthStart : function(date) {
        var start = this.getDate(date.getFullYear(), date.getMonth(), 1);
        return start;
    },

    /**
    * Gets the last day of a month containing a given date.
    * @method findMonthEnd
    * @param {Date} date The JavaScript Date used to calculate the month end
    * @return {Date}  The JavaScript Date representing the last day of the month
    */
    findMonthEnd : function(date) {
        var start = this.findMonthStart(date);
        var nextMonth = this.add(start, this.MONTH, 1);
        var end = this.subtract(nextMonth, this.DAY, 1);
        return end;
    },

    /**
    * Clears the time fields from a given date, effectively setting the time to 12 noon.
    * @method clearTime
    * @param {Date} date The JavaScript Date for which the time fields will be cleared
    * @return {Date}  The JavaScript Date cleared of all time fields
    */
    clearTime : function(date) {
        date.setHours(12,0,0,0);
        return date;
    },

    /**
     * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object
     * are set to 0. The method allows Date instances to be created with the a year less than 100. "new Date(year, month, date)" implementations 
     * set the year to 19xx if a year (xx) which is less than 100 is provided.
     * <p>
     * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure
     * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.
     * </p>
     * @method getDate
     * @param {Number} y Year.
     * @param {Number} m Month index from 0 (Jan) to 11 (Dec).
     * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.
     * @return {Date} The JavaScript date object with year, month, date set as provided.
     */
    getDate : function(y, m, d) {
        var dt = null;
        if (YAHOO.lang.isUndefined(d)) {
            d = 1;
        }
        if (y >= 100) {
            dt = new Date(y, m, d);
        } else {
            dt = new Date();
            dt.setFullYear(y);
            dt.setMonth(m);
            dt.setDate(d);
            dt.setHours(0,0,0,0);
        }
        return dt;
    }
};
YAHOO.register("datemath", YAHOO.widget.DateMath, {version: "2.9.0", build: "2800"});
