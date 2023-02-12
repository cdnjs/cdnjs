(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Cron = factory());
})(this, (function () { 'use strict';

	/* ------------------------------------------------------------------------------------

		minitz - MIT License - Hexagon <hexagon@56k.guru>

		Version 4.0.4
		
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
		const td = new Date(d.toLocaleString("sv-SE", {timeZone: tzStr}));
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
		const tz = date.toLocaleString("en", {timeZone, timeStyle: "long"}).split(" ").slice(-1)[0];

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
	 */

	/**
	 * @typedef {Object} CronOptions - Cron scheduler options
	 * @property {string} [name] - Name of a job
	 * @property {boolean} [paused] - Job is paused
	 * @property {boolean} [kill] - Job is about to be killed or killed
	 * @property {boolean | CatchCallbackFn} [catch] - Continue exection even if a unhandled error is thrown by triggered function
	 * 										  - If set to a function, execute function on catching the error.
	 * @property {number} [maxRuns] - Maximum nuber of executions
	 * @property {number} [interval] - Minimum interval between executions, in seconds
	 * @property {string | Date} [startAt] - When to start running
	 * @property {string | Date} [stopAt] - When to stop running
	 * @property {string} [timezone] - Time zone in Europe/Stockholm format
	 * @property {boolean} [legacyMode] - Combine day-of-month and day-of-week using true = OR, false = AND. Default is OR.
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
		options.kill = false;
		
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

		return options;

	}

	/** 
	 * Constant defining the minimum number of days per month where index 0 = January etc.
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
	 * @param {string} [tz] - String representation of target timezone in Europe/Stockholm format.
	*/
	function CronDate (d, tz) {	

		/**
		 * TimeZone
		 * @type {string|undefined}
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
		if (this.tz) {
			const d = minitz.toTZ(inDate, this.tz);
			this.ms = inDate.getMilliseconds();
			this.second = d.s;
			this.minute = d.i;
			this.hour = d.h;
			this.day = d.d;
			this.month  = d.m - 1;
			this.year = d.y;
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
	 * Reset internal parameters (seconds, minutes, hours) if any of them have exceeded (or could have exceeded) their ranges
	 * @private
	 */
	CronDate.prototype.apply = function () {
		// If any value could be out of bounds, apply 
		if (this.month>11||this.day>DaysOfMonth[this.month]||this.hour>59||this.minute>59||this.second>59) {
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
		if (pattern.lastDayOfMonth) {
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
				const dowMatch = pattern.dow[(fDomWeekDay + ((i-offset) - 1)) % 7];
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
		
		// Always add one second, or minimum interval, then clear milliseconds and apply changes if seconds has gotten out of bounds
		if (options.interval > 1 && hasPreviousRun) {
			this.second += options.interval;
		} else {
			this.second += 1;
		}
		this.ms = 0;
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
		if (internal || !this.tz) {
			return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.ms);
		} else {
			return minitz(this.year, this.month+1, this.day, this.hour, this.minute, this.second, this.tz);
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
	 * @typedef {("second" | "minute" | "hour" | "day" | "month" | "dow")} CronPatternPart
	 */

	/**
	 * Offset, 0 or -1. 
	 * 
	 * 0 for seconds,minutes and hours as they start on 1. 
	 * -1 on days and months, as the start on 0
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
		this.dow			= Array(8).fill(0);  // 0-7 Where 0 = Sunday and 7=Sunday;

		this.lastDayOfMonth = false;
		this.starDOM = false;
		this.starDOW  = false;

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

		// Convert 'L' to lastDayOfMonth flag,
		if(parts[3].indexOf("L") >= 0) {
			parts[3] = parts[3].replace("L","");
			this.lastDayOfMonth = true;
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
		this.partToArray("dow",       parts[5], 0);

		// 0 = Sunday, 7 = Sunday
		if( this.dow[7] ) {
			this.dow[0] = 1;
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

	/* ------------------------------------------------------------------------------------

	  Croner - MIT License - Hexagon <github.com/Hexagon>

	  Pure JavaScript Isomorphic cron parser and scheduler without dependencies.

	  ------------------------------------------------------------------------------------

	  License:

		Copyright (c) 2015-2022 Hexagon <github.com/Hexagon>

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
	function Cron (pattern, fnOrOptions1, fnOrOptions2) {
		
		// Optional "new" keyword
		if( !(this instanceof Cron) ) {
			return new Cron(pattern, fnOrOptions1, fnOrOptions2);
		}
		
		// Make options and func optional and interchangable
		let options, func;

		if( typeof fnOrOptions1 === "function" ) {
			func = fnOrOptions1;
		} else if( typeof fnOrOptions1 === "object" ) {
			options = fnOrOptions1;
		} else if( fnOrOptions1 !== void 0) {
			throw new Error("Cron: Invalid argument passed for optionsIn. Should be one of function, or object (options).");
		}

		if( typeof fnOrOptions2 === "function" ) {
			func = fnOrOptions2;
		} else if( typeof fnOrOptions2 === "object" ) {
			options = fnOrOptions2;
		} else if( fnOrOptions2 !== void 0) {
			throw new Error("Cron: Invalid argument passed for funcIn. Should be one of function, or object (options).");
		}
		
		/** @type {string|undefined} */
		this.name = options ? options.name : void 0;
		
		/** @type {CronOptions} */
		this.options = CronOptions(options);
		
		/** @type {CronDate|undefined} */
		this.once = void 0;
		
		/** @type {CronPattern|undefined} */
		this.pattern = void 0;
		
		// Check if we got a date, or a pattern supplied as first argument
		// Then set either this.once or this.pattern
		if (pattern && (pattern instanceof Date || ((typeof pattern === "string") && pattern.indexOf(":") > 0))) {
			this.once = new CronDate(pattern, this.options.timezone);
		} else {
			this.pattern = new CronPattern(pattern, this.options.timezone);
		}
		
		// Allow shorthand scheduling
		if( func !== void 0 ) {
			this.fn = func;
			this.schedule();
		}
		
		// Only store the job in scheduledJobs if a name is specified in the options.
		if (this.name) {
			const existing = scheduledJobs.find(j => j.name === this.name);
			if (existing) {
				throw new Error("Cron: Tried to initialize new named job '"+this.name+"', but name already taken.");
			} else {
				scheduledJobs.push(this);
			}
			
		}

		return this;
		
	}
		
	/**
	 * Find next runtime, based on supplied date. Strips milliseconds.
	 * 
	 * @param {CronDate|Date|string} [prev] - Date to start from
	 * @returns {Date | null} - Next run time
	 */
	Cron.prototype.next = function (prev) {
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
	Cron.prototype.enumerate = function (n, previous) {
		if(n > this.options.maxRuns){
			n = this.options.maxRuns;
		}
		const enumeration = [];
		let prev = previous || this.previousrun;
		while(n-- && (prev = this.next(prev))) {
			enumeration.push(prev);
		}
		
		return enumeration;
	};
		
	/**
	 * Is running?
	 * @public
	 * 
	 * @returns {boolean} - Running or not
	 */
	Cron.prototype.running = function () {
		const msLeft = this.msToNext(this.previousrun);
		const running = !this.options.paused && this.fn !== void 0;
		return msLeft !== null && running;
	};
		
	/**
	 * Return previous run time
	 * @public
	 * 
	 * @returns {Date | null} - Previous run time
	 */
	Cron.prototype.previous = function () {
		return this.previousrun ? this.previousrun.getDate() : null;
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
		prev = new CronDate(prev, this.options.timezone);

		if( next ) {
			return (next.getTime(true) - prev.getTime(true));
		} else {
			return null;
		}
	};
		
	/**
	 * Stop execution 
	 * 
	 * Running this will forcefully stop the job, and prevent furter exection. `.resume()` will not work after stopping.
	 * 
	 * @public
	 */
	Cron.prototype.stop = function () {
		this.options.kill = true;
		// Stop any awaiting call
		if( this.currentTimeout ) {
			clearTimeout( this.currentTimeout );
		}
	};
		
	/**
	 * Pause execution
	 * @public
	 * 
	 * @returns {boolean} - Wether pause was successful
	 */
	Cron.prototype.pause = function () {
		return (this.options.paused = true) && !this.options.kill;
	};
		
	/**
	 * Resume execution
	 * @public
	 * 
	 * @returns {boolean} - Wether resume was successful
	 */
	Cron.prototype.resume = function () {
		return !(this.options.paused = false) && !this.options.kill;
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
			throw new Error("Cron: It is not allowed to schedule two functions using the same Croner instance.");
			
			// Update function if passed
		} else if (func) {
			this.fn = func;
		}
		
		// Get ms to next run, bail out early if waitMs is null (no next run)
		let	waitMs = this.msToNext(partial ? partial : this.previousrun);
		const target = this.next(partial ? partial :  this.previousrun);

		if  ( waitMs === null )  return this;
		
		// setTimeout cant handle more than Math.pow(2, 32 - 1) - 1 ms
		if( waitMs > maxDelay ) {
			waitMs = maxDelay;
		}
		
		// Ok, go!
		this.currentTimeout = setTimeout(() => {
		
			const now = new Date();

			if( waitMs !== maxDelay && !this.options.paused && now.getTime() >= target ) {
		
				this.options.maxRuns--;
		
				// Always catch errors
				//  - re-throw if options.catch is not set
				//	- call callback if options.catch is set to a function
				//  - ignore if options.catch is set to any other truthy value
				if (this.options.catch) {
					// We don't wan't croner to stop even if a job is running over next
					// - so we wrap the function in a non-awaited anonymous function clause
					(async (inst) => {
						try {
							await inst.fn(inst, inst.options.context);
						} catch (_e) {
							if (
								Object.prototype.toString.call(inst.options.catch) === "[object Function]"
								|| "function" === typeof inst.options.catch
								|| inst.options.catch instanceof Function
							) {
								inst.options.catch(_e);
							}
						}
					})(this);
				} else {
					this.fn(this, this.options.context);
				}
		
				// Set previous run to now
				this.previousrun = new CronDate(void 0, this.options.timezone);
		
				// Recurse
				this.schedule();
				
			} else {
				// Partial
				this.schedule(undefined, now);
			}
		
		
		}, waitMs);
			
		return this;
		
	};

		
	/**
	 * Internal version of next. Cron needs millseconds internally, hence _next.
	 * @private
	 * 
	 * @param {CronDate|Date|string} prev - PreviousRun
	 * @returns {CronDate | null} - Next run time
	 */
	Cron.prototype._next = function (prev) {

		const hasPreviousRun = (prev || this.previousrun) ? true : false;

		// Ensure previous run is a CronDate
		prev = new CronDate(prev, this.options.timezone);

		// Previous run should never be before startAt
		if( this.options.startAt && prev && prev.getTime() < this.options.startAt.getTime() ) {
			prev = this.options.startAt;
		}

		// Calculate next run according to pattern or one-off timestamp, pass actual previous run to increment
		const 
			nextRun = this.once || new CronDate(prev, this.options.timezone).increment(this.pattern, this.options, hasPreviousRun);
		
		if (this.once && this.once.getTime() <= prev.getTime()) {
			return null;
	  
		} else if ((nextRun === null) ||
			(this.options.maxRuns <= 0) ||	
			(this.options.kill) ||
			(this.options.stopAt && nextRun.getTime() >= this.options.stopAt.getTime() )) {
			return null;

		} else {
			// All seem good, return next run
			return nextRun;

		}
			
	};

	Cron.Cron = Cron;
	Cron.scheduledJobs = scheduledJobs;

	return Cron;

}));
