/*! UIkit 3.11.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitnotification', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitNotification = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

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

    var obj;

    var Component = {

        mixins: [Container],

        functional: true,

        args: ['message', 'status'],

        data: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsContainer: 'uk-notification',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        install: install,

        computed: {

            marginProp: function(ref) {
                var pos = ref.pos;

                return ("margin" + (uikitUtil.startsWith(pos, 'top') ? 'Top' : 'Bottom'));
            },

            startProps: function() {
                var obj;

                return ( obj = {opacity: 0}, obj[this.marginProp] = -this.$el.offsetHeight, obj );
            }

        },

        created: function() {

            var container = uikitUtil.$(("." + (this.clsContainer) + "-" + (this.pos)), this.container)
                || uikitUtil.append(this.container, ("<div class=\"" + (this.clsContainer) + " " + (this.clsContainer) + "-" + (this.pos) + "\" style=\"display: block\"></div>"));

            this.$mount(uikitUtil.append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        connected: function() {
            var this$1$1 = this;
            var obj;


            var margin = uikitUtil.toFloat(uikitUtil.css(this.$el, this.marginProp));
            uikitUtil.Transition.start(
                uikitUtil.css(this.$el, this.startProps),
                ( obj = {opacity: 1}, obj[this.marginProp] = margin, obj )
            ).then(function () {
                if (this$1$1.timeout) {
                    this$1$1.timer = setTimeout(this$1$1.close, this$1$1.timeout);
                }
            });

        },

        events: ( obj = {

            click: function(e) {
                if (uikitUtil.closest(e.target, 'a[href="#"],a[href=""]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj[uikitUtil.pointerEnter] = function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }, obj[uikitUtil.pointerLeave] = function () {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }, obj ),

        methods: {

            close: function(immediate) {
                var this$1$1 = this;


                var removeFn = function (el) {

                    var container = uikitUtil.parent(el);

                    uikitUtil.trigger(el, 'close', [this$1$1]);
                    uikitUtil.remove(el);

                    if (container && !container.hasChildNodes()) {
                        uikitUtil.remove(container);
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn(this.$el);
                } else {
                    uikitUtil.Transition.start(this.$el, this.startProps).then(removeFn);
                }
            }

        }

    };

    function install(UIkit) {
        UIkit.notification.closeAll = function (group, immediate) {
            uikitUtil.apply(document.body, function (el) {
                var notification = UIkit.getComponent(el, 'notification');
                if (notification && (!group || group === notification.group)) {
                    notification.close(immediate);
                }
            });
        };
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('notification', Component);
    }

    return Component;

}));
