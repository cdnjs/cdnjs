/*
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars
 *
 * @author https://github.com/kottenator
 * @version 0.5.2
 */

// Renamed ease-in-out-cubic
$.easing.circleProgressEase = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

// Default options
$.circleProgress = {
    defaults: {
        value: 0,
        size: 100,
        startAngle: -Math.PI,
        thickness: 'auto', // by default it's 1/14 of the size, but you may set it explicitly in px
        fill: {
            gradient: ['#3aeabb', '#fdd250'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
        },
        animation: {
            duration: 1200,
            easing: 'circleProgressEase' // equal to EaseInOutCubic
        }
    }
};

/**
 * Draw animated circular progress bar.
 *
 * Appends <canvas> to the element or updates already appended one.
 *
 * If animated, throws 3 events:
 *
 *   - circle-animation-start(event)
 *   - circle-animation-progress(event, progress) - multiple; progress: from 0.0 to 1.0
 *   - circle-animation-end(event)
 *
 * @param options Example: { value: 0.75, size: 50, animation: false };
 *                you may set any of default options;
 *                `animation` may be set to false;
 *                you may also use .circleProgress('widget') to get the canvas
 */
$.fn.circleProgress = function(options) {
    if (options == 'widget')
        return this.data('circle-progress');

    options = $.extend({}, $.circleProgress.defaults, options);

    return this.each(function() {
        var el = $(this),
            s = options.size,        // square size
            v = options.value,       // current value: from 0.0 to 1.0
            sa = options.startAngle, // start angle, radians
            r = s / 2,               // radius
            t = s / 14;              // thickness

        if ($.isNumeric(options.thickness))
            t = options.thickness;

        // Prepare canvas
        var canvas = el.data('circle-progress');

        if (!canvas) {
            canvas = $('<canvas>').prependTo(el)[0];
            el.data('circle-progress', canvas);
        }

        canvas.width = s;
        canvas.height = s;
        var ctx = canvas.getContext('2d');

        var arcFill = 'rgba(0, 0, 0, .5)';
        var circleFill = 'rgba(0, 0, 0, .1)';
        var imageFill;

        if (options.fill) {
            if (options.fill.color) {
                arcFill = options.fill.color;
            }

            if (options.fill.gradient) {
                var gr = options.fill.gradient;
                if (gr.length == 1) {
                    arcFill = gr[0];
                } else if (gr.length > 1) {
                    var lg = ctx.createLinearGradient(0, 0, s, 0);
                    for (var i = 0; i < gr.length; i++)
                        lg.addColorStop(i / (gr.length - 1), gr[i]);
                    arcFill = lg;
                }
            }

            if (options.fill.image) {
                var img = new Image();
                img.src = options.fill.image;
                img.onload = function() {
                    imageFill = img;
                }
            }
        }

        // Draw circle
        if (options.animation)
            _drawAnimated(v);
        else
            _draw(v);

        function _draw(p) {
            ctx.save();

            // Clear frame
            ctx.clearRect(0, 0, s, s);

            // Draw background first
            if (imageFill) {
                ctx.drawImage(imageFill, 0, 0, s, s);
            } else {
                ctx.fillStyle = arcFill;
                ctx.fillRect(0, 0, s, s);
            }

            // Draw progress arc, using compositions instead of clipping -
            // specially for Chrome, which doesn't anti-alias clipping path
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(r, r, r, sa, sa + Math.PI * 2 * p);
            ctx.arc(r, r, r - t, sa + Math.PI * 2 * p, sa, true);
            ctx.closePath();
            ctx.fill();

            // Draw background circle
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = circleFill;
            ctx.beginPath();
            ctx.arc(r, r, r, -Math.PI, Math.PI);
            ctx.arc(r, r, r - t, Math.PI, -Math.PI, true);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        function _drawAnimated(v) {
            el.trigger('circle-animation-start');

            $(canvas).animate(
                {
                    value: v
                },
                $.extend({}, options.animation, {
                    step: function(p) {
                        _draw(p);
                        el.trigger('circle-animation-progress', [p / v, p]);
                    },

                    complete: function() {
                        el.trigger('circle-animation-end');
                    }
                })
            );
        }
    });
};
