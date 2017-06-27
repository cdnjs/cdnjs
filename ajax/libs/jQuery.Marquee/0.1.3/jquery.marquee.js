/**
 * jQuery.marquee - scrolling text horizontally
 * Date: 11/01/2013
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://www.aamirafridi.com
 * @version 1.0
 */

;(function($) {
	$.fn.marquee = function(options) {
		return this.each(function() {
			// Extend the options if any provided
			var o = $.extend({}, $.fn.marquee.defaults, options),
				$this = $(this),
				$marqueeWrapper,
				elWidth;
      		
			//check if element has data attributes. They have top priority
			o = $.extend({}, o, $this.data());

			//wrap inner content into a div
			$this.wrapInner('<div class="js-marquee"></div>');
      
			//Make copy of the element
			$this.find('.js-marquee').css({
				'margin-right': o.gap, 
				'float':'left'
			}).clone().appendTo($this);
      
			//wrap both inner elements into one div
			$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
      
			//Save the width of the each element so we can use it in animation
			elWidth = $this.find('.js-marquee:first').width() + o.gap;

			//Save the reference of the wrapper
			$marqueeWrapper = $this.find('.js-marquee-wrapper');
			
			//Animate recursive method
			var animate = function() {
				//Move to zero possition
				$marqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
				//Start animating to wards left
				$marqueeWrapper.animate({
						'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0
					},
					o.speed, 'linear',
					animate
				);
			};
			
			//Starts the recursive method
			setTimeout(animate, o.delayBeforeStart);
	
		});
	};//End of Plugin
	
	// Public: plugin defaults options
	$.fn.marquee.defaults = {
		//speed in milliseconds of the marquee
		speed: 10000,
		//gap in pixels between the tickers
		gap: 20,
		//gap in pixels between the tickers
		delayBeforeStart: 1000,
		//'left' or 'right'
		direction: 'left'
	};
})(jQuery);
