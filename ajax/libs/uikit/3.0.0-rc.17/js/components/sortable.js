/*! UIkit 3.0.0-rc.17 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitsortable', ['uikit-util'], factory) :
    (global.UIkitSortable = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    var targetClass = 'uk-animation-target';

    var Animate = {

        props: {
            animation: Number
        },

        data: {
            animation: 150
        },

        computed: {

            target: function() {
                return this.$el;
            }

        },

        methods: {

            animate: function(action) {
                var this$1 = this;


                addStyle();

                var children = uikitUtil.toNodes(this.target.children);
                var propsFrom = children.map(function (el) { return getProps(el, true); });

                var oldHeight = uikitUtil.height(this.target);
                var oldScrollY = window.pageYOffset;

                action();

                uikitUtil.Transition.cancel(this.target);
                children.forEach(uikitUtil.Transition.cancel);

                reset(this.target);
                this.$update(this.target);
                uikitUtil.fastdom.flush();

                var newHeight = uikitUtil.height(this.target);

                children = children.concat(uikitUtil.toNodes(this.target.children).filter(function (el) { return !uikitUtil.includes(children, el); }));

                var propsTo = children.map(function (el, i) { return el.parentNode && i in propsFrom
                        ? propsFrom[i]
                        ? uikitUtil.isVisible(el)
                            ? getPositionWithMargin(el)
                            : {opacity: 0}
                        : {opacity: uikitUtil.isVisible(el) ? 1 : 0}
                        : false; }
                );

                propsFrom = propsTo.map(function (props, i) {
                    var from = children[i].parentNode === this$1.target
                        ? propsFrom[i] || getProps(children[i])
                        : false;

                    if (from) {
                        if (!props) {
                            delete from.opacity;
                        } else if (!('opacity' in props)) {
                            var opacity = from.opacity;

                            if (opacity % 1) {
                                props.opacity = 1;
                            } else {
                                delete from.opacity;
                            }
                        }
                    }

                    return from;
                });

                uikitUtil.addClass(this.target, targetClass);
                children.forEach(function (el, i) { return propsFrom[i] && uikitUtil.css(el, propsFrom[i]); });
                uikitUtil.css(this.target, 'height', oldHeight);
                uikitUtil.scrollTop(window, oldScrollY);

                return uikitUtil.Promise.all(children.map(function (el, i) { return propsFrom[i] && propsTo[i]
                        ? uikitUtil.Transition.start(el, propsTo[i], this$1.animation, 'ease')
                        : uikitUtil.Promise.resolve(); }
                ).concat(uikitUtil.Transition.start(this.target, {height: newHeight}, this.animation, 'ease'))).then(function () {
                    children.forEach(function (el, i) { return uikitUtil.css(el, {display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: ''}); });
                    reset(this$1.target);
                    this$1.$update(this$1.target);
                    uikitUtil.fastdom.flush(); // needed for IE11
                }, uikitUtil.noop);

            }
        }
    };

    function getProps(el, opacity) {

        var zIndex = uikitUtil.css(el, 'zIndex');

        return uikitUtil.isVisible(el)
            ? uikitUtil.assign({
                display: '',
                opacity: opacity ? uikitUtil.css(el, 'opacity') : '0',
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: zIndex === 'auto' ? uikitUtil.index(el) : zIndex
            }, getPositionWithMargin(el))
            : false;
    }

    function reset(el) {
        uikitUtil.css(el.children, {
            height: '',
            left: '',
            opacity: '',
            pointerEvents: '',
            position: '',
            top: '',
            width: ''
        });
        uikitUtil.removeClass(el, targetClass);
        uikitUtil.css(el, 'height', '');
    }

    function getPositionWithMargin(el) {
        var ref = el.getBoundingClientRect();
        var height = ref.height;
        var width = ref.width;
        var ref$1 = uikitUtil.position(el);
        var top = ref$1.top;
        var left = ref$1.left;
        top += uikitUtil.toFloat(uikitUtil.css(el, 'marginTop'));

        return {top: top, left: left, height: height, width: width};
    }

    var style;

    function addStyle() {
        if (!style) {
            style = uikitUtil.append(document.head, '<style>').sheet;
            style.insertRule(
                ("." + targetClass + " > * {\n                    margin-top: 0 !important;\n                    transform: none !important;\n                }"), 0
            );
        }
    }

    var Class = {

        connected: function() {
            uikitUtil.addClass(this.$el, this.$name);
        }

    };

    var obj;

    var Component = {

        mixins: [Class, Animate],

        props: {
            group: String,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },

        data: {
            group: false,
            threshold: 5,
            clsItem: 'uk-sortable-item',
            clsPlaceholder: 'uk-sortable-placeholder',
            clsDrag: 'uk-sortable-drag',
            clsDragState: 'uk-drag',
            clsBase: 'uk-sortable',
            clsNoDrag: 'uk-sortable-nodrag',
            clsEmpty: 'uk-sortable-empty',
            clsCustom: '',
            handle: false
        },

        created: function() {
            var this$1 = this;

            ['init', 'start', 'move', 'end'].forEach(function (key) {
                var fn = this$1[key];
                this$1[key] = function (e) {
                    this$1.scrollY = window.pageYOffset;
                    var ref = uikitUtil.getPos(e);
                    var x = ref.x;
                    var y = ref.y;
                    this$1.pos = {x: x, y: y};

                    fn(e);
                };
            });
        },

        events: ( obj = {}, obj[uikitUtil.pointerDown] = 'init', obj ),

        update: {

            write: function() {

                if (this.clsEmpty) {
                    uikitUtil.toggleClass(this.$el, this.clsEmpty, !this.$el.children.length);
                }

                uikitUtil.css(this.handle ? uikitUtil.$$(this.handle, this.$el) : this.$el.children, 'touchAction', 'none');

                if (!this.drag) {
                    return;
                }

                uikitUtil.offset(this.drag, {top: this.pos.y + this.origin.top, left: this.pos.x + this.origin.left});

                var ref = uikitUtil.offset(this.drag);
                var top = ref.top;
                var bottom = top + this.drag.offsetHeight;
                var scroll;

                if (top > 0 && top < this.scrollY) {
                    scroll = this.scrollY - 5;
                } else if (bottom < uikitUtil.height(document) && bottom > uikitUtil.height(window) + this.scrollY) {
                    scroll = this.scrollY + 5;
                }

                scroll && setTimeout(function () { return uikitUtil.scrollTop(window, scroll); }, 5);
            }

        },

        methods: {

            init: function(e) {

                var target = e.target;
                var button = e.button;
                var defaultPrevented = e.defaultPrevented;
                var ref = uikitUtil.toNodes(this.$el.children).filter(function (el) { return uikitUtil.within(target, el); });
                var placeholder = ref[0];

                if (!placeholder
                    || uikitUtil.isInput(e.target)
                    || this.handle && !uikitUtil.within(target, this.handle)
                    || button > 0
                    || uikitUtil.within(target, ("." + (this.clsNoDrag)))
                    || defaultPrevented
                ) {
                    return;
                }

                e.preventDefault();

                this.touched = [this];
                this.placeholder = placeholder;
                this.origin = uikitUtil.assign({target: target, index: uikitUtil.index(placeholder)}, this.pos);

                uikitUtil.on(document, uikitUtil.pointerMove, this.move);
                uikitUtil.on(document, uikitUtil.pointerUp, this.end);
                uikitUtil.on(window, 'scroll', this.scroll);

                if (!this.threshold) {
                    this.start(e);
                }

            },

            start: function(e) {

                this.drag = uikitUtil.append(this.$container, this.placeholder.outerHTML.replace(/^<li/i, '<div').replace(/li>$/i, 'div>'));

                uikitUtil.css(this.drag, uikitUtil.assign({
                    boxSizing: 'border-box',
                    width: this.placeholder.offsetWidth,
                    height: this.placeholder.offsetHeight
                }, uikitUtil.css(this.placeholder, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])));
                uikitUtil.attr(this.drag, 'uk-no-boot', '');
                uikitUtil.addClass(this.drag, this.clsDrag, this.clsCustom);

                uikitUtil.height(this.drag.firstElementChild, uikitUtil.height(this.placeholder.firstElementChild));

                var ref = uikitUtil.offset(this.placeholder);
                var left = ref.left;
                var top = ref.top;
                uikitUtil.assign(this.origin, {left: left - this.pos.x, top: top - this.pos.y});

                uikitUtil.addClass(this.placeholder, this.clsPlaceholder);
                uikitUtil.addClass(this.$el.children, this.clsItem);
                uikitUtil.addClass(document.documentElement, this.clsDragState);

                uikitUtil.trigger(this.$el, 'start', [this, this.placeholder]);

                this.move(e);
            },

            move: function(e) {

                if (!this.drag) {

                    if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                        this.start(e);
                    }

                    return;
                }

                this.$emit();

                var target = e.type === 'mousemove' ? e.target : document.elementFromPoint(this.pos.x - document.body.scrollLeft, this.pos.y - document.body.scrollTop);

                var sortable = this.getSortable(target);
                var previous = this.getSortable(this.placeholder);
                var move = sortable !== previous;

                if (!sortable || uikitUtil.within(target, this.placeholder) || move && (!sortable.group || sortable.group !== previous.group)) {
                    return;
                }

                target = sortable.$el === target.parentNode && target || uikitUtil.toNodes(sortable.$el.children).filter(function (element) { return uikitUtil.within(target, element); })[0];

                if (move) {
                    previous.remove(this.placeholder);
                } else if (!target) {
                    return;
                }

                sortable.insert(this.placeholder, target);

                if (!uikitUtil.includes(this.touched, sortable)) {
                    this.touched.push(sortable);
                }

            },

            scroll: function() {
                var scroll = window.pageYOffset;
                if (scroll !== this.scrollY) {
                    this.pos.y += scroll - this.scrollY;
                    this.scrollY = scroll;
                    this.$emit();
                }
            },

            end: function(e) {

                uikitUtil.off(document, uikitUtil.pointerMove, this.move);
                uikitUtil.off(document, uikitUtil.pointerUp, this.end);
                uikitUtil.off(window, 'scroll', this.scroll);

                if (!this.drag) {

                    if (e.type !== 'mouseup' && uikitUtil.within(e.target, 'a[href]')) {
                        location.href = uikitUtil.closest(e.target, 'a[href]').href;
                    }

                    return;
                }

                uikitUtil.preventClick();

                var sortable = this.getSortable(this.placeholder);

                if (this === sortable) {
                    if (this.origin.index !== uikitUtil.index(this.placeholder)) {
                        uikitUtil.trigger(this.$el, 'moved', [this, this.placeholder]);
                    }
                } else {
                    uikitUtil.trigger(sortable.$el, 'added', [sortable, this.placeholder]);
                    uikitUtil.trigger(this.$el, 'removed', [this, this.placeholder]);
                }

                uikitUtil.trigger(this.$el, 'stop', [this, this.placeholder]);

                uikitUtil.remove(this.drag);
                this.drag = null;

                var classes = this.touched.map(function (sortable) { return ((sortable.clsPlaceholder) + " " + (sortable.clsItem)); }).join(' ');
                this.touched.forEach(function (sortable) { return uikitUtil.removeClass(sortable.$el.children, classes); });

                uikitUtil.removeClass(document.documentElement, this.clsDragState);

            },

            insert: function(element, target) {
                var this$1 = this;


                uikitUtil.addClass(this.$el.children, this.clsItem);

                var insert = function () {

                    if (target) {

                        if (!uikitUtil.within(element, this$1.$el) || isPredecessor(element, target)) {
                            uikitUtil.before(target, element);
                        } else {
                            uikitUtil.after(target, element);
                        }

                    } else {
                        uikitUtil.append(this$1.$el, element);
                    }

                };

                if (this.animation) {
                    this.animate(insert);
                } else {
                    insert();
                }

            },

            remove: function(element) {

                if (!uikitUtil.within(element, this.$el)) {
                    return;
                }

                if (this.animation) {
                    this.animate(function () { return uikitUtil.remove(element); });
                } else {
                    uikitUtil.remove(element);
                }

            },

            getSortable: function(element) {
                return element && (this.$getComponent(element, 'sortable') || this.getSortable(element.parentNode));
            }

        }

    };

    function isPredecessor(element, target) {
        return element.parentNode === target.parentNode && uikitUtil.index(element) > uikitUtil.index(target);
    }

    /* global UIkit, 'sortable' */

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('sortable', Component);
    }

    return Component;

})));
