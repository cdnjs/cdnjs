/*! UIkit 3.6.16 | https://www.getuikit.com | (c) 2014 - 2021 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslider', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlider = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    var Class = {

        connected: function() {
            !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
        }

    };

    var SliderAutoplay = {

        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },

        data: {
            autoplay: false,
            autoplayInterval: 7000,
            pauseOnHover: true
        },

        connected: function() {
            this.autoplay && this.startAutoplay();
        },

        disconnected: function() {
            this.stopAutoplay();
        },

        update: function() {
            uikitUtil.attr(this.slides, 'tabindex', '-1');
        },

        events: [

            {

                name: 'visibilitychange',

                el: function() {
                    return document;
                },

                filter: function() {
                    return this.autoplay;
                },

                handler: function() {
                    if (document.hidden) {
                        this.stopAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                }

            }

        ],

        methods: {

            startAutoplay: function() {
                var this$1 = this;


                this.stopAutoplay();

                this.interval = setInterval(
                    function () { return (!this$1.draggable || !uikitUtil.$(':focus', this$1.$el))
                        && (!this$1.pauseOnHover || !uikitUtil.matches(this$1.$el, ':hover'))
                        && !this$1.stack.length
                        && this$1.show('next'); },
                    this.autoplayInterval
                );

            },

            stopAutoplay: function() {
                this.interval && clearInterval(this.interval);
            }

        }

    };

    var SliderDrag = {

        props: {
            draggable: Boolean
        },

        data: {
            draggable: true,
            threshold: 10
        },

        created: function() {
            var this$1 = this;


            ['start', 'move', 'end'].forEach(function (key) {

                var fn = this$1[key];
                this$1[key] = function (e) {

                    var pos = uikitUtil.getEventPos(e).x * (uikitUtil.isRtl ? -1 : 1);

                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;

                    fn(e);
                };

            });

        },

        events: [

            {

                name: uikitUtil.pointerDown,

                delegate: function() {
                    return this.selSlides;
                },

                handler: function(e) {

                    if (!this.draggable
                        || !uikitUtil.isTouch(e) && hasTextNodesOnly(e.target)
                        || uikitUtil.closest(e.target, uikitUtil.selInput)
                        || e.button > 0
                        || this.length < 2
                    ) {
                        return;
                    }

                    this.start(e);
                }

            },

            {
                name: 'dragstart',

                handler: function(e) {
                    e.preventDefault();
                }
            }

        ],

        methods: {

            start: function() {

                this.drag = this.pos;

                if (this._transitioner) {

                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;

                    this._transitioner.cancel();
                    this._transitioner.translate(this.percent);

                    this.dragging = true;

                    this.stack = [];

                } else {
                    this.prevIndex = this.index;
                }

                uikitUtil.on(document, uikitUtil.pointerMove, this.move, {passive: false});
                uikitUtil.on(document, (uikitUtil.pointerUp + " " + uikitUtil.pointerCancel), this.end, true);

                uikitUtil.css(this.list, 'userSelect', 'none');

            },

            move: function(e) {
                var this$1 = this;


                var distance = this.pos - this.drag;

                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }

                // prevent click event
                uikitUtil.css(this.list, 'pointerEvents', 'none');

                e.cancelable && e.preventDefault();

                this.dragging = true;
                this.dir = (distance < 0 ? 1 : -1);

                var ref = this;
                var slides = ref.slides;
                var ref$1 = this;
                var prevIndex = ref$1.prevIndex;
                var dis = Math.abs(distance);
                var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                while (nextIndex !== prevIndex && dis > width) {

                    this.drag -= width * this.dir;

                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                    width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                }

                this.percent = dis / width;

                var prev = slides[prevIndex];
                var next = slides[nextIndex];
                var changed = this.index !== nextIndex;
                var edge = prevIndex === nextIndex;

                var itemShown;

                [this.index, this.prevIndex].filter(function (i) { return !uikitUtil.includes([nextIndex, prevIndex], i); }).forEach(function (i) {
                    uikitUtil.trigger(slides[i], 'itemhidden', [this$1]);

                    if (edge) {
                        itemShown = true;
                        this$1.prevIndex = prevIndex;
                    }

                });

                if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
                    uikitUtil.trigger(slides[this.index], 'itemshown', [this]);
                }

                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;

                    !edge && uikitUtil.trigger(prev, 'beforeitemhide', [this]);
                    uikitUtil.trigger(next, 'beforeitemshow', [this]);
                }

                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);

                if (changed) {
                    !edge && uikitUtil.trigger(prev, 'itemhide', [this]);
                    uikitUtil.trigger(next, 'itemshow', [this]);
                }

            },

            end: function() {

                uikitUtil.off(document, uikitUtil.pointerMove, this.move, {passive: false});
                uikitUtil.off(document, (uikitUtil.pointerUp + " " + uikitUtil.pointerCancel), this.end, true);

                if (this.dragging) {

                    this.dragging = null;

                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {

                        var dirChange = (uikitUtil.isRtl ? this.dir * (uikitUtil.isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;

                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }

                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
                    }

                }

                uikitUtil.css(this.list, {userSelect: '', pointerEvents: ''});

                this.drag
                    = this.percent
                    = null;

            }

        }

    };

    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }

    var SliderNav = {

        data: {
            selNav: false
        },

        computed: {

            nav: function(ref, $el) {
                var selNav = ref.selNav;

                return uikitUtil.$(selNav, $el);
            },

            selNavItem: function(ref) {
                var attrItem = ref.attrItem;

                return ("[" + attrItem + "],[data-" + attrItem + "]");
            },

            navItems: function(_, $el) {
                return uikitUtil.$$(this.selNavItem, $el);
            }

        },

        update: {

            write: function() {
                var this$1 = this;


                if (this.nav && this.length !== this.nav.children.length) {
                    uikitUtil.html(this.nav, this.slides.map(function (_, i) { return ("<li " + (this$1.attrItem) + "=\"" + i + "\"><a href></a></li>"); }).join(''));
                }

                this.navItems.concat(this.nav).forEach(function (el) { return el && (el.hidden = !this$1.maxIndex); });

                this.updateNav();

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.selNavItem;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.show(uikitUtil.data(e.current, this.attrItem));
                }

            },

            {

                name: 'itemshow',
                handler: 'updateNav'

            }

        ],

        methods: {

            updateNav: function() {
                var this$1 = this;


                var i = this.getValidIndex();
                this.navItems.forEach(function (el) {

                    var cmd = uikitUtil.data(el, this$1.attrItem);

                    uikitUtil.toggleClass(el, this$1.clsActive, uikitUtil.toNumber(cmd) === i);
                    uikitUtil.toggleClass(el, 'uk-invisible', this$1.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this$1.maxIndex));
                });

            }

        }

    };

    var Slider = {

        mixins: [SliderAutoplay, SliderDrag, SliderNav],

        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number,
            selSlides: String
        },

        data: function () { return ({
            easing: 'ease',
            finite: false,
            velocity: 1,
            index: 0,
            prevIndex: -1,
            stack: [],
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        }); },

        connected: function() {
            this.prevIndex = -1;
            this.index = this.getValidIndex(this.$props.index);
            this.stack = [];
        },

        disconnected: function() {
            uikitUtil.removeClass(this.slides, this.clsActive);
        },

        computed: {

            duration: function(ref, $el) {
                var velocity = ref.velocity;

                return speedUp($el.offsetWidth / velocity);
            },

            list: function(ref, $el) {
                var selList = ref.selList;

                return uikitUtil.$(selList, $el);
            },

            maxIndex: function() {
                return this.length - 1;
            },

            selSlides: function(ref) {
                var selList = ref.selList;
                var selSlides = ref.selSlides;

                return (selList + " " + (selSlides || '> *'));
            },

            slides: {

                get: function() {
                    return uikitUtil.$$(this.selSlides, this.$el);
                },

                watch: function() {
                    this.$reset();
                }

            },

            length: function() {
                return this.slides.length;
            }

        },

        events: {

            itemshown: function() {
                this.$update(this.list);
            }

        },

        methods: {

            show: function(index, force) {
                var this$1 = this;
                if ( force === void 0 ) force = false;


                if (this.dragging || !this.length) {
                    return;
                }

                var ref = this;
                var stack = ref.stack;
                var queueIndex = force ? 0 : stack.length;
                var reset = function () {
                    stack.splice(queueIndex, 1);

                    if (stack.length) {
                        this$1.show(stack.shift(), true);
                    }
                };

                stack[force ? 'unshift' : 'push'](index);

                if (!force && stack.length > 1) {

                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }

                    return;
                }

                var prevIndex = this.getIndex(this.index);
                var prev = uikitUtil.hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                var nextIndex = this.getIndex(index, this.index);
                var next = this.slides[nextIndex];

                if (prev === next) {
                    reset();
                    return;
                }

                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;

                if (prev && !uikitUtil.trigger(prev, 'beforeitemhide', [this])
                    || !uikitUtil.trigger(next, 'beforeitemshow', [this, prev])
                ) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }

                var promise = this._show(prev, next, force).then(function () {

                    prev && uikitUtil.trigger(prev, 'itemhidden', [this$1]);
                    uikitUtil.trigger(next, 'itemshown', [this$1]);

                    return new uikitUtil.Promise(function (resolve) {
                        uikitUtil.fastdom.write(function () {
                            stack.shift();
                            if (stack.length) {
                                this$1.show(stack.shift(), true);
                            } else {
                                this$1._transitioner = null;
                            }
                            resolve();
                        });
                    });

                });

                prev && uikitUtil.trigger(prev, 'itemhide', [this]);
                uikitUtil.trigger(next, 'itemshow', [this]);

                return promise;

            },

            getIndex: function(index, prev) {
                if ( index === void 0 ) index = this.index;
                if ( prev === void 0 ) prev = this.index;

                return uikitUtil.clamp(uikitUtil.getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },

            getValidIndex: function(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;

                return this.getIndex(index, prevIndex);
            },

            _show: function(prev, next, force) {

                this._transitioner = this._getTransitioner(
                    prev,
                    next,
                    this.dir,
                    uikitUtil.assign({
                        easing: force
                            ? next.offsetWidth < 600
                                ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */
                                : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */
                            : this.easing
                    }, this.transitionOptions)
                );

                if (!force && !prev) {
                    this._translate(1);
                    return uikitUtil.Promise.resolve();
                }

                var ref = this.stack;
                var length = ref.length;
                return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);

            },

            _getDistance: function(prev, next) {
                return this._getTransitioner(prev, prev !== next && next).getDistance();
            },

            _translate: function(percent, prev, next) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;

                var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },

            _getTransitioner: function(prev, next, dir, options) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;
                if ( dir === void 0 ) dir = this.dir || 1;
                if ( options === void 0 ) options = this.transitionOptions;

                return new this.Transitioner(
                    uikitUtil.isNumber(prev) ? this.slides[prev] : prev,
                    uikitUtil.isNumber(next) ? this.slides[next] : next,
                    dir * (uikitUtil.isRtl ? -1 : 1),
                    options
                );
            }

        }

    };

    function getDirection(index, prevIndex) {
        return index === 'next'
            ? 1
            : index === 'previous'
                ? -1
                : index < prevIndex
                    ? -1
                    : 1;
    }

    function speedUp(x) {
        return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
    }

    var SliderReactive = {

        update: {

            write: function() {

                if (this.stack.length || this.dragging) {
                    return;
                }

                var index = this.getValidIndex(this.index);

                if (!~this.prevIndex || this.index !== index) {
                    this.show(index);
                }

            },

            events: ['resize']

        }

    };

    function translate(value, unit) {
        if ( value === void 0 ) value = 0;
        if ( unit === void 0 ) unit = '%';

        value += value ? unit : '';
        return uikitUtil.isIE ? ("translateX(" + value + ")") : ("translate3d(" + value + ", 0, 0)"); // currently not translate3d in IE, translate3d within translate3d does not work while transitioning
    }

    function Transitioner (prev, next, dir, ref) {
        var center = ref.center;
        var easing = ref.easing;
        var list = ref.list;


        var deferred = new uikitUtil.Deferred();

        var from = prev
            ? getLeft(prev, list, center)
            : getLeft(next, list, center) + uikitUtil.dimensions(next).width * dir;
        var to = next
            ? getLeft(next, list, center)
            : from + uikitUtil.dimensions(prev).width * dir * (uikitUtil.isRtl ? -1 : 1);

        return {

            dir: dir,

            show: function(duration, percent, linear) {
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * uikitUtil.clamp(percent, -1, 1));

                this.translate(percent);

                prev && this.updateTranslates();
                percent = prev ? percent : uikitUtil.clamp(percent, 0, 1);
                triggerUpdate(this.getItemIn(), 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                prev && triggerUpdate(this.getItemIn(true), 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                uikitUtil.Transition
                    .start(list, {transform: translate(-to * (uikitUtil.isRtl ? -1 : 1), 'px')}, duration, timing)
                    .then(deferred.resolve, uikitUtil.noop);

                return deferred.promise;

            },

            cancel: function() {
                uikitUtil.Transition.cancel(list);
            },

            reset: function() {
                uikitUtil.css(list, 'transform', '');
            },

            forward: function(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                uikitUtil.Transition.cancel(list);
                return this.show(duration, percent, true);
            },

            translate: function(percent) {

                var distance = this.getDistance() * dir * (uikitUtil.isRtl ? -1 : 1);

                uikitUtil.css(list, 'transform', translate(uikitUtil.clamp(
                    -to + (distance - distance * percent),
                    -getWidth(list),
                    uikitUtil.dimensions(list).width
                ) * (uikitUtil.isRtl ? -1 : 1), 'px'));

                this.updateTranslates();

                if (prev) {
                    percent = uikitUtil.clamp(percent, -1, 1);
                    triggerUpdate(this.getItemIn(), 'itemtranslatein', {percent: percent, dir: dir});
                    triggerUpdate(this.getItemIn(true), 'itemtranslateout', {percent: 1 - percent, dir: dir});
                }

            },

            percent: function() {
                return Math.abs((uikitUtil.css(list, 'transform').split(',')[4] * (uikitUtil.isRtl ? -1 : 1) + from) / (to - from));
            },

            getDistance: function() {
                return Math.abs(to - from);
            },

            getItemIn: function(out) {
                if ( out === void 0 ) out = false;


                var actives = uikitUtil.sortBy(this.getActives(), 'offsetLeft');
                var all = uikitUtil.sortBy(uikitUtil.children(list), 'offsetLeft');
                var i = uikitUtil.index(all, actives[dir * (out ? -1 : 1) > 0 ? actives.length - 1 : 0]);

                return ~i && all[i + (prev && !out ? dir : 0)];

            },

            getActives: function() {
                return [prev || next].concat(uikitUtil.children(list).filter(function (slide) {
                    var slideLeft = getElLeft(slide, list);
                    return slideLeft > from && slideLeft + uikitUtil.dimensions(slide).width <= uikitUtil.dimensions(list).width + from;
                }));
            },

            updateTranslates: function() {

                var actives = this.getActives();

                uikitUtil.children(list).forEach(function (slide) {
                    var isActive = uikitUtil.includes(actives, slide);

                    triggerUpdate(slide, ("itemtranslate" + (isActive ? 'in' : 'out')), {
                        percent: isActive ? 1 : 0,
                        dir: slide.offsetLeft <= next.offsetLeft ? 1 : -1
                    });
                });
            }

        };

    }

    function getLeft(el, list, center) {

        var left = getElLeft(el, list);

        return center
            ? left - centerEl(el, list)
            : Math.min(left, getMax(list));

    }

    function getMax(list) {
        return Math.max(0, getWidth(list) - uikitUtil.dimensions(list).width);
    }

    function getWidth(list) {
        return uikitUtil.children(list).reduce(function (right, el) { return uikitUtil.dimensions(el).width + right; }, 0);
    }

    function centerEl(el, list) {
        return uikitUtil.dimensions(list).width / 2 - uikitUtil.dimensions(el).width / 2;
    }

    function getElLeft(el, list) {
        return el && (uikitUtil.position(el).left + (uikitUtil.isRtl ? uikitUtil.dimensions(el).width - uikitUtil.dimensions(list).width : 0)) * (uikitUtil.isRtl ? -1 : 1) || 0;
    }

    function triggerUpdate(el, type, data) {
        uikitUtil.trigger(el, uikitUtil.createEvent(type, false, false, data));
    }

    var Component = {

        mixins: [Class, Slider, SliderReactive],

        props: {
            center: Boolean,
            sets: Boolean
        },

        data: {
            center: false,
            sets: false,
            attrItem: 'uk-slider-item',
            selList: '.uk-slider-items',
            selNav: '.uk-slider-nav',
            clsContainer: 'uk-slider-container',
            Transitioner: Transitioner
        },

        computed: {

            avgWidth: function() {
                return getWidth(this.list) / this.length;
            },

            finite: function(ref) {
                var finite = ref.finite;

                return finite || Math.ceil(getWidth(this.list)) < uikitUtil.dimensions(this.list).width + getMaxElWidth(this.list) + this.center;
            },

            maxIndex: function() {

                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }

                if (this.center) {
                    return uikitUtil.last(this.sets);
                }

                var lft = 0;
                var max = getMax(this.list);
                var index = uikitUtil.findIndex(this.slides, function (el) {

                    if (lft >= max) {
                        return true;
                    }

                    lft += uikitUtil.dimensions(el).width;

                });

                return ~index ? index : this.length - 1;
            },

            sets: function(ref) {
                var this$1 = this;
                var sets = ref.sets;


                if (!sets) {
                    return;
                }

                var width = uikitUtil.dimensions(this.list).width / (this.center ? 2 : 1);

                var left = 0;
                var leftCenter = width;
                var slideLeft = 0;

                sets = uikitUtil.sortBy(this.slides, 'offsetLeft').reduce(function (sets, slide, i) {

                    var slideWidth = uikitUtil.dimensions(slide).width;
                    var slideRight = slideLeft + slideWidth;

                    if (slideRight > left) {

                        if (!this$1.center && i > this$1.maxIndex) {
                            i = this$1.maxIndex;
                        }

                        if (!uikitUtil.includes(sets, i)) {

                            var cmp = this$1.slides[i + 1];
                            if (this$1.center && cmp && slideWidth < leftCenter - uikitUtil.dimensions(cmp).width / 2) {
                                leftCenter -= slideWidth;
                            } else {
                                leftCenter = width;
                                sets.push(i);
                                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
                            }

                        }
                    }

                    slideLeft += slideWidth;

                    return sets;

                }, []);

                return !uikitUtil.isEmpty(sets) && sets;

            },

            transitionOptions: function() {
                return {
                    center: this.center,
                    list: this.list
                };
            }

        },

        connected: function() {
            uikitUtil.toggleClass(this.$el, this.clsContainer, !uikitUtil.$(("." + (this.clsContainer)), this.$el));
        },

        update: {

            write: function() {
                var this$1 = this;

                this.navItems.forEach(function (el) {
                    var index = uikitUtil.toNumber(uikitUtil.data(el, this$1.attrItem));
                    if (index !== false) {
                        el.hidden = !this$1.maxIndex || index > this$1.maxIndex || this$1.sets && !uikitUtil.includes(this$1.sets, index);
                    }
                });

                if (this.length && !this.dragging && !this.stack.length) {
                    this.reorder();
                    this._translate(1);
                }

                var actives = this._getTransitioner(this.index).getActives();
                this.slides.forEach(function (slide) { return uikitUtil.toggleClass(slide, this$1.clsActive, uikitUtil.includes(actives, slide)); });

                if (this.clsActivated && (!this.sets || uikitUtil.includes(this.sets, uikitUtil.toFloat(this.index)))) {
                    this.slides.forEach(function (slide) { return uikitUtil.toggleClass(slide, this$1.clsActivated || '', uikitUtil.includes(actives, slide)); });
                }
            },

            events: ['resize']

        },

        events: {

            beforeitemshow: function(e) {

                if (!this.dragging && this.sets && this.stack.length < 2 && !uikitUtil.includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }

                var diff = Math.abs(
                    this.index
                    - this.prevIndex
                    + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
                );

                if (!this.dragging && diff > 1) {

                    for (var i = 0; i < diff; i++) {
                        this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
                    }

                    e.preventDefault();
                    return;
                }

                var index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
                this.duration = speedUp(this.avgWidth / this.velocity) * (uikitUtil.dimensions(this.slides[index]).width / this.avgWidth);

                this.reorder();

            },

            itemshow: function() {
                ~this.prevIndex && uikitUtil.addClass(this._getTransitioner().getItemIn(), this.clsActive);
            }

        },

        methods: {

            reorder: function() {
                var this$1 = this;


                if (this.finite) {
                    uikitUtil.css(this.slides, 'order', '');
                    return;
                }

                var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;

                this.slides.forEach(function (slide, i) { return uikitUtil.css(slide, 'order', this$1.dir > 0 && i < index
                        ? 1
                        : this$1.dir < 0 && i >= this$1.index
                            ? -1
                            : ''
                    ); }
                );

                if (!this.center) {
                    return;
                }

                var next = this.slides[index];
                var width = uikitUtil.dimensions(this.list).width / 2 - uikitUtil.dimensions(next).width / 2;
                var j = 0;

                while (width > 0) {
                    var slideIndex = this.getIndex(--j + index, index);
                    var slide = this.slides[slideIndex];

                    uikitUtil.css(slide, 'order', slideIndex > index ? -2 : -1);
                    width -= uikitUtil.dimensions(slide).width;
                }

            },

            getValidIndex: function(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;


                index = this.getIndex(index, prevIndex);

                if (!this.sets) {
                    return index;
                }

                var prev;

                do {

                    if (uikitUtil.includes(this.sets, index)) {
                        return index;
                    }

                    prev = index;
                    index = this.getIndex(index + this.dir, prevIndex);

                } while (index !== prev);

                return index;
            }

        }

    };

    function getMaxElWidth(list) {
        return Math.max.apply(Math, [ 0 ].concat( uikitUtil.children(list).map(function (el) { return uikitUtil.dimensions(el).width; }) ));
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('slider', Component);
    }

    return Component;

})));
