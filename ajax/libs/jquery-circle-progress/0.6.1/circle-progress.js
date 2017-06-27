/*
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars
 *
 * @author https://github.com/kottenator
 * @version 0.6.1
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
         * Should we start animation from 0.0 to value (direct) or from 1.0 to value (reversed)?
         * By default - from 0.0 to value (direct)
         * @type {bool}
         */
        reversedAnimation: false
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
 * @param options Example: { value: 0.75, size: 50, animation: false };
 *                you may set any of default options (see above);
 *                `animation` may be set to false;
 *                you may also use .circleProgress('widget') to get the canvas
 */
$.fn.circleProgress = function(options) {
    if (options == 'widget')
        return this.data('circle-progress');

    options = $.extend({}, $.circleProgress.defaults, options);

    return this.each(function() {
        var el = $(this),
            size = options.size,
            radius = size / 2,
            thickness = size / 14,
            value = options.value,
            startAngle = options.startAngle,
            emptyArcFill = options.emptyFill,
            reversedAnimation = options.reversedAnimation,
            arcFill;

        if ($.isNumeric(options.thickness))
            thickness = options.thickness;

        // Prepare canvas
        var canvas = el.data('circle-progress');

        if (!canvas) {
            canvas = $('<canvas>').prependTo(el)[0];
            el.data('circle-progress', canvas);
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

        function drawAnimated(v) {
            el.trigger('circle-animation-start');

            $(canvas).css({ progress: 0 }).animate({ progress: reversedAnimation ? 1 - v : v },
                $.extend({}, options.animation, {
                    step: function(p) {
                        var animationProgress = reversedAnimation ? p / (1 - v) : p / v,
                            stepValue = reversedAnimation ? 1 - p : p;

                        draw(stepValue);

                        el.trigger('circle-animation-progress', [animationProgress, stepValue]);
                    },

                    complete: function() {
                        el.trigger('circle-animation-end');
                    }
                })
            );
        }
    });
};
