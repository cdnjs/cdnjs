/**
 * jQuery.marquee - scrolling text horizontally
 * Date: 20/02/2013
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://aamirafridi.com/jquery/jquery-marquee-plugin
 */

;(function($) {
	$.fn.marquee = function(options) {
		return this.each(function() {
			// Extend the options if any provided
			var o = $.extend({}, $.fn.marquee.defaults, options),
				$this = $(this),
				$marqueeWrapper,
				containerWidth,
				animationCss,
				verticalDir,
				elWidth;
      		
			//For details https://twitter.com/aamirafridi/status/403848044069679104 - Can't find a better solution :/
			if($this.data().delaybeforestart) {
				$this.data().delayBeforeStart = $this.data().delaybeforestart;
				delete $this.data().delaybeforestart;
			}
			if($this.data().pauseonhover) {
				$this.data().pauseOnHover = $this.data().pauseonhover;
				delete $this.data().pauseonhover;
			}
			if($this.data().pauseoncycle) {
				$this.data().pauseOnCycle = $this.data().pauseoncycle;
				delete $this.data().pauseoncycle;
			}
			
			//check if element has data attributes. They have top priority
			o = $.extend({}, o, $this.data());

			//Shortcut to see if direction is upward or downward
			verticalDir = o.direction == 'up' || o.direction == 'down';
			
			//no gap if not duplicated
			o.gap = o.duplicated ? o.gap : 0;

			//wrap inner content into a div
			$this.wrapInner('<div class="js-marquee"></div>');
			
			//Make copy of the element
            var $el = $this.find('.js-marquee').css({
                'margin-right': o.gap,
                'float': 'left'
            });

            if (o.duplicated) {
                $el.clone().appendTo($this);
            }
			
			//wrap both inner elements into one div
			$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
			
			//Save the reference of the wrapper
			$marqueeWrapper = $this.find('.js-marquee-wrapper');
			
			//If direction is up or down, get the height of main element
			if(verticalDir) {
				var containerHeight = $this.height();
				$marqueeWrapper.removeAttr('style');
				$this.height(containerHeight );
				
				//Change the CSS for js-marquee element
				$this.find('.js-marquee').css({ 'float': 'none', 'margin-bottom': o.gap, 'margin-right': 0 });
				
				//Remove bottom margin from 2nd element if duplicated
				if(o.duplicated) $this.find('.js-marquee:last').css({ 'margin-bottom' : 0 });
				
				var elHeight = $this.find('.js-marquee:first').height() + o.gap;	
				
				/* adjust the animation speed according to the text length
				   formula is to: (Height of the text node / Height of the main container) * speed; */
				o.speed = ((parseInt(elHeight,10) + parseInt(containerHeight,10)) / parseInt(containerHeight,10)) * o.speed;
				
			}
			else {
				//Save the width of the each element so we can use it in animation
				elWidth = $this.find('.js-marquee:first').width() + o.gap;

				//container width
				containerWidth = $this.width();
				
				/* adjust the animation speed according to the text length
				   formula is to: (Width of the text node / Width of the main container) * speed; */
				o.speed = ((parseInt(elWidth,10) + parseInt(containerWidth,10)) / parseInt(containerWidth,10)) * o.speed;
			}
			
			//if duplicated than reduce the speed
			if(o.duplicated) {
				o.speed = o.speed / 2;
			}

			function pause() {
				if($.fn.pause) {
					$marqueeWrapper.pause();
					//fire event
					$this.trigger('paused');
				}
			}

			function resume() {
				if($.fn.resume) {
					$marqueeWrapper.resume();
					//fire event
					$this.trigger('resumed');
				}
			}

			//Animate recursive method
			var animate = function() {
				if(verticalDir) {
					if(o.duplicated) {
						$marqueeWrapper.css({ 'margin-top': o.direction == 'up' ? 0 : '-' + elHeight + 'px' });
						animationCss = { 'margin-top': o.direction == 'up' ? '-' + elHeight + 'px' : 0 };
					}
					else {
						$marqueeWrapper.css({ 'margin-top': o.direction == 'up' ? containerHeight : '-' + elHeight + 'px' });
						animationCss = { 'margin-top': o.direction == 'up' ? '-' + ($marqueeWrapper.height()) + 'px' : containerHeight };
					}
				}
				else {	
					if(o.duplicated) {
						$marqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
						animationCss = { 'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0 };
					}
					else {
						$marqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth : '-' + elWidth + 'px');
						animationCss = { 'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth };
					}
				}
				
				//fire event
				$this.trigger('beforeStarting');
				
				//Start animating
				$marqueeWrapper.animate(animationCss, o.speed , 'linear', function(){
					//fire event
					$this.trigger('finished');
					//animate again
					if(o.pauseOnCycle) {
						setTimeout(animate, o.delayBeforeStart);
					}
					else {
						animate();
					}
				});
			};
			
			//bind pause and resume events
			$this.on('pause', pause);
			$this.on('resume', resume);

			if(o.pauseOnHover) {
				$this.hover(pause, resume);
			}
			//Starts the recursive method
			setTimeout(animate, o.delayBeforeStart);
	
		});
	};//End of Plugin
	
	// Public: plugin defaults options
	$.fn.marquee.defaults = {
		//speed in milliseconds of the marquee
		speed: 5000,
		//gap in pixels between the tickers
		gap: 20,
		//pause time before the next animation turn
		delayBeforeStart: 0,
		//'left', 'right', 'up' or 'down'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: false,
		//on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
		pauseOnHover: false,
		//on cycle pause the marquee
		pauseOnCycle: false
	};
})(jQuery);
