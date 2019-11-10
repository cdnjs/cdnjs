/* http://keith-wood.name/countdown.html
   Countdown for jQuery compatibility from v1.0.0 to v1.1.0.
   Written by Keith Wood (kbwood@virginbroadband.com.au) January 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

$.extend($.countdown, {
	/* Override the default settings for all instances of the countdown widget.
	   @param  settings  object - the new settings to use as defaults
	   @return void */
	setDefaults: function(settings) {
		extendRemove(this._defaults, adjustSettings(settings || {}));
	}
});

/* Translate settings between versions. */
function adjustSettings(settings) {
	var newSettings = $.extend({}, settings);
	return $.extend(newSettings, {format: (settings.showDays == 'always' ? 'D' :
		(settings.showDays == 'never' ? '' : 'd')) + 'HM' +
		(settings.showSeconds != false ? 'S' : ''),
		onTick: (settings.onTick ? function(periods) { 
			settings.onTick(periods.slice(3)); 
		} : null)});
}

/* Attach the countdown functionality to a jQuery selection.
   @param  settings  object - the new settings to use for these countdown instances
   @return  jQuery object - for chaining further calls */
$.fn.attachCountdown = function(settings) {
	return this.countdown(adjustSettings(settings));
};

/* Remove the countdown functionality from a jQuery selection.
   @return  jQuery object - for chaining further calls */
$.fn.removeCountdown = function() {
	return this.countdown('remove');
};

/* Reconfigure the settings for a countdown div.
   @param  settings  object - the new settings
   @return  jQuery object - for chaining further calls */
$.fn.changeCountdown = function(settings) {
	return this.countdown('change', adjustSettings(settings));
};

})(jQuery);
