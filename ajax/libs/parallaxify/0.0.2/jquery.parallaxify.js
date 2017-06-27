/*!
 * Parallaxify.js v0.0.2
 * http://hwthorn.github.io/parallaxify
 *
 * Copyright 2013, Felix Pflaum
 * Released under the MIT license
 * http://hwthorn.mit-license.org
 *
 * Based on stellar.js by Mark Dalgleish
 * http://markdalgleish.com/projects/stellar.js
 */

 ;(function($, window, document, undefined) {

	var pluginName = 'parallaxify',
		maxFPS = 30,
		defaults = {
			positionProperty: 'position',
			horizontalParallax: true,
			verticalParallax: true,
			parallaxBackgrounds: true,
			parallaxElements: true,
			responsive: false,
			useMouseMove: true,
			useGyroscope: true,
			alphaFilter: 0.9,			// use Low Pass Filter to smooth sensor readings (1 = no filter)
			motionType: 'natural',
			mouseMotionType: 'gaussian',
			inputPriority: 'mouse',		// define which input device has priority over the other 'mouse' or 'gyroscope'
			motionAngleX: 80,			// (0 < motionAngle < 90) delta angle that is used to render max parallax in this direction
			motionAngleY: 80,
			adjustBasePosition: true,	// using Low Pass Filter to adjust base position
			alphaPosition: 0.05			// alpha for Low Pass Filter used to adjust average position
		},

		// Options for positioning of elements
		// e.g. using css positioning with top and left
		// or using css transforms
		positionProperty = {
			position: {
				setLeft: function($element, left) { $element.css('left', left); },
				setTop: function($element, top) { $element.css('top', top); }
			},
			transform: {
				setPosition: function($element, left, originalLeft, top, originalTop) {
					$element[0].style[prefixedTransform] = 'translate3d(' + (left - originalLeft) + 'px, ' + (top - originalTop) + 'px, 0)';
				}
			}
		},

		// approximation of Gaussian cumulative distribution function with parameter a to influence standard deviation sigma
		gCDFApprox = function(x, a) {
			return 1 / (1 + Math.exp(-(0.07056*a*(x^3))-(1.5976*a*x)));
		},

		// low pass filter for motion events (http://en.wikipedia.org/wiki/Low-pass_filter)
		lowPassFilter = function(curSignal, prevSignal, alpha) {
			if (prevSignal === null) return curSignal;
			if (typeof alpha === "undefined") alpha = 0.5;
			return (alpha * curSignal) + ((1 - alpha) * prevSignal);
		},

		// cached variable to speed up motionTypes
		factorCache = [],

		// Options for calculating the parallax effect
		// naturally a tangent is used, alternatively a Gaussian cumulative distribution function can be used
		motionType = {
			linear: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				return -delta/deltaMax;
			},
			natural: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				if (factorCache['n'+deltaMax] === undefined) factorCache['n'+deltaMax] = Math.tan(deltaMax*0.01745);
				return -Math.tan(delta*0.01745) / factorCache['n'+deltaMax];
			},
			performance: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				if (factorCache['p'+deltaMax] === undefined) factorCache['p'+deltaMax] = (deltaMax/90) + (4.2*Math.pow(deltaMax/90,7));
				return -((delta/90) + (4.2*Math.pow(delta/90,7))) / factorCache['p'+deltaMax];
			},
			gaussian: function(delta, deltaMax) {
				return 1 - 2 * gCDFApprox(delta/90, 135/deltaMax);
			}
		},

		// Returns a function which adds a vendor prefix to any CSS property name
		vendorPrefix = (function() {
			var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
				style = $('script')[0].style,
				prefix = '',
				prop;

			for (prop in style) {
				if (prefixes.test(prop)) {
					prefix = prop.match(prefixes)[0];
					break;
				}
			}

			if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
			if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

			return function(property) {
				return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
			};
		}()),

		prefixedTransform = vendorPrefix('transform'),

		supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined,

		setBackgroundPosition = (supportsBackgroundPositionXY ?
			function($element, x, y) {
				$element.css({
					'background-position-x': x,
					'background-position-y': y
				});
			} :
			function($element, x, y) {
				$element.css('background-position', x + ' ' + y);
			}
		),

		getBackgroundPosition = (supportsBackgroundPositionXY ?
			function($element) {
				return [
					$element.css('background-position-x'),
					$element.css('background-position-y')
				];
			} :
			function($element) {
				return $element.css('background-position').split(' ');
			}
		),

		// using requestAnimationFrame to limit execution to
		// the animation frames and reduce browser load
		// fallback to 60x per second
		requestAnimationFrame = (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				setTimeout(callback, 1000 / maxFPS);
			}
		);

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);
			this.tilt = {
				beta : 0,
				gamma : 0
			};

			this._defineElements();
			this._defineGetters();
			this._defineSetters();
			this._detectMotionType();
			this._detectViewport();
			this._handleWindowLoadAndResize();

			this.refresh({ firstLoad: true });

			this._startAnimation();
		},
		_defineElements: function() {
			this.$element = ( this.element === document.body || this.element === window ? $('body') : $(this.element) );
			this.$viewportElement = $(window);
		},
		_defineGetters: function() {

		// define getters
		// sensor data and mouse move
		// return value is between -1 and +1

			var self = this,
				motionTypeAdapter = motionType[self.options.motionType],
				mouseMoveAdapter = motionType[self.options.mouseMotionType];

			this._getMoveHorizontal = function() {
				
				if (this.useMouseMove && this.clientX !== null && this.clientX !== this.oldClientX ) {
					return mouseMoveAdapter( this.options.motionAngleX * (1 - (2*this.clientX/this.viewportWidth)), this.options.motionAngleX);
				}
				
				if (this.useSensor && this.beta !== null && this.gamma !== null) {
				// output = 2*gCDFApprox(tilt/180, 0.75*90/(0.5*this.options.motionAngle))-1;
				// -180 < tilt < 180 => multiply beta x 2

					// tilt.gamma and tilt.beta
					var tilt = this.tilt;

					if (this.viewportLandscape) {
						if (this.viewportFlipped) {
						// landscape flipped
							return motionTypeAdapter(-tilt.beta, this.options.motionAngleX);
						} else {
						// landscape regular
							return motionTypeAdapter(tilt.beta, this.options.motionAngleX);
						}
					} else {
						if (this.viewportFlipped) {
						// portrait flipped
							return motionTypeAdapter(-tilt.gamma, this.options.motionAngleX);
						} else {
						// portrait regular
							return motionTypeAdapter(tilt.gamma, this.options.motionAngleX);
						}
					}
				} else {
					this.useSensor = false;
				}
				
				return mouseMoveAdapter( this.options.motionAngleX * (1 - (2*this.oldClientX/this.viewportWidth)), this.options.motionAngleX);
			};

			this._getMoveVertical = function() {
				
				if (this.options.useMouseMove && this.clientY !== null && this.clientY !== this.oldClientY ) {
					return mouseMoveAdapter( this.options.motionAngleY * (1 - (2*this.clientY/this.viewportHeight)), this.options.motionAngleY);
				}
				
				if (this.useSensor && this.beta !== null && this.gamma !== null) {

					// tilt.gamma and tilt.beta
					var tilt = this.tilt;

					if (this.viewportLandscape) {
						if (this.viewportFlipped) {
						// landscape flipped
							return motionTypeAdapter(-tilt.gamma, this.options.motionAngleY);
						} else {
						// landscape regular
							return motionTypeAdapter(tilt.gamma, this.options.motionAngleY);
						}
					} else {
						if (this.viewportFlipped) {
						// portrait flipped
							return motionTypeAdapter(-tilt.beta, this.options.motionAngleY);
						} else {
						// portrait regular
							return motionTypeAdapter(tilt.beta, this.options.motionAngleY);
						}
					}
				} else {
					this.useSensor = false;
				}
				
				return mouseMoveAdapter( this.options.motionAngleY * (1 - (2*this.oldClientY/this.viewportHeight)), this.options.motionAngleY);
			};

		},
		_defineSetters: function() {
		
		// define setters
		// set position of elements

			var self = this,
				positionPropertyAdapter = positionProperty[self.options.positionProperty];

			// use .setPosition or if not available use .setLeft and .setTop
			this._setPosition = positionPropertyAdapter.setPosition ||
				function($element, left, originalLeft, top, originalTop) {
					if (self.options.horizontalParallax) {
						positionPropertyAdapter.setLeft($element, left, originalLeft);
					}
					if (self.options.verticalParallax) {
						positionPropertyAdapter.setTop($element, top, originalTop);
					}
				};
				
		},
		refresh: function(options) {
			if (!options || !options.firstLoad) {
				this._reset();
			}
			this._findElements();
			this._findBackgrounds();
			// Fix for WebKit background rendering bug
			if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
				$(window).load(function() {
					var $el = $('body');
						oldLeft = $el.scrollLeft();
						oldTop = $el.scrollTop();

					$el.scrollLeft(oldLeft + 1);
					$el.scrollTop(oldTop + 1);

					$el.scrollLeft(oldLeft);
					$el.scrollTop(oldTop);
				});
			}
		},
		_detectViewport: function() {
			this.viewportWidth = this.$viewportElement.width();
			this.viewportHeight = this.$viewportElement.height();
			if (this.useSensor) {
				this.viewportFlipped = (window.orientation === 180);
				this.viewportLandscape = (Math.abs(window.orientation) === 90);
			}
		},
		_detectMotionType: function() {
			this.useSensor = false;
			this.useSensorWebkit = false;
			this.useSensorMoz = false;
			this.useMouseMove = false;

			if (this.options.useGyroscope) {
				// Webkit uses deviceorientation (DeviceOrientationEvent)
				this.useSensorWebkit = window.DeviceOrientationEvent !== undefined;
				// Mozilla uses MozOrientation (OrientationEvent)
				this.useSensorMoz = window.OrientationEvent !== undefined;
				this.useSensor = this.useSensorWebkit || this.useSensorMoz;
			}
			if (this.options.useMouseMove) {
				this.useMouseMove = this.$viewportElement.mousemove !== undefined;
			}
			if (this.useMouseMove && this.options.inputPriority === 'mouse') {
				this.useSensor = this.useSensorMoz = this.useSensorWebkit = false;
			} else if (this.useGyroscope && this.options.inputPriority === 'gyroscope') {
				this.useMouseMove = false;
			}
		},
		_findElements: function() {
			var self = this;

			if (this.elements !== undefined) {
				for (var i = this.elements.length - 1; i >= 0; i--) {
					this.elements[i].$element.data('parallaxify-ElementIsActive', undefined);
				}
			}

			this.elements = [];

			if(!this.options.parallaxElements) return;

			this.$element.find('[data-parallaxify-range],[data-parallaxify-range-x],[data-parallaxify-range-y]').each(function(i) {
				var $this = $(this);
				
				if (!$this.data('parallaxify-ElementIsActive')) {
					$this.data('parallaxify-ElementIsActive', this);
				} else if ($this.data('parallaxify-ElementIsActive') !== this) {
					return; // stop, because already set previously
				}

				// saving/restoring original positions
				if (!$this.data('parralaxify-originalLeft')) {
					$this.data('parallaxify-originalLeft', $this.css('left'));
					$this.data('parallaxify-originalTop', $this.css('top'));
				} else {
					$this.css('left', $this.data('parallaxify-originalLeft'));
					$this.css('top', $this.data('parallaxify-originalTop'));
				}

				// adding objects to element collection
				self.elements.push({
					$element: $this,
					originalPositionLeft: $this.position().left,
					originalPositionTop: $this.position().top,
					parallaxDistanceX: ($this.data('parallaxify-range-x') !== undefined ? $this.data('parallaxify-range-x') : ($this.data('parallaxify-range') !== undefined ? $this.data('parallaxify-range') : 0)),
					parallaxDistanceY: ($this.data('parallaxify-range-y') !== undefined ? $this.data('parallaxify-range-y') : ($this.data('parallaxify-range') !== undefined ? $this.data('parallaxify-range') : 0)),
					width: $this.outerWidth(true),
					height: $this.outerHeight(true)
				});
			});
		},
		_findBackgrounds: function() {
			var self = this,
				$backgroundElements;

			this.backgrounds = [];

			if(!this.options.parallaxBackgrounds) return;

			$backgroundElements = this.$element.find('[data-parallaxify-background-range],[data-parallaxify-background-range-x],[data-parallaxify-background-range-y]');

			if (this.$element.data('parallaxify-background-range') || this.$element.data('parallaxify-background-range-x') || this.$element.data('parallaxify-background-range-y')) {
				$backgroundElements = $backgroundElements.add(this.$element);
			}

			$backgroundElements.each(function() {
				var $this = $(this),
					backgroundPosition = getBackgroundPosition($this);

				if (!$this.data('parallaxify-backgroundIsActive')) {
					$this.data('parallaxify-backgroundIsActive', this);
				} else if ($this.data('parallaxify-backgroundIsActive') !== this) {
					return; // stop, because already set previously
				}

				// saving/restoring original background positions
				if (!$this.data('parralaxify-backgroundOriginalLeft')) {
					$this.data('parallaxify-backgroundOriginalLeft', backgroundPosition[0]);
					$this.data('parallaxify-backgroundOriginalTop', backgroundPosition[1]);
				} else {
					setBackgroundPosition($this, $this.data('parallaxify-backgroundOriginalLeft'), $this.data('parallaxify-backgroundOriginalTop'));
				}

				self.backgrounds.push({
					$element: $this,
					originalValueLeft: backgroundPosition[0],
					originalValueTop: backgroundPosition[1],
					originalBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10)),
					originalBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10)),
					originalPositionLeft: $this.position().left,
					originalPositionTop: $this.position().top,
					parallaxDistanceX: ($this.data('parallaxify-background-range-x') !== undefined ? $this.data('parallaxify-background-range-x') : ($this.data('parallaxify-background-range') !== undefined ? $this.data('parallaxify-background-range') : 0)),
					parallaxDistanceY: ($this.data('parallaxify-background-range-y') !== undefined ? $this.data('parallaxify-background-range-y') : ($this.data('parallaxify-background-range') !== undefined ? $this.data('parallaxify-background-range') : 0))
				});
			});
		},
		_reset: function() {
			var element,
				originalPositionLeft,
				originalPositionTop,
				background,
				i;

			for (i = this.elements.length - 1; i >= 0; i--) {
				element = this.elements[i];
				originalPositionLeft = element.$element.data('parallaxify-originalLeft');
				originalPositionTop = element.$element.data('parallaxify-originalTop');

				this._setPosition(element.$element, originalPositionLeft, originalPositionLeft, originalPositionTop, originalPositionTop);

				element.$element.data('parallaxify-originalLeft', null).data('parallaxify-originalLeft', null).data('parallaxify-elementIsActive', null).data('parallaxify-backgroundIsActive', null);
			}

			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				background.$element.data('parallaxify-backgroundOriginalLeft', null).data('parallaxify-backgroundOriginalTop', null).data('parallaxify-backgroundIsActive', null);

				setBackgroundPosition(background.$element, background.originalValueLeft, background.originalValueTop);
			}
		},
		destroy: function() {
			this._reset();

			if (this.useMouseMove) this.$viewportElement.unbind('mousemove.' + this.name);
			if (this.useSensorWebkit) window.removeEventListener('deviceorientation', this._handleSensorWebkit, false);
			if (this.useSensorMoz) window.removeEventListener('MozOrientation', this._handleSensorMoz, false);

			$(window).unbind('load.' + this.name).unbind('resize.' + this.name).unbind('orientationchange.' + this.name);
		},
		_processSensorData: function() {

			if (!this.useSensor) return;

			// beta is device pitch (moving up - down)
			// values are from -90 to 90
			// gamma is device roll (moving left right)
			// values are from -180 to 180

			var beta = this.beta,
				gamma = this.gamma,
				deltaBeta = 0,
				deltaGamma = 0;

			// counteract some bugs on Android where return values are 270 upon flipping the device
			if (beta > 90) beta = beta - 180;
			if (gamma > 180) gamma = gamma - 360;
				
			if (this.initialBeta === undefined && beta !== null) {
				this.initialBeta = beta;
			}

			if (this.initialGamma === undefined && gamma !== null) {
				this.initialGamma = gamma;
			}

			if (this.options.adjustBasePosition && this.initialGamma !== undefined && this.initialBeta !== undefined) {
			
				// adjust positions (accepting position out of range to smooth laying device upside down)
				if (gamma - this.initialGamma < -180) {
					this.initialGamma = lowPassFilter(gamma + 360, this.initialGamma, this.options.alphaPosition);
				} else if (gamma - this.initialGamma > 180) {
					this.initialGamma = lowPassFilter(gamma - 360, this.initialGamma, this.options.alphaPosition);
				} else {
					this.initialGamma = lowPassFilter(gamma, this.initialGamma, this.options.alphaPosition);
				}
				
				if (beta - this.initialBeta < -90) {
					this.initialBeta = lowPassFilter(beta + 180, this.initialBeta, this.options.alphaPosition);
				} else if (beta - this.initialBeta > 90) {
					this.initialBeta = lowPassFilter(beta - 180, this.initialBeta, this.options.alphaPosition);
				} else {
					this.initialBeta = lowPassFilter(beta, this.initialBeta, this.options.alphaPosition);
				}

			}
			
			deltaBeta = (this.initialBeta !== undefined ? beta - this.initialBeta : beta);
			deltaGamma = (this.initialGamma !== undefined ? gamma - this.initialGamma : gamma);
			
			if (deltaBeta > 100) {
				deltaBeta = deltaBeta - 180;
			} else if (deltaBeta < -100) {
				deltaBeta = deltaBeta + 180;
			}

			if (deltaGamma > 200) {
				deltaGamma = deltaGamma - 360;
			} else if (deltaGamma < -200) {
				deltaGamma = deltaGamma + 360;
			}
			
			// use low pass filter on signal
			deltaBeta = lowPassFilter(deltaBeta, this.tilt.beta, this.options.alphaFilter);
			deltaGamma = lowPassFilter(deltaGamma, this.tilt.gamma, this.options.alphaFilter);

			this.tilt.beta = deltaBeta;
			this.tilt.gamma = deltaGamma;

		},
		_repositionElements: function() {
			var moveHorizontal = this._getMoveHorizontal(),
				moveVertical = this._getMoveVertical(),
				element,
				background,
				bgLeft,
				bgTop,
				newPositionLeft,
				newPositionTop,
				i;

			if (this.currentMoveHorizontal === moveHorizontal && this.currentMoveVertical === moveVertical && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
				return;
			} else {
				this.currentMoveHorizontal = moveHorizontal;
				this.currentMoveVertical = moveVertical;
				this.currentWidth = this.viewportWidth;
				this.currentHeight = this.viewportHeight;
			}

			// Reposition elements
			for (i = this.elements.length - 1; i >= 0; i--) {
				element = this.elements[i];

				// New positions
				if (this.options.horizontalParallax) {
					newPositionLeft = Math.floor(moveHorizontal * element.parallaxDistanceX / 2) + element.originalPositionLeft;
				} else {
					newPositionLeft = element.originalPositionLeft;
				}

				if (this.options.verticalParallax) {
					newPositionTop = Math.floor(moveVertical * element.parallaxDistanceY / 2) + element.originalPositionTop;
				} else {
					newPositionTop = element.originalPositionTop;
				}

				this._setPosition(element.$element, newPositionLeft, element.originalPositionLeft, newPositionTop, element.originalPositionTop);

			}

			// Reposition backgrounds
			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				bgLeft = (this.options.horizontalParallax ? Math.floor(moveHorizontal * background.parallaxDistanceX / 2)  + background.originalBackgroundPositionLeft + 'px' : background.originalValueLeft);
				bgTop = (this.options.verticalParallax ? Math.floor(moveVertical * background.parallaxDistanceY / 2)  + background.originalBackgroundPositionTop + 'px' : background.originalValueTop);

				setBackgroundPosition(background.$element, bgLeft, bgTop);
			}
		},
		_handleWindowLoadAndResize: function() {
			var self = this,
				$window = $(window);

			if (self.options.responsive) {
				$window.bind('load.' + this.name, function() {
					self.refresh();
				});
			}

			$window.bind('resize.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});

			$window.bind('orientationchange.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});
		},
		// self loading function to constantly reposition elements within each animation frame
		_startAnimation: function() {
			var self = this,
				ticking = false;

			this.beta = 0;
			this.gamma = 0;
			this.clientX = this.oldClientX = Math.round(self.viewportWidth / 2);
			this.clientY = this.oldClientY = Math.round(self.viewportHeight / 2); // */

			var update = function() {
				self._processSensorData();
				self._repositionElements();
				ticking = false;
			};

			var requestTick = function() {
				if (!ticking) {
					requestAnimationFrame(update);
					
					ticking = true;
				}
			};

			this._handleSensorWebkit = function(e) {
				// gamma is device roll (moving left right)
				// values are from -180 to 180
				self.gamma = e.gamma;

				// beta is device pitch (moving up - down)
				// values are from -90 to 90
				self.beta = e.beta;

				requestTick();
			};

			this._handleSensorMoz = function(e) {
				// x is device roll (moving left right)
				// values are from -1 to 1
				self.gamma = e.x * 180;

				// y is device pitch (moving up - down)
				// values are from +1 to -1
				self.beta = e.y * -90;

				requestTick();
			};

			this._handleMouseMove = function(e) {
				self.oldClientX = self.clientX;
				self.oldClientY = self.clientY;
				e.clientX !== undefined ? self.clientX = e.clientX : self.clientX = e.pageX;
				e.clientY !== undefined ? self.clientY = e.clientY : self.clientY = e.pageY;

				requestTick();
			};

			// bind sensor events to updates
			if (this.useSensorWebkit) {
				window.addEventListener('deviceorientation', self._handleSensorWebkit, false);
			} else if (this.useSensorMoz) {
				window.addEventListener('MozOrientation', self._handleSensorMoz, false);
			}
			// bind mouse move event
			if (this.useMouseMove) {
				this.$viewportElement.bind('mousemove.' + this.name, self._handleMouseMove);
			}

			requestTick();
		}
	};

	$.fn[pluginName] = function (options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				if (options === 'destroy') {
					$.data(this, 'plugin_' + pluginName, null);
				}
			});
		}
	};

	$[pluginName] = function(options) {
		var $window = $(window);
		return $window[pluginName].apply($window, Array.prototype.slice.call(arguments, 0));
	};

	// Expose the position property function hashes so they can be extended
	$[pluginName].positionProperty = positionProperty;

	// Expose the motion type function hashes so they can be extended
	$[pluginName].motionType = motionType;

	// Expose the plugin class so it can be modified
	window[pluginName] = Plugin;
}(jQuery, this, document));

