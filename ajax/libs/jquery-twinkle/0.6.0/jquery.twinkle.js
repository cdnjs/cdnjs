/*! jQuery.fracs 0.6.0 - //larsjung.de/twinkle - MIT License */

(function ($) {
	'use strict';

	/*!
	modplug 1.0
	http://larsjung.de/modplug
	MIT License
	*/

	// This function is ment to be copied into your plugin file as a local
	// variable.
	//
	// `modplug` expects a string `namespace` and a configuration object
	// `options`.
	//
	//      options = {
	//          statics: hash of functions,
	//          methods: hash of functions,
	//          defaultStatic: String/function,
	//          defaultMethod: String/function
	//      }
	//
	// For more details see <http://larsjung.de/modplug>.
	var modplug = function (namespace, options) {
		'use strict';
		/*global jQuery: true */

			// Some references to enhance minification.
		var slice = [].slice,
			$ = jQuery,
			extend = $.extend,
			isFn = $.isFunction,

			// Save the initial settings.
			settings = extend({}, options),

			// Helper function to apply default methods.
			applyMethod = function (obj, args, methodName, methods) {

				// If `methodName` is a function apply it to get the actual
				// method name.
				methodName = isFn(methodName) ? methodName.apply(obj, args) : methodName;

				// If method exists then apply it and return the result ...
				if (isFn(methods[methodName])) {
					return methods[methodName].apply(obj, args);
				}

				// ... otherwise raise an error.
				$.error('Method "' + methodName + '" does not exist on jQuery.' + namespace);
			},

			// This function gets exposed as `$.<namespace>`.
			statics = function () {

				// Try to apply a default method.
				return applyMethod(this, slice.call(arguments), settings.defaultStatic, statics);
			},

			// This function gets exposed as `$(selector).<namespace>`.
			methods = function (method) {

				// If `method` exists then apply it ...
				if (isFn(methods[method])) {
					return methods[method].apply(this, slice.call(arguments, 1));
				}

				// ... otherwise try to apply a default method.
				return applyMethod(this, slice.call(arguments), settings.defaultMethod, methods);
			},

			// Adds/overwrites plugin methods. This function gets exposed as
			// `$.<namespace>.modplug` to make the plugin extendable.
			plug = function (options) {

				if (options) {
					extend(statics, options.statics);
					extend(methods, options.methods);
				}

				// Make sure that `$.<namespace>.modplug` points to this function
				// after adding new methods.
				statics.modplug = plug;
			};

		// Save objects or methods previously registered to the desired namespace.
		// They are available via `$.<namespace>.modplug.prev`.
		plug.prev = {
			statics: $[namespace],
			methods: $.fn[namespace]
		};

		// Init the plugin by adding the specified statics and methods.
		plug(options);

		// Register the plugin.
		$[namespace] = statics;
		$.fn[namespace] = methods;
	};


	var defaults = {
			widthRatio: 0.5,
			heightRatio: 0.5,
			delay: 0,
			gap: 0,
			effect: 'splash',
			effectOptions: undefined,
			callback: undefined
		},
		stopDefaults = {
			id: undefined,
			effectOptions: undefined,
			callback: undefined
		},
		TwinkleEvent = function (offX, offY, element, posX, posY) {

			this.offset = {left: offX, top: offY};
			this.element = element;
			this.position = {left: posX, top: posY};
		},
		StopEvent = function (element) {

			this.element = element;
		},
		Twinkler = function () {

			var effects = {},
				running = {}, // element => {id: handle}
				effectStarted = function (element, id, handle) {

				},
				effectStopped = function (element, id) {

				};

			this.add = function (effect) {

				if (!effects[effect.id]) {
					effects[effect.id] = effect;
				}
				return this;
			};

			this.remove = function (effect) {

				if (effects[effect]) {
					delete effects[effect];
				} else if (effect.id && effects[effect.id]) {
					delete effects[effect.id];
				}
				return this;
			};

			this.twinkle = function (event, options) {

				var settings = $.extend({}, defaults, options),
					effect = effects[settings.effect];

				if (effect) {
					event.element = event.element || 'body';
					effect.run(event, settings.effectOptions, function () {
						settings.callback();
					});
				}
				return this;
			};

			this.stop = function (event, options) {

				var settings = $.extend({}, stopDefaults, options),
					effect = effects[settings.effect];

				if (effect) {
					event.element = event.element || 'body';
					effect.stop(event, settings.effectOptions, settings.callback);
				}
				return this;
			};

			this.twinkleAtElement = function (htmlElement, options) {

				var settings = $.extend({}, defaults, options),
					$htmlElement = $(htmlElement),
					offset = $htmlElement.offset(),
					position = $htmlElement.position(),
					width = $htmlElement.outerWidth(true),
					height = $htmlElement.outerHeight(true),
					offX = offset.left + width * settings.widthRatio,
					offY = offset.top + height * settings.heightRatio,
					posX = position.left + width * settings.widthRatio,
					posY = position.top + height * settings.heightRatio;

				return this.twinkle(new TwinkleEvent(offX, offY, htmlElement, posX, posY), options);
			};

			this.twinkleAtElements = function (htmlElements, options) {

				var self = this,
					settings = $.extend({}, defaults, options),
					delay = settings.delay,
					$htmlElements = $(htmlElements),
					size = $htmlElements.size();

				$htmlElements.each(function (idx) {

					var htmlElement = this,
						opts = $.extend({}, options);

					if (idx !== size - 1) {
						delete opts.callback;
					}

					setTimeout(function () {
						self.twinkleAtElement(htmlElement, opts);
					}, delay);

					delay += settings.gap;
				});
				return this;
			};

			this.stopAtElement = function (htmlElement, options) {

				var settings = $.extend({}, defaults, options),
					$htmlElement = $(htmlElement),
					offset = $htmlElement.offset(),
					position = $htmlElement.position(),
					width = $htmlElement.outerWidth(true),
					height = $htmlElement.outerHeight(true),
					offX = offset.left + width * settings.widthRatio,
					offY = offset.top + height * settings.heightRatio,
					posX = position.left + width * settings.widthRatio,
					posY = position.top + height * settings.heightRatio;

				return this.twinkle(new TwinkleEvent(offX, offY, htmlElement, posX, posY), options);
			};

			this.stopAtElements = function (htmlElements, options) {

				var self = this,
					settings = $.extend({}, stopDefaults, options),
					delay = settings.delay,
					$htmlElements = $(htmlElements),
					size = $htmlElements.size();

				$htmlElements.each(function (idx) {

					var htmlElement = this,
						opts = $.extend({}, options);

					if (idx !== size - 1) {
						delete opts.callback;
					}

					self.stopAtElement(htmlElement, opts);
				});
				return this;
			};
		},
		twinkler = new Twinkler();

	modplug('twinkle', {
		statics: {
			twinkle: function (element, left, top, options) {

				twinkler.twinkle(new TwinkleEvent(0, 0, element, left, top), options);
				return this;
			},
			add: function (effect) {

				twinkler.add(effect);
				return this;
			},
			remove: function (effect) {

				twinkler.remove(effect);
				return this;
			}
		},
		methods: {
			twinkle: function (options) {

				twinkler.twinkleAtElements(this, options);
				return this;
			},
			stop: function (options) {

				twinkler.stopAtElements(this, options);
				return this;
			}
		},
		defaultStatic: 'twinkle',
		defaultMethod: 'twinkle'
	});

}(jQuery));

/*!
jQuery.twinkle 0.6.0
CSS Effects

MIT License
*/

(function ($) {
	'use strict';

	var blockEvents = function (event) {

			event.stopImmediatePropagation();
			event.preventDefault();
			return false;
		},
		animation = function (css, event, settings, callback) {

			var $dot,
				cleanUp = function () {
					$dot.remove();
					if (callback instanceof Function) {
						callback();
					}
				},
				fadeOut = function () {
					$dot.animate(
						{
							left: event.position.left - settings.radius,
							top: event.position.top - settings.radius,
							width: settings.radius * 2,
							height: settings.radius * 2,
							opacity: 0
						},
						settings.duration * 0.5,
						'linear',
						cleanUp
					);
				},
				fadeIn = function () {
					$dot = $('<div />')
							.css(css)
							.bind('click dblclick mousedown mouseenter mouseover mousemove', blockEvents);
					$(event.element).after($dot);
					$dot.animate(
						{
							left: event.position.left - settings.radius * 0.5,
							top: event.position.top - settings.radius * 0.5,
							width: settings.radius,
							height: settings.radius,
							opacity: 1
						},
						settings.duration * 0.5,
						'linear',
						fadeOut
					);
				},
				stop = function () {

				};

			fadeIn();

			return {
				stop: stop
			};
		},
		splashDefaults = {
			color: 'rgba(255,0,0,0.5)',
			radius: 300,
			duration: 1000
		},
		SplashEffect = function () {

			this.id = 'splash-css';

			this.run = function (event, options, callback) {

				var settings = $.extend({}, splashDefaults, options),
					css = {
						position: 'absolute',
						zIndex: 1000,
						display: 'block',
						borderRadius: settings.radius,
						backgroundColor: settings.color,
						boxShadow: '0 0 30px ' + settings.color,
						left: event.position.left,
						top: event.position.top,
						width: 0,
						height: 0,
						opacity: 0.4
					};

				animation(css, event, settings, callback);
			};
		},
		dropsDefaults = {
			color: 'rgba(255,0,0,0.5)',
			radius: 300,
			duration: 1000,
			width: 2,
			count: 3,
			delay: 300
		},
		DropsEffect = function () {

			this.id = 'drops-css';

			this.run = function (event, options, callback) {

				var settings = $.extend({}, dropsDefaults, options),
					css = {
						position: 'absolute',
						zIndex: 1000,
						display: 'block',
						borderRadius: settings.radius,
						border: settings.width + 'px solid ' + settings.color,
						left: event.position.left,
						top: event.position.top,
						width: 0,
						height: 0,
						opacity: 0.4
					},
					setTimer = function (delay, callback) {
						setTimeout(function () {
							animation(css, event, settings, callback);
						}, delay);
					},
					delay = 0,
					i;

				for (i = 0; i < settings.count; i += 1) {
					setTimer(delay, i === settings.count - 1 ? callback : undefined);
					delay += settings.delay;
				}
			};
		},
		DropEffect = function () {

			var drops = new DropsEffect();

			this.id = 'drop-css';

			this.run = function (event, options, callback) {

				drops.run(event, $.extend(options, { count: 1 }), callback);
			};
		};

	$.twinkle.add(new SplashEffect()).add(new DropEffect()).add(new DropsEffect());

}(jQuery));

/*!
jQuery.twinkle 0.6.0
Canvas Effects

MIT License
*/

(function ($) {
	'use strict';

	var Objects = {};

	Objects.Interpolator = function (values) {

		var points,
			equiDist = function (values) {

				var dist = 1 / (values.length - 1),
					points = [],
					i;

				for (i = 0; i < values.length; i += 1) {
					points.push({ x: dist * i , y: values[i] });
				}
				return points;
			},
			interpolate = function (p1, p2, x) {

				var m = (p2.y - p1.y) / (p2.x - p1.x),
					y = p1.y + m * (x - p1.x);

				return y;
			},
			findSection = function (x) {

				var i, prev, current;

				for (i = 1; i < points.length; i += 1) {

					prev = points[i-1];
					current = points[i];
					if (x >= prev.x && x <= current.x) {
						return [ prev, current ];
					}
				}
				return undefined;
			};

		points = equiDist(values);

		this.get = function (x) {

			var secPts;

			x = Math.max(0, Math.min(1, x));
			secPts = findSection(x);
			return interpolate(secPts[0], secPts[1], x);
		};

	};

	Objects.Interpolator.scale = function (x, scale, offset) {

		scale = scale || 1;
		offset = offset || 0;
		x = (x - offset) / scale;
		return x >= 0 && x <= 1 ? x : undefined;
	};

	(function () {

		var Path = function (ctx) {

			var context = ctx.getContext();

			context.beginPath();

			this.fill = function (fillStyle) {

				context.fillStyle = fillStyle;
				context.fill();
				return ctx;
			};

			this.stroke = function (lineWidth, strokeStyle) {

				context.lineWidth = lineWidth;
				context.strokeStyle = strokeStyle;
				context.stroke();
				return ctx;
			};

			this.draw = function (lineWidth, strokeStyle, fillStyle) {

				this.fill(fillStyle);
				this.stroke(lineWidth, strokeStyle);
				return ctx;
			};

			this.circle = function (x, y, radius) {

				context.arc(x, y, radius, 0, 2 * Math.PI, false);
				return this;
			};
		};

		Objects.Ctx = function (context) {

			if (!context || !context.canvas) {
				return undefined;
			} else if (!(this instanceof Objects.Ctx)) {
				return new Objects.Ctx(context);
			}

			var width = $(context.canvas).width(),
				height = $(context.canvas).height();

			this.getContext = function () {

				return context;
			};

			this.getWidth = function () {

				return width;
			};

			this.getHeight = function () {

				return height;
			};

			this.clear = function () {

				this.resetTransform();
				context.clearRect(0, 0, width, height);
				return this;
			};

			this.resetTransform = function () {

				context.setTransform(1, 0, 0, 1, 0, 0);
				return this;
			};

			this.translate = function (x, y) {

				context.translate(x, y);
				return this;
			};

			this.rotate = function (alpha) {

				context.rotate(Math.PI * alpha / 180);
				return this;
			};

			this.opacity = function (opacity) {

				context.globalAlpha = opacity;
				return this;
			};

			this.path = function () {

				return new Path(this);
			};
		};

	}());

	Objects.CanvasEffect = function (twinkleEvent, width, height, frame, callback) {

		if (!(this instanceof Objects.CanvasEffect)) {
			return new Objects.CanvasEffect(twinkleEvent, width, height, frame, callback);
		}

		var element = twinkleEvent.element,
			x = twinkleEvent.position.left,
			y = twinkleEvent.position.top,
			css = {
				position: 'absolute',
				zIndex: 1000,
				display: 'block',
				left: x - width * 0.5,
				top: y - height * 0.5,
				width: width,
				height: height
			};

		this.run = function (duration, fps) {

			var $canvas, ctx, i,
				frameCount = duration / 1000 * fps,
				delta = 1 / frameCount,
				setFrameTimer = function (fraction) {

					setTimeout(function () {

						if (ctx) {
							frame({
								ctx: ctx,
								frac: fraction,
								millis: duration * fraction
							});
						}
					}, duration * fraction);
				},
				cleanUp = function () {

					$canvas.remove();
					$canvas = undefined;
					ctx = undefined;
					if (callback instanceof Function) {
						callback();
					}
				},
				blockEvents = function (event) {

					event.stopImmediatePropagation();
					event.preventDefault();
					return false;
				};

			$canvas = $('<canvas />').attr('width', width).attr('height', height).css(css);
			$(element).after($canvas);
			$canvas.bind('click dblclick mousedown mouseenter mouseover mousemove', blockEvents);
			ctx = new Objects.Ctx($canvas.get(0).getContext('2d'));

			for (i = 0; i <= frameCount; i += 1) {
				setFrameTimer(i * delta);
			}

			setTimeout(cleanUp, duration);
		};
	};

	(function () {

		var defaults = {
				color: 'rgba(255,0,0,0.5)',
				radius: 300,
				duration: 1000
			},
			SplashEffect = function () {

				this.id = 'splash';

				this.run = function (twinkleEvent, options, callback) {

					var settings = $.extend({}, defaults, options),
						size = settings.radius * 2,
						opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]),
						radiusIpl = new Objects.Interpolator([ 0, settings.radius ]),
						frame = function (frameEvent) {

							var radius = radiusIpl.get(frameEvent.frac),
								opacity = opacityIpl.get(frameEvent.frac),
								ctx = frameEvent.ctx;

							ctx
								.clear()
								.opacity(opacity)
								.path()
								.circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
								.fill(settings.color);
						};

					new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
				};
			};

		$.twinkle.add(new SplashEffect());

	}());

	(function () {

		var defaults = {
				color: 'rgba(255,0,0,0.5)',
				radius: 300,
				duration: 1000,
				width: 2
			},
			DropEffect = function () {

				this.id = 'drop';

				this.run = function (twinkleEvent, options, callback) {

					var settings = $.extend({}, defaults, options),
						size = settings.radius * 2,
						opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]),
						radiusIpl = new Objects.Interpolator([ 0, settings.radius ]),
						frame = function (frameEvent) {

							var radius = radiusIpl.get(frameEvent.frac),
								opacity = opacityIpl.get(frameEvent.frac),
								ctx = frameEvent.ctx;

							ctx
								.clear()
								.opacity(opacity)
								.path()
								.circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
								.stroke(settings.width, settings.color);
						};

					new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
				};
			};

		$.twinkle.add(new DropEffect());

	}());

	(function () {

		var defaults = {
				color: 'rgba(255,0,0,0.5)',
				radius: 300,
				duration: 1000,
				width: 2,
				count: 3,
				delay: 100
			},
			DropsEffect = function () {

				this.id = 'drops';

				this.run = function (twinkleEvent, options, callback) {

					var settings = $.extend({}, defaults, options),
						size = settings.radius * 2,
						opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]),
						radiusIpl = new Objects.Interpolator([ 0, settings.radius ]),
						scale = (settings.duration - (settings.count - 1) * settings.delay) / settings.duration,
						offset = settings.delay / settings.duration,
						frame = function (frameEvent) {

							var i, frac, radius, opacity,
								ctx = frameEvent.ctx,
								width = ctx.getWidth(),
								height = ctx.getHeight();

							ctx.clear();
							for (i = 0; i < settings.count; i += 1) {
								frac = Objects.Interpolator.scale(frameEvent.frac, scale, offset * i);

								if (frac !== undefined) {
									radius = radiusIpl.get(frac);
									opacity = opacityIpl.get(frac);
									ctx
										.opacity(opacity)
										.path()
										.circle(width * 0.5, height * 0.5, radius)
										.stroke(settings.width, settings.color);
								}
							}
						};

					new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
				};
			};

		$.twinkle.add(new DropsEffect());

	}());

	(function () {

		var defaults = {
				color: 'rgba(255,0,0,0.5)',
				radius: 100,
				duration: 3000
			},
			PulseEffect = function () {

				this.id = 'pulse';

				this.run = function (twinkleEvent, options, callback) {

					var settings = $.extend({}, defaults, options),
						size = settings.radius * 2,
						opacityIpl = new Objects.Interpolator([ 0, 1, 0.6, 1, 0.6, 1, 0 ]),
						radiusIpl = new Objects.Interpolator([ 0, settings.radius, settings.radius * 0.6, settings.radius, settings.radius * 0.6, settings.radius, 0 ]),
						frame = function (frameEvent) {

							var radius = radiusIpl.get(frameEvent.frac),
								opacity = opacityIpl.get(frameEvent.frac),
								ctx = frameEvent.ctx;

							ctx
								.clear()
								.opacity(opacity)
								.path()
								.circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
								.fill(settings.color);
						};

					new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
				};
			};

		$.twinkle.add(new PulseEffect());

	}());

	(function () {

		var defaults = {
				color: 'rgba(255,0,0,0.5)',
				radius: 100,
				duration: 3000,
				satellites: 10,
				satellitesRadius: 10,
				circulations: 1.5
			},
			OrbitEffect = function () {

				this.id = 'orbit';

				this.run = function (twinkleEvent, options, callback) {

					var settings = $.extend({}, defaults, options),
						size = settings.radius * 2,
						opacityIpl = new Objects.Interpolator([ 0.4, 1, 1, 0.4 ]),
						r = settings.radius - settings.satellitesRadius,
						radiusIpl = new Objects.Interpolator([ 0, r, r, 0 ]),
						frame = function (frameEvent) {

							var radius = radiusIpl.get(frameEvent.frac),
								opacity = opacityIpl.get(frameEvent.frac),
								bog = Math.PI * 2 * settings.circulations * frameEvent.frac,
								ctx = frameEvent.ctx,
								path, i, x, y;

							ctx
								.clear()
								.opacity(opacity)
								.translate(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5);

							path = ctx.path();
							for (i = 0; i < settings.satellites; i += 1) {

								bog += Math.PI * 2 / settings.satellites;
								x = Math.cos(bog) * radius;
								y = Math.sin(bog) * radius;
								path.circle(x, y, settings.satellitesRadius);
							}
							path.fill(settings.color);
						};

					new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
				};
			};

		$.twinkle.add(new OrbitEffect());

	}());

}(jQuery));

