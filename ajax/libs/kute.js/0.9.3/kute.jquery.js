// KUTE jQuery Plugin for kute.js | by dnp_theme | License - MIT
// $('selector').Kute(options);

(function($) {
	$.fn.Kute = function( options ) {
		return this.each(function(){
			new KUTE.Animate( this, options );
		});
	};	
})(jQuery);
