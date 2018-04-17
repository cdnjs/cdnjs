/*! UIkit 3.0.0-beta.42 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikitparallax', factory) :
	(global.UIkitParallax = factory());
}(this, (function () { 'use strict';

function plugin$2(UIkit) {

    if (plugin$2.installed) {
        return;
    }

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var css = util.css;
    var Dimensions = util.Dimensions;
    var each = util.each;
    var getImage = util.getImage;
    var includes = util.includes;
    var isNumber = util.isNumber;
    var isUndefined = util.isUndefined;
    var toFloat = util.toFloat;

    var props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity'];

    mixin.parallax = {

        props: props.reduce(function (props, prop) {
            props[prop] = 'list';
            return props;
        }, {
            media: 'media'
        }),

        defaults: props.reduce(function (defaults, prop) {
            defaults[prop] = undefined;
            return defaults;
        }, {
            media: false
        }),

        computed: {

            props: function props$1(properties, $el) {
                var this$1 = this;


                return props.reduce(function (props, prop) {

                    if (isUndefined(properties[prop])) {
                        return props;
                    }

                    var isColor = prop.match(/color/i);
                    var isCssProp = isColor || prop === 'opacity';

                    var pos, bgPos, diff;
                    var steps = properties[prop].slice(0);

                    if (isCssProp) {
                        css($el, prop, '');
                    }

                    if (steps.length < 2) {
                        steps.unshift((prop === 'scale'
                            ? 1
                            : isCssProp
                                ? css($el, prop)
                                : 0) || 0);
                    }

                    var unit = includes(steps.join(''), '%') ? '%' : 'px';

                    if (isColor) {

                        var ref = $el.style;
                        var color = ref.color;
                        steps = steps.map(function (step) { return parseColor($el, step); });
                        $el.style.color = color;

                    } else {

                        steps = steps.map(toFloat);

                    }

                    if (prop.match(/^bg/)) {

                        css($el, ("background-position-" + (prop[2])), '');
                        bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

                        if (this$1.covers) {

                            var min = Math.min.apply(Math, steps);
                            var max = Math.max.apply(Math, steps);
                            var down = steps.indexOf(min) < steps.indexOf(max);

                            diff = max - min;

                            steps = steps.map(function (step) { return step - (down ? min : max); });
                            pos = (down ? -diff : 0) + "px";

                        } else {

                            pos = bgPos;

                        }
                    }

                    props[prop] = {steps: steps, unit: unit, pos: pos, bgPos: bgPos, diff: diff};

                    return props;

                }, {});

            },

            bgProps: function bgProps() {
                var this$1 = this;

                return ['bgx', 'bgy'].filter(function (bg) { return bg in this$1.props; });
            },

            covers: function covers$1(_, $el) {
                return covers($el);
            }

        },

        disconnected: function disconnected() {
            delete this._image;
        },

        update: [

            {

                read: function read(data) {
                    var this$1 = this;


                    data.active = !this.media || window.matchMedia(this.media).matches;

                    if (data.image) {
                        data.image.dimEl = {
                            width: this.$el.offsetWidth,
                            height: this.$el.offsetHeight
                        };
                    }

                    if ('image' in data || !this.covers || !this.bgProps.length) {
                        return;
                    }

                    var src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

                    if (!src) {
                        return;
                    }

                    data.image = false;

                    getImage(src).then(function (img) {
                        data.image = {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        };

                        this$1.$emit();
                    });

                },

                write: function write(ref) {
                    var this$1 = this;
                    var image = ref.image;
                    var active = ref.active;


                    if (!image) {
                        return;
                    }

                    if (!active) {
                        css(this.$el, {backgroundSize: '', backgroundRepeat: ''});
                        return;
                    }

                    var dimEl = image.dimEl;

                    var dim = Dimensions.cover(image, dimEl);

                    this.bgProps.forEach(function (prop) {

                        var ref = this$1.props[prop];
                        var diff = ref.diff;
                        var bgPos = ref.bgPos;
                        var steps = ref.steps;
                        var attr = prop === 'bgy' ? 'height' : 'width';
                        var span = dim[attr] - dimEl[attr];

                        if (!bgPos.match(/%$|0px/)) {
                            return;
                        }

                        if (span < diff) {
                            dimEl[attr] = dim[attr] + diff - span;
                        } else if (span > diff) {

                            var bgPosFloat = parseFloat(bgPos);

                            if (bgPosFloat) {
                                this$1.props[prop].steps = steps.map(function (step) { return step - (span - diff) / (100 / bgPosFloat); });
                            }
                        }

                        dim = Dimensions.cover(image, dimEl);
                    });

                    css(this.$el, {
                        backgroundSize: ((dim.width) + "px " + (dim.height) + "px"),
                        backgroundRepeat: 'no-repeat'
                    });

                },

                events: ['load', 'resize']

            }

        ],

        methods: {

            reset: function reset() {
                var this$1 = this;

                each(this.getCss(0), function (_, prop) { return css(this$1.$el, prop, ''); });
            },

            getCss: function getCss(percent) {

                var ref = this;
                var props = ref.props;
                var translated = false;

                return Object.keys(props).reduce(function (css, prop) {

                    var ref = props[prop];
                    var steps = ref.steps;
                    var unit = ref.unit;
                    var pos = ref.pos;
                    var value = getValue(steps, percent);

                    switch (prop) {

                        // transforms
                        case 'x':
                        case 'y':

                            if (translated) {
                                break;
                            }

                            var ref$1 = ['x', 'y'].map(function (dir) { return prop === dir
                                ? value + unit
                                : props[dir]
                                    ? getValue(props[dir].steps, percent) + props[dir].unit
                                    : 0; }
                            );
                    var x = ref$1[0];
                    var y = ref$1[1];

                            translated = css.transform += " translate3d(" + x + ", " + y + ", 0)";
                            break;
                        case 'rotate':
                            css.transform += " rotate(" + value + "deg)";
                            break;
                        case 'scale':
                            css.transform += " scale(" + value + ")";
                            break;

                        // bg image
                        case 'bgy':
                        case 'bgx':
                            css[("background-position-" + (prop[2]))] = "calc(" + pos + " + " + (value + unit) + ")";
                            break;

                        // color
                        case 'color':
                        case 'backgroundColor':
                        case 'borderColor':

                            var ref$2 = getStep(steps, percent);
                    var start = ref$2[0];
                    var end = ref$2[1];
                    var p = ref$2[2];

                            css[prop] = "rgba(" + (start.map(function (value, i) {
                                    value = value + p * (end[i] - value);
                                    return i === 3 ? toFloat(value) : parseInt(value, 10);
                                }).join(',')) + ")";
                            break;

                        // CSS Filter
                        case 'blur':
                            css.filter += " blur(" + value + "px)";
                            break;
                        case 'hue':
                            css.filter += " hue-rotate(" + value + "deg)";
                            break;
                        case 'fopacity':
                            css.filter += " opacity(" + value + "%)";
                            break;
                        case 'grayscale':
                        case 'invert':
                        case 'saturate':
                        case 'sepia':
                            css.filter += " " + prop + "(" + value + "%)";
                            break;

                        default:
                            css[prop] = value;
                    }

                    return css;

                }, {transform: '', filter: ''});

            }

        }

    };

    function parseColor(el, color) {
        return css(css(el, 'color', color), 'color').split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(function (n) { return toFloat(n); });
    }

    function getStep(steps, percent) {
        var count = steps.length - 1;
        var index = Math.min(Math.floor(count * percent), count - 1);
        var step = steps.slice(index, index + 2);

        step.push(percent === 1 ? 1 : percent % (1 / count) * count);

        return step;
    }

    function getValue(steps, percent) {
        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return (isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end
        ).toFixed(2);
    }

    function covers(el) {
        var ref = el.style;
        var backgroundSize = ref.backgroundSize;
        var covers = css(css(el, 'backgroundSize', ''), 'backgroundSize') === 'cover';
        el.style.backgroundSize = backgroundSize;
        return covers;
    }

}

if (!false && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin$2);
}

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    UIkit.use(plugin$2);

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var clamp = util.clamp;
    var css = util.css;
    var scrolledOver = util.scrolledOver;
    var query = util.query;

    UIkit.component('parallax', {

        mixins: [mixin.parallax],

        props: {
            target: String,
            viewport: Number,
            easing: Number,
        },

        defaults: {
            target: false,
            viewport: 1,
            easing: 1,
        },

        computed: {

            target: function target(ref, $el) {
                var target = ref.target;

                return target && query(target, $el) || $el;
            }

        },

        update: [

            {

                read: function read(ref) {
                    var percent = ref.percent;

                    return {
                        prev: percent,
                        percent: ease(scrolledOver(this.target) / (this.viewport || 1), this.easing)
                    };
                },

                write: function write(ref, ref$1) {
                    var prev = ref.prev;
                    var percent = ref.percent;
                    var active = ref.active;
                    var type = ref$1.type;


                    if (type !== 'scroll') {
                        prev = false;
                    }

                    if (!active) {
                        this.reset();
                        return;
                    }

                    if (prev !== percent) {
                        css(this.$el, this.getCss(percent));
                    }

                },

                events: ['scroll', 'load', 'resize']
            }

        ]

    });

    function ease(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)));
    }

}

if (!false && typeof window !== 'undefined' && window.UIkit) {
    window.UIkit.use(plugin);
}

return plugin;

})));
