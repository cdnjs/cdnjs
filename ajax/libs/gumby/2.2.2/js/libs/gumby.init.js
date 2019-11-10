/**
* Gumby Init
*/

// test for touch event support
Modernizr.load({
	test: Modernizr.touch,

	// if present load custom jQuery mobile build and update Gumby.click
	yep: 'js/libs/jquery.mobile.custom.min.js',
	callback: function(url, result, key) {
		if(result) {
			window.Gumby.click = 'tap';
		}
	},

	// either way initialize Gumby
	complete: function() {
		window.Gumby.init();

		// if AMD return Gumby object to define
		if(typeof define == "function" && define.amd) {
			define(window.Gumby);
		}
	}
});
