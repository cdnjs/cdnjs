/**
* Gumby Init
*/

!function($) {

	'use strict';

	// no touch events so auto initialize here
	if(!Gumby.touchEvents && Gumby.autoInit) {
		Gumby.debug('Gumby auto initialization');
		window.Gumby.init();

	// load jQuery mobile touch events 
	} else if(Gumby.touchEvents) {
		Gumby.debug('Loading jQuery mobile touch events');
		// set timeout to 1sec
		yepnope.errorTimeout = 1000;
		Modernizr.load({
			test: Modernizr.touch,
			yep: Gumby.touchEvents+'/jquery.mobile.custom.min.js',
			callback: function(url, result, key) {
				// error loading jQuery mobile
				if(!$.mobile) {
					Gumby.error('Error loading jQuery mobile touch events');
				}

				// if not auto initializing 
				// this will allow helpers to fire when initialized
				Gumby.touchEventsLoaded = true;

				// auto initialize
				if(Gumby.autoInit) {
					window.Gumby.init();

				// if already manually initialized then fire helpers 
				} else if(Gumby.uiModulesReady) {
					Gumby.helpers();
				}
			}
		});
	}

	// if AMD return Gumby object to define
	if(typeof define == "function" && define.amd) {
		define(window.Gumby);
	}
}(jQuery);
