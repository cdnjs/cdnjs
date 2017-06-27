/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.0.0.
   Written by Keith Wood (kbwood@virginbroadband.com.au) January 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

/* Display a countdown timer.
   Attach it with options like:
   $('div selector').attachCountdown(
       {until: new Date(2008, 12 - 1, 31, 23, 59, 59), onExpiry: blastoff}); */

(function($) { // Hide scope, no $ conflict

/* Countdown manager. */
function Countdown() {
	this._nextId = 0; // Next ID for a countdown instance
	this._inst = []; // List of instances indexed by ID
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings
		labels: ['Days', 'Hours', 'Minutes', 'Seconds'], // The display texts for the counters
		compactDays: 'd', // The text for days in the compact format
		timeSeparator: ':' // Separator for time parts
	};
	this._defaults = {
		showDays: 'asNeeded', // Determine when days are shown: 'always', 'never', 'asNeeded'
		showSeconds: true, // True to show seconds as well, false for days/hours/minutes only
		compact: false, // True to display in a compact format, false for an expanded one
		description: '', // The description displayed for the countdown
		onExpiry: null, // Callback when the countdown expires
		onTick: null // Callback when the countdown is updated
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
			}
			inst._timer = null;
		}
		else {
			inst._timer = setTimeout('$.countdown._updateCountdown(' + inst._id + ')',
				(inst._get('showSeconds') ? 1 : 30) * 980);  // just under the full time
		}
	},

	/* Remove the countdown widget from a div. */
	_removeCountdown: function(target) {
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

/* Individualised settings for countdown widgets applied to one or more divs.
   Instances are managed and manipulated through the Countdown manager. */
function CountdownInstance(settings) {
	this._id = $.countdown._register(this);
	this._target = null; // jQuery wrapper of target div
	this._timer = null; // The active timer for this countdown
	this._now = null; // The last time used for display
	this._periods = [0, 0, 0, 0]; // Differences by period (days/hours/mins/secs)
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
		var showDays = this._get('showDays');
		var showSeconds = this._get('showSeconds');
		this._now = new Date();
		this._now.setMilliseconds(0);
		var until = this._getUntil(this._now);
		if (this._now.getTime() > until.getTime()) {
			this._now = until;
		}
		var diff = Math.floor((until.getTime() - this._now.getTime()) / 1000);
		this._periods[0] = Math.floor(diff / 86400);
		this._periods[1] = Math.floor(diff / 3600) - (this._periods[0] * 24);
		this._periods[2] = Math.floor(diff / 60) - (this._periods[0] * 1440 + this._periods[1] * 60);
		this._periods[3] = (!showSeconds ? 0 :
			diff - (this._periods[0] * 86400 + this._periods[1] * 3600 + this._periods[2] * 60));
		showDays = showDays == 'always' || (showDays == 'asNeeded' && this._periods[0] > 0);
		if (!showDays) {
			this._periods[1] += this._periods[0] * 24;
			this._periods[0] = 0;
		}
		var labels = this._get('labels');
		var compact = this._get('compact');
		var compactDays = this._get('compactDays');
		var timeSeparator = this._get('timeSeparator');
		var description = this._get('description') || '';
		var twoDigits = function(value) {
			return (value < 10 ? '0' : '') + value;
		};
		var html = (compact ? '<div class="countdown_row countdown_amount">' + 
			(showDays ? this._periods[0] + compactDays + ' ' : '') + twoDigits(this._periods[1]) + timeSeparator +
			twoDigits(this._periods[2]) + (showSeconds ? timeSeparator + twoDigits(this._periods[3]) : '') :
			'<div class="countdown_row countdown_show' + (2 + (showDays ? 1 : 0) + (showSeconds ? 1 : 0)) + '">' +
			(showDays ? '<div class="countdown_section"><span class="countdown_amount">' +
			this._periods[0] + '</span><br/>' + labels[0] + '</div>' : '') +
			'<div class="countdown_section"><span class="countdown_amount">' +
			(this._periods[1] + (showDays ? 0 : this._periods[0] * 24)) + '</span><br/>' + labels[1] + '</div>' +
			'<div class="countdown_section"><span class="countdown_amount">' +
			this._periods[2] + '</span><br/>' + labels[2] + '</div>' +
			(showSeconds ? '<div class="countdown_section"><span class="countdown_amount">' +
			this._periods[3] + '</span><br/>' + labels[3] + '</div>' : '')) + '</div>' +
			(description ? '<div class="countdown_row countdown_descr">' + description + '</div>' : '');
		return html;
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
   @param  settings  object - the new settings to use for these countdown instances
   @return  jQuery object - for chaining further calls */
$.fn.attachCountdown = function(settings) {
	return this.each(function() {
		$.countdown._attachCountdown(this, new CountdownInstance(settings));
	});
};

/* Remove the countdown functionality from a jQuery selection.
   @return  jQuery object - for chaining further calls */
$.fn.removeCountdown = function() {
	return this.each(function() {
		$.countdown._removeCountdown(this);
	});
};

/* Reconfigure the settings for a countdown div.
   @param  settings  object - the new settings
   @return  jQuery object - for chaining further calls */
$.fn.changeCountdown = function(settings) {
	return this.each(function() {
		var inst = $.countdown._getInst(this._cdnId);
		if (inst) {
			extendRemove(inst._settings, settings || {});
			$.countdown._updateCountdown(inst._id);
		}
	});
};

/* Initialise the countdown functionality. */
$(document).ready(function() {
   $.countdown = new Countdown(); // singleton instance
});

})(jQuery);
