/*!
 * Glide.js
 * Version: 2.0.1
 * Simple, lightweight and fast jQuery slider
 * Author: @jedrzejchalubek
 * Site: http://http://glide.jedrzejchalubek.com/
 * Licensed under the MIT license
 */

;(function($, window, document, undefined){
/**
 * --------------------------------
 * Glide Animation
 * --------------------------------
 * Animation functions
 * @return {Glide.Animation}
 */

var Animation = function (Glide, Core) {


	function Module() {}


	/**
	 * Make specifed animation type
	 * @param {Number} offset Offset from current position
	 * @return {Module}
	 */
	Module.prototype.make = function(offset) {

		this.offset = (typeof offset !== 'undefined') ? offset : 0;
		// Animation actual translate animation
		this[Glide.options.type]();
		return this;

	};


	/**
	 * After transition callback
	 * @param  {Function} callback
	 * @return {Int}
	 */
	Module.prototype.after = function(callback) {
		return setTimeout(function(){
			callback();
		}, Glide.options.animationDuration + 20);
	};


	/**
	 * Animation slider animation type
	 * @param {string} direction
	 */
	Module.prototype.slider = function () {

		var translate = (Glide.current * Glide.width) - (Glide.width + this.offset);

		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate)
		});

		// If on start hide prev arrow
		if (Glide.current === 1) Core.Arrows.disable('prev');
		// If on end hide next arrow
		else if (Glide.current === Glide.length) Core.Arrows.disable('next');
		// Show arrows
		else Core.Arrows.enable();

	};


	/**
	 * Animation carousel animation type
	 * @param {string} direction
	 */
	Module.prototype.carousel = function () {

		// Translate container
		var translate;

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (Core.Run.flag && Core.Run.direction === '<') {

			// Translate is 0 (left edge of wrapper)
			translate = 0 - this.offset;
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// clear transition and jump to last slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set('x', Glide.length * Glide.width)
				});

			});

		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		else if (Core.Run.flag && Core.Run.direction === '>') {

			// Translate is euqal wrapper width with offset
			translate = (Glide.length * Glide.width) + (Glide.width - this.offset);
			// Reset flag
			Core.Run.flag = false;

			// After offset animation is done,
			this.after(function() {

				// Clear transition and jump to first slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set('x', Glide.width)
				});

			});

		}


		/**
		 * While flag is not set
		 * make normal translate
		 */
		else {
			translate = (Glide.current * Glide.width) - this.offset;
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set('x', translate)
		});

	};


	/**
	 * Animation slideshow animation type
	 * @param {string} direction
	 */
	Module.prototype.slideshow = function (direction) {

		Glide.slides.css('transition', Core.Transition.get('opacity'))
			.eq(Glide.current - 1).css('opacity', '1')
			.siblings().css('opacity', 0);

	};

	return new Module();

};
;/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Glide.Api}
 */

var Api = function (Glide, Core) {


	/**
	 * Api Module Constructor
	 */
	function Module() {}


	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function () {

		return {

			/**
			 * Get current slide index
			 * @return {int}
			 */
			current: function() {
				return Glide.current;
			},


			/**
			 * Go to specifed slide
			 * @param  {String}   distance
			 * @param  {Function} callback
			 * @return {Core.Run}
			 */
			go: function(distance, callback) {
				return Core.Run.make(distance, callback);
			},


			/**
			 * Jump without animation to specifed slide
			 * @param  {String}   distance
			 * @param  {Function} callback
			 * @return {Core.Run}
			 */
			jump: function(distance, callback) {
				// Let know that we want jumping
				Core.Transition.jumping = true;
				Core.Animation.after(function () {
					// Jumping done, take down flag
					Core.Transition.jumping = false;
				});
				return Core.Run.make(distance, callback);
			},


			/**
			 * Start autoplay
			 * @return {Core.Run}
			 */
			start: function(interval) {
				// We want running
				Core.Run.running = true;
				Glide.options.autoplay = parseInt(interval);
				return Core.Run.play();
			},


			/**
			 * Play autoplay
			 * @return {Core.Run}
			 */
			play: function(){
				return Core.Run.play();
			},


			/**
			 * Pause autoplay
			 * @return {Core.Run}
			 */
			pause: function() {
				return Core.Run.pause();
			},


			/**
			 * Destroy
			 * @return {Glide.slider}
			 */
			destroy: function() {

				Core.Events.unbind();
				Core.Touch.unbind();
				Core.Arrows.unbind();
				Core.Bullets.unbind();
				Glide.slider.removeData('glide_api');

				delete Glide.slider;
				delete Glide.track;
				delete Glide.slides;
				delete Glide.width;
				delete Glide.length;

			},


			/**
			 * Refresh slider
			 * @return {Core.Run}
			 */
			refresh: function() {
				Core.Build.removeClones();
				Glide.collect();
				Glide.setup();
				Core.Build.init();
			},

		};

	};


	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Glide Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Glide.Arrows}
 */

var Arrows = function (Glide, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Module() {
		this.build();
		this.bind();
	}


	/**
	 * Build
	 * arrows DOM
	 */
	Module.prototype.build = function () {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.arrows);
		this.items = this.wrapper.children();

	};


	/**
	 * Hide arrow
	 */
	Module.prototype.disable = function (type) {

		return this.items.filter('.' + Glide.options.classes['arrow' + Core.Helper.capitalise(type)])
			.unbind('click.glide touchstart.glide')
			.addClass(Glide.options.classes.disabled)
			.siblings().removeClass(Glide.options.classes.disabled)
			.end();

	};


	/**
	 * Show arrows
	 */
	Module.prototype.enable = function () {

		this.bind();
		return this.items.removeClass(Glide.options.classes.disabled);

	};


	/**
	 * Bind
	 * arrows events
	 */
	Module.prototype.bind = function () {

		return this.items.on('click.glide touchstart.glide', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.pause();
				Core.Run.make($(this).data('glide-dir'));
				Core.Animation.after(function () {
					Core.Run.play();
				});
			}
		});

	};


	/**
	 * Unbind
	 * arrows events
	 */
	Module.prototype.unbind = function () {
		return this.items.unbind('click.glide touchstart.glide');
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @param {Glide} Glide
 * @param {Core} Core
 * @return {Module}
 */

var Build = function (Glide, Core) {


	// Build Module Constructor
	function Module() {
		this.init();
	}


	/**
	 * Init slider build
	 * @return {[type]} [description]
	 */
	Module.prototype.init = function() {
		// Set slides height
		Core.Height.set();
		// Build proper slider type
		this[Glide.options.type]();
		// Set slide active class
		this.active();
		// Set bullet active class
		Core.Bullets.active();
	};


	/**
	 * Remove slides
	 * clones
	 */
	Module.prototype.removeClones = function() {
		return Glide.track.find('.clone').remove();
	};


	/**
	 * Build Slider type
	 */
	Module.prototype.slider = function() {

		// Hide next/prev arrow when on the end/start
		if (Glide.current === Glide.length) Core.Arrows.disable('next');
		if (Glide.current === 1) Core.Arrows.disable('prev');

		Glide.track.css({
			'width': Glide.width * Glide.length,
			'transform': Core.Translate.set('x', Glide.width * (Glide.current - 1)),
		});

		Glide.slides.width(Glide.width);

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		Glide.track
			.append(Glide.clones[0].width(Glide.width))
			.prepend(Glide.clones[1].width(Glide.width))
			.css({
				'width': (Glide.width * Glide.length) + (Glide.width * 2),
				'transform': Core.Translate.set('x', Glide.width * Glide.current),
			});

		Glide.slides.width(Glide.width);

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function () {

		// Force height set
		Core.Height.set(true);
		// Show up current slide
		Glide.slides.eq(Glide.current - 1)
			.css('opacity', 1)
			.siblings().css('opacity', 0);

	};


	/**
	 * Set active class
	 * to current slide
	 */
	Module.prototype.active = function () {

		Glide.slides
			.eq(Glide.current - 1).addClass(Glide.options.classes.active)
			.siblings().removeClass(Glide.options.classes.active);

	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Bullets
 * --------------------------------
 * Bullets navigation module
 * @return {Glide.Bullets}
 */

var Bullets = function (Glide, Core) {


	/**
	 * Bullets Module Constructor
	 */
	function Module() {
		this.build();
		this.bind();
	}


	/**
	 * Build
	 * bullets DOM
	 */
	Module.prototype.build = function () {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.bullets);

		for(var i = 1; i <= Glide.length; i++) {
			$('<li>', {
				'class': Glide.options.classes.bullet,
				'data-glide-dir': '=' + i
			}).appendTo(this.wrapper);
		}

		this.items = this.wrapper.children();

	};


	Module.prototype.active = function () {

		Core.Bullets.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');

	};


	/**
	 * Bind
	 * bullets events
	 */
	Module.prototype.bind = function () {

		this.items.on('click.glide touchstart.glide', function(event){
			event.preventDefault();
			if (!Core.Events.disabled) {
				Core.Run.pause();
				Core.Run.make($(this).data('glide-dir'));
				Core.Animation.after(function () {
					Core.Run.play();
				});
			}
		});

	};


	/**
	 * Unbind
	 * bullets events
	 */
	Module.prototype.unbind = function () {
		this.items.unbind('click.glide touchstart.glide');
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Core
 * --------------------------------
 * @param {Glide} Glide	Slider Class
 * @param {array} Modules	Modules list to construct
 * @return {Module}
 */

var Core = function (Glide, Modules) {

	/**
	 * Core Module Constructor
	 * Construct modules and inject Glide and Core as dependency
	 */
	function Module() {

		for(var module in Modules) {
			this[module] = new Modules[module](Glide, this);
		}

	}

	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Events
 * --------------------------------
 * Events functions
 * @return {Glide.Events}
 */

var Events = function (Glide, Core) {


	/**
	 * Events Module Constructor
	 */
	function Module() {
		this.disabled = false;
		this.keyboard();
		this.hoverpause();
		this.resize();
		this.triggers();
	}


	/**
	 * Keyboard events
	 */
	Module.prototype.keyboard = function() {
		if (Glide.options.keyboard) {
			$(window).on('keyup.glide', function(event){
				if (event.keyCode === 39) Core.Run.make('>');
				if (event.keyCode === 37) Core.Run.make('<');
			});
		}
	};

	/**
	 * Hover pause event
	 */
	Module.prototype.hoverpause = function() {

		if (Glide.options.hoverpause) {

			Glide.track
				.on('mouseover.glide', function(){
					Core.Run.pause();
				})
				.on('mouseout.glide', function(){
					Core.Run.play();
				});

		}

	};


	/**
	 * Resize window event
	 */
	Module.prototype.resize = function() {

		$(window).on('resize', this.throttle(function() {
			Core.Transition.jumping = true;
			Core.Run.pause();
			Glide.setup();
			Core.Build.init();
			Core.Run.make('=' + Glide.current);
			Core.Run.play();
			Core.Transition.jumping = false;
		}, Glide.options.throttle));

	};


	/**
	 * Triggers event
	 */
	Module.prototype.triggers = function() {

		this.triggers = $('[data-glide-trigger]');

		if (this.triggers.length) {

			this.triggers.on('click.glide touchstart.glide', function(event) {

				event.preventDefault();

				if (!Core.Events.disabled) {

					var target = $($(this).data('glide-trigger')).data('glide_api');

					target.pause();
					target.go($(this).data('glide-dir'));
					target.play();

				}

			});

		}

	};


	/**
	 * Disable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.disable = function () {
		this.disabled = true;
		return this;
	};


	/**
	 * Enable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.enable = function () {
		this.disabled = false;
		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.call = function (func) {
		if ( (func !== 'undefined') && (typeof func === 'function') ) func(Glide.current, Glide.slides.eq(Glide.current - 1));
		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.unbind = function () {

		Glide.track
			.unbind('keyup.glide')
			.unbind('mouseover.glide')
			.unbind('mouseout.glide');

		this.triggers
			.unbind('click.glide touchstart.glide');

		$(window)
			.unbind('keyup.glide')
			.unbind('resize.glide');

	};


	/**
	 * Throttle
	 * @source http://underscorejs.org/
	 */
	Module.prototype.throttle = function(func, wait, options) {
		var that = this;
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : that.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = that.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};


	/**
	 * Get time
	 * @source http://underscorejs.org/
	 */
	Module.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Height
 * --------------------------------
 * Height module
 * @return {Glide.Height}
 */

var Height = function (Glide, Core) {


	/**
	 * Height Module Constructor
	 */
	function Module() {

		if (Glide.options.autoheight) {
			Glide.wrapper.css({
				'transition': Core.Transition.get('height'),
			});
		}

	}

	/**
	 * Get current slide height
	 * @return {Number}
	 */
	Module.prototype.get = function () {
		return Glide.slides.eq(Glide.current - 1).height();
	};

	/**
	 * Set slider height
	 * @return {Boolean}
	 */
	Module.prototype.set = function (force) {
		return (Glide.options.autoheight || force) ? Glide.wrapper.height(this.get()) : false;
	};


	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Glide Helper
 * --------------------------------
 * Helper functions
 * @return {Glide.Helper}
 */

var Helper = function (Glide, Core) {


	/**
	 * Helper Module Constructor
	 */
	function Module() {}


	/**
	 * Capitalise string
	 * @param  {string} s
	 * @return {string}
	 */
	Module.prototype.capitalise = function (s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	};


	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Glide Run
 * --------------------------------
 * Run logic module
 * @return {Module}
 */

var Run = function (Glide, Core) {


	/**
	 * Run Module
	 * Constructor
	 */
	function Module() {
		// Running flag
		// It's in use when autoplay is disabled via options,
		// but we want start autoplay via api
		this.running = false;
		// Flag for offcanvas animation to cloned slides
		this.flag = false;
		this.play();
	}


	/**
	 * Start autoplay animation
	 * Setup interval
	 * @return {Int/Undefined}
	 */
	Module.prototype.play = function() {

		var that = this;

		if (Glide.options.autoplay || this.running) {

			if (typeof this.interval === 'undefined') {
				this.interval = setInterval(function() {
					that.make('>');
				}, Glide.options.autoplay);
			}

		}

		return this.interval;

	};


	/**
	 * Pasue autoplay animation
	 * Clear interval
	 * @return {Int/Undefined}
	 */
	Module.prototype.pause = function() {

		if (Glide.options.autoplay || this.running) {
			if (this.interval >= 0) this.interval = clearInterval(this.interval);
		}

		return this.interval;

	};


	/**
	 * Run move animation
	 * @param  {string} move Code in pattern {direction}{steps} eq. ">3"
	 */
	Module.prototype.make = function (move, callback) {

		// Cache
		var that = this;
		// Extract move direction
		this.direction = move.substr(0, 1);
		// Extract move steps
		this.steps = (move.substr(1)) ? move.substr(1) : 0;

		// Stop autoplay until hoverpause is not set
		if(!Glide.options.hoverpause) this.pause();
		// Disable events and call before transition callback
		Core.Events.disable().call(Glide.options.beforeTransition);

		// Based on direction
		switch(this.direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (Glide.current == Glide.length) Glide.current = 1, this.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (this.steps === '>') Glide.current = Glide.length;
				// Otherwise change normally
				else Glide.current = Glide.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(Glide.current == 1) Glide.current = Glide.length, this.flag = true;
				// When steps is not number, but '<'
				// scroll slider to start
				else if (this.steps === '<') Glide.current = 1;
				// Otherwise change normally
				else Glide.current = Glide.current - 1;
				break;

			case '=':
				// Jump to specifed slide
				Glide.current = parseInt(this.steps);
				break;

		}

		// Set slides height
		if (Glide.options.autoheight) Core.Height.set();
		// Set active bullet
		Core.Bullets.active();

		// Run actual translate animation
		Core.Animation.make().after(function(){
			// Set active flags
			Core.Build.active();
			// Enable events and call callbacks
			Core.Events.enable().call(callback).call(Glide.options.afterTransition);
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) that.play();
		});

	};


	return new Module();

};
;var Touch = function (Glide, Core) {


	/**
	 * Touch Module Constructor
	 */
	function Module() {

		this.dragging = false;

		if (Glide.options.touchDistance) {
			Glide.track.on({
				'touchstart.glide mousedown.glide': this.start,
				'touchmove.glide mousemove.glide': Core.Events.throttle(this.move, Glide.options.throttle),
				'touchend.glide touchcancel.glide mouseup.glide mouseleave.glide': this.end
			});
		}

	}


	/**
	 * Unbind touch events
	 */
	Module.prototype.unbind = function() {
		Glide.track
			.unbind('touchstart.glide mousedown.glide')
			.unbind('touchmove.glide mousemove.glide')
			.unbind('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');
	};


	/**
	 * Start touch event
	 * @param  {Object} event
	 */
	Module.prototype.start = function(event) {

		// Escape if events disabled
		// or already dragging
		if (!Core.Events.disabled && !this.dragging) {

			// Pause if autoplay
			Core.Run.pause();
			// Turn on jumping flag
			Core.Transition.jumping = true;

			var touch;

			// Cache event
			if (event.type === 'mousedown') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.dragging = true;

		}

	};


	/**
	 * Touch move event
	 * @param  {Object} event
	 */
	Module.prototype.move = function(event) {

		// Escape if events not disabled
		// or not dragging
		if (!Core.Events.disabled && this.dragging) {

			// Add dragging class
			Glide.track.addClass(Glide.options.classes.dragging);

			var touch;

			// Cache event
			if (event.type === 'mousemove') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate start, end points
			var subExSx = parseInt(touch.pageX) - this.touchStartX;
			var subEySy = parseInt(touch.pageY) - this.touchStartY;
			// Bitwise subExSx pow
			var powEX = Math.abs( subExSx << 2 );
			// Bitwise subEySy pow
			var powEY = Math.abs( subEySy << 2 );
			// Calculate the length of the hypotenuse segment
			var touchHypotenuse = Math.sqrt( powEX + powEY );
			// Calculate the length of the cathetus segment
			var touchCathetus = Math.sqrt( powEY );

			// Calculate the sine of the angle
			this.touchSin = Math.asin( touchCathetus/touchHypotenuse );

			// While angle is lower than 45 degree
			if ( (this.touchSin * 180 / Math.PI) < 45 ) {
				// Prevent scrolling
				event.preventDefault();
			// Else escape from event, we don't want move slider
			} else {
				// Clear dragging flag
				this.dragging = false;
				return;
			}

			// Make offset animation
			Core.Animation.make(subExSx);

		}

	};


	/**
	 * Touch end event
	 * @param  {Onject} event
	 */
	Module.prototype.end = function(event) {

		// Escape if events not disabled
		// or not dragging
		if (!Core.Events.disabled && this.dragging) {

			// Unset dragging flag
			this.dragging = false;
			// Disable other events
			Core.Events.disable();
			// Remove dragging class
			Glide.track.removeClass(Glide.options.classes.dragging);
			// Turn off jumping flag
			Core.Transition.jumping = false;

			var touch;

			// Cache event
			if (event.type === 'mouseup' || event.type === 'mouseleave') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate touch distance
			var touchDistance = touch.pageX - this.touchStartX;
			// Calculate degree
			var touchDeg = this.touchSin * 180 / Math.PI;

			// If slider type is slider
			if (Glide.options.type == 'slider') {

				// Prevent slide to right on first item (prev)
				if (Glide.current === 1) {
					if ( touchDistance > 0 ) touchDistance = 0;
				}

				// Prevent slide to left on last item (next)
				if (Glide.current === Glide.length) {
					if ( touchDistance < 0 ) touchDistance = 0;
				}

			}

			// While touch is positive and greater than distance set in options
			// move backward
			if (touchDistance > Glide.options.touchDistance && touchDeg < 45) Core.Run.make('<');
			// While touch is negative and lower than negative distance set in options
			// move forward
			else if (touchDistance < -Glide.options.touchDistance && touchDeg < 45) Core.Run.make('>');
			// While swipe don't reach distance apply previous transform
			else Core.Animation.make();

			// After animation
			Core.Animation.after(function(){
				// Enable events
				Core.Events.enable();
				// If autoplay start auto run
				Core.Run.play();
			});

		}

	};


	// @return Module
	return new Module();

};
;var Transition = function (Glide, Core) {


	/**
	 * Transition Module Constructor
	 */
	function Module() {
		this.jumping = false;
	}


	/**
	 * Get transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	Module.prototype.get = function(property) {

		if (!this.jumping) return property + ' ' + Glide.options.animationDuration + 'ms ' + Glide.options.animationTimingFunc;
		else return this.clear('all');

	};


	/**
	 * Clear transition settings
	 * @param  {string} property
	 * @return {string}
	 */
	Module.prototype.clear = function(property) {
		return property + ' 0ms ' + Glide.options.animationTimingFunc;
	};


	// @return Module
	return new Module();


};
;var Translate = function (Glide, Core) {


	/**
	 * Translate Module Constructor
	 */
	function Module() {

		this.axes = {
			x: 0,
			y: 0,
			z: 0
		};

	}


	/**
	 * Get translate
	 * @return {string}
	 */
	Module.prototype.get = function() {
		var matrix = Glide.track[0].styles.transform.replace(/[^0-9\-.,]/g, '').split(',');
		return parseInt(matrix[12] || matrix[4]);
	};


	/**
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
		this.axes[axis] = parseInt(value);
		return 'translate3d(' + -1 * this.axes.x + 'px, ' + this.axes.y + 'px, ' + this.axes.z + 'px)';
	};


	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Glide Main
 * --------------------------------
 * Responsible for slider initiation,
 * extending defaults, returning public api
 * @param {jQuery} element Root element
 * @param {Object} options Plugin init options
 * @return {Glide}
 */

var Glide = function (element, options) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		autoplay: 4000,
		type: 'carousel',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		touchDistance: 80,
		animationDuration: 400,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		throttle: 16,
		autoheight: false,
		classes: {
			base: 'glide',
			wrapper: 'glide__wrapper',
			track: 'glide__track',
			slide: 'glide__slide',
			arrows: 'glide__arrows',
			arrow: 'glide__arrow',
			arrowNext: 'next',
			arrowPrev: 'prev',
			bullets: 'glide__bullets',
			bullet: 'glide__bullet',
			active: 'active',
			dragging: 'dragging',
			disabled: 'disabled'
		},
		beforeInit: function(el) {},
		afterInit: function(el) {},
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);
	this.current = parseInt(this.options.startAt);
	this.element = element;

	// Collect DOM
	this.collect();
	// Init values
	this.setup();

	// Call before init callback
	this.options.beforeInit(this.slider);

	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var Engine = new Core(this, {
		Helper: Helper,
		Translate: Translate,
		Transition: Transition,
		Events: Events,
		Arrows: Arrows,
		Bullets: Bullets,
		Height: Height,
		Build: Build,
		Run: Run,
		Animation: Animation,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.slider);

	// api return
	return Engine.Api.instance();

};


/**
 * Collect DOM
 * and set classes
 */
Glide.prototype.collect = function() {

	this.slider = this.element.addClass(this.options.classes.base + '--' + this.options.type);
	this.track = this.slider.find('.' + this.options.classes.track);
	this.wrapper = this.slider.find('.' + this.options.classes.wrapper);
	this.slides = this.wrapper.find('.' + this.options.classes.slide);

	this.clones = [
		this.slides.filter(':first-child').clone().addClass('clone'),
		this.slides.filter(':last-child').clone().addClass('clone')
	];

};


/**
 * Setup
 * properties
 */
Glide.prototype.setup = function() {
	this.width = this.slider.width();
	this.length = this.slides.length;
};
;/**
 * Wire Glide to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.glide = function (options) {

	return this.each(function () {
		if ( !$.data(this, 'glide_api') ) {
			$.data(this, 'glide_api',
				new Glide($(this), options)
			);
		}
	});

};

})(jQuery, window, document);