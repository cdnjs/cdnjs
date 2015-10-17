/* jQuery.twinkle 0.8.0 - http://larsjung.de/jquery-twinkle/ */
(function () {
'use strict';

var $ = jQuery;

var defaults = {
        widthRatio: 0.5,
        heightRatio: 0.5,
        delay: 0,
        gap: 0,
        effect: 'splash',
        effectOptions: undefined,
        callback: undefined
    };

var stopDefaults = {
        id: undefined,
        effectOptions: undefined,
        callback: undefined
    };


function TwinkleEvent(offX, offY, element, posX, posY) {

    this.offset = {left: offX, top: offY};
    this.element = element;
    this.position = {left: posX, top: posY};
}


function StopEvent(element) {

    this.element = element;
}


function Twinkler() {

    var effects = {};
    var running = {}; // element => {id: handle}

    function effectStarted(element, id, handle) {}
    function effectStopped(element, id) {}

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

        var settings = $.extend({}, defaults, options);
        var effect = effects[settings.effect];

        if (effect) {
            event.element = event.element || 'body';
            effect.run(event, settings.effectOptions, function () {

                if ($.isFunction(settings.callback)) {
                    settings.callback();
                }
            });
        }
        return this;
    };

    this.stop = function (event, options) {

        var settings = $.extend({}, stopDefaults, options);
        var effect = effects[settings.effect];

        if (effect) {
            event.element = event.element || 'body';
            effect.stop(event, settings.effectOptions, settings.callback);
        }
        return this;
    };

    this.twinkleAtElement = function (htmlElement, options) {

        var settings = $.extend({}, defaults, options);
        var $htmlElement = $(htmlElement);
        var offset = $htmlElement.offset();
        var position = $htmlElement.position();
        var width = $htmlElement.outerWidth(true);
        var height = $htmlElement.outerHeight(true);
        var offX = offset.left + width * settings.widthRatio;
        var offY = offset.top + height * settings.heightRatio;
        var posX = position.left + width * settings.widthRatio;
        var posY = position.top + height * settings.heightRatio;

        return this.twinkle(new TwinkleEvent(offX, offY, htmlElement, posX, posY), options);
    };

    this.twinkleAtElements = function (htmlElements, options) {

        var self = this;
        var settings = $.extend({}, defaults, options);
        var delay = settings.delay;
        var $htmlElements = $(htmlElements);
        var size = $htmlElements.size();

        $htmlElements.each(function (idx) {

            var htmlElement = this;
            var opts = $.extend({}, options);

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

        var settings = $.extend({}, defaults, options);
        var $htmlElement = $(htmlElement);
        var offset = $htmlElement.offset();
        var position = $htmlElement.position();
        var width = $htmlElement.outerWidth(true);
        var height = $htmlElement.outerHeight(true);
        var offX = offset.left + width * settings.widthRatio;
        var offY = offset.top + height * settings.heightRatio;
        var posX = position.left + width * settings.widthRatio;
        var posY = position.top + height * settings.heightRatio;

        return this.twinkle(new TwinkleEvent(offX, offY, htmlElement, posX, posY), options);
    };

    this.stopAtElements = function (htmlElements, options) {

        var self = this;
        var settings = $.extend({}, stopDefaults, options);
        var delay = settings.delay;
        var $htmlElements = $(htmlElements);
        var size = $htmlElements.size();

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
}



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


var twinkler = new Twinkler();
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

}());

(function () {
'use strict';
/* CSS Effects */

var $ = jQuery;

function blockEvents(event) {

    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
}

function animation(css, event, settings, callback) {

    var $dot;

    function cleanUp() {

        $dot.remove();
        if (callback instanceof Function) {
            callback();
        }
    }

    function fadeOut() {

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
    }

    function fadeIn() {

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
    }

    function stop() {}

    fadeIn();

    return {
        stop: stop
    };
}

var splashDefaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 300,
        duration: 1000
    };

function SplashEffect() {

    this.id = 'splash-css';

    this.run = function (event, options, callback) {

        var settings = $.extend({}, splashDefaults, options);
        var css = {
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
}

var dropsDefaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 300,
        duration: 1000,
        width: 2,
        count: 3,
        delay: 300
    };

function DropsEffect() {

    this.id = 'drops-css';

    this.run = function (event, options, callback) {

        var settings = $.extend({}, dropsDefaults, options);
        var css = {
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
            };

        function setTimer(delay, callback) {
            setTimeout(function () {
                animation(css, event, settings, callback);
            }, delay);
        }

        var delay = 0;
        var i;

        for (i = 0; i < settings.count; i += 1) {
            setTimer(delay, i === settings.count - 1 ? callback : undefined);
            delay += settings.delay;
        }
    };
}

function DropEffect() {

    var drops = new DropsEffect();

    this.id = 'drop-css';

    this.run = function (event, options, callback) {

        drops.run(event, $.extend(options, { count: 1 }), callback);
    };
}

$.twinkle.add(new SplashEffect()).add(new DropEffect()).add(new DropsEffect());

}());

(function () {
'use strict';
/* Canvas Effects */

var $ = jQuery;
var Objects = {};

(function () {

function Interpolator(values) {

    var points;

    function equiDist(values) {

        var dist = 1 / (values.length - 1);
        var points = [];
        var i;

        for (i = 0; i < values.length; i += 1) {
            points.push({ x: dist * i , y: values[i] });
        }
        return points;
    }

    function interpolate(p1, p2, x) {

        var m = (p2.y - p1.y) / (p2.x - p1.x);
        var y = p1.y + m * (x - p1.x);

        return y;
    }

    function findSection(x) {

        var i, prev, current;

        for (i = 1; i < points.length; i += 1) {
            prev = points[i-1];
            current = points[i];
            if (x >= prev.x && x <= current.x) {
                return [ prev, current ];
            }
        }

        return undefined;
    }

    points = equiDist(values);

    this.get = function (x) {

        var secPts;

        x = Math.max(0, Math.min(1, x));
        secPts = findSection(x);
        return interpolate(secPts[0], secPts[1], x);
    };
}

function scaleit(x, scale, offset) {

    scale = scale || 1;
    offset = offset || 0;
    x = (x - offset) / scale;
    return x >= 0 && x <= 1 ? x : undefined;
}

Objects.Interpolator = Interpolator;
Objects.Interpolator.scale =  scaleit;

}());

(function () {

var $ = jQuery;

function Path(ctx) {

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
}

function Ctx(context) {

    if (!context || !context.canvas) {
        return undefined;
    } else if (!(this instanceof Ctx)) {
        return new Ctx(context);
    }

    var width = $(context.canvas).width();
    var height = $(context.canvas).height();

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
}

Objects.Ctx = Ctx;

}());

(function () {

function CanvasEffect(twinkleEvent, width, height, frame, callback) {

    if (!(this instanceof Objects.CanvasEffect)) {
        return new Objects.CanvasEffect(twinkleEvent, width, height, frame, callback);
    }

    var element = twinkleEvent.element;
    var x = twinkleEvent.position.left;
    var y = twinkleEvent.position.top;
    var css = {
            position: 'absolute',
            zIndex: 1000,
            display: 'block',
            left: x - width * 0.5,
            top: y - height * 0.5,
            width: width,
            height: height
        };

    this.run = function (duration, fps) {

        var $canvas, ctx, i;
        var frameCount = duration / 1000 * fps;
        var delta = 1 / frameCount;

        function setFrameTimer(fraction) {

            setTimeout(function () {

                if (ctx) {
                    frame({
                        ctx: ctx,
                        frac: fraction,
                        millis: duration * fraction
                    });
                }
            }, duration * fraction);
        }

        function cleanUp() {

            $canvas.remove();
            $canvas = undefined;
            ctx = undefined;
            if (callback instanceof Function) {
                callback();
            }
        }

        function blockEvents(event) {

            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }

        $canvas = jQuery('<canvas />').attr('width', width).attr('height', height).css(css);
        jQuery(element).after($canvas);
        $canvas.bind('click dblclick mousedown mouseenter mouseover mousemove', blockEvents);
        ctx = new Objects.Ctx($canvas.get(0).getContext('2d'));

        for (i = 0; i <= frameCount; i += 1) {
            setFrameTimer(i * delta);
        }

        setTimeout(cleanUp, duration);
    };
}

Objects.CanvasEffect = CanvasEffect;

}());

(function () {

var $ = jQuery;

var defaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 300,
        duration: 1000
    };

function SplashEffect() {

    this.id = 'splash';

    this.run = function (twinkleEvent, options, callback) {

        var settings = $.extend({}, defaults, options);
        var size = settings.radius * 2;
        var opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]);
        var radiusIpl = new Objects.Interpolator([ 0, settings.radius ]);

        function frame(frameEvent) {

            var radius = radiusIpl.get(frameEvent.frac);
            var opacity = opacityIpl.get(frameEvent.frac);
            var ctx = frameEvent.ctx;

            ctx
                .clear()
                .opacity(opacity)
                .path()
                .circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
                .fill(settings.color);
        }

        new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
    };
}

$.twinkle.add(new SplashEffect());

}());

(function () {

var $ = jQuery;

var defaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 300,
        duration: 1000,
        width: 2
    };

function DropEffect() {

    this.id = 'drop';

    this.run = function (twinkleEvent, options, callback) {

        var settings = $.extend({}, defaults, options);
        var size = settings.radius * 2;
        var opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]);
        var radiusIpl = new Objects.Interpolator([ 0, settings.radius ]);

        function frame(frameEvent) {

            var radius = radiusIpl.get(frameEvent.frac);
            var opacity = opacityIpl.get(frameEvent.frac);
            var ctx = frameEvent.ctx;

            ctx
                .clear()
                .opacity(opacity)
                .path()
                .circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
                .stroke(settings.width, settings.color);
        }

        new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
    };
}

$.twinkle.add(new DropEffect());

}());

(function () {

var $ = jQuery;

var defaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 300,
        duration: 1000,
        width: 2,
        count: 3,
        delay: 100
    };

function DropsEffect() {

    this.id = 'drops';

    this.run = function (twinkleEvent, options, callback) {

        var settings = $.extend({}, defaults, options);
        var size = settings.radius * 2;
        var opacityIpl = new Objects.Interpolator([ 0.4, 1, 0 ]);
        var radiusIpl = new Objects.Interpolator([ 0, settings.radius ]);
        var scale = (settings.duration - (settings.count - 1) * settings.delay) / settings.duration;
        var offset = settings.delay / settings.duration;

        function frame(frameEvent) {

            var i, frac, radius, opacity;
            var ctx = frameEvent.ctx;
            var width = ctx.getWidth();
            var height = ctx.getHeight();

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
        }

        new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
    };
}

$.twinkle.add(new DropsEffect());

}());

(function () {

var $ = jQuery;

var defaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 100,
        duration: 3000
    };

function PulseEffect() {

    this.id = 'pulse';

    this.run = function (twinkleEvent, options, callback) {

        var settings = $.extend({}, defaults, options);
        var size = settings.radius * 2;
        var opacityIpl = new Objects.Interpolator([ 0, 1, 0.6, 1, 0.6, 1, 0 ]);
        var radiusIpl = new Objects.Interpolator([ 0, settings.radius, settings.radius * 0.6, settings.radius, settings.radius * 0.6, settings.radius, 0 ]);

        function frame(frameEvent) {

            var radius = radiusIpl.get(frameEvent.frac),
                opacity = opacityIpl.get(frameEvent.frac),
                ctx = frameEvent.ctx;

            ctx
                .clear()
                .opacity(opacity)
                .path()
                .circle(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5, radius)
                .fill(settings.color);
        }

        new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
    };
}

$.twinkle.add(new PulseEffect());

}());

(function () {

var $ = jQuery;

var defaults = {
        color: 'rgba(255,0,0,0.5)',
        radius: 100,
        duration: 3000,
        satellites: 10,
        satellitesRadius: 10,
        circulations: 1.5
    };

function OrbitEffect() {

    this.id = 'orbit';

    this.run = function (twinkleEvent, options, callback) {

        var settings = $.extend({}, defaults, options);
        var size = settings.radius * 2;
        var opacityIpl = new Objects.Interpolator([ 0.4, 1, 1, 0.4 ]);
        var r = settings.radius - settings.satellitesRadius;
        var radiusIpl = new Objects.Interpolator([ 0, r, r, 0 ]);

        function frame(frameEvent) {

            var radius = radiusIpl.get(frameEvent.frac);
            var opacity = opacityIpl.get(frameEvent.frac);
            var bog = Math.PI * 2 * settings.circulations * frameEvent.frac;
            var ctx = frameEvent.ctx;
            var path, i, x, y;

            ctx
                .clear()
                .opacity(opacity)
                .translate(ctx.getWidth() * 0.5, ctx.getHeight() * 0.5);

            path = ctx.path();
            for (i = 0; i < settings.satellites; i += 1) {
                bog += Math.PI * 2 / settings.satellites;
                x = Math.cos(bog) * radius;
                y = Math.sin(bog) * radius;
                ctx.getContext().moveTo(x, y);
                path.circle(x, y, settings.satellitesRadius);
            }
            path.fill(settings.color);
        }

        new Objects.CanvasEffect(twinkleEvent, size, size, frame, callback).run(settings.duration, 25);
    };
}

$.twinkle.add(new OrbitEffect());

}());

}());

