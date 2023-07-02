/* ------------------------------------------------------------------------------------

	minitz - MIT License - Hexagon <hexagon@56k.guru>

	Version 4.0.5
	
	------------------------------------------------------------------------------------

	License:

	Copyright (c) 2022 Hexagon <hexagon@56k.guru>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

  ------------------------------------------------------------------------------------  */

/**
 * @typedef {Object} TimePoint
 * @property {Number} y - 1970--
 * @property {Number} m - 1-12
 * @property {Number} d - 1-31
 * @property {Number} h - 0-24
 * @property {Number} i - 0-60 Minute
 * @property {Number} s - 0-60
 * @property {string} tz - Time zone in IANA database format 'Europe/Stockholm'
 */

/**
 * Converts a date/time from a specific timezone to a normal date object using the system local time
 *
 * Shortcut for minitz.fromTZ(minitz.tp(...));
 *
 * @constructor
 *
 * @param {Number} y - 1970--
 * @param {Number} m - 1-12
 * @param {Number} d - 1-31
 * @param {Number} h - 0-24
 * @param {Number} i - 0-60 Minute
 * @param {Number} s - 0-60
 * @param {string} tz - Time zone in IANA database format 'Europe/Stockholm'
 * @param {boolean} [throwOnInvalid] - Default is to return the adjusted time if the call happens during a Daylight-Saving-Time switch.
 *										E.g. Value "01:01:01" is returned if input time is 00:01:01 while one hour got actually
 *										skipped, going from 23:59:59 to 01:00:00. Setting this flag makes the library throw an exception instead.
 * @returns {date} - Normal date object with correct UTC and system local time
 *
 */
 function minitz(y, m, d, h, i, s, tz, throwOnInvalid) {
	return minitz.fromTZ(minitz.tp(y, m, d, h, i, s, tz), throwOnInvalid);
}

/**
 * Converts a date/time from a specific timezone to a normal date object using the system local time
 * 
 * @public
 * @static
 * 
 * @param {string} localTimeStr - ISO8601 formatted local time string, non UTC
 * @param {string} tz - Time zone in IANA database format 'Europe/Stockholm'
 * @param {boolean} [throwOnInvalid] - Default is to return the adjusted time if the call happens during a Daylight-Saving-Time switch.
 *										E.g. Value "01:01:01" is returned if input time is 00:01:01 while one hour got actually
 *										skipped, going from 23:59:59 to 01:00:00. Setting this flag makes the library throw an exception instead.
 * @return {date} - Normal date object
 * 
 */
minitz.fromTZISO = (localTimeStr, tz, throwOnInvalid) => {
	return minitz.fromTZ(parseISOLocal(localTimeStr, tz), throwOnInvalid);
};

/**
 * Converts a date/time from a specific timezone to a normal date object using the system local time
 *
 * @public
 * @static
 *
 * @param {TimePoint} tp - Object with specified timezone
 * @param {boolean} [throwOnInvalid] - Default is to return the adjusted time if the call happens during a Daylight-Saving-Time switch.
 *										E.g. Value "01:01:01" is returned if input time is 00:01:01 while one hour got actually
 *										skipped, going from 23:59:59 to 01:00:00. Setting this flag makes the library throw an exception instead.
 * @returns {date} - Normal date object
 */
minitz.fromTZ = function(tp, throwOnInvalid) {

	const

		// Construct a fake Date object with UTC date/time set to local date/time in source timezone
		inDate = new Date(Date.UTC(
			tp.y,
			tp.m - 1,
			tp.d,
			tp.h,
			tp.i,
			tp.s
		)),

		// Get offset between UTC and source timezone
		offset = getTimezoneOffset(tp.tz, inDate),

		// Remove offset from inDate to hopefully get a true date object
		dateGuess = new Date(inDate.getTime() - offset),

		// Get offset between UTC and guessed time in target timezone
		dateOffsGuess = getTimezoneOffset(tp.tz, dateGuess);

	// If offset between guessed true date object and UTC matches initial calculation, the guess
	// was spot on
	if ((dateOffsGuess - offset) === 0) {
		return dateGuess;
	} else {
		// Not quite there yet, make a second try on guessing the local time, adjust by the offset indicated by the previous guess
		// Try recreating input time again
		// Then calculate and check the offset again
		const
			dateGuess2 = new Date(inDate.getTime() - dateOffsGuess),
			dateOffsGuess2 = getTimezoneOffset(tp.tz, dateGuess2);
		if ((dateOffsGuess2 - dateOffsGuess) === 0) {
			// All good, return local time
			return dateGuess2;
		} else if(!throwOnInvalid && (dateOffsGuess2 - dateOffsGuess) > 0) {
			// We're most probably dealing with a DST transition where we should use the offset of the second guess
			return dateGuess2; 
		} else if (!throwOnInvalid) {
			// We're most probably dealing with a DST transition where we should use the offset of the initial guess
			return dateGuess;
		} else {
			// Input time is invalid, and the library is instructed to throw, so let's do it
			throw new Error("Invalid date passed to fromTZ()");
		}
	}
};

/**
 * Converts a date to a specific time zone and returns an object containing year, month,
 * day, hour, (...) and timezone used for the conversion
 *
 * **Please note**: If you just want to _display_ date/time in another
 * time zone, use vanilla JS. See the example below.
 *
 * @public
 * @static
 *
 * @param {d} date - Input date
 * @param {string} [tzStr] - Timezone string in Europe/Stockholm format
 *
 * @returns {TimePoint}
 *
 * @example <caption>Example using minitz:</caption>
 * let normalDate = new Date(); // d is a normal Date instance, with local timezone and correct utc representation
 *
 * tzDate = minitz.toTZ(d, 'America/New_York');
 *
 * // Will result in the following object:
 * // {
 * //  y: 2022,
 * //  m: 9,
 * //  d: 28,
 * //  h: 13,
 * //  i: 28,
 * //  s: 28,
 * //  tz: "America/New_York"
 * // }
 *
 * @example <caption>Example using vanilla js:</caption>
 * console.log(
 *	// Display current time in America/New_York, using sv-SE locale
 *	new Date().toLocaleTimeString("sv-SE", { timeZone: "America/New_York" }),
 * );
 *
 */
minitz.toTZ = function (d, tzStr) {

	// - replace narrow no break space with regular space to compensate for bug in Node.js 19.1
	const localDateString = d.toLocaleString("en-US", {timeZone: tzStr}).replace(/[\u202f]/," ");

	const td = new Date(localDateString);
	return {
		y: td.getFullYear(),
		m: td.getMonth() + 1,
		d: td.getDate(),
		h: td.getHours(),
		i: td.getMinutes(),
		s: td.getSeconds(),
		tz: tzStr
	};
};

/**
 * Convenience function which returns a TimePoint object for later use in fromTZ
 *
 * @public
 * @static
 *
 * @param {Number} y - 1970--
 * @param {Number} m - 1-12
 * @param {Number} d - 1-31
 * @param {Number} h - 0-24
 * @param {Number} i - 0-60 Minute
 * @param {Number} s - 0-60
 * @param {string} tz - Time zone in format 'Europe/Stockholm'
 *
 * @returns {TimePoint}
 *
*/
minitz.tp = (y,m,d,h,i,s,tz) => { return { y, m, d, h, i, s, tz: tz }; };

/**
 * Helper function that returns the current UTC offset (in ms) for a specific timezone at a specific point in time
 *
 * @private
 *
 * @param {timeZone} string - Target time zone in IANA database format 'Europe/Stockholm'
 * @param {date} [date] - Point in time to use as base for offset calculation
 *
 * @returns {number} - Offset in ms between UTC and timeZone
 */
function getTimezoneOffset(timeZone, date = new Date()) {

	// Get timezone 
	const tz = date.toLocaleString("en-US", {timeZone: timeZone, timeZoneName: "short"}).split(" ").slice(-1)[0];

	// Extract time in en-US format
	// - replace narrow no break space with regular space to compensate for bug in Node.js 19.1
	const dateString = date.toLocaleString("en-US").replace(/[\u202f]/," ");

	// Check ms offset between GMT and extracted timezone
	return Date.parse(`${dateString} GMT`) - Date.parse(`${dateString} ${tz}`);
}


/**
 * Helper function that takes a ISO8001 local date time string and creates a Date object.
 * Throws on failure. Throws on invalid date or time.
 * 
 * @private
 *
 * @param {string} dtStr - an ISO 8601 format date and time string
 *					  with all components, e.g. 2015-11-24T19:40:00
 * @returns {TimePoint} - TimePoint instance from parsing the string
 */
function parseISOLocal(dtStr, tz) {

	// Parse date using built in Date.parse
	const pd = new Date(Date.parse(dtStr));

	// Check for completeness
	if (isNaN(pd)) {
		throw new Error("minitz: Invalid ISO8601 passed to parser.");
	}
	
	// If 
	//   * date/time is specified in UTC (Z-flag included)
	//   * or UTC offset is specified (+ or - included after character 9 (20200101 or 2020-01-0))
	// Return time in utc, else return local time and include timezone identifier
	const stringEnd = dtStr.substring(9);
	if (dtStr.includes("Z") || stringEnd.includes("-") || stringEnd.includes("+")) {
		return minitz.tp(pd.getUTCFullYear(), pd.getUTCMonth()+1, pd.getUTCDate(),pd.getUTCHours(), pd.getUTCMinutes(),pd.getUTCSeconds(), "Etc/UTC");
	} else {
		return minitz.tp(pd.getFullYear(), pd.getMonth()+1, pd.getDate(),pd.getHours(), pd.getMinutes(),pd.getSeconds(), tz);
	}
	// Treat date as local time, in target timezone

}

minitz.minitz = minitz;

/**
 * @callback CatchCallbackFn
 * @param {unknown} e
 * @param {Cron} job
 */

/**
 * @callback ProtectCallbackFn
 * @param {Cron} job
 */

/**
 * @typedef {Object} CronOptions - Cron scheduler options
 * @property {string} [name] - Name of a job
 * @property {boolean} [paused] - Job is paused
 * @property {boolean} [kill] - Job is about to be killed or killed
 * @property {boolean | CatchCallbackFn} [catch] - Continue exection even if a unhandled error is thrown by triggered function
 * 										  - If set to a function, execute function on catching the error.
 * @property {boolean} [unref] - Abort job instantly if nothing else keeps the event loop running.
 * @property {number} [maxRuns] - Maximum nuber of executions
 * @property {number} [interval] - Minimum interval between executions, in seconds
 * @property {boolean | ProtectCallbackFn} [protect] - Skip current run if job is already running
 * @property {string | Date} [startAt] - When to start running
 * @property {string | Date} [stopAt] - When to stop running
 * @property {string} [timezone] - Time zone in Europe/Stockholm format
 * @property {number} [utcOffset] - Offset from UTC in minutes
 * @property {boolean} [legacyMode] - Combine day-of-month and day-of-week using true = OR, false = AND. Default is true = OR.
 * @property {?} [context] - Used to pass any object to scheduled function
 */

/**
 * Internal function that validates options, and sets defaults
 * @private
 * 
 * @param {CronOptions} options 
 * @returns {CronOptions}
 */
function CronOptions(options) {
	
	// If no options are passed, create empty object
	if (options === void 0) {
		options = {};
	}
	
	// Don't duplicate the 'name' property
	delete options.name;

	// Keep options, or set defaults
	options.legacyMode = (options.legacyMode === void 0) ? true : options.legacyMode;
	options.paused = (options.paused === void 0) ? false : options.paused;
	options.maxRuns = (options.maxRuns === void 0) ? Infinity : options.maxRuns;
	options.catch = (options.catch === void 0) ? false : options.catch;
	options.interval = (options.interval === void 0) ? 0 : parseInt(options.interval, 10);
	options.utcOffset = (options.utcOffset === void 0) ? void 0 : parseInt(options.utcOffset, 10);
	options.unref = (options.unref === void 0) ? false : options.unref;
	
	// startAt is set, validate it
	if( options.startAt ) {
		options.startAt = new CronDate(options.startAt, options.timezone);
	} 
	if( options.stopAt ) {
		options.stopAt = new CronDate(options.stopAt, options.timezone);
	}

	// Validate interval
	if (options.interval !== null) {
		if (isNaN(options.interval)) {
			throw new Error("CronOptions: Supplied value for interval is not a number");
		} else if (options.interval < 0) {
			throw new Error("CronOptions: Supplied value for interval can not be negative");
		}
	}

	// Validate utcOffset
	if (options.utcOffset !== void 0) {
		
		// Limit range for utcOffset
		if (isNaN(options.utcOffset)) {
			throw new Error("CronOptions: Invalid value passed for utcOffset, should be number representing minutes offset from UTC.");
		} else if (options.utcOffset < -870 || options.utcOffset > 870 ) {
			throw new Error("CronOptions: utcOffset out of bounds.");
		}
		
		// Do not allow both timezone and utcOffset
		if (options.utcOffset !== void 0 && options.timezone) {
			throw new Error("CronOptions: Combining 'utcOffset' with 'timezone' is not allowed.");
		}

	}

	// Unref should be true, false or undefined
	if (options.unref !== true && options.unref !== false) {
		throw new Error("CronOptions: Unref should be either true, false or undefined(false).");
	}
	
	return options;

}

/** 
 * Constant defining the minimum number of days per month where index 0 = January etc.
 * 
 * Used to look if a date _could be_ out of bounds. The "could be" part is why february is pinned to 28 days.
 * 
 * @private
 * 
 * @constant
 * @type {Number[]}
 * 
*/
const DaysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

/**
 * Array of work to be done, consisting of subarrays described below:
 * @private
 * 
 * @constant
 * 
 * [
 *   First item is which member to process,
 *   Second item is which member to increment if we didn't find a mathch in current item,
 *   Third item is an offset. if months is handled 0-11 in js date object, and we get 1-12 from `this.minute`
 *   from pattern. Offset should be -1
 * ]
 * 
 */
const RecursionSteps = [
	["month", "year",  0],
	["day", "month", -1],
	["hour", "day",  0],
	["minute", "hour",  0],
	["second", "minute",  0],
];
    
/**
 * Converts date to CronDate
 * @constructor
 * 
 * @param {CronDate|Date|string} [d] - Input date, if using string representation ISO 8001 (2015-11-24T19:40:00) local timezone is expected
 * @param {string|number} [tz] - String representation of target timezone in Europe/Stockholm format, or a number representing offset in minutes.
*/
function CronDate (d, tz) {	

	/**
	 * TimeZone
	 * @type {string|number|undefined}
	 */
	this.tz = tz;

	// Populate object using input date, or throw
	if (d && d instanceof Date) {
		if (!isNaN(d)) {
			this.fromDate(d);
		} else {
			throw new TypeError("CronDate: Invalid date passed to CronDate constructor");
		}
	} else if (d === void 0) {
		this.fromDate(new Date());
	} else if (d && typeof d === "string") {
		this.fromString(d);
	} else if (d instanceof CronDate) {
		this.fromCronDate(d);
	} else {
		throw new TypeError("CronDate: Invalid type (" + typeof d + ") passed to CronDate constructor");
	}

}

/**
 * Sets internals using a Date 
 * @private
 * 
 * @param {Date} inDate - Input date in local time
 */
CronDate.prototype.fromDate = function (inDate) {
	
	/* If this instance of CronDate has a target timezone set, 
	 * use minitz to convert input date object to target timezone
	 * before extracting hours, minutes, seconds etc.
	 * 
	 * If not, extract all parts from inDate as-is.
	 */
	if (this.tz !== void 0) {
		if (typeof this.tz === "number") {
			this.ms = inDate.getUTCMilliseconds();
			this.second = inDate.getUTCSeconds();
			this.minute = inDate.getUTCMinutes()+this.tz;
			this.hour = inDate.getUTCHours();
			this.day = inDate.getUTCDate();
			this.month  = inDate.getUTCMonth();
			this.year = inDate.getUTCFullYear();
			// Minute could be out of bounds, apply
			this.apply();
		} else {
			const d = minitz.toTZ(inDate, this.tz);
			this.ms = inDate.getMilliseconds();
			this.second = d.s;
			this.minute = d.i;
			this.hour = d.h;
			this.day = d.d;
			this.month  = d.m - 1;
			this.year = d.y;
		}
	} else {
		this.ms = inDate.getMilliseconds();
		this.second = inDate.getSeconds();
		this.minute = inDate.getMinutes();
		this.hour = inDate.getHours();
		this.day = inDate.getDate();
		this.month  = inDate.getMonth();
		this.year = inDate.getFullYear();
	}

};

/**
 * Sets internals by deep copying another CronDate
 * @private
 * 
 * @param {CronDate} d - Input date
 */
CronDate.prototype.fromCronDate = function (d) {
	this.tz = d.tz;

	/**
	 * Current full year, in local time or target timezone specified by `this.tz` 
	 * @type {number}
	 */
	this.year = d.year;

	/**
	 * Current month (1-12), in local time or target timezone specified by `this.tz`
	 * @type {number}
	 */
	this.month = d.month;

	/**
	 * Current day (1-31), in local time or target timezone specified by `this.tz`
	 * @type {number}
	 */
	this.day = d.day;

	/**
	 * Current hour (0-23), in local time or target timezone specified by `this.tz`
	 * @type {number}
	 */
	this.hour = d.hour;

	/**
	 * Current minute (0-59), in local time or target timezone specified by `this.tz`
	 * @type {number}
	 */
	this.minute = d.minute;

	/**
	 * Current second (0-59), in local time or target timezone specified by `this.tz`
	 * @type {number}
	 */
	this.second = d.second;
	
	/**
	 * Current milliseconds
	 * @type {number}
	 */
	this.ms = d.ms;
};

/**
 * Reset internal parameters (seconds, minutes, hours) if any of them have exceeded (or could have exceeded) their normal ranges
 * 
 * Will alway return true on february 29th, as that is a date that _could_ be out of bounds
 * 
 * @private
 */
CronDate.prototype.apply = function () {
	// If any value could be out of bounds, apply 
	if (this.month>11||this.day>DaysOfMonth[this.month]||this.hour>59||this.minute>59||this.second>59||this.hour<0||this.minute<0||this.second<0) {
		const d = new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms));
		this.ms = d.getUTCMilliseconds();
		this.second = d.getUTCSeconds();
		this.minute = d.getUTCMinutes();
		this.hour = d.getUTCHours();
		this.day = d.getUTCDate();
		this.month  = d.getUTCMonth();
		this.year = d.getUTCFullYear();
		return true;
	} else {
		return false;
	}
};

/**
 * Sets internals by parsing a string
 * @private
 * 
 * @param {Date} date - Input date
 */
CronDate.prototype.fromString = function (str) {
	return this.fromDate(minitz.fromTZISO(str, this.tz));
};

/**
 * Find next match of current part
 * @private
 *  
 * @param {CronOptions} options - Cron options used for incrementing
 * @param {string} target
 * @param {CronPattern} pattern
 * @param {Number} offset
 * 
 * @returns {boolean}
 * 
 */
CronDate.prototype.findNext = function (options, target, pattern, offset) {
	const originalTarget = this[target];

	// In the conditions below, local time is not relevant. And as new Date(Date.UTC(y,m,d)) is way faster 
	// than new Date(y,m,d). We use the UTC functions to set/get date parts.

	// Pre-calculate last day of month if needed
	let lastDayOfMonth;
	if (pattern.lastDayOfMonth || pattern.lastWeekdayOfMonth) {
		// This is an optimization for every month except february, which has different number of days different years
		if (this.month !== 1) {
			lastDayOfMonth = DaysOfMonth[this.month]; // About 20% performance increase when using L
		} else {
			lastDayOfMonth = new Date(Date.UTC(this.year, this.month+1, 0,0,0,0,0)).getUTCDate();
		}
	}

	// Pre-calculate weekday if needed
	// Calculate offset weekday by ((fDomWeekDay + (targetDate - 1)) % 7)
	const fDomWeekDay = (!pattern.starDOW && target == "day") ? new Date(Date.UTC(this.year, this.month, 1,0,0,0,0)).getUTCDay() : undefined;

	for( let i = this[target] + offset; i < pattern[target].length; i++ ) {

		// this applies to all "levels"
		let match = pattern[target][i];

		// Special case for last day of month
		if (target === "day" && pattern.lastDayOfMonth && i-offset == lastDayOfMonth) {
			match = true;
		}

		// Special case for day of week
		if (target === "day" && !pattern.starDOW) {

			let dowMatch = pattern.dayOfWeek[(fDomWeekDay + ((i-offset) - 1)) % 7];

			// Extra check for l-flag
			if (dowMatch && pattern.lastWeekdayOfMonth) {
				dowMatch = dowMatch && ( i-offset > lastDayOfMonth - 7 );
			}

			// If we use legacyMode, and dayOfMonth is specified - use "OR" to combine day of week with day of month
			// In all other cases use "AND"
			if (options.legacyMode && !pattern.starDOM) {
				match = match || dowMatch;
			} else {
				match = match && dowMatch;
			}
		}

		if (match) {
			this[target] = i-offset;

			// Return 2 if changed, 1 if unchanged
			return (originalTarget !== this[target]) ? 2 : 1;
		}
	}

	// Return 3 if part was not matched
	return 3;
};

/**
 * Increment to next run time recursively
 * 
 * This function is currently capped at year 3000. Do you have a reason to go further? Open an issue on GitHub!

 * @private
 * 
 * @param {string} pattern - The pattern used to increment current state
 * @param {CronOptions} options - Cron options used for incrementing
 * @param {integer} doing - Which part to increment, 0 represent first item of RecursionSteps-array etc.
 * @return {CronDate|null} - Returns itthis for chaining, or null if increment wasnt possible
 */
CronDate.prototype.recurse = function (pattern, options, doing)  {

	// Find next month (or whichever part we're at)
	const res = this.findNext(options, RecursionSteps[doing][0], pattern, RecursionSteps[doing][2]);

	// Month (or whichever part we're at) changed
	if (res > 1) {
		// Flag following levels for reset
		let resetLevel = doing + 1;
		while(resetLevel < RecursionSteps.length) {
			this[RecursionSteps[resetLevel][0]] = -RecursionSteps[resetLevel][2];
			resetLevel++;
		}
		// Parent changed
		if (res=== 3) {
			// Do increment parent, and reset current level
			this[RecursionSteps[doing][1]]++;
			this[RecursionSteps[doing][0]] = -RecursionSteps[doing][2];
			this.apply();

			// Restart
			return this.recurse(pattern, options, 0);
		} else if (this.apply()) {
			return this.recurse(pattern, options, doing-1);
		}

	}

	// Move to next level
	doing += 1;

	// Done?
	if (doing >= RecursionSteps.length) {
		return this;

		// ... or out of bounds ?
	} else if (this.year >= 3000) {
		return null;

		// ... oh, go to next part then
	} else {

		return this.recurse(pattern, options, doing);
	}
    
};

/**
 * Increment to next run time
 * @public
 * 
 * @param {string} pattern - The pattern used to increment current state
 * @param {CronOptions} options - Cron options used for incrementing
 * @param {boolean} [hasPreviousRun] - If this run should adhere to minimum interval
 * @return {CronDate|null} - Returns itthis for chaining, or null if increment wasnt possible
 */
CronDate.prototype.increment = function (pattern, options, hasPreviousRun) {
	
	// Move to next second, or increment according to minimum interval indicated by option `interval: x`
	// Do not increment a full interval if this is the very first run
	this.second += (options.interval > 1 && hasPreviousRun) ? options.interval : 1;

	// Always reset milliseconds, so we are at the next second exactly
	this.ms = 0;

	// Make sure seconds has not gotten out of bounds
	this.apply();

	// Recursively change each part (y, m, d ...) until next match is found, return null on failure
	return this.recurse(pattern, options, 0);
	
};

/**
 * Convert current state back to a javascript Date()
 * @public
 * 
 * @param {boolean} internal - If this is an internal call
 * @returns {Date}
 */
CronDate.prototype.getDate = function (internal) {
	// If this is an internal call, return the date as is
	// Also use this option when no timezone or utcOffset is set
	if (internal || this.tz === void 0) {
		return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms);
	} else {
		// If .tz is a number, it indicates offset in minutes. UTC timestamp of the internal date objects will be off by the same number of minutes. 
		// Restore this, and return a date object with correct time set.
		if (typeof this.tz === "number") {
			return new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minute-this.tz, this.second, this.ms));

		// If .tz is something else (hopefully a string), it indicates the timezone of the "local time" of the internal date object
		// Use minitz to create a normal Date object, and return that.
		} else {
			return minitz(this.year, this.month+1, this.day, this.hour, this.minute, this.second, this.tz);
		}
	}
};

/**
 * Convert current state back to a javascript Date() and return UTC milliseconds
 * @public
 * 
 * @returns {Date}
 */
CronDate.prototype.getTime = function () {
	return this.getDate().getTime();
};

/**
 * Name for each part of the cron pattern
 * @typedef {("second" | "minute" | "hour" | "day" | "month" | "dayOfWeek")} CronPatternPart
 */

/**
 * Offset, 0 or -1. 
 * 
 * 0 offset is used for seconds,minutes and hours as they start on 1. 
 * -1 on days and months, as they start on 0
 * 
 * @typedef {Number} CronIndexOffset
 */

/**
 * Create a CronPattern instance from pattern string ('* * * * * *')
 * @constructor
 * @param {string} pattern - Input pattern
 * @param {string} timezone - Input timezone, used for '?'-substitution
 */
function CronPattern (pattern, timezone) {

	this.pattern 		= pattern;
	this.timezone		= timezone;

	this.second			= Array(60).fill(0); // 0-59
	this.minute			= Array(60).fill(0); // 0-59
	this.hour			= Array(24).fill(0); // 0-23
	this.day			= Array(31).fill(0); // 0-30 in array, 1-31 in config
	this.month			= Array(12).fill(0); // 0-11 in array, 1-12 in config
	this.dayOfWeek		= Array(8).fill(0);  // 0-7 Where 0 = Sunday and 7=Sunday;

	this.lastDayOfMonth = false;
	this.lastWeekdayOfMonth = false;

	this.starDOM = false;  // Asterisk used for dayOfMonth
	this.starDOW  = false; // Asterisk used for dayOfWeek

	this.parse();

}

/**
 * Parse current pattern, will throw on any type of failure
 * @private
 */
CronPattern.prototype.parse = function () {

	// Sanity check
	if( !(typeof this.pattern === "string" || this.pattern.constructor === String) ) {
		throw new TypeError("CronPattern: Pattern has to be of type string.");
	}

	// Handle @yearly, @monthly etc
	if (this.pattern.indexOf("@") >= 0) this.pattern = this.handleNicknames(this.pattern).trim();

	// Split configuration on whitespace
	const parts = this.pattern.replace(/\s+/g, " ").split(" ");

	// Validite number of configuration entries
	if( parts.length < 5 || parts.length > 6 ) {
		throw new TypeError("CronPattern: invalid configuration format ('" + this.pattern + "'), exacly five or six space separated parts required.");
	}

	// If seconds is omitted, insert 0 for seconds
	if( parts.length === 5) {
		parts.unshift("0");
	}

	// Convert 'L' to lastDayOfMonth flag in day-of-month field
	if(parts[3].indexOf("L") >= 0) {
		parts[3] = parts[3].replace("L","");
		this.lastDayOfMonth = true;
	}

	// Convert 'L' to lastWeekdayOfMonth flag in day-of-week field
	if(parts[5].indexOf("L") >= 0) {
		parts[5] = parts[5].replace("L","");
		this.lastWeekdayOfMonth = true;
	}
	
	// Check for starDOM
	if(parts[3] == "*") {
		this.starDOM = true;
	}

	// Replace alpha representations
	if (parts[4].length >= 3) parts[4] = this.replaceAlphaMonths(parts[4]);
	if (parts[5].length >= 3) parts[5] = this.replaceAlphaDays(parts[5]);

	// Check for starDOW
	if(parts[5] == "*") {
		this.starDOW = true;
	}
	
	// Implement '?' in the simplest possible way - replace ? with current value, before further processing
	if (this.pattern.indexOf("?") >= 0) {
		const initDate = new CronDate(new Date(),this.timezone).getDate(true);
		parts[0] = parts[0].replace("?", initDate.getSeconds());
		parts[1] = parts[1].replace("?", initDate.getMinutes());
		parts[2] = parts[2].replace("?", initDate.getHours());
		if (!this.starDOM) parts[3] = parts[3].replace("?", initDate.getDate());
		parts[4] = parts[4].replace("?", initDate.getMonth()+1); // getMonth is zero indexed while pattern starts from 1
		if (!this.starDOW) parts[5] = parts[5].replace("?", initDate.getDay());
	}

	// Check part content
	this.throwAtIllegalCharacters(parts);

	// Parse parts into arrays, validates as we go
	this.partToArray("second",    parts[0], 0);
	this.partToArray("minute",    parts[1], 0);
	this.partToArray("hour",      parts[2], 0);
	this.partToArray("day",       parts[3], -1);
	this.partToArray("month",     parts[4], -1);
	this.partToArray("dayOfWeek", parts[5], 0);

	// 0 = Sunday, 7 = Sunday
	if( this.dayOfWeek[7] ) {
		this.dayOfWeek[0] = 1;
	}

};

/**
 * Convert current part (seconds/minutes etc) to an array of 1 or 0 depending on if the part is about to trigger a run or not.
 * @private
 * 
 * @param {CronPatternPart} type - Seconds/minutes etc
 * @param {string} conf - Current pattern part - *, 0-1 etc
 * @param {CronIndexOffset} valueIndexOffset
 * @param {boolean} [recursed] - Is this a recursed call 
 */
CronPattern.prototype.partToArray = function (type, conf, valueIndexOffset) {

	const arr = this[type];

	// First off, handle wildcard
	if( conf === "*" ) return arr.fill(1);

	// Handle separated entries (,) by recursion
	const split = conf.split(",");
	if( split.length > 1 ) {
		for( let i = 0; i < split.length; i++ ) {
			this.partToArray(type, split[i], valueIndexOffset);
		}

	// Handle range with stepping (x-y/z)
	} else if( conf.indexOf("-") !== -1 && conf.indexOf("/") !== -1 ) {
		this.handleRangeWithStepping(conf, type, valueIndexOffset);
	
	// Handle range
	} else if( conf.indexOf("-") !== -1 ) {
		this.handleRange(conf, type, valueIndexOffset);

	// Handle stepping
	} else if( conf.indexOf("/") !== -1 ) {
		this.handleStepping(conf, type, valueIndexOffset);

	// Anything left should be a number
	} else if( conf !== "" ) {
		this.handleNumber(conf, type, valueIndexOffset);
	}

};

/**
 * After converting JAN-DEC, SUN-SAT only 0-9 * , / - are allowed, throw if anything else pops up
 * @private
 * 
 * @param {string[]} parts - Each part split as strings
 */
CronPattern.prototype.throwAtIllegalCharacters = function (parts) {
	const reValidCron = /[^/*0-9,-]+/;
	for(let i = 0; i < parts.length; i++) {
		if( reValidCron.test(parts[i]) ) {
			throw new TypeError("CronPattern: configuration entry " + i + " (" + parts[i] + ") contains illegal characters.");
		}
	}
};

/**
 * Nothing but a number left, handle that
 * @private
 * 
 * @param {string} conf - Current part, expected to be a number, as a string
 * @param {string} type - One of "seconds", "minutes" etc
 * @param {number} valueIndexOffset - -1 for day of month, and month, as they start at 1. 0 for seconds, hours, minutes
 */
CronPattern.prototype.handleNumber = function (conf, type, valueIndexOffset) {
	const i = (parseInt(conf, 10) + valueIndexOffset);

	if( isNaN(i) ) {
		throw new TypeError("CronPattern: " + type + " is not a number: '" + conf + "'");
	}

	if( i < 0 || i >= this[type].length ) {
		throw new TypeError("CronPattern: " + type + " value out of range: '" + conf + "'");
	}

	this[type][i] = 1;
};

/**
 * Take care of ranges with stepping (e.g. 3-23/5)
 * @private
 *
 * @param {string} conf - Current part, expected to be a string like 3-23/5
 * @param {string} type - One of "seconds", "minutes" etc
 * @param {number} valueIndexOffset - -1 for day of month, and month, as they start at 1. 0 for seconds, hours, minutes
 */
CronPattern.prototype.handleRangeWithStepping = function (conf, type, valueIndexOffset) {
	const matches = conf.match(/^(\d+)-(\d+)\/(\d+)$/);

	if( matches === null ) throw new TypeError("CronPattern: Syntax error, illegal range with stepping: '" + conf + "'");

	let [, lower, upper, steps] = matches;
	lower = parseInt(lower, 10) + valueIndexOffset;
	upper = parseInt(upper, 10) + valueIndexOffset;
	steps = parseInt(steps, 10);

	if( isNaN(lower) ) throw new TypeError("CronPattern: Syntax error, illegal lower range (NaN)");
	if( isNaN(upper) ) throw new TypeError("CronPattern: Syntax error, illegal upper range (NaN)");
	if( isNaN(steps) ) throw new TypeError("CronPattern: Syntax error, illegal stepping: (NaN)");

	if( steps === 0 ) throw new TypeError("CronPattern: Syntax error, illegal stepping: 0");
	if( steps > this[type].length ) throw new TypeError("CronPattern: Syntax error, steps cannot be greater than maximum value of part ("+this[type].length+")");

	if( lower < 0 || upper >= this[type].length ) throw new TypeError("CronPattern: Value out of range: '" + conf + "'");
	if( lower > upper ) throw new TypeError("CronPattern: From value is larger than to value: '" + conf + "'");

	for (let i = lower; i <= upper; i += steps) {
		this[type][i] = 1;
	}
};

/**
 * Take care of ranges (e.g. 1-20)
 * @private
 * 
 * @param {string} conf - Current part, expected to be a string like 1-20
 * @param {string} type - One of "seconds", "minutes" etc
 * @param {number} valueIndexOffset - -1 for day of month, and month, as they start at 1. 0 for seconds, hours, minutes
 */
CronPattern.prototype.handleRange = function (conf, type, valueIndexOffset) {
	const split = conf.split("-");

	if( split.length !== 2 ) {
		throw new TypeError("CronPattern: Syntax error, illegal range: '" + conf + "'");
	}

	const lower = parseInt(split[0], 10) + valueIndexOffset,
		upper = parseInt(split[1], 10) + valueIndexOffset;

	if( isNaN(lower) ) {
		throw new TypeError("CronPattern: Syntax error, illegal lower range (NaN)");
	} else if( isNaN(upper) ) {
		throw new TypeError("CronPattern: Syntax error, illegal upper range (NaN)");
	}

	// Check that value is within range
	if( lower < 0 || upper >= this[type].length ) {
		throw new TypeError("CronPattern: Value out of range: '" + conf + "'");
	}

	//
	if( lower > upper ) {
		throw new TypeError("CronPattern: From value is larger than to value: '" + conf + "'");
	}

	for( let i = lower; i <= upper; i++ ) {
		this[type][i] = 1;
	}
};

/**
 * Handle stepping (e.g. * / 14)
 * @private
 * 
 * @param {string} conf - Current part, expected to be a string like * /20 (without the space)
 * @param {string} type - One of "seconds", "minutes" etc
 */
CronPattern.prototype.handleStepping = function (conf, type) {

	const split = conf.split("/");

	if( split.length !== 2 ) {
		throw new TypeError("CronPattern: Syntax error, illegal stepping: '" + conf + "'");
	}

	let start = 0;
	if( split[0] !== "*" ) {
		start = parseInt(split[0], 10);
	}

	const steps = parseInt(split[1], 10);

	if( isNaN(steps) ) throw new TypeError("CronPattern: Syntax error, illegal stepping: (NaN)");
	if( steps === 0 ) throw new TypeError("CronPattern: Syntax error, illegal stepping: 0");
	if( steps > this[type].length ) throw new TypeError("CronPattern: Syntax error, max steps for part is ("+this[type].length+")");

	for( let i = start; i < this[type].length; i+= steps ) {
		this[type][i] = 1;
	}
};


/**
 * Replace day name with day numbers
 * @private
 * 
 * @param {string} conf - Current part, expected to be a string that might contain sun,mon etc.
 * 
 * @returns {string} - conf with 0 instead of sun etc.
 */
CronPattern.prototype.replaceAlphaDays = function (conf) {
	return conf
		.replace(/-sun/gi, "-7") // choose 7 if sunday is the upper value of a range because the upper value must not be smaller than the lower value
		.replace(/sun/gi, "0")
		.replace(/mon/gi, "1")
		.replace(/tue/gi, "2")
		.replace(/wed/gi, "3")
		.replace(/thu/gi, "4")
		.replace(/fri/gi, "5")
		.replace(/sat/gi, "6");
};

/**
 * Replace month name with month numbers
 * @private
 * 
 * @param {string} conf - Current part, expected to be a string that might contain jan,feb etc.
 * 
 * @returns {string} - conf with 0 instead of sun etc.
 */
CronPattern.prototype.replaceAlphaMonths = function (conf) {
	return conf
		.replace(/jan/gi, "1")
		.replace(/feb/gi, "2")
		.replace(/mar/gi, "3")
		.replace(/apr/gi, "4")
		.replace(/may/gi, "5")
		.replace(/jun/gi, "6")
		.replace(/jul/gi, "7")
		.replace(/aug/gi, "8")
		.replace(/sep/gi, "9")
		.replace(/oct/gi, "10")
		.replace(/nov/gi, "11")
		.replace(/dec/gi, "12");
};

/**
 * Replace nicknames with actual cron patterns
 * @private
 * 
 * @param {string} pattern - Pattern, may contain nicknames, or not
 * 
 * @returns {string} - Pattern, with cron expression insted of nicknames
 */
CronPattern.prototype.handleNicknames = function (pattern) {
	// Replace textual representations of pattern
	const cleanPattern = pattern.trim().toLowerCase();
	if (cleanPattern === "@yearly" || cleanPattern === "@annually") {
		return "0 0 1 1 *";
	} else if (cleanPattern === "@monthly") {
		return  "0 0 1 * *";
	} else if (cleanPattern === "@weekly") {
		return "0 0 * * 0";
	} else if (cleanPattern === "@daily") {
		return "0 0 * * *";
	} else if (cleanPattern === "@hourly") {
		return "0 * * * *";
	} else {
		return pattern;
	}
};

/**
 * Helper function to check if a variable is a function
 * @private
 *
 * @param {?} [v] - Variable to check
 * @returns {boolean}
 */
function isFunction(v) {
	return (
		Object.prototype.toString.call(v) === "[object Function]" ||
		"function" === typeof v ||
		v instanceof Function
	);
}

/**
 * Helper function to unref a timer in both Deno and Node
 * @private
 * @param {unknown} [timer] - Timer to unref
 */
function unrefTimer(timer) {
	/* global Deno */
	if (typeof Deno !== "undefined" && typeof Deno.unrefTimer !== "undefined") {
		Deno.unrefTimer(timer);
		// Node
	} else if (timer && typeof timer.unref !== "undefined") {
		timer.unref();
	}
}

/* ------------------------------------------------------------------------------------

  Croner - MIT License - Hexagon <github.com/Hexagon>

  Pure JavaScript Isomorphic cron parser and scheduler without dependencies.

  ------------------------------------------------------------------------------------

  License:

	Copyright (c) 2015-2023 Hexagon <github.com/Hexagon>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

  ------------------------------------------------------------------------------------  */

/**
 * Many JS engines stores the delay as a 32-bit signed integer internally.
 * This causes an integer overflow when using delays larger than 2147483647,
 * resulting in the timeout being executed immediately.
 *
 * All JS engines implements an immediate execution of delays larger that a 32-bit
 * int to keep the behaviour concistent.
 *
 * @constant
 * @type {number}
 */
const maxDelay = Math.pow(2, 32 - 1) - 1;

/**
 * An array containing all named cron jobs.
 *
 * @constant
 * @type {Cron[]}
 */
const scheduledJobs = [];

/**
 * Cron entrypoint
 *
 * @constructor
 * @param {string|Date} pattern - Input pattern, input date, or input ISO 8601 time string
 * @param {CronOptions|Function} [fnOrOptions1] - Options or function to be run each iteration of pattern
 * @param {CronOptions|Function} [fnOrOptions2] - Options or function to be run each iteration of pattern
 * @returns {Cron}
 */
function Cron(pattern, fnOrOptions1, fnOrOptions2) {
	// Optional "new" keyword
	if (!(this instanceof Cron)) {
		return new Cron(pattern, fnOrOptions1, fnOrOptions2);
	}

	// Make options and func optional and interchangable
	let options, func;

	if (isFunction(fnOrOptions1)) {
		func = fnOrOptions1;
	} else if (typeof fnOrOptions1 === "object") {
		options = fnOrOptions1;
	} else if (fnOrOptions1 !== void 0) {
		throw new Error(
			"Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).",
		);
	}

	if (isFunction(fnOrOptions2)) {
		func = fnOrOptions2;
	} else if (typeof fnOrOptions2 === "object") {
		options = fnOrOptions2;
	} else if (fnOrOptions2 !== void 0) {
		throw new Error(
			"Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).",
		);
	}

	/**
	 * @public
	 * @type {string|undefined} */
	this.name = options ? options.name : void 0;

	/**
	 * @public
	 * @type {CronOptions} */
	this.options = CronOptions(options);

	/**
	 * Encapsulate all internal states in an object.
	 * Duplicate all options that can change to internal states, for example maxRuns and paused.
	 * @private
	 */
	this._states = {
		/** @type {boolean} */
		kill: false,

		/** @type {boolean} */
		blocking: false,

		/**
		 * Start time of previous trigger, updated after each trigger
		 * 
		 * Stored to use as the actual previous run, even while a new trigger
		 * is started. Used by the public funtion `.previousRun()`
		 * 
		 * @type {CronDate}
		 */
		previousRun: void 0,

		/**
		 * Start time of current trigger, this is updated just before triggering
		 * 
		 * This is used internally as "previous run", as we mostly want to know
		 * when the previous run _started_
		 * 
		 * @type {CronDate}
		 */
		currentRun: void 0,

		/** @type {CronDate|undefined} */
		once: void 0,

		/** @type {unknown|undefined} */
		currentTimeout: void 0,

		/** @type {number} */
		maxRuns: options ? options.maxRuns : void 0,

		/** @type {boolean} */
		paused: options ? options.paused : false,
		
		/**
		 * @public
		 * @type {CronPattern|undefined} */
		pattern: void 0,
	};


	// Check if we got a date, or a pattern supplied as first argument
	// Then set either this._states.once or this._states.pattern
	if (
		pattern &&
		(pattern instanceof Date || ((typeof pattern === "string") && pattern.indexOf(":") > 0))
	) {
		this._states.once = new CronDate(pattern, this.options.timezone || this.options.utcOffset);
	} else {
		this._states.pattern = new CronPattern(pattern, this.options.timezone);
	}

	// Only store the job in scheduledJobs if a name is specified in the options.
	if (this.name) {
		const existing = scheduledJobs.find((j) => j.name === this.name);
		if (existing) {
			throw new Error(
				"Cron: Tried to initialize new named job '" + this.name + "', but name already taken.",
			);
		} else {
			scheduledJobs.push(this);
		}
	}

	// Allow shorthand scheduling
	if (func !== void 0) {
		this.fn = func;
		this.schedule();
	}

	return this;
}

/**
 * Find next runtime, based on supplied date. Strips milliseconds.
 *
 * @param {CronDate|Date|string} [prev] - Date to start from
 * @returns {Date | null} - Next run time
 */
Cron.prototype.nextRun = function (prev) {
	const next = this._next(prev);
	return next ? next.getDate() : null;
};

/**
 * Find next n runs, based on supplied date. Strips milliseconds.
 *
 * @param {number} n - Number of runs to enumerate
 * @param {Date|string} [previous] - Date to start from
 * @returns {Date[]} - Next n run times
 */
Cron.prototype.nextRuns = function (n, previous) {
	if (n > this._states.maxRuns) {
		n = this._states.maxRuns;
	}
	const enumeration = [];
	let prev = previous || this._states.currentRun;
	while (n-- && (prev = this.nextRun(prev))) {
		enumeration.push(prev);
	}

	return enumeration;
};

/**
 * Return the original pattern, it there was one
 *
 * @returns {string|undefined} - Original pattern
 */
Cron.prototype.getPattern = function () {
	return this._states.pattern ? this._states.pattern.pattern : void 0;
};

/**
 * Indicates wether or not the cron job is scheduled and running, e.g. awaiting next trigger
 * @public
 *
 * @returns {boolean} - Running or not
 */
Cron.prototype.isRunning = function () {
	const msLeft = this.msToNext(this._states.currentRun);

	const isRunning = !this._states.paused;
	const isScheduled = this.fn !== void 0; 
	// msLeft will be null if _states.kill is set to true, so we don't need to check this one, but we do anyway...
	const notIsKilled = !this._states.kill;

	return isRunning && isScheduled && notIsKilled && msLeft !== null;
};

/**
 * Indicates wether or not the cron job is permanently stopped
 * @public
 *
 * @returns {boolean} - Running or not
 */
Cron.prototype.isStopped = function () {
	return this._states.kill;
};

/**
 * Indicates wether or not the cron job is currently working
 * @public
 *
 * @returns {boolean} - Running or not
 */
Cron.prototype.isBusy = function () {
	return this._states.blocking;
};

/**
 * Return current/previous run start time
 * @public
 *
 * @returns {Date | null} - Previous run time
 */
Cron.prototype.currentRun = function () {
	return this._states.currentRun ? this._states.currentRun.getDate() : null;
};

/**
 * Return previous run start time
 * @public
 *
 * @returns {Date | null} - Previous run time
 */
Cron.prototype.previousRun = function () {
	return this._states.previousRun ? this._states.previousRun.getDate() : null;
};

/**
 * Returns number of milliseconds to next run
 * @public
 *
 * @param {CronDate|Date|string} [prev] - Starting date, defaults to now - minimum interval
 * @returns {number | null}
 */
Cron.prototype.msToNext = function (prev) {
	// Get next run time
	const next = this._next(prev);

	// Default previous for millisecond calculation
	prev = new CronDate(prev, this.options.timezone || this.options.utcOffset);

	if (next) {
		return (next.getTime(true) - prev.getTime(true));
	} else {
		return null;
	}
};

/**
 * Stop execution
 *
 * Running this will forcefully stop the job, and prevent furter exection. `.resume()` will not work after stopping.
 * It will also be removed from the scheduledJobs array if it were named.
 *
 * @public
 */
Cron.prototype.stop = function () {

	// If there is a job in progress, it will finish gracefully ...

	// Flag as killed
	this._states.kill = true;

	// Stop any waiting timer
	if (this._states.currentTimeout) {
		clearTimeout(this._states.currentTimeout);
	}

	// Remove job from the scheduledJobs array to free up the name, and allow the job to be
	// garbage collected
	const jobIndex = scheduledJobs.indexOf(this);
	if (jobIndex >= 0) {
		scheduledJobs.splice(jobIndex, 1);
	}
};



/**
 * Pause execution
 * @public
 *
 * @returns {boolean} - Wether pause was successful
 */
Cron.prototype.pause = function () {
	
	this._states.paused = true;

	return !this._states.kill;
};

/**
 * Resume execution
 * @public
 *
 * @returns {boolean} - Wether resume was successful
 */
Cron.prototype.resume = function () {

	this._states.paused = false;

	return !this._states.kill;
};

/**
 * Schedule a new job
 * @public
 *
 * @param {Function} func - Function to be run each iteration of pattern
 * @param {Date} [partial] - Internal function indicating a partial run
 * @returns {Cron}
 */
Cron.prototype.schedule = function (func, partial) {
	// If a function is already scheduled, bail out
	if (func && this.fn) {
		throw new Error(
			"Cron: It is not allowed to schedule two functions using the same Croner instance.",
		);

		// Update function if passed
	} else if (func) {
		this.fn = func;
	}

	// Get ms to next run, bail out early if any of them is null (no next run)
	let waitMs = this.msToNext(partial ? partial : this._states.currentRun);
	const target = this.nextRun(partial ? partial : this._states.currentRun);
	if (waitMs === null || target === null) return this;

	// setTimeout cant handle more than Math.pow(2, 32 - 1) - 1 ms
	if (waitMs > maxDelay) {
		waitMs = maxDelay;
	}

	// Start the timer loop
	// _checkTrigger will either call _trigger (if it's time, croner isn't paused and whatever), 
	// or recurse back to this function to wait for next trigger
	this._states.currentTimeout = setTimeout(() => this._checkTrigger(target), waitMs);

	// If unref option is set - unref the current timeout, which allows the process to exit even if there is a pending schedule
	if (this._states.currentTimeout && this.options.unref) {
		unrefTimer(this._states.currentTimeout);
	}

	return this;
};

/**
 * Internal function to trigger a run, used by both scheduled and manual trigger
 * @private
 *
 * @param {Date} [initiationDate]
 */
Cron.prototype._trigger = async function (initiationDate) {

	this._states.blocking = true;

	this._states.currentRun = new CronDate(
		void 0, // We should use initiationDate, but that does not play well with fake timers in third party tests. In real world there is not much difference though */
		this.options.timezone || this.options.utcOffset,
	);

	if (this.options.catch) {
		try {
			await this.fn(this, this.options.context);
		} catch (_e) {
			if (isFunction(this.options.catch)) {
				this.options.catch(_e, this);
			}
		}
	} else {
		// Trigger the function without catching
		await this.fn(this, this.options.context);

	}

	this._states.previousRun = new CronDate(
		initiationDate,
		this.options.timezone || this.options.utcOffset,
	);

	this._states.blocking = false;

};

/**
 * Trigger a run manually
 * @public
 */
Cron.prototype.trigger = async function () {
	await this._trigger();
};

/**
 * Called when it's time to trigger.
 * Checks if all conditions are currently met,
 * then instantly triggers the scheduled function.
 * @private
 *
 * @param {Date} target - Target Date
 */
Cron.prototype._checkTrigger = function (target) {
	const now = new Date(),
		shouldRun = !this._states.paused && now.getTime() >= target,
		isBlocked = this._states.blocking && this.options.protect;

	if (shouldRun && !isBlocked) {
		this._states.maxRuns--;

		// We do not await this
		this._trigger();

	} else {
		// If this trigger were blocked, and protect is a function, trigger protect (without awaiting it, even if it's an synchronous function)
		if (shouldRun && isBlocked && isFunction(this.options.protect)) {
			setTimeout(() => this.options.protect(this), 0);
		}
	}

	// Always reschedule
	this.schedule(undefined, now);
};

/**
 * Internal version of next. Cron needs millseconds internally, hence _next.
 * @private
 *
 * @param {CronDate|Date|string} prev - previousRun
 * @returns {CronDate | null} - Next run time
 */
Cron.prototype._next = function (prev) {
	const hasPreviousRun = (prev || this._states.currentRun) ? true : false;

	// Ensure previous run is a CronDate
	prev = new CronDate(prev, this.options.timezone || this.options.utcOffset);

	// Previous run should never be before startAt
	if (this.options.startAt && prev && prev.getTime() < this.options.startAt.getTime()) {
		prev = this.options.startAt;
	}

	// Calculate next run according to pattern or one-off timestamp, pass actual previous run to increment
	const nextRun = this._states.once ||
		new CronDate(prev, this.options.timezone || this.options.utcOffset).increment(
			this._states.pattern,
			this.options,
			hasPreviousRun, // hasPreviousRun is used to allow 
		);

	if (this._states.once && this._states.once.getTime() <= prev.getTime()) {
		return null;
	} else if (
		(nextRun === null) ||
		(this._states.maxRuns <= 0) ||
		(this._states.kill) ||
		(this.options.stopAt && nextRun.getTime() >= this.options.stopAt.getTime())
	) {
		return null;
	} else {
		// All seem good, return next run
		return nextRun;
	}
};

Cron.Cron = Cron;
Cron.scheduledJobs = scheduledJobs;

export { Cron, Cron as default, scheduledJobs };
