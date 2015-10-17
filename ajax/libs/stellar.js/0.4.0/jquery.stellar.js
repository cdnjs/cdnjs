/*!
 * Stellar.js v0.4.0
 * http://markdalgleish.com/projects/stellar.js
 * 
 * Copyright 2012, Mark Dalgleish
 * This content is released under the MIT license
 * http://markdalgleish.mit-license.org
 */

;(function($, window, document, undefined){

	var pluginName = 'stellar',
		defaults = {
			scrollProperty: 'scroll',
			positionProperty: 'position',
			horizontalScrolling: true,
			verticalScrolling: true,
			horizontalOffset: 0,
			verticalOffset: 0,
			parallaxBackgrounds: true,
			parallaxElements: true,
			hideDistantElements: true,
			viewportDetectionInterval: 10000,
			hideElement: function($elem) { $elem.hide(); },
			showElement: function($elem) { $elem.show(); }
		},

		scrollProperty = {
			scroll: {
				getTop: function($elem) { return $elem.scrollTop();	},
				setTop: function($elem, val) { $elem.scrollTop(val); },

				getLeft: function($elem) { return $elem.scrollLeft(); },
				setLeft: function($elem, val) { $elem.scrollLeft(val); }
			},
			position: {
				getTop: function($elem) { return parseInt($elem.css('top'), 10) * -1; },
				setTop: function($elem, val) { $elem.css('top', val); },

				getLeft: function($elem) { return parseInt($elem.css('left'), 10) * -1; },
				setLeft: function($elem, val) { $elem.css('left', val); }
			},
			margin: {
				getTop: function($elem) { return parseInt($elem.css('margin-top'), 10) * -1; },
				setTop: function($elem, val) { $elem.css('margin-top', val); },

				getLeft: function($elem) { return parseInt($elem.css('margin-left'), 10) * -1; },
				setLeft: function($elem, val) { $elem.css('margin-left', val); }
			},
			transform: {
				getTop: function($elem) { return ($elem.css(vendorPrefix + 'transform') !== 'none' ? parseInt($elem.css(vendorPrefix + 'transform').match(/(-?[0-9]+)/g)[5], 10) * -1 : 0); },
				setTop: function($elem, val) { setTransform($elem, val, 'Y'); },

				getLeft: function($elem) { return ($elem.css(vendorPrefix + 'transform') !== 'none' ? parseInt($elem.css(vendorPrefix + 'transform').match(/(-?[0-9]+)/g)[4], 10) * -1 : 0); },
				setLeft: function($elem, val) {	setTransform($elem, val, 'X');	}
			}
		},

		positionProperty = {
			position: {
				setTop: function($elem, top) { $elem.css('top', top); },
				setLeft: function($elem, left) { $elem.css('left', left); }
			},
			transform: {
				setTop: function($elem, top, startingTop) {	setTransform($elem, top - startingTop, 'Y'); },
				setLeft: function($elem, left, startingLeft) { setTransform($elem, left - startingLeft, 'X'); }
			}
		},

		vendorPrefix = (function() {
			var prefix = '';

			if ($.browser.webkit) {
				prefix = '-webkit-';
			} else if ($.browser.mozilla) {
				prefix = '-moz-';
			} else if ($.browser.opera) {
				prefix = '-o-';
			} else if ($.browser.msie) {
				prefix = '-ms-';
			}

			return prefix;
		}()),

		supportsBackgroundPositionXY = document.createElement('div').style.backgroundPositionX !== undefined,

		setBackgroundPosition = (function() {
			return supportsBackgroundPositionXY ?
				function($elem, x, y) {
					$elem.css({
						'background-position-x': x,
						'background-position-y': y
					});
				} :
				function($elem, x, y) {
					$elem.css('background-position', x + ' ' + y);
				};
		}()),

		getBackgroundPosition = (function() {
			return supportsBackgroundPositionXY ?
				function($elem) {
					return [
						$elem[0].style.backgroundPositionX,
						$elem[0].style.backgroundPositionY
					];
				} :
				function($elem) {
					return $elem.css('background-position').split(' ');
				};
		}()),

		setTransform = function($elem, val, dimension /* 'X' or 'Y' */) {
			var currentTransform = $elem.css(vendorPrefix + 'transform');

			if (currentTransform === 'none') {
				$elem.css(vendorPrefix + 'transform', 'translate' + dimension + '(' + val + 'px)');
			} else {
				$elem.css(vendorPrefix + 'transform', replaceNthOccurence(currentTransform, /(-?[0-9]+[.]?[0-9]*)/g, (dimension === 'X' ? 5 : 6), val));
			}
		},

		replaceNthOccurence = function(original, pattern, n, replace) {
			var parts,
				tempParts,
				indexOfNthMatch;

			if (original.search(pattern) === -1) {
				return original;
			}

			parts = original.split(pattern);

			indexOfNthMatch = n * 2 - 1;

			if (parts[indexOfNthMatch] === undefined) {
				return original;
			}

			parts[indexOfNthMatch] = replace;

			return parts.join('');
		};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			this.options.name = pluginName + '_' + Math.floor(Math.random()*10000);

			this._defineElements();
			this._defineGetters();
			this._defineSetters();

			this.refresh();

			this._startViewportDetectionLoop();
			this._startAnimationLoop();
		},
		_defineElements: function() {
			if (this.element === document.body) this.element = window;
			this.$scrollElement = $(this.element);
			this.$element = this.element === window ? $('body') : this.$scrollElement;
			this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty.indexOf('scroll') === 0 ? this.$scrollElement : this.$scrollElement.parent()) );
		},
		_defineGetters: function() {
			var self = this;

			this._getScrollLeft = function() {
				return scrollProperty[self.options.scrollProperty].getLeft(self.$scrollElement);
			};

			this._getScrollTop = function() {
				return scrollProperty[self.options.scrollProperty].getTop(self.$scrollElement);
			};
		},
		_defineSetters: function() {
			var self = this;

			this._setScrollLeft = function(val) {
				scrollProperty[self.options.scrollProperty].setLeft(self.$scrollElement, val);
			};

			this._setScrollTop = function(val) {
				scrollProperty[self.options.scrollProperty].setTop(self.$scrollElement, val);
			};

			this._setLeft = function($elem, left, startingLeft) {
				positionProperty[self.options.positionProperty].setLeft($elem, left, startingLeft);
			};

			this._setTop = function($elem, top, startingTop) {
				positionProperty[self.options.positionProperty].setTop($elem, top, startingTop);
			};
		},
		refresh: function() {
			var self = this,
				oldLeft = self._getScrollLeft(),
				oldTop = self._getScrollTop();

			this._setScrollLeft(0);
			this._setScrollTop(0);

			this._setOffsets();
			this._findParticles();
			this._findBackgrounds();

			// Fix for WebKit background rendering bug
			if (navigator.userAgent.indexOf('WebKit') > 0) {
				$(window).load(function(){
					var oldLeft = self._getScrollLeft(),
						oldTop = self._getScrollTop();

					self._setScrollLeft(oldLeft + 1);
					self._setScrollTop(oldTop + 1);

					self._setScrollLeft(oldLeft);
					self._setScrollTop(oldTop);
				});
			}

			self._setScrollLeft(oldLeft);
			self._setScrollTop(oldTop);
		},
		_findParticles: function(){
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop();

			if (this.particles !== undefined) {
				for (var i = this.particles.length - 1; i >= 0; i--) {
					this.particles[i].$element.data('stellar-elementIsActive', undefined);
				}
			}

			this.particles = [];

			if (!this.options.parallaxElements) return;

			this.$element.find('[data-stellar-ratio]').each(function(i){
				var $this = $(this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					$offsetParent,
					offsetLeft,
					offsetTop,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-elementIsActive')) {
					$this.data('stellar-elementIsActive', this);
				} else if ($this.data('stellar-elementIsActive') !== this) {
					return;
				}

				self.options.showElement($this);

				// Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
				if (!$this.data('stellar-startingLeft')) {
					$this.data('stellar-startingLeft', $this.css('left'));
					$this.data('stellar-startingTop', $this.css('top'));
				} else {
					$this.css('left', $this.data('stellar-startingLeft'));
					$this.css('top', $this.data('stellar-startingTop'));
				}

				positionLeft = $this.position().left;
				positionTop = $this.position().top;

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft;
				offsetTop = $this.offset().top - marginTop;

				// Calculate the offset parent
				$this.parents().each(function(){
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				//Add our object to the particles collection
				self.particles.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('position') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingPositionLeft: positionLeft,
					startingPositionTop: positionTop,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: $this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1,
					width: $this.outerWidth(true),
					height: $this.outerHeight(true),
					isHidden: false
				});
			});
		},
		_findBackgrounds: function() {
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				$backgroundElements;

			this.backgrounds = [];

			if (!this.options.parallaxBackgrounds) return;

			$backgroundElements = this.$element.find('[data-stellar-background-ratio]');

			if (this.$element.is('[data-stellar-background-ratio]')) {
				$backgroundElements.add(this.$element);
			}

			$backgroundElements.each(function(){
				var $this = $(this),
					backgroundPosition = getBackgroundPosition($this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					offsetLeft,
					offsetTop,
					$offsetParent,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-backgroundIsActive')) {
					$this.data('stellar-backgroundIsActive', this);
				} else if ($this.data('stellar-backgroundIsActive') !== this) {
					return;
				}

				// Save/restore the original top and left CSS values in case we destroy the instance
				if (!$this.data('stellar-backgroundStartingLeft')) {
					$this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
					$this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
				} else {
					setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
				}

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft - scrollLeft;
				offsetTop = $this.offset().top - marginTop - scrollTop;
				
				// Calculate the offset parent
				$this.parents().each(function(){
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				self.backgrounds.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('background-attachment') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingValueLeft: backgroundPosition[0],
					startingValueTop: backgroundPosition[1],
					startingBackgroundPositionLeft: isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10),
					startingBackgroundPositionTop: isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10),
					startingPositionLeft: $this.position().left,
					startingPositionTop: $this.position().top,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: $this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio')
				});
			});
		},
		destroy: function() {
			var particle,
				startingPositionLeft,
				startingPositionTop,
				background,
				i;

			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];
				startingPositionLeft = particle.$element.data('stellar-startingLeft');
				startingPositionTop = particle.$element.data('stellar-startingTop');

				this._setLeft(particle.$element, startingPositionLeft, startingPositionLeft);
				this._setTop(particle.$element, startingPositionTop, startingPositionTop);

				this.options.showElement(particle.$element);

				particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
			}

			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];
				setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
			}

			this._animationLoop = $.noop;
			clearInterval(this._viewportDetectionInterval);
		},
		_setOffsets: function() {
			var self = this;

			$(window).unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

			if (typeof this.options.horizontalOffset === 'function') {
				this.horizontalOffset = this.options.horizontalOffset();
				$(window).bind('resize.horizontal-' + this.name, function() {
					self.horizontalOffset = self.options.horizontalOffset();
				});
			} else {
				this.horizontalOffset = this.options.horizontalOffset;
			}

			if (typeof this.options.verticalOffset === 'function') {
				this.verticalOffset = this.options.verticalOffset();
				$(window).bind('resize.vertical-' + this.name, function() {
					self.verticalOffset = self.options.verticalOffset();
				});
			} else {
				this.verticalOffset = this.options.verticalOffset;
			}
		},
		_repositionElements: function() {
			var scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				horizontalOffset,
				verticalOffset,
				particle,
				fixedRatioOffset,
				background,
				bgLeft,
				bgTop,
				isVisibleVertical = true,
				isVisibleHorizontal = true,
				newPositionLeft,
				newPositionTop,
				newOffsetLeft,
				newOffsetTop,
				i;

			//First check that the scroll position or container size has changed
			if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
				return;
			} else {
				this.currentScrollLeft = scrollLeft;
				this.currentScrollTop = scrollTop;
				this.currentWidth = this.viewportWidth;
				this.currentHeight = this.viewportHeight;
			}

			//Reposition elements
			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];

				fixedRatioOffset = particle.isFixed ? 1 : 0;

				//Calculate position, then calculate what the particle's new offset will be (for visibility check)
				if (this.options.horizontalScrolling) {
					newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
					newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
				}
				if (this.options.verticalScrolling) {
					newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
					newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
				}

				//Check visibility
				if (this.options.hideDistantElements) {
					isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
					isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
				}

				if (isVisibleHorizontal && isVisibleVertical) {
					if (particle.isHidden) {
						this.options.showElement(particle.$element);
						particle.isHidden = false;
					}

					if (this.options.horizontalScrolling) {
						this._setLeft(particle.$element, newPositionLeft, particle.startingPositionLeft);
					}

					if (this.options.verticalScrolling) {
						this._setTop(particle.$element, newPositionTop, particle.startingPositionTop);
					}
				} else {
					if (!particle.isHidden) {
						this.options.hideElement(particle.$element);
						particle.isHidden = true;
					}
				}
			}

			//Reposition backgrounds
			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				fixedRatioOffset = background.isFixed ? 0 : 1;
				bgLeft = this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft;
				bgTop = this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop;

				setBackgroundPosition(background.$element, bgLeft, bgTop);
			}
		},
		_startViewportDetectionLoop: function() {
			var self = this,
				detect = function() {
					var viewportOffsets = self.$viewportElement.offset(),
						hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

					self.viewportWidth = self.$viewportElement.width();
					self.viewportHeight = self.$viewportElement.height();

					self.viewportOffsetTop = hasOffsets ? viewportOffsets.top : 0;
					self.viewportOffsetLeft = hasOffsets ? viewportOffsets.left : 0;
				};

			detect();
			this._viewportDetectionInterval = setInterval(detect, this.options.viewportDetectionInterval);
		},
		_startAnimationLoop: function() {
			var self = this,
				requestAnimFrame = (function(){
					return window.requestAnimationFrame    ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						window.oRequestAnimationFrame      ||
						window.msRequestAnimationFrame     ||
						function(callback, element){
							window.setTimeout(callback, 1000 / 60);
						};
				}());

			this._animationLoop = function(){
				requestAnimFrame(self._animationLoop);
				self._repositionElements();
			};
			this._animationLoop();
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
		return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
	};

	//Expose the scroll and position property function hashes so they can be extended
	$[pluginName].scrollProperty = scrollProperty;
	$[pluginName].positionProperty = positionProperty;

	//Expose the plugin class so it can be modified
	window.Stellar = Plugin;
}(jQuery, window, document));