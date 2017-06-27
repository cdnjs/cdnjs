/*
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars
 *
 * @author https://github.com/kottenator
 * @version 0.7.0
 */

$.circleProgress = {
    // Default options (you may override them)
    defaults: {
        /**
         * This is the only required option. It should be from 0.0 to 1.0
         * @type {float}
         */
        value: 0,

        /**
         * Size of the circle / canvas in pixels
         * @type {int}
         */
        size: 100,

        /**
         * Initial angle for 0.0 value in radians
         * @type {float}
         */
        startAngle: -Math.PI,

        /**
         * Width of the arc. By default it's calculated as 1/14 of size, but you may set it explicitly in pixels
         * type {int|'auto'}
         */
        thickness: 'auto',

        /**
         * Fill of the arc. You may set it to:
         *   - solid color:
         *     - { color: '#3aeabb' }
         *     - { color: 'rgba(255, 255, 255, .3)' }
         *   - linear gradient (left to right):
         *     - { gradient: ['#3aeabb', '#fdd250'] }
         *     - { gradient: ['red', 'green', 'blue'] }
         *   - image:
         *     - { image: 'http://i.imgur.com/pT0i89v.png' }
         *     - { color: 'lime', image: 'http://i.imgur.com/pT0i89v.png' } - color displayed until the image is loaded
         */
        fill: {
            gradient: ['#3aeabb', '#fdd250']
        },

        /**
         * Color of the "empty" arc. Only a color fill supported by now
         * @type {string}
         */
        emptyFill: 'rgba(0, 0, 0, .1)',

        /**
         * Animation config (see jQuery animations: http://api.jquery.com/animate/)
         */
        animation: {
            duration: 1200,
            easing: 'circleProgressEasing'
        },

        /**
         * Default animation starts at 0.0 and ends at specified `value`. Let's call this direct animation.
         * If you want to make reversed animation then you should set `animationStartValue` to 1.0.
         * Also you may specify any other value from 0.0 to 1.0
         * @type {float}
         */
        animationStartValue: 0.0
    }
};

// Renamed ease-in-out-cubic
$.easing.circleProgressEasing = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

/**
 * Draw animated circular progress bar.
 *
 * Appends <canvas> to the element or updates already appended one.
 *
 * If animated, throws 3 events:
 *
 *   - circle-animation-start(jqEvent)
 *   - circle-animation-progress(jqEvent, animationProgress, stepValue) - multiple event;
 *                                                                        animationProgress: from 0.0 to 1.0;
 *                                                                        stepValue: from 0.0 to value
 *   - circle-animation-end(jqEvent)
 *
 * @param config Example: { value: 0.75, size: 50, animation: false };
 *                you may set any of default options (see above);
 *                `animation` may be set to false;
 *                you may also use .circleProgress('widget') to get the canvas
 */
$.fn.circleProgress = function(config) {
    if (typeof config == 'string' && config != 'widget' && config != 'redraw')
        throw Error("Only 2 commands supported: 'widget' and 'redraw'");

    if (config == 'widget')
        return this.data('circle-progress').widget;

    return this.each(function() {
        var el = $(this);

        // Get/init data object
        var dataName = 'circle-progress',
            data = el.data(dataName);

        if (!data) {
            data = {
                options: null,
                widget: null
            };

            el.data(dataName, data);
        }

        // Get/init options
        var options;

        if (typeof config == 'undefined' || config == 'redraw') {
            options = data.options;
        } else {
            options = $.extend({}, $.circleProgress.defaults, config);
            data.options = options;
        }

        var size = options.size,
            radius = size / 2,
            thickness = size / 14,
            value = options.value,
            startAngle = options.startAngle,
            emptyArcFill = options.emptyFill,
            animationStartValue = options.animationStartValue,
            arcFill;

        if ($.isNumeric(options.thickness))
            thickness = options.thickness;

        // Prepare canvas
        var canvas = data.widget;

        if (!canvas) {
            canvas = $('<canvas>').prependTo(el)[0];
            data.widget = canvas;
        }

        canvas.width = size;
        canvas.height = size;

        var ctx = canvas.getContext('2d');

        if (!options.fill)
            throw Error("The fill is not specified!");

        if (options.fill.color)
            arcFill = options.fill.color;

        if (options.fill.gradient) {
            var gr = options.fill.gradient;
            if (gr.length == 1) {
                arcFill = gr[0];
            } else if (gr.length > 1) {
                var lg = ctx.createLinearGradient(0, 0, size, 0);
                for (var i = 0; i < gr.length; i++)
                    lg.addColorStop(i / (gr.length - 1), gr[i]);
                arcFill = lg;
            }
        }

        if (options.fill.image) {
            var img = new Image();
            img.src = options.fill.image;
            img.onload = function() {
                var bg = $('<canvas>')[0];
                bg.width = size;
                bg.height = size;
                bg.getContext('2d').drawImage(img, 0, 0, size, size);
                arcFill = ctx.createPattern(bg, 'no-repeat');

                // we need to redraw the arc when there is no animation
                if (!options.animation)
                    draw(value);
            }
        }

        if (options.animation)
            drawAnimated(value);
        else
            draw(value);

        function draw(v) {
            ctx.clearRect(0, 0, size, size);
            drawArc(v);
            drawEmptyArc(v);
        }

        function drawArc(v) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius, radius, radius - thickness / 2, startAngle, startAngle + Math.PI * 2 * v);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = arcFill;
            ctx.stroke();
            ctx.restore();
        }

        function drawEmptyArc(v) {
            ctx.save();
            if (v < 1) {
                ctx.beginPath();
                if (v <= 0)
                    ctx.arc(radius, radius, radius - thickness / 2, 0, Math.PI * 2);
                else
                    ctx.arc(radius, radius, radius - thickness / 2, startAngle + Math.PI * 2 * v, startAngle);
                ctx.lineWidth = thickness;
                ctx.strokeStyle = emptyArcFill;
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawAnimated(value) {
            el.trigger('circle-animation-start');
            $(canvas).css({ animationProgress: 0 }).animate({ animationProgress: 1 }, $.extend({}, options.animation, {
                step: function(animationProgress) {
                    var stepValue = animationStartValue * (1 - animationProgress) + value * animationProgress;
                    draw(stepValue);
                    el.trigger('circle-animation-progress', [animationProgress, stepValue]);
                },
                complete: function() {
                    el.trigger('circle-animation-end');
                }
            }));
        }
    });
};
