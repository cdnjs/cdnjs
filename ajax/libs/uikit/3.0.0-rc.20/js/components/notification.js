/*! UIkit 3.0.0-rc.20 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitnotification', ['uikit-util'], factory) :
    (global.UIkitNotification = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    var obj;

    var containers = {};

    var Component = {

        functional: true,

        args: ['message', 'status'],

        data: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        install: install,

        created: function() {

            if (!containers[this.pos]) {
                containers[this.pos] = uikitUtil.append(this.$container, ("<div class=\"uk-notification uk-notification-" + (this.pos) + "\"></div>"));
            }

            var container = uikitUtil.css(containers[this.pos], 'display', 'block');

            this.$mount(uikitUtil.append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href=\"#\" class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        connected: function() {
            var this$1 = this;


            var marginBottom = uikitUtil.toFloat(uikitUtil.css(this.$el, 'marginBottom'));
            uikitUtil.Transition.start(
                uikitUtil.css(this.$el, {opacity: 0, marginTop: -this.$el.offsetHeight, marginBottom: 0}),
                {opacity: 1, marginTop: 0, marginBottom: marginBottom}
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj = {

            click: function(e) {
                if (uikitUtil.closest(e.target, 'a[href="#"]')) {
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
                var this$1 = this;


                var removeFn = function () {

                    uikitUtil.trigger(this$1.$el, 'close', [this$1]);
                    uikitUtil.remove(this$1.$el);

                    if (!containers[this$1.pos].children.length) {
                        uikitUtil.css(containers[this$1.pos], 'display', 'none');
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn();
                } else {
                    uikitUtil.Transition.start(this.$el, {
                        opacity: 0,
                        marginTop: -this.$el.offsetHeight,
                        marginBottom: 0
                    }).then(removeFn);
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

    /* global UIkit, 'notification' */

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('notification', Component);
    }

    return Component;

})));
