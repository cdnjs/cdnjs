/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.5.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

/* Display a countdown timer.
   Attach it with options like:
   $('div selector').countdown(
       {until: new Date(2009, 1 - 1, 1, 0, 0, 0), onExpiry: happyNewYear}); */

(function($) { // Hide scope, no $ conflict

/* Countdown manager. */
function Countdown() {
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		// The display texts for the counters
		labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
		// The display texts for the counters if only one
		labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
		compactLabels: ['y', 'm', 'w', 'd'], // The compact texts for the counters
		timeSeparator: ':', // Separator for time periods
		isRTL: false // True for right-to-left languages, false for left-to-right
	};
	this._defaults = {
		until: null, // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to
			// or numeric for seconds offset, or string for unit offset(s):
			// 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
		since: null, // new Date(year, mth - 1, day, hr, min, sec) - date/time to count up from
			// or numeric for seconds offset, or string for unit offset(s):
			// 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
		timezone: null, // The timezone (hours or minutes from GMT) for the target times,
			// or null for client local
		serverSync: null, // A function to retrieve the current server time for synchronisation
		format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
			// 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
		layout: '', // Build your own layout for the countdown
		compact: false, // True to display in a compact format, false for an expanded one
		description: '', // The description displayed for the countdown
		expiryUrl: '', // A URL to load upon expiry, replacing the current page
		expiryText: '', // Text to display upon expiry, replacing the countdown
		alwaysExpire: false, // True to trigger onExpiry even if never counted down
		onExpiry: null, // Callback when the countdown expires -
			// receives no parameters and 'this' is the containing division
		onTick: null // Callback when the countdown is updated -
			// receives int[7] being the breakdown by period (based on format)
			// and 'this' is the containing division
	};
	$.extend(this._defaults, this.regional['']);
}

var PROP_NAME = 'countdown';

var Y = 0; // Years
var O = 1; // Months
var W = 2; // Weeks
var D = 3; // Days
var H = 4; // Hours
var M = 5; // Minutes
var S = 6; // Seconds

$.extend(Countdown.prototype, {
	/* Class name added to elements to indicate already configured with countdown. */
	markerClassName: 'hasCountdown',
	
	/* Shared timer for all countdowns. */
	_timer: setInterval(function() { $.countdown._updateTargets(); }, 980),
	/* List of currently active countdown targets. */
	_timerTargets: [],
	
	/* Override the default settings for all instances of the countdown widget.
	   @param  options  (object) the new settings to use as defaults */
	setDefaults: function(options) {
		this._resetExtraLabels(this._defaults, options);
		extendRemove(this._defaults, options || {});
	},

	/* Convert a date/time to UTC.
	   @param  tz     (number) the hour or minute offset from GMT, e.g. +9, -360
	   @param  year   (Date) the date/time in that timezone or
	                  (number) the year in that timezone
	   @param  month  (number, optional) the month (0 - 11) (omit if year is a Date)
	   @param  day    (number, optional) the day (omit if year is a Date)
	   @param  hours  (number, optional) the hour (omit if year is a Date)
	   @param  mins   (number, optional) the minute (omit if year is a Date)
	   @param  secs   (number, optional) the second (omit if year is a Date)
	   @param  ms     (number, optional) the millisecond (omit if year is a Date)
	   @return  (Date) the equivalent UTC date/time */
	UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
		if (typeof year == 'object' && year.constructor == Date) {
			ms = year.getMilliseconds();
			secs = year.getSeconds();
			mins = year.getMinutes();
			hours = year.getHours();
			day = year.getDate();
			month = year.getMonth();
			year = year.getFullYear();
		}
		var d = new Date();
		d.setUTCFullYear(year);
		d.setUTCDate(1);
		d.setUTCMonth(month || 0);
		d.setUTCDate(day || 1);
		d.setUTCHours(hours || 0);
		d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
		d.setUTCSeconds(secs || 0);
		d.setUTCMilliseconds(ms || 0);
		return d;
	},

	/* Attach the countdown widget to a div.
	   @param  target   (element) the containing division
	   @param  options  (object) the initial settings for the countdown */
	_attachCountdown: function(target, options) {
		var $target = $(target);
		if ($target.hasClass(this.markerClassName)) {
			return;
		}
		$target.addClass(this.markerClassName);
		var inst = {options: $.extend({}, options),
			_periods: [0, 0, 0, 0, 0, 0, 0]};
		$.data(target, PROP_NAME, inst);
		this._changeCountdown(target);
	},

	/* Add a target to the list of active ones.
	   @param  target  (element) the countdown target */
	_addTarget: function(target) {
		if (!this._hasTarget(target)) {
			this._timerTargets.push(target);
		}
	},

	/* See if a target is in the list of active ones.
	   @param  target  (element) the countdown target
	   @return  (boolean) true if present, false if not */
	_hasTarget: function(target) {
		return ($.inArray(target, this._timerTargets) > -1);
	},

	/* Remove a target from the list of active ones.
	   @param  target  (element) the countdown target */
	_removeTarget: function(target) {
		this._timerTargets = $.map(this._timerTargets,
			function(value) { return (value == target ? null : value); }); // delete entry
	},

	/* Update each active timer target. */
	_updateTargets: function() {
		for (var i = 0; i < this._timerTargets.length; i++) {
			this._updateCountdown(this._timerTargets[i]);
		}
	},

	/* Redisplay the countdown with an updated display.
	   @param  target  (jQuery) the containing division
	   @param  inst    (object) the current settings for this instance */
	_updateCountdown: function(target, inst) {
		var $target = $(target);
		inst = inst || $.data(target, PROP_NAME);
		if (!inst) {
			return;
		}
		$target.html(this._generateHTML(inst));
		$target[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('countdown_rtl');
		var onTick = this._get(inst, 'onTick');
		if (onTick) {
			onTick.apply(target, [inst._hold != 'lap' ? inst._periods :
				this._calculatePeriods(inst, inst._show, new Date())]);
		}
		var expired = inst._hold != 'pause' &&
			(inst._since ? inst._now.getTime() <= inst._since.getTime() :
			inst._now.getTime() >= inst._until.getTime());
		if (expired && !inst._expiring) {
			inst._expiring = true;
			if (this._hasTarget(target) || this._get(inst, 'alwaysExpire')) {
				this._removeTarget(target);
				var onExpiry = this._get(inst, 'onExpiry');
				if (onExpiry) {
					onExpiry.apply(target, []);
				}
				var expiryText = this._get(inst, 'expiryText');
				if (expiryText) {
					var layout = this._get(inst, 'layout');
					inst.options.layout = expiryText;
					this._updateCountdown(target, inst);
					inst.options.layout = layout;
				}
				var expiryUrl = this._get(inst, 'expiryUrl');
				if (expiryUrl) {
					window.location = expiryUrl;
				}
			}
			inst._expiring = false;
		}
		else if (inst._hold == 'pause') {
			this._removeTarget(target);
		}
		$.data(target, PROP_NAME, inst);
	},

	/* Reconfigure the settings for a countdown div.
	   @param  target   (element) the containing division
	   @param  options  (object) the new settings for the countdown or
	                    (string) an individual property name
	   @param  value    (any) the individual property value
	                    (omit if options is an object) */
	_changeCountdown: function(target, options, value) {
		options = options || {};
		if (typeof options == 'string') {
			var name = options;
			options = {};
			options[name] = value;
		}
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			this._resetExtraLabels(inst.options, options);
			extendRemove(inst.options, options);
			this._adjustSettings(target, inst);
			$.data(target, PROP_NAME, inst);
			var now = new Date();
			if ((inst._since && inst._since < now) ||
					(inst._until && inst._until > now)) {
				this._addTarget(target);
			}
			this._updateCountdown(target, inst);
		}
	},

	/* Reset any extra labelsn and compactLabelsn entries if changing labels.
	   @param  base     (object) the options to be updated
	   @param  options  (object) the new option values */
	_resetExtraLabels: function(base, options) {
		var changingLabels = false;
		for (var n in options) {
			if (n.match(/[Ll]abels/)) {
				changingLabels = true;
				break;
			}
		}
		if (changingLabels) {
			for (var n in base) { // Remove custom numbered labels
				if (n.match(/[Ll]abels[0-9]/)) {
					base[n] = null;
				}
			}
		}
	},
	
	/* Calculate interal settings for an instance.
	   @param  target  (element) the containing division
	   @param  inst    (object) the current settings for this instance */
	_adjustSettings: function(target, inst) {
		var serverSync = this._get(inst, 'serverSync');
		serverSync = (serverSync ? serverSync.apply(target, []) : null);
		var now = new Date();
		var timezone = this._get(inst, 'timezone');
		timezone = (timezone == null ? -now.getTimezoneOffset() : timezone);
		inst._since = this._get(inst, 'since');
		if (inst._since) {
			inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
			if (inst._since && serverSync) {
				inst._since.setMilliseconds(inst._since.getMilliseconds() +
					now.getTime() - serverSync.getTime());
			}
		}
		inst._until = this.UTCDate(timezone, this._determineTime(this._get(inst, 'until'), now));
		if (serverSync) {
			inst._until.setMilliseconds(inst._until.getMilliseconds() +
				now.getTime() - serverSync.getTime());
		}
		inst._show = this._determineShow(inst);
	},

	/* Remove the countdown widget from a div.
	   @param  target  (element) the containing division */
	_destroyCountdown: function(target) {
		var $target = $(target);
		if (!$target.hasClass(this.markerClassName)) {
			return;
		}
		this._removeTarget(target);
		$target.removeClass(this.markerClassName).empty();
		$.removeData(target, PROP_NAME);
	},

	/* Pause a countdown widget at the current time.
	   Stop it running but remember and display the current time.
	   @param  target  (element) the containing division */
	_pauseCountdown: function(target) {
		this._hold(target, 'pause');
	},

	/* Pause a countdown widget at the current time.
	   Stop the display but keep the countdown running.
	   @param  target  (element) the containing division */
	_lapCountdown: function(target) {
		this._hold(target, 'lap');
	},

	/* Resume a paused countdown widget.
	   @param  target  (element) the containing division */
	_resumeCountdown: function(target) {
		this._hold(target, null);
	},

	/* Pause or resume a countdown widget.
	   @param  target  (element) the containing division
	   @param  hold    (string) the new hold setting */
	_hold: function(target, hold) {
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			if (inst._hold == 'pause' && !hold) {
				inst._periods = inst._savePeriods;
				var sign = (inst._since ? '-' : '+');
				inst[inst._since ? '_since' : '_until'] =
					this._determineTime(sign + inst._periods[0] + 'y' +
						sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' +
						sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' + 
						sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
				this._addTarget(target);
			}
			inst._hold = hold;
			inst._savePeriods = (hold == 'pause' ? inst._periods : null);
			$.data(target, PROP_NAME, inst);
			this._updateCountdown(target, inst);
		}
	},

	/* Return the current time periods.
	   @param  target  (element) the containing division
	   @return  (number[7]) the current periods for the countdown */
	_getTimesCountdown: function(target) {
		var inst = $.data(target, PROP_NAME);
		return (!inst ? null : (!inst._hold ? inst._periods :
			this._calculatePeriods(inst, inst._show, new Date())));
	},

	/* Get a setting value, defaulting if necessary.
	   @param  inst  (object) the current settings for this instance
	   @param  name  (string) the name of the required setting
	   @return  (any) the setting's value or a default if not overridden */
	_get: function(inst, name) {
		return (inst.options[name] != null ?
			inst.options[name] : $.countdown._defaults[name]);
	},

	/* A time may be specified as an exact value or a relative one.
	   @param  setting      (string or number or Date) - the date/time value
	                        as a relative or absolute value
	   @param  defaultTime  (Date) the date/time to use if no other is supplied
	   @return  (Date) the corresponding date/time */
	_determineTime: function(setting, defaultTime) {
		var offsetNumeric = function(offset) { // e.g. +300, -2
			var time = new Date();
			time.setTime(time.getTime() + offset * 1000);
			return time;
		};
		var offsetString = function(offset) { // e.g. '+2d', '-4w', '+3h +30m'
			offset = offset.toLowerCase();
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth();
			var day = time.getDate();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 's') {
					case 's': second += parseInt(matches[1], 10); break;
					case 'm': minute += parseInt(matches[1], 10); break;
					case 'h': hour += parseInt(matches[1], 10); break;
					case 'd': day += parseInt(matches[1], 10); break;
					case 'w': day += parseInt(matches[1], 10) * 7; break;
					case 'o':
						month += parseInt(matches[1], 10); 
						day = Math.min(day, $.countdown._getDaysInMonth(year, month));
						break;
					case 'y':
						year += parseInt(matches[1], 10);
						day = Math.min(day, $.countdown._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day, hour, minute, second, 0);
		};
		var time = (setting == null ? defaultTime :
			(typeof setting == 'string' ? offsetString(setting) :
			(typeof setting == 'number' ? offsetNumeric(setting) : setting)));
		if (time) time.setMilliseconds(0);
		return time;
	},

	/* Determine the number of days in a month.
	   @param  year   (number) the year
	   @param  month  (number) the month
	   @return  (number) the days in that month */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

	/* Generate the HTML to display the countdown widget.
	   @param  inst  (object) the current settings for this instance
	   @return  (string) the new HTML for the countdown display */
	_generateHTML: function(inst) {
		// Determine what to show
		inst._periods = periods = (inst._hold ? inst._periods :
			this._calculatePeriods(inst, inst._show, new Date()));
		// Show all 'asNeeded' after first non-zero value
		var shownNonZero = false;
		var showCount = 0;
		for (var period = 0; period < inst._show.length; period++) {
			shownNonZero |= (inst._show[period] == '?' && periods[period] > 0);
			inst._show[period] = (inst._show[period] == '?' && !shownNonZero ? null : inst._show[period]);
			showCount += (inst._show[period] ? 1 : 0);
		}
		var compact = this._get(inst, 'compact');
		var layout = this._get(inst, 'layout');
		var labels = (compact ? this._get(inst, 'compactLabels') : this._get(inst, 'labels'));
		var timeSeparator = this._get(inst, 'timeSeparator');
		var description = this._get(inst, 'description') || '';
		var showCompact = function(period) {
			var labelsNum = $.countdown._get(inst, 'compactLabels' + periods[period]);
			return (inst._show[period] ? periods[period] +
				(labelsNum ? labelsNum[period] : labels[period]) + ' ' : '');
		};
		var showFull = function(period) {
			var labelsNum = $.countdown._get(inst, 'labels' + periods[period]);
			return (inst._show[period] ?
				'<span class="countdown_section"><span class="countdown_amount">' +
				periods[period] + '</span><br/>' +
				(labelsNum ? labelsNum[period] : labels[period]) + '</span>' : '');
		};
		return (layout ? this._buildLayout(inst, layout, compact) :
			((compact ? // Compact version
			'<span class="countdown_row countdown_amount' +
			(inst._hold ? ' countdown_holding' : '') + '">' + 
			showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + 
			(inst._show[H] ? this._minDigits(periods[H], 2) : '') +
			(inst._show[M] ? (inst._show[H] ? timeSeparator : '') +
			this._minDigits(periods[M], 2) : '') +
			(inst._show[S] ? (inst._show[H] || inst._show[M] ? timeSeparator : '') +
			this._minDigits(periods[S], 2) : '') :
			// Full version
			'<span class="countdown_row countdown_show' + showCount +
			(inst._hold ? ' countdown_holding' : '') + '">' +
			showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
			showFull(H) + showFull(M) + showFull(S)) + '</span>' +
			(description ? '<span class="countdown_row countdown_descr">' + description + '</span>' : '')));
	},

	/* Construct a custom layout.
	   @param  inst     (object) the current settings for this instance
	   @param  layout   (string) the customised layout
	   @param  compact  (boolean) true if using compact labels
	   @return  (string) the custom HTML */
	_buildLayout: function(inst, layout, compact) {
		var labels = this._get(inst, (compact ? 'compactLabels' : 'labels'));
		var labelFor = function(index) {
			return ($.countdown._get(inst,
				(compact ? 'compactLabels' : 'labels') + inst._periods[index]) ||
				labels)[index];
		};
		var digit = function(value, position) {
			return Math.floor(value / position) % 10;
		};
		var subs = {desc: this._get(inst, 'description'), sep: this._get(inst, 'timeSeparator'),
			yl: labelFor(Y), yn: inst._periods[Y], ynn: this._minDigits(inst._periods[Y], 2),
			ynnn: this._minDigits(inst._periods[Y], 3), y1: digit(inst._periods[Y], 1),
			y10: digit(inst._periods[Y], 10), y100: digit(inst._periods[Y], 100),
			ol: labelFor(O), on: inst._periods[O], onn: this._minDigits(inst._periods[O], 2),
			onnn: this._minDigits(inst._periods[O], 3), o1: digit(inst._periods[O], 1),
			o10: digit(inst._periods[O], 10), o100: digit(inst._periods[O], 100),
			wl: labelFor(W), wn: inst._periods[W], wnn: this._minDigits(inst._periods[W], 2),
			wnnn: this._minDigits(inst._periods[W], 3), w1: digit(inst._periods[W], 1),
			w10: digit(inst._periods[W], 10), w100: digit(inst._periods[W], 100),
			dl: labelFor(D), dn: inst._periods[D], dnn: this._minDigits(inst._periods[D], 2),
			dnnn: this._minDigits(inst._periods[D], 3), d1: digit(inst._periods[D], 1),
			d10: digit(inst._periods[D], 10), d100: digit(inst._periods[D], 100),
			hl: labelFor(H), hn: inst._periods[H], hnn: this._minDigits(inst._periods[H], 2),
			hnnn: this._minDigits(inst._periods[H], 3), h1: digit(inst._periods[H], 1),
			h10: digit(inst._periods[H], 10), h100: digit(inst._periods[H], 100),
			ml: labelFor(M), mn: inst._periods[M], mnn: this._minDigits(inst._periods[M], 2),
			mnnn: this._minDigits(inst._periods[M], 3), m1: digit(inst._periods[M], 1),
			m10: digit(inst._periods[M], 10), m100: digit(inst._periods[M], 100),
			sl: labelFor(S), sn: inst._periods[S], snn: this._minDigits(inst._periods[S], 2),
			snnn: this._minDigits(inst._periods[S], 3), s1: digit(inst._periods[S], 1),
			s10: digit(inst._periods[S], 10), s100: digit(inst._periods[S], 100)};
		var html = layout;
		// Replace period containers: {p<}...{p>}
		for (var i = 0; i < 7; i++) {
			var period = 'yowdhms'.charAt(i);
			var re = new RegExp('\\{' + period + '<\\}(.*)\\{' + period + '>\\}', 'g');
			html = html.replace(re, (inst._show[i] ? '$1' : ''));
		}
		// Replace period values: {pn}
		$.each(subs, function(n, v) {
			var re = new RegExp('\\{' + n + '\\}', 'g');
			html = html.replace(re, v);
		});
		return html;
	},

	/* Ensure a numeric value has at least n digits for display.
	   @param  value  (number) the value to display
	   @param  len    (number) the minimum length
	   @return  (string) the display text */
	_minDigits: function(value, len) {
		value = '0000000000' + value;
		return value.substr(value.length - len);
	},

	/* Translate the format into flags for each period.
	   @param  inst  (object) the current settings for this instance
	   @return  (string[7]) flags indicating which periods are requested (?) or
	            required (!) by year, month, week, day, hour, minute, second */
	_determineShow: function(inst) {
		var format = this._get(inst, 'format');
		var show = [];
		show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
		show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
		show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
		show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
		show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
		show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
		show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
		return show;
	},
	
	/* Calculate the requested periods between now and the target time.
	   @param  inst  (object) the current settings for this instance
	   @param  show  (string[7]) flags indicating which periods are requested/required
	   @param  now   (Date) the current date and time
	   @return  (number[7]) the current time periods (always positive)
	            by year, month, week, day, hour, minute, second */
	_calculatePeriods: function(inst, show, now) {
		// Find endpoints
		inst._now = now;
		inst._now.setMilliseconds(0);
		var until = new Date(inst._now.getTime());
		if (inst._since && now.getTime() < inst._since.getTime()) {
			inst._now = now = until;
		}
		else if (inst._since) {
			now = inst._since;
		}
		else {
			until.setTime(inst._until.getTime());
			if (now.getTime() > inst._until.getTime()) {
				inst._now = now = until;
			}
		}
		// Calculate differences by period
		var periods = [0, 0, 0, 0, 0, 0, 0];
		if (show[Y] || show[O]) {
			// Treat end of months as the same
			var lastNow = $.countdown._getDaysInMonth(now.getFullYear(), now.getMonth());
			var lastUntil = $.countdown._getDaysInMonth(until.getFullYear(), until.getMonth());
			var sameDay = (until.getDate() == now.getDate() ||
				(until.getDate() >= Math.min(lastNow, lastUntil) &&
				now.getDate() >= Math.min(lastNow, lastUntil)));
			var getSecs = function(date) {
				return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
			};
			var months = Math.max(0,
				(until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() +
				((until.getDate() < now.getDate() && !sameDay) ||
				(sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
			periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
			periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
			// Adjust for months difference and end of month if necessary
			var adjustDate = function(date, offset, last) {
				var wasLastDay = (date.getDate() == last);
				var lastDay = $.countdown._getDaysInMonth(date.getFullYear() + offset * periods[Y],
					date.getMonth() + offset * periods[O]);
				if (date.getDate() > lastDay) {
					date.setDate(lastDay);
				}
				date.setFullYear(date.getFullYear() + offset * periods[Y]);
				date.setMonth(date.getMonth() + offset * periods[O]);
				if (wasLastDay) {
					date.setDate(lastDay);
				}
				return date;
			};
			if (inst._since) {
				until = adjustDate(until, -1, lastUntil);
			}
			else {
				now = adjustDate(new Date(now.getTime()), +1, lastNow);
			}
		}
		var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
		var extractPeriod = function(period, numSecs) {
			periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
			diff -= periods[period] * numSecs;
		};
		extractPeriod(W, 604800);
		extractPeriod(D, 86400);
		extractPeriod(H, 3600);
		extractPeriod(M, 60);
		extractPeriod(S, 1);
		return periods;
	}
});

/* jQuery extend now ignores nulls!
   @param  target  (object) the object to update
   @param  props   (object) the new settings
   @return  (object) the updated object */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = null;
		}
	}
	return target;
}

/* Process the countdown functionality for a jQuery selection.
   @param  command  (string) the command to run (optional, default 'attach')
   @param  options  (object) the new settings to use for these countdown instances
   @return  (jQuery) for chaining further calls */
$.fn.countdown = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (options == 'getTimes') {
		return $.countdown['_' + options + 'Countdown'].
			apply($.countdown, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			$.countdown['_' + options + 'Countdown'].apply($.countdown, [this].concat(otherArgs));
		}
		else {
			$.countdown._attachCountdown(this, options);
		}
	});
};

/* Initialise the countdown functionality. */
$.countdown = new Countdown(); // singleton instance

})(jQuery);
