/*
 * jQuery Quovolver v1.0 - http://sandbox.sebnitu.com/jquery/quovolver
 *
 * By Sebastian Nitu - Copyright 2009 - All rights reserved
 * 
 */

(function($) {
	$.fn.quovolver = function(speed, delay) {
		
		/* Sets default values */
		if (!speed) speed = 500;
		if (!delay) delay = 6000;
		
		// If "delay" is less than 4 times the "speed", it will break the effect 
		// If that's the case, make "delay" exactly 4 times "speed"
		var quaSpd = (speed*4);
		if (quaSpd > (delay)) delay = quaSpd;
		
		// Create the variables needed
		var	quote = $(this),
			firstQuo = $(this).filter(':first'),
			lastQuo = $(this).filter(':last'),
			wrapElem = '<div id="quote_wrap"></div>';
		
		// Wrap the quotes
		$(this).wrapAll(wrapElem);
		
		// Hide all the quotes, then show the first
		$(this).hide();
		$(firstQuo).show();
		
		// Set the hight of the wrapper
		$(this).parent().css({height: $(firstQuo).height()});		
		
		// Where the magic happens
		setInterval(function(){
			
			// Set required hight and element in variables for animation
			if($(lastQuo).is(':visible')) {
				var nextElem = $(firstQuo);
				var wrapHeight = $(nextElem).height();
			} else {
				var nextElem = $(quote).filter(':visible').next();
				var wrapHeight = $(nextElem).height();
			}
			
			// Fadeout the quote that is currently visible
			$(quote).filter(':visible').fadeOut(speed);
			
			// Set the wrapper to the hight of the next element, then fade that element in
			setTimeout(function() {
				$(quote).parent().animate({height: wrapHeight}, speed);
			}, speed);
			
			if($(lastQuo).is(':visible')) {
				setTimeout(function() {
					$(firstQuo).fadeIn(speed*2);
				}, speed*2);
				
			} else {
				setTimeout(function() {
					$(nextElem).fadeIn(speed);
				}, speed*2);
			}
			
		}, delay);
	
	};
})(jQuery);
