/*! UIkit 3.0.0-rc.19 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitfilter', ['uikit-util'], factory) :
    (global.UIkitFilter = factory(global.UIkit.util));
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

    var Component = {

        mixins: [Animate],

        args: 'target',

        props: {
            target: Boolean,
            selActive: Boolean
        },

        data: {
            target: null,
            selActive: false,
            attrItem: 'uk-filter-control',
            cls: 'uk-active',
            animation: 250
        },

        computed: {

            toggles: function(ref, $el) {
                var attrItem = ref.attrItem;

                return uikitUtil.$$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), $el);
            },

            target: function(ref, $el) {
                var target = ref.target;

                return uikitUtil.$(target, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function(e) {

                    e.preventDefault();
                    this.apply(e.current);

                }

            }

        ],

        connected: function() {
            var this$1 = this;


            if (this.selActive === false) {
                return;
            }

            var actives = uikitUtil.$$(this.selActive, this.$el);
            this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, uikitUtil.includes(actives, el)); });
        },

        update: function(data) {

            var toggles = data.toggles;
            var children = data.children;
            if (isEqualList(toggles, this.toggles, false) && isEqualList(children, this.target.children, false)) {
                return;
            }

            data.toggles = this.toggles;
            data.children = this.target.children;

            this.setState(this.getState(), false);

        },

        methods: {

            apply: function(el) {
                this.setState(mergeState(el, this.attrItem, this.getState()));
            },

            getState: function() {
                var this$1 = this;

                return this.toggles
                    .filter(function (item) { return uikitUtil.hasClass(item, this$1.cls); })
                    .reduce(function (state, el) { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
            },

            setState: function(state, animate) {
                var this$1 = this;
                if ( animate === void 0 ) animate = true;


                state = uikitUtil.assign({filter: {'': ''}, sort: []}, state);

                uikitUtil.trigger(this.$el, 'beforeFilter', [this, state]);

                var children = uikitUtil.toNodes(this.target.children);

                this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, matchFilter(el, this$1.attrItem, state)); });

                var apply = function () {

                    var selector = getSelector(state);

                    children.forEach(function (el) { return uikitUtil.css(el, 'display', selector && !uikitUtil.matches(el, selector) ? 'none' : ''); });

                    var ref = state.sort;
                    var sort = ref[0];
                    var order = ref[1];

                    if (sort) {
                        var sorted = sortItems(children, sort, order);
                        if (!isEqualList(sorted, children)) {
                            sorted.forEach(function (el) { return uikitUtil.append(this$1.target, el); });
                        }
                    }

                };

                if (animate) {
                    this.animate(apply).then(function () { return uikitUtil.trigger(this$1.$el, 'afterFilter', [this$1]); });
                } else {
                    apply();
                    uikitUtil.trigger(this.$el, 'afterFilter', [this]);
                }

            }

        }

    };

    function getFilter(el, attr) {
        return uikitUtil.parseOptions(uikitUtil.data(el, attr), ['filter']);
    }

    function mergeState(el, attr, state) {

        uikitUtil.toNodes(el).forEach(function (el) {
            var filterBy = getFilter(el, attr);
            var filter = filterBy.filter;
            var group = filterBy.group;
            var sort = filterBy.sort;
            var order = filterBy.order; if ( order === void 0 ) order = 'asc';

            if (filter || uikitUtil.isUndefined(sort)) {

                if (group) {
                    delete state.filter[''];
                    state.filter[group] = filter;
                } else {
                    state.filter = {'': filter};
                }

            }

            if (!uikitUtil.isUndefined(sort)) {
                state.sort = [sort, order];
            }
        });

        return state;
    }

    function matchFilter(el, attr, ref) {
        var stateFilter = ref.filter;
        var ref_sort = ref.sort;
        var stateSort = ref_sort[0];
        var stateOrder = ref_sort[1];

        var ref$1 = getFilter(el, attr);
        var filter = ref$1.filter;
        var group = ref$1.group; if ( group === void 0 ) group = '';
        var sort = ref$1.sort;
        var order = ref$1.order; if ( order === void 0 ) order = 'asc';
        return Boolean(
            (filter || uikitUtil.isUndefined(sort)) && group in stateFilter && (filter === stateFilter[group] || uikitUtil.isUndefined(filter) && !stateFilter[group])
            || stateSort && sort && stateSort === sort && stateOrder === order
        );
    }

    function isEqualList(listA, listB, strict) {
        if ( strict === void 0 ) strict = true;


        listA = uikitUtil.toNodes(listA);
        listB = uikitUtil.toNodes(listB);

        return listA.length === listB.length
            && listA.every(function (el, i) { return strict ? el === listB[i] : ~listB.indexOf(el); });
    }

    function getSelector(ref) {
        var filter = ref.filter;

        var selector = '';
        uikitUtil.each(filter, function (value) { return selector += value || ''; });
        return selector;
    }

    function sortItems(nodes, sort, order) {
        return uikitUtil.toNodes(nodes).sort(function (a, b) { return uikitUtil.data(a, sort).localeCompare(uikitUtil.data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
    }

    /* global UIkit, 'filter' */

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('filter', Component);
    }

    return Component;

})));
