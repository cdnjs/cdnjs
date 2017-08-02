/*
 * Peppermint touch slider
 * v. 1.0.0 | https://github.com/wilddeer/Peppermint
 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
 *
 * MIT License
 */
function Peppermint(_this, options) {
	var o = options || {};

	o.speed = o.speed || 300; // transition between slides in ms
	o.touchSpeed = o.touchSpeed || 300; // transition between slides in ms after touch
	o.slideshow = o.slideshow || false;
	o.slideshowInterval = o.slideshowInterval || 4000;
	o.stopSlideshowAfterInteraction = o.stopSlideshowAfterInteraction || false;
	o.startSlide = o.startSlide || 0;
	o.dots = o.dots || false;
	
	var slider = {
			slides: [],
			dots: []
		},
		slidesNumber,
		flickThreshold = 250, // Maximum time in ms for flicks
		activeSlide,
		slideWidth,
		dotBlock,
		slideBlock,
		slideshowTimeoutId,
		slideshowActive;

	// feature detects
	var support = {
		pointerEvents: !!window.navigator.pointerEnabled,
		msPointerEvents: !!window.navigator.msPointerEnabled,
		transform: (function() {
			var props = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'],
				block = document.createElement('div');

			for (var i in props) {
				if (block.style[props[i]] !== undefined) return true;
			}

			return false
		})()
	}

	//n - slide number (starting from 0)
	//speed - transition in ms, can be omitted
	function changeActiveSlide(n, speed) {
		if (!slider.slides[n]) {
			n = activeSlide;
		}
		else if (n !== activeSlide) {
			//change active dot
			for (var i in slider.dots) {
				slider.dots[i].className = slider.dots[i].className.replace(' active', '');
			}

			slider.dots[n].className += ' active';

			activeSlide = n;
		}

		changePos(-n*slider.width, (speed===undefined?o.speed:speed));

		//reset slideshow timeout whenever active slide is changed for whatever reason
		stepSlideshow();

		//API callback
		o.onSlideChange && o.onSlideChange(n);

		return n;
	}

	//changes position (in px) of the slider
	function changePos(pos, speed) {
		var time = speed?speed+'ms':'';

		slideBlock.style.webkitTransitionDuration = 
		slideBlock.style.MozTransitionDuration = 
		slideBlock.style.msTransitionDuration = 
		slideBlock.style.OTransitionDuration = 
		slideBlock.style.transitionDuration = time;

		slideBlock.style.webkitTransform = 'translate('+pos+'px,0) translateZ(0)';
		slideBlock.style.msTransform = 
		slideBlock.style.MozTransform = 
		slideBlock.style.OTransform = 
		slideBlock.style.transform = 'translateX('+pos+'px)';
	}

	//fallback function with `left` used instead of `transform`
	function changePosFallback(pos, speed) {
		var time = speed?speed+'ms':'';

		slideBlock.style.webkitTransitionDuration = 
		slideBlock.style.MozTransitionDuration = 
		slideBlock.style.msTransitionDuration = 
		slideBlock.style.OTransitionDuration = 
		slideBlock.style.transitionDuration = time;

		slideBlock.style.left = pos+'px';
	}

	function nextSlide() {
		var n = activeSlide + 1;

		if (n > slidesNumber - 1) {
			n = 0;
		}

		return changeActiveSlide(n);
	}

	function prevSlide() {
		var n = activeSlide - 1;

		if (n < 0) {
			n = slidesNumber - 1;
		}

		return changeActiveSlide(n);
	}

	function startSlideshow() {
		slideshowActive = true;
		stepSlideshow();
	}

	//sets or resets timeout to the next slide
	function stepSlideshow() {
		if (slideshowActive) {
			slideshowTimeoutId && clearTimeout(slideshowTimeoutId);

			slideshowTimeoutId = setTimeout(function() {
				nextSlide();
			},
			o.slideshowInterval);
		}
	}

	//pauses slideshow until `stepSlideshow` is invoked
	function pauseSlideshow() {
		slideshowTimeoutId && clearTimeout(slideshowTimeoutId);
	}

	function stopSlideshow() {
		slideshowActive = false;
		slideshowTimeoutId && clearTimeout(slideshowTimeoutId);
	}

	//inits touch events
	function touchInit() {
		var start = {},
			diff = {},
			isScrolling,
			clicksDenied = false;

		if (support.pointerEvents) {
			//Pointer events
			var p = 2,
				tEvents = {
					start: 'pointerdown',
					move: 'pointermove',
					end: 'pointerup',
					cancel: 'pointercancel'
				},
				setCapture = function(id) {
					//capture events if the pointer goes off of the element
					slideBlock.setPointerCapture(id);
				},
				check = function(e) {
					//In Pointer event model, multitouch invokes separate events for each finger. First touch is primary.
					//If it's not primary or if it's not touch at all -- we shouldn't bother.
					return !e.isPrimary || e.pointerType !== 'touch';
				};
		}
		else if (support.msPointerEvents) {
			//MSPointer events
			var p = 1,
				tEvents = {
					start: 'MSPointerDown',
					move: 'MSPointerMove',
					end: 'MSPointerUp',
					cancel: 'MSPointerCancel'
				},
				setCapture = function(id) {
					slideBlock.msSetPointerCapture(id);
				},
				check = function(e) {
					return !e.isPrimary || e.pointerType !== e.MSPOINTER_TYPE_TOUCH;
				};
		}
		else {
			//touch events
			var p = false,
				tEvents = {
					start: 'touchstart',
					move: 'touchmove',
					end: 'touchend',
					cancel: 'touchcancel'
				},
				check = function(e) {
					//if it's multitouch or pinch move -- do nothing
					return (e.touches && e.touches.length > 1) || (e.scale && e.scale !== 1);
				};
		}

		function tStart(event) {
			if (check(event)) return;

			//remember starting time and position
			start = {
				x: (p?event.clientX:event.touches[0].clientX),
				y: (p?event.clientY:event.touches[0].clientY),

				time: +new Date
			};
			
			//reset `isScrolling` and `diff`
			isScrolling = undefined;

			diff = {};

			if (p) {
				clicksDenied = true;
				setCapture(event.pointerId);
			}
		}

		function tMove(event) {
			//if user is trying to scroll vertically -- do nothing
			if (isScrolling || check(event)) return;

			diff.x = (p? event.clientX : event.touches[0].clientX) - start.x;

			//check whether the user is trying to scroll vertically
			if (isScrolling === undefined) {
				//`diff.y` is only required for this check
				diff.y = (p? event.clientY : event.touches[0].clientY) - start.y;
				//assign and check `isScrolling` at the same time
				if (isScrolling = (Math.abs(diff.x) < Math.abs(diff.y))) return;
			}

			event.preventDefault(); //Prevent scrolling
			pauseSlideshow(); //pause slideshow when touch is in progress

			//if it's first slide and moving left or last slide and moving right -- resist!
			diff.x = 
			diff.x / 
				(
					(!activeSlide && diff.x > 0
					|| activeSlide == slidesNumber - 1 && diff.x < 0)
					?                      
					(Math.abs(diff.x)/slider.width*2 + 1)
					:
					1
				);
			
			//change the position of the slider appropriately
			changePos(diff.x - slider.width*activeSlide);
		}

		function tEnd(event) {
			//IE likes to focus the link after touchend.
			//I dont' want to disable the outline completely for accessibility reasons,
			//so I just defocus it after touch and disable the outline for `:active` link in css.
			//This way the outline will remain visible when tabbing through the links.
			event.target && event.target.blur();
			
			if (isScrolling || check(event)) return;

			//duration of the touch move
			var duration = Number(+new Date - start.time);
			//whether it was a flick move or not
			var flick = duration < flickThreshold && Math.abs(diff.x) > 20;

			//if it was a flick or the move was long enough -- switch the slide
			if (flick
				|| (Math.abs(diff.x) > slider.width/4)) {

				if (diff.x < 0) {
					changeActiveSlide(activeSlide+1, o.touchSpeed);
				}
				else {
					changeActiveSlide(activeSlide-1, o.touchSpeed);	
				}

			}
			//else return to the current slide
			else {
				changeActiveSlide(activeSlide);
			}

			o.stopSlideshowAfterInteraction && stopSlideshow();

			//IE likes to open a link under your finger after touchmove.
			//This fixes IE's dumb behaviour.
			if (p) {
				if (diff.x === undefined) {
					clicksDenied = false;
				}
				else {
					setTimeout(function() {
						clicksDenied = false;
					}, 10)
				}
			}
		}

		//bind the events
		addEvent(slideBlock, tEvents.start, tStart, false);
		addEvent(slideBlock, tEvents.move, tMove, false);
		addEvent(slideBlock, tEvents.end, tEnd, false);
		addEvent(slideBlock, tEvents.cancel, tEnd, false);

		//No clicking during touch for IE
		if (p) {
			addEvent(slideBlock, 'click', function(event) {
				clicksDenied && event.preventDefault();
			}, false);
		}
	}
	
	//this should be invoked when the width of the slider is changed
	function onWidthChange() {
		slider.width = _this.offsetWidth;

		//have to do this in `px` because of webkit's rounding errors :-(
		slideBlock.style.width = slider.width*slidesNumber+'px';
		for (var i = 0; i < slidesNumber; i++) {
			slider.slides[i].style.width = slider.width+'px';
		}
		changePos(-activeSlide*slider.width);
	}

	function addEvent(el, event, func, bool) {
		if (el.addEventListener) {
			el.addEventListener(event, func, bool);
		}
		else {
			el.attachEvent('on'+event, func);
		}
	}

	function setup() {
		//If the UA doesn't support css transforms -- use fallback function.
		//It's a separate function for perfomance reasons.
		if (!support.transform) changePos = changePosFallback;

		slideBlock = document.createElement('div');
		slideBlock.className = 'slides';

		//get slides & generate dots
		for (var i = 0, l = _this.children.length; i < l; i++) {
			var slide = _this.children[i],
				dot = document.createElement('li'),
				links = slide.getElementsByTagName('a');

			slider.slides.push(slide);

			//`tabindex` makes dots tabbable
			dot.setAttribute('tabindex', '0');
			dot.setAttribute('role', 'button');

			dot.innerHTML = '<span></span>';

			//bind events to dots
			addEvent(dot, 'click', (function(x, b) {
				return function() {
					//Don't want to disable outlines completely for accessibility reasons,
					//so I just defocus the dot on click & set `outline: none` for `:active` in css.
					b.blur();
					changeActiveSlide(x);
					o.stopSlideshowAfterInteraction && stopSlideshow();
				};
			})(i, dot), false);

			//Bind the same function to Enter key, except for the `blur` part -- I dont't want
			//the focus to be lost when the user is using his keyboard to navigate.
			addEvent(dot, 'keyup', (function(x) {
				return function(event) {
					if (event.keyCode == 13) {
						changeActiveSlide(x);
						o.stopSlideshowAfterInteraction && stopSlideshow();
					}
				};
			})(i), false);

			//This solves tabbing problems:
			//Cycles through the links found in the slide and switches to that slide
			//when the link is focused. Also resets `scrollLeft` of the slider block.
			//`SetTimeout` solves Chrome's bug.
			for (var j = links.length - 1; j >= 0; j--) {
				addEvent(links[j], 'focus', function(x) {
					return function() {
						_this.scrollLeft = 0;
						setTimeout(function() {
							_this.scrollLeft = 0;
						}, 0);
						changeActiveSlide(x);
					}
				}(i), false);
			};

			slider.dots.push(dot);
		}

		slidesNumber = slider.slides.length;

		slideWidth = 100/slidesNumber;

		_this.className += ' active';
		
		slider.width = _this.offsetWidth;

		//have to do this in `px` because of webkit's rounding errors :-(
		slideBlock.style.width = slider.width*slidesNumber+'px';
		for (var i = 0; i < slidesNumber; i++) {
			slider.slides[i].style.width = slider.width+'px';
			slideBlock.appendChild(slider.slides[i]);
		}

		_this.appendChild(slideBlock);

		if (o.dots) {
			dotBlock = document.createElement('ul');
			dotBlock.className = 'dots';

			for (var i = 0, l = slider.dots.length; i < l; i++) {
				dotBlock.appendChild(slider.dots[i]);
			}

			_this.appendChild(dotBlock);
		}

		//watch for slider width changes
		addEvent(window, 'resize', onWidthChange, false);
		addEvent(window, 'orientationchange', onWidthChange, false);

		//init first slide
		changeActiveSlide(o.startSlide, 0);

		//init slideshow
		if (o.slideshow) startSlideshow();

		//API callback
		o.onSetup && o.onSetup(slidesNumber);
	}

	//Init. Timeout to expose the API first.
	setTimeout(function() {
		setup();
		touchInit();
	}, 0);

	//expose the API
	return {
		slideTo: function(slide) {
			return changeActiveSlide(parseInt(slide, 10));
		},

		next: function() {
			return nextSlide();
		},

		prev: function() {
			return prevSlide();
		},

		//start slideshow
		start: function() {
			startSlideshow();
		},

		//stop slideshow
		stop: function() {
			stopSlideshow();
		},

		//pause slideshow until the next slide change
		pause: function() {
			pauseSlideshow();
		},

		//get current slide number
		getCurrentPos: function() {
			return activeSlide;
		},

		//get total number of slides
		getSlidesNumber: function() {
			return slidesNumber;
		},

		//invoke this when the slider's width is changed
		recalcWidth: function() {
			onWidthChange();
		}
	};
};

//if jQuery is present -- create a plugin
if (window.jQuery) {
	(function($) {
		$.fn.Peppermint = function(options) {
			this.each(function() {
				$(this).data('Peppermint', Peppermint($(this)[0], options));
			});
		};
	})(window.jQuery);
}