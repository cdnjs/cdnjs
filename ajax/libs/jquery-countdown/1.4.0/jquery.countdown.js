/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.4.0.
   Written by Keith Wood (kbwood@virginbroadband.com.au) January 2008.
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
		labelsSingle: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
		compactLabels: ['y', 'm', 'w', 'd'], // The compact texts for the counters
		compactLabelsSingle: ['y', 'm', 'w', 'd'], // The compact texts for the counters if only one
		timeSeparator: ':' // Separator for time periods
	};
	this._defaults = {
		format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
			// 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
		layout: '', // Build your own layout for the countdown
		compact: false, // True to display in a compact format, false for an expanded one
		description: '', // The description displayed for the countdown
		expiryUrl: null, // A URL to load upon expiry, replacing the current page
		alwaysExpire: false, // True to trigger onExpiry even if never counted down
		onExpiry: null, // Callback when the countdown expires -
			// receives no parameters and 'this' is the containing division
		onTick: null, // Callback when the countdown is updated -
			// receives int[7] being the breakdown by period (based on format)
			// and 'this' is the containing division
		serverTime: null // The current time on the server, to calculate an offset for other time zones
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
	
	/* Override the default settings for all instances of the countdown widget.
	   @param  options  object - the new settings to use as defaults */
	setDefaults: function(options) {
		extendRemove(this._defaults, options || {});
	},

	/* Attach the countdown widget to a div.
	   @param  target   element - the containing division
	   @param  options  object - the initial settings for the countdown */
	_attachCountdown: function(target, options) {
		target = $(target);
		if (target.is('.' + this.markerClassName)) {
			return;
		}
		target.addClass(this.markerClassName);
		if (!target[0].id) {
			target[0].id = 'cdn' + new Date().getTime();
		}
		var inst = {};
		inst.options = $.extend({}, options);
		inst._periods = [0, 0, 0, 0, 0, 0, 0];
		this._adjustSettings(inst);
		$.data(target[0], PROP_NAME, inst);
		this._updateCountdown(target, inst);
	},

	/* Redisplay the countdown with an updated display.
	   @param  id    element or string - the containing division or its ID
	   @param  inst  object - the current settings for this instance */
	_updateCountdown: function(id, inst) {
		var target = $(id);
		inst = inst || $.data(target[0], PROP_NAME);
		if (!inst) {
			return;
		}
		target.html(this._generateHTML(inst));
		var onTick = this._get(inst, 'onTick');
		if (onTick) {
			onTick.apply(target[0], [inst._hold != 'lap' ? inst._periods :
				this._calculatePeriods(inst, inst._show, new Date())]);
		}
		var expired = inst._hold != 'pause' &&
			(inst._since ? inst._now.getTime() <= inst._since.getTime() :
			inst._now.getTime() >= inst._until.getTime());
		if (expired) {
			if (inst._timer || this._get(inst, 'alwaysExpire')) {
				var onExpiry = this._get(inst, 'onExpiry');
				if (onExpiry) {
					onExpiry.apply(target[0], []);
				}
				var expiryUrl = this._get(inst, 'expiryUrl');
				if (expiryUrl) {
					window.location = expiryUrl;
				}
			}
			inst._timer = null;
		}
		else if (inst._hold == 'pause') {
			inst._time = null;
		}
		else {
			var format = this._get(inst, 'format');
			inst._timer = setTimeout('$.countdown._updateCountdown("#' + target[0].id + '")',
				(format.match('s|S') ? 1 : (format.match('m|M') ? 30 : 600)) * 980);  // just under the full time
		}
		$.data(target[0], PROP_NAME, inst);
	},

	/* Reconfigure the settings for a countdown div.
	   @param  target   element - the containing division
	   @param  options  object - the new settings for the countdown */
	_changeCountdown: function(target, options) {
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			extendRemove(inst.options, options || {});
			this._adjustSettings(inst);
			$.data(target, PROP_NAME, inst);
			this._updateCountdown(target, inst);
		}
	},

	/* Remove the countdown widget from a div.
	   @param  target  element - the containing division */
	_destroyCountdown: function(target) {
		target = $(target);
		if (!target.is('.' + this.markerClassName)) {
			return;
		}
		target.removeClass(this.markerClassName).empty();
		var inst = $.data(target[0], PROP_NAME);
		if (inst._timer) {
			clearTimeout(inst._timer);
		}
		$.removeData(target[0], PROP_NAME);
	},

	/* Pause a countdown widget at the current time.
	   Stop it running but remember and display the current time.
	   @param  target  element - the containing division */
	_pauseCountdown: function(target) {
		this._hold(target, 'pause');
	},

	/* Pause a countdown widget at the current time.
	   Stop the display but keep the countdown running.
	   @param  target  element - the containing division */
	_lapCountdown: function(target) {
		this._hold(target, 'lap');
	},

	/* Resume a paused countdown widget.
	   @param  target  element - the containing division */
	_resumeCountdown: function(target) {
		this._hold(target, null);
	},

	/* Pause or resume a countdown widget.
	   @param  target  element - the containing division
	   @param  hold    string - the new hold setting */
	_hold: function(target, hold) {
		var inst = $.data(target, PROP_NAME);
		if (inst) {
			if (inst._hold == 'pause' && !hold) {
				inst._periods = inst._savePeriods;
				var sign = (inst._since ? '-' : '+');
				inst[inst._since ? '_since' : '_until'] =
					this._determineTime(sign + inst._periods[0] + 'Y' +
						sign + inst._periods[1] + 'O' + sign + inst._periods[2] + 'W' +
						sign + inst._periods[3] + 'D' + sign + inst._periods[4] + 'H' + 
						sign + inst._periods[5] + 'M' + sign + inst._periods[6] + 'S');
			}
			inst._hold = hold;
			inst._savePeriods = (hold == 'pause' ? inst._periods : null);
			$.data(target, PROP_NAME, inst);
			this._updateCountdown(target, inst);
		}
	},

	/* Return the current time periods.
	   @param  target  element - the containing division
	   @return  number[7] - the current periods for the countdown */
	_getTimesCountdown: function(target) {
		var inst = $.data(target, PROP_NAME);
		return (!inst ? null : (!inst._hold ? inst._periods :
			this._calculatePeriods(inst, inst._show, new Date())));
	},

	/* Get a setting value, defaulting if necessary.
	   @param  inst  object - the current settings for this instance
	   @param  name  string - the name of the required setting
	   @return  any - the setting's value or a default if not overridden */
	_get: function(inst, name) {
		return (inst.options[name] != null ?
			inst.options[name] : $.countdown._defaults[name]);
	},
	
	/* Calculate interal settings for an instance.
	   @param  inst  object - the current settings for this instance */
	_adjustSettings: function(inst) {
		var now = new Date();
		var serverTime = this._get(inst, 'serverTime');
		inst._offset = (serverTime ? serverTime.getTime() - now.getTime() : 0);
		inst._since = this._get(inst, 'since');
		if (inst._since) {
			inst._since = this._determineTime(inst._since, null);
		}
		inst._until = this._determineTime(this._get(inst, 'until'), now);
		inst._show = this._determineShow(inst);
	},

	/* A time may be specified as an exact value or a relative one.
	   @param  setting      string or number or Date - the date/time value
	           as a relative or absolute value
	   @param  defaultTime  Date - the date/time to use if no other is supplied
	   @return  Date - the corresponding date/time */
	_determineTime: function(setting, defaultTime) {
		var offsetNumeric = function(offset) { // e.g. +300, -2
			var time = new Date();
			time.setTime(time.getTime() + offset * 1000);
			return time;
		};
		var getDaysInMonth = function(year, month) {
			return 32 - new Date(year, month, 32).getDate();
		};
		var offsetString = function(offset) { // e.g. '+2d', '-4w', '+3h +30m'
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth();
			var day = time.getDate();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			var pattern = /([+-]?[0-9]+)\s*(s|S|m|M|h|H|d|D|w|W|o|O|y|Y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 's') {
					case 's' : case 'S' :
						second += parseInt(matches[1]); break;
					case 'm' : case 'M' :
						minute += parseInt(matches[1]); break;
					case 'h' : case 'H' :
						hour += parseInt(matches[1]); break;
					case 'd' : case 'D' :
						day += parseInt(matches[1]); break;
					case 'w' : case 'W' :
						day += parseInt(matches[1]) * 7; break;
					case 'o' : case 'O' :
						month += parseInt(matches[1]); 
						day = Math.min(day, getDaysInMonth(year, month));
						break;
					case 'y': case 'Y' :
						year += parseInt(matches[1]);
						day = Math.min(day, getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			time = new Date(year, month, day, hour, minute, second, 0);
			return time;
		};
		var time = (setting == null ? defaultTime :
			(typeof setting == 'string' ? offsetString(setting) :
			(typeof setting == 'number' ? offsetNumeric(setting) : setting)));
		if (time) time.setMilliseconds(0);
		return time;
	},

	/* Generate the HTML to display the countdown widget.
	   @param  inst  object - the current settings for this instance
	   @return  string - the new HTML for the countdown display */
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
		var labelsSingle = (compact ? this._get(inst, 'compactLabelsSingle') :
			this._get(inst, 'labelsSingle')) || labels;
		var timeSeparator = this._get(inst, 'timeSeparator');
		var description = this._get(inst, 'description') || '';
		var twoDigits = function(value) {
			return (value < 10 ? '0' : '') + value;
		};
		var showCompact = function(period) {
			return (inst._show[period] ? periods[period] + (periods[period] == 1 ?
				labelsSingle[period] : labels[period]) + ' ' : '');
		};
		var showFull = function(period) {
			return (inst._show[period] ? '<div class="countdown_section"><span class="countdown_amount">' +
				periods[period] + '</span><br/>' + (periods[period] == 1 ?
				labelsSingle[period] : labels[period]) + '</div>' : '');
		};
		return (layout ? this._buildLayout(inst, layout, labels, labelsSingle) :
			((compact ? // Compact version
			'<div class="countdown_row countdown_amount' +
			(inst._hold ? ' countdown_holding' : '') + '">' + 
			showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + 
			twoDigits(periods[H]) + timeSeparator +
			twoDigits(periods[M]) + (inst._show[S] ? timeSeparator + twoDigits(periods[S]) : '') :
			// Full version
			'<div class="countdown_row countdown_show' + showCount +
			(inst._hold ? ' countdown_holding' : '') + '">' +
			showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
			showFull(H) + showFull(M) + showFull(S)) + '</div>' +
			(description ? '<div class="countdown_row countdown_descr">' + description + '</div>' : '')));
	},

	/* Construct a custom layout.
	   @param  inst          object - the current settings for this instance
	   @param  layout        string - the customised layout
	   @param  labels        string[] - the plural labels for each period
	   @param  labelsSingle  string[] - the singular labels for each period
	   @return  string - the custom HTML */
	_buildLayout: function(inst, layout, labels, labelsSingle) {
		var html = layout;
		var processPeriod = function(period, index) {
			var pattern1 = new RegExp('%' + period + '.*%' + period);
			var pattern2 = new RegExp('%' + period + '.*');
			while (true) {
				var matches = pattern1.exec(html);
				if (!matches) {
					break;
				}
				matches[0] = matches[0].substr(0, 2) +
					matches[0].substr(2).replace(pattern2, '%' + period);
				html = html.replace(matches[0], inst._show[index] ?
					customisePeriod(matches[0], period, index) : '');
			}
		};
		var customisePeriod = function(text, period, index) {
			return text.substr(2, text.length - 4).
				replace(/%nn/g, (inst._periods[index] < 10 ? '0' : '') +
				inst._periods[index]).
				replace(/%n/g, inst._periods[index]).
				replace(/%l/g, inst._periods[index] == 1 ?
				labelsSingle[index] : labels[index]);
		};
		processPeriod('Y', Y);
		processPeriod('O', O);
		processPeriod('W', W);
		processPeriod('D', D);
		processPeriod('H', H);
		processPeriod('M', M);
		processPeriod('S', S);
		return html;
	},

	/* Translate the format into flags for each period.
	   @param  inst  object - the current settings for this instance
	   @return  string[7] - flags indicating which periods are requested (?) or
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
	   @param  inst  object - the current settings for this instance
	   @param  show  string[7] - flags indicating which periods are requested/required
	   @param  now   Date - the current date and time
	   @return  number[7] - the current time periods (always positive)
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
		until.setTime(until.getTime() - inst._offset); // Adjust for time zone
		// Calculate differences by period
		var periods = [0, 0, 0, 0, 0, 0, 0];
		if (show[Y] || show[O]) {
			var months = Math.max(0, (until.getFullYear() - now.getFullYear()) * 12 +
				until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() ? -1 : 0));
			periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
			periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
			if (inst._since) {
				until.setFullYear(until.getFullYear() - periods[Y]);
				until.setMonth(until.getMonth() - periods[O]);
			}
			else {
			now = new Date(now.getTime());
			now.setFullYear(now.getFullYear() + periods[Y]);
			now.setMonth(now.getMonth() + periods[O]);
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

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = null;
		}
	}
	return target;
}

/* Attach the countdown functionality to a jQuery selection.
   @param  command  string - the command to run (optional, default 'attach')
   @param  options  object - the new settings to use for these countdown instances
   @return  jQuery object - for chaining further calls */
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
