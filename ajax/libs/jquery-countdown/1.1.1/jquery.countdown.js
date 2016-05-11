/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.1.1.
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
	this._nextId = 0; // Next ID for a countdown instance
	this._inst = []; // List of instances indexed by ID
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		// The display texts for the counters
		labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
		compactLabels: ['y', 'm', 'w', 'd'], // The compact texts for the counters
		timeSeparator: ':' // Separator for time periods
	};
	this._defaults = {
		format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
			// 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
		compact: false, // True to display in a compact format, false for an expanded one
		description: '', // The description displayed for the countdown
		expiryUrl: null, // A URL to load upon expiry, replacing the current page
		onExpiry: null, // Callback when the countdown expires -
			// receives no parameters and 'this' is the containing division
		onTick: null // Callback when the countdown is updated -
			// receives int[7] being the breakdown by period (based on format)
			// and 'this' is the containing division
	};
	$.extend(this._defaults, this.regional['']);
}

$.extend(Countdown.prototype, {
	/* Class name added to elements to indicate already configured with countdown. */
	markerClassName: 'hasCountdown',
	
	/* Register a new countdown instance - with custom settings. */
	_register: function(inst) {
		var id = this._nextId++;
		this._inst[id] = inst;
		return id;
	},

	/* Retrieve a particular countdown instance based on its ID. */
	_getInst: function(id) {
		return this._inst[id] || id;
	},

	/* Override the default settings for all instances of the countdown widget.
	   @param  settings  object - the new settings to use as defaults
	   @return void */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
	},

	/* Attach the countdown widget to a div. */
	_attachCountdown: function(target, inst) {
		target = $(target);
		if (target.is('.' + this.markerClassName)) {
			return;
		}
		target.addClass(this.markerClassName);
		target[0]._cdnId = inst._id;
		inst._target = target;
		this._updateCountdown(inst._id);
	},

	/* Redisplay the countdown with an updated display. */
	_updateCountdown: function(id) {
		var inst = this._getInst(id);
		inst._target.html(inst._generateHTML());
		var onTick = inst._get('onTick');
		if (onTick) {
			onTick.apply(inst._target[0], [inst._periods]);
		}
		if (inst._now.getTime() >= inst._getUntil(inst._now).getTime()) {
			if (inst._timer) {
				var onExpiry = inst._get('onExpiry');
				if (onExpiry) {
					onExpiry.apply(inst._target[0], []);
				}
				var expiryUrl = inst._get('expiryUrl');
				if (expiryUrl) {
					window.location = expiryUrl;
				}
			}
			inst._timer = null;
		}
		else {
			inst._timer = setTimeout('$.countdown._updateCountdown(' + inst._id + ')',
				(inst._get('format').match('s|S') ? 1 : 30) * 980);  // just under the full time
		}
	},

	/* Reconfigure the settings for a countdown div. */
	_changeCountdown: function(target, settings) {
		var inst = this._getInst(target._cdnId);
		if (inst) {
			extendRemove(inst._settings, settings || {});
			this._updateCountdown(inst._id);
		}
	},

	/* Remove the countdown widget from a div. */
	_destroyCountdown: function(target) {
		target = $(target);
		if (!target.is('.' + this.markerClassName)) {
			return;
		}
		target.removeClass(this.markerClassName);
		target.empty();
		clearTimeout(this._inst[target[0]._cdnId]._timer);
		this._inst[target[0]._cdnId] = null;
		target[0]._cdnId = undefined;
	}
});

var Y = 0; // Years
var O = 1; // Months
var W = 2; // Weeks
var D = 3; // Days
var H = 4; // Hours
var M = 5; // Minutes
var S = 6; // Seconds

/* Individualised settings for countdown widgets applied to one or more divs.
   Instances are managed and manipulated through the Countdown manager. */
function CountdownInstance(settings) {
	this._id = $.countdown._register(this);
	this._target = null; // jQuery wrapper of target div
	this._timer = null; // The active timer for this countdown
	this._now = null; // The last time used for display
	// Differences by period (years/months/weeks/days/hours/mins/secs)
	this._periods = [0, 0, 0, 0, 0, 0, 0];
	// Customise the countdown object - uses manager defaults if not overridden
	this._settings = extendRemove({}, settings || {}); // clone
}

$.extend(CountdownInstance.prototype, {
	/* Get a setting value, defaulting if necessary. */
	_get: function(name) {
		return (this._settings[name] != null ? this._settings[name] : $.countdown._defaults[name]);
	},
	
	/* Generate the HTML to display the countdown widget. */
	_generateHTML: function() {
		// Determine what to show
		var format = this._get('format');
		var show = [];
		show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
		show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
		show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
		show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
		show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
		show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
		show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
		this._periods = periods = this._calculatePeriods(show, new Date());
		// Show all 'asNeeded' after first non-zero value
		var shownNonZero = false;
		var showCount = 0;
		for (var period = 0; period < show.length; period++) {
			shownNonZero |= (show[period] == '?' && periods[period] > 0);
			show[period] = (show[period] == '?' && !shownNonZero ? null : show[period]);
			showCount += (show[period] ? 1 : 0);
		}
		var compact = this._get('compact');
		var labels = (compact ? this._get('compactLabels') : this._get('labels'));
		var timeSeparator = this._get('timeSeparator');
		var description = this._get('description') || '';
		var twoDigits = function(value) {
			return (value < 10 ? '0' : '') + value;
		};
		var showCompact = function(period) {
			return (show[period] ? periods[period] + labels[period] + ' ' : '');
		};
		var showFull = function(period) {
			return (show[period] ? '<div class="countdown_section"><span class="countdown_amount">' +
				periods[period] + '</span><br/>' + labels[period] + '</div>' : '');
		};
		return (compact ?
			// Compact version
			'<div class="countdown_row countdown_amount">' + 
			showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + 
			twoDigits(this._periods[H]) + timeSeparator +
			twoDigits(this._periods[M]) + (show[S] ? timeSeparator + twoDigits(this._periods[S]) : '') :
			// Full version
			'<div class="countdown_row countdown_show' + showCount + '">' +
			showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
			showFull(H) + showFull(M) + showFull(S)) + '</div>' +
			(description ? '<div class="countdown_row countdown_descr">' + description + '</div>' : '');
	},
	
	/* Calculate the requested periods between now and the target time. */
	_calculatePeriods: function(show, now) {
		// Find endpoints
		this._now = now;
		this._now.setMilliseconds(0);
		var until = this._getUntil(this._now);
		if (this._now.getTime() > until.getTime()) {
			this._now = now = until;
		}
		// Calculate differences by period
		var periods = [0, 0, 0, 0, 0, 0, 0];
		if (show[Y] || show[O]) {
			var months = Math.max(0, (until.getFullYear() - this._now.getFullYear()) * 12 +
				until.getMonth() - this._now.getMonth() + (until.getDate() < this._now.getDate() ? -1 : 0));
			periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
			periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
			now = new Date(now.getTime());
			now.setFullYear(now.getFullYear() + periods[Y]);
			now.setMonth(now.getMonth() + periods[O]);
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
	},

	/* Get target time, defaulting if necessary. */
	_getUntil: function(now) {
		var until = this._get('until') || now;
		until.setMilliseconds(0);
		return until;
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
	return this.each(function() {
		if (typeof options == 'string') {
			$.countdown['_' + options + 'Countdown'].apply($.countdown, [this].concat(otherArgs));
		}
		else {
			$.countdown._attachCountdown(this, new CountdownInstance(options));
		}
	});
};

/* Initialise the countdown functionality. */
$(document).ready(function() {
   $.countdown = new Countdown(); // singleton instance
});

})(jQuery);
