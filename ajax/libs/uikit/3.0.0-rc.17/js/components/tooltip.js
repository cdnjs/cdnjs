/*! UIkit 3.0.0-rc.17 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikittooltip', ['uikit-util'], factory) :
    (global.UIkitTooltip = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

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

    var Position = {

        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            clsPos: String
        },

        data: {
            pos: ("bottom-" + (!uikitUtil.isRtl ? 'left' : 'right')),
            flip: true,
            offset: false,
            clsPos: ''
        },

        computed: {

            pos: function(ref) {
                var pos = ref.pos;

                return (pos + (!uikitUtil.includes(pos, '-') ? '-center' : '')).split('-');
            },

            dir: function() {
                return this.pos[0];
            },

            align: function() {
                return this.pos[1];
            }

        },

        methods: {

            positionAt: function(element, target, boundary) {

                uikitUtil.removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));
                uikitUtil.css(element, {top: '', left: ''});

                var node;
                var ref = this;
                var offset = ref.offset;

                offset = uikitUtil.isNumeric(offset)
                    ? offset
                    : (node = uikitUtil.$(offset))
                        ? uikitUtil.offset(node)[axis === 'x' ? 'left' : 'top'] - uikitUtil.offset(target)[axis === 'x' ? 'right' : 'bottom']
                        : 0;

                var axis = this.getAxis();
                var ref$1 = uikitUtil.positionAt(
                    element,
                    target,
                    axis === 'x' ? ((uikitUtil.flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (uikitUtil.flipPosition(this.dir))),
                    axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
                    axis === 'x' ? ("" + (this.dir === 'left' ? -offset : offset)) : (" " + (this.dir === 'top' ? -offset : offset)),
                    null,
                    this.flip,
                    boundary
                ).target;
                var x = ref$1.x;
                var y = ref$1.y;

                this.dir = axis === 'x' ? x : y;
                this.align = axis === 'x' ? y : x;

                uikitUtil.toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

            },

            getAxis: function() {
                return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
            }

        }

    };

    var obj;

    var actives = [];

    var Component = {

        mixins: [Container, Togglable, Position],

        args: 'title',

        props: {
            delay: Number,
            title: String
        },

        data: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        beforeConnect: function() {
            this._hasTitle = uikitUtil.hasAttr(this.$el, 'title');
            uikitUtil.attr(this.$el, {title: '', 'aria-expanded': false});
        },

        disconnected: function() {
            this.hide();
            uikitUtil.attr(this.$el, {title: this._hasTitle ? this.title : null, 'aria-expanded': null});
        },

        methods: {

            show: function() {
                var this$1 = this;


                if (uikitUtil.includes(actives, this)) {
                    return;
                }

                actives.forEach(function (active) { return active.hide(); });
                actives.push(this);

                this._unbind = uikitUtil.on(document, 'click', function (e) { return !uikitUtil.within(e.target, this$1.$el) && this$1.hide(); });

                clearTimeout(this.showTimer);
                this.showTimer = setTimeout(function () {
                    this$1._show();
                    this$1.hideTimer = setInterval(function () {

                        if (!uikitUtil.isVisible(this$1.$el)) {
                            this$1.hide();
                        }

                    }, 150);
                }, this.delay);
            },

            hide: function() {

                var index = actives.indexOf(this);

                if (!~index || uikitUtil.matches(this.$el, 'input') && this.$el === document.activeElement) {
                    return;
                }

                actives.splice(index, 1);

                clearTimeout(this.showTimer);
                clearInterval(this.hideTimer);
                uikitUtil.attr(this.$el, 'aria-expanded', false);
                this.toggleElement(this.tooltip, false);
                this.tooltip && uikitUtil.remove(this.tooltip);
                this.tooltip = false;
                this._unbind();

            },

            _show: function() {

                this.tooltip = uikitUtil.append(this.container,
                    ("<div class=\"" + (this.clsPos) + "\" aria-expanded=\"true\" aria-hidden> <div class=\"" + (this.clsPos) + "-inner\">" + (this.title) + "</div> </div>")
                );

                this.positionAt(this.tooltip, this.$el);

                this.origin = this.getAxis() === 'y'
                    ? ((uikitUtil.flipPosition(this.dir)) + "-" + (this.align))
                    : ((this.align) + "-" + (uikitUtil.flipPosition(this.dir)));

                this.toggleElement(this.tooltip, true);

            }

        },

        events: ( obj = {}, obj[("focus " + uikitUtil.pointerEnter + " " + uikitUtil.pointerDown)] = function (e) {
                if (e.type !== uikitUtil.pointerDown || !uikitUtil.isTouch(e)) {
                    this.show();
                }
            }, obj.blur = 'hide', obj[uikitUtil.pointerLeave] = function (e) {
                if (!uikitUtil.isTouch(e)) {
                    this.hide();
                }
            }, obj )

    };

    /* global UIkit, 'tooltip' */

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('tooltip', Component);
    }

    return Component;

})));
