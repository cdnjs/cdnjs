/**
* Gumby Init
*/

!function($) {
	// initialize Gumby
	if(Gumby.autoInit) {
		Gumby.debug('Gumby auto initialization');
		window.Gumby.init();
	}

	// if AMD return Gumby object to define
	if(typeof define == "function" && define.amd) {
		define(window.Gumby);
	}

	// test for touch event support and load jQuery if present
	if(Gumby.touchEvents) {
		Gumby.debug('Loading jQuery mobile touch events');
		Modernizr.load({
			test: Modernizr.touch,

			// if present load custom jQuery mobile build and update Gumby.click
			yep: Gumby.touchEvents+'/jquery.mobile.custom.min.js',
			callback: function(url, result, key) {
				// check jQuery mobile has successfully loaded before using tap events
				if(!$.mobile) {
					Gumby.error('Error loading jQuery mobile touch events');
					return;
				}

				window.Gumby.click += ' tap';
			}
		});
	}
}(jQuery);
