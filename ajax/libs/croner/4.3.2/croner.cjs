(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Cron = factory());
})(this, (function () { 'use strict';

	/**
	 * "Converts" a date to a specific time zone
	 * 
	 * Note: This is only for specific and controlled usage, 
	 * as the internal UTC time of the resulting object will be off.
	 * 
	 * Example:
	 *   let normalDate = new Date(); // d is a normal Date instance, with local timezone and correct utc representation
	 *       tzDate = CronTZ(d, 'America/New_York') // d is a tainted Date instance, where getHours() 
	 *                                                 (for example) will return local time in new york, but getUTCHours()
	 *                                                 will return something irrelevant.
	 * 
	 * @param {Date} date - Input date
	 * @param {string} tzString - Timezone string in Europe/Stockholm format
	 * @returns {Date}
	 */
	function CronTZ(date, tzString) {
		return new Date(date.toLocaleString("en-US", {timeZone: tzString}));   
	}

	/**
	 * @typedef {Object} CronOptions - Cron scheduler options
	 * @property {boolean} [paused] - Job is paused
	 * @property {boolean} [kill] - Job is about to be killed or killed
	 * @property {boolean} [catch] - Continue exection even if a unhandled error is thrown by triggered function
	 * @property {number} [maxRuns] - Maximum nuber of executions
	 * @property {number} [interval] - Minimum interval between executions, in seconds
	 * @property {string | Date} [startAt] - When to start running
	 * @property {string | Date} [stopAt] - When to stop running
	 * @property {string} [timezone] - Time zone in Europe/Stockholm format
	 * @property {boolean} [legacyMode] - Combine day-of-month and day-of-week using OR. Default is AND.
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
		
		// Keep options, or set defaults
		options.legacyMode = (options.legacyMode === void 0) ? false : options.legacyMode;
		options.paused = (options.paused === void 0) ? false : options.paused;
		options.maxRuns = (options.maxRuns === void 0) ? Infinity : options.maxRuns;
		options.catch = (options.catch === void 0) ? false : options.catch;
		options.interval = (options.interval === void 0) ? 0 : parseInt(options.interval);
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
	 * Converts date to CronDate
	 * @constructor
	 * 
	 * @param {CronDate|date|string} [date] - Input date, if using string representation ISO 8001 (2015-11-24T19:40:00) local timezone is expected
	 * @param {string} [timezone] - String representation of target timezone in Europe/Stockholm format.
	*/
	function CronDate (date, timezone) {	

		this.timezone = timezone;

		if (date && date instanceof Date) {
			if (!isNaN(date)) {
				this.fromDate(date);
			} else {
				throw new TypeError("CronDate: Invalid date passed as parameter to CronDate constructor");
			}
		} else if (date === void 0) {
			this.fromDate(new Date());
		} else if (date && typeof date === "string") {
			this.fromString(date);
		} else if (date instanceof CronDate) {
			this.fromCronDate(date);
		} else {
			throw new TypeError("CronDate: Invalid type (" + typeof date + ") passed as parameter to CronDate constructor");
		}

	}

	/**
	 * Sets internals using a Date 
	 * @private
	 * 
	 * @param {Date} date - Input date
	 */
	CronDate.prototype.fromDate = function (date) {
		
		if (this.timezone) {
			date = CronTZ(date, this.timezone);
		}

		this.milliseconds = date.getMilliseconds();
		this.seconds = date.getSeconds();
		this.minutes = date.getMinutes();
		this.hours = date.getHours();
		this.days = date.getDate();
		this.months  = date.getMonth();
		this.years = date.getFullYear();

	};

	/**
	 * Sets internals by deep copying another CronDate
	 * @private
	 * 
	 * @param {CronDate} date - Input date
	 */
	CronDate.prototype.fromCronDate = function (date) {
		this.timezone = date.timezone;
		this.milliseconds = date.milliseconds;
		this.seconds = date.seconds;
		this.minutes = date.minutes;
		this.hours = date.hours;
		this.days = date.days;
		this.months = date.months;
		this.years = date.years;
	};

	/**
	 * Reset internal parameters (seconds, minutes, hours) that may have exceeded their ranges
	 * @private
	 * 
	 * @param {Date} date - Input date
	 */
	CronDate.prototype.apply = function () {
		const newDate = new Date(this.years, this.months, this.days, this.hours, this.minutes, this.seconds, this.milliseconds);
		
		this.milliseconds = newDate.getMilliseconds();
		this.seconds = newDate.getSeconds();
		this.minutes = newDate.getMinutes();
		this.hours = newDate.getHours();
		this.days = newDate.getDate();
		this.months  = newDate.getMonth();
		this.years = newDate.getFullYear();
	};

	/**
	 * Sets internals by parsing a string
	 * @private
	 * 
	 * @param {Date} date - Input date
	 */
	CronDate.prototype.fromString = function (str) {

		const parsedDate = this.parseISOLocal(str);

		// Throw if we did get an invalid date
		if( isNaN(parsedDate) ) {
			throw new TypeError("CronDate: Provided string value for CronDate could not be parsed as date.");
		}
		
		this.fromDate(parsedDate);
	};

	/**
	 * Increment to next run time
	 * @public
	 * 
	 * @param {string} pattern - The pattern used to increment current state
	 * @param {CronOptions} options - Cron options used for incrementing
	 * @param {boolean} [rerun=false] - If this is an internal incremental run
	 * @param {boolean} [hasPreviousRun] - If this run should adhere to minimum interval
	 * @return {CronDate|null} - Returns itself for chaining, or null if increment wasnt possible
	 */
	CronDate.prototype.increment = function (pattern, options, rerun, hasPreviousRun) {
		
		// Always add one second, or minimum interval
		if (!rerun) {
			if (options.interval > 1 && hasPreviousRun) {
				this.seconds += options.interval;
			} else {
				this.seconds += 1;
			}
		}

		this.apply();

		this.milliseconds = 0;
		
		const 
		
			origTime = this.getTime(),

			/**
			 * Find next
			 * 
			 * @param {string} target
			 * @param {string} pattern
			 * @param {string} offset
			 * @param {string} override
			 * 
			 * @returns {boolean}
			 * 
			 */
			findNext = (target, pattern, offset, override) => {
				
				const startPos = (override === void 0) ? this[target] + offset : 0;

				for( let i = startPos; i < pattern[target].length; i++ ) {

					// This applies to all "levels"
					let match = pattern[target][i];

					// Days has a couple of special cases
					if (target === "days") {

						// Create a date object for the target date
						let targetDate = this.getDate(true);
						targetDate.setDate(i-offset);

						// Special handling for L (last day of month), when we are searching for days
						if (pattern.lastDayOfMonth) {

							// Create a copy of targetDate
							// Set days to one day after today, if month changes, then we are at the last day of the month
							let targetDateCopy = new Date(targetDate);
							targetDateCopy.setDate(i-offset+1);
					
							// Overwrite match if last day of month is matching
							if (targetDateCopy.getMonth() !== this.months) {
								match = true;
							}
							
						}

						// Weekdays must also match when incrementing days
						// If running in legacy mode, it is sufficient that only weekday match.
						const dowMatch = pattern.daysOfWeek[targetDate.getDay()];
						if (options.legacyMode) {
							if (!pattern.starDayOfWeek && pattern.starDayOfMonth) {
								match = dowMatch;
							} else if (!pattern.starDayOfWeek && !pattern.starDayOfMonth) {
								match = match || dowMatch;
							}
						} else {
							// dom AND dow
							match = match && dowMatch;
						}

					}

					if (match) {
						this[target] = i-offset;
						return true;
					}

				}
				return false;

			},
			
			resetPrevious = (offset) => {
				// Now when we have gone to next minute, we have to set seconds to the first match
				// Now we are at 00:01:05 following the same example.
				// 
				// This goes all the way back to seconds, hence the reverse loop.
				while(doing + offset >= 0) {

					// Ok, reset current member(e.g. seconds) to first match in pattern, using 
					// the same method as aerlier
					// 
					// Note the fourth parameter, stating that we should start matching the pattern
					// from zero, instead of current time.
					findNext(toDo[doing + offset][0], pattern, toDo[doing + offset][2], 0);

					// Go back up, days -> hours -> minutes -> seconds
					doing--;
				}
			};

		// Array of work to be done, consisting of subarrays described below:
		// [
		//   First item is which member to process,
		//   Second item is which member to increment if we didn't find a mathch in current item,
		//   Third item is an offset. if months is handled 0-11 in js date object, and we get 1-12
		//   from pattern. Offset should be -1
		// ]
		const toDo = [
			["seconds", "minutes", 0],
			["minutes", "hours", 0],
			["hours", "days", 0],
			["days", "months", -1],
			["months", "years", 0]
		];

		// Ok, we're working our way trough the toDo array, top to bottom
		// If we reach 5, work is done
		let doing = 0;
		while(doing < 5) {

			// findNext sets the current member to next match in pattern
			// If time is 00:00:01 and pattern says *:*:05, seconds will
			// be set to 5

			// Store current value at current level
			let currentValue = this[toDo[doing][0]];
			
			// If pattern didn't provide a match, increment next value (e.g. minues)
			if(!findNext(toDo[doing][0], pattern, toDo[doing][2])) {

				this[toDo[doing][1]]++;

				// Reset current level and previous levels
				resetPrevious(0);

			// If pattern provided a match, but changed current value ...
			} else if (currentValue !== this[toDo[doing][0]]) {

				// Reset previous levels
				resetPrevious(-1);

			}

			// Bail out if an impossible pattern is used
			if (this.years >= 4000) {
				return null;
			}

			// Gp down, seconds -> minutes -> hours -> days -> months -> year
			doing++;
		}

		// If anything changed, recreate this CronDate and run again without incrementing
		this.default = false;
		if (origTime != this.getTime()) {
			this.apply();
			return this.increment(pattern, options, true, hasPreviousRun);
		} else {
			return this;
		}
		
	};

	/**
	 * Convert current state back to a javascript Date()
	 * @public
	 * 
	 * @param {boolean} internal - If this is an internal call
	 * @returns {Date}
	 */
	CronDate.prototype.getDate = function (internal) {
		const targetDate = new Date(this.years, this.months, this.days, this.hours, this.minutes, this.seconds, this.milliseconds);
		if (internal || !this.timezone) {
			return targetDate;
		} else {
			const offset = CronTZ(targetDate, this.timezone).getTime()-targetDate.getTime();
			return new Date(targetDate.getTime()-offset);
		}
	};

	/**
	 * Convert current state back to a javascript Date() and return UTC milliseconds
	 * @public
	 * 
	 * @param {boolean} internal - If this is an internal call
	 * @returns {Date}
	 */
	CronDate.prototype.getTime = function (internal) {
		return this.getDate(internal).getTime();
	};

	/**
	 * Takes a iso 8001 local date time string and creates a Date object
	 * @private
	 * 
	 * @param {string} dateTimeString - an ISO 8001 format date and time string
	 *                      with all components, e.g. 2015-11-24T19:40:00
	 * @returns {Date|number} - Date instance from parsing the string. May be NaN.
	 */
	CronDate.prototype.parseISOLocal = function (dateTimeString) {
		const dateTimeStringSplit = dateTimeString.split(/\D/);

		// Check for completeness
		if (dateTimeStringSplit.length < 6) {
			return NaN;
		}

		const
			year = parseInt(dateTimeStringSplit[0], 10),
			month = parseInt(dateTimeStringSplit[1], 10),
			day = parseInt(dateTimeStringSplit[2], 10),
			hour = parseInt(dateTimeStringSplit[3], 10),
			minute = parseInt(dateTimeStringSplit[4], 10),
			second = parseInt(dateTimeStringSplit[5], 10);

		// Check parts for numeric
		if( isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second) ) {
			return NaN;
		} else {
			let generatedDate;

			// Check for UTC flag
			if ((dateTimeString.indexOf("Z") > 0)) {

				// Handle date as UTC
				generatedDate = new Date(Date.UTC(year, month-1, day, hour, minute, second));

				// Check generated date
				if (year == generatedDate.getUTCFullYear()
					&& month == generatedDate.getUTCMonth()+1
					&& day == generatedDate.getUTCDate()
					&& hour == generatedDate.getUTCHours()
					&& minute == generatedDate.getUTCMinutes()
					&& second == generatedDate.getUTCSeconds()) {
					return generatedDate;
				} else {
					return NaN;
				}
			} else {

				// Handle date as local time
				generatedDate = new Date(year, month-1, day, hour, minute, second);

				// Check generated date
				if (year == generatedDate.getFullYear()
					&& month == generatedDate.getMonth()+1
					&& day == generatedDate.getDate()
					&& hour == generatedDate.getHours()
					&& minute == generatedDate.getMinutes()
					&& second == generatedDate.getSeconds()) {
					return generatedDate;
				} else {
					return NaN;
				}
			}
		}
	};

	/**
	 * Name for each part of the cron pattern
	 * @typedef {("seconds" | "minutes" | "hours" | "days" | "months" | "daysOfWeek")} CronPatternPart
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

		this.seconds        = Array(60).fill(0); // 0-59
		this.minutes        = Array(60).fill(0); // 0-59
		this.hours          = Array(24).fill(0); // 0-23
		this.days           = Array(31).fill(0); // 0-30 in array, 1-31 in config
		this.months         = Array(12).fill(0); // 0-11 in array, 1-12 in config
		this.daysOfWeek     = Array(8).fill(0);  // 0-7 Where 0 = Sunday and 7=Sunday;

		this.lastDayOfMonth = false;
		this.starDayOfMonth = false;
		this.starDayOfWeek  = false;

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
		this.pattern = this.handleNicknames(this.pattern);

		// Split configuration on whitespace
		const parts = this.pattern.trim().replace(/\s+/g, " ").split(" ");

		// Validite number of configuration entries
		if( parts.length < 5 || parts.length > 6 ) {
			throw new TypeError("CronPattern: invalid configuration format ('" + this.pattern + "'), exacly five or six space separated parts required.");
		}

		// If seconds is omitted, insert 0 for seconds
		if( parts.length === 5) {
			parts.unshift("0");
		}

		// Convert 'L' to lastDayOfMonth flag,
		// and set days to 28,29,30,31 as those are the only days that can be the last day of month
		if(parts[3].indexOf("L") >= 0) {
			parts[3] = parts[3].replace("L","");
			this.lastDayOfMonth = true;
		}

		// Check for starDayOfMonth
		if(parts[3].toUpperCase() == "*") {
			this.starDayOfMonth = true;
		}

		// Replace alpha representations
		parts[4] = this.replaceAlphaMonths(parts[4]);
		parts[5] = this.replaceAlphaDays(parts[5]);

		// Check for starDayOfWeek
		if(parts[5].toUpperCase() == "*") {
			this.starDayOfWeek = true;
		}
		
		// Implement '?' in the simplest possible way - replace ? with current value, before further processing
		let initDate = new CronDate(new Date(),this.timezone).getDate(true);

		parts[0] = parts[0].replace("?", initDate.getSeconds());
		parts[1] = parts[1].replace("?", initDate.getMinutes());
		parts[2] = parts[2].replace("?", initDate.getHours());
		parts[3] = parts[3].replace("?", initDate.getDate());
		parts[4] = parts[4].replace("?", initDate.getMonth()+1); // getMonth is zero indexed while pattern starts from 1
		parts[5] = parts[5].replace("?", initDate.getDay());

		// Check part content
		this.throwAtIllegalCharacters(parts);

		// Parse parts into arrays, validates as we go
		this.partToArray("seconds",    parts[0], 0);
		this.partToArray("minutes",    parts[1], 0);
		this.partToArray("hours",      parts[2], 0);
		this.partToArray("days",       parts[3], -1);
		this.partToArray("months",     parts[4], -1);
		this.partToArray("daysOfWeek", parts[5], 0);

		// 0 = Sunday, 7 = Sunday
		if( this.daysOfWeek[7] ) {
			this.daysOfWeek[0] = 1;
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
	CronPattern.prototype.partToArray = function (type, conf, valueIndexOffset, recursed) {

		const arr = this[type];

		// First off, handle wildcard
		if( conf === "*" ) {
			for( let i = 0; i < arr.length; i++ ) {
				arr[i] = 1;
			}
			return;
		}

		// Handle separated entries (,) by recursion
		const split = conf.split(",");
		if( split.length > 1 ) {
			for( let i = 0; i < split.length; i++ ) {
				this.partToArray(type, split[i], valueIndexOffset, true);
			}

		// Handle range with stepping (x-y/z)
		} else if( conf.indexOf("-") !== -1 && conf.indexOf("/") !== -1 ) {
			if (recursed) throw new Error("CronPattern: Range with stepping cannot coexist with ,");

			this.handleRangeWithStepping(conf, type, valueIndexOffset);
		
		// Handle range
		} else if( conf.indexOf("-") !== -1 ) {
			if (recursed) throw new Error("CronPattern: Range with stepping cannot coexist with ,");

			this.handleRange(conf, type, valueIndexOffset);

		// Handle stepping
		} else if( conf.indexOf("/") !== -1 ) {
			if (recursed) throw new Error("CronPattern: Range with stepping cannot coexist with ,");

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
		if( steps > this[type].length ) throw new TypeError("CronPattern: Syntax error, steps cannot be greater than maximum value of part ("+this[type].length+")");

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

		Copyright (c) 2015-2021 Hexagon <github.com/Hexagon>

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
	 * @type {number}
	 */
	const maxDelay = Math.pow(2, 32 - 1) - 1;
		
	/**
	 * Cron entrypoint
	 * 
	 * @constructor
	 * @param {string|Date} pattern - Input pattern, input date, or input ISO 8601 time string
	 * @param {CronOptions|Function} [options] - Options
	 * @param {Function} [func] - Function to be run each iteration of pattern
	 * @returns {Cron}
	 */
	function Cron (pattern, options, func) {
		
		// Optional "new" keyword
		if( !(this instanceof Cron) ) {
			return new Cron(pattern, options, func);
		}
		
		// Make options optional
		if( typeof options === "function" ) {
			func = options;
			options = void 0;
		}
		
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
		const enumeration = [];
		while(n-- && (previous = this.next(previous))) {
			enumeration.push(previous);
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
	 * Pause executionR
	 * @public
	 * 
	 * @returns {boolean} - Wether pause was successful
	 */
	Cron.prototype.pause = function () {
		return (this.options.paused = true) && !this.options.kill;
	};
		
	/**
	 * Pause execution
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
	 * @returns {Cron}
	 */
	Cron.prototype.schedule = function (func) {
		
		// If a function is already scheduled, bail out
		if (func && this.fn) {
			throw new Error("Cron: It is not allowed to schedule two functions using the same Croner instance.");
			
			// Update function if passed
		} else if (func) {
			this.fn = func;
		}
		
		// Get ms to next run, bail out early if waitMs is null (no next run)
		let waitMs = this.msToNext(this.previousrun);
		if  ( waitMs === null )  return this;
		
		// setTimeout cant handle more than Math.pow(2, 32 - 1) - 1 ms
		if( waitMs > maxDelay ) {
			waitMs = maxDelay;
		}
		
		// Ok, go!
		this.currentTimeout = setTimeout(() => {
		
			if( waitMs !== maxDelay && !this.options.paused ) {
		
				this.options.maxRuns--;
		
				// Always catch errors, but only re-throw if options.catch is not set
				if (this.options.catch) {
					try {
						this.fn(this, this.options.context);
					} catch (_e) {
						// Ignore
					}
				} else {
					this.fn(this, this.options.context);
				}
		
				// Set previous run to now
				this.previousrun = new CronDate(void 0, this.options.timezone);
		
			}
		
			// Recurse
			this.schedule();
		
		}, waitMs );
			
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
		if( this.options.startAt && prev && prev.getTime(true) < this.options.startAt.getTime(true) ) {
			prev = this.options.startAt;
		}

		// Calculate next run according to pattern or one-off timestamp, pass actual previous run to increment
		const 
			nextRun = this.once || new CronDate(prev, this.options.timezone).increment(this.pattern, this.options, false, hasPreviousRun);
		
		if (this.once && this.once.getTime(true) <= prev.getTime(true)) {
			return null;
	  
		} else if ((nextRun === null) ||
			(this.options.maxRuns <= 0) ||	
			(this.options.kill) ||
			(this.options.stopAt && nextRun.getTime(true) >= this.options.stopAt.getTime(true) )) {
			return null;

		} else {
			// All seem good, return next run
			return nextRun;
	  
		}
			
	};

	return Cron;

}));
