/*! UIkit 3.0.0-rc.17 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitlightbox', ['uikit-util'], factory) :
    (global.UIkitLightbox = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    var Animations = {

        slide: {

            show: function(dir) {
                return [
                    {transform: translate(dir * -100)},
                    {transform: translate()}
                ];
            },

            percent: function(current) {
                return translated(current);
            },

            translate: function(percent, dir) {
                return [
                    {transform: translate(dir * -100 * percent)},
                    {transform: translate(dir * 100 * (1 - percent))}
                ];
            }

        }

    };

    function translated(el) {
        return Math.abs(uikitUtil.css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
    }

    function translate(value, unit) {
        if ( value === void 0 ) value = 0;
        if ( unit === void 0 ) unit = '%';

        return ("translateX(" + value + (value ? unit : '') + ")"); // currently not translate3d to support IE, translate3d within translate3d does not work while transitioning
    }

    function scale3d(value) {
        return ("scale3d(" + value + ", " + value + ", 1)");
    }

    var Animations$1 = uikitUtil.assign({}, Animations, {

        fade: {

            show: function() {
                return [
                    {opacity: 0},
                    {opacity: 1}
                ];
            },

            percent: function(current) {
                return 1 - uikitUtil.css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent},
                    {opacity: percent}
                ];
            }

        },

        scale: {

            show: function() {
                return [
                    {opacity: 0, transform: scale3d(1 - .2)},
                    {opacity: 1, transform: scale3d(1)}
                ];
            },

            percent: function(current) {
                return 1 - uikitUtil.css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 - .2 * percent)},
                    {opacity: percent, transform: scale3d(1 - .2 + .2 * percent)}
                ];
            }

        }

    });

    var Container = {

        props: {
            container: Boolean
        },

        data: {
            container: true
        },

        computed: {

            container: function(ref) {
                var container = ref.container;

                return container === true && this.$container || container && uikitUtil.$(container);
            }

        }

    };

    var Class = {

        connected: function() {
            uikitUtil.addClass(this.$el, this.$name);
        }

    };

    var Togglable = {

        props: {
            cls: Boolean,
            animation: 'list',
            duration: Number,
            origin: String,
            transition: String,
            queued: Boolean
        },

        data: {
            cls: false,
            animation: [false],
            duration: 200,
            origin: false,
            transition: 'linear',
            queued: false,

            initProps: {
                overflow: '',
                height: '',
                paddingTop: '',
                paddingBottom: '',
                marginTop: '',
                marginBottom: ''
            },

            hideProps: {
                overflow: 'hidden',
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }

        },

        computed: {

            hasAnimation: function(ref) {
                var animation = ref.animation;

                return !!animation[0];
            },

            hasTransition: function(ref) {
                var animation = ref.animation;

                return this.hasAnimation && animation[0] === true;
            }

        },

        methods: {

            toggleElement: function(targets, show, animate) {
                var this$1 = this;

                return new uikitUtil.Promise(function (resolve) {

                    targets = uikitUtil.toNodes(targets);

                    var all = function (targets) { return uikitUtil.Promise.all(targets.map(function (el) { return this$1._toggleElement(el, show, animate); })); };
                    var toggled = targets.filter(function (el) { return this$1.isToggled(el); });
                    var untoggled = targets.filter(function (el) { return !uikitUtil.includes(toggled, el); });

                    var p;

                    if (!this$1.queued || !uikitUtil.isUndefined(animate) || !uikitUtil.isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

                        p = all(untoggled.concat(toggled));

                    } else {

                        var body = document.body;
                        var scroll = body.scrollTop;
                        var el = toggled[0];
                        var inProgress = uikitUtil.Animation.inProgress(el) && uikitUtil.hasClass(el, 'uk-animation-leave')
                                || uikitUtil.Transition.inProgress(el) && el.style.height === '0px';

                        p = all(toggled);

                        if (!inProgress) {
                            p = p.then(function () {
                                var p = all(untoggled);
                                body.scrollTop = scroll;
                                return p;
                            });
                        }

                    }

                    p.then(resolve, uikitUtil.noop);

                });
            },

            toggleNow: function(targets, show) {
                var this$1 = this;

                return new uikitUtil.Promise(function (resolve) { return uikitUtil.Promise.all(uikitUtil.toNodes(targets).map(function (el) { return this$1._toggleElement(el, show, false); })).then(resolve, uikitUtil.noop); });
            },

            isToggled: function(el) {
                var nodes = uikitUtil.toNodes(el || this.$el);
                return this.cls
                    ? uikitUtil.hasClass(nodes, this.cls.split(' ')[0])
                    : !uikitUtil.hasAttr(nodes, 'hidden');
            },

            updateAria: function(el) {
                if (this.cls === false) {
                    uikitUtil.attr(el, 'aria-hidden', !this.isToggled(el));
                }
            },

            _toggleElement: function(el, show, animate) {
                var this$1 = this;


                show = uikitUtil.isBoolean(show)
                    ? show
                    : uikitUtil.Animation.inProgress(el)
                        ? uikitUtil.hasClass(el, 'uk-animation-leave')
                        : uikitUtil.Transition.inProgress(el)
                            ? el.style.height === '0px'
                            : !this.isToggled(el);

                if (!uikitUtil.trigger(el, ("before" + (show ? 'show' : 'hide')), [this])) {
                    return uikitUtil.Promise.reject();
                }

                var promise = (animate === false || !this.hasAnimation
                    ? this._toggleImmediate
                    : this.hasTransition
                        ? this._toggleHeight
                        : this._toggleAnimation
                )(el, show);

                uikitUtil.trigger(el, show ? 'show' : 'hide', [this]);

                return promise.then(function () {
                    uikitUtil.trigger(el, show ? 'shown' : 'hidden', [this$1]);
                    this$1.$update(el);
                });
            },

            _toggle: function(el, toggled) {

                if (!el) {
                    return;
                }

                var changed;
                if (this.cls) {
                    changed = uikitUtil.includes(this.cls, ' ') || Boolean(toggled) !== uikitUtil.hasClass(el, this.cls);
                    changed && uikitUtil.toggleClass(el, this.cls, uikitUtil.includes(this.cls, ' ') ? undefined : toggled);
                } else {
                    changed = Boolean(toggled) === uikitUtil.hasAttr(el, 'hidden');
                    changed && uikitUtil.attr(el, 'hidden', !toggled ? '' : null);
                }

                uikitUtil.$$('[autofocus]', el).some(function (el) { return uikitUtil.isVisible(el) && (el.focus() || true); });

                this.updateAria(el);
                changed && this.$update(el);
            },

            _toggleImmediate: function(el, show) {
                this._toggle(el, show);
                return uikitUtil.Promise.resolve();
            },

            _toggleHeight: function(el, show) {
                var this$1 = this;


                var inProgress = uikitUtil.Transition.inProgress(el);
                var inner = el.hasChildNodes ? uikitUtil.toFloat(uikitUtil.css(el.firstElementChild, 'marginTop')) + uikitUtil.toFloat(uikitUtil.css(el.lastElementChild, 'marginBottom')) : 0;
                var currentHeight = uikitUtil.isVisible(el) ? uikitUtil.height(el) + (inProgress ? 0 : inner) : 0;

                uikitUtil.Transition.cancel(el);

                if (!this.isToggled(el)) {
                    this._toggle(el, true);
                }

                uikitUtil.height(el, '');

                // Update child components first
                uikitUtil.fastdom.flush();

                var endHeight = uikitUtil.height(el) + (inProgress ? 0 : inner);
                uikitUtil.height(el, currentHeight);

                return (show
                    ? uikitUtil.Transition.start(el, uikitUtil.assign({}, this.initProps, {overflow: 'hidden', height: endHeight}), Math.round(this.duration * (1 - currentHeight / endHeight)), this.transition)
                    : uikitUtil.Transition.start(el, this.hideProps, Math.round(this.duration * (currentHeight / endHeight)), this.transition).then(function () { return this$1._toggle(el, false); })
                ).then(function () { return uikitUtil.css(el, this$1.initProps); });

            },

            _toggleAnimation: function(el, show) {
                var this$1 = this;


                uikitUtil.Animation.cancel(el);

                if (show) {
                    this._toggle(el, true);
                    return uikitUtil.Animation.in(el, this.animation[0], this.duration, this.origin);
                }

                return uikitUtil.Animation.out(el, this.animation[1] || this.animation[0], this.duration, this.origin).then(function () { return this$1._toggle(el, false); });
            }

        }

    };

    var active;

    var Modal = {

        mixins: [Class, Container, Togglable],

        props: {
            selPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },

        data: {
            cls: 'uk-open',
            escClose: true,
            bgClose: true,
            overlay: true,
            stack: false
        },

        computed: {

            panel: function(ref, $el) {
                var selPanel = ref.selPanel;

                return uikitUtil.$(selPanel, $el);
            },

            transitionElement: function() {
                return this.panel;
            },

            transitionDuration: function() {
                return uikitUtil.toMs(uikitUtil.css(this.transitionElement, 'transitionDuration'));
            },

            bgClose: function(ref) {
                var bgClose = ref.bgClose;

                return bgClose && this.panel;
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.selClose;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    e.preventDefault();
                    this.toggle();
                }

            },

            {
                name: 'beforeshow',

                self: true,

                handler: function(e) {

                    var prev = active && active !== this && active;

                    active = this;

                    if (prev) {
                        if (this.stack) {
                            this.prev = prev;
                        } else {
                            prev.hide().then(this.show);
                            e.preventDefault();
                            return;
                        }
                    }

                    registerEvents();

                }

            },

            {
                name: 'beforehide',

                self: true,

                handler: function() {

                    active = active && active !== this && active || this.prev;

                    if (!active) {
                        deregisterEvents();
                    }

                }

            },

            {

                name: 'show',

                self: true,

                handler: function() {

                    if (!uikitUtil.hasClass(document.documentElement, this.clsPage)) {
                        this.scrollbarWidth = uikitUtil.width(window) - uikitUtil.width(document);
                        uikitUtil.css(document.body, 'overflowY', this.scrollbarWidth && this.overlay ? 'scroll' : '');
                    }

                    uikitUtil.addClass(document.documentElement, this.clsPage);

                }

            },

            {

                name: 'hidden',

                self: true,

                handler: function() {
                    var this$1 = this;


                    var found;
                    var ref = this;
                    var prev = ref.prev;

                    while (prev) {

                        if (prev.clsPage === this$1.clsPage) {
                            found = true;
                            break;
                        }

                        prev = prev.prev;

                    }

                    if (!found) {
                        uikitUtil.removeClass(document.documentElement, this.clsPage);

                    }

                    !this.prev && uikitUtil.css(document.body, 'overflowY', '');
                }

            }

        ],

        methods: {

            toggle: function() {
                return this.isToggled() ? this.hide() : this.show();
            },

            show: function() {

                if (this.isToggled()) {
                    return uikitUtil.Promise.resolve();
                }

                if (this.container && this.$el.parentNode !== this.container) {
                    uikitUtil.append(this.container, this.$el);
                    this._callConnected();
                }

                return this.toggleNow(this.$el, true);
            },

            hide: function() {
                return this.isToggled()
                    ? this.toggleNow(this.$el, false)
                    : uikitUtil.Promise.resolve();
            },

            getActive: function() {
                return active;
            },

            _toggleImmediate: function(el, show) {
                var this$1 = this;

                return new uikitUtil.Promise(function (resolve) { return requestAnimationFrame(function () {
                        this$1._toggle(el, show);

                        if (this$1.transitionDuration) {
                            uikitUtil.once(this$1.transitionElement, 'transitionend', resolve, false, function (e) { return e.target === this$1.transitionElement; });
                        } else {
                            resolve();
                        }
                    }); }
                );
            }

        }

    };

    var events;

    function registerEvents() {

        if (events) {
            return;
        }

        events = [
            uikitUtil.on(document, 'click', function (ref) {
                var target = ref.target;
                var defaultPrevented = ref.defaultPrevented;

                if (active && active.bgClose && !defaultPrevented && (!active.overlay || uikitUtil.within(target, active.$el)) && !uikitUtil.within(target, active.panel)) {
                    active.hide();
                }
            }),
            uikitUtil.on(document, 'keydown', function (e) {
                if (e.keyCode === 27 && active && active.escClose) {
                    e.preventDefault();
                    active.hide();
                }
            })
        ];
    }

    function deregisterEvents() {
        events && events.forEach(function (unbind) { return unbind(); });
        events = null;
    }

    function Transitioner(prev, next, dir, ref) {
        var animation = ref.animation;
        var easing = ref.easing;


        var percent = animation.percent;
        var translate = animation.translate;
        var show = animation.show; if ( show === void 0 ) show = uikitUtil.noop;
        var props = show(dir);
        var deferred = new uikitUtil.Deferred();

        return {

            dir: dir,

            show: function(duration, percent, linear) {
                var this$1 = this;
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * uikitUtil.clamp(percent, -1, 1));

                this.translate(percent);

                triggerUpdate(next, 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                triggerUpdate(prev, 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                uikitUtil.Promise.all([
                    uikitUtil.Transition.start(next, props[1], duration, timing),
                    uikitUtil.Transition.start(prev, props[0], duration, timing)
                ]).then(function () {
                    this$1.reset();
                    deferred.resolve();
                }, uikitUtil.noop);

                return deferred.promise;
            },

            stop: function() {
                return uikitUtil.Transition.stop([next, prev]);
            },

            cancel: function() {
                uikitUtil.Transition.cancel([next, prev]);
            },

            reset: function() {
                for (var prop in props[0]) {
                    uikitUtil.css([next, prev], prop, '');
                }
            },

            forward: function(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                uikitUtil.Transition.cancel([next, prev]);
                return this.show(duration, percent, true);

            },

            translate: function(percent) {

                this.reset();

                var props = translate(percent, dir);
                uikitUtil.css(next, props[1]);
                uikitUtil.css(prev, props[0]);
                triggerUpdate(next, 'itemtranslatein', {percent: percent, dir: dir});
                triggerUpdate(prev, 'itemtranslateout', {percent: 1 - percent, dir: dir});

            },

            percent: function() {
                return percent(prev || next, next, dir);
            },

            getDistance: function() {
                return prev.offsetWidth;
            }

        };

    }

    function triggerUpdate(el, type, data) {
        uikitUtil.trigger(el, uikitUtil.createEvent(type, false, false, data));
    }

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
            this.startAutoplay();
        },

        disconnected: function() {
            this.stopAutoplay();
        },

        events: [

            {

                name: 'visibilitychange',

                el: document,

                handler: function() {
                    if (document.hidden) {
                        this.stopAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                }

            },

            {

                name: uikitUtil.pointerDown,
                handler: 'stopAutoplay'

            },

            {

                name: 'mouseenter',

                filter: function() {
                    return this.autoplay;
                },

                handler: function() {
                    this.isHovering = true;
                }

            },

            {

                name: 'mouseleave',

                filter: function() {
                    return this.autoplay;
                },

                handler: function() {
                    this.isHovering = false;
                }

            }

        ],

        methods: {

            startAutoplay: function() {
                var this$1 = this;


                this.stopAutoplay();

                if (this.autoplay) {
                    this.interval = setInterval(
                        function () { return !(this$1.isHovering && this$1.pauseOnHover) && !this$1.stack.length && this$1.show('next'); },
                        this.autoplayInterval
                    );
                }

            },

            stopAutoplay: function() {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }

        }

    };

    var SliderDrag = {

        data: {
            threshold: 10,
            preventCatch: false
        },

        created: function() {
            var this$1 = this;


            ['start', 'move', 'end'].forEach(function (key) {

                var fn = this$1[key];
                this$1[key] = function (e) {

                    var pos = uikitUtil.getPos(e).x * (uikitUtil.isRtl ? -1 : 1);

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
                    return this.slidesSelector;
                },

                handler: function(e) {

                    if (!uikitUtil.isTouch(e) && hasTextNodesOnly(e.target)
                        || e.button > 0
                        || this.length < 2
                        || this.preventCatch
                    ) {
                        return;
                    }

                    this.start(e);
                }

            },

            {

                // Workaround for iOS 11 bug: https://bugs.webkit.org/show_bug.cgi?id=184250

                name: 'touchmove',
                passive: false,
                handler: 'move',
                delegate: function() {
                    return this.slidesSelector;
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
                var this$1 = this;


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

                // See above workaround notice
                var off = uikitUtil.on(document, uikitUtil.pointerMove.replace(' touchmove', ''), this.move, {passive: false});
                this.unbindMove = function () {
                    off();
                    this$1.unbindMove = null;
                };
                uikitUtil.on(window, 'scroll', this.unbindMove);
                uikitUtil.on(document, uikitUtil.pointerUp, this.end, true);

            },

            move: function(e) {
                var this$1 = this;


                // See above workaround notice
                if (!this.unbindMove) {
                    return;
                }

                var distance = this.pos - this.drag;

                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }

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

                    this$1.drag -= width * this$1.dir;

                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this$1.getIndex(prevIndex + this$1.dir, prevIndex);
                    width = this$1._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

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

                uikitUtil.off(window, 'scroll', this.unbindMove);
                this.unbindMove && this.unbindMove();
                uikitUtil.off(document, uikitUtil.pointerUp, this.end, true);

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

                    uikitUtil.preventClick();

                }

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

            navItemSelector: function(ref) {
                var attrItem = ref.attrItem;

                return ("[" + attrItem + "],[data-" + attrItem + "]");
            },

            navItems: function(_, $el) {
                return uikitUtil.$$(this.navItemSelector, $el);
            }

        },

        update: {

            write: function() {
                var this$1 = this;


                if (this.nav && this.length !== this.nav.children.length) {
                    uikitUtil.html(this.nav, this.slides.map(function (_, i) { return ("<li " + (this$1.attrItem) + "=\"" + i + "\"><a href=\"#\"></a></li>"); }).join(''));
                }

                uikitUtil.toggleClass(uikitUtil.$$(this.navItemSelector, this.$el).concat(this.nav), 'uk-hidden', !this.maxIndex);

                this.updateNav();

            },

            events: ['load', 'resize']

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.navItemSelector;
                },

                handler: function(e) {
                    e.preventDefault();
                    e.current.blur();
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
            velocity: Number
        },

        data: function () { return ({
            easing: 'ease',
            finite: false,
            velocity: 1,
            index: 0,
            stack: [],
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        }); },

        computed: {

            duration: function(ref, $el) {
                var velocity = ref.velocity;

                return speedUp($el.offsetWidth / velocity);
            },

            length: function() {
                return this.slides.length;
            },

            list: function(ref, $el) {
                var selList = ref.selList;

                return uikitUtil.$(selList, $el);
            },

            maxIndex: function() {
                return this.length - 1;
            },

            slidesSelector: function(ref) {
                var selList = ref.selList;

                return (selList + " > *");
            },

            slides: function() {
                return uikitUtil.toNodes(this.list.children);
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

                var prevIndex = this.index;
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

                prev && uikitUtil.trigger(prev, 'beforeitemhide', [this]);
                if (!uikitUtil.trigger(next, 'beforeitemshow', [this, prev])) {
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
                    this._transitioner.translate(1);
                    return uikitUtil.Promise.resolve();
                }

                var ref = this.stack;
                var length = ref.length;
                return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);

            },

            _getDistance: function(prev, next) {
                return new this._getTransitioner(prev, prev !== next && next).getDistance();
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

    var Slideshow = {

        mixins: [Slider],

        props: {
            animation: String
        },

        data: {
            animation: 'slide',
            clsActivated: 'uk-transition-active',
            Animations: Animations,
            Transitioner: Transitioner
        },

        computed: {

            animation: function(ref) {
                var animation = ref.animation;
                var Animations$$1 = ref.Animations;

                return uikitUtil.assign(animation in Animations$$1 ? Animations$$1[animation] : Animations$$1.slide, {name: animation});
            },

            transitionOptions: function() {
                return {animation: this.animation};
            }

        },

        events: {

            'itemshow itemhide itemshown itemhidden': function(ref) {
                var target = ref.target;

                this.$update(target);
            },

            itemshow: function() {
                uikitUtil.isNumber(this.prevIndex) && uikitUtil.fastdom.flush(); // iOS 10+ will honor the video.play only if called from a gesture handler
            },

            beforeitemshow: function(ref) {
                var target = ref.target;

                uikitUtil.addClass(target, this.clsActive);
            },

            itemshown: function(ref) {
                var target = ref.target;

                uikitUtil.addClass(target, this.clsActivated);
            },

            itemhidden: function(ref) {
                var target = ref.target;

                uikitUtil.removeClass(target, this.clsActive, this.clsActivated);
            }

        }

    };

    var LightboxPanel = {

        mixins: [Container, Modal, Togglable, Slideshow],

        functional: true,

        props: {
            delayControls: Number,
            preload: Number,
            videoAutoplay: Boolean,
            template: String
        },

        data: function () { return ({
            preload: 1,
            videoAutoplay: false,
            delayControls: 3000,
            items: [],
            cls: 'uk-open',
            clsPage: 'uk-lightbox-page',
            selList: '.uk-lightbox-items',
            attrItem: 'uk-lightbox-item',
            selClose: '.uk-close-large',
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations$1,
            template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
        }); },

        created: function() {
            var this$1 = this;


            this.$mount(uikitUtil.append(this.container, this.template));

            this.caption = uikitUtil.$('.uk-lightbox-caption', this.$el);

            this.items.forEach(function () { return uikitUtil.append(this$1.list, '<li></li>'); });

        },

        events: [

            {

                name: (uikitUtil.pointerMove + " " + uikitUtil.pointerDown + " keydown"),

                handler: 'showControls'

            },

            {

                name: 'click',

                self: true,

                delegate: function() {
                    return this.slidesSelector;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'shown',

                self: true,

                handler: 'showControls'
            },

            {

                name: 'hide',

                self: true,

                handler: function() {

                    this.hideControls();

                    uikitUtil.removeClass(this.slides, this.clsActive);
                    uikitUtil.Transition.stop(this.slides);

                }
            },

            {

                name: 'keyup',

                el: document,

                handler: function(e) {

                    if (!this.isToggled(this.$el)) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 37:
                            this.show('previous');
                            break;
                        case 39:
                            this.show('next');
                            break;
                    }
                }
            },

            {

                name: 'beforeitemshow',

                handler: function(e) {

                    if (this.isToggled()) {
                        return;
                    }

                    this.preventCatch = true;

                    e.preventDefault();

                    this.toggleNow(this.$el, true);

                    this.animation = Animations$1['scale'];
                    uikitUtil.removeClass(e.target, this.clsActive);
                    this.stack.splice(1, 0, this.index);

                }

            },

            {

                name: 'itemshow',

                handler: function(ref) {
                    var this$1 = this;
                    var target = ref.target;


                    var i = uikitUtil.index(target);
                    var ref$1 = this.getItem(i);
                    var caption = ref$1.caption;

                    uikitUtil.css(this.caption, 'display', caption ? '' : 'none');
                    uikitUtil.html(this.caption, caption);

                    for (var j = 0; j <= this.preload; j++) {
                        this$1.loadItem(this$1.getIndex(i + j));
                        this$1.loadItem(this$1.getIndex(i - j));
                    }

                }

            },

            {

                name: 'itemshown',

                handler: function() {
                    this.preventCatch = false;
                }

            },

            {

                name: 'itemload',

                handler: function(_, item) {
                    var this$1 = this;


                    var source = item.source;
                    var type = item.type;
                    var alt = item.alt;

                    this.setItem(item, '<span uk-spinner></span>');

                    if (!source) {
                        return;
                    }

                    var matches;

                    // Image
                    if (type === 'image' || source.match(/\.(jp(e)?g|png|gif|svg)($|\?)/i)) {

                        uikitUtil.getImage(source).then(
                            function (img) { return this$1.setItem(item, ("<img width=\"" + (img.width) + "\" height=\"" + (img.height) + "\" src=\"" + source + "\" alt=\"" + (alt ? alt : '') + "\">")); },
                            function () { return this$1.setError(item); }
                        );

                        // Video
                    } else if (type === 'video' || source.match(/\.(mp4|webm|ogv)($|\?)/i)) {

                        var video = uikitUtil.$(("<video controls playsinline" + (item.poster ? (" poster=\"" + (item.poster) + "\"") : '') + " uk-video=\"" + (this.videoAutoplay) + "\"></video>"));
                        uikitUtil.attr(video, 'src', source);

                        uikitUtil.on(video, 'error', function () { return this$1.setError(item); });
                        uikitUtil.on(video, 'loadedmetadata', function () {
                            uikitUtil.attr(video, {width: video.videoWidth, height: video.videoHeight});
                            this$1.setItem(item, video);
                        });

                        // Iframe
                    } else if (type === 'iframe' || source.match(/\.(html|php)($|\?)/i)) {

                        this.setItem(item, ("<iframe class=\"uk-lightbox-iframe\" src=\"" + source + "\" frameborder=\"0\" allowfullscreen></iframe>"));

                        // YouTube
                    } else if ((matches = source.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/) || source.match(/()youtu\.be\/(.*)/))) {

                        var id = matches[2];
                        var setIframe = function (width, height) {
                            if ( width === void 0 ) width = 640;
                            if ( height === void 0 ) height = 450;

                            return this$1.setItem(item, getIframe(("https://www.youtube" + (matches[1] || '') + ".com/embed/" + id), width, height, this$1.videoAutoplay));
                        };

                        uikitUtil.getImage(("https://img.youtube.com/vi/" + id + "/maxresdefault.jpg")).then(
                            function (ref) {
                                var width = ref.width;
                                var height = ref.height;

                                // YouTube default 404 thumb, fall back to low resolution
                                if (width === 120 && height === 90) {
                                    uikitUtil.getImage(("https://img.youtube.com/vi/" + id + "/0.jpg")).then(
                                        function (ref) {
                                            var width = ref.width;
                                            var height = ref.height;

                                            return setIframe(width, height);
                                    },
                                        setIframe
                                    );
                                } else {
                                    setIframe(width, height);
                                }
                            },
                            setIframe
                        );

                        // Vimeo
                    } else if ((matches = source.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))) {

                        uikitUtil.ajax(("https://vimeo.com/api/oembed.json?maxwidth=1920&url=" + (encodeURI(source))), {responseType: 'json', withCredentials: false})
                            .then(
                                function (ref) {
                                    var ref_response = ref.response;
                                    var height = ref_response.height;
                                    var width = ref_response.width;

                                    return this$1.setItem(item, getIframe(("https://player.vimeo.com/video/" + (matches[2])), width, height, this$1.videoAutoplay));
                        },
                                function () { return this$1.setError(item); }
                            );

                    }

                }

            }

        ],

        methods: {

            loadItem: function(index) {
                if ( index === void 0 ) index = this.index;


                var item = this.getItem(index);

                if (item.content) {
                    return;
                }

                uikitUtil.trigger(this.$el, 'itemload', [item]);
            },

            getItem: function(index) {
                if ( index === void 0 ) index = this.index;

                return this.items[index] || {};
            },

            setItem: function(item, content) {
                uikitUtil.assign(item, {content: content});
                var el = uikitUtil.html(this.slides[this.items.indexOf(item)], content);
                uikitUtil.trigger(this.$el, 'itemloaded', [this, el]);
                this.$update(el);
            },

            setError: function(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },

            showControls: function() {

                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

                uikitUtil.addClass(this.$el, 'uk-active', 'uk-transition-active');

            },

            hideControls: function() {
                uikitUtil.removeClass(this.$el, 'uk-active', 'uk-transition-active');
            }

        }

    };

    function getIframe(src, width, height, autoplay) {
        return ("<iframe src=\"" + src + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"max-width: 100%; box-sizing: border-box;\" frameborder=\"0\" allowfullscreen uk-video=\"autoplay: " + autoplay + "\" uk-responsive></iframe>");
    }

    var Component = {

        install: install,

        props: {toggle: String},

        data: {toggle: 'a'},

        computed: {

            toggles: function(ref, $el) {
                var toggle = ref.toggle;

                return uikitUtil.$$(toggle, $el);
            }

        },

        disconnected: function() {
            this._destroy();
        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function(e) {
                    e.preventDefault();
                    e.current.blur();
                    this.show(uikitUtil.index(this.toggles, e.current));
                }

            }

        ],

        update: function(data) {

            data.toggles = this.panel && data.toggles || this.toggles;

            if (!this.panel || isEqualList(data.toggles, this.toggles)) {
                return;
            }

            data.toggles = this.toggles;
            this._destroy();
            this._init();

        },

        methods: {

            _init: function() {
                return this.panel = this.panel || this.$create('lightboxPanel', uikitUtil.assign({}, this.$props, {
                    items: this.toggles.reduce(function (items, el) {
                        items.push(['href', 'caption', 'type', 'poster', 'alt'].reduce(function (obj, attr) {
                            obj[attr === 'href' ? 'source' : attr] = uikitUtil.data(el, attr);
                            return obj;
                        }, {}));
                        return items;
                    }, [])
                }));
            },

            _destroy: function() {
                if (this.panel) {
                    this.panel.$destroy(true);
                    this.panel = null;
                }
            },

            show: function(index) {

                if (!this.panel) {
                    this._init();
                }

                return this.panel.show(index);

            },

            hide: function() {

                return this.panel && this.panel.hide();

            }

        }

    };

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el, i) { return el === listB[i]; });
    }

    function install(UIkit, Lightbox) {

        if (!UIkit.lightboxPanel) {
            UIkit.component('lightboxPanel', LightboxPanel);
        }

        uikitUtil.assign(
            Lightbox.props,
            UIkit.component('lightboxPanel').options.props
        );

    }

    /* global UIkit, 'lightbox' */

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('lightbox', Component);
    }

    return Component;

})));
