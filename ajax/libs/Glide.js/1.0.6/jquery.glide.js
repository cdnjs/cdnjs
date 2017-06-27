/*!
 * Glide.js
 * Version: 1.0.65
 * Simple, lightweight and fast jQuery slider
 * Author: @JedrzejChalubek
 * Site: http://jedrzejchalubek.com/
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {

	var name = 'glide',
		defaults = {

			// {Int or Bool} False for turning off autoplay
			autoplay: 4000,
			// {Bool} Pause autoplay on mouseover slider
			hoverpause: true,

			// {Bool} Circual play
			circular: true,

			// {Int} Animation time
			animationDuration: 500,
			// {String} Animation easing function
			animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',

			/**
			 * {Bool or String} Show/hide/appendTo arrows
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			arrows: true,
			// {String} Arrows wrapper class
			arrowsWrapperClass: 'slider__arrows',
			// {String} Main class for both arrows
			arrowMainClass: 'slider__arrows-item',
			// {String} Right arrow
			arrowRightClass: 'slider__arrows-item--right',
			// {String} Right arrow text
			arrowRightText: 'next',
			// {String} Left arrow
			arrowLeftClass: 'slider__arrows-item--left',
			// {String} Left arrow text
			arrowLeftText: 'prev',

			/**
			 * {Bool or String} Show/hide/appendTo bullets navigation
			 * True for append arrows to slider wrapper
			 * False for not appending arrows
			 * Id or class name (e.g. '.class-name') for appending to specific HTML markup
			 */
			navigation: true,
			// {Bool} Center bullet navigation
			navigationCenter: true,
			// {String} Navigation class
			navigationClass: 'slider__nav',
			// {String} Navigation item class
			navigationItemClass: 'slider__nav-item',
			// {String} Current navigation item class
			navigationCurrentItemClass: 'slider__nav-item--current',

			// {Bool} Slide on left/right keyboard arrows press
			keyboard: true,

			// {Int or Bool} Touch settings
			touchDistance: 60,

			// {Function} Callback before plugin init
			beforeInit: function() {},
			// {Function} Callback after plugin init
			afterInit: function() {},

			// {Function} Callback before slide change
			beforeTransition: function() {},
			// {Function} Callback after slide change
			afterTransition: function() {}

		};

	/**
	 * Slider Constructor
	 * @param {Object} parent
	 * @param {Object} options
	 */
	function Glide(parent, options) {

		// Cache this
		var self = this;

		// Extend options
		this.options = $.extend({}, defaults, options);
		// Current slide id
		this.currentSlide = 0;
		// If CSS3 Transition isn't supported switch cssSupport variable to false and use $.animate()
		this.cssSupport = ( !this.css.isSupported("transition") || !this.css.isSupported("transform") ) ? false : true;
		// If circular set offset, two cloned slides
		this.offset = (this.options.circular) ? 2 : 0;

		// Callbacks before plugin init
		this.options.beforeInit.call(this);

		// Sidebar
		this.parent = parent;
		// Initialize
		this.init();
		// Start autoplay
		this.play();

		// Callback after plugin init
		this.options.afterInit.call(this);

		/**
		 * API
		 * Returning slider methods
		 */
		return {

			/**
			 * Get current slide number
			 * @return {Int}
			 */
			current: function() {
				return -(self.currentSlide) + 1;
			},

			/**
			 * Reinit
			 * Rebuild and recalculate dimensions of slider elements
			 */
			reinit: function() {
				self.init();
			},

			/**
			 * Destroy
			 * Revert init modifications and freeze slides
			 */
			destroy: function(){
				self.destroy();
			},

			/**
			 * Start autoplay
			 */
			play: function() {
				self.play();
			},

			/**
			 * Stop autoplay
			 */
			pause: function() {
				self.pause();
			},

			/**
			 * Slide one forward
			 * @param  {Function} callback
			 */
			next: function(callback) {
				self.slide(1, false, callback);
			},

			/**
			 * Slide one backward
			 * @param  {Function} callback
			 */
			prev: function(callback) {
				self.slide(-1, false, callback);
			},

			/**
			 * Jump to specifed slide
			 * @param  {Int}   	  distance
			 * @param  {Function} callback
			 */
			jump: function(distance, callback) {
				self.slide(distance-1, true, callback);
			},

			/**
			 * Append navigation to specifet target
			 * @param  {Mixed} target
			 */
			nav: function(target) {

				/**
				 * If navigation wrapper already exist
				 * Remove it, protection before doubled navigation
				 */
				if (self.navigation.wrapper) self.navigation.wrapper.remove();

				// While target isn't specifed, use slider wrapper
				self.options.navigation = (target) ? target : self.options.navigation;
				// Build
				self.navigation();

			},

			/**
			 * Append arrows to specifet target
			 * @param  {Mixed} target
			 */
			arrows: function(target) {

				/**
				 * If arrows wrapper already exist
				 * Remove it, protection before doubled arrows
				 */
				if (self.arrows.wrapper) self.arrows.wrapper.remove();

				// While target isn't specifed, use slider wrapper
				self.options.arrows = (target) ? target : self.options.arrows;
				// Build
				self.arrows();

			}

		};

	}

	/**
	 * Building slider
	 */
	Glide.prototype.build = function() {

		/**
		 * Attatch bindings
		 */
		this.bindings();

		/**
		 * There is more than one slide
		 */
		if (this.slides.length > 1) {
			/**
			 * Circular
			 * If circular option is true
			 * Append left and right arrow
			 */
			if (this.options.circular) this.circular();

			/**
			 * Arrows
			 * If arrows option is true
			 * Append left and right arrow
			 */
			if (this.options.arrows) this.arrows();

			/**
			 * Navigation
			 * If navigation option is true
			 * Append navigation item for each slide
			 */
			if (this.options.navigation) this.navigation();
		}

		/**
		 * Attatch events
		 */
		this.events();

	};

	/**
	 * Build circular DOM elements
	 * Clone first and last slide
	 * Set wrapper width with addional slides
	 * Move slider wrapper to first slide
	 */
	Glide.prototype.circular = function() {

		/**
		 * Clone first and last slide
		 * and set width for each
		 */
		this.firstClone = this.slides.filter(':first-child').clone().width(this.slides.spread);
		this.lastClone = this.slides.filter(':last-child').clone().width(this.slides.spread);

		/**
		 * Append clodes slides to slider wrapper at the beginning and end
		 * Increase wrapper with with values of addional slides
		 * Clear translate and skip cloned last slide at the beginning
		 */
		this.wrapper.append(this.firstClone).prepend(this.lastClone).width( this.parent.width() * (this.slides.length+2) )
			.trigger('clearTransition')
				.trigger('setTranslate', [-this.slides.spread]);

	};

	/**
	 * Building navigation DOM
	 */
	Glide.prototype.navigation = function() {

		this.navigation.items = {};

		// Navigation wrapper
		this.navigation.wrapper = $('<div />', {
			'class': this.options.navigationClass
		}).appendTo(
			/**
			 * Setting append target
			 * If option is true set default target, that is slider wrapper
			 * Else get target set in options
			 * @type {Bool or String}
			 */
			(this.options.navigation === true) ? this.parent : this.options.navigation
		);

		for (var i = 0; i < this.slides.length; i++) {
			this.navigation.items[i] = $('<a />', {
				'href': '#',
				'class': this.options.navigationItemClass,
				// Direction and distance -> Item index forward
				'data-distance': i
			}).appendTo(this.navigation.wrapper);
		}

		// Add navCurrentItemClass to the first navigation item
		this.navigation.items[0].addClass(this.options.navigationCurrentItemClass);

		// If centered option is true
		if (this.options.navigationCenter) {
			// Center bullet navigation
			this.navigation.wrapper.css({
				'left': '50%',
				'width': this.navigation.wrapper.children().outerWidth(true) * this.navigation.wrapper.children().length,
				'margin-left': -(this.navigation.wrapper.outerWidth(true)/2)
			});
		}

	};

		/**
	 * Building arrows DOM
	 */
	Glide.prototype.arrows = function() {

		/**
		 * Arrows wrapper
		 * @type {Obejct}
		 */
		this.arrows.wrapper = $('<div />', {
			'class': this.options.arrowsWrapperClass
		}).appendTo(
			/**
			 * Setting append target
			 * If option is true set default target, that is slider wrapper
			 * Else get target set in options
			 * @type {Bool or String}
			 */
			(this.options.arrows === true) ? this.parent : this.options.arrows
		);

		/**
		 * Right arrow
		 * @type {Obejct}
		 */
		this.arrows.right = $('<a />', {
			'href': '#',
			'class': this.options.arrowMainClass + ' ' + this.options.arrowRightClass,
			// Direction and distance -> One forward
			'data-distance': '1',
			'html': this.options.arrowRightText
		}).appendTo(this.arrows.wrapper);

		/**
		 * Left arrow
		 * @type {Object}
		 */
		this.arrows.left = $('<a />', {
			'href': '#',
			'class': this.options.arrowMainClass + ' ' + this.options.arrowLeftClass,
			// Direction and distance -> One backward
			'data-distance': '-1',
			'html': this.options.arrowLeftText
		}).appendTo(this.arrows.wrapper);

	};

	/**
	 * Function bindings
	 */
	Glide.prototype.bindings = function() {

		var self = this,
			o = this.options,
			prefix = this.css.getPrefix();

		/**
		 * Setup slider wrapper bindings
		 * for translate and transition control
		 */
		this.wrapper.bind({

			/**
			 * Set transition
			 */
			'setTransition': function() {
				$(this).css( prefix + 'transition', prefix + 'transform ' + o.animationDuration + 'ms ' + o.animationTimingFunc);
			},

			/**
			 * Clear transition
			 * for immediate jump effect
			 */
			'clearTransition': function() {
				$(this).css( prefix + 'transition', 'none');
			},

			/**
			 * Set translate value
			 * @param  {Object} event
			 * @param  {Ind} translate
			 */
			'setTranslate': function(event, translate) {
				// if css3 suported set translate3d
				if (self.cssSupport) $(this).css( prefix + 'transform', 'translate3d(' + translate + 'px, 0px, 0px)');
				// if not set left margin
				else $(this).css('margin-left', translate);
			}

		});

	};

	/**
	 * Events controllers
	 */
	Glide.prototype.events = function() {

		/**
		 * Swipe
		 * If swipe option is true
		 * Attach touch events
		 */
		if (this.options.touchDistance) {
			this.parent.on({
				'touchstart MSPointerDown': $.proxy(this.events.touchstart, this),
				'touchmove MSPointerMove': $.proxy(this.events.touchmove, this),
				'touchend MSPointerUp': $.proxy(this.events.touchend, this)
			});
		}

		/**
		 * Arrows
		 * If arrows exists
		 * Attach click event
		 */
		if (this.arrows.wrapper) {
			$(this.arrows.wrapper).children().on('click touchstart',
				$.proxy(this.events.arrows, this)
			);
		}

		/**
		 * Navigation
		 * If navigation exists
		 * Attach click event
		 */
		if (this.navigation.wrapper) {
			$(this.navigation.wrapper).children().on('click touchstart',
				$.proxy(this.events.navigation, this)
			);
		}

		/**
		 * Keyboard
		 * If keyboard option is true
		 * Attach press event
		 */
		if (this.options.keyboard) {
			$(document).on('keyup.glideKeyup',
				$.proxy(this.events.keyboard, this)
			);
		}

		/**
		 * Slider hover
		 * If hover option is true
		 * Attach hover event
		 */
		if (this.options.hoverpause) {
			this.parent.on('mouseover mouseout',
				$.proxy(this.events.hover, this)
			);
		}

		/**
		 * Slider resize
		 * On window resize
		 * Attach resize event
		 */
		$(window).on('resize',
			$.proxy(this.events.resize, this)
		);

	};

	/**
	 * Navigation event controller
	 * On click in navigation item get distance
	 * Then slide specified distance with jump
	 */
	Glide.prototype.events.navigation = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Prevent default behaviour
			event.preventDefault();
			// Slide distance specified in data attribute
			this.slide( $(event.currentTarget).data('distance'), true );
		}

	};

	/**
	 * Arrows event controller
	 * On click in arrows get direction and distance
	 * Then slide specified distance without jump
	 * @param  {Obejct} event
	 */
	Glide.prototype.events.arrows = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Prevent default behaviour
			event.preventDefault();
			// Slide distance specified in data attribute
			this.slide( $(event.currentTarget).data('distance'), false );
		}

	};

	/**
	 * Keyboard arrows event controller
	 * Keyboard left and right arrow keys press
	 */
	Glide.prototype.events.keyboard = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Next
			if (event.keyCode === 39) this.slide(1);
			// Prev
			if (event.keyCode === 37) this.slide(-1);
		}

	};

	/**
	 * When mouse is over slider, pause autoplay
	 * On out, start autoplay again
	 */
	Glide.prototype.events.hover = function(event) {

		// Pasue autoplay
		this.pause();

		// When mouse left slider or touch end, start autoplay anew
		if (event.type === 'mouseout') this.play();

	};

	/**
	 * When resize browser window
	 * Reinit plugin for new slider dimensions
	 * Correct crop to current slide
	 */
	Glide.prototype.events.resize = function(event) {

		// Reinit plugin (set new slider dimensions)
		this.dimensions();
		// Crop to current slide
		this.slide(0);

	};

	/**
	 * Disable events thats controls slide changes
	 */
	Glide.prototype.disableEvents = function() {
		this.wrapper.attr( "disabled", true );
	};

	/**
	 * Enable events thats controls slide changes
	 */
	Glide.prototype.enableEvents = function() {
		this.wrapper.attr( "disabled", false );
	};

	/**
	* Touch start
	* @param  {Object} e event
	*/
	Glide.prototype.events.touchstart = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Get touch start points
			this.events.touchStartX = touch.pageX;
			this.events.touchStartY = touch.pageY;
			this.events.touchSin = null;
		}

	};

	/**
	* Touch move
	* From swipe length segments calculate swipe angle
	* @param  {Obejct} e event
	*/
	Glide.prototype.events.touchmove = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate start, end points
			var subExSx = touch.pageX - this.events.touchStartX;
			var subEySy = touch.pageY - this.events.touchStartY;
			// Bitwise subExSx pow
			var powEX = Math.abs( subExSx << 2 );
			// Bitwise subEySy pow
			var powEY = Math.abs( subEySy << 2 );
			// Calculate the length of the hypotenuse segment
			var touchHypotenuse = Math.sqrt( powEX + powEY );
			// Calculate the length of the cathetus segment
			var touchCathetus = Math.sqrt( powEY );

			// Calculate the sine of the angle
			this.events.touchSin = Math.asin( touchCathetus/touchHypotenuse );

			if ( (this.events.touchSin * (180 / Math.PI)) < 45 ) event.preventDefault();
		}

	};

	/**
	* Touch end
	* @param  {Object} e event
	*/
	Glide.prototype.events.touchend = function(event) {

		if ( !this.wrapper.attr('disabled') ) {
			// Cache event
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

			// Calculate touch distance
			var touchDistance = touch.pageX - this.events.touchStartX;

			// While touch is positive and greater than distance set in options
			if ( (touchDistance > this.options.touchDistance) && ( (this.events.touchSin * (180 / Math.PI)) < 45) ) {
				// Slide one backward
				this.slide(-1);
			// While touch is negative and lower than negative distance set in options
			} else if (
				(touchDistance < -this.options.touchDistance) && ( (this.events.touchSin * (180 / Math.PI)) < 45) ) {
				// Slide one forward
				this.slide(1);
			}
		}

	};

	/**
	 * Slides change & animate logic
	 * @param  {int} distance
	 * @param  {bool} jump
	 * @param  {function} callback
	 */
	Glide.prototype.slide = function(distance, jump, callback) {

		// If there is one slide, escape
		if (this.slides.length <= 1) {
			return false;
		}

		/**
		 * Stop autoplay
		 * Clearing timer
		 */
		this.pause();

		// Callbacks before slide change
		this.options.beforeTransition.call(this);

		// Setup variables
		var	self = this,
			currentSlide = (jump) ? 0 : this.currentSlide,
			slidesLength = -(this.slides.length-1),
			fromFirst = false,
			fromLast = false;

		/**
		 * Check if current slide is first and direction is previous, then go to last slide
		 * or current slide is last and direction is next, then go to the first slide
		 * else change current slide normally
		 */
		if ( currentSlide === 0 && distance === -1 ) {
			fromFirst = true;
			currentSlide = slidesLength;
		} else if ( currentSlide === slidesLength && distance === 1 ) {
			fromLast = true;
			currentSlide = 0;
		} else {
			currentSlide = currentSlide + (-distance);
		}

		/**
		 * Crop to current slide.
		 * Mul slide width by current slide number.
		 */
		var offset = this.slides.spread * currentSlide;

		/**
		 * While circular decrease offset with the width of single slide
		 * When fromFirst and fromLast flags are set, unbind events thats controls changing
		 * When fromLast flags is set, set offset to slide width mulled by slides count without cloned slides
		 * When fromFirst flags is set, set offset to zero
		 */
		if (this.options.circular) {
			offset = offset - this.slides.spread;
			if (fromLast || fromFirst) this.disableEvents();
			if (fromLast) offset = this.slides.spread * (slidesLength - 2);
			if (fromFirst) offset = 0;
		}

		/**
		 * Slide change animation
		 * While CSS3 is supported use offset
		 * if not, use $.animate();
		 */
		if (this.cssSupport) this.wrapper.trigger('setTransition').trigger('setTranslate', [offset]);
		else this.wrapper.stop().animate({ 'margin-left': offset }, this.options.animationDuration);

		/**
		 * While circular
		 */
		if (this.options.circular) {

			/**
			 * 	When fromFirst and fromLast flags are set
			 * 	after animation clear transition and bind events that control slides changing
			 */
			if (fromFirst || fromLast) {
				this.afterAnimation(function(){
					self.wrapper.trigger('clearTransition');
					self.enableEvents();
				});
			}

			/**
			 * When fromLast flag is set
			 * after animation make immediate jump from cloned slide to proper one
			 */
			if (fromLast) {
				this.afterAnimation(function(){
					fromLast = false;
					self.wrapper.trigger('setTranslate', [-self.slides.spread]);
				});
			}

			/**
			 * When fromFirst flag is set
			 * after animation make immediate jump from cloned slide to proper one
			 */
			if (fromFirst) {
				this.afterAnimation(function(){
					fromFirst = false;
					self.wrapper.trigger('setTranslate', [self.slides.spread * (slidesLength-1)]);
				});
			}

		}

		// Set to navigation item current class
		if (this.options.navigation && this.navigation.wrapper) {
			$('.' + this.options.navigationClass, (this.options.navigation === true) ? this.parent : this.options.navigation).children()
				.eq(-currentSlide)
					.addClass(this.options.navigationCurrentItemClass)
						.siblings()
							.removeClass(this.options.navigationCurrentItemClass);
		}

		// Update current slide globaly
		this.currentSlide = currentSlide;

		// Callbacks after slide change
		this.afterAnimation(function(){
			self.options.afterTransition.call(self);
			if ( (callback !== 'undefined') && (typeof callback === 'function') ) callback();
		});

		/**
		 * Start autoplay
		 * Setting up timer
		 */
		this.play();

	};

	/**
	 * Autoplay logic
	 * Setup counting
	 */
	Glide.prototype.play = function() {

		// Cache this
		var self = this;

		/**
		 * If autoplay turn on
		 * Slide one forward after a set time
		 */
		if (this.options.autoplay) {
			this.auto = setInterval(function() {
				self.slide(1, false);
			}, this.options.autoplay);
		}

	};

	/**
	 * Autoplay pause
	 * Clear counting
	 */
	Glide.prototype.pause = function() {

		/**
		 * If autoplay turn on
		 * Clear interial
		 */
		if (this.options.autoplay) this.auto = clearInterval(this.auto);

	};

	/**
	 * Call callback after animation duration
	 * Added 10 ms to duration to be sure is fired after animation
	 * @param  {Function} callback
	 */
	Glide.prototype.afterAnimation = function(callback) {

		setTimeout(function(){
			callback();
		}, this.options.animationDuration + 10);

	};

	/**
	 * Dimensions
	 * Get & set dimensions of slider elements
	 */
	Glide.prototype.dimensions = function() {

		// Get slide width
		this.slides.spread = this.parent.width();
		// Set wrapper width
		this.wrapper.width(this.slides.spread * (this.slides.length + this.offset));
		// Set slide width
		this.slides.add(this.firstClone).add(this.lastClone).width(this.slides.spread);

	};

	/**
	 * Destroy
	 * Revert init modifications and freeze slides
	 */
	Glide.prototype.destroy = function() {

		this.parent.unbind();
		this.wrapper.unbind();
		this.wrapper.removeAttr("style");
		$(this.navigation.wrapper).children().unbind();
		$(this.arrows.wrapper).children().unbind();
		this.slide(0, true);
		this.pause();

		if(this.options.circular) {
			this.firstClone.remove();
			this.lastClone.remove();
		}

	};

	/**
	 * Initialize
	 * Set wrapper
	 * Set slides
	 * Set animation type
	 */
	Glide.prototype.init = function() {

		// Set slides wrapper
		this.wrapper = this.parent.children();
		// Set slides
		this.slides = this.wrapper.children();
		// Set slider dimentions
		this.dimensions();

		// Build DOM
		this.build();

	};

	/**
	 * Methods for css3 management
	 */
	Glide.prototype.css = {

		/**
		 * Check css3 support
		 * @param  {String}  Declaration name to check
		 * @return {Boolean}
		 */
		isSupported: function(declaration) {

			var isSupported = false,
				prefixes = 'Khtml ms O Moz Webkit'.split(' '),
				clone = document.createElement('div'),
				declarationCapital = null;

			declaration = declaration.toLowerCase();
			if (clone.style[declaration] !== undefined) isSupported = true;
			if (isSupported === false) {
				declarationCapital = declaration.charAt(0).toUpperCase() + declaration.substr(1);
				for( var i = 0; i < prefixes.length; i++ ) {
					if( clone.style[prefixes[i] + declarationCapital ] !== undefined ) {
						isSupported = true;
						break;
					}
				}
			}

			if (window.opera) {
				if (window.opera.version() < 13) isSupported = false;
			}

			if (isSupported === 'undefined' || isSupported === undefined) isSupported = false;

			return isSupported;

		},

		/**
		 * Get browser css prefix
		 * @return {String} 	Returns prefix in "-{prefix}-" format
		 */
		getPrefix: function () {

			if (!window.getComputedStyle) return '';

			var styles = window.getComputedStyle(document.documentElement, '');
			return '-' + (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1] + '-';

		}

	};

	$.fn[name] = function(options) {

		return this.each(function () {
			if ( !$.data(this, 'api_' + name) ) {
				$.data(this, 'api_' + name,
					new Glide($(this), options)
				);
			}
		});

	};

})(jQuery, window, document);
