/*! UIkit 3.11.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslideshow_parallax', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlideshow_parallax = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Media = {

        props: {
            media: Boolean
        },

        data: {
            media: false
        },

        computed: {

            matchMedia: function() {
                var media = toMedia(this.media);
                return !media || window.matchMedia(media).matches;
            }

        }

    };

    function toMedia(value) {

        if (uikitUtil.isString(value)) {
            if (value[0] === '@') {
                var name = "breakpoint-" + (value.substr(1));
                value = uikitUtil.toFloat(uikitUtil.getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }

        return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false;
    }

    uikitUtil.memoize(function (src) { return new uikitUtil.Promise(function (resolve, reject) {

            if (!src) {
                reject();
                return;
            }

            if (uikitUtil.startsWith(src, 'data:')) {
                resolve(decodeURIComponent(src.split(',')[1]));
            } else {

                uikitUtil.ajax(src).then(
                    function (xhr) { return resolve(xhr.response); },
                    function () { return reject('SVG not found.'); }
                );

            }
        }); }
    );

    function getMaxPathLength(el) {
        return Math.ceil(Math.max.apply(Math, [ 0 ].concat( uikitUtil.$$('[stroke]', el).map(function (stroke) {
            try {
                return stroke.getTotalLength();
            } catch (e) {
                return 0;
            }
        }) )));
    }

    var props = {
        x: transformFn,
        y: transformFn,
        rotate: transformFn,
        scale: transformFn,
        color: colorFn,
        backgroundColor: colorFn,
        borderColor: colorFn,
        blur: filterFn,
        hue: filterFn,
        fopacity: filterFn,
        grayscale: filterFn,
        invert: filterFn,
        saturate: filterFn,
        sepia: filterFn,
        opacity: cssPropFn,
        stroke: strokeFn,
        bgx: backgroundFn,
        bgy: backgroundFn
    };

    var keys = Object.keys;

    var Parallax = {

        mixins: [Media],

        props: fillObject(keys(props), 'list'),

        data: fillObject(keys(props), undefined),

        computed: {

            props: function(properties, $el) {
                var this$1$1 = this;

                return keys(props).reduce(function (result, prop) {
                    if (!uikitUtil.isUndefined(properties[prop])) {
                        result[prop] = props[prop].call(this$1$1, prop, $el, properties[prop].slice());
                    }
                    return result;
                }, {});
            }

        },

        methods: {

            reset: function() {
                var this$1$1 = this;

                uikitUtil.each(this.getCss(0), function (_, prop) { return uikitUtil.css(this$1$1.$el, prop, ''); });
            },

            getCss: function(percent) {
                var this$1$1 = this;

                return keys(this.props).reduce(function (css, prop) {
                    this$1$1.props[prop](css, percent);
                    return css;
                }, {transform: '', filter: ''});
            }

        }

    };

    function transformFn(prop, el, steps) {

        var unit = getUnit(steps) || {x: 'px', y: 'px', rotate: 'deg'}[prop] || '';

        if (prop === 'x' || prop === 'y') {
            prop = "translate" + (uikitUtil.ucfirst(prop));
        }

        steps = steps.map(uikitUtil.toFloat);

        if (steps.length === 1) {
            steps.unshift(prop === 'scale' ? 1 : 0);
        }

        return function (css, percent) {
            var value = getValue(steps, percent);

            if (uikitUtil.startsWith(prop, 'translate')) {
                value = uikitUtil.toFloat(value).toFixed(unit === 'px' ? 0 : 6);
            }

            css.transform += " " + prop + "(" + value + unit + ")";
        };
    }

    function colorFn(prop, el, steps) {

        if (steps.length === 1) {
            steps.unshift(getCssValue(el, prop, ''));
        }

        steps = steps.map(function (step) { return parseColor(el, step); });

        return function (css, percent) {

            var ref = getStep(steps, percent);
            var start = ref[0];
            var end = ref[1];
            var p = ref[2];
            var value = start.map(function (value, i) {
                value += p * (end[i] - value);
                return i === 3 ? uikitUtil.toFloat(value) : parseInt(value, 10);
            }).join(',');
            css[prop] = "rgba(" + value + ")";
        };
    }

    function parseColor(el, color) {
        return getCssValue(el, 'color', color)
            .split(/[(),]/g)
            .slice(1, -1)
            .concat(1)
            .slice(0, 4)
            .map(uikitUtil.toFloat);
    }

    function filterFn(prop, el, steps) {

        if (steps.length === 1) {
            steps.unshift(0);
        }

        var unit = getUnit(steps) || {blur: 'px', hue: 'deg'}[prop] || '%';
        prop = {fopacity: 'opacity', hue: 'hue-rotate'}[prop] || prop;
        steps = steps.map(uikitUtil.toFloat);

        return function (css, percent) {
            var value = getValue(steps, percent);
            css.filter += " " + prop + "(" + (value + unit) + ")";
        };
    }

    function cssPropFn(prop, el, steps) {

        if (steps.length === 1) {
            steps.unshift(getCssValue(el, prop, ''));
        }

        steps = steps.map(uikitUtil.toFloat);

        return function (css, percent) {
            css[prop] = getValue(steps, percent);
        };
    }

    function strokeFn(prop, el, steps) {

        if (steps.length === 1) {
            steps.unshift(0);
        }

        var unit = getUnit(steps);
        steps = steps.map(uikitUtil.toFloat);

        if (!steps.some(function (step) { return step; })) {
            return uikitUtil.noop;
        }

        var length = getMaxPathLength(el);
        uikitUtil.css(el, 'strokeDasharray', length);

        if (unit === '%') {
            steps = steps.map(function (step) { return step * length / 100; });
        }

        steps = steps.reverse();

        return function (css, percent) {
            css.strokeDashoffset = getValue(steps, percent);
        };
    }

    function backgroundFn(prop, el, steps) {

        if (steps.length === 1) {
            steps.unshift(0);
        }

        prop = prop.substr(-1);
        var attr = prop === 'y' ? 'height' : 'width';
        steps = steps.map(function (step) { return uikitUtil.toPx(step, attr, el); });

        uikitUtil.css(el, ("background-position-" + prop), '');
        var bgPos = uikitUtil.css(el, 'backgroundPosition').split(' ')[prop === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

        return getCssValue(el, 'backgroundSize', '') === 'cover'
            ? backgroundCoverFn.call(this, prop, el, steps, bgPos, attr)
            : setBackgroundPosFn(prop, steps, bgPos);
    }

    function backgroundCoverFn(prop, el, steps, bgPos, attr) {

        var image = getBackgroundImage.call(this, el);

        if (!image.naturalWidth) {
            return uikitUtil.noop;
        }

        var min = Math.min.apply(Math, steps);
        var max = Math.max.apply(Math, steps);
        var down = steps.indexOf(min) < steps.indexOf(max);

        var diff = max - min;
        var pos = (down ? -diff : 0) - (down ? min : max);

        var dimEl = {
            width: el.offsetWidth,
            height: el.offsetHeight
        };

        var dimImage = {
            width: image.naturalWidth,
            height: image.naturalHeight
        };

        var baseDim = uikitUtil.Dimensions.cover(dimImage, dimEl);
        var span = baseDim[attr] - dimEl[attr];

        if (span < diff) {
            dimEl[attr] = baseDim[attr] + diff - span;
        } else if (span > diff) {

            var posPercentage = dimEl[attr] / uikitUtil.toPx(bgPos, attr, el, true);

            if (posPercentage) {
                pos -= (span - diff) / posPercentage;
            }
        }

        var dim = uikitUtil.Dimensions.cover(dimImage, dimEl);

        var fn = setBackgroundPosFn(prop, steps, (pos + "px"));
        return function (css, percent) {
            fn(css, percent);
            css.backgroundSize = (dim.width) + "px " + (dim.height) + "px";
            css.backgroundRepeat = 'no-repeat';
        };
    }

    function setBackgroundPosFn(prop, steps, pos) {
        return function (css, percent) {
            css[("background-position-" + prop)] = "calc(" + pos + " + " + (getValue(steps, percent)) + "px)";
        };
    }

    function getBackgroundImage(el) {
        var this$1$1 = this;

        var src = uikitUtil.css(el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

        var data = this._data;

        if (data[src]) {
            return data[src];
        }

        if (src) {
            var img = new Image();
            img.src = src;
            if (!img.naturalWidth) {
                img.onload = function () { return this$1$1.$update(); };
            }

            return data[src] = img;
        }
    }

    function getStep(steps, percent) {
        var count = steps.length - 1;
        var index = Math.min(Math.floor(count * percent), count - 1);

        return steps
            .slice(index, index + 2)
            .concat(percent === 1 ? 1 : percent % (1 / count) * count);
    }

    function getValue(steps, percent) {
        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return uikitUtil.isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end;
    }

    function getUnit(steps, defaultUnit) {
        return steps.reduce(function (unit, step) { return unit || uikitUtil.isString(step) && step.replace(/[\d-]/g, '').trim(); }, '') || defaultUnit;
    }

    function getCssValue(el, prop, value) {
        var prev = el.style[prop];
        var val = uikitUtil.css(uikitUtil.css(el, prop, value), prop);
        el.style[prop] = prev;
        return val;
    }

    function fillObject(keys, value) {
        return keys.reduce(function (data, prop) {
            data[prop] = value;
            return data;
        }, {});
    }

    var Component = {

        mixins: [Parallax],

        data: {
            selItem: '!li'
        },

        computed: {

            item: function(ref, $el) {
                var selItem = ref.selItem;

                return uikitUtil.query(selItem, $el);
            }

        },

        events: [

            {
                name: 'itemin itemout',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function(ref) {
                    var this$1$1 = this;
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var duration = ref_detail.duration;
                    var timing = ref_detail.timing;
                    var dir = ref_detail.dir;


                    uikitUtil.fastdom.read(function () {
                        var propsFrom = this$1$1.getCss(getCurrentPercent(type, dir, percent));
                        var propsTo = this$1$1.getCss(isIn(type) ? .5 : dir > 0 ? 1 : 0);
                        uikitUtil.fastdom.write(function () {
                            uikitUtil.css(this$1$1.$el, propsFrom);
                            uikitUtil.Transition.start(this$1$1.$el, propsTo, duration, timing).catch(uikitUtil.noop);
                        });
                    });

                }
            },

            {
                name: 'transitioncanceled transitionend',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function() {
                    uikitUtil.Transition.cancel(this.$el);
                }

            },

            {
                name: 'itemtranslatein itemtranslateout',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function(ref) {
                    var this$1$1 = this;
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var dir = ref_detail.dir;

                    uikitUtil.fastdom.read(function () {
                        var props = this$1$1.getCss(getCurrentPercent(type, dir, percent));
                        uikitUtil.fastdom.write(function () { return uikitUtil.css(this$1$1.$el, props); });
                    });
                }
            }

        ]

    };

    function isIn(type) {
        return uikitUtil.endsWith(type, 'in');
    }

    function getCurrentPercent(type, dir, percent) {

        percent /= 2;

        return isIn(type) ^ dir < 0 ? percent : 1 - percent;
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('slideshowParallax', Component);
    }

    return Component;

}));
