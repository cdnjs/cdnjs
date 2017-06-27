/**
* Gumby Init
*/

!function($) {

	'use strict';

	// not touch device or no touch events required so auto initialize here
	if((!Gumby.touchDevice || !Gumby.touchEvents) && Gumby.autoInit) {
		window.Gumby.init();

	// load jQuery mobile touch events 
	} else if(Gumby.touchEvents && Gumby.touchDevice) {
		Gumby.debug('Loading jQuery mobile touch events');
		// set timeout to 2sec
		yepnope.errorTimeout = 2000;
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
