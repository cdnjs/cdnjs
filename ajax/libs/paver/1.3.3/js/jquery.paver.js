// Paver
// Description: A minimal panorama/image viewer replicating the effect seen in Facebook Pages app
// Version: 1.3.0
// Author: Terry Mun
// Author URI: http://terrymun.com
;(function ( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var $w			= $(window),
			$d			= $(document),
			pluginName	= "paver",
			defaults	= {
				// Failure message settings
				failureMessage: 'Scroll left/right to pan through panorama.',
				failureMessageInsert: 'after',
				gracefulFailure: true,

				// Display settings
				meta: false,
				responsive: true,
				startPosition: 0.5,

				// Minimum overflow before panorama gets converted into a Paver instance
				minimumOverflow: 200,

				// Performance
				grain: 3,
				cursorThrottle: (1000/60),
				gyroscopeThrottle: (1000/60),
				resizeThrottle: 500,

				// For mousemove event
				mouseSmoothingFunction: 'linear',
				
				// For deviceOrientationEvent
				tilt: true,
				tiltSensitivity: 0.1,
				tiltScrollerPersistence: 500,
				tiltSmoothingFunction: 'gaussian',
				tiltThresholdPortrait: 12,
				tiltThresholdLandscape: 24
			},
			globalData = {};

		 // Check the availability of the console object. This ensures compatibility with IE8.
		if(typeof console === "undefined" || console.warn === "undefined" ) {
			console = {};
			console.warn = function(){};
		}

		// The actual plugin constructor
		var Plugin = function(element, options) {

			// Assign element
			this.element	= element;

			// Merge defaults into options, into dataset
			this.settings	= $.extend({}, defaults, options, $(this.element).data());

			// Coerce settings
			if(parseInt(this.settings.grain <= 0)) {
				this.settings.grain = 1;
			}
			this.settings.startPosition				= Math.max(Math.min(this.settings.startPosition, 1), 0);
			this.settings.tiltThresholdPortrait		= Math.max(Math.min(this.settings.tiltThresholdPortrait, 180), 0);
			this.settings.tiltThresholdLandscape	= Math.max(Math.min(this.settings.tiltThresholdLandscape, 180), 0);

			// Store plugin name
			this._name		= pluginName;

			// Store and expose mouse coordinates
			this.mousemove = {};

			// Initialize
			if(globalData.features.hasGyroscope === true) {
				// Has functional gyroscope
				this.init();
			} else {
				// No functional gyroscope
				if(globalData.features.isTouch) {
					this.fallback();
				} else {
					this.init();
				}
			}
		};

		// Public functions
		$.extend(Plugin.prototype, {
			init: function () {
				// Trigger custom enabled event
				$d.trigger('enabled.paver');

				// Define elements
				_fun.defineElements(this);
				var paver = this;

				// Only perform initialization when it is NOT yet initialized
				if(!paver.instanceData || !paver.instanceData.initialized) {

					paver.instanceData = {};

					// Initialize and store original node
					paver.instanceData.initialized	= true;
					paver.instanceData.originalNode = paver.$t.html();

					// DOM replacement
					_fun.domReplacement(this);

					// Sniff out container dimensions and get center
					_fun.getContainerDimensions(this);
					_fun.getCenter(this);

					// Wait for panorama to load
					var img = new Image(),
						loadedCallback = function() {
							// Fire image loaded event
							paver.$t.trigger('imageLoadDone.paver');

							// Set panorama dimensions
							paver.instanceData.naturalWidth			= paver.$p[0].naturalWidth;
							paver.instanceData.naturalHeight		= paver.$p[0].naturalHeight;
							paver.instanceData.panoAspectRatio		= paver.instanceData.naturalWidth/paver.instanceData.naturalHeight;
							paver.instanceData.containerAspectRatio	= paver.instanceData.outerWidth/paver.instanceData.outerHeight;

							// Panorama replacement, but check if image source conforms to standard
							if(_fun.checkURL(paver.$p.attr('src'))) {
								return false;
							} else {
								_fun.replacePanorama(paver);
							}

							// Compute
							_fun.compute(paver);

							// Check
							if(_fun.checkOverflow(paver)) {
								// Position panorama centrally the first time
								paver.instanceData.panCounter = 0;
								paver.pan({
									xPos: paver.settings.startPosition,
									yPos: paver.settings.startPosition
								});

								// Turn on paver
								_fun.paverOn(paver);
							} else {
								// Turn off paver
								_fun.paverOff(paver);
							}

							// Update dimensions and recompute upon window resize, or custom event
							$w.on('resize', $.throttle(paver.settings.resizeThrottle, function() {
								paver.recompute();
							}));

							// Here we call public functions by listening to namespaced events
							// Recompute
							paver.$t.on('recompute.paver', function() {
								paver.recompute();
							});

							// Destroy
							paver.$t.on('destroy.paver', function() {
								paver.destroy();
							});

							// Pan
							paver.$t.on('pan.paver', function(e, ratio) {
								paver.pan(ratio);
							});
						};

					// Poll
					var	_naturalDimensions = false,
							t = setInterval(function() {
							// If natural dimensions are already available, we can initialize Paver already
							if (img.naturalWidth && img.naturalHeight) {
								loadedCallback();
								_naturalDimensions = true;
								window.clearInterval(t);
							}
						}, 100);

					// Trigger callback when image is loaded
					img.onload = function() {
						if(!_naturalDimensions) loadedCallback();
						window.clearInterval(t);
					};
					img.src = paver.$p.attr('src');

				}
			},
			fallback: function() {
				// Trigger custom fallback event
				$d.trigger('disabled.paver');

				// If failure message is turned on
				if(this.settings.gracefulFailure) {
					var $t = $(this.element),
						$msg = $('<div />', {
							'class': 'paver__fallbackMessage'
						});

					$t
					.addClass('paver--fallback');

					// DOM insertion of message
					// Coerce insert position to lower case
					switch (this.settings.failureMessageInsert.toLowerCase()) {
						case 'after':
							$t.after($msg.html(this.settings.failureMessage));
							break;

						case 'before':
							$t.before($msg.html(this.settings.failureMessage));
							break;

						case 'prepend':
							$t.prepend($msg.html(this.settings.failureMessage));
							break;

						case 'append':
							$t.append($msg.html(this.settings.failureMessage));
							break;

						default:
							$t.after($msg.html(this.settings.failureMessage));
							break;
					}

					$t.trigger('fallbackend.paver');
				}
			},
			unbindEvents: function() {
				$(this.element)
				.off('mousemove.paver devicetilt.paver')
				.removeClass('paver--on')
				.addClass('paver--off');
			},
			destroy: function() {
				var pluginData = $(this.element).data('plugin_paver');

				if(pluginData) {

					// Unbind events
					this.unbindEvents();

					// DOM reversal
					$(this.element)
						.trigger('destroyed.paver')							// Fire destroyed event
						.removeClass('paver--initialized paver--ready')		// Remove classes
						.empty()											// Empty element
						.html(pluginData.instanceData.originalNode);		// Attach original node

					// Destroy plugin data entirely
					$(this.element).data('plugin_paver', null);
				}
			},
			recompute: function() {
				var $t			= $(this.element),
					paver		= $t.data('plugin_paver');

				// Turn off events
				$t.off('mousemove.paver devicetilt.paver');

				// Update container dimensions
				_fun.getContainerDimensions(this);
				paver.instanceData.containerAspectRatio	= paver.instanceData.outerWidth/paver.instanceData.outerHeight;

				// Fire recompute event and recompute dimensions
				$t.trigger('recomputeStart.paver');
				_fun.compute(this);

				// Check overflow
				if(_fun.checkOverflow(this)) {

					// Pan to last known position
					paver.pan({
						xPos: Math.min(paver.instanceData.lastPanX,1),
						yPos: Math.min(paver.instanceData.lastPanY,1)
					});

					// Turn paver on
					_fun.paverOn(this);
				} else {
					// Turn off paver
					_fun.paverOff(this);
				}
				
			},
			pan: function(ratio) {

				var $t			= $(this.element),
					$scroller	= $t.find('div.paver__scroller'),
					$thumb		= $scroller.find('span'),
					grain		= parseInt(this.settings.grain),
					paver		= $t.data('plugin_paver');

				// If ratio exists and if it is valid
				if(!ratio) {
					ratio = {
						xPos: paver.settings.startPosition,
						yPos: paver.settings.startPosition
					};
				} else {
					if(ratio.xPos === undefined) ratio.xPos = paver.settings.startPosition;
					if(ratio.yPos === undefined) ratio.yPos = paver.settings.startPosition;
				}
				
				// Coerce positions
				if(ratio.xPos > 1) {
					ratio.xPos = 1;
				} else if(ratio.xPos < 0) {
					ratio.xPos = 0;
				}
				if(ratio.yPos > 1) {
					ratio.yPos = 1;
				} else if(ratio.yPos < 0) {
					ratio.yPos = 0;
				}

				// Set x and y ratios
				var rX = ratio.xPos.toFixed(grain),
					rY = ratio.yPos.toFixed(grain);

				// Keep track of panning count
				if(!paver.instanceData.panCounter || paver.instanceData.panCounter === 0) {
					// First pan involves positioning based on settings
					$t.trigger('initialPanStart.paver');
				} else {
					// Fire custom event on start of pan
					$t.trigger('panStart.paver');
				}

				// Translate the panorama to match ratio calculated
				$t
				.find('div.paver__pano')
					.css('transform', 'translate('+(-rX * (paver.instanceData.computedWidth - paver.instanceData.outerWidth))+'px, '+(-rY * (paver.instanceData.computedHeight - paver.instanceData.outerHeight))+'px)')
					.end()
				.find('div.paver__scroller span')
					.css('transform', 'translateX('+(rX * ($scroller.width() - $thumb.width()))+'px)')
					.end();

				// Fire custom event on end of pan (end of transition)
				$w.one(_fun.whichTransitionEnd(), function() {
					if(!paver.instanceData.panCounter || paver.instanceData.panCounter === 0) {
						// First pan involves positioning based on settings
						$t.trigger('initialPanEnd.paver');
					} else {
						// Fire custom event on start of pan
						$t.trigger('panEnd.paver');
					}
				});

				// Update counter and last panned position
				paver.instanceData.panCounter += 1;
				paver.instanceData.lastPanX = rX;
				paver.instanceData.lastPanY = rY;
			}
		});

		// Private functions
		var _fun = {
			whichTransitionEnd: function() {
				var el = document.createElement('div'),
					transition,
					eventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition': 'transitionend',
						'transition': 'transitionend'
					};

				for (transition in eventNames) {
					if (el.style[transition] !== undefined) return eventNames[transition];
				}
			},
			//// ------------------ ////
			//// Let's do some math ////
			//// ------------------ ////
			// Adapted from http://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript
			normalcdf: function(mean, sigma, to) {
				var z = (to-mean)/Math.sqrt(2*sigma*sigma),
					t = 1/(1+0.3275911*Math.abs(z)),
					a1 =  0.254829592,
					a2 = -0.284496736,
					a3 =  1.421413741,
					a4 = -1.453152027,
					a5 =  1.061405429,
					erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z),
					sign = 1;
				if(z < 0) sign = -1;
				return (1/2)*(1+sign*erf);
			},
			// Collection of smoothing functions
			smoothingFunction: {
				linear: function(delta, threshold) {
					if (delta >= threshold) return 1;
					if (delta <= -threshold) return 0;
					return 0.5 * (delta/threshold + 1);
				},
				tangent: function(delta, threshold) {
					if (delta >= threshold) return 1;
					if (delta <= -threshold) return 0;
					return 0.5 * (0.5 * Math.tan((delta/threshold) * (Math.PI * 0.351)) + 1);
				},
				cosine: function(delta, threshold) {
					if (delta >= threshold) return 1;
					if (delta <= -threshold) return 0;
					return 0.5 * (Math.sin((delta/threshold) * (Math.PI/2)) + 1);
				},
				gaussian: function(delta, threshold) {
					if (delta >= threshold) return 1;
					if (delta <= -threshold) return 0;
					return _fun.normalcdf(0, 0.375, delta/threshold);
				}
			},

			//// --------------- ////
			//// Paver functions ////
			//// --------------- ////
			// Define elements
			defineElements: function(paver) {
				paver.t					= paver.element;
				paver.$t				= $(paver.element);
				paver.$p				= paver.$t.find('img').first();
				paver.instanceData		= paver.$t.data('instance-data');
			},
			domReplacement: function(paver) {
				// Initialize and append metadata
				paver.$t
				.addClass('paver--initialized')
				.append($('<div />', { 'class': 'paver__meta' }));

				// If metadata is present, and enabled
				if(paver.settings.meta &&
					(paver.$p.attr('title') !== undefined || paver.$p.attr('alt') !== undefined) &&
					(paver.$p.attr('title').length || paver.$p.attr('alt').length)
				) {
					paver.$t
					.addClass('paver--metaActive')
					.find('.paver__meta')
						.html('<span class="paver__title">'+paver.$p.attr('title')+'</span><span class="paver__desc">'+paver.$p.attr('alt')+'</span>');
				}

				// Fire initialized event
				paver.$t.trigger('init.paver');
			},
			getContainerDimensions: function(paver) {
				// Set parent container dimensions
				paver.instanceData.outerWidth			= paver.$t.width();
				paver.instanceData.outerHeight			= paver.$t.height();
				paver.instanceData.offsetX				= paver.$t.offset().left;
				paver.instanceData.offsetY				= paver.$t.offset().top;
			},
			getCenter: function(paver) {
				paver.instanceData.centerX		= 0.5*paver.instanceData.outerWidth;
				paver.instanceData.centerY		= 0.5*paver.instanceData.outerHeight;
			},
			replacePanorama: function(paver) {
				var $newP = $('<div />', {
						'class': 'paver__pano'
					})
					.css('background-image', 'url('+_fun.formatURL(paver.$p.attr('src'))+')'),

					$scroller = $('<div />', {
						'class': 'paver__scroller'
					})
					.append($('<span />'));

				// DOM manipulation
				paver.$t
				.addClass('paver--ready')
				.append($newP)
				.append($scroller);

				// Remove original panorama
				paver.$p.remove();

				// Fire loaded event
				paver.$t.trigger('ready.paver');
				paver.instanceData.ready = true;
			},
			checkOverflow: function(paver) {
				// Check if we really need to bind events
				if(
					paver.instanceData.containerAspectRatio <= paver.instanceData.panoAspectRatio &&
					paver.instanceData.outerWidth <= paver.instanceData.computedWidth - paver.settings.minimumOverflow
				) return true;
				return false;
			},
			paverOn: function(paver) {
				// Turn on paver
				paver.$t
				.removeClass('paver--off').addClass('paver--on')
				.find('div.paver__pano').css('left', 0);	// Unset the 'left: 50%' set for responsive panoramas

				// Bind events
				_fun.bindEvents(paver);
			},
			paverOff: function(paver) {
				// Turn off paver
				paver.unbindEvents(paver);

				// If responsiveness is desired, we resize panorama to fill the original parent container
				if(paver.settings.responsive === true) {
					if(paver.instanceData.naturalWidth > paver.instanceData.outerWidth) {
						paver.$t
						.css('min-height', paver.instanceData.outerWidth/paver.instanceData.panoAspectRatio)
						.find('div.paver__pano')
							.css({
								width: paver.instanceData.outerWidth,
								height: '100%',
								left: '50%',
								transform: 'translateX(-50%)'
							});
					}
				}
			},
			compute: function(paver) {
				// Get computed dimensions
				paver.instanceData.computedWidth	= paver.instanceData.outerHeight * paver.instanceData.panoAspectRatio;
				paver.instanceData.computedHeight	= paver.instanceData.computedWidth / paver.instanceData.panoAspectRatio;

				// Get center
				_fun.getCenter(paver);

				// Set panorama dimensions
				paver.$t.find('div.paver__pano').css({
					'width': paver.instanceData.computedWidth,
					'height': paver.instanceData.outerHeight
				});

				// Fire custom event
				paver.$t.trigger('computeEnd.paver');
			},
			// Generic handler to bind all events
			bindEvents: function(paver) {
				if(globalData.features.isTouch) {
					if(globalData.features.hasGyroscope && paver.settings.tilt){
						_fun.bindOrientationEvents(paver);
					}
				} else {
					_fun.bindMouseEvents(paver);
				}

				// Fire custom event
				paver.$t.trigger('eventsBound.paver');
			},
			// Bind evens when mousemove is fired
			bindMouseEvents: function(paver) {
				paver.$t.on('mousemove.paver', $.throttle(paver.settings.cursorThrottle, function(e) {
					// Update exposed mouse coordinates
					paver.mousemove.dX = (e.pageX - paver.instanceData.offsetX) - paver.instanceData.centerX;
					paver.mousemove.dY = (e.pageY - paver.instanceData.offsetY) - paver.instanceData.centerY;

					// Define smoothing function
					var smooth;
					if(typeof paver.settings.mouseSmoothingFunction === 'string') {
						_fun.defaultSmooth(paver, paver.settings.mouseSmoothingFunction, paver.mousemove.dX, paver.instanceData.centerX, paver.mousemove.dY, paver.instanceData.centerY);
					} else if(typeof paver.settings.mouseSmoothingFunction === 'function') {
						// Make call to custom smoothing function
						var customPos = paver.settings.mouseSmoothingFunction.call(paver, paver.mousemove.dX, paver.instanceData.centerX, paver.mousemove.dY, paver.instanceData.centerY);

						// Sanity check
						if(customPos !== undefined) {
							// Set transform
							paver.pan({
								xPos: customPos.x,
								yPos: customPos.y
							});
						} else {
							_fun.defaultSmooth(paver, defaults.settings.mouseSmoothingFunction, paver.mousemove.dX, paver.instanceData.centerX, paver.mousemove.dY, paver.instanceData.centerY);
						}
					}

					
				}));
				
			},
			// Bind events that are triggered during device orientation changes (tilting)
			bindOrientationEvents: function(paver) {
				// Declare empty object for tilt change from baseline
				paver.instanceData.prevTilt = {};

				// Declare scrollerTimer
				var scrollerTimer = null;

				paver.$t.on('devicetilt.paver', $.throttle(paver.settings.gyroscopeThrottle, function(e, tilt) {
					
					// Is scroller persistence turned on?
					if(paver.settings.tiltScrollerPersistence === 0) {
						// We want scroller to appear all the time
						paver.$t.addClass('paver--tilting');
					} else {
						// We only want to conditionally enable scroller
						// Is the tilting beyond a threshold?
						if(
							// We accept both cases:
							// 1. When previous tilt data is available, make sure that the difference is beyond tiltSensitivity
							// 2. When previous tilt data is unavailable, go right ahead
							(!$.isEmptyObject(paver.instanceData.prevTilt) &&
								(
									Math.abs(paver.instanceData.prevTilt.b - tilt.b) > paver.settings.tiltSensitivity ||
									Math.abs(paver.instanceData.prevTilt.g - tilt.g) > paver.settings.tiltSensitivity
								)
							) || $.isEmptyObject(paver.instanceData.prevTilt)
						) {
							// Paver is tilting, so we show the scroller
							paver.$t.addClass('paver--tilting');
							if(scrollerTimer !== null) {
								clearTimeout(scrollerTimer);
							}
							scrollerTimer = window.setTimeout(function() {
								paver.$t.removeClass('paver--tilting');
							}, paver.settings.tiltScrollerPersistence);

							// Declare screen-adjusted screen tilt, ratio and thresholds
							var screenTilt = {},
								tiltThreshold;

							// Listen to adjusted beta and gamma, as well as the appropriate tilt thresholds
							// According to screen orientation
							switch(globalData.screenOrientationAngle) {
								case 0:
									// Portrait-primary
									screenTilt = {
										beta:	tilt.b,
										gamma:	tilt.g
									};
									tiltThreshold = paver.settings.tiltThresholdPortrait;
									break;

								case 180:
								case -180:
									// Portrait-secondary
									screenTilt = {
										beta:	-tilt.b,
										gamma:	-tilt.g
									};
									tiltThreshold = paver.settings.tiltThresholdPortrait;
									break;

								case 90:
								case -270:
									// Landscape-primary
									screenTilt = {
										beta:	-tilt.g,
										gamma:	tilt.b
									};
									tiltThreshold = paver.settings.tiltThresholdLandscape;
									break;

								case 270:
								case -90:
									// Landscape-secondary
									screenTilt = {
										beta:	tilt.g,
										gamma:	-tilt.b
									};
									tiltThreshold = paver.settings.tiltThresholdLandscape;
									break;

								default:
									// Portrait-primary
									screenTilt = {
										beta:	tilt.b,
										gamma:	tilt.g
									};
									tiltThreshold = paver.settings.tiltThresholdPortrait;
									break;
							}

							// Define smoothing function
							var smooth;

							// Check if custom smoothing function
							if(typeof paver.settings.tiltSmoothingFunction === 'string') {
								_fun.defaultSmooth(paver, paver.settings.tiltSmoothingFunction, screenTilt.gamma, tiltThreshold, screenTilt.beta,tiltThreshold);
							} else if(typeof paver.settings.tiltSmoothingFunction === 'function') {
								// Make call to custom smoothing function
								var customPos = paver.settings.mouseSmoothingFunction.call(paver, screenTilt.gamma, tiltThreshold, screenTilt.beta, tiltThreshold);

								// Sanity check
								if(customPos !== undefined) {
									// Set transform
									paver.pan({
										xPos: customPos.x,
										yPos: customPos.y
									});
								} else {
									_fun.defaultSmooth(paver, paver.settings.tiltSmoothingFunction, screenTilt.gamma, tiltThreshold, screenTilt.beta,tiltThreshold);
								}
							}
							

							// Store current tilt
							paver.instanceData.prevTilt = {
								a: tilt.a,
								b: tilt.b,
								g: tilt.g
							};
						}
					}
				}));
			},
			// The default smoothing function
			// 1. Used for default smoothing
			// 2. Used for custom smoothing if smoothing function is a user-supplied function
			defaultSmooth: function(paver, smoothingFunction, deltaX, thresholdX, deltaY, thresholdY) {
				// Get smoothing function for tilting
				var smooth = _fun.smoothingFunction[smoothingFunction];

				// Set transform
				paver.pan({
					xPos: smooth(deltaX, thresholdX),
					yPos: smooth(deltaY, thresholdY)
				});
			},
			// URL checks
			checkURL: function(url) {
				var exitCode = 0;

				if(/[\s+]/g.test(url)) {
					console.warn('Paver: Paver has detected characters in your URL string ('+url+') that need to be properly encoded/escaped. Whitespace(s) have to be escaped manually. See RFC3986 documentation.');
					exitCode = 1;
				} else if(/[\"\'\(\)]/g.test(url)) {
					console.warn('Paver: Plugin will proceed, but it has detected characters in your URL string ('+url+') that need to be properly encoded/escaped. These will be escaped for you. See RFC3986 documentation.');
					exitCode = 0;
				}
				return exitCode;
			},
			formatURL: function(url) {
				return url
					.replace(/"/g, '%22')
					.replace(/'/g, '%27')
					.replace(/\(/g, '%28')
					.replace(/\)/g, '%29');
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn.paver = function(options) {

			var t = this,
				args = arguments;

			// Global data
			globalData = {
				features: {
					isTouch: false,
					hasGyroscope: false,
					hasScreenOrientationAPI: (window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined && window.screen.orientation.angle !== null ? true : false)
				},
				screenOrientationAngle: null,
				startTilt: {}
			};

			// Private global function
			var _check = {
				// Is it a touch-based device?
				isTouch: function() {
					try {
						document.createEvent('TouchEvent');
						globalData.features.isTouch = true;
					} catch (e) {
						globalData.features.isTouch = false;
					}
				},
				// Does it have a working gyroscope?
				hasGyroscope: function() {
					var d = new $.Deferred(),
						_deviceOrientationEvent = false;

					var handler = function(e) {

							// Check if we have any useful gyroscopic data
							if(e.alpha !== null && e.beta !== null && e.gamma !== null) {
								d.resolve({
									orientation: {
										alpha: e.alpha,
										beta: e.beta,
										gamma: e.gamma,
									},
									status: {
										deviceOrientationEventSupport: true,
										deviceOrientationData: true
									}
								});
							} else {
								d.reject({
									status: {
										deviceOrientationEventSupport: true,
										deviceOrientationData: false
									}
								});
							}

							// Listen to device orientation once and remove listener immediately
							window.removeEventListener('deviceorientation', handler, false);

							// Inform that we have checked deviceorientation
							_deviceOrientationEvent = true;

							return d.promise();
						};

					// Check if DeviceOrientationEvent is supported
					if (window.DeviceOrientationEvent) {

						// DeviceOrientationEvent is fired
						window.addEventListener('deviceorientation', handler, false);

						// Firefox caveat catch
						// Firefox exposes window.DeviceOrientationEvent even if it is incapable of feeding gyroscoping data (e.g. on desktops),
						// so we use a simple timeout function to check if the event is fired
						if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							window.setTimeout(function() {
								d.reject({
									status: {
										deviceOrientationEventSupport: true,
										deviceOrientationData: false
									}
								});
								return d.promise();
							}, 250);
						}
					} else {
						
						d.reject({
							status: {
								deviceOrientationEventSupport: false,
								deviceOrientationData: false
							}
						});
					}

					// Return promise
					return d.promise();
				},
				// What is the device orientation?
				// Logic from Full-Tilt: https://github.com/richtr/Full-Tilt/
				hasOrientation: function() {
					globalData.screenOrientationAngle = (globalData.features.hasScreenOrientationAPI ? window.screen.orientation.angle : (window.orientation || 0));
				}
			};

			// Do checks first
			_check.isTouch();
			_check.hasOrientation();
			window.addEventListener('orientationchange', function() {
				_check.hasOrientation();
				_check.hasGyroscope();
			}, false);

			// Paver loop
			var _doPaver = function() {
					var $t = $(this);

					// Listen to starting tilt, only when gyroscopic data is available
					// Tilt is relative to startTilt
					var deviceOrientationHandler = function(e) {
						var t = {
								a: e.alpha - globalData.startTilt.alpha,
								b: e.beta - globalData.startTilt.beta,
								g: e.gamma - globalData.startTilt.gamma
							};
						$t.trigger('devicetilt.paver', [t]);
					};
					if(globalData.features.hasGyroscope) {
						window.addEventListener('deviceorientation', deviceOrientationHandler, false);
					}

					// Check the options parameter
					// If it is undefined (initialization of plugin) or is an object (plugin configuration),
					// we create a new instance of the plugin
					if(options === undefined || typeof options === 'object') {
						return $t.each(function() {

							// Only if the plugin_paver data is not present,
							// to prevent multiple instances being created
							if(!$.data(this, 'plugin_' + pluginName)) {

								// Initialize plugin and store
								$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
							}
						});

					// If it is defined, but is a string, does not start with an underscore and is not init(),
					// we allow users to make calls to public methods
					} else if(typeof options === 'string' && options[0] !== '_' && options !== 'init') {
						var publicMethods;

						$t.each(function() {
							// Check if plugin instance already exists, and that the 'options' string is a function name
							var instance = $.data(this, 'plugin_' + pluginName);
							if(instance instanceof Plugin && typeof instance[options] === 'function') {
								publicMethods = instance[options].apply(instance, Array.prototype.slice.call(args,1));
							}
						});

						return typeof publicMethods !== typeof undefined ? publicMethods : $t;
					}
					
				},
				_paverGyroData = {
					yes: function(gyroData) {
						// We have gyroscopic data!
						// Do paver
						globalData.features.hasGyroscope = true;

						// Establish startTilt
						globalData.startTilt.alpha	= gyroData.orientation.alpha;
						globalData.startTilt.beta	= gyroData.orientation.beta;
						globalData.startTilt.gamma	= gyroData.orientation.gamma;

						// Trigger event
						$d.trigger('hasGyroscopeData.paver', [gyroData]);

						// Do paver
						_doPaver.call(t);
					},
					no: function() {
						// We do not have gyroscopic data
						console.warn('Gyroscopic data unavailable. Falling back to cursor-based panning.');
						globalData.features.hasGyroscope = false;
						var gyroData = {
							status: {
								deviceOrientationEventSupport: false,
								deviceOrientationData: false
							}
						};

						// Trigger event
						$d.trigger('hasNoGyroscopeData.paver', [gyroData]);

						// Do paver
						_doPaver.call(t);
					}
				};

			// Merge defaults into options, into dataset
			var settings = $.extend({}, defaults, options, $(this.element).data());

			// Wait for gyroscopic data
			$.when(_check.hasGyroscope()).then(function(gyroData) {

				if(typeof gyroData !== typeof undefined && settings.tilt === true) {
					_paverGyroData.yes(gyroData);
				} else {
					_paverGyroData.no();				
				}

			}, function(gyroData) {

				_paverGyroData.no();
			});

			// Return
			return t;
		};

})( jQuery, window, document );
