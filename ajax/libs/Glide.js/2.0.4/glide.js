/*!
 * Glide.js
 * Version: 2.0.4
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
 * @return {Animation}
 */

var Animation = function(Glide, Core) {

	var offset;

	function Module() {}

	/**
	 * Make specifed animation type
	 * @param {Number} offset Offset from current position
	 * @return {Module}
	 */
	Module.prototype.make = function(displacement) {
		offset = (typeof displacement !== 'undefined') ? parseInt(displacement) : 0;
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
	Module.prototype.slider = function() {

		var translate = Glide[Glide.size] * (Glide.current - 1);
		var shift = Core.Clones.shift - Glide.paddings;

		// If on first slide
		if (Core.Run.isStart()) {
			if (Glide.options.centered) shift = Math.abs(shift);
			// Shift is zero
			else shift = 0;
			// Hide prev arrow
			Core.Arrows.disable('prev');
		}
		// If on last slide
		else if (Core.Run.isEnd()) {
			if (Glide.options.centered) shift = Math.abs(shift);
			// Double and absolute shift
			else shift = Math.abs(shift * 2);
			// Hide next arrow
			Core.Arrows.disable('next');
		}
		// Otherwise
		else {
			// Absolute shift
			shift = Math.abs(shift);
			// Show arrows
			Core.Arrows.enable();
		}

		// Apply translate
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set(Glide.axis, translate - shift - offset)
		});

	};


	/**
	 * Animation carousel animation type
	 * @param {string} direction
	 */
	Module.prototype.carousel = function() {

		// Translate container
		var translate = Glide[Glide.size] * Glide.current;
		// Calculate addtional shift
		var shift;

		if (Glide.options.centered) shift = Core.Clones.shift - Glide.paddings;
		else shift = Core.Clones.shift;

		/**
		 * The flag is set and direction is prev,
		 * so we're on the first slide
		 * and need to make offset translate
		 */
		if (Core.Run.isOffset('<')) {
			// Translate is 0 (left edge of wrapper)
			translate = 0;
			// Reset flag
			Core.Run.flag = false;
			// After offset animation is done
			this.after(function() {
				// clear transition and jump to last slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] * Glide.length + shift)
				});
			});
		}


		/**
		 * The flag is set and direction is next,
		 * so we're on the last slide
		 * and need to make offset translate
		 */
		if (Core.Run.isOffset('>')) {
			// Translate is slides width * length with addtional offset (right edge of wrapper)
			translate = (Glide[Glide.size] * Glide.length) + Glide[Glide.size];
			// Reset flag
			Core.Run.flag = false;
			// After offset animation is done
			this.after(function() {
				// Clear transition and jump to first slide
				Glide.track.css({
					'transition': Core.Transition.clear('all'),
					'transform': Core.Translate.set(Glide.axis, Glide[Glide.size] + shift)
				});
			});
		}

		/**
		 * Actual translate apply to wrapper
		 * overwrite transition (can be pre-cleared)
		 */
		Glide.track.css({
			'transition': Core.Transition.get('all'),
			'transform': Core.Translate.set(Glide.axis, translate + shift - offset)
		});

	};


	/**
	 * Animation slideshow animation type
	 * @param {string} direction
	 */
	Module.prototype.slideshow = function() {

		Glide.slides.css('transition', Core.Transition.get('opacity'))
			.eq(Glide.current - 1).css('opacity', 1)
			.siblings().css('opacity', 0);

	};

	return new Module();

};
;/**
 * --------------------------------
 * Glide Api
 * --------------------------------
 * Plugin api module
 * @return {Api}
 */

var Api = function(Glide, Core) {


	/**
	 * Api Module Constructor
	 */
	function Module() {}


	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function() {

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
				Core.Animation.after(function() {
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

				Core.Run.pause();
				Core.Clones.remove();
				Core.Helper.removeStyles([Glide.track, Glide.slides]);
				Core.Bullets.remove();
				Glide.slider.removeData('glide_api');

				Core.Events.unbind();
				Core.Touch.unbind();
				Core.Arrows.unbind();
				Core.Bullets.unbind();

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
				Core.Run.pause();
				Glide.collect();
				Glide.setup();
				Core.Clones.remove().init();
				Core.Bullets.remove().init();
				Core.Build.init();
				Core.Run.make('=' + parseInt(Glide.options.startAt), Core.Run.play());
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
 * @return {Arrows}
 */

var Arrows = function(Glide, Core) {


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
	Module.prototype.build = function() {
		this.wrapper = Glide.slider.find('.' + Glide.options.classes.arrows);
		this.items = this.wrapper.children();
	};


	/**
	 * Disable arrow
	 */
	Module.prototype.disable = function(type) {
		var classes = Glide.options.classes;

		return this.items.filter('.' + classes['arrow' + Core.Helper.capitalise(type)])
			.unbind('click.glide touchstart.glide')
			.addClass(classes.disabled)
			.siblings()
			.bind('click.glide touchstart.glide', this.click)
			.removeClass(classes.disabled);
	};


	/**
	 * Show arrows
	 */
	Module.prototype.enable = function() {
		this.bind();
		return this.items.removeClass(Glide.options.classes.disabled);
	};

	/**
	 * Click arrow method
	 * @param  {Object} event
	 */
	Module.prototype.click = function(event) {
		event.preventDefault();

		if (!Core.Events.disabled) {
			Core.Run.pause();
			Core.Run.make($(this).data('glide-dir'));
			Core.Animation.after(function() {
				Core.Run.play();
			});
		}
	};


	/**
	 * Bind
	 * arrows events
	 */
	Module.prototype.bind = function() {
		return this.items.on('click.glide touchstart.glide', this.click);
	};


	/**
	 * Unbind
	 * arrows events
	 */
	Module.prototype.unbind = function() {
		return this.items.off('click.glide touchstart.glide');
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Build
 * --------------------------------
 * Build slider DOM
 * @return {Build}
 */

var Build = function(Glide, Core) {

	// Build Module Constructor
	function Module() {
		this.init();
	}


	/**
	 * Init slider build
	 * @return {[type]} [description]
	 */
	Module.prototype.init = function() {
		// Build proper slider type
		this[Glide.options.type]();
		// Set slide active class
		this.active();

		// Set slides height
		Core.Height.set();
	};


	/**
	 * Check if slider type is
	 * @param  {string} name Type name to check
	 * @return {boolean}
	 */
	Module.prototype.isType = function(name) {
		return Glide.options.type === name;
	};


	/**
	 * Check if slider type is
	 * @param  {string} name Type name to check
	 * @return {boolean}
	 */
	Module.prototype.isMode = function(name) {
		return Glide.options.mode === name;
	};


	/**
	 * Build Slider type
	 */
	Module.prototype.slider = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Apply slides width
		Glide.slides[Glide.size](Glide[Glide.size]);
		// Apply translate
		Glide.track.css(Glide.size, Glide[Glide.size] * Glide.length);
		// If mode is vertical apply height
		if(this.isMode('vertical')) Core.Height.set(true);
		// Go to startup position
		Core.Animation.make();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Build Carousel type
	 * @return {[type]} [description]
	 */
	Module.prototype.carousel = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Update shift for carusel type
		Core.Clones.shift = (Glide[Glide.size] * Core.Clones.items.length/2) - Glide[Glide.size];
		// Apply slides width
		Glide.slides[Glide.size](Glide[Glide.size]);
		// Apply translate
		Glide.track.css(Glide.size, (Glide[Glide.size] * Glide.length) + Core.Clones.getGrowth());
		// If mode is vertical apply height
		if(this.isMode('vertical')) Core.Height.set(true);
		// Go to startup position
		Core.Animation.make();
		// Append clones
		Core.Clones.append();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Build Slideshow type
	 * @return {[type]} [description]
	 */
	Module.prototype.slideshow = function() {

		// Turn on jumping flag
		Core.Transition.jumping = true;
		// Go to startup position
		Core.Animation.make();
		// Turn off jumping flag
		Core.Transition.jumping = false;

	};


	/**
	 * Set active class
	 * to current slide
	 */
	Module.prototype.active = function() {

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
 * @return {Bullets}
 */

var Bullets = function(Glide, Core) {


	/**
	 * Bullets Module Constructor
	 */
	function Module() {
		this.init();
		this.bind();
	}

	Module.prototype.init = function() {
		this.build();
		this.active();

		return this;
	};

	/**
	 * Build
	 * bullets DOM
	 */
	Module.prototype.build = function() {

		this.wrapper = Glide.slider.children('.' + Glide.options.classes.bullets);

		for(var i = 1; i <= Glide.length; i++) {
			$('<button>', {
				'class': Glide.options.classes.bullet,
				'data-glide-dir': '=' + i
			}).appendTo(this.wrapper);
		}

		this.items = this.wrapper.children();

	};


	/**
	 * Handle active class
	 * Adding and removing active class
	 */
	Module.prototype.active = function() {
		return this.items
			.eq(Glide.current - 1).addClass('active')
			.siblings().removeClass('active');
	};


	/**
	 * Delete all bullets
	 */
	Module.prototype.remove = function() {
		this.items.remove();
		return this;
	};


	/**
	 * Bullet click
	 * @param  {Object} event
	 */
	Module.prototype.click = function(event) {
		event.preventDefault();

		if (!Core.Events.disabled) {
			Core.Run.pause();
			Core.Run.make($(this).data('glide-dir'));
			Core.Animation.after(function() {
				Core.Run.play();
			});
		}
	};


	/**
	 * Bind
	 * bullets events
	 */
	Module.prototype.bind = function() {
		return this.wrapper.on('click.glide touchstart.glide', 'button', this.click);
	};


	/**
	 * Unbind
	 * bullets events
	 */
	Module.prototype.unbind = function() {
		return this.wrapper.on('click.glide touchstart.glide', 'button');
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Clones
 * --------------------------------
 * Clones module
 * @return {Clones}
 */

var Clones = function(Glide, Core) {


	var map = [0,1];
	var pattern;


	/**
	 * Clones Module Constructor
	 */
	function Module() {
		this.init();
	}


	Module.prototype.init = function() {
		this.items = [];

		this.map();
		this.collect();

		this.shift = 0;

		return this;
	};

	/**
	 * Map clones length
	 * to pattern
	 */
	Module.prototype.map = function() {
		pattern = [];

		for(var i in map) {
			pattern.push(-1-i, i);
		}
	};

	/**
	 * Collect clones
	 * with maped pattern
	 */
	Module.prototype.collect = function() {
		var item;

		for(var i in pattern) {
			item = Glide.slides.eq(pattern[i])
					.clone().addClass(Glide.options.classes.clone);

			this.items.push(item);
		}
	};


	/**
	 * Append cloned slides before
	 * and after real slides
	 */
	Module.prototype.append = function() {
		var item;

		for (var i in this.items) {
			item = this.items[i][Glide.size](Glide[Glide.size]);

			if (pattern[i] >= 0) item.appendTo(Glide.track);
			else item.prependTo(Glide.track);
		}
	};


	/**
	 * Remove cloned slides
	 */
	Module.prototype.remove = function() {
		for (var i in this.items) {
			this.items[i].remove();
		}

		return this;
	};


	/**
	 * Get width width of all the clones
	 */
	Module.prototype.getGrowth = function () {
		return Glide.width * this.items.length;
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
 * @return {Core}
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
 * @return {Events}
 */

var Events = function(Glide, Core) {

	var triggers = $('[data-glide-trigger]');

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

		$(window).on('resize.glide', this.throttle(function() {
			Core.Transition.jumping = true;
			Core.Run.pause();
			Glide.setup();
			Core.Build.init();
			Core.Run.make('=' + Glide.current, false);
			Core.Run.play();
			Core.Transition.jumping = false;
		}, Glide.options.throttle));

	};


	/**
	 * Triggers event
	 */
	Module.prototype.triggers = function() {

		if (triggers.length) {

			triggers
				.off('click.glide touchstart.glide')
				.on('click.glide touchstart.glide', function(event) {

					event.preventDefault();
					var targets = $(this).data('glide-trigger').split(" ");

					if (!Core.Events.disabled) {
						for (var el in targets) {
							var target = $(targets[el]).data('glide_api');
							target.pause();
							target.go($(this).data('glide-dir'));
							target.play();
						}
					}

				});

		}

	};


	/**
	 * Disable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.disable = function() {
		this.disabled = true;
		return this;
	};


	/**
	 * Enable all events
	 * @return {Glide.Events}
	 */
	Module.prototype.enable = function() {
		this.disabled = false;
		return this;
	};


	/**
	 * Detach anchors clicks
	 * inside slider track
	 */
	Module.prototype.detachClicks = function() {
		Glide.track.off('click', 'a');
		return this;
	};


	/**
	 * Prevent anchors clicks
	 * inside slider track
	 */
	Module.prototype.preventClicks = function(status) {
		Glide.track.one('click', 'a', function(event){ event.preventDefault(); });
		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.call = function (func) {
		if ( (func !== 'undefined') && (typeof func === 'function') )
			func(Glide.current, Glide.slides.eq(Glide.current - 1));
		return this;
	};


	/*
	 * Call function
	 * @param {Function} func
	 * @return {Glide.Events}
	 */
	Module.prototype.unbind = function() {

		Glide.track
			.off('keyup.glide')
			.off('mouseover.glide')
			.off('mouseout.glide');

		triggers
			.off('click.glide touchstart.glide');

		$(window)
			.off('keyup.glide')
			.off('resize.glide');

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
			previous = options.leading === false ? 0 : Core.Helper.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = Core.Helper.now();
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


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Height
 * --------------------------------
 * Height module
 * @return {Height}
 */

var Height = function(Glide, Core) {


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
	Module.prototype.get = function() {
		var offset = (Glide.axis === 'y') ? Glide.paddings * 2 : 0;
		return Glide.slides.eq(Glide.current - 1).height() + offset;
	};

	/**
	 * Set slider height
	 * @param {Boolean} force Force height setting even if option is turn off
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
 * @return {Helper}
 */

var Helper = function(Glide, Core) {


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


	/**
	 * Get time
	 * @source http://underscorejs.org/
	 */
	Module.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	/**
	 * Remove transition
	 */
	Module.prototype.removeStyles = function(elements) {

		for (var el in elements) {
			elements[el].removeAttr('style');
		}

	};


	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Glide Run
 * --------------------------------
 * Run logic module
 * @return {Run}
 */

var Run = function(Glide, Core) {


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
	 * Check if we are on first slide
	 * @return {boolean}
	 */
	Module.prototype.isStart = function() {
		return Glide.current === 1;
	};


	/**
	 * Check if we are on last slide
	 * @return {boolean}
	 */
	Module.prototype.isEnd = function() {
		return Glide.current === Glide.length;
	};

	/**
	 * Check if we are making offset run
	 * @return {boolean}
	 */
	Module.prototype.isOffset = function(direction) {
		return this.flag && this.direction === direction;
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
		if(callback !== false) {
			Core.Events.disable().call(Glide.options.beforeTransition);
		}

		// Based on direction
		switch(this.direction) {

			case '>':
				// When we at last slide and move forward and steps are number
				// Set flag and current slide to first
				if (this.isEnd()) Glide.current = 1, this.flag = true;
				// When steps is not number, but '>'
				// scroll slider to end
				else if (this.steps === '>') Glide.current = Glide.length;
				// Otherwise change normally
				else Glide.current = Glide.current + 1;
				break;

			case '<':
				// When we at first slide and move backward and steps are number
				// Set flag and current slide to last
				if(this.isStart()) Glide.current = Glide.length, this.flag = true;
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
		Core.Height.set();
		// Set active bullet
		Core.Bullets.active();

		// Run actual translate animation
		Core.Animation.make().after(function(){
			// Set active flags
			Core.Build.active();
			// Enable events and call callbacks
			if(callback !== false) {
				Core.Events.enable()
					.call(callback)
					.call(Glide.options.afterTransition);
			}
			// Start autoplay until hoverpause is not set
			if(!Glide.options.hoverpause) that.play();
		});

	};


	return new Module();

};
;/**
 * --------------------------------
 * Glide Touch
 * --------------------------------
 * Touch module
 * @return {Touch}
 */

var Touch = function(Glide, Core) {

	var touch;

	/**
	 * Touch Module Constructor
	 */
	function Module() {

		this.dragging = false;

		if (Glide.options.touchDistance) {
			Glide.track.on({ 'touchstart.glide': $.proxy(this.start, this) });
		}

		if (Glide.options.dragDistance) {
			Glide.track.on({ 'mousedown.glide': $.proxy(this.start, this) });
		}

	}


	/**
	 * Unbind touch events
	 */
	Module.prototype.unbind = function() {
		Glide.track
			.off('touchstart.glide mousedown.glide')
			.off('touchmove.glide mousemove.glide')
			.off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');
	};


	/**
	 * Start touch event
	 * @param  {Object} event
	 */
	Module.prototype.start = function(event) {

		// Escape if events disabled
		// or already dragging
		if (!Core.Events.disabled && !this.dragging) {

			// Cache event
			if (event.type === 'mousedown') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Turn off jumping flag
			Core.Transition.jumping = true;

			// Get touch start points
			this.touchStartX = parseInt(touch.pageX);
			this.touchStartY = parseInt(touch.pageY);
			this.touchSin = null;
			this.dragging = true;

			Glide.track.on({
				'touchmove.glide mousemove.glide': Core.Events.throttle($.proxy(this.move, this), Glide.options.throttle),
				'touchend.glide touchcancel.glide mouseup.glide mouseleave.glide': $.proxy(this.end, this)
			});

			// Detach clicks inside track
			Core.Events.detachClicks().call(Glide.options.swipeStart);
			// Pause if autoplay
			Core.Run.pause();

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
			var touchCathetus = Math.sqrt( this.byAxis(powEY, powEX) );

			// Calculate the sine of the angle
			this.touchSin = Math.asin( touchCathetus/touchHypotenuse );

			// Make offset animation
			Core.Animation.make( this.byAxis(subExSx, subEySy) );

			if (Core.Build.isMode('vertical')) {
				if (Core.Run.isStart() && subEySy > 0) return;
				if (Core.Run.isEnd() && subEySy < 0) return;
			}

			// While angle is lower than 45 degree
			if ( (this.touchSin * 180 / Math.PI) < 45 ) {
				// Prevent propagation
				event.stopPropagation();
				// Prevent scrolling
				event.preventDefault();
				// Add dragging class
				Glide.track.addClass(Glide.options.classes.dragging);
			// Else escape from event, we don't want move slider
			} else {
				return;
			}

			// Prevent clicks inside track
			Core.Events.preventClicks();

		}

	};


	/**
	 * Touch end event
	 * @todo Check edge cases for slider type
	 * @param  {Onject} event
	 */
	Module.prototype.end = function(event) {

		// Escape if events not disabled
		// or not dragging
		if (!Core.Events.disabled && this.dragging) {

			// Cache event
			if (event.type === 'mouseup' || event.type === 'mouseleave') touch = event.originalEvent;
			else touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];


			// Calculate touch distance
			var touchDistance = this.byAxis(
				(touch.pageX - this.touchStartX),
				(touch.pageY - this.touchStartY)
			);
			// Calculate degree
			var touchDeg = this.touchSin * 180 / Math.PI;

			// Turn off jumping flag
			Core.Transition.jumping = false;

			// If slider type is slider
			if (Core.Build.isType('slider')) {

				// Prevent slide to right on first item (prev)
				if (Core.Run.isStart()) {
					if ( touchDistance > 0 ) touchDistance = 0;
				}

				// Prevent slide to left on last item (next)
				if (Core.Run.isEnd()) {
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

			// Unset dragging flag
			this.dragging = false;
			// Disable other events
			Core.Events.disable().call(Glide.options.swipeEnd);
			// Remove dragging class
			// Unbind events
			Glide.track
				.removeClass(Glide.options.classes.dragging)
				.off('touchmove.glide mousemove.glide')
				.off('touchend.glide touchcancel.glide mouseup.glide mouseleave.glide');

		}

	};


	Module.prototype.byAxis = function(xValue, yValue) {
		if (Glide.axis === 'y') return yValue;
		else return	xValue;
	};


	// @return Module
	return new Module();

};
;/**
 * --------------------------------
 * Glide Transition
 * --------------------------------
 * Transition module
 * @return {Transition}
 */

var Transition = function(Glide, Core) {


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
;/**
 * --------------------------------
 * Glide Translate
 * --------------------------------
 * Translate module
 * @return {Translate}
 */

var Translate = function(Glide, Core) {

	// Translate axes map
	var axes = {
		x: 0,
		y: 0,
		z: 0
	};


	/**
	 * Translate Module Constructor
	 */
	function Module() {}


	/**
	 * Set translate
	 * @param  {string} axis
	 * @param  {int} value
	 * @return {string}
	 */
	Module.prototype.set = function(axis, value) {
		axes[axis] = parseInt(value);
		return 'translate3d(' + (-1 * axes.x) + 'px, ' + (-1 * axes.y) + 'px, ' + (-1 * axes.z) + 'px)';
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
		mode: 'horizontal',
		startAt: 1,
		hoverpause: true,
		keyboard: true,
		touchDistance: 80,
		dragDistance: 120,
		animationDuration: 400,
		animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		throttle: 16,
		autoheight: false,
		paddings: 0,
		centered: true,
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
			clone: 'clone',
			active: 'active',
			dragging: 'dragging',
			disabled: 'disabled'
		},
		beforeInit: function(slider) {},
		afterInit: function(i, el) {},
		beforeTransition: function(i, el) {},
		afterTransition: function(i, el) {},
		swipeStart: function(i, el) {},
		swipeEnd: function(i, el) {},
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
		Run: Run,
		Animation: Animation,
		Clones: Clones,
		Arrows: Arrows,
		Bullets: Bullets,
		Height: Height,
		Build: Build,
		Events: Events,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.current, this.slides.eq(this.current - 1));

	// api return
	return Engine.Api.instance();

};


/**
 * Collect DOM
 * and set classes
 */
Glide.prototype.collect = function() {
	var options = this.options;
	var classes = options.classes;

	this.slider = this.element.addClass(classes.base + '--' + options.type).addClass(classes.base + '--' + options.mode);
	this.track = this.slider.find('.' + classes.track);
	this.wrapper = this.slider.find('.' + classes.wrapper);
	this.slides = this.track.find('.' + classes.slide).not('.' + classes.clone);
};


/**
 * Setup properties and values
 */
Glide.prototype.setup = function() {
	var modeMap = {
		horizontal: ['width', 'x'],
		vertical: ['height', 'y'],
	};

	this.size = modeMap[this.options.mode][0];
	this.axis = modeMap[this.options.mode][1];
	this.length = this.slides.length;

	this.paddings = this.getPaddings();
	this[this.size] = this.getSize();
};


/**
 * Normalize paddings option value
 * Parsing string (%, px) and numbers
 * @return {Number} normalized value
 */
Glide.prototype.getPaddings = function() {

	var option = this.options.paddings;

	if(typeof option === 'string') {

		var normalized = parseInt(option, 10);
		var isPercentage = option.indexOf('%') >= 0;

		if (isPercentage) return parseInt(this.slider[this.size]() * (normalized/100));
		else return normalized;

	}

	return option;

};


/**
 * Get slider width updated by addtional options
 * @return {Number} width value
 */
Glide.prototype.getSize = function() {
	return this.slider[this.size]() - (this.paddings * 2);
};;/**
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