// KUTE jQuery Plugin for kute.js | by dnp_theme | License - MIT
// $('selector').Kute(options);

(function($) {
	$.fn.Kute = function( options ) {
		new KUTE.Animate( this[0], options );
	};	
})(jQuery);
